import type { Metadata } from "next";
import localFont from "next/font/local";
import { Quicksand } from "next/font/google";
import "./globals.css";

const lilitaOne = localFont({
  src: "./fonts/LilitaOne-Regular.ttf",
  variable: "--font-lilita-one",
  weight: "400",
  display: "swap"
});

const quicksand = Quicksand({
  variable: "--font-quicksand",
  weight: ["400", "500", "600", "700"],
  display: "swap",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Wink Wink 🌟",
  description: "Snap your cutest moments, one wink at a time ✨📸"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${lilitaOne.variable} ${quicksand.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
