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
import axios from 'axios';

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
    axios.get('/api/products?sort=rating&limit=10&popular=true')
      .then((res) => {
        setProducts(res.data.products || []);
        setLoading(false);
      })
      .catch(() => {
        setProducts([]);
      });
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

  return (
    <section className="py-16 bg-white dark:bg-gray-900" ref={ref}>
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center flex-col mb-12"
        >
          <div className="inline-flex items-center  bg-emerald-100/50 dark:bg-emerald-900/30 backdrop-blur-sm px-5 py-2 rounded-full mb-4 border border-emerald-200/50 dark:border-emerald-800/50">
            <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z" />
            </svg>
              محصولات پرفروش ونتورا</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-gray-900 to-emerald-600 dark:from-white dark:to-emerald-400 bg-clip-text text-transparent moraba">
            محبوب‌ترین تجهیزات
          </h2>
        </motion.div>

        {/* Products Slider */}
        {loading ? (
          <div className="relative md:my-24">
            <div className="flex overflow-x-auto gap-6 scrollbar-hide py-2 pb-1">
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="min-w-[250px] max-w-xs rounded-3xl p-6 animate-pulse shadow-lg bg-white/30 dark:bg-gray-800/40 backdrop-blur-lg border border-white/30 dark:border-gray-700/40 inverted-radius flex-shrink-0"
                >
                  <div className="w-full h-48 bg-gradient-to-br from-emerald-200 to-cyan-200 dark:from-gray-700 dark:to-gray-800 rounded-xl mb-4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-4"></div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
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
            <div className="relative">
              <Swiper
                modules={[Navigation, Autoplay, Pagination]}
                spaceBetween={24}
                slidesPerView={2}
                slidesPerGroup={2}
                breakpoints={{
                  640: { slidesPerView: 2, slidesPerGroup: 2 },
                  780: { slidesPerView: 3, slidesPerGroup: 3 },
                  1024: { slidesPerView: 4, slidesPerGroup: 4 }
                }}
                navigation={{
                  nextEl: '.swiper-button-next-custom',
                  prevEl: '.swiper-button-prev-custom',
                }}
                pagination={{
                  clickable: true,
                  el: '.custom-swiper-pagination',
                }}
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
              {/* Custom Swiper Pagination Dots Below Slider */}
              <div className="custom-swiper-pagination flex justify-center mt-6 gap-1" />
            </div>
          </motion.div>
        )}

        {/* View All Products */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Link
            href="/products"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm"
          >
            <span className='text-sm text-white dark:text-gray-900'>مشاهده همه محصولات ونتورا</span>
            <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform text-white dark:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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