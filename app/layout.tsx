import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Admin Platform',
  description: 'Admin Platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" style={{
      height: '100vh'
    }}>
      <body style={{
        height: '100vh'
      }} className={inter.className}>{children}</body>
    </html>
  )
}
