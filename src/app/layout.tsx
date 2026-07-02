import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { getSiteContent } from '@/lib/site-content'

const inter = Inter({ subsets: ['latin'] })

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent()
  return {
    title: content.site_title,
    description: content.site_description,
    openGraph: {
      title: content.site_title,
      description: content.site_description,
      url: 'https://hdalidocs.dev',
      siteName: content.site_title,
      locale: 'en_US',
      type: 'website',
    },
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen bg-white text-[#111]">
        {children}
      </body>
    </html>
  )
}
