'use client'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Card, CardContent } from '@/components/ui/Card'

export default function AboutPage() {
  const stats = [
    { number: '10+', label: 'سال تجربه' },
    { number: '500+', label: 'مشتری راضی' },
    { number: '100+', label: 'محصول متنوع' },
    { number: '24/7', label: 'پشتیبانی' }
  ]

  const team = [
    {
      name: 'علی احمدی',
      role: 'مدیر عامل',
      image: '👨‍💼',
      description: 'با بیش از 15 سال تجربه در صنعت کمپینگ'
    },
    {
      name: 'سارا محمدی',
      role: 'مدیر فروش',
      image: '👩‍💼',
      description: 'متخصص در مشاوره تجهیزات طبیعت‌گردی'
    },
    {
      name: 'رضا کریمی',
      role: 'مدیر فنی',
      image: '👨‍🔧',
      description: 'کارشناس تجهیزات و تعمیرات'
    }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300 overflow-x-hidden flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="relative py-32 md:py-44 overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 flex items-center">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.08'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
          <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
            <div className="inline-flex items-center gap-2 bg-white/30 dark:bg-gray-800/40 backdrop-blur px-6 py-2 rounded-full mb-8 shadow-lg">
              <span className="text-2xl">🏕️</span>
              <span className="text-md">مرجع تخصصی تجهیزات کمپینگ و طبیعت‌گردی در ایران</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 moraba drop-shadow-lg dark:drop-shadow-[0_2px_24px_rgba(16,185,129,0.25)] text-white text-center">
              درباره ونتورا
            </h1>
          </div>
        </section>

        <section className="py-16 bg-white dark:bg-gray-900 transition-colors duration-300 dark:border-t border-gray-500">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 dark:from-emerald-400 dark:via-cyan-400 dark:to-blue-400 mb-4 drop-shadow-lg">
                  داستان ما
                </h2>
                <div className="space-y-4 text-neutral-gray dark:text-neutral-300">
                  <p>
                    ونتورا در سال ۱۳۹۰ با هدف ارائه بهترین تجهیزات کمپینگ و طبیعت‌گردی تأسیس شد.
                    ما معتقدیم که هر کسی حق دارد از زیبایی‌های طبیعت لذت ببرد و تجربه‌های فراموش‌نشدنی داشته باشد.
                  </p>
                  <p>
                    با بیش از یک دهه تجربه، ما توانسته‌ایم اعتماد هزاران مشتری را جلب کنیم و به یکی از
                    معتبرترین فروشگاه‌های تجهیزات کمپینگ در کشور تبدیل شویم.
                  </p>
                  <p>
                    تیم ما متشکل از افرادی است که خود علاقه‌مند به طبیعت‌گردی هستند و می‌دانند که
                    چه تجهیزاتی برای یک سفر موفق ضروری است.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="w-full h-96 bg-gradient-to-br from-primary-light to-primary/20 dark:from-gray-800 dark:to-gray-700 rounded-2xl flex items-center justify-center transition-colors duration-300 shadow-lg">
                  <div className="text-8xl">🏕️</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-20 md:py-28 bg-gradient-to-br  dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300 overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-10">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="group relative bg-white/80 dark:bg-gray-800/80 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-8 flex flex-col items-center justify-center overflow-hidden border border-emerald-100 dark:border-gray-700"
                >
                  <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-gradient-to-tr from-emerald-400 via-cyan-400 to-blue-400 opacity-20 group-hover:scale-110 group-hover:opacity-40 transition-all duration-500 blur-2xl"></div>
                  <div className="text-5xl mb-4 drop-shadow-lg animate-bounce-slow">
                    {stat.icon || "🌟"}
                  </div>
                  <div className="text-4xl font-extrabold text-primary dark:text-emerald-400 mb-2 tracking-tight drop-shadow">
                    {stat.number}
                  </div>
                  <div className="text-lg font-medium text-neutral-gray dark:text-neutral-200">
                    {stat.label}
                  </div>
                  <div className="mt-4 w-12 h-1 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 opacity-70 group-hover:scale-x-110 transition-transform duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative py-20 md:py-24 bg-gradient-to-br dark:from-gray-800 dark:via-gray-900 dark:to-gray-900 transition-colors duration-300 overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <Card className="relative overflow-hidden bg-white/90 dark:bg-gray-800/90 border-0 shadow-xl dark:shadow-2xl transition-all duration-300 group hover:scale-105 hover:shadow-emerald-200 dark:hover:shadow-emerald-900/40 hover:z-20">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-tr from-emerald-400 via-cyan-400 to-blue-400 opacity-30 group-hover:opacity-60 rounded-full blur-2xl transition-all duration-500"></div>
                <CardContent className="relative p-12 text-center flex flex-col items-center">
                  <div className="text-7xl mb-6 animate-spin-slow drop-shadow-lg">🎯</div>
                  <h3 className="text-3xl font-extrabold text-primary dark:text-emerald-400 mb-4 tracking-tight drop-shadow">
                    ماموریت ما
                  </h3>
                  <p className="text-lg text-neutral-gray dark:text-neutral-200 leading-relaxed font-medium">
                    ارائه بهترین تجهیزات کمپینگ با کیفیت بالا و قیمت مناسب،
                    همراه با <span className="text-primary dark:text-emerald-400 font-bold">مشاوره تخصصی</span> برای تمام علاقه‌مندان به طبیعت‌گردی
                  </p>
                  <div className="mt-6 w-16 h-1 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 opacity-80 group-hover:scale-x-110 transition-transform duration-300"></div>
                </CardContent>
              </Card>
              <Card className="relative overflow-hidden bg-white/90 dark:bg-gray-800/90 border-0 shadow-xl dark:shadow-2xl transition-all duration-300 group hover:scale-105 hover:shadow-cyan-200 dark:hover:shadow-cyan-900/40 hover:z-20">
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-tr from-cyan-400 via-blue-400 to-emerald-400 opacity-30 group-hover:opacity-60 rounded-full blur-2xl transition-all duration-500"></div>
                <CardContent className="relative p-12 text-center flex flex-col items-center">
                  <div className="text-7xl mb-6 animate-pulse drop-shadow-lg">🔮</div>
                  <h3 className="text-3xl font-extrabold text-cyan-600 dark:text-cyan-300 mb-4 tracking-tight drop-shadow">
                    چشم‌انداز ما
                  </h3>
                  <p className="text-lg text-neutral-gray dark:text-neutral-200 leading-relaxed font-medium">
                    تبدیل شدن به <span className="text-cyan-600 dark:text-cyan-300 font-bold">بزرگ‌ترین و معتبرترین مرجع تجهیزات کمپینگ</span> در منطقه
                    و ترویج فرهنگ طبیعت‌گردی سالم در جامعه
                  </p>
                  <div className="mt-6 w-16 h-1 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 opacity-80 group-hover:scale-x-110 transition-transform duration-300"></div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16 bg-neutral-lighter dark:bg-gray-900 transition-colors duration-300">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 dark:from-emerald-400 dark:via-cyan-400 dark:to-blue-400 mb-4 drop-shadow-lg">
                تیم ما
              </h2>
              <div className="mx-auto w-32 h-2 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 rounded-full opacity-70 mb-2 animate-pulse"></div>
              <p className="text-lg text-neutral-gray dark:text-neutral-300 font-medium">
                افرادی که با تجربه و تخصص خود، بهترین خدمات را ارائه می‌دهند
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <Card
                  key={index}
                  className="inner-curve relative overflow-visible bg-gray-100 dark:bg-gray-800/90 border-0 shadow-2xl group transition-all duration-300 hover:scale-105 pb-7 "
                >
                  <div className="absolute -top-8 -left-8 w-24 h-24 bg-gradient-to-tr from-emerald-400 via-cyan-400 to-blue-400 opacity-20 group-hover:opacity-40 rounded-full blur-2xl pointer-events-none transition-all duration-500"></div>
                  <CardContent className="relative p-8 flex flex-col items-center text-center">
                    <div className="text-6xl mb-4 drop-shadow-lg">{member.image}</div>
                    <h3 className="text-2xl font-extrabold text-primary dark:text-emerald-400 mb-1 tracking-tight drop-shadow">
                      {member.name}
                    </h3>
                    <p className="text-cyan-600 dark:text-cyan-300 font-semibold mb-2 text-base">
                      {member.role}
                    </p>
                    <div className="w-10 h-1 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 opacity-70 mx-auto mb-3"></div>
                    <p className="text-sm text-neutral-gray dark:text-neutral-200 leading-relaxed font-medium">
                      {member.description}
                    </p>
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