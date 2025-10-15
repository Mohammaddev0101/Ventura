'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import Image from 'next/image'

export default function BrandShowcase() {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  })

  const brands = [
    { name: 'Jack Wolfskin', logo: 'JW' },
    { name: 'Coleman', logo: 'CO' },
    { name: 'The North Face', logo: 'TNF' },
    { name: 'Patagonia', logo: 'PAT' },
    { name: 'Mammut', logo: 'MAM' },
    { name: 'Salomon', logo: 'SAL' },
    { name: 'Deuter', logo: 'DEU' },
    { name: 'Osprey', logo: 'OSP' }
  ]

  return (
    <section className="py-16 bg-gradient-to-b from-slate-50 to-white dark:from-gray-900 dark:to-gray-800" ref={ref}>
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Jack Wolfskin Featured Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="bg-gradient-to-r from-orange-100/50 to-orange-50/50 dark:from-orange-900/20 dark:to-orange-800/20 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-orange-200/30 dark:border-orange-800/30">
            <div className="grid lg:grid-cols-2 gap-8 items-center pb-10 md:pb-0">
              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-6 mb-14 md:mb-0"
              >
                <div className="flex items-center gap-4">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center shadow-lg"
                  >
                    <span className="text-white font-bold text-lg">JW</span>
                  </motion.div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-orange-600 dark:from-white dark:to-orange-400 moraba">
                      کوله‌های حرفه‌ای
                    </h3>
                    <p className="text-orange-500 dark:text-orange-400 font-semibold">JACK WOLFSKIN</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed max-w-md">
                  کوله‌های جک ولف‌اسکین با طراحی ارگونومیک و دوام بی‌نظیر، همراه ایده‌آل شما در هر ماجراجویی.
                </p>

                <Link href="/brands/jack-wolfskin">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-orange-500 mt-7 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    مشاهده محصولات
                  </motion.button>
                </Link>
              </motion.div>
              <div className="flex justify-center mt-8">
                <div className="w-32 h-32 scale-[3] flex items-center justify-center">
                  <Image
                    src="/img/bag.webp"
                    alt="ونتورا"
                    className="w-28 h-28 object-contain transition-transform duration-300 hover:scale-105"
                    width={360}
                    height={200}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* All Brands Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center bg-emerald-100/50 dark:bg-emerald-900/30 backdrop-blur-sm px-5 py-2 rounded-full mb-6 border border-emerald-200/50 dark:border-emerald-800/50 mt-32">
            <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
              </svg>
              برندهای همکار ونتورا
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-gray-900 to-emerald-600 dark:from-white dark:to-emerald-400 bg-clip-text text-transparent mb-4 moraba">

            محبوب‌ترین برندهای تجهیزات کمپینگ  
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            با بهترین برندهای جهانی تجهیزات کمپینگ، کیفیت و اطمینان را تجربه کنید.
          </p>
        </motion.div>

        {/* Brands Grid */}
        <div
          className="w-full overflow-x-auto scrollbar-hide py-2 pb-5"
          style={{ WebkitOverflowScrolling: 'touch', direction: 'rtl' }}
        >
          <div className="flex flex-nowrap gap-4 min-w-max justify-center md:justify-start px-1">
            {brands.map((brand, index) => (
              <motion.div
                key={brand.name || index}
                initial={{ opacity: 0, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.08 }}
                whileHover={{ scale: 1.07 }}
                className="bg-white/90 dark:bg-gray-800/90 rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl transition-all cursor-pointer border border-transparent hover:border-emerald-400 w-[140px]"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-cyan-500 dark:from-gray-800 dark:to-gray-700 rounded-lg flex items-center justify-center mx-auto mb-3 shadow">
                  <span className="text-white dark:text-gray-200 font-extrabold text-xl">
                    {brand.logo ? brand.logo : (brand.name ? brand.name.charAt(0) : '')}
                  </span>
                </div>
                <h3
                  className="text-gray-900 dark:text-white text-md truncate max-w-full"
                  style={{
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis"
                  }}
                  title={brand.name}
                >
                  {brand.name}
                </h3>
              </motion.div>
            ))}
          </div>
          <style jsx global>{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
            .scrollbar-hide {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}</style>
        </div>
      </div>
    </section>
  )
}