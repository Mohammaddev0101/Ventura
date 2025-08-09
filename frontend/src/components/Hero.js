'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      id: 1,
      title: 'سفری رویایی، تجهیزاتی بی‌نظیر',
      subtitle: 'بهترین تجهیزات کمپینگ و طبیعت‌گردی',
      description: 'با تجهیزات باکیفیت ونتورا، هر سفر را به یک تجربه فراموش‌نشدنی تبدیل کنید',
      image: '/images/hero-camping.jpg',
      cta: 'مشاهده محصولات',
      price: '۱,۹۹۹',
      originalPrice: '۲,۴۹۹'
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  return (
    <section className="relative bg-gradient-to-br from-primary-light to-white dark:from-text-dark dark:to-neutral-gray overflow-hidden">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-text-dark dark:text-white leading-tight">
                سفری رویایی،
                <br />
                <span className="text-primary">تجهیزاتی بی‌نظیر</span>
              </h1>
              <p className="text-lg text-neutral-gray dark:text-neutral-light max-w-md">
                بهترین تجهیزات کمپینگ و طبیعت‌گردی را از ونتورا بخرید و هر سفر را به یک تجربه فراموش‌نشدنی تبدیل کنید
              </p>
            </div>

            {/* Price Display */}
            <div className="flex items-center space-x-4 space-x-reverse">
              <span className="text-3xl font-bold text-primary">
                ۱,۹۹۹ هزار تومان
              </span>
              <span className="text-lg text-neutral-gray line-through">
                ۲,۴۹۹ هزار تومان
              </span>
              <span className="bg-auxiliary-orange text-white px-3 py-1 rounded-full text-sm font-medium">
                ۲۰٪ تخفیف
              </span>
            </div>

            {/* CTA Button */}
            <div className="flex items-center space-x-4 space-x-reverse">
              <Link
                href="/products"
                className="btn-primary inline-flex items-center space-x-2 space-x-reverse group"
              >
                <span>مشاهده محصولات</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <Link
                href="/categories"
                className="px-6 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-lg font-medium transition-all duration-300"
              >
                دسته‌بندی‌ها
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-neutral-light dark:border-neutral-gray">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">۱۰۰+</div>
                <div className="text-sm text-neutral-gray">محصول متنوع</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">۵۰۰+</div>
                <div className="text-sm text-neutral-gray">مشتری راضی</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">۲۴/۷</div>
                <div className="text-sm text-neutral-gray">پشتیبانی</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative z-10 float-animation">
              {/* Main Product Display */}
              <div className="bg-white dark:bg-neutral-gray/20 rounded-3xl p-8 shadow-2xl">
                <div className="relative">
                  {/* Camping Scene */}
                  <div className="w-full h-80 bg-gradient-to-br from-primary-light to-primary/20 rounded-2xl flex items-center justify-center relative overflow-hidden">
                    {/* Trees */}
                    <div className="absolute left-4 bottom-0">
                      <svg width="60" height="80" viewBox="0 0 60 80" className="text-primary">
                        <path d="M30 10 L20 40 L40 40 Z" fill="currentColor" />
                        <path d="M30 25 L15 50 L45 50 Z" fill="currentColor" />
                        <rect x="28" y="50" width="4" height="30" fill="#8B4513" />
                      </svg>
                    </div>
                    <div className="absolute right-8 bottom-0">
                      <svg width="50" height="70" viewBox="0 0 50 70" className="text-primary opacity-80">
                        <path d="M25 5 L18 30 L32 30 Z" fill="currentColor" />
                        <path d="M25 20 L12 40 L38 40 Z" fill="currentColor" />
                        <rect x="23" y="40" width="4" height="30" fill="#8B4513" />
                      </svg>
                    </div>

                    {/* Tent */}
                    <div className="relative z-10">
                      <svg width="120" height="80" viewBox="0 0 120 80" className="drop-shadow-lg">
                        <path d="M20 70 L60 20 L100 70 Z" fill="#4ADE80" stroke="#22C55E" strokeWidth="2" />
                        <path d="M60 20 L60 70" stroke="#22C55E" strokeWidth="2" />
                        <path d="M30 70 L90 70" stroke="#22C55E" strokeWidth="2" />
                        <circle cx="45" cy="50" r="3" fill="#FFA700" />
                      </svg>
                    </div>

                    {/* Backpack */}
                    <div className="absolute left-16 bottom-4">
                      <svg width="40" height="50" viewBox="0 0 40 50" className="text-auxiliary-orange">
                        <rect x="8" y="15" width="24" height="30" rx="4" fill="currentColor" />
                        <rect x="12" y="10" width="16" height="8" rx="2" fill="currentColor" />
                        <circle cx="20" cy="25" r="3" fill="#FFF" />
                        <rect x="6" y="20" width="4" height="15" rx="2" fill="currentColor" />
                        <rect x="30" y="20" width="4" height="15" rx="2" fill="currentColor" />
                      </svg>
                    </div>

                    {/* Campfire */}
                    <div className="absolute right-20 bottom-8">
                      <svg width="30" height="30" viewBox="0 0 30 30">
                        <circle cx="15" cy="20" r="8" fill="#FFA700" opacity="0.7" />
                        <circle cx="15" cy="18" r="5" fill="#FF6B00" opacity="0.8" />
                        <circle cx="15" cy="16" r="3" fill="#FF4500" />
                      </svg>
                    </div>
                  </div>

                  {/* Product Info Overlay */}
                  <div className="absolute -bottom-4 -right-4 bg-white dark:bg-neutral-gray rounded-2xl p-4 shadow-lg">
                    <div className="text-sm text-neutral-gray">محبوب‌ترین</div>
                    <div className="font-semibold text-text-dark dark:text-white">چادر ۴ نفره</div>
                    <div className="text-primary font-bold">۱,۲۹۹ هزار تومان</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Background Decorations */}
            <div className="absolute top-10 -right-10 w-20 h-20 bg-auxiliary-orange/20 rounded-full blur-xl"></div>
            <div className="absolute bottom-10 -left-10 w-32 h-32 bg-primary/20 rounded-full blur-xl"></div>
            <div className="absolute top-1/2 -right-20 w-16 h-16 bg-auxiliary-cream/30 rounded-full blur-lg"></div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}