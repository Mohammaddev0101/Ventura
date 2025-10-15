'use client'
import Image from 'next/image'

export default function WeeklyDeals() {
  const images = [
    '/img/Frame-165.png',
    '/img/Frame-166.png',
    '/img/Frame-167.png',
    '/img/Frame-168.png'
  ]

  return (
    <section className="py-16 bg-gradient-to-b from-slate-50 to-white dark:from-gray-900 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-emerald-100/50 dark:bg-emerald-900/30 backdrop-blur-sm px-5 py-2 rounded-full mb-6 border border-emerald-200/50 dark:border-emerald-800/50">
            <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
              </svg>
              تخفیف‌های هیجان‌انگیز این هفته
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-gray-900 to-emerald-600 dark:from-white dark:to-emerald-400 bg-clip-text text-transparent mb-4 moraba">
            فرصت‌های استثنایی خرید
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            محصولات منتخب هفته را با قیمت ویژه تهیه کنید و در هزینه‌های خود صرفه‌جویی کنید.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          {images.map((src, idx) => (
            <div
              key={src}
              className="w-40 lg:w-56 overflow-hidden flex items-center justify-center transition-transform duration-300 hover:rotate-6"
            >
              <Image
                src={src}
                alt={`پیشنهاد هفته ${idx + 1}`}
                width={360}
                height={360}
                className="w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
