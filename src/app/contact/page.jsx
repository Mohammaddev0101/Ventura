'use client'
import { useState } from 'react'
import axios from 'axios'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/ui/PageHero'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { PhoneIcon, EnvelopeIcon, MapPinIcon, ClockIcon, CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { API_BASE_URL } from '@/context/AuthContext'
import { useAlertDialog } from '@/components/ui/AlertDialog'
import { Accordion, AccordionItem, AccordionTrigger ,AccordionContent } from '@/components/ui/accordion'


const faqs = [
  {
    question: 'چطور با پشتیبانی تماس بگیرم؟',
    answer: 'از طریق فرم تماس یا شماره‌های درج شده می‌توانید با ما در ارتباط باشید.'
  },
  {
    question: 'پاسخگویی به پیام من چقدر زمان می‌برد؟',
    answer: 'معمولاً در کمتر از ۲۴ ساعت پاسخگوی شما خواهیم بود.'
  },
  {
    question: 'آیا اطلاعات من محرمانه می‌ماند؟',
    answer: 'بله، اطلاعات شما کاملاً محرمانه نزد ما محفوظ است.'
  }
]

const contactInfo = [
  {
    icon: PhoneIcon,
    title: 'تلفن تماس',
    details: ['021-88776655', '0912-3456789'],
    color: 'bg-emerald-500'
  },
  {
    icon: EnvelopeIcon,
    title: 'ایمیل',
    details: ['info@ventura.com', 'support@ventura.com'],
    color: 'bg-orange-500'
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
    color: 'bg-purple-500'
  }
]

