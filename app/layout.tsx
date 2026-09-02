import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Brightside — marketing systems for trades",
  description:
    "Websites, ads, an instant satellite quote calculator and an AI receptionist for local trades. Try the live demos — no sign-up.",
  openGraph: {
    title: "Brightside — marketing systems for trades",
    description:
      "Get found, quote instantly, never miss a call. Live software for local trades.",
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
