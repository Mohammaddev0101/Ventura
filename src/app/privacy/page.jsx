'use client'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/ui/PageHero'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { ShieldCheckIcon, LockClosedIcon, KeyIcon } from '@heroicons/react/24/outline'

export default function PrivacyPage() {
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main>
        <PageHero title="حریم خصوصی" subtitle="ما به امنیت و محرمانگی اطلاعات شما متعهد هستیم" emoji="🛡️" />

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <Card className="mb-10">
              <CardContent className="p-8">
                <p className="text-gray-700 dark:text-gray-300 leading-8">
                  این سیاست حریم خصوصی توضیح می‌دهد که ونتورا چگونه اطلاعات شما را جمع‌آوری، استفاده و محافظت می‌کند.
                  با استفاده از خدمات ما، شما با این سیاست موافقت می‌کنید.
                </p>
              </CardContent>
            </Card>

            <div className="space-y-6">
              {sections.map((sec, idx) => (
                <Card key={idx}>
                  <CardHeader className="flex flex-row items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-lg flex items-center justify-center">
                      <sec.icon className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-xl">{sec.title}</CardTitle>
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


