import './global.css'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Navbar } from './components/nav'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Footer from './components/footer'
import { baseUrl } from './sitemap'
import { Web3Provider } from './components/Web3Provider'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Read, Write & Own',
    template: '%s | Decentralized Publishing Platform',
  },
  description: 'Simple Publishing built on decentralized Primitives',
  openGraph: {
    title: 'Read, Write & Own',
    description: 'Simple Publishing built on decentralized Primitives',
    url: baseUrl,
    siteName: 'Decentralized Publishing Platform',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}


const cx = (...classes) => classes.filter(Boolean).join(' ')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    
    <html
      lang="en"
      className={cx(
        'text-black bg-white dark:text-white dark:bg-black',
        GeistSans.variable,
        GeistMono.variable
      )}
    >
      <body className="antialiased max-w-xl mx-4 mt-8 lg:mx-auto">
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
          <Web3Provider>
          <Navbar />
          {children}
          <Footer />
          <Analytics />
          <SpeedInsights />
          </Web3Provider>
        </main>
      </body>
    </html>
    
  )
}
