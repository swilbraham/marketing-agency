import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Brightside — Meta ads for small businesses",
  description:
    "Brightside is a Facebook & Instagram ads agency for small and local businesses. Done-for-you Meta campaigns that bring you more customers.",
  openGraph: {
    title: "Brightside — Meta Ads Agency",
    description:
      "Done-for-you Facebook & Instagram ads that bring local businesses more customers.",
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
