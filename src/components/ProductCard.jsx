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
        whileHover={{ scale: 1.02 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
      >
        <div className="flex">
          {/* Image */}
          <div className="w-48 h-48 bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 flex items-center justify-center relative overflow-hidden">
            <div className="text-6xl opacity-70">🏕️</div>
            {product.discount && (
              <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                {product.discount}٪ تخفیف
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                  {getCategoryLabel(product.category)}
                </span>
                <button
                  onClick={toggleWishlist}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                >
                  {isWishlisted ? (
                    <HeartSolidIcon className="w-5 h-5 text-red-500" />
                  ) : (
                    <HeartIcon className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </div>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 hover:text-emerald-600 transition-colors">
                <Link href={`/products/${product.slug || product._id}`}>
                  {product.name}
                </Link>
              </h3>

              {/* Rating */}
              <div className="flex items-center space-x-2 space-x-reverse mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(product.rating?.average || 0)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                        }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">
                  ({product.rating?.count || 0})
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 space-x-reverse">
                <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                  {formatPrice(product.price)} تومان
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              <div className="flex items-center space-x-2 space-x-reverse">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/products/${product.slug || product._id}`}>
                    <EyeIcon className="w-4 h-4 ml-1" />
                    مشاهده
                  </Link>
                </Button>
                <Button size="sm" onClick={handleAddToCart}>
                  <ShoppingCartIcon className="w-4 h-4 ml-1" />
                  افزودن
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