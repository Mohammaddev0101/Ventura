'use client'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MagnifyingGlassIcon, CalendarIcon, UserIcon, TagIcon } from '@heroicons/react/24/outline'
import { formatDate } from '@/lib/utils'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  
  const [searchQuery, setSearchQuery] = useState(query)
  const [products, setProducts] = useState([])
  const [blogPosts, setBlogPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('all')

  // Mock data
  const mockProducts = [
    {
      id: 1,
      name: 'چادر کوهنوردی ۴ نفره',
      price: 1299000,
      originalPrice: 1599000,
      category: { name: 'چادر و سرپناه' },
      brand: 'Coleman',
      rating: { average: 4.8, count: 124 },
      slug: 'tent-4-person'
    },
    {
      id: 2,
      name: 'کوله پشتی ۶۰ لیتری',
      price: 899000,
      originalPrice: 1099000,
      category: { name: 'کوله پشتی' },
      brand: 'Deuter',
      rating: { average: 4.6, count: 89 },
      slug: 'backpack-60l'
    }
  ]

  const mockBlogPosts = [
    {
      id: 1,
      title: 'راهنمای کامل انتخاب چادر مناسب',
      excerpt: 'در این مقاله به بررسی انواع چادر و نحوه انتخاب بهترین چادر برای نیازهای مختلف می‌پردازیم.',
      image: '🏕️',
      category: 'راهنمای خرید',
      author: 'علی احمدی',
      date: '2024-01-15',
      readTime: '5 دقیقه',
      tags: ['چادر', 'کمپینگ', 'راهنما'],
      slug: 'tent-buying-guide'
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
      tags: ['زمستان', 'کمپینگ', 'ایمنی'],
      slug: 'winter-camping-tips'
    }
  ]

  useEffect(() => {
    if (query) {
      performSearch(query)
    }
  }, [query])

  const performSearch = async (searchTerm) => {
    setLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      const filteredProducts = mockProducts.filter(product =>
        product.name.includes(searchTerm) ||
        product.category.name.includes(searchTerm) ||
        product.brand.includes(searchTerm)
      )
      
      const filteredBlogPosts = mockBlogPosts.filter(post =>
        post.title.includes(searchTerm) ||
        post.excerpt.includes(searchTerm) ||
        post.tags.some(tag => tag.includes(searchTerm))
      )
      
      setProducts(filteredProducts)
      setBlogPosts(filteredBlogPosts)
      setLoading(false)
    }, 1000)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.history.pushState({}, '', `/search?q=${encodeURIComponent(searchQuery)}`)
      performSearch(searchQuery)
    }
  }

  const totalResults = products.length + blogPosts.length

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main>
        {/* Search Header */}
        <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                نتایج جستجو
              </h1>
              {query && (
                <p className="text-xl text-blue-100 mb-8">
                  نتایج جستجو برای: <span className="font-semibold">"{query}"</span>
                </p>
              )}
              
              {/* Search Form */}
              <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="جستجو در محصولات و مقالات..."
                  className="h-14 bg-white/10 border-white/20 text-white placeholder:text-white/60 pr-14 pl-20"
                />
                <MagnifyingGlassIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-white/60" />
                <Button
                  type="submit"
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white text-blue-600 hover:bg-gray-100"
                >
                  جستجو
                </Button>
              </form>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="text-center py-16">
                <div className="inline-flex items-center space-x-2 space-x-reverse">
                  <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-lg text-gray-600 dark:text-gray-400">در حال جستجو...</span>
                </div>
              </div>
            ) : totalResults === 0 ? (
              <div className="text-center py-16">
                <div className="text-8xl mb-6">🔍</div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  نتیجه‌ای یافت نشد
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                  متأسفانه هیچ محصول یا مقاله‌ای با عبارت جستجوی شما پیدا نکردیم. لطفاً با کلمات دیگری جستجو کنید.
                </p>
                <div className="space-y-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">پیشنهادات:</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {['چادر', 'کوله پشتی', 'کیسه خواب', 'چراغ قوه', 'راهنمای کمپینگ'].map((suggestion) => (
                      <Button
                        key={suggestion}
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSearchQuery(suggestion)
                          performSearch(suggestion)
                        }}
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* Results Summary */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {totalResults} نتیجه یافت شد
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {products.length} محصول و {blogPosts.length} مقاله
                  </p>
                </div>

                {/* Tabs */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-8">
                    <TabsTrigger value="all">همه ({totalResults})</TabsTrigger>
                    <TabsTrigger value="products">محصولات ({products.length})</TabsTrigger>
                    <TabsTrigger value="blog">مقالات ({blogPosts.length})</TabsTrigger>
                  </TabsList>

                  {/* All Results */}
                  <TabsContent value="all" className="space-y-12">
                    {products.length > 0 && (
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                          محصولات ({products.length})
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                          {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                          ))}
                        </div>
                      </div>
                    )}

                    {blogPosts.length > 0 && (
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                          مقالات ({blogPosts.length})
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {blogPosts.map((post) => (
                            <Card key={post.id} className="group hover:shadow-xl transition-all duration-300">
                              <CardContent className="p-0">
                                <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 flex items-center justify-center">
                                  <span className="text-6xl">{post.image}</span>
                                </div>
                                <div className="p-6">
                                  <div className="flex items-center space-x-2 space-x-reverse mb-3">
                                    <TagIcon className="w-4 h-4 text-blue-600" />
                                    <span className="text-sm text-blue-600 font-medium">
                                      {post.category}
                                    </span>
                                  </div>
                                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 transition-colors">
                                    <a href={`/blog/${post.slug}`}>
                                      {post.title}
                                    </a>
                                  </h3>
                                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                                    {post.excerpt}
                                  </p>
                                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
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
                                  <div className="flex flex-wrap gap-1 mt-4">
                                    {post.tags.map((tag) => (
                                      <span
                                        key={tag}
                                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded-full"
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
                      </div>
                    )}
                  </TabsContent>

                  {/* Products Only */}
                  <TabsContent value="products">
                    {products.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.map((product) => (
                          <ProductCard key={product.id} product={product} />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-16">
                        <div className="text-6xl mb-4">📦</div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                          محصولی یافت نشد
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          هیچ محصولی با عبارت جستجوی شما پیدا نشد
                        </p>
                      </div>
                    )}
                  </TabsContent>

                  {/* Blog Posts Only */}
                  <TabsContent value="blog">
                    {blogPosts.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {blogPosts.map((post) => (
                          <Card key={post.id} className="group hover:shadow-xl transition-all duration-300">
                            <CardContent className="p-0">
                              <div className="w-full h-48 bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 flex items-center justify-center">
                                <span className="text-6xl">{post.image}</span>
                              </div>
                              <div className="p-6">
                                <div className="flex items-center space-x-2 space-x-reverse mb-3">
                                  <TagIcon className="w-4 h-4 text-green-600" />
                                  <span className="text-sm text-green-600 font-medium">
                                    {post.category}
                                  </span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-green-600 transition-colors">
                                  <a href={`/blog/${post.slug}`}>
                                    {post.title}
                                  </a>
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                                  {post.excerpt}
                                </p>
                                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
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
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-16">
                        <div className="text-6xl mb-4">📝</div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                          مقاله‌ای یافت نشد
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          هیچ مقاله‌ای با عبارت جستجوی شما پیدا نشد
                        </p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}