import type { Metadata, Viewport } from "next";
import { Inter as FontSans } from "next/font/google"
import localFont from "next/font/local"
import { siteConfig } from "@/config/site"

import { ClerkProvider, UserButton, auth } from '@clerk/nextjs'
import "./globals.css";
import Providers from "@/components/Providers";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/ThemeProvider";
import { MainNav } from "@/components/NavBar";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@clerk/nextjs";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

// Font files can be colocated inside of `pages`
const fontHeading = localFont({
  src: "../assets/fonts/CalSans-SemiBold.woff2",
  variable: "--font-heading",
})


export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ]
}


export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "MyTV+",
    "Movies",
    "Tv Shows",
    "Free movies",
    "Free TV shows",
    "Series"
  ],
  authors: [
    {
      name: "raylen",
      url: "https://raylen.xyz",
    },
  ],
  creator: "raylen.xyz",
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
    // images: [`${siteConfig.url}/og.jpg`],
    creator: "raylen",
  },
  // icons: {
  //   icon: "/favicon.ico",
  //   shortcut: "/favicon-16x16.png",
  //   apple: "/apple-touch-icon.png",
  // },
  // manifest: `${siteConfig.url}/site.webmanifest`,
};

export default  function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontHeading.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Providers>
            <ClerkProvider>
              <div className="flex min-h-screen flex-col">
                <header className="container z-40 bg-background">
                  <div className="flex h-20 items-center justify-between py-6">
                    <MainNav items={[
                      {
                        title: 'TV shows',
                        href: '/tv'
                      },
                      {
                        title: 'Movies',
                        href: '/movies'
                      }

                    ]} />
                  
                  </div>
                </header>
                <main className="flex-1">
                  {children}
                </main>
              </div>
            </ClerkProvider>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
