'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { ArrowLeftIcon, PlayIcon, StarIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import { useTheme } from '@/components/ThemeProvider'

export default function Hero() {
  const { theme } = useTheme()
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
      {/* <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 100L25 70L50 90L75 60L100 100V0H0V100Z" fill="#10b981" fillOpacity="0.1" />
        </svg>
      </div> */}

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

          {/* IMG */}
          <div className="w-full lg:hidden justify-center items-center mt-16 flex mb-28">
            <div className="relative w-full max-w-2xl flex justify-center items-center group">
              <Image
                src={
                  theme === "dark"
                    ? "/img/partdark.png"
                    : "/img/part1.png"
                }
                alt="تجهیزات کمپینگ ونتورا ۲"
                className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 z-20 transition-transform duration-500"
                loading="eager"
                width={420}
                height={200}
                style={{ background: 'none' }}
              />
            </div>
          </div>

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
              <h1 className="text-4xl lg:text-6xl  moraba font-bold">
                <span className="bg-gradient-to-r from-gray-900 to-slate-900 dark:from-white dark:to-slate-100 bg-clip-text text-transparent">سفری </span>
                <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent mx-2">رویایی </span>
                <span className="bg-gradient-to-r from-gray-900 to-slate-900 dark:from-white dark:to-slate-100 bg-clip-text text-transparent">تجربه کن !</span>
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
                {
                  num: '۱۵۰+',
                  label: 'محصول برتر',
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-2.25-1.313M21 7.5v2.25m0-2.25-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3 2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75 2.25-1.313M12 21.75V19.5m0 2.25-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" />
                    </svg>

                  )
                },
                {
                  num: '۱۰۰۰+',
                  label: 'مشتری وفادار',
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                    </svg>

                  )
                },
                {
                  num: '۲۴/۷',
                  label: 'پشتیبانی elite',
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                    </svg>


                  )
                }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                  className="text-center p-3 px-5 bg-white/50 dark:bg-gray-800/50 rounded-2xl backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-xl hover:!scale-105 transition-all cursor-default"
                >
                  <div className="text-2xl lg:text-4xl font-black text-emerald-600 dark:text-emerald-400 mb-4 flex justify-center items-center">{stat.icon}</div>
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
              <Button asChild size="lg" className="group bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white dark:text-gray-900 shadow-xl hover:shadow-2xl transition-all duration-300 px-5 py-3 rounded-2xl font-semibold">
                <Link href="/products" className="flex items-center gap-3">
                  <span className='text-xs lg:text-md'>مشاهده محصولات ونتورا</span>
                  <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-2 transition-transform duration-300" />
                </Link>
              </Button>

              <Button variant="outline" size="lg" className="group border-2 border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all duration-300 px-5 py-3 rounded-2xl font-semibold">
                <PlayIcon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300 ml-2" />
                <span className='text-xs lg:text-md'> ویدیو معرفی</span>
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
                {
                  color: 'emerald',
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                    </svg>


                  ),
                  text: 'ارسال رایگان'
                },
                {
                  color: 'blue',
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7.864 4.243A7.5 7.5 0 0 1 19.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 0 0 4.5 10.5a7.464 7.464 0 0 1-1.15 3.993m1.989 3.559A11.209 11.209 0 0 0 8.25 10.5a3.75 3.75 0 1 1 7.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 0 1-3.6 9.75m6.633-4.596a18.666 18.666 0 0 1-2.485 5.33" />
                    </svg>

                  ),
                  text: 'گارانتی اصالت'
                },
                {
                  color: 'purple',
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
                    </svg>

                  ),
                  text: 'پشتیبانی ۲۴/۷'
                }
              ].map((badge, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
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
                src={
                  theme === "dark"
                    ? "/img/partdark.png"
                    : "/img/part1.png"
                }
                alt="تجهیزات کمپینگ ونتورا ۲"
                className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 z-20 transition-transform duration-500"
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
        onClick={() => {
          const heroSection = document.querySelector('section');
          let nextSection = null;
          if (heroSection) {
            let current = heroSection.nextElementSibling;
            while (current) {
              if (current.tagName.toLowerCase() === 'section') {
                nextSection = current;
                break;
              }
              current = current.nextElementSibling;
            }
          }
          if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
          }
        }}
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