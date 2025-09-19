'use client'
import Link from 'next/link'

export default function Categories() {
  const categories = [
    {
      id: 1,
      name: 'چراغ قوه',
      icon: '🔦',
      count: 25,
      color: 'bg-green-600',
      href: '/categories/flashlight'
    },
    {
      id: 2,
      name: 'قمقمه و بطری',
      icon: '🍶',
      count: 18,
      color: 'bg-orange-500',
      href: '/categories/bottles'
    },
    {
      id: 3,
      name: 'صندلی کمپینگ',
      icon: '🪑',
      count: 12,
      color: 'bg-blue-500',
      href: '/categories/chairs'
    },
    {
      id: 4,
      name: 'کوله پشتی',
      icon: '🎒',
      count: 30,
      color: 'bg-red-500',
      href: '/categories/backpacks'
    }
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-green-100 dark:bg-green-100 px-4 py-2 rounded-full mb-4">
            <span className="text-green-600 font-medium">دسته بندی محصولات</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-text-light mb-4">
            دسته‌بندی تجهیزات
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            تجهیزات مورد نیاز خود را از دسته‌بندی‌های مختلف انتخاب کنید
          </p>
        </div>

        {/* Categories Grid */}
        <div className="bg-green-600 rounded-3xl p-8 mb-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={category.href}
                className="group bg-white rounded-2xl p-6 text-center hover:scale-105 transform transition-all duration-300 shadow-lg"
              >
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>

        {/* View All Categories */}
        <div className="text-center">
          <Link
            href="/categories"
            className="inline-flex items-center space-x-2 space-x-reverse text-green-600 hover:text-green-700 font-medium transition-colors"
          >
            <span>مشاهده همه دسته‌بندی‌ها</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}