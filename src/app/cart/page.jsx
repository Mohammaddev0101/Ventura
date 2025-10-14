'use client'
import { useState } from 'react'
import axios from 'axios'
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
  const [redirecting, setRedirecting] = useState(false)

  const shippingCost = getTotalPrice() > 500000 ? 0 : 50000
  const tax = Math.round(getTotalPrice() * 0.09)
  const finalTotal = getTotalPrice() + shippingCost + tax - discount

  const applyCoupon = () => {
    // Mock coupon logic
    if (couponCode === 'VENTURA10') {
      setDiscount(getTotalPrice() * 0.1)
    }
  }

  const handleCheckout = async () => {
    if (items.length === 0) return
    setRedirecting(true)
    try {
      const amount = Math.max(1000, Math.round(finalTotal))
      const { data } = await axios.post('/api/payment/zibal/request', {
        amount,
        description: 'خرید از ونتورا',
        callbackUrl: `${window.location.origin}/api/payment/zibal/callback`
      })
      if (data?.paymentUrl) {
        window.location.href = data.paymentUrl
      }
    } finally {
      setRedirecting(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center mb-20 p-10">
          <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mt-20 text-center">
            <div className="text-7xl mb-6">🛒</div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
              سبد خرید شما خالی است
            </h1>
            <p className="text-gray-500 dark:text-gray-300 mb-8">
              هنوز محصولی به سبد خرید خود اضافه نکرده‌اید.
            </p>
            <Button
              asChild
              className="w-full border-2 border-emerald-500 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-400 dark:text-emerald-300 dark:hover:bg-emerald-900/20 transition-all"
            >
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-10 mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card className="bg-white dark:bg-gray-800 shadow-md rounded-2xl border border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-lg font-bold text-gray-800 dark:text-white">
                  <span>سبد خرید ({items.length})</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearCart}
                    className="text-red-600 hover:text-red-700 border border-transparent hover:border-red-200 transition"
                  >
                    پاک کردن همه
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="divide-y divide-gray-100 dark:divide-gray-700">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col sm:flex-row items-center gap-4 py-5"
                    >
                      {/* Product Image */}
                      <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900 dark:to-emerald-800 rounded-xl flex items-center justify-center flex-shrink-0 border border-gray-200 dark:border-gray-700">
                        <span className="text-3xl">🏕️</span>
                      </div>
                      {/* Product Info */}
                      <div className="flex-1 w-full">
                        <h3 className="font-semibold text-gray-800 dark:text-white text-base mb-1">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-300">
                          قیمت واحد: {formatPrice(item.price)} تومان
                        </p>
                      </div>
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 border-gray-300 dark:border-gray-600"
                          disabled={item.quantity <= 1}
                        >
                          <MinusIcon className="w-4 h-4" />
                        </Button>
                        <span className="w-10 text-center font-medium text-gray-800 dark:text-white">
                          {item.quantity}
                        </span>
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 border-gray-300 dark:border-gray-600"
                        >
                          <PlusIcon className="w-4 h-4" />
                        </Button>
                      </div>
                      {/* Price */}
                      <div className="text-left min-w-[100px]">
                        <p className="font-bold text-emerald-600 dark:text-emerald-400">
                          {formatPrice(item.price * item.quantity)} تومان
                        </p>
                      </div>
                      {/* Remove Button */}
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 hover:text-red-700"
                        aria-label="حذف محصول"
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
            <Card className="bg-white dark:bg-gray-800 shadow-md rounded-2xl border border-gray-200 dark:border-gray-700 sticky top-28">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-800 dark:text-white">
                  خلاصه سفارش
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Coupon */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    کد تخفیف
                  </label>
                  <div className="flex gap-2">
                    <Input
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="کد تخفیف را وارد کنید"
                      className="flex-1 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700"
                    />
                    <Button onClick={applyCoupon} variant="outline" className="border-gray-300 dark:border-gray-600">
                      اعمال
                    </Button>
                  </div>
                </div>
                {/* Price Breakdown */}
                <div className="space-y-2 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex justify-between text-gray-700 dark:text-gray-200">
                    <span>جمع کل:</span>
                    <span>{formatPrice(getTotalPrice())} تومان</span>
                  </div>
                  <div className="flex justify-between text-gray-700 dark:text-gray-200">
                    <span>هزینه ارسال:</span>
                    <span>
                      {shippingCost === 0 ? (
                        <span className="text-emerald-600 dark:text-emerald-400">رایگان</span>
                      ) : (
                        `${formatPrice(shippingCost)} تومان`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-700 dark:text-gray-200">
                    <span>مالیات:</span>
                    <span>{formatPrice(tax)} تومان</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                      <span>تخفیف:</span>
                      <span>-{formatPrice(discount)} تومان</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-100 dark:border-gray-700 text-gray-900 dark:text-white">
                    <span>مبلغ نهایی:</span>
                    <span className="text-emerald-600 dark:text-emerald-400">{formatPrice(finalTotal)} تومان</span>
                  </div>
                </div>
                {/* Shipping Info */}
                {getTotalPrice() < 500000 && (
                  <div className="bg-yellow-50 dark:bg-yellow-900/30 p-3 rounded-lg text-sm">
                    <p className="text-yellow-700 dark:text-yellow-300">
                      برای ارسال رایگان {formatPrice(500000 - getTotalPrice())} تومان دیگر خرید کنید
                    </p>
                  </div>
                )}
                {/* Checkout Button */}
                <Button
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-base font-bold py-3 rounded-xl transition"
                  size="lg"
                  onClick={handleCheckout}
                  disabled={redirecting}
                >
                  {redirecting ? 'در حال انتقال...' : 'ادامه فرآیند پرداخت'}
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