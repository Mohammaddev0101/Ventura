'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { ArrowLeftIcon, PlayIcon, StarIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

export default function Hero() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      ref={ref}
      className="relative py-20 flex items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-50 via-slate-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-emerald-900"
    >
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-10 dark:opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2310b981' fill-opacity='0.1'%3E%3Ccircle cx='40' cy='40' r='3'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Floating Geometric Elements */}
      <motion.div
        className="absolute top-10 right-10 w-24 h-24 bg-gradient-to-br from-emerald-400/20 to-teal-500/20 rounded-full blur-xl"
        animate={{
          y: [0, -30, 0],
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute bottom-20 left-20 w-32 h-32 bg-gradient-to-br from-orange-400/20 to-red-500/20 rounded-full blur-xl"
        animate={{
          y: [0, 30, 0],
          scale: [1, 0.8, 1],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Subtle Mountain Silhouette */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 100L25 70L50 90L75 60L100 100V0H0V100Z" fill="#10b981" fillOpacity="0.1" />
        </svg>
      </div>

      <div className="container mx-auto px-4 py-6 lg:py-24 relative z-10 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <Image
            src="/img/Pattern10.png"
            alt="تجهیزات کمپینگ ونتورا"
            className="absolute lg:hidden block left-1/2 top-0 w-[300px] -translate-x-2/3 -translate-y-1/2 z-10 opacity-20"
            loading="eager"
            width={320}
            height={200}
            style={{ background: 'none' }}
          />
          {/* Enhanced Content */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-10"
          >
            {/* Premium Badge */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/40 dark:to-teal-900/40 text-emerald-700 dark:text-emerald-300 px-4 py-2 rounded-full text-xs font-semibold shadow-lg"
            >
              <StarIcon className="w-5 h-5" />
              <span>بهترین تجهیزات کمپینگ ونتورا</span>
            </motion.div>

            {/* Hero Heading with Enhanced Typography */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <h1 className="text-3xl lg:text-6xl  moraba font-bold">
                <span className="bg-gradient-to-r from-gray-900 to-slate-900 dark:from-white dark:to-slate-100 bg-clip-text text-transparent">سفری </span>
                <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent mx-2">رویایی </span>
                <span className="bg-gradient-to-r from-gray-900 to-slate-900 dark:from-white dark:to-slate-100 bg-clip-text text-transparent">تجربه کن</span>
              </h1>
              <p className="text-sm sm:text-md text-gray-600 dark:text-gray-300 max-w-md leading-relaxed font-medium">
                با تجهیزات حرفه‌ای کمپینگ ونتورا، هر ماجراجویی طبیعت‌گردی را به تجربه‌ای بی‌نظیر تبدیل کنید. کیفیت برتر، دوام بالا و طراحی هوشمندانه.
              </p>
            </motion.div>

            {/* Upgraded Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-3 gap-2 md:gap-9 py-3 max-w-max"
            >
              {[
                { num: '۱۵۰+', label: 'محصول برتر', icon: '🏕️' },
                { num: '۱۰۰۰+', label: 'مشتری وفادار', icon: '⭐' },
                { num: '۲۴/۷', label: 'پشتیبانی elite', icon: '🛡️' }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                  className="text-center p-3 px-5 bg-white/50 dark:bg-gray-800/50 rounded-2xl backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-xl hover:!scale-105 transition-all cursor-default"
                >
                  <div className="text-2xl lg:text-4xl font-black text-emerald-600 dark:text-emerald-400 mb-2">{stat.icon}</div>
                  <div className="text-xl font-bold text-gray-900 dark:text-white">{stat.num}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons with Hover Effects */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex gap-4"
            >
              <Button asChild size="lg" className="group bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 px-5 py-3 rounded-2xl font-semibold">
                <Link href="/products" className="flex items-center gap-3">
                  <span className='text-xs lg:text-md'>مشاهده محصولات ونتورا</span>
                  <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-2 transition-transform duration-300" />
                </Link>
              </Button>

              <Button variant="outline" size="lg" className="group border-2 border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all duration-300 px-5 py-3 rounded-2xl font-semibold">
                <PlayIcon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300 ml-2" />
                <span className='text-xs lg:text-md'>تماشای ویدیو معرفی</span>
              </Button>
            </motion.div>

            {/* Trust Badges with Icons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-wrap items-center gap-6 pt-8 border-t border-gray-200/60 dark:border-gray-700/60"
            >
              {[
                { color: 'emerald', icon: '🚚', text: 'ارسال رایگان' },
                { color: 'blue', icon: '✅', text: 'گارانتی اصالت' },
                { color: 'purple', icon: '📞', text: 'پشتیبانی ۲۴/۷' }
              ].map((badge, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  {/* <div className={`w-3 h-3 bg-${badge.color}-500 rounded-full`}></div> */}
                  <span className="flex items-center gap-1">{badge.icon} {badge.text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* IMG */}
          <div className="w-full lg:flex justify-center items-center mt-8 hidden">
            <div className="relative w-full max-w-2xl flex justify-center items-center group">
              <Image
                src="/img/Pattern10.png"
                alt="تجهیزات کمپینگ ونتورا"
                className="absolute left-1/2 top-0 w-[300px] -translate-x-1/2 -translate-y-3/4 z-10 transition-transform duration-500 group-hover:rotate-12"
                loading="eager"
                width={320}
                height={200}
                style={{ background: 'none' }}
              />
              <Image
                src="/img/hero.png"
                alt="تجهیزات کمپینگ ونتورا ۲"
                className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 z-20 transition-transform duration-500 group-hover:-rotate-12"
                loading="eager"
                width={420}
                height={200}
                style={{ background: 'none' }}
              />
            </div>
          </div>

        </div>
      </div>

      {/* Smooth Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-8 h-12 border-2 border-gray-400/60 dark:border-gray-500/60 rounded-full flex justify-center items-start pt-2"
        >
          <motion.div
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-4 bg-gradient-to-b from-gray-400 to-transparent rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}