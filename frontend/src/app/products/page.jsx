'use client'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import ProductFilters from '@/components/ProductFilters'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline'
import axios from 'axios'

export default function ProductsPage() {
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
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    total: 0
  })

  const searchParams = useSearchParams()

  useEffect(() => {
    const category = searchParams.get('category')
    if (category) {
      setFilters(prev => ({ ...prev, category }))
    }
    fetchProducts()
  }, [searchParams])

  useEffect(() => {
    fetchProducts()
  }, [filters])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value)
      })
      
      params.append('page', pagination.currentPage)
      params.append('limit', 12)

      const response = await axios.get(`http://localhost:5000/api/products?${params}`)
      setProducts(response.data.products)
      setPagination({
        currentPage: response.data.currentPage,
        totalPages: response.data.totalPages,
        total: response.data.total
      })
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
    setPagination(prev => ({ ...prev, currentPage: 1 }))
  }

  const handlePageChange = (page) => {
    setPagination(prev => ({ ...prev, currentPage: page }))
    fetchProducts()
  }

  return (
    <div className="min-h-screen bg-white dark:bg-text-dark">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-dark dark:text-white mb-4">
            محصولات
          </h1>
          <p className="text-neutral-gray">
            {pagination.total} محصول یافت شد
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            {/* Search */}
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="جستجو در محصولات..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="pr-12"
              />
              <MagnifyingGlassIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-gray" />
            </div>

            {/* Filter Toggle */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="md:w-auto"
            >
              <AdjustmentsHorizontalIcon className="w-5 h-5 ml-2" />
              فیلترها
            </Button>
          </div>

          {/* Filters */}
          {showFilters && (
            <ProductFilters
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          )}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-neutral-lighter dark:bg-neutral-gray/20 rounded-xl p-4 animate-pulse">
                <div className="w-full h-48 bg-neutral-light dark:bg-neutral-gray/30 rounded-lg mb-4"></div>
                <div className="h-4 bg-neutral-light dark:bg-neutral-gray/30 rounded mb-2"></div>
                <div className="h-4 bg-neutral-light dark:bg-neutral-gray/30 rounded w-2/3 mb-4"></div>
                <div className="h-6 bg-neutral-light dark:bg-neutral-gray/30 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex justify-center mt-12">
                <div className="flex items-center space-x-2 space-x-reverse">
                  {[...Array(pagination.totalPages)].map((_, i) => (
                    <Button
                      key={i + 1}
                      variant={pagination.currentPage === i + 1 ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handlePageChange(i + 1)}
                    >
                      {i + 1}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* No Products */}
        {!loading && products.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-text-dark dark:text-white mb-2">
              محصولی یافت نشد
            </h3>
            <p className="text-neutral-gray">
              لطفاً فیلترهای خود را تغییر دهید یا جستجوی دیگری انجام دهید
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}