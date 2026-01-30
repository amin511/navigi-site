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
        {/* v0 – built-with badge */}
        <div dangerouslySetInnerHTML={{
          __html: `<div id="v0-built-with-button-43626a58-7917-40d7-bef9-ca7d13cdad96" style="
border: 1px solid hsl(0deg 0% 100% / 12%);
position: fixed;
bottom: 24px;
right: 24px;
z-index: 1000;
background: #121212;
color: white;
padding: 8px 12px;
border-radius: 8px;
font-weight: 400;
font-size: 14px;
box-shadow: 0 2px 8px rgba(0,0,0,0.12);
letter-spacing: 0.02em;
transition: all 0.2s;
display: flex;
align-items: center;
gap: 4px;
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
">
<a
  href="https://v0.app/chat/api/open/built-with-v0/b_4XAT4QnVA7o?ref=IR7CGP"
  target="_blank"
  rel="noopener"
  style="
    color: inherit;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 4px;
  "
>
  Built with
  <svg
    fill="currentColor"
    viewBox="0 0 147 70"
    xmlns="http://www.w3.org/2000/svg"
    style="width: 20px; height: 20px;"
  >
    <path d="M56 50.2031V14H70V60.1562C70 65.5928 65.5928 70 60.1562 70C57.5605 70 54.9982 68.9992 53.1562 67.1573L0 14H19.7969L56 50.2031Z" />
    <path d="M147 56H133V23.9531L100.953 56H133V70H96.6875C85.8144 70 77 61.1856 77 50.3125V14H91V46.1562L123.156 14H91V0H127.312C138.186 0 147 8.81439 147 19.6875V56Z" />
  </svg>
</a>

<button
  onclick="document.getElementById('v0-built-with-button-43626a58-7917-40d7-bef9-ca7d13cdad96').style.display='none'"
  onmouseenter="this.style.opacity='1'"
  onmouseleave="this.style.opacity='0.7'"
  style="
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 2px;
    margin-left: 4px;
    border-radius: 2px;
    display: flex;
    align-items: center;
    opacity: 0.7;
    transition: opacity 0.2s;
    transform: translateZ(0);
  "
  aria-label="Close"
>
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6L6 18M6 6l12 12"/>
  </svg>
</button>

<span style="
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
">
  v0
</span>
</div>` }} />
      </body>
    </html>
  )
}
