import type { Metadata } from 'next'
import { Open_Sans as FontSans } from 'next/font/google'
import localFont from 'next/font/local'

// Font files can be colocated inside of `pages`
const SequelWideFont = localFont({
  src: '../fonts/Sequel_100_Wide_95/Sequel_100_Wide_95.woff2',
  variable: '--font-sequel-wide'
})

import './globals.css'
import { cn } from '@/lib/utils'

const openSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
})

export const metadata: Metadata = {
  title: "N'Blaze Website",
  description: 'Medellin K-pop cover group',
  icons: '/favicon.ico'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-dark font-sequel-wide antialiased',
          openSans.variable,
          SequelWideFont.variable
        )}
      >
        {children}
      </body>
    </html>
  )
}
