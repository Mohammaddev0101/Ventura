'use client'
import { useState } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Card, CardContent } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { MagnifyingGlassIcon, CalendarIcon, UserIcon, TagIcon } from '@heroicons/react/24/outline'
import { formatDate } from '@/lib/utils'

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  const blogPosts = [
    {
      id: 1,
      title: 'راهنمای کامل انتخاب چادر مناسب',
      excerpt: 'در این مقاله به بررسی انواع چادر و نحوه انتخاب بهترین چادر برای نیازهای مختلف می‌پردازیم.',
      image: '🏕️',
      category: 'راهنمای خرید',
      author: 'علی احمدی',
      date: '2024-01-15',
      readTime: '5 دقیقه',
      tags: ['چادر', 'کمپینگ', 'راهنما']
    },
    {
      id: 2,
      title: '10 نکته مهم برای کمپینگ زمستانی',
      excerpt: 'کمپینگ در زمستان چالش‌های خاص خود را دارد. این نکات به شما کمک می‌کند تا تجربه‌ای ایمن و لذت‌بخش داشته باشید.',
      image: '❄️',
      category: 'نکات و ترفندها',
      author: 'سارا محمدی',
      date: '2024-01-10',
      readTime: '8 دقیقه',
      tags: ['زمستان', 'کمپینگ', 'ایمنی']
    },
    {
      id: 3,
      title: 'بررسی کوله‌پشتی‌های جدید 2024',
      excerpt: 'نگاهی به جدیدترین مدل‌های کوله‌پشتی که در سال 2024 عرضه شده‌اند و مقایسه ویژگی‌های آن‌ها.',
      image: '🎒',
      category: 'بررسی محصول',
      author: 'رضا کریمی',
      date: '2024-01-05',
      readTime: '12 دقیقه',
      tags: ['کوله پشتی', 'بررسی', '2024']
    },
    {
      id: 4,
      title: 'آشپزی در طبیعت: دستور العمل‌های ساده',
      excerpt: 'چگونه با حداقل امکانات، غذاهای خوشمزه و مقوی در طبیعت تهیه کنیم.',
      image: '🍳',
      category: 'آشپزی',
      author: 'مریم رضایی',
      date: '2024-01-01',
      readTime: '6 دقیقه',
      tags: ['آشپزی', 'طبیعت', 'غذا']
    },
    {
      id: 5,
      title: 'بهترین مقاصد کمپینگ در ایران',
      excerpt: 'معرفی زیباترین و بهترین مکان‌های کمپینگ در سراسر ایران همراه با راهنمای دسترسی.',
      image: '🗺️',
      category: 'مقاصد سفر',
      author: 'احمد نوری',
      date: '2023-12-28',
      readTime: '10 دقیقه',
      tags: ['مقاصد', 'ایران', 'سفر']
    },
    {
      id: 6,
      title: 'نگهداری و تمیز کردن تجهیزات کمپینگ',
      excerpt: 'نحوه صحیح نگهداری و تمیز کردن تجهیزات کمپینگ برای افزایش عمر مفید آن‌ها.',
      image: '🧽',
      category: 'نگهداری',
      author: 'فاطمه احمدی',
      date: '2023-12-25',
      readTime: '7 دقیقه',
      tags: ['نگهداری', 'تمیزی', 'تجهیزات']
    }
  ]

  const categories = [
    'همه مقالات',
    'راهنمای خرید',
    'نکات و ترفندها',
    'بررسی محصول',
    'آشپزی',
    'مقاصد سفر',
    'نگهداری'
  ]

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.includes(searchTerm) || post.excerpt.includes(searchTerm)
    const matchesCategory = selectedCategory === '' || selectedCategory === 'همه مقالات' || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-white dark:bg-text-dark">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-primary-light to-white dark:from-text-dark dark:to-neutral-gray">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-text-dark dark:text-white mb-6">
              وبلاگ ونتورا
            </h1>
            <p className="text-xl text-neutral-gray max-w-2xl mx-auto">
              راهنماها، نکات و تجربیات مفید برای کمپینگ و طبیعت‌گردی
            </p>
          </div>
        </section>

        {/* Search and Filter */}
        <section className="py-8 border-b border-neutral-light dark:border-neutral-gray">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Input
                  type="text"
                  placeholder="جستجو در مقالات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-12"
                />
                <MagnifyingGlassIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-gray" />
              </div>

              {/* Categories */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-xl font-semibold text-text-dark dark:text-white mb-2">
                  مقاله‌ای یافت نشد
                </h3>
                <p className="text-neutral-gray">
                  لطفاً عبارت جستجو یا دسته‌بندی خود را تغییر دهید
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <Card key={post.id} className="group hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-0">
                      {/* Post Image */}
                      <div className="w-full h-48 bg-gradient-to-br from-primary-light to-primary/20 flex items-center justify-center">
                        <span className="text-6xl">{post.image}</span>
                      </div>

                      {/* Post Content */}
                      <div className="p-6">
                        {/* Category */}
                        <div className="flex items-center space-x-2 space-x-reverse mb-3">
                          <TagIcon className="w-4 h-4 text-primary" />
                          <span className="text-sm text-primary font-medium">
                            {post.category}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-text-dark dark:text-white mb-3 group-hover:text-primary transition-colors">
                          <Link href={`/blog/${post.id}`}>
                            {post.title}
                          </Link>
                        </h3>

                        {/* Excerpt */}
                        <p className="text-neutral-gray text-sm mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>

                        {/* Meta Info */}
                        <div className="flex items-center justify-between text-xs text-neutral-gray">
                          <div className="flex items-center space-x-4 space-x-reverse">
                            <div className="flex items-center space-x-1 space-x-reverse">
                              <UserIcon className="w-4 h-4" />
                              <span>{post.author}</span>
                            </div>
                            <div className="flex items-center space-x-1 space-x-reverse">
                              <CalendarIcon className="w-4 h-4" />
                              <span>{formatDate(post.date)}</span>
                            </div>
                          </div>
                          <span>{post.readTime}</span>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mt-4">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-neutral-light dark:bg-neutral-gray/30 text-xs rounded-full"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              از جدیدترین مقالات باخبر شوید
            </h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              عضو خبرنامه ونتورا شوید و هر هفته مقالات جدید و مفید را دریافت کنید
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="ایمیل خود را وارد کنید"
                className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
              <Button variant="secondary">
                عضویت در خبرنامه
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}