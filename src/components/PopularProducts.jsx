'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useCart } from '@/context/CartContext'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import ProductCart from '@/components/ProductCard'

export default function PopularProducts() {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  })
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [wishlist, setWishlist] = useState([])
  const { addToCart } = useCart()

  useEffect(() => {
    // Mock data for popular products
    setProducts([
      {
        _id: '4',
        name: 'دوربین شکاری ۸x۲۵',
        price: 459000,
        originalPrice: 529000,
        category: { name: 'تجهیزات نظارتی' },
        rating: { average: 4.5, count: 67 },
        images: [{ url: 'https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg' }]
      },
      {
        _id: '5',
        name: 'عینک آفتابی کوهنوردی',
        price: 189000,
        originalPrice: 229000,
        category: { name: 'لوازم جانبی' },
        rating: { average: 4.3, count: 43 },
        images: [{ url: 'https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg' }]
      },
      {
        _id: '6',
        name: 'کیسه خواب تابستانی',
        price: 329000,
        originalPrice: 399000,
        category: { name: 'کیسه خواب' },
        rating: { average: 4.6, count: 89 },
        images: [{ url: 'https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg' }]
      },
      {
        _id: '7',
        name: 'چراغ قوه LED قابل شارژ',
        price: 149000,
        originalPrice: 179000,
        category: { name: 'روشنایی' },
        rating: { average: 4.7, count: 156 },
        images: [{ url: 'https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg' }]
      }
    ])
    setLoading(false)
  }, [])

  // Wishlist toggle logic (optional, for ProductCart compatibility)
  const toggleWishlist = (productId) => {
    const newWishlist = wishlist.includes(productId)
      ? wishlist.filter(id => id !== productId)
      : [...wishlist, productId]
    setWishlist(newWishlist)
    if (typeof window !== 'undefined') {
      localStorage.setItem('wishlist', JSON.stringify(newWishlist))
    }
  }

  const handleAddToCart = (product) => {
    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.images?.[0]?.url
    })
  }

  if (loading) {
    return (
      <section className="py-16 bg-white dark:bg-gray-900" ref={ref}>
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="bg-white/80 dark:bg-gray-800/80 rounded-xl p-4 animate-pulse backdrop-blur-sm border border-gray-100/50 dark:border-gray-700/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-full h-48 bg-gray-200 dark:bg-gray-600 rounded-lg mb-3"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-2/3 mb-3"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/2"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-white dark:bg-gray-900" ref={ref}>
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <div className="inline-flex items-center bg-emerald-100/50 dark:bg-emerald-900/30 backdrop-blur-sm px-5 py-2 rounded-full mb-4 border border-emerald-200/50 dark:border-emerald-800/50">
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">محصولات پرفروش ونتورا</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-gray-900 to-emerald-600 dark:from-white dark:to-emerald-400 bg-clip-text text-transparent moraba">
              محبوب‌ترین تجهیزات
            </h2>
          </div>
          <Link
            href="/products"
            className="hidden md:flex items-center justify-center gap-2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-100/20 p-2 rounded-lg font-semibold transition-colors"
          >
            <span>مشاهده همه</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
        </motion.div>

        {/* Products Slider */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Custom Swiper Navigation Buttons */}
          <button
            className="swiper-button-next-custom absolute hidden z-20 top-1/2 -translate-y-1/2 left-0 md:-left-16 bg-white/90 dark:bg-gray-900/80 border border-emerald-200/60 dark:border-emerald-800/60 shadow-lg rounded-full w-12 h-12 md:flex items-center justify-center text-emerald-600 hover:bg-emerald-500 hover:text-white transition-all duration-200"
            type="button"
            aria-label="قبلی"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            className="swiper-button-prev-custom absolute hidden z-20 top-1/2 -translate-y-1/2 right-0 md:-right-16 bg-white/90 dark:bg-gray-900/80 border border-emerald-200/60 dark:border-emerald-800/60 shadow-lg rounded-full w-12 h-12 md:flex items-center justify-center text-emerald-600 hover:bg-emerald-500 hover:text-white transition-all duration-200"
            type="button"
            aria-label="بعدی"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <Swiper
            modules={[Navigation, Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 }
            }}
            navigation={{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom',
            }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            className="mySwiper"
          >
            {products.map((product, index) => (
              <SwiperSlide key={product._id}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.1 + index * 0.08 }}
                >
                  <ProductCart
                    product={product}
                    index={index}
                    wishlist={wishlist}
                    toggleWishlist={toggleWishlist}
                    addToCart={handleAddToCart}
                  />
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* View All Products */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Link
            href="/products"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm"
          >
            <span>مشاهده همه محصولات ونتورا</span>
            <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
        </motion.div>
      </div>

      {/* Custom Swiper Styles */}
      <style jsx global>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: #10b981;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 50%;
          width: 40px;
          height: 40px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
          transition: all 0.3s ease;
        }
        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          background: #10b981;
          color: white;
        }
        .swiper-pagination-bullet {
          background: #10b981;
          opacity: 0.5;
        }
        .swiper-pagination-bullet-active {
          background: #10b981;
          opacity: 1;
        }
        .swiper {
          padding-bottom: 40px;
        }
      `}</style>
    </section>
  )
}