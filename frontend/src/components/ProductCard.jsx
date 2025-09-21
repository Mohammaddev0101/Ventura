'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
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

export default function ProductCard({ product, viewMode = 'grid' }) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted)
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fa-IR').format(price)
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
                  {product.category}
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
                <Link href={`/products/${product.id}`}>
                  {product.name}
                </Link>
              </h3>

              {/* Rating */}
              <div className="flex items-center space-x-2 space-x-reverse mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating?.average || 0)
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
                  <Link href={`/products/${product.id}`}>
                    <EyeIcon className="w-4 h-4 ml-1" />
                    مشاهده
                  </Link>
                </Button>
                <Button size="sm">
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
      className="group"
    >
      <Card className="overflow-hidden bg-white dark:bg-gray-800 border-0 shadow-lg hover:shadow-2xl transition-all duration-500">
        <div className="relative overflow-hidden">
          {/* Product Image */}
          <div className="w-full h-64 bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 flex items-center justify-center relative">
            <motion.div
              animate={isHovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
              transition={{ duration: 0.3 }}
              className="text-6xl opacity-70"
            >
              🏕️
            </motion.div>

            {/* Discount Badge */}
            {product.discount && (
              <motion.div
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: -45 }}
                className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg"
              >
                {product.discount}٪ تخفیف
              </motion.div>
            )}

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-black/40 flex items-center justify-center space-x-3 space-x-reverse"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleWishlist}
                className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
              >
                {isWishlisted ? (
                  <HeartSolidIcon className="w-6 h-6 text-red-500" />
                ) : (
                  <HeartIcon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                )}
              </motion.button>

              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button asChild size="sm" className="shadow-lg">
                  <Link href={`/products/${product.id}`}>
                    <EyeIcon className="w-4 h-4 ml-1" />
                    مشاهده
                  </Link>
                </Button>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
              >
                <ShoppingCartIcon className="w-6 h-6" />
              </motion.button>
            </motion.div>
          </div>
        </div>

        <CardContent className="p-6">
          {/* Category */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2 space-x-reverse">
              <TagIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                {product.category}
              </span>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {product.brand}
            </span>
          </div>

          {/* Product Name */}
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-emerald-600 transition-colors">
            <Link href={`/products/${product.id}`}>
              {product.name}
            </Link>
          </h3>

          {/* Rating */}
          <div className="flex items-center space-x-2 space-x-reverse mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating?.average || 0)
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

          {/* Price */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2 space-x-reverse">
              <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                {formatPrice(product.price)}
              </span>
              <span className="text-sm text-gray-900 dark:text-white">تومان</span>
            </div>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <Button className="w-full group-hover:bg-emerald-700 transition-colors">
            <ShoppingCartIcon className="w-4 h-4 ml-2" />
            افزودن به سبد خرید
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}