'use client'
import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { PhoneIcon, EnvelopeIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      alert('پیام شما با موفقیت ارسال شد!')
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      })
    }, 2000)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const contactInfo = [
    {
      icon: PhoneIcon,
      title: 'تلفن تماس',
      details: ['021-88776655', '0912-3456789'],
      color: 'bg-primary'
    },
    {
      icon: EnvelopeIcon,
      title: 'ایمیل',
      details: ['info@ventura.com', 'support@ventura.com'],
      color: 'bg-auxiliary-orange'
    },
    {
      icon: MapPinIcon,
      title: 'آدرس',
      details: ['تهران، خیابان ولیعصر', 'پلاک 123، طبقه 2'],
      color: 'bg-blue-500'
    },
    {
      icon: ClockIcon,
      title: 'ساعات کاری',
      details: ['شنبه تا پنج‌شنبه: 9-18', 'جمعه: 10-14'],
      color: 'bg-green-500'
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
              تماس با ما
            </h1>
            <p className="text-xl text-neutral-gray max-w-2xl mx-auto">
              ما همیشه آماده پاسخگویی به سوالات و درخواست‌های شما هستیم
            </p>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {contactInfo.map((info, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className={`w-16 h-16 ${info.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <info.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-text-dark dark:text-white mb-3">
                      {info.title}
                    </h3>
                    <div className="space-y-1">
                      {info.details.map((detail, i) => (
                        <p key={i} className="text-neutral-gray text-sm">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card>
                <CardHeader>
                  <CardTitle>پیام خود را ارسال کنید</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-text-dark dark:text-white mb-2">
                          نام و نام خانوادگی *
                        </label>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="نام خود را وارد کنید"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-dark dark:text-white mb-2">
                          شماره تلفن
                        </label>
                        <Input
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="شماره تلفن خود را وارد کنید"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-dark dark:text-white mb-2">
                        ایمیل *
                      </label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="ایمیل خود را وارد کنید"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-dark dark:text-white mb-2">
                        موضوع *
                      </label>
                      <Input
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        placeholder="موضوع پیام خود را وارد کنید"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-dark dark:text-white mb-2">
                        پیام *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder="پیام خود را بنویسید..."
                        className="w-full px-4 py-3 border border-neutral-light rounded-lg bg-white dark:bg-neutral-gray/20 dark:border-neutral-gray focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'در حال ارسال...' : 'ارسال پیام'}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Map & Additional Info */}
              <div className="space-y-6">
                {/* Map Placeholder */}
                <Card>
                  <CardContent className="p-0">
                    <div className="w-full h-64 bg-gradient-to-br from-primary-light to-primary/20 rounded-t-xl flex items-center justify-center">
                      <div className="text-center">
                        <MapPinIcon className="w-16 h-16 text-primary mx-auto mb-2" />
                        <p className="text-neutral-gray">نقشه دفتر مرکزی</p>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-text-dark dark:text-white mb-2">
                        دفتر مرکزی ونتورا
                      </h3>
                      <p className="text-neutral-gray text-sm">
                        تهران، خیابان ولیعصر، نرسیده به پارک وی، پلاک 123، طبقه دوم
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* FAQ */}
                <Card>
                  <CardHeader>
                    <CardTitle>سوالات متداول</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-text-dark dark:text-white mb-1">
                          چگونه می‌توانم سفارش خود را پیگیری کنم؟
                        </h4>
                        <p className="text-sm text-neutral-gray">
                          با وارد کردن کد پیگیری در بخش "پیگیری سفارش" می‌توانید وضعیت سفارش خود را مشاهده کنید.
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-text-dark dark:text-white mb-1">
                          آیا امکان بازگشت کالا وجود دارد؟
                        </h4>
                        <p className="text-sm text-neutral-gray">
                          بله، تا 7 روز پس از خرید می‌توانید کالای خود را بازگردانید.
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-text-dark dark:text-white mb-1">
                          هزینه ارسال چقدر است؟
                        </h4>
                        <p className="text-sm text-neutral-gray">
                          برای خریدهای بالای 500 هزار تومان، ارسال رایگان است.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}