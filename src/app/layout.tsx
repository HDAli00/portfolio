import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Hassan Ali',
  description: 'Platform engineer, writer, design and architecture enthusiast.',
  openGraph: {
    title: 'Hassan Ali',
    description: 'Platform engineer, writer, design and architecture enthusiast.',
    url: 'https://hdalidocs.dev',
    siteName: 'Hassan Ali',
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen bg-white text-[#111]">
        <Nav />
        {children}
      </body>
    </html>
  )
}
