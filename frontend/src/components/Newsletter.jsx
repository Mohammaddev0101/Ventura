'use client'
import { useState } from 'react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle newsletter subscription
    setIsSubscribed(true)
    setEmail('')
    setTimeout(() => setIsSubscribed(false), 3000)
  }

  return (
    <section className="py-16 bg-gradient-to-r from-green-600 to-green-700">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              از آخرین اخبار و تخفیف‌ها باخبر شوید
            </h2>
            <p className="text-green-100 text-lg">
              عضو خبرنامه ونتورا شوید و از جدیدترین محصولات و پیشنهادات ویژه مطلع باشید
            </p>
          </div>

          <div className="max-w-md mx-auto">
            {isSubscribed ? (
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-white">
                ✅ با موفقیت عضو خبرنامه شدید!
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ایمیل خود را وارد کنید"
                  className="flex-1 px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-white/50"
                  required
                />
                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  عضویت
                </button>
              </form>
            )}
          </div>

          <div className="mt-8 flex items-center justify-center space-x-8 space-x-reverse text-green-100 text-sm">
            <div className="flex items-center space-x-2 space-x-reverse">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>بدون اسپم</span>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>لغو عضویت آسان</span>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>تخفیف‌های ویژه</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}