'use client'
import Link from 'next/link'

export default function Categories() {
  const categories = [
    {
      id: 1,
      name: 'چادر و سرپناه',
      icon: '🏕️',
      count: 25,
      color: 'bg-primary',
      href: '/categories/tents'
    },
    {
      id: 2,
      name: 'کوله پشتی',
      icon: '🎒',
      count: 18,
      color: 'bg-auxiliary-orange',
      href: '/categories/backpacks'
    },
    {
      id: 3,
      name: 'صندلی و میز',
      icon: '🪑',
      count: 12,
      color: 'bg-blue-500',
      href: '/categories/furniture'
    },
    {
      id: 4,
      name: 'لوازم آشپزی',
      icon: '🍳',
      count: 30,
      color: 'bg-red-500',
      href: '/categories/cooking'
    }
  ]

  return (
    <section className="py-16 bg-white dark:bg-text-dark">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-primary-light dark:bg-primary/20 px-4 py-2 rounded-full mb-4">
            <span className="text-primary font-medium">دسته‌بندی محصولات</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-text-dark dark:text-white mb-4">
            دسته‌بندی تجهیزات
          </h2>
          <p className="text-neutral-gray max-w-2xl mx-auto">
            تجهیزات مورد نیاز خود را از دسته‌بندی‌های مختلف انتخاب کنید
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.href}
              className="group category-card hover:scale-105 transform transition-all duration-300"
            >
              <div className="text-center">
                <div className={`w-16 h-16 ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-2xl">{category.icon}</span>
                </div>
                <h3 className="font-semibold text-text-dark dark:text-white mb-2 group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-neutral-gray">
                  {category.count} محصول
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Categories */}
        <div className="text-center mt-12">
          <Link
            href="/categories"
            className="inline-flex items-center space-x-2 space-x-reverse text-primary hover:text-primary/80 font-medium transition-colors"
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