export default function ContactPage() {
  const { showSuccess, showError, AlertDialogComponent } = useAlertDialog()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSuccess(null)
    setError(null)
    try {
      const res = await axios.post('/api/contact', formData)
      if (res.data.success) {
        setSuccess('پیام شما با موفقیت ارسال شد!')
        showSuccess('موفق', 'پیام شما با موفقیت ارسال شد!')
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        })
      } else {
        setError('ارسال پیام با خطا مواجه شد.')
        showError('خطا', 'ارسال پیام با خطا مواجه شد.')
      }
    } catch (err) {
      setError('ارسال پیام با خطا مواجه شد.')
      showError('خطا', 'ارسال پیام با خطا مواجه شد.')
    }
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-white/80 dark:bg-gray-900">
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
            <div className="text-center text-white dark:text-white">
              <div className="inline-flex items-center gap-2 bg-white/30 dark:bg-gray-800/60 backdrop-blur px-6 py-2 rounded-full mb-8 shadow-lg transition-colors duration-300">
                <span className="text-2xl">✉️</span>
                <span className="text-md">ارتباط با ونتورا</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold mb-6 moraba drop-shadow-lg dark:drop-shadow-[0_2px_24px_rgba(16,185,129,0.25)]">
                ارتباط با ونتورا
              </h1>
              <p className="text-xl md:text-2xl text-white/90 dark:text-gray-200 max-w-2xl mx-auto mb-10 font-light">
                هر سوال، پیشنهاد یا انتقادی دارید، همین حالا با ما در میان بگذارید!
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {contactInfo.map((info, idx) => (
                <Card
                  key={idx}
                  className={`text-center shadow-lg hover:scale-105 transition-transform duration-200 bg-white dark:bg-gray-800 dark:border dark:border-gray-800`}
                >
                  <CardContent className="p-8">
                    <div className={`w-16 h-16 ${info.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-md`}>
                      <info.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {info.title}
                    </h3>
                    <div className="space-y-1">
                      {info.details.map((detail, i) => (
                        <p key={i} className="text-gray-900 dark:text-gray-200 text-sm">{detail}</p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Main Contact Section */}
        <section className="py-16 bg-white/80 dark:bg-gray-900 transition-colors duration-300">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Contact Form */}
              <Card className="shadow-xl border-2 border-emerald-100 dark:border-gray-700 bg-white dark:bg-gray-800 transition-colors duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <EnvelopeIcon className="w-6 h-6 text-emerald-500" />
                    فرم تماس سریع
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                          نام و نام خانوادگی <span className="text-emerald-500">*</span>
                        </label>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="نام شما"
                          className="bg-white dark:bg-gray-900 dark:text-white transition-colors duration-300"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                          شماره تماس
                        </label>
                        <Input
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="مثلاً 09123456789"
                          className="bg-white dark:bg-gray-900 dark:text-white transition-colors duration-300"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                        ایمیل <span className="text-emerald-500">*</span>
                      </label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="ایمیل شما"
                        className="bg-white dark:bg-gray-900 dark:text-white transition-colors duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                        موضوع <span className="text-emerald-500">*</span>
                      </label>
                      <Input
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        placeholder="موضوع پیام"
                        className="bg-white dark:bg-gray-900 dark:text-white transition-colors duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                        پیام <span className="text-emerald-500">*</span>
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder="متن پیام شما..."
                        className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none transition-colors duration-300"
                      />
                    </div>
                    {success && (
                      <div className="flex items-center gap-2 text-green-600 bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg px-3 py-2 text-sm transition-colors duration-300">
                        <CheckCircleIcon className="w-5 h-5" />
                        {success}
                      </div>
                    )}
                    {error && (
                      <div className="flex items-center gap-2 text-red-600 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg px-3 py-2 text-sm transition-colors duration-300">
                        <ExclamationTriangleIcon className="w-5 h-5" />
                        {error}
                      </div>
                    )}
                    <Button
                      type="submit"
                      className="w-full text-lg flex items-center justify-center gap-2 transition-all duration-300 border border-emerald-500 bg-gray-900"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                          </svg>
                          در حال ارسال...
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          ارسال پیام
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Map & FAQ */}
              <div className="space-y-8">
                {/* Google Map Embed */}
                <Card className="overflow-hidden shadow-lg bg-white dark:bg-gray-800 dark:border dark:border-gray-800 transition-colors duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPinIcon className="w-6 h-6 text-blue-500" />
                      موقعیت دفتر مرکزی
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="w-full h-64">
                      <iframe
                        title="Ventura Office Map"
                        src="https://www.openstreetmap.org/export/embed.html?bbox=51.3890%2C35.6892%2C51.4090%2C35.6992&amp;layer=mapnik"
                        className="w-full h-full border-0 rounded-t-xl"
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        style={{
                          background: 'transparent'
                        }}
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                        تهران، خیابان ولیعصر، پلاک 123، طبقه دوم
                      </h3>
                      <p className="text-gray-900 dark:text-gray-200 text-xs">
                        برای مراجعه حضوری لطفاً هماهنگ کنید.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* FAQ Accordion */}
                {/* سوالات متداول با Accordion shadcn */}
                <Card className="shadow-lg bg-white dark:bg-gray-800 dark:border dark:border-gray-800 transition-colors duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ClockIcon className="w-5 h-5 text-green-500" />
                      سوالات متداول
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {faqs.map((faq, idx) => (
                        <AccordionItem key={idx} value={`faq-${idx}`}>
                          <AccordionTrigger className="font-medium text-gray-900 dark:text-white flex items-center justify-between">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent>
                            <p className="text-gray-900 dark:text-gray-200 text-sm mt-2">{faq.answer}</p>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <AlertDialogComponent />
    </div>
  )
}

/*
========================
نمونه API بک‌اند (Node.js/Express/MongoDB):

// مدل mongoose
const mongoose = require('mongoose')
const ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  subject: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
})
module.exports = mongoose.model('Contact', ContactSchema)

// روت اکسپرس
const express = require('express')
const router = express.Router()
const Contact = require('./models/Contact')

router.post('/api/contact', async (req, res) => {
  try {
    await Contact.create(req.body)
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ success: false })
  }
})

module.exports = router
========================
*/
