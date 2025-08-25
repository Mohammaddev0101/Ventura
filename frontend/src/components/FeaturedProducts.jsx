'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { HeartIcon, ShoppingCartIcon, EyeIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'

export default function FeaturedProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [wishlist, setWishlist] = useState([])
  const { addToCart } = useCart()

  useEffect(() => {
    // Mock data for featured products
    setProducts([
      {
        _id: '1',
        name: 'صندلی تاشو کمپینگ',
        price: 299000,
        originalPrice: 399000,
        discount: 25,
        category: { name: 'صندلی' },
        brand: 'Coleman',
        rating: { average: 4.8, count: 124 },
        images: [{ url: 'https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg' }]
      },
      {
        _id: '2',
        name: 'قمقمه استیل ۷۵۰ میلی',
        price: 189000,
        originalPrice: 249000,
        discount: 24,
        category: { name: 'قمقمه' },
        brand: 'Hydro Flask',
        rating: { average: 4.6, count: 89 },
        images: [{ url: 'https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg' }]
      },
      {
        _id: '3',
        name: 'چراغ قوه LED قابل شارژ',
        price: 149000,
        originalPrice: 199000,
        discount: 25,
        category: { name: 'چراغ قوه' },
        brand: 'Fenix',
        rating: { average: 4.7, count: 156 },
        images: [{ url: 'https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg' }]
      }
    ])
    setLoading(false)
  }, [])

  const toggleWishlist = (productId) => {
    const newWishlist = wishlist.includes(productId)
      ? wishlist.filter(id => id !== productId)
      : [...wishlist, productId]
    
    setWishlist(newWishlist)
    localStorage.setItem('wishlist', JSON.stringify(newWishlist))
  }

  const handleAddToCart = (product) => {
    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.images[0]?.url
    })
  }

  if (loading) {
    return (
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white dark:bg-gray-700 rounded-2xl p-6 animate-pulse">
                <div className="w-full h-48 bg-gray-200 dark:bg-gray-600 rounded-xl mb-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-2/3 mb-4"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-green-100 dark:bg-green-900/30 px-4 py-2 rounded-full mb-4">
            <span className="text-green-600 font-medium">محصولات ویژه</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            محصولات تخفیف‌دار
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            بهترین تجهیزات کمپینگ با تخفیف‌های ویژه
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white dark:bg-gray-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
            >
              {/* Product Image */}
              <div className="relative overflow-hidden">
                <div className="w-full h-64 bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900/20 dark:to-green-800/20 flex items-center justify-center">
                  {/* Placeholder for product image */}
                  <div className="text-6xl opacity-50">
                    {product.category?.name === 'صندلی' && '🪑'}
                    {product.category?.name === 'قمقمه' && '🍶'}
                    {product.category?.name === 'چراغ قوه' && '🔦'}
                  </div>
                </div>
                
                {/* Discount */}
                {product.discount && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      {product.discount}٪
                    </span>
                  </div>
                )}

                {/* Quick Actions */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4 space-x-reverse">
                  <button
                    onClick={() => toggleWishlist(product._id)}
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-green-600 hover:text-white transition-colors"
                  >
                    {wishlist.includes(product._id) ? (
                      <HeartSolidIcon className="w-5 h-5 text-red-500" />
                    ) : (
                      <HeartIcon className="w-5 h-5" />
                    )}
                  </button>
                  <Link
                    href={`/products/${product.slug || product._id}`}
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-green-600 hover:text-white transition-colors"
                  >
                    <EyeIcon className="w-5 h-5" />
                  </Link>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-green-600 hover:text-white transition-colors"
                  >
                    <ShoppingCartIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="mb-2">
                  <span className="text-sm text-green-600 font-medium">{product.category?.name}</span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-green-600 transition-colors">
                  {product.name}
                </h3>
                
                {/* Rating */}
                <div className="flex items-center space-x-2 space-x-reverse mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(product.rating?.average || 0) ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">({product.rating?.count || 0})</span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <span className="text-lg font-bold text-green-600">
                      {product.price?.toLocaleString()} تومان
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        {product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Special Offer Section */}
        <div className="mt-16 bg-green-600 rounded-3xl p-8 text-white">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">
                محصولات تخفیف دار
              </h3>
              <p className="text-green-100 mb-6">
                تا ۵۰٪ تخفیف روی محصولات منتخب
              </p>
              <div className="flex items-center space-x-4 space-x-reverse mb-6">
                <div className="bg-white text-green-600 px-4 py-2 rounded-lg font-bold">
                  ۱۰:۲۳:۴۵
                </div>
                <span>زمان باقی مانده</span>
              </div>
              <Link
                href="/products"
                className="bg-white text-green-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors inline-block"
              >
                مشاهده همه
              </Link>
            </div>
            <div className="text-center">
              <div className="text-6xl mb-4">🎯</div>
              <div className="text-4xl font-bold">۵۰٪</div>
              <div className="text-green-100">تخفیف ویژه</div>
            </div>
          </div>
        </div>

        {/* View All Products */}
        <div className="text-center mt-12">
          <Link
            href="/products"
            className="inline-flex items-center space-x-2 space-x-reverse bg-green-600 text-white px-8 py-4 rounded-lg font-medium hover:bg-green-700 transition-colors"
          >
            <span>مشاهده همه محصولات</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}