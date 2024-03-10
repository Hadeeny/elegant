import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextUI from "@/components/nextui-wrapper";
import Header from "@/components/header";
import { siteConfig } from "@/config/site";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { ModalProvider } from "@/providers/modal-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Next.js",
    "Ecommerce",
    "Segun Adeniyi",
    "Hadeeny",
    "Ecommerce store",
  ],
  authors: [
    {
      name: "Segun Adeniyi",
      url: "https://segun-gray-dev.vercel.app",
    },
  ],
  creator: "Segun Adeniyi",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.jpg`],
    creator: "@shadcn",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en">
        {/* <NextUI> */}
        <body className={inter.className}>
          <main className="min-h-screen flex flex-col relative">
            {/* <Header /> */}
            <ModalProvider />
            {children}
          </main>
        </body>
        {/* </NextUI> */}
      </html>
    </SessionProvider>
  );
}
