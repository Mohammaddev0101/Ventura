'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  HeartIcon
} from '@heroicons/react/24/outline'

export default function Footer() {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  })

  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterStatus, setNewsletterStatus] = useState('idle') // idle | loading | success | error
  const [newsletterMessage, setNewsletterMessage] = useState('')

  const footerLinks = {
    company: [
      { name: 'درباره ما', href: '/about' },
      { name: 'تماس با ما', href: '/contact' },
      { name: 'فرصت‌های شغلی', href: '/careers' },
      { name: 'اخبار', href: '/news' }
    ],
    support: [
      { name: 'راهنمای خرید', href: '/guide' },
      { name: 'پشتیبانی', href: '/support' },
      { name: 'پیگیری سفارش', href: '/track' },
      { name: 'بازگشت کالا', href: '/returns' }
    ],
    legal: [
      { name: 'قوانین و مقررات', href: '/terms' },
      { name: 'حریم خصوصی', href: '/privacy' },
      { name: 'شرایط استفاده', href: '/conditions' },
      { name: 'گارانتی', href: '/warranty' }
    ]
  }

  const socialLinks = [
    { name: 'Instagram', icon: '📷', href: '#' },
    { name: 'Telegram', icon: '✈️', href: '#' },
    { name: 'WhatsApp', icon: '💬', href: '#' },
    { name: 'YouTube', icon: '📺', href: '#' }
  ]

  // تابع ارسال ایمیل خبرنامه به بک‌اند
  async function handleNewsletterSubmit(e) {
    e.preventDefault()
    if (!newsletterEmail || !newsletterEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setNewsletterStatus('error')
      setNewsletterMessage('لطفا یک ایمیل معتبر وارد کنید.')
      return
    }
    setNewsletterStatus('loading')
    setNewsletterMessage('')
    try {
      // فرض: بک‌اند شما یک endpoint به نام /api/newsletter دارد که POST می‌گیرد
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail })
      })
      if (res.ok) {
        setNewsletterStatus('success')
        setNewsletterMessage('ایمیل شما با موفقیت ثبت شد!')
        setNewsletterEmail('')
      } else {
        const data = await res.json().catch(() => ({}))
        setNewsletterStatus('error')
        setNewsletterMessage(data?.message || 'خطا در ثبت ایمیل. لطفا دوباره تلاش کنید.')
      }
    } catch (err) {
      setNewsletterStatus('error')
      setNewsletterMessage('خطا در ارتباط با سرور. لطفا بعدا تلاش کنید.')
    }
  }

  return (
    <footer className=' relative p-5 bg-white dark:bg-gray-900'>
      <div className="absolute top-6 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 flex items-center justify-center">
        <button
          type="button"
          className="w-6 h-6 flex items-center justify-center focus:outline-none"
          aria-label="رفتن به بالای صفحه"
          onClick={() => {
            if (typeof window !== 'undefined') {
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 18.75 7.5-7.5 7.5 7.5" />
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 7.5-7.5 7.5 7.5" />
          </svg>

        </button>
      </div>
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900 text-white relative overflow-hidden inner-curve-footer" ref={ref}>

        {/* <div> */}
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        {/* Decorative Elements */}
        <motion.div
          className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-r from-emerald-500/20 to-transparent rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-orange-500/20 to-transparent rounded-full blur-3xl"
          animate={{ scale: [1, 0.9, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 space-y-6"
            >
              <motion.div className="flex items-center gap-3">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg"
                >
                  <span className="text-white font-bold text-xl">V</span>
                </motion.div>
                <div>
                  <span className="text-2xl font-black bg-gradient-to-r from-emerald-400 to-orange-400 bg-clip-text text-transparent">
                    ونتورا
                  </span>
                  <div className="text-sm text-gray-300">تجهیزات ماجراجویی</div>
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-gray-200 leading-relaxed max-w-md"
              >
                ونتورا، مرجع تخصصی تجهیزات کمپینگ و طبیعت‌گردی با بیش از یک دهه تجربه در ارائه محصولات باکیفیت از برترین برندهای جهانی.
              </motion.p>

              {/* Contact Info */}
              {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            {[
              { icon: MapPinIcon, text: 'تهران، خیابان ولیعصر، پلاک ۱۲۳' },
              { icon: PhoneIcon, text: '۰۲۱-۸۸۷۷۶۶۵۵' },
              { icon: EnvelopeIcon, text: 'info@ventura.com' }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="flex items-center gap-3 text-gray-200"
              >
                <item.icon className="w-5 h-5 text-emerald-400" />
                <span className="text-sm">{item.text}</span>
              </motion.div>
            ))}
          </motion.div> */}

              {/* Social Links */}
              {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex gap-3"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.href}
                whileHover={{ scale: 1.2, y: -3 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all duration-300 text-lg shadow-md"
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div> */}
            </motion.div>

            {/* Company Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-lg font-semibold mb-6 text-emerald-400">شرکت</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link, i) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      className="text-gray-200 hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-emerald-400 hover:to-teal-400 transition-all duration-300 text-sm inline-block"
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Support Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="text-lg font-semibold mb-6 text-emerald-400">پشتیبانی</h3>
              <ul className="space-y-3">
                {footerLinks.support.map((link, i) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      className="text-gray-200 hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-emerald-400 hover:to-teal-400 transition-all duration-300 text-sm inline-block"
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Legal Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h3 className="text-lg font-semibold mb-6 text-emerald-400">قوانین</h3>
              <ul className="space-y-3">
                {footerLinks.legal.map((link, i) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      className="text-gray-200 hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-emerald-400 hover:to-teal-400 transition-all duration-300 text-sm inline-block"
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-12 pt-8 border-t border-gray-700/50"
          >
            <form
              className="max-w-md mx-auto text-center"
              onSubmit={handleNewsletterSubmit}
              noValidate
            >
              <h3 className="text-xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400">
                عضویت در خبرنامه ونتورا
              </h3>
              <p className="text-gray-200 mb-6 text-sm">
                از جدیدترین محصولات و تخفیف‌های ویژه باخبر شوید
              </p>
              <div className="flex gap-3">
                <motion.input
                  type="email"
                  placeholder="ایمیل خود را وارد کنید"
                  className="flex-1 px-4 py-3 bg-white/10 backdrop-blur-md border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-300"
                  whileFocus={{ scale: 1.02 }}
                  value={newsletterEmail}
                  onChange={e => {
                    setNewsletterEmail(e.target.value)
                    setNewsletterStatus('idle')
                    setNewsletterMessage('')
                  }}
                  disabled={newsletterStatus === 'loading'}
                  required
                  autoComplete="email"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm
                ${newsletterStatus === 'loading' ? 'opacity-60 cursor-not-allowed' : ''}
              `}
                  disabled={newsletterStatus === 'loading'}
                >
                  {newsletterStatus === 'loading' ? 'در حال ارسال...' : 'عضویت'}
                </motion.button>
              </div>
              {newsletterStatus === 'success' && (
                <div className="mt-4 text-green-400 text-sm">{newsletterMessage}</div>
              )}
              {newsletterStatus === 'error' && (
                <div className="mt-4 text-red-400 text-sm">{newsletterMessage}</div>
              )}
            </form>
          </motion.div>

          {/* Bottom Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="border-t border-gray-700/50 mt-12 pt-8"
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-gray-300 text-sm flex items-center">
                © ۲۰۲۴ ونتورا. تمامی حقوق محفوظ است. ساخته شده با
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mx-1"
                >
                  <HeartIcon className="w-4 h-4 text-red-500" />
                </motion.div>
                توسط
                <span className="text-emerald-400 font-medium mr-1">SobhanDev</span>
              </div>
              <div className="flex items-center gap-6 text-gray-300 text-sm">
                <div className="flex items-center gap-3">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="gap-x-4 flex items-center justify-center"
                  >
                    {[
                      { icon: MapPinIcon, text: 'تهران، خیابان ولیعصر، پلاک ۱۲۳' },
                      { icon: PhoneIcon, text: '۰۲۱-۸۸۷۷۶۶۵۵' },
                      { icon: EnvelopeIcon, text: 'info@ventura.com' }
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                        className="flex items-center gap-3 text-gray-200"
                      >
                        <item.icon className="w-5 h-5 text-emerald-400" />
                        <span className="text-sm">{item.text}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}