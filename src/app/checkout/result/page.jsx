'use client'
import { useSearchParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function CheckoutResultPage() {
  const params = useSearchParams()
  const status = params.get('status')
  const trackId = params.get('trackId')

  const success = status === '2' || status === '1' || status === 'success'

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-16 mt-20 text-center">
        <div className="text-8xl mb-6">{success ? '✅' : '❌'}</div>
        <h1 className="text-3xl font-bold mb-4">
          {success ? 'پرداخت موفق' : 'خطا در پرداخت'}
        </h1>
        {trackId && (
          <p className="text-gray-600 mb-4">کد رهگیری: {trackId}</p>
        )}
        <p className="text-gray-600">
          {success ? 'سفارش شما ثبت شد. از خرید شما متشکریم.' : 'در صورت کسر وجه، طی ۷۲ ساعت بازگشت داده می‌شود.'}
        </p>
      </main>
      <Footer />
    </div>
  )
}


