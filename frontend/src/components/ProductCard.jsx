'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { HeartIcon, ShoppingCartIcon, EyeIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import { formatPrice } from '@/lib/utils'

export default function ProductCard({ product }) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.images?.[0]?.url
    })
  }

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted)
    // Add to wishlist logic here
  }

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="relative overflow-hidden">
        {/* Product Image */}
        <div className="w-full h-48 bg-gradient-to-br from-primary-light to-primary/20 flex items-center justify-center">
          <div className="text-4xl opacity-50">
            {product.category?.name === 'چادر و سرپناه' && '🏕️'}
            {product.category?.name === 'کوله پشتی' && '🎒'}
            {product.category?.name === 'کیسه خواب' && '🛏️'}
            {product.category?.name === 'تجهیزات آشپزی' && '🍳'}
            {product.category?.name === 'روشنایی' && '🔦'}
            {product.category?.name === 'لوازم جانبی' && '🧰'}
          </div>
        </div>

        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div className="absolute top-3 left-3">
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              {discountPercentage}٪ تخفیف
            </span>
          </div>
        )}

        {/* Quick Actions */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3 space-x-reverse">
          <Button
            size="icon"
            variant="ghost"
            onClick={toggleWishlist}
            className="bg-white hover:bg-primary hover:text-white"
          >
            {isWishlisted ? (
              <HeartSolidIcon className="w-5 h-5 text-red-500" />
            ) : (
              <HeartIcon className="w-5 h-5" />
            )}
          </Button>
          
          <Button
            size="icon"
            variant="ghost"
            asChild
            className="bg-white hover:bg-primary hover:text-white"
          >
            <Link href={`/products/${product.slug || product._id}`}>
              <EyeIcon className="w-5 h-5" />
            </Link>
          </Button>
          
          <Button
            size="icon"
            variant="ghost"
            onClick={handleAddToCart}
            className="bg-white hover:bg-primary hover:text-white"
          >
            <ShoppingCartIcon className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <CardContent className="p-4">
        {/* Category */}
        <div className="mb-2">
          <span className="text-xs text-primary font-medium">
            {product.category?.name}
          </span>
        </div>

        {/* Product Name */}
        <h3 className="font-medium text-text-dark dark:text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          <Link href={`/products/${product.slug || product._id}`}>
            {product.name}
          </Link>
        </h3>

        {/* Rating */}
        <div className="flex items-center space-x-1 space-x-reverse mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating?.average || 0)
                    ? 'text-auxiliary-orange'
                    : 'text-neutral-light'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-sm text-neutral-gray">
            ({product.rating?.count || 0})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 space-x-reverse">
            <span className="text-lg font-bold text-primary">
              {formatPrice(product.price)} تومان
            </span>
            {product.originalPrice && (
              <span className="text-sm text-neutral-gray line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          className="w-full mt-4"
          size="sm"
        >
          افزودن به سبد
        </Button>
      </CardContent>
    </Card>
  )
}