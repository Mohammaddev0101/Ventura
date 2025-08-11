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
    <div className="min-h-screen bg-white dark:bg-text-dark">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-primary-light to-white dark:from-text-dark dark:to-neutral-gray">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-text-dark dark:text-white mb-6">
              درباره ونتورا
            </h1>
            <p className="text-xl text-neutral-gray max-w-3xl mx-auto">
              ونتورا، مرجع تخصصی تجهیزات کمپینگ و طبیعت‌گردی در ایران
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-text-dark dark:text-white mb-6">
                  داستان ما
                </h2>
                <div className="space-y-4 text-neutral-gray">
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
                <div className="w-full h-96 bg-gradient-to-br from-primary-light to-primary/20 rounded-2xl flex items-center justify-center">
                  <div className="text-8xl">🏕️</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-neutral-lighter dark:bg-neutral-gray/10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-text-dark dark:text-white mb-4">
                ونتورا در اعداد
              </h2>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="text-neutral-gray">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="text-5xl mb-4">🎯</div>
                  <h3 className="text-2xl font-bold text-text-dark dark:text-white mb-4">
                    ماموریت ما
                  </h3>
                  <p className="text-neutral-gray">
                    ارائه بهترین تجهیزات کمپینگ با کیفیت بالا و قیمت مناسب، 
                    همراه با مشاوره تخصصی برای تمام علاقه‌مندان به طبیعت‌گردی
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8 text-center">
                  <div className="text-5xl mb-4">🔮</div>
                  <h3 className="text-2xl font-bold text-text-dark dark:text-white mb-4">
                    چشم‌انداز ما
                  </h3>
                  <p className="text-neutral-gray">
                    تبدیل شدن به بزرگ‌ترین و معتبرترین مرجع تجهیزات کمپینگ در منطقه 
                    و ترویج فرهنگ طبیعت‌گردی سالم در جامعه
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-neutral-lighter dark:bg-neutral-gray/10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-text-dark dark:text-white mb-4">
                تیم ما
              </h2>
              <p className="text-neutral-gray">
                افرادی که با تجربه و تخصص خود، بهترین خدمات را ارائه می‌دهند
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <Card key={index}>
                  <CardContent className="p-6 text-center">
                    <div className="text-6xl mb-4">{member.image}</div>
                    <h3 className="text-xl font-bold text-text-dark dark:text-white mb-2">
                      {member.name}
                    </h3>
                    <p className="text-primary font-medium mb-3">
                      {member.role}
                    </p>
                    <p className="text-sm text-neutral-gray">
                      {member.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-text-dark dark:text-white mb-4">
                ارزش‌های ما
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-white">✨</span>
                </div>
                <h3 className="text-xl font-bold text-text-dark dark:text-white mb-3">
                  کیفیت
                </h3>
                <p className="text-neutral-gray">
                  ما فقط محصولات با کیفیت بالا و استاندارد جهانی ارائه می‌دهیم
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-auxiliary-orange rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-white">🤝</span>
                </div>
                <h3 className="text-xl font-bold text-text-dark dark:text-white mb-3">
                  اعتماد
                </h3>
                <p className="text-neutral-gray">
                  اعتماد مشتریان سرمایه اصلی ما است و همواره آن را حفظ می‌کنیم
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-white">🌱</span>
                </div>
                <h3 className="text-xl font-bold text-text-dark dark:text-white mb-3">
                  پایداری
                </h3>
                <p className="text-neutral-gray">
                  به محیط زیست احترام می‌گذاریم و محصولات سازگار با طبیعت ارائه می‌دهیم
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}