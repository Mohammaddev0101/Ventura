'use client'
import { useEffect, useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/ui/PageHero'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Separator } from '@/components/ui/separator'
import { 
  ShieldCheckIcon, 
  DocumentTextIcon, 
  ExclamationTriangleIcon,
  InformationCircleIcon 
} from '@heroicons/react/24/outline'

export default function TermsPage() {


  const sections = [
    {
      id: 'definitions',
      title: 'تعاریف',
      icon: InformationCircleIcon,
      content: [
        'سایت: منظور وب‌سایت ونتورا به آدرس ventura-store.com می‌باشد.',
        'کاربر: هر شخص حقیقی یا حقوقی که از خدمات سایت استفاده می‌کند.',
        'محصول: کلیه کالاها و خدماتی که از طریق سایت عرضه می‌شود.',
        'سفارش: درخواست خرید محصول توسط کاربر از طریق سایت.'
      ]
    },
    {
      id: 'registration',
      title: 'ثبت نام و حساب کاربری',
      icon: DocumentTextIcon,
      content: [
        'برای استفاده از برخی خدمات سایت، ثبت نام الزامی است.',
        'اطلاعات ارائه شده باید صحیح و کامل باشد.',
        'کاربر مسئول حفظ امنیت حساب کاربری خود می‌باشد.',
        'استفاده از اطلاعات نادرست منجر به تعلیق حساب کاربری خواهد شد.'
      ]
    },
    {
      id: 'orders',
      title: 'سفارشات و پرداخت',
      icon: ShieldCheckIcon,
      content: [
        'تمامی قیمت‌ها به تومان و شامل مالیات بر ارزش افزوده می‌باشد.',
        'پرداخت از طریق درگاه‌های معتبر بانکی انجام می‌شود.',
        'پس از تأیید پرداخت، سفارش وارد مرحله پردازش می‌شود.',
        'امکان لغو سفارش تا قبل از ارسال وجود دارد.'
      ]
    },
    {
      id: 'delivery',
      title: 'ارسال و تحویل',
      icon: ExclamationTriangleIcon,
      content: [
        'زمان ارسال بسته به نوع محصول و مقصد متفاوت است.',
        'هزینه ارسال برای سفارشات زیر ۵۰۰ هزار تومان محاسبه می‌شود.',
        'مسئولیت نگهداری محصول پس از تحویل با خریدار است.',
        'در صورت عدم حضور گیرنده، محصول به انبار بازگردانده می‌شود.'
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header />


      <main>
        <section className="relative pb-24 pt-32 overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 transition-colors duration-300">
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
                <span className="text-2xl">📄</span>
                <span className="text-md">شرایط استفاده از خدمات فروشگاه ونتورا</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold mb-6 moraba drop-shadow-lg dark:drop-shadow-[0_2px_24px_rgba(16,185,129,0.25)]">
                قوانین و مقررات
              </h1>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="mb-12 border-l-4 border-l-blue-500 dark:border-l-blue-400 bg-white dark:bg-gray-800 transition-colors duration-300">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4 space-x-reverse">
                    <InformationCircleIcon className="w-8 h-8 text-blue-500 dark:text-blue-400 flex-shrink-0 mt-1" />
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        مقدمه
                      </h2>
                      <div className="text-gray-600 dark:text-gray-400 space-y-4">
                        <p>
                          با استفاده از وب‌سایت ونتورا، شما موافقت خود را با پذیرش و رعایت تمامی قوانین و مقررات 
                          مندرج در این صفحه اعلام می‌کنید. در صورت عدم موافقت با هر یک از این شرایط، 
                          لطفاً از استفاده از خدمات سایت خودداری نمایید.
                        </p>
                        <p>
                          این قوانین ممکن است بدون اطلاع قبلی تغییر کند و مسئولیت مطلع شدن از آخرین 
                          نسخه قوانین بر عهده کاربران می‌باشد.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Terms Sections */}
              <div className="space-y-8">
                {sections.map((section, index) => (
                  <Card key={section.id} className="overflow-hidden bg-white dark:bg-gray-800 transition-colors duration-300">
                    <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 transition-colors duration-300">
                      <CardTitle className="flex items-center space-x-3 space-x-reverse">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-700 dark:to-purple-700 rounded-lg flex items-center justify-center transition-colors duration-300">
                          <section.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            بخش {index + 1}
                          </span>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            {section.title}
                          </h3>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8">
                      <ul className="space-y-4">
                        {section.content.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start space-x-3 space-x-reverse">
                            <div className="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full flex-shrink-0 mt-2"></div>
                            <span className="text-gray-600 dark:text-gray-400 leading-relaxed">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Additional Terms */}
              <div className="grid md:grid-cols-2 gap-8 mt-12">
                <Card className="border-l-4 border-l-green-500 dark:border-l-green-400 bg-white dark:bg-gray-800 transition-colors duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 space-x-reverse text-green-600 dark:text-green-400">
                      <ShieldCheckIcon className="w-6 h-6" />
                      <span>حقوق کاربران</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      <li>• دریافت محصول مطابق با توضیحات</li>
                      <li>• امکان بازگشت کالا طبق شرایط</li>
                      <li>• حفظ حریم خصوصی اطلاعات</li>
                      <li>• پشتیبانی ۲۴ ساعته</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-orange-500 dark:border-l-orange-400 bg-white dark:bg-gray-800 transition-colors duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 space-x-reverse text-orange-600 dark:text-orange-400">
                      <ExclamationTriangleIcon className="w-6 h-6" />
                      <span>محدودیت‌ها</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      <li>• ممنوعیت استفاده تجاری بدون مجوز</li>
                      <li>• عدم انتشار محتوای نامناسب</li>
                      <li>• رعایت قوانین کپی‌رایت</li>
                      <li>• عدم سوء استفاده از سیستم</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Info */}
              <Card className="mt-12 bg-gradient-to-r bg-white dark:bg-gray-800 border-0 transition-colors duration-300">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    سوال یا ابهامی دارید؟
                  </h3>
                  <p className="text-gray-900 dark:text-white mb-6">
                    تیم پشتیبانی ونتورا آماده پاسخگویی به سوالات شما در خصوص قوانین و مقررات است
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 sm:space-x-reverse">
                    <div className="flex items-center space-x-2 space-x-reverse text-gray-900 dark:text-white">
                      <span>📧</span>
                      <span>legal@ventura-store.com</span>
                    </div>
                    <Separator orientation="vertical" className="hidden sm:block h-6" />
                    <div className="flex items-center space-x-2 space-x-reverse text-gray-900 dark:text-white">
                      <span>📞</span>
                      <span>۰۲۱-۸۸۷۷۶۶۵۵</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}