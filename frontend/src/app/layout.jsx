import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/ThemeProvider'
import { CartProvider } from '@/context/CartContext'
import { AuthProvider } from '@/context/AuthContext'
// import { Toaster } from '@/components/ui/toaster'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ونتورا - فروشگاه تجهیزات کمپینگ و طبیعت‌گردی',
  description: 'بهترین تجهیزات کمپینگ، کوهنوردی و طبیعت‌گردی را از ونتورا بخرید. چادر، کوله پشتی، لوازم آشپزی و تجهیزات حرفه‌ای',
  keywords: 'کمپینگ, چادر, کوله پشتی, طبیعت گردی, کوهنوردی, تجهیزات سفر',
  author: 'Ventura Store',
  robots: 'index, follow',
  openGraph: {
    title: 'ونتورا - فروشگاه تجهیزات کمپینگ',
    description: 'بهترین تجهیزات کمپینگ و طبیعت‌گردی',
    type: 'website',
    locale: 'fa_IR',
    siteName: 'Ventura Store'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ونتورا - فروشگاه تجهیزات کمپینگ',
    description: 'بهترین تجهیزات کمپینگ و طبیعت‌گردی'
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://ventura-store.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#6DA975" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <CartProvider>
              {children}
              {/* <Toaster /> */}
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}