'use client'
import { useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/ui/PageHero'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { ShieldCheckIcon, LockClosedIcon, KeyIcon } from '@heroicons/react/24/outline'

export default function PrivacyPage() {
  // Enable dark mode based on system/user preference
  useEffect(() => {
    // Check if user prefers dark, or check any stored theme choice
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const root = window.document.documentElement

    // This example uses a custom CSS class toggle (for Tailwind)
    const stored = typeof window !== "undefined" ? localStorage.getItem('theme') : null
    if (stored === 'dark' || (!stored && prefersDark)) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [])

  const sections = [
    {
      title: 'جمع‌آوری اطلاعات',
      icon: ShieldCheckIcon,
      items: [
        'اطلاعات حساب کاربری مانند نام و ایمیل برای ارائه خدمات ذخیره می‌شود.',
        'سوابق سفارشات، پرداخت و آدرس‌ها برای پردازش سفارش نگهداری می‌گردد.',
        'اطلاعات فنی مانند IP و کوکی‌ها برای بهبود تجربه کاربری استفاده می‌شود.'
      ]
    },
    {
      title: 'استفاده از اطلاعات',
      icon: KeyIcon,
      items: [
        'شخصی‌سازی تجربه کاربری و نمایش پیشنهادات مرتبط.',
        'پردازش و پیگیری سفارشات و پشتیبانی مشتریان.',
        'ارسال اعلان‌های ضروری مربوط به حساب و سفارش.'
      ]
    },
    {
      title: 'حفاظت از اطلاعات',
      icon: LockClosedIcon,
      items: [
        'استفاده از پروتکل‌های امنیتی استاندارد برای حفاظت از داده‌ها.',
        'دسترسی محدود به اطلاعات حساس تنها برای افراد مجاز.',
        'حذف یا ناشناس‌سازی داده‌ها طبق قوانین در صورت درخواست کاربر.'
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header />
      <main>
        <section className="relative pb-24 md:pt-32 pt-20 overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
          {/* Dark mode background overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.08'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
          <div className="container mx-auto px-4 relative z-10">
            <div
              className="text-center text-white dark:text-white"
            >
              <div className="inline-flex items-center gap-2 bg-white/30 dark:bg-gray-800/40 backdrop-blur px-6 py-2 rounded-full mb-8 shadow-lg">
                <span className="text-2xl">🛡️</span>
                <span className="text-md">امنیت</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold mb-6 moraba drop-shadow-lg dark:drop-shadow-[0_2px_24px_rgba(16,185,129,0.25)]">
              حریم خصوصی
              </h1>
              <h3 className="text-sm mt-10">
                ما به امنیت و محرمانگی اطلاعات شما متعهد هستیم.
              </h3>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <Card className="mb-10 bg-white dark:bg-gray-800 transition-colors duration-300">
              <CardContent className="p-8">
                <p className="text-gray-700 dark:text-gray-300 leading-8">
                  این سیاست حریم خصوصی توضیح می‌دهد که ونتورا چگونه اطلاعات شما را جمع‌آوری، استفاده و محافظت می‌کند.
                  با استفاده از خدمات ما، شما با این سیاست موافقت می‌کنید.
                </p>
              </CardContent>
            </Card>

            <div className="space-y-6">
              {sections.map((sec, idx) => (
                <Card key={idx} className="bg-white dark:bg-gray-800 transition-colors duration-300">
                  <CardHeader className="flex flex-row items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-500/10 dark:bg-emerald-400/10 text-emerald-600 dark:text-emerald-400 rounded-lg flex items-center justify-center transition-colors duration-300">
                      <sec.icon className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-xl text-gray-900 dark:text-gray-100">{sec.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <ul className="list-disc pr-6 space-y-2 text-gray-700 dark:text-gray-300">
                      {sec.items.map((it, i) => (
                        <li key={i}>{it}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

