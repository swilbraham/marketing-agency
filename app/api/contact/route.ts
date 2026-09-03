import { NextResponse } from "next/server";

/**
 * Enquiries are forwarded to FormSubmit, which needs no API key — just a
 * destination address in CONTACT_EMAIL, activated once by clicking the link
 * in the confirmation email FormSubmit sends on the first submission.
 *
 * If CONTACT_EMAIL is missing or delivery fails we tell the visitor so and
 * ask them to email instead. We never claim to have received an enquiry we
 * have actually dropped.
 */
const FALLBACK_MESSAGE =
  "Sorry — that didn't send. Please try again in a few minutes; we're on it.";

export async function POST(request: Request) {
  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = typeof data.name === "string" ? data.name.trim() : "";
  const email = typeof data.email === "string" ? data.email.trim() : "";

  if (!name || !email) {
    return NextResponse.json(
      { error: "Please provide your name and email." },
      { status: 400 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const to = process.env.CONTACT_EMAIL;

  if (!to) {
    console.error(
      "[contact] CONTACT_EMAIL is not set — enquiry NOT delivered:",
      { name, email, ...data }
    );
    return NextResponse.json(
      { error: FALLBACK_MESSAGE, code: "no-destination" },
      { status: 500 }
    );
  }

  // FormSubmit refuses requests without a browser origin, and answers 200
  // with success:"false" when it is unhappy — so the body must be checked,
  // not just the status code.
  const origin =
    request.headers.get("origin") ??
    new URL(request.url).origin;

  try {
    const res = await fetch(
      `https://formsubmit.co/ajax/${encodeURIComponent(to)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Origin: origin,
          Referer: `${origin}/`,
        },
        body: JSON.stringify({
          _subject: `SkyQuote enquiry — ${name}`,
          _template: "table",
          _captcha: "false",
          ...data,
          name,
          email,
        }),
      }
    );

    if (!res.ok) {
      throw new Error(`FormSubmit returned ${res.status}`);
    }

    const body = (await res.json().catch(() => ({}))) as {
      success?: string;
      message?: string;
    };

    // "success" is the string "true"/"false", not a boolean.
    if (String(body.success) !== "true") {
      console.error("[contact] FormSubmit refused:", body);
      return NextResponse.json(
        {
          error: FALLBACK_MESSAGE,
          code: "rejected",
          detail: body.message ?? null,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    // Log the whole enquiry so it can be recovered from the Vercel logs.
    console.error("[contact] delivery failed — enquiry NOT delivered:", err, {
      name,
      email,
      ...data,
    });
    return NextResponse.json(
      {
        error: FALLBACK_MESSAGE,
        code: "unreachable",
        detail: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  }
}
