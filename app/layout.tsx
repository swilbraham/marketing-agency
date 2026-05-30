import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Brightside Marketing — More customers for small businesses",
  description:
    "Brightside Marketing helps local and small businesses get found, get leads, and grow with done-for-you ads, websites, and SEO.",
  openGraph: {
    title: "Brightside Marketing",
    description:
      "Done-for-you marketing that brings local businesses more customers.",
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
