'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { 
  MagnifyingGlassIcon, 
  Squares2X2Icon,
  ListBulletIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'

const categories = [
  'همه محصولات',
  'چادر و سرپناه',
  'کوله پشتی',
  'کیسه خواب',
  'روشنایی',
  'تجهیزات آشپزی',
  'صندلی و میز'
]
const brands = [
  'همه برندها',
  'Coleman',
  'Deuter',
  'North Face',
  'Fenix',
  'Jetboil',
  'Helinox'
]

// Pagination settings
const PAGE_SIZE = 8

export default function ProductsPage() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    brand: '',
    minPrice: '',
    maxPrice: '',
    sort: '-createdAt'
  })
  const [viewMode, setViewMode] = useState('grid')
  const [currentPage, setCurrentPage] = useState(1)

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      setError(null)
      try {
        const axios = (await import('axios')).default
        const res = await axios.get('/api/products')
        let productsArr = Array.isArray(res.data.products) ? res.data.products : []
        productsArr = productsArr.map(product => {
          let newProduct = { ...product }
          if (newProduct.brand && typeof newProduct.brand === 'object' && newProduct.brand !== null) {
            newProduct.brand = newProduct.brand.name || ''
          }
          if (newProduct.category && typeof newProduct.category === 'object' && newProduct.category !== null) {
            newProduct.category = newProduct.category.name || ''
          }
          return newProduct
        })
        setProducts(productsArr)
      } catch (err) {
        setError('محصولی موجود نمی‌باشد یا انبار نداریم')
        setProducts([])
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  // Filter logic
  const filteredProducts = products.filter(product => {
    if (filters.search && !product.name.includes(filters.search)) return false
    if (filters.category && filters.category !== 'همه محصولات' && product.category !== filters.category) return false
    if (filters.brand && filters.brand !== 'همه برندها' && product.brand !== filters.brand) return false
    return true
  })

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE)
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [filters.search, filters.category, filters.brand])

  // Glassy Card Wrapper for ProductCard
  function GlassyProductCard({ product, viewMode }) {
    return (
      <ProductCard product={product} viewMode={viewMode} />
    )
  }

  // Pagination component
  function Pagination({ currentPage, totalPages, onPageChange }) {
    if (totalPages <= 1) return null

    // Show up to 5 page numbers, with ... if needed
    let pages = []
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      if (currentPage <= 3) {
        pages = [1, 2, 3, 4, '...', totalPages]
      } else if (currentPage >= totalPages - 2) {
        pages = [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
      } else {
        pages = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages]
      }
    }

    return (
      <div className="flex justify-center mt-12">
        <nav className="flex gap-2 items-center" aria-label="Pagination">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`w-9 h-9 flex items-center justify-center rounded-full transition-all duration-150 text-sm font-bold border border-gray-200 dark:border-gray-700 ${
              currentPage === 1
                ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                : 'bg-white dark:bg-gray-900 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/40'
            }`}
            aria-label="صفحه قبلی"
          >
            <span className="text-lg">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </span>
          </button>
          {pages.map((p, idx) =>
            p === '...' ? (
              <span key={idx} className="px-2 text-gray-400 dark:text-gray-500">...</span>
            ) : (
              <button
                key={p}
                onClick={() => onPageChange(p)}
                className={`w-9 h-9 flex items-center justify-center rounded-full transition-all duration-150 text-sm font-bold border border-gray-200 dark:border-gray-700 ${
                  currentPage === p
                    ? 'bg-emerald-500 text-white shadow'
                    : 'bg-white dark:bg-gray-900 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/40'
                }`}
                aria-current={currentPage === p ? "page" : undefined}
              >
                {p}
              </button>
            )
          )}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`w-9 h-9 flex items-center justify-center rounded-full transition-all duration-150 text-sm font-bold border border-gray-200 dark:border-gray-700 ${
              currentPage === totalPages
                ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                : 'bg-white dark:bg-gray-900 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/40'
            }`}
            aria-label="صفحه بعدی"
          >
            <span className="text-lg">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
            </span>
          </button>
        </nav>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br  dark:from-gray-900 dark:via-gray-800 dark:to-emerald-900 flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pb-24 pt-32 overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
          {/* Dark mode background overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.08'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              className="text-center text-white dark:text-white"
            >
              <div className="inline-flex items-center gap-2 bg-white/30 dark:bg-gray-800/40 backdrop-blur px-6 py-2 rounded-full mb-8 shadow-lg">
                <SparklesIcon className="w-6 h-6 text-yellow-300" />
                <span className="text-md">جدیدترین و بهترین محصولات کمپینگ</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold mb-6 moraba drop-shadow-lg dark:drop-shadow-[0_2px_24px_rgba(16,185,129,0.25)]">
                فروشگاه محصولات کمپینگ
              </h1>
              <p className="text-xl md:text-2xl text-white/90 dark:text-gray-200 max-w-2xl mx-auto mb-10 font-light">
                انتخابی هوشمندانه برای طبیعت‌گردان حرفه‌ای و عاشقان سفر
              </p>
              {/* Search Bar */}
              <div className="max-w-xl mx-auto relative">
                <Input
                  type="text"
                  placeholder="جستجو در محصولات..."
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  className="h-16 bg-white/20 dark:bg-gray-800/40 backdrop-blur border-none text-white placeholder:text-white/70 dark:placeholder:text-gray-300 pr-16 rounded-2xl shadow-lg focus:ring-2 focus:ring-emerald-400"
                />
                <MagnifyingGlassIcon className="absolute right-5 top-1/2 -translate-y-1/2 w-7 h-7 text-white/70 dark:text-gray-300" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="py-6  backdrop-blur border-t border-gray-200 dark:border-gray-700 sticky top-0 z-30">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Category Filters */}
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={filters.category === category || (category === 'همه محصولات' && !filters.category) ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilters(prev => ({ ...prev, category: category === 'همه محصولات' ? '' : category }))}
                    className={`rounded-full px-4 py-2 font-medium transition-all duration-200 ${filters.category === category || (category === 'همه محصولات' && !filters.category) ? 'shadow-md bg-gradient-to-r from-emerald-400 to-cyan-400 text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-emerald-50 dark:hover:bg-gray-700'}`}
                  >
                    {category}
                  </Button>
                ))}
              </div>
              {/* View Controls */}
              <div className="flex items-center gap-4">
                <span className="text-base text-gray-700 dark:text-gray-300 font-semibold">
                  {filteredProducts.length} محصول
                </span>
                <div className="flex border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className={`rounded-none px-3 py-2 ${viewMode === 'grid' ? 'bg-emerald-500 text-white' : 'text-emerald-500'}`}
                  >
                    <Squares2X2Icon className="w-5 h-5" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className={`rounded-none px-3 py-2 ${viewMode === 'list' ? 'bg-emerald-500 text-white' : 'text-emerald-500'}`}
                  >
                    <ListBulletIcon className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section ref={ref} className="py-16 min-h-[40vh]">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
                {[...Array(PAGE_SIZE)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="rounded-3xl p-6 animate-pulse shadow-lg bg-white/30 dark:bg-gray-900/40 backdrop-blur-lg border border-white/30 dark:border-gray-700/40"
                  >
                    <div className="w-full h-48 bg-gradient-to-br from-emerald-200 to-cyan-200 dark:from-gray-700 dark:to-gray-800 rounded-xl mb-4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-4"></div>
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                  </motion.div>
                ))}
              </div>
            ) : error ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center justify-center py-24"
              >
                <div className="text-8xl mb-6">😔</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {error}
                </h3>
              </motion.div>
            ) : filteredProducts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center justify-center py-24"
              >
                <div className="text-8xl mb-6">🔍</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  محصولی یافت نشد
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  لطفاً فیلترهای خود را تغییر دهید یا جستجوی دیگری انجام دهید
                </p>
              </motion.div>
            ) : (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.6 }}
                  className={`grid gap-8 ${
                    viewMode === 'grid'
                      ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'
                      : 'grid-cols-1'
                  }`}
                >
                  {paginatedProducts.map((product, index) => (
                    <motion.div
                      key={product._id || product.id || index}
                      initial={{ opacity: 0, y: 30 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: index * 0.08 }}
                    >
                      <GlassyProductCard product={product} viewMode={viewMode} />
                    </motion.div>
                  ))}
                </motion.div>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={p => setCurrentPage(p)}
                />
              </>
            )}
          </div>
        </section>

        {/* Featured Brands */}
        <section className="py-16 bg-gray-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4 moraba">
                برندهای معتبر
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                با بهترین برندهای دنیا همراه باشید
              </p>
            </motion.div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {brands.slice(1).map((brand, index) => (
                <motion.div
                  key={brand}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  whileHover={{ scale: 1.07 }}
                  className="bg-white/90 dark:bg-gray-800/90 rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl transition-all cursor-pointer border border-transparent hover:border-emerald-400"
                  onClick={() => setFilters(prev => ({ ...prev, brand }))}
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-lg flex items-center justify-center mx-auto mb-3 shadow">
                    <span className="text-white font-extrabold text-2xl">
                      {brand.charAt(0)}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg">
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