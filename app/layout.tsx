import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Kopi Translate SG Style',
  description: 'A Singapore-style translation app that understands local context, Singlish, and cultural nuances.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
