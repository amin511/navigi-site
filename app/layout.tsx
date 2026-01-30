import React from "react"
import type { Metadata } from 'next'
import { Noto_Sans, Cairo } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto-sans',
  display: 'swap',
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cairo',
  display: 'swap',
});


export const metadata: Metadata = {
  title: 'Navigi - Web Design, Video Editing & Digital Marketing Agency',
  description: 'Navigi Agency creates stunning websites, professional video editing, motion design, branding solutions, and Facebook/TikTok ads. Transform your digital presence with our expert team.',
  keywords: 'Navigi agency, web design, video editing, motion design, branding, Facebook ads, TikTok ads, digital marketing, creative agency',
  authors: [{ name: 'Navigi Agency' }],
  creator: 'Navigi',
  publisher: 'Navigi',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://navigi.com',
    siteName: 'Navigi - Digital Agency',
    title: 'Navigi - Web Design, Video Editing & Digital Marketing Agency',
    description: 'Transform your brand with professional website design, video editing, motion graphics, and digital marketing solutions.',
    images: [{
      url: 'https://navigi.com/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Navigi Agency',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Navigi - Digital Agency',
    description: 'Web Design, Video Editing, Motion Design & Digital Marketing',
    images: ['https://navigi.com/og-image.jpg'],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${notoSans.variable} ${cairo.variable} font-sans antialiased`}>

        {children}
        <Analytics />
  
      </body>
    </html>
  )
}
