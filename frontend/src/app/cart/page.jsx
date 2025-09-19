'use client'
import { useState } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useCart } from '@/context/CartContext'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { TrashIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import { formatPrice } from '@/lib/utils'

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart()
  const [couponCode, setCouponCode] = useState('')
  const [discount, setDiscount] = useState(0)

  const shippingCost = getTotalPrice() > 500000 ? 0 : 50000
  const tax = Math.round(getTotalPrice() * 0.09)
  const finalTotal = getTotalPrice() + shippingCost + tax - discount

  const applyCoupon = () => {
    // Mock coupon logic
    if (couponCode === 'VENTURA10') {
      setDiscount(getTotalPrice() * 0.1)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white dark:bg-text-dark">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="text-8xl mb-6">🛒</div>
            <h1 className="text-3xl font-bold text-text-dark dark:text-white mb-4">
              سبد خرید شما خالی است
            </h1>
            <p className="text-neutral-gray mb-8">
              محصولات مورد علاقه خود را به سبد خرید اضافه کنید
            </p>
            <Button asChild>
              <Link href="/products">
                مشاهده محصولات
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-dark dark:text-white mb-8">
          سبد خرید
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>محصولات ({items.length})</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearCart}
                    className="text-red-500 hover:text-red-600"
                  >
                    پاک کردن همه
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 space-x-reverse p-4 border border-neutral-light dark:border-neutral-gray rounded-lg">
                      {/* Product Image */}
                      <div className="w-20 h-20 bg-gradient-to-br from-primary-light to-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl">🏕️</span>
                      </div>

                      {/* Product Info */}
                      <div className="flex-1">
                        <h3 className="font-medium text-text-dark dark:text-white">
                          {item.name}
                        </h3>
                        <p className="text-sm text-neutral-gray">
                          قیمت واحد: {formatPrice(item.price)} تومان
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8"
                        >
                          <MinusIcon className="w-4 h-4" />
                        </Button>
                        <span className="w-12 text-center font-medium">
                          {item.quantity}
                        </span>
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8"
                        >
                          <PlusIcon className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* Price */}
                      <div className="text-left">
                        <p className="font-bold text-primary">
                          {formatPrice(item.price * item.quantity)} تومان
                        </p>
                      </div>

                      {/* Remove Button */}
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>خلاصه سفارش</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Coupon */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    کد تخفیف
                  </label>
                  <div className="flex space-x-2 space-x-reverse">
                    <Input
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="کد تخفیف را وارد کنید"
                    />
                    <Button onClick={applyCoupon} variant="outline">
                      اعمال
                    </Button>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-2 pt-4 border-t border-neutral-light dark:border-neutral-gray">
                  <div className="flex justify-between">
                    <span>جمع کل:</span>
                    <span>{formatPrice(getTotalPrice())} تومان</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>هزینه ارسال:</span>
                    <span>
                      {shippingCost === 0 ? (
                        <span className="text-green-500">رایگان</span>
                      ) : (
                        `${formatPrice(shippingCost)} تومان`
                      )}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>مالیات:</span>
                    <span>{formatPrice(tax)} تومان</span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between text-green-500">
                      <span>تخفیف:</span>
                      <span>-{formatPrice(discount)} تومان</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between font-bold text-lg pt-2 border-t border-neutral-light dark:border-neutral-gray">
                    <span>مبلغ نهایی:</span>
                    <span className="text-primary">{formatPrice(finalTotal)} تومان</span>
                  </div>
                </div>

                {/* Shipping Info */}
                {getTotalPrice() < 500000 && (
                  <div className="bg-auxiliary-cream dark:bg-auxiliary-orange/20 p-3 rounded-lg text-sm">
                    <p className="text-auxiliary-orange">
                      برای ارسال رایگان {formatPrice(500000 - getTotalPrice())} تومان دیگر خرید کنید
                    </p>
                  </div>
                )}

                {/* Checkout Button */}
                <Button className="w-full" size="lg" asChild>
                  <Link href="/checkout">
                    ادامه خرید
                  </Link>
                </Button>

                {/* Continue Shopping */}
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/products">
                    ادامه خرید
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}