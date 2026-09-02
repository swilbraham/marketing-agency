import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SkyQuote — instant quote calculator for trades",
  description:
    "Let customers measure their own roof, driveway or lawn on a satellite map and see your price in 30 seconds. Try the live demo — no sign-up.",
  openGraph: {
    title: "SkyQuote — instant quote calculator for trades",
    description:
      "Quote instantly, get found, never miss a call. Live software for local trades.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
