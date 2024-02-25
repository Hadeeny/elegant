import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextUI from "@/components/nextui-wrapper";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Elegant Store",
  description: "Your one stop store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <NextUI> */}
      <body className={inter.className}>
        <main className="min-h-screen flex flex-col relative">
          <Header />
          {children}
        </main>
      </body>
      {/* </NextUI> */}
    </html>
  );
}
