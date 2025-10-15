'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'

export default function Categories() {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  })

  const categories = [
    {
      id: 1,
      name: 'کوله پشتی',
      icon: '/img/1cat.png',
      count: 25,
      color: 'from-emerald-400 via-teal-400 to-emerald-600',
      href: '/categories/flashlight'
    },
    {
      id: 2,
      name: 'میز و صندلی',
      icon: '/img/3cat.png',
      count: 18,
      color: 'from-orange-400 via-amber-400 to-orange-600',
      href: '/categories/bottles'
    },
    {
      id: 3,
      name: 'فلاسک و ماگ',
      icon: '/img/2cat.png',
      count: 12,
      color: 'from-blue-400 via-cyan-400 to-blue-600',
      href: '/categories/chairs'
    },
    {
      id: 4,
      name: 'چراغ قوه',
      icon: '/img/4cat.png',
      count: 30,
      color: 'from-pink-400 via-red-400 to-pink-600',
      href: '/categories/backpacks'
    }
  ]

  return (
    <section
      className="pt-20 pb-10 bg-gradient-to-b from-slate-50 to-white dark:from-gray-900 dark:to-gray-900"
      ref={ref}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center bg-white/40 dark:bg-emerald-900/40 backdrop-blur-md px-5 py-2 rounded-full mb-7 border border-emerald-200/40 dark:border-emerald-800/40 shadow-md shadow-emerald-100/30 dark:shadow-emerald-900/20">
            <span className="text-emerald-600 dark:text-emerald-400 tracking-wide text-md flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
            </svg> دسته‌بندی‌های ونتورا
            </span>
          </div>
          <h2 className="text-2xl lg:text-5xl font-extrabold bg-gradient-to-r from-gray-900 via-emerald-600 to-teal-400 dark:from-white dark:via-emerald-400 dark:to-teal-300 bg-clip-text text-transparent mb-5 drop-shadow-lg moraba">
            تجهیزات ماجراجویی خود را انتخاب کنید
          </h2>
          <p className="text-sm text-gray-700 dark:text-gray-200 max-w-2xl mx-auto leading-relaxed backdrop-blur-sm bg-white/30 dark:bg-gray-900/20 rounded-xl px-6 py-3">
            دسته‌بندی‌های متنوع ونتورا را کاوش کنید و تجهیزات ایده‌آل برای طبیعت‌گردی و ماجراجویی خود را بیابید.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12 px-3 md:p-10 md:px-32"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-x-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.08 }}
              >
                <Link href={category.href} className="block focus:outline-none group">
                  <div className="flex flex-col items-center justify-center w-full h-48 rounded-3xl border border-emerald-100/30 dark:border-emerald-900/30 shadow-2xl shadow-emerald-100 dark:shadow-emerald-900/20 backdrop-blur-2xl transition-transform duration-300 group-hover:scale-105">
                    <div className="mb-4">
                      <Image
                        src={category.icon}
                        alt={category.name}
                        width={84}
                        height={84}
                        className="mx-auto rounded-xl bg-emerald-100 dark:bg-gray-900 border dark:border-0 p-2"
                      />
                    </div>
                    <h3 className="text-lg text-gray-900 dark:text-white mb-1 moraba">
                      {category.name}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* View All Categories */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center"
        >
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6 py-3 rounded-xl font-bold shadow-xl hover:shadow-emerald-300/40 dark:hover:shadow-emerald-900/40 transition-all duration-300 backdrop-blur-lg border border-white/30 dark:border-gray-800/40"
            style={{
              boxShadow:
                '0 4px 24px 0 rgba(16,185,129,0.15), 0 1.5px 4px 0 rgba(16,185,129,0.10)'
            }}
          >
            <span className="text-sm text-white dark:text-gray-900">مشاهده همه دسته‌بندی‌ها</span>
            <svg
              className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform text-white dark:text-gray-900"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}