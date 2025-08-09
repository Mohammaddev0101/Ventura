'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import axios from 'axios'

export default function PopularProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const { addToCart } = useCart()

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products?popular=true&limit=4')
      setProducts(response.data.products)
    } catch (error) {
      console.error('Error fetching products:', error)
      // Fallback to mock data
      setProducts([
        {
          _id: '4',
          name: 'دوربین شکاری ۸x۲۵',
          price: 459000,
          originalPrice: 529000,
          category: { name: 'تجهیزات نظارتی' },
          rating: { average: 4.5, count: 67 }
        },
        {
          _id: '5',
          name: 'عینک آفتابی کوهنوردی',
          price: 189000,
          originalPrice: 229000,
          category: { name: 'لوازم جانبی' },
          rating: { average: 4.3, count: 43 }
        },
        {
          _id: '6',
          name: 'کیسه خواب تابستانی',
          price: 329000,
          originalPrice: 399000,
          category: { name: 'کیسه خواب' },
          rating: { average: 4.6, count: 89 }
        },
        {
          _id: '7',
          name: 'چراغ قوه LED قابل شارژ',
          price: 149000,
          originalPrice: 179000,
          category: { name: 'روشنایی' },
          rating: { average: 4.7, count: 156 }
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="py-16 bg-white dark:bg-text-dark">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-neutral-lighter dark:bg-neutral-gray/20 rounded-xl p-4 animate-pulse">
                <div className="w-full h-40 bg-neutral-light dark:bg-neutral-gray/30 rounded-lg mb-3"></div>
                <div className="h-3 bg-neutral-light dark:bg-neutral-gray/30 rounded mb-2"></div>
                <div className="h-3 bg-neutral-light dark:bg-neutral-gray/30 rounded w-2/3 mb-3"></div>
                <div className="h-4 bg-neutral-light dark:bg-neutral-gray/30 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-white dark:bg-text-dark">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <div className="inline-flex items-center bg-primary-light dark:bg-primary/20 px-4 py-2 rounded-full mb-4">
              <span className="text-primary font-medium">محصولات پرفروش</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-text-dark dark:text-white">
              محبوب‌ترین محصولات
            </h2>
          </div>
          <Link
            href="/products"
            className="hidden md:flex items-center space-x-2 space-x-reverse text-primary hover:text-primary/80 font-medium transition-colors"
          >
            <span>مشاهده همه</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-neutral-lighter dark:bg-neutral-gray/20 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 group"
            >
              {/* Product Image */}
              <div className="relative overflow-hidden">
                <div className="w-full h-48 bg-gradient-to-br from-primary-light to-primary/20 flex items-center justify-center">
                  <div className="text-4xl opacity-50">
                    {product.category?.name === 'تجهیزات نظارتی' && '🔭'}
                    {product.category?.name === 'لوازم جانبی' && '🕶️'}
                    {product.category?.name === 'کیسه خواب' && '🛏️'}
                    {product.category?.name === 'روشنایی' && '🔦'}
                  </div>
                </div>
                
                {/* Quick Add to Cart */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button
                    onClick={() => addToCart({
                      id: product._id,
                      name: product.name,
                      price: product.price,
                      image: product.images?.[0]?.url
                    })}
                    className="bg-white text-text-dark px-4 py-2 rounded-lg font-medium hover:bg-primary hover:text-white transition-colors"
                  >
                    افزودن به سبد
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <div className="mb-1">
                  <span className="text-xs text-primary font-medium">{product.category?.name}</span>
                </div>
                <h3 className="font-medium text-text-dark dark:text-white mb-2 text-sm group-hover:text-primary transition-colors">
                  <Link href={`/products/${product.slug || product._id}`}>
                    {product.name}
                  </Link>
                </h3>
                
                {/* Rating */}
                <div className="flex items-center space-x-1 space-x-reverse mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-3 h-3 ${i < Math.floor(product.rating?.average || 0) ? 'text-auxiliary-orange' : 'text-neutral-light'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs text-neutral-gray">({product.rating?.count || 0})</span>
                </div>

                {/* Price */}
                <div className="flex items-center space-x-2 space-x-reverse">
                  <span className="text-sm font-bold text-primary">
                    {product.price?.toLocaleString()} تومان
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-neutral-gray line-through">
                      {product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}