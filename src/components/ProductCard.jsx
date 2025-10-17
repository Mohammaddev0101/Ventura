'use client'
import { useState, useContext } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import {
  HeartIcon,
  ShoppingCartIcon,
  EyeIcon,
  StarIcon,
  TagIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import { useCart } from '@/context/CartContext' 

export default function ProductCard({ product, viewMode = 'grid' }) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const { addToCart } = useCart()

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted)
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fa-IR').format(price)
  }

  const getCategoryLabel = (category) => {
    if (!category) return ''
    if (typeof category === 'string') return category
    if (typeof category === 'object') return category.name || category.slug || ''
    return ''
  }

  const handleAddToCart = () => {
    if (addToCart) {
      addToCart(product, 1)
    }
  }

  if (viewMode === 'list') {
    return (
      <motion.div
        whileHover={{ scale: 1.025 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="group bg-white/90 dark:bg-gray-900/80 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl border border-emerald-100 dark:border-emerald-900/50 transition-all duration-400 backdrop-blur-lg"
      >
        <div className="flex relative">
          {/* Image */}
          <div className="w-44 md:w-52 h-48 md:h-52 bg-gradient-to-tl from-emerald-200 via-teal-200 to-white dark:from-emerald-800/50 dark:via-teal-900/40 dark:to-gray-800 flex items-center justify-center relative overflow-hidden">
            <div className="text-[4rem] drop-shadow shadow-emerald-100 blur-[0.5px] opacity-80 scale-110 transition duration-250 group-hover:scale-125">
              🏕️
            </div>
            {/* Product Image Overlay Option */}
            {product?.image || product?.images?.[0]?.url ? (
              <Image
                src={product.image || product.images[0].url}
                alt={product.name || 'محصول'}
                fill
                className="object-cover transition-all duration-400 group-hover:scale-110 group-hover:blur-[1px] mix-blend-multiply"
                style={{ zIndex: 1, opacity: 0.9 }}
                priority={false}
              />
            ) : null}
            {product.discount && (
              <div className="absolute top-4 left-4 bg-gradient-to-l from-red-400 to-pink-500 text-white px-2.5 py-1.5 rounded-full text-xs font-extrabold tracking-wider shadow-xl animate-pulse z-20">
                <span className="drop-shadow">{product.discount}٪ تخفیف</span>
              </div>
            )}
            <div className="absolute bottom-4 left-4 bg-gradient-to-l from-emerald-600 via-emerald-500 to-teal-400 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg z-10">
              {getCategoryLabel(product.category)}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 px-8 py-7 flex flex-col justify-between gap-2 relative">
            <div>
              <div className="flex items-center justify-between mb-1 absolute left-3 top-3">
                <button
                  onClick={toggleWishlist}
                  className={`p-1 md:p-2 rounded-full border-2 transition-all duration-200 shadow hover:scale-110 focus:outline-none ${
                    isWishlisted
                      ? 'bg-red-50 border-red-200 dark:bg-red-900/30'
                      : 'bg-gray-100 border-gray-200 dark:bg-gray-800 dark:border-gray-700'
                  }`}
                  aria-label="افزودن به علاقمندی"
                >
                  {isWishlisted ? (
                    <HeartSolidIcon className="w-6 h-6 text-red-500 drop-shadow" />
                  ) : (
                    <HeartIcon className="w-6 h-6 text-gray-400 group-hover:text-emerald-400 transition-colors" />
                  )}
                </button>
              </div>

              <h3 className="text-[1.23rem] text-gray-900 dark:text-white mb-1 hover:text-emerald-600 transition-colors leading-7 line-clamp-2">
                <Link href={`/products/${product.slug || product._id}`}>
                  {product.name}
                </Link>
              </h3>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`w-4 h-4 transition-all duration-150 ${
                        i < Math.floor(product.rating?.average || 0)
                          ? 'fill-yellow-400 text-yellow-400 scale-110'
                          : 'text-gray-300 group-hover:text-yellow-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-400/90 font-light hidden md:block">
                  {product.rating?.average ? product.rating.average.toFixed(1) : "۰"} <span className="font-normal">/ ۵ </span>
                  <span className="mx-1 text-gray-400 dark:text-gray-500">|</span>
                  ({product.rating?.count || 0} نظر)
                </span>
              </div>

              <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm line-clamp-2 max-h-[3.2em] overflow-hidden leading-6 hidden md:block tracking-tight">
                  {product.description?.length > 0 ? product.description : '—'}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex gap-1 items-start md:items-end">
                
                <span className="text-md md:text-lg text-emerald-600 dark:text-emerald-400">
                  {formatPrice(product.price)} <sub className="text-sm">تومان</sub>
                </span>
              </div>

              <div className="flex items-center gap-2 flex-col md:flex-row">
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="rounded-xl hidden md:flex  border-emerald-300 dark:border-emerald-800 px-3 py-2 hover:bg-emerald-50 dark:hover:bg-emerald-900/40 transition items-center gap-1"
                >
                  <Link href={`/products/${product.slug || product._id}`} className='gap-x-1 flex'>
                    <EyeIcon className="w-5 h-5 mr-1 text-emerald-500 dark:text-emerald-400" />
                    <span>مشاهده</span>
                  </Link>
                </Button>
                <Button
                  size="sm"
                  onClick={handleAddToCart}
                  className="rounded-full bg-emerald-500 hover:bg-emerald-600 text-white md:px-4 md:py-2 p-2 flex items-center gap-1 font-bold shadow-lg transition-all mt-2 md:mt-0"
                >
                  <ShoppingCartIcon className="w-5 h-5 md:mr-1" />
                  <span className='hidden md:block'>افزودن</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative py-4 h-auto"
    >
      <Card className="overflow-hidden relative bg-gray-100 dark:bg-gray-800 border-0 rounded-[28px] shadow-[0_20px_60px_rgba(16,24,40,0.08)] hover:shadow-[0_24px_80px_rgba(16,24,40,0.12)] transition-all duration-500 inverted-radius h-[300px] lg:h-[400px] !w-full ">
        <div className="relative">
          {/* Product Image */}
          <div className="relative w-full">
            {product?.image || product?.images?.[0].url ? (
              <Image
                src={product.image || product.images[0].url}
                alt={product.name || 'product'}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={false}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center text-6xl">🖼️</div>
            )}

            {/* Rounded corners on image like mock */}
            <div className="pointer-events-none absolute inset-0 rounded-[28px] rounded-b-none ring-1 ring-black/5" />

            {/* Green badge top-left */}
            <motion.span
              initial={{ y: -8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="absolute top-4 left-4 z-10 inline-flex items-center rounded-full bg-emerald-500 px-3 py-1 text-xs font-bold text-white shadow"
            >
              {/* {product.category.name || 'سایزبندی'} */}
            </motion.span>
          </div>
        </div>

        <CardContent className="p-3 md:p-6">
          {/* Title */}
          <h3 className="text-center text-md md:text-xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            <Link href={`/products/${product.slug || product._id}`}>{product.name}</Link>
          </h3>

          {/* Description */}
          <p className="mt-3 text-center text-sm leading-7 text-gray-500 line-clamp-2">
            {product.description || 'لورم ایپسوم متنی ساختگی است با تولید سادگی نامفهوم از صنعت چاپ.'}
          </p>

          {/* Bottom row: price and floating cart */}
          <div className="relative mt-6 flex items-end justify-between">


            <div className="ml-16 flex items-baseline gap-2 text-gray-900 dark:text-white">
              <span className="text-sm md:text-2xl font-extrabold text-gray-900 dark:text-white">
                {formatPrice(product.price)}
              </span>
              <sup className="text-sm text-gray-500">تومان</sup>
            </div>
          </div>
        </CardContent>

      </Card>
        {/* Floating cart button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          className="absolute left-0 top-[265px] lg:left-0 lg:top-[365px] flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-700 shadow-[0_8px_24px_rgba(16,24,40,0.12)] ring-1 ring-black/5 dark:bg-gray-900 dark:text-white"
          aria-label="add-to-cart"
          onClick={handleAddToCart}
        >
          <ShoppingCartIcon className="w-6 h-6" />
        </motion.button>

    </motion.div>
  )
}