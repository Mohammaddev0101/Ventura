'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent } from '@/components/ui/Card'
import { 
  MagnifyingGlassIcon, 
  AdjustmentsHorizontalIcon,
  FunnelIcon,
  Squares2X2Icon,
  ListBulletIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'

export default function ProductsPage() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    brand: '',
    minPrice: '',
    maxPrice: '',
    sort: '-createdAt'
  })
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState('grid')

  // Mock products data
  useEffect(() => {
    setTimeout(() => {
      setProducts([
        {
          id: 1,
          name: 'چادر کوهنوردی ۴ نفره پیشرفته',
          price: 1299000,
          originalPrice: 1599000,
          category: 'چادر و سرپناه',
          brand: 'Coleman',
          rating: { average: 4.8, count: 124 },
          image: 'https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg',
          discount: 19
        },
        {
          id: 2,
          name: 'کوله پشتی ۶۰ لیتری حرفه‌ای',
          price: 899000,
          originalPrice: 1099000,
          category: 'کوله پشتی',
          brand: 'Deuter',
          rating: { average: 4.6, count: 89 },
          image: 'https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg',
          discount: 18
        },
        {
          id: 3,
          name: 'کیسه خواب زمستانی گرم',
          price: 649000,
          originalPrice: 799000,
          category: 'کیسه خواب',
          brand: 'North Face',
          rating: { average: 4.7, count: 156 },
          image: 'https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg',
          discount: 19
        },
        {
          id: 4,
          name: 'چراغ قوه LED قابل شارژ',
          price: 189000,
          originalPrice: 229000,
          category: 'روشنایی',
          brand: 'Fenix',
          rating: { average: 4.5, count: 67 },
          image: 'https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg',
          discount: 17
        },
        {
          id: 5,
          name: 'اجاق گاز پرتابل کمپینگ',
          price: 459000,
          originalPrice: 529000,
          category: 'تجهیزات آشپزی',
          brand: 'Jetboil',
          rating: { average: 4.4, count: 43 },
          image: 'https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg',
          discount: 13
        },
        {
          id: 6,
          name: 'صندلی تاشو کمپینگ راحت',
          price: 329000,
          originalPrice: 399000,
          category: 'صندلی و میز',
          brand: 'Helinox',
          rating: { average: 4.6, count: 89 },
          image: 'https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg',
          discount: 18
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const categories = ['همه محصولات', 'چادر و سرپناه', 'کوله پشتی', 'کیسه خواب', 'روشنایی', 'تجهیزات آشپزی', 'صندلی و میز']
  const brands = ['همه برندها', 'Coleman', 'Deuter', 'North Face', 'Fenix', 'Jetboil', 'Helinox']

  const filteredProducts = products.filter(product => {
    if (filters.search && !product.name.includes(filters.search)) return false
    if (filters.category && filters.category !== 'همه محصولات' && product.category !== filters.category) return false
    if (filters.brand && filters.brand !== 'همه برندها' && product.brand !== filters.brand) return false
    return true
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-emerald-900">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 opacity-90"></div>
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center text-white"
            >
              <div className="inline-flex items-center space-x-2 space-x-reverse bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <SparklesIcon className="w-5 h-5" />
                <span>بهترین محصولات کمپینگ</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 moraba">
                فروشگاه محصولات
              </h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
                بیش از ۱۰۰ محصول با کیفیت برای تمام نیازهای کمپینگ و طبیعت‌گردی شما
              </p>
              
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto relative">
                <Input
                  type="text"
                  placeholder="جستجو در محصولات..."
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  className="h-14 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/60 pr-14"
                />
                <MagnifyingGlassIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-white/60" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="py-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Category Filters */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={filters.category === category || (category === 'همه محصولات' && !filters.category) ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilters(prev => ({ ...prev, category: category === 'همه محصولات' ? '' : category }))}
                    className="rounded-full"
                  >
                    {category}
                  </Button>
                ))}
              </div>

              {/* View Controls */}
              <div className="flex items-center space-x-4 space-x-reverse">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {filteredProducts.length} محصول
                  </span>
                </div>
                
                <div className="flex border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-none"
                  >
                    <Squares2X2Icon className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-none"
                  >
                    <ListBulletIcon className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section ref={ref} className="py-16">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-6 animate-pulse"
                  >
                    <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-xl mb-4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-4"></div>
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6 }}
                className={`grid gap-8 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                    : 'grid-cols-1'
                }`}
              >
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <ProductCard product={product} viewMode={viewMode} />
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* No Products */}
            {!loading && filteredProducts.length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-20"
              >
                <div className="text-8xl mb-6">🔍</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  محصولی یافت نشد
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  لطفاً فیلترهای خود را تغییر دهید یا جستجوی دیگری انجام دهید
                </p>
                <Button onClick={() => setFilters({ search: '', category: '', brand: '', minPrice: '', maxPrice: '', sort: '-createdAt' })}>
                  پاک کردن فیلترها
                </Button>
              </motion.div>
            )}
          </div>
        </section>

        {/* Featured Brands */}
        <section className="py-16 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-gray-800 dark:to-gray-700">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 moraba">
                برندهای معتبر
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                با بهترین برندهای دنیا همراه باشید
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {brands.slice(1).map((brand, index) => (
                <motion.div
                  key={brand}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all cursor-pointer"
                  onClick={() => setFilters(prev => ({ ...prev, brand }))}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold text-lg">
                      {brand.charAt(0)}
                    </span>
                  </div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {brand}
                  </h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}