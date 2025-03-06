import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Azeret_Mono as Geist_Mono } from "next/font/google"
import "./globals.css"
import { ClerkProvider, SignedIn, UserButton } from "@clerk/nextjs"

const APP_NAME = "AccSpaces"
const APP_DEFAULT_TITLE = "My Acc Spaces"
const APP_TITLE_TEMPLATE = "%s - AccSpaces"
const APP_DESCRIPTION = "Best Places for Secure your Email and Password"

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
}

export const viewport: Viewport = {
  themeColor: "#1d3c4b",
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#1d2433]`}
          style={{ backgroundColor: "#1d2433" }}
        >
          <div className="min-h-screen bg-[#1d2433]">
            <SignedIn>
              <header
                className="flex justify-end items-center p-4 gap-4 h-16 bg-transparent z-50"
                style={{
                  backgroundColor: "transparent",
                  background: "transparent",
                }}
              >
                <UserButton />
              </header>
            </SignedIn>
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  )
}

