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

  // Mock data - در حالت واقعی از API دریافت می‌شود
  const mockProducts = [
    {
      id: 1,
      name: 'چادر کوهنوردی ۴ نفره',
      price: 1299000,
      originalPrice: 1599000,
      image: '/images/tent-4person.jpg',
      rating: 4.8,
      reviews: 124,
      badge: 'جدید',
      discount: 19,
      category: 'چادر'
    },
    {
      id: 2,
      name: 'کوله پشتی ۶۰ لیتری',
      price: 899000,
      originalPrice: 1099000,
      image: '/images/backpack-60l.jpg',
      rating: 4.6,
      reviews: 89,
      badge: 'پرفروش',
      discount: 18,
      category: 'کوله پشتی'
    },
    {
      id: 3,
      name: 'کیسه خواب زمستانی',
      price: 649000,
      originalPrice: 799000,
      image: '/images/sleeping-bag.jpg',
      rating: 4.7,
      reviews: 156,
      badge: 'تخفیف ویژه',
      discount: 19,
      category: 'کیسه خواب'
    }
  ]

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProducts(mockProducts)
      setLoading(false)
    }, 1000)

    // Load wishlist from localStorage
    const savedWishlist = localStorage.getItem('wishlist')
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist))
    }
  }, [])

  const toggleWishlist = (productId) => {
    const newWishlist = wishlist.includes(productId)
      ? wishlist.filter(id => id !== productId)
      : [...wishlist, productId]
    
    setWishlist(newWishlist)
    localStorage.setItem('wishlist', JSON.stringify(newWishlist))
  }

  const handleAddToCart = (product) => {
    addToCart(product)
    // Show toast notification (implement toast system)
  }

  if (loading) {
    return (
      <section className="py-16 bg-neutral-lighter dark:bg-neutral-gray/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white dark:bg-neutral-gray/20 rounded-2xl p-6 animate-pulse">
                <div className="w-full h-48 bg-neutral-light dark:bg-neutral-gray/30 rounded-xl mb-4"></div>
                <div className="h-4 bg-neutral-light dark:bg-neutral-gray/30 rounded mb-2"></div>
                <div className="h-4 bg-neutral-light dark:bg-neutral-gray/30 rounded w-2/3 mb-4"></div>
                <div className="h-6 bg-neutral-light dark:bg-neutral-gray/30 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-neutral-lighter dark:bg-neutral-gray/10">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-primary-light dark:bg-primary/20 px-4 py-2 rounded-full mb-4">
            <span className="text-primary font-medium">محصولات ویژه</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-text-dark dark:text-white mb-4">
            محصولات تخفیف‌دار
          </h2>
          <p className="text-neutral-gray max-w-2xl mx-auto">
            بهترین تجهیزات کمپینگ با تخفیف‌های ویژه
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white dark:bg-neutral-gray/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group card-hover"
            >
              {/* Product Image */}
              <div className="relative overflow-hidden">
                <div className="w-full h-64 bg-gradient-to-br from-primary-light to-primary/20 flex items-center justify-center">
                  {/* Placeholder for product image */}
                  <div className="text-6xl opacity-50">
                    {product.category === 'چادر' && '🏕️'}
                    {product.category === 'کوله پشتی' && '🎒'}
                    {product.category === 'کیسه خواب' && '🛏️'}
                  </div>
                </div>
                
                {/* Badge */}
                {product.badge && (
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      product.badge === 'جدید' ? 'bg-primary text-white' :
                      product.badge === 'پرفروش' ? 'bg-auxiliary-orange text-white' :
                      'bg-red-500 text-white'
                    }`}>
                      {product.badge}
                    </span>
                  </div>
                )}

                {/* Discount */}
                {product.discount && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      {product.discount}٪ تخفیف
                    </span>
                  </div>
                )}

                {/* Quick Actions */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4 space-x-reverse">
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                  >
                    {wishlist.includes(product.id) ? (
                      <HeartSolidIcon className="w-5 h-5 text-red-500" />
                    ) : (
                      <HeartIcon className="w-5 h-5" />
                    )}
                  </button>
                  <Link
                    href={`/products/${product.id}`}
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                  >
                    <EyeIcon className="w-5 h-5" />
                  </Link>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                  >
                    <ShoppingCartIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="mb-2">
                  <span className="text-sm text-primary font-medium">{product.category}</span>
                </div>
                <h3 className="font-semibold text-text-dark dark:text-white mb-2 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                
                {/* Rating */}
                <div className="flex items-center space-x-2 space-x-reverse mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-auxiliary-orange' : 'text-neutral-light'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-neutral-gray">({product.reviews})</span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <span className="text-lg font-bold text-primary">
                      {product.price.toLocaleString()} تومان
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-neutral-gray line-through">
                        {product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Products */}
        <div className="text-center mt-12">
          <Link
            href="/products"
            className="btn-primary inline-flex items-center space-x-2 space-x-reverse"
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