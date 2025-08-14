'use client'
import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { ArrowLeftIcon, PlayIcon, StarIcon } from '@heroicons/react/24/outline'

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 300], [0, -50])
  const y2 = useTransform(scrollY, [0, 300], [0, -100])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      {/* Background Elements */}
      <motion.div 
        style={{ y: y2 }}
        className="absolute inset-0 opacity-30"
      >
        <div className="absolute top-20 right-20 w-72 h-72 bg-green-200 dark:bg-green-800 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-orange-200 dark:bg-orange-800 rounded-full blur-3xl opacity-20"></div>
      </motion.div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]"
        >
          {/* Content */}
          <motion.div 
            style={{ opacity }}
            className="space-y-8"
          >
            <motion.div variants={itemVariants} className="space-y-6">
              <motion.div 
                className="inline-flex items-center bg-green-100 dark:bg-green-900/30 px-4 py-2 rounded-full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <StarIcon className="w-5 h-5 text-green-600 dark:text-green-400 ml-2" />
                <span className="text-green-700 dark:text-green-300 font-medium text-sm">
                  بهترین تجهیزات کمپینگ
                </span>
              </motion.div>

              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="text-gray-900 dark:text-white">سفری </span>
                <span className="text-gradient bg-gradient-to-r from-green-600 to-orange-500 bg-clip-text text-transparent">
                  رویایی
                </span>
                <br />
                <span className="text-gray-900 dark:text-white">تجهیزاتی </span>
                <span className="text-gradient bg-gradient-to-r from-orange-500 to-green-600 bg-clip-text text-transparent">
                  بی‌نظیر
                </span>
              </h1>

              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-lg leading-relaxed">
                با تجهیزات باکیفیت ونتورا، هر سفر را به یک تجربه فراموش‌نشدنی تبدیل کنید
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-3 gap-8 py-8"
            >
              {[
                { number: '۱۰۰+', label: 'محصول متنوع' },
                { number: '۵۰۰+', label: 'مشتری راضی' },
                { number: '۲۴/۷', label: 'پشتیبانی' }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  className="text-center"
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button asChild size="lg" className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <Link href="/products" className="flex items-center gap-2">
                    <span>مشاهده محصولات</span>
                    <ArrowLeftIcon className="w-5 h-5" />
                  </Link>
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" size="lg" className="border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 px-8 py-4 rounded-xl">
                  <PlayIcon className="w-5 h-5 ml-2" />
                  تماشای ویدیو
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div 
            style={{ y: y1 }}
            className="relative"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="relative z-10"
            >
              {/* Main Product Display */}
              <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl glow">
                <div className="relative">
                  {/* 3D Camping Scene */}
                  <div className="w-full h-96 bg-gradient-to-br from-green-100 to-orange-100 dark:from-green-900/30 dark:to-orange-900/30 rounded-2xl flex items-center justify-center relative overflow-hidden">
                    {/* Animated Background Elements */}
                    <motion.div 
                      animate={{ 
                        rotate: 360,
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                        scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                      }}
                      className="absolute inset-0 opacity-10"
                    >
                      <div className="w-full h-full bg-gradient-to-r from-green-400 to-orange-400 rounded-2xl"></div>
                    </motion.div>

                    {/* Trees */}
                    <motion.div 
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.8, duration: 0.8 }}
                      className="absolute left-4 bottom-0"
                    >
                      <svg width="80" height="100" viewBox="0 0 80 100" className="text-green-600 dark:text-green-400">
                        <motion.path 
                          d="M40 15 L25 50 L55 50 Z" 
                          fill="currentColor"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ delay: 1, duration: 1 }}
                        />
                        <motion.path 
                          d="M40 35 L20 65 L60 65 Z" 
                          fill="currentColor"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ delay: 1.2, duration: 1 }}
                        />
                        <rect x="38" y="65" width="4" height="35" fill="#8B4513" />
                      </svg>
                    </motion.div>

                    {/* Tent - Main Focus */}
                    <motion.div 
                      className="relative z-10"
                      initial={{ scale: 0, rotate: -10 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 1, duration: 0.8, type: "spring" }}
                      whileHover={{ scale: 1.05, rotate: 2 }}
                    >
                      <svg width="160" height="120" viewBox="0 0 160 120" className="drop-shadow-2xl">
                        <defs>
                          <linearGradient id="tentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#10B981" />
                            <stop offset="100%" stopColor="#059669" />
                          </linearGradient>
                        </defs>
                        <path d="M30 90 L80 30 L130 90 Z" fill="url(#tentGradient)" stroke="#047857" strokeWidth="3" />
                        <path d="M80 30 L80 90" stroke="#047857" strokeWidth="3" />
                        <path d="M40 90 L120 90" stroke="#047857" strokeWidth="3" />
                        <circle cx="65" cy="65" r="4" fill="#F59E0B" />
                        <motion.circle 
                          cx="95" cy="65" r="2" fill="#EF4444"
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </svg>
                    </motion.div>

                    {/* Floating Elements */}
                    <motion.div 
                      className="absolute right-16 top-8"
                      animate={{ y: [-5, 5, -5] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <div className="w-8 h-8 bg-orange-400 rounded-full opacity-60 blur-sm"></div>
                    </motion.div>

                    <motion.div 
                      className="absolute left-20 top-12"
                      animate={{ y: [5, -5, 5] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <div className="w-6 h-6 bg-green-400 rounded-full opacity-40 blur-sm"></div>
                    </motion.div>
                  </div>

                  {/* Product Info Cards */}
                  <motion.div 
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                    className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-xl border border-gray-100 dark:border-gray-700"
                  >
                    <div className="text-sm text-gray-500 dark:text-gray-400">محبوب‌ترین</div>
                    <div className="font-bold text-gray-900 dark:text-white">چادر ۴ نفره</div>
                    <div className="text-green-600 dark:text-green-400 font-bold">۱,۲۹۹ هزار تومان</div>
                    <div className="flex items-center mt-2">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                      <span className="text-xs text-gray-500 dark:text-gray-400 mr-2">(۱۲۴)</span>
                    </div>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.7, duration: 0.8 }}
                    className="absolute -top-4 -left-4 bg-orange-500 text-white rounded-xl p-3 shadow-lg"
                  >
                    <div className="text-xs font-medium">تخفیف ویژه</div>
                    <div className="text-lg font-bold">۲۰٪</div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Background Decorations */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute top-10 -right-10 w-20 h-20 bg-orange-200 dark:bg-orange-800 rounded-full blur-xl opacity-60"
            ></motion.div>
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-10 -left-10 w-32 h-32 bg-green-200 dark:bg-green-800 rounded-full blur-xl opacity-40"
            ></motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center">
          <motion.div 
            className="w-1 h-3 bg-gray-600 dark:bg-gray-400 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          ></motion.div>
        </div>
      </motion.div>
    </section>
  )
}