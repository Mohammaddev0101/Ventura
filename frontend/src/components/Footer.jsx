'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  MapPinIcon, 
  PhoneIcon, 
  EnvelopeIcon,
  HeartIcon
} from '@heroicons/react/24/outline'

export default function Footer() {
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

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-green-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center space-x-3 space-x-reverse"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">V</span>
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-orange-400 bg-clip-text text-transparent">
                  ونتورا
                </span>
                <div className="text-sm text-gray-400">تجهیزات کمپینگ</div>
              </div>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-gray-300 leading-relaxed max-w-md"
            >
              ونتورا، مرجع تخصصی تجهیزات کمپینگ و طبیعت‌گردی. با بیش از ۱۰ سال تجربه، 
              بهترین برندهای دنیا را به شما ارائه می‌دهیم.
            </motion.p>

            {/* Contact Info */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-3"
            >
              <div className="flex items-center space-x-3 space-x-reverse text-gray-300">
                <MapPinIcon className="w-5 h-5 text-green-400" />
                <span className="text-sm">تهران، خیابان ولیعصر، پلاک ۱۲۳</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse text-gray-300">
                <PhoneIcon className="w-5 h-5 text-green-400" />
                <span className="text-sm">۰۲۱-۸۸۷۷۶۶۵۵</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse text-gray-300">
                <EnvelopeIcon className="w-5 h-5 text-green-400" />
                <span className="text-sm">info@ventura.com</span>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex space-x-4 space-x-reverse"
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-green-500 transition-all duration-300 text-lg"
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-6 text-green-400">شرکت</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-gray-300 hover:text-green-400 transition-colors text-sm hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold mb-6 text-green-400">پشتیبانی</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-gray-300 hover:text-green-400 transition-colors text-sm hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-lg font-semibold mb-6 text-green-400">قوانین</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-gray-300 hover:text-green-400 transition-colors text-sm hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Newsletter */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 pt-8 border-t border-gray-700"
        >
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-xl font-semibold mb-4 text-green-400">عضویت در خبرنامه</h3>
            <p className="text-gray-300 mb-6 text-sm">
              از جدیدترین محصولات و تخفیف‌های ویژه باخبر شوید
            </p>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="ایمیل خود را وارد کنید"
                className="flex-1 px-4 py-3 bg-white/10 backdrop-blur-sm border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-xl font-medium transition-all shadow-lg hover:shadow-xl"
              >
                عضویت
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="border-t border-gray-700 mt-12 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm flex items-center">
              © ۲۰۲۴ ونتورا. تمامی حقوق محفوظ است. ساخته شده با 
              <HeartIcon className="w-4 h-4 text-red-500 mx-1" />
              توسط 
              <span className="text-green-400 font-medium mr-1">SobhanDev</span>
            </div>
            <div className="flex items-center space-x-6 space-x-reverse text-gray-400 text-sm">
              <span>روش‌های پرداخت:</span>
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="w-8 h-6 bg-white/20 rounded flex items-center justify-center">
                  <span className="text-xs">💳</span>
                </div>
                <div className="w-8 h-6 bg-white/20 rounded flex items-center justify-center">
                  <span className="text-xs">🏦</span>
                </div>
                <div className="w-8 h-6 bg-white/20 rounded flex items-center justify-center">
                  <span className="text-xs">💰</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-r from-green-500/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-orange-500/10 to-transparent rounded-full blur-3xl"></div>
    </footer>
  )
}