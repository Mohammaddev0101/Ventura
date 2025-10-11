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
import axios from 'axios'

export default function FeaturedProducts() {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  })
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [wishlist, setWishlist] = useState([])
  const { addToCart } = useCart()

  useEffect(() => {
    // Mock data for featured products

    axios.get('/api/products')
      .then(response => {
        console.log(response.data.products);
        
        setProducts(response.data.products.slice(0,20))
      })
      .catch(error => {
        console.error('خطا در دریافت محصولات ویژه:', error)
        setProducts([])
      })
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
      <section className="py-16 bg-gradient-to-b from-slate-50 to-white dark:from-gray-900 dark:to-gray-800" ref={ref}>
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="bg-white/80 dark:bg-gray-800/80 rounded-2xl p-6 animate-pulse backdrop-blur-sm border border-gray-100/50 dark:border-gray-700/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-full h-64 bg-gray-200 dark:bg-gray-600 rounded-xl mb-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-2/3 mb-4"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded w-1/2"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gradient-to-b from-slate-50 to-white dark:from-gray-900 dark:to-gray-800" ref={ref}>
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center bg-emerald-100/50 dark:bg-emerald-900/30 backdrop-blur-sm px-5 py-2 rounded-full mb-6 border border-emerald-200/50 dark:border-emerald-800/50">
            <span className="text-emerald-600 dark:text-emerald-400">محصولات ویژه ونتورا</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-gray-900 to-emerald-600 dark:from-white dark:to-emerald-400 bg-clip-text text-transparent mb-4 moraba">
            پیشنهادات تخفیف‌دار
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            بهترین تجهیزات کمپینگ ونتورا با تخفیف‌های استثنایی برای ماجراجویی‌های شما
          </p>
        </motion.div>

        {/* Products Slider  */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative">
            {/* Custom Navigation Buttons */}
            <button
              className="absolute hidden z-20 top-1/2 -translate-y-1/2 right-0 md:-right-16 bg-white/80 dark:bg-gray-900/80 border border-emerald-200/60 dark:border-emerald-900/40 shadow-lg rounded-full w-12 h-12 md:flex items-center justify-center text-emerald-600 dark:text-emerald-300 hover:bg-emerald-100/80 hover:scale-105 transition-all swiper-button-prev-custom"
              aria-label="اسلاید بعدی"
              type="button"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button
              className="absolute hidden z-20 top-1/2 -translate-y-1/2 left-0 md:-left-16 bg-white/80 dark:bg-gray-900/80 border border-emerald-200/60 dark:border-emerald-900/40 shadow-lg rounded-full w-12 h-12 md:flex items-center justify-center text-emerald-600 dark:text-emerald-300 hover:bg-emerald-100/80 hover:scale-105 transition-all swiper-button-next-custom"
              aria-label="اسلاید قبلی"
              type="button"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <Swiper
              modules={[Navigation, Autoplay, Pagination]}
              spaceBetween={24}
              slidesPerView={2}
              breakpoints={{
                640: { slidesPerView: 2},
                780 : { slidesPerView: 3},
                1024: { slidesPerView: 4 }
              }}
              navigation={{
                nextEl: '.swiper-button-next-custom',
                prevEl: '.swiper-button-prev-custom',
              }}
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              className="mySwiper my-24"
            >
              {products.map((product, index) => (
                <SwiperSlide key={product._id}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.92, y: 30 }}
                    animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.2 + index * 0.12, type: "spring", stiffness: 120 }}
                    className="relative group backdrop-blur-2xl"
                  >
                    {/* Product Card */}
                    <ProductCart
                      product={product}
                      index={index}
                      wishlist={wishlist}
                      toggleWishlist={toggleWishlist}
                      handleAddToCart={handleAddToCart}
                    />
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </motion.div>

        {/* View All Products */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, delay: 0.5, type: "spring", bounce: 0.25 }}
          className="relative flex justify-center items-center mt-16"
        >
          {/* Animated Glow Background */}
          <motion.div
            className="absolute inset-0 flex justify-center items-center pointer-events-none z-0"
            initial={{ opacity: 0.5, scale: 0.8 }}
            animate={{ opacity: [0.5, 0.8, 0.5], scale: [0.8, 1.1, 0.8] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-80 h-24 bg-gradient-to-r from-emerald-400/40 via-teal-400/30 to-orange-300/30 blur-3xl rounded-full" />
          </motion.div>
          {/* Modern Glassy Card */}
          <motion.div
            whileHover={{ scale: 1.04, rotate: -2 }}
            whileTap={{ scale: 0.98, rotate: 1 }}
            className="relative z-10 px-10 py-7 rounded-2xl bg-white/30 dark:bg-gray-900/40 backdrop-blur-2xl border border-emerald-200/30 dark:border-emerald-900/30 shadow-2xl shadow-emerald-200/20 dark:shadow-emerald-900/20 flex flex-col sm:flex-row items-center gap-6 w-full"
          >
            {/* Animated Icon */}
            <motion.div
              initial={{ rotate: -10, scale: 0.9 }}
              animate={{ rotate: [0, 10, -10, 0], scale: [0.9, 1.1, 0.9] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="text-4xl sm:text-5xl drop-shadow-lg"
            >
              🚀
            </motion.div>
            {/* Text & Button */}
            <div className="flex items-center justify-between flex-col md:flex-row gap-2 w-full">
              <div className='flex flex-col'>
                <span className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-emerald-600 via-teal-500 to-orange-400 bg-clip-text text-transparent mb-1 moraba">
                  همه محصولات ونتورا را کشف کنید!
                </span>
                <span className="text-gray-800 dark:text-gray-100 text-sm mb-2">
                  جدیدترین تجهیزات و تخفیف‌های ویژه برای ماجراجویی شما
                </span>
              </div>
              <Link
                href="/products"
                className="group inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-7 py-3 rounded-xl font-semibold shadow-lg hover:shadow-emerald-400/30 transition-all duration-300 backdrop-blur-sm"
              >
                <span className="tracking-wide">مشاهده همه محصولات</span>
                <motion.svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform !rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  initial={{ x: 0 }}
                  whileHover={{ x: 6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </motion.svg>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Custom Swiper Styles */}
      <style jsx global>{`
        .swiper-button-next,
        .swiper-button-prev {
          display:none;
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