import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Üçgen Oluşturma',
  description: 'Kosinüs Değeri Rasyonel Sayı Olarak Verilen Açılara Sahip Tam Sayı Kenarlı Üçgen Oluşturma Algoritmaları​',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
