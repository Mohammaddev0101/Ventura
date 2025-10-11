'use client'
import React, { useEffect, useState, useMemo } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/Button'
import { formatPrice } from '@/lib/utils'
import { useCart } from '@/context/CartContext'
import Link from 'next/link'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"

export default function ProductDetailPage({ params }) {
  const { slug } = params
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { addToCart } = useCart()

  useEffect(() => {
    let isMounted = true
    const fetchProduct = async () => {
      setLoading(true)
      setError('')
      try {
        const axios = (await import('axios')).default
        const res = await axios.get(`/api/products/${slug}`)
        const p = res.data
        if (!p) throw new Error('محصول یافت نشد')
        // Normalize nested fields for UI where needed
        console.log(p);

        const normalized = {
          ...p,
          category: typeof p.category === 'object' && p.category !== null ? p.category.name : p.category,
          images: Array.isArray(p.images) && p.images.length ? p.images : [],
          name: p.name || p.title || '',
          title: p.title || p.name || '',
          price: typeof p.price === 'number' ? p.price : Number(p.price) || 0,
          stock: typeof p.stock === 'number' ? p.stock : Number(p.stock) || 0,
        }
        if (isMounted) setProduct(normalized)
      } catch (e) {
        setError('محصول یافت نشد یا خطایی رخ داد')
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    if (slug) fetchProduct()
    return () => { isMounted = false }
  }, [slug])

  const primaryImage = useMemo(() => {
    if (!product?.images?.length) return null
    return product.images.find(img => img.isPrimary) || product.images[0]
  }, [product])

  const handleAddToCart = () => {
    if (!product) return
    addToCart({
      id: product._id || product.id || product.slug,
      name: product.name,
      price: product.price,
      image: primaryImage?.url || '',
    })
  }




  const OFFER_DURATION_MS = 12 * 60 * 60 * 1000
  const [offerEnd, setOfferEnd] = useState(() => Date.now() + OFFER_DURATION_MS)

  function SpecialOfferTimer({ end }) {
    const [left, setLeft] = useState(() => end - Date.now())

    useEffect(() => {
      if (left <= 0) return
      const t = setInterval(() => {
        setLeft(end - Date.now())
      }, 1000)
      return () => clearInterval(t)
    }, [end, left])

    if (left <= 0) {
      return (
        <span className="text-red-500 font-bold">
          زمان پیشنهاد ویژه به پایان رسیده است.
        </span>
      )
    }

    const totalSec = Math.floor(left / 1000)
    const hours = Math.floor(totalSec / 3600)
    const minutes = Math.floor((totalSec % 3600) / 60)
    const seconds = totalSec % 60

    const f2 = n => (n < 10 ? "0" : "") + n

    return (
      <div className="flex items-center gap-2 text-lg dark:text-emerald-100 text-emerald-950">
        <span dir="ltr">
          {f2(hours)} : {f2(minutes)} : {f2(seconds)}
        </span>
      </div>
    )
  }



  return (
    <div className="min-h-screen dark:bg-gray-900 flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="container mx-auto px-2 sm:px-4 py-14 lg:py-28">
          {loading ? (
            <div className="py-24 flex flex-col items-center justify-center text-gray-600 dark:text-gray-300">
              <span className="animate-spin text-4xl mb-4">⏳</span>
              <span className="text-lg font-bold">در حال بارگذاری...</span>
            </div>
          ) : error ? (
            <div className="py-24 flex flex-col items-center justify-center">
              <div className="text-7xl mb-6">😔</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{error}</h3>
              <Button asChild>
                <Link href="/products">بازگشت به محصولات</Link>
              </Button>
            </div>
          ) : product ? (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 lg:gap-7 items-start">
              {/* Info */}
              <div className="relative bg-white/80 lg:col-span-3 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-7 sm:p-10 shadow-2xl border border-white/50 dark:border-gray-700/40 transition-all">
                {/* Images */}
                <div className="flex flex-col gap-4">
                  <div className="relative w-full h-80 sm:h-96 mb-10 rounded-3xl overflow-hidden shadow-lg bg-gradient-to-br from-emerald-100 to-cyan-100 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
                    {primaryImage ? (
                      <img
                        src={primaryImage.url}
                        alt={primaryImage.alt || product.name}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    ) : (
                      <img
                        src="/img/defultImg.jpg"
                        alt="تصویر پیش‌فرض محصول"
                        className="w-full object-cover rounded-2xl opacity-70"
                      />
                    )}
                    {/* Badge for out of stock */}
                    {product.stock <= 0 && (
                      <span className="absolute top-4 left-4 bg-red-500/90 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg z-10">
                        ناموجود
                      </span>
                    )}
                  </div>
                  {product.images?.length > 1 && (
                    <div className="grid grid-cols-4 gap-2 sm:gap-3 mt-2">
                      {product.images.slice(0, 8).map((img, idx) => (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          key={idx}
                          src={img.url}
                          alt={img.alt || product.name}
                          className="w-full h-16 sm:h-24 object-cover rounded-xl border-2 border-transparent hover:border-emerald-400 transition"
                          style={{
                            boxShadow: "0 2px 8px 0 rgba(16,185,129,0.08)"
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
                {/* Category badge - prettier, with animated icon */}
                <div className="absolute -top-6 right-7 flex items-center gap-2 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 dark:from-emerald-700 dark:via-teal-800 dark:to-cyan-800 px-5 py-1.5 rounded-full shadow-xl border-2 border-white/50 dark:border-emerald-500/30 text-white text-sm font-bold z-20 backdrop-blur-lg drop-shadow-lg transition hover:scale-105 active:scale-95">
                  {/* prettier and animated icon */}
                  <span className="inline-block animate-[wiggle_1.2s_ease-in-out_infinite] scale-125 drop-shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="22" height="22" fill="none">
                      <defs>
                        <linearGradient id="tagIconGradient" x1="0" x2="1" y1="0" y2="1">
                          <stop stopColor="#06c" />
                          <stop offset="1" stopColor="#16a34a" />
                        </linearGradient>
                      </defs>
                      <rect x="7" y="7" width="18" height="18" rx="5" fill="url(#tagIconGradient)" opacity="0.13" />
                      <path d="M16.54 5.6a2 2 0 0 1 2.82 0l7.05 7.06a2 2 0 0 1 0 2.83l-8.42 8.41a2 2 0 0 1-2.82 0l-7.06-7.05a2 2 0 0 1 0-2.82l8.43-8.43Z" fill="url(#tagIconGradient)" />
                      <circle cx="20.2" cy="10.8" r="1.25" fill="#fff" />
                    </svg>
                  </span>
                  <span>{product.category}</span>
                </div>
                <div className="flex items-center justify-between flex-wrap mb-8 gap-y-8">
                  <h1 className="text-3xl sm:text-4xl font-extrabold moraba text-gray-900 dark:text-white drop-shadow-[0_6px_18px_rgba(16,185,129,0.2)]">
                    {product.name}
                  </h1>
                  <div className="flex flex-wrap items-center gap-4">
                    {product.originalPrice && (
                      <div className="text-gray-400/80 line-through text-lg font-medium">
                        {formatPrice(product.originalPrice)}
                      </div>
                    )}
                    <div className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 flex items-end gap-1 drop-shadow-sm">
                      {formatPrice(product.price)}
                      <span className="text-base font-normal">تومان</span>
                    </div>
                    {product.discount && (
                      <span className="bg-gradient-to-r from-emerald-100 via-emerald-200 to-emerald-100 dark:from-emerald-900/30 dark:via-emerald-800/25 dark:to-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-3 py-1 rounded-full text-xs font-bold shadow outline outline-1 outline-emerald-200/70 dark:outline-emerald-700/40 animate-pulse">
                        {product.discount}٪ تخفیف
                      </span>
                    )}
                  </div>
                </div>
                <div className="w-full mb-6">
                  <div className="w-full text-lg flex items-center justify-between gap-2 transition-all duration-300 border border-emerald-500 dark:bg-gray-900 rounded-xl px-5 py-2.5 shadow-lg">
                    <span className="flex items-center gap-2 moraba dark:text-white">
                      <svg className="w-6 h-6 text-emerald-400 dark:text-emerald-100 drop-shadow-md" fill="none" viewBox="0 0 24 24">
                        <path d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.54-7.54l-1.42 1.42M7.88 16.12l-1.42 1.42m12.02 0l-1.42-1.42M7.88 7.88l-1.42-1.42" stroke="#10b981" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      پیشنهاد شگفت‌انگیز!
                    </span>
                    <span className="flex items-center gap-2 text-[15px] dark:text-white">
                      <SpecialOfferTimer end={offerEnd} />
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 mb-1 hidden sm:inline text-emerald-950 dark:text-emerald-100">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                      <span className="text-xs flex-shrink-0 hidden sm:inline dark:text-emerald-100">
                        تا پایان این پیشنهاد
                      </span>
                    </span>
                  </div>
                </div>


                {product.shortDescription && (
                  <p className="text-gray-700 dark:text-gray-300 mb-6 leading-7 text-base sm:text-md rounded-xl">
                    {product.shortDescription}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span
                    className={`px-4 py-1 rounded-full text-sm shadow transition-all border ${product.stock > 0
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800/60  '
                      : 'bg-red-50 text-red-700 border-red-100 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800/60 animate-pulse'
                      }`}
                  >
                    {product.stock > 0 ? (
                      <span className="inline-flex items-center gap-1">
                        <svg className="w-4 h-4 -ml-1 text-emerald-500 drop-shadow-lg" fill="none" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="9" fill="#4ade80" fillOpacity="0.5" />
                          <path d="M16.5 10l-5 5L7.5 11" stroke="#059669" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        موجود
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1">
                        <svg className="w-4 h-4 -ml-1 text-red-500 drop-shadow" fill="none" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="9" fill="#f87171" fillOpacity="0.45" />
                          <path d="M9.5 14.5l5-5m-5 0l5 5" stroke="#ef4444" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        ناموجود
                      </span>
                    )}
                  </span>
                  {product.brand && (
                    <span className="px-4 py-1 rounded-full text-sm bg-gray-100/80 text-gray-700 dark:bg-gray-700/80 dark:text-gray-200 shadow border border-gray-100 dark:border-gray-700/50 flex items-center gap-1">
                      <svg className="w-4 h-4 text-gray-400 ml-1" fill="none" stroke="currentColor" strokeWidth="1.3" viewBox="0 0 24 24"><path d="M7 14V7a5 5 0 0 1 10 0v7m-11 4h12a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1zm5-6v2" /></svg>
                      برند: {product.brand}
                    </span>
                  )}
                  {product.sku && (
                    <span className="px-4 py-1 rounded-full text-xs bg-gray-50/70 text-gray-500 dark:bg-gray-800/60 dark:text-gray-400 shadow border border-gray-100 dark:border-gray-700/40 flex items-center gap-1">
                      <svg viewBox="0 0 20 20" fill="none" className="w-3.5 h-3.5 text-gray-300 dark:text-gray-500 ml-1"><rect x="2.5" y="3" width="15" height="14" rx="2" fill="currentColor" fillOpacity="0.1" /><path stroke="currentColor" strokeWidth="1.2" d="M6.5 6h7M6.5 9h7M10 12h3.5" /></svg>
                      کد: {product.sku}
                    </span>
                  )}
                </div>
                {product.features?.length > 0 && (
                  <div className="mb-9">
                    <h3 className="text-xl mb-4 text-emerald-700 dark:text-emerald-200 flex items-center gap-2 drop-shadow-lg mt-10">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                      </svg>

                      <span className="moraba">
                        ویژگی‌ها
                      </span>
                    </h3>
                    <ul className="grid sm:grid-cols-2 gap-3 pl-3">
                      {product.features.slice(0, 6).map((f, i) => (
                        <li
                          key={i}
                          className="
                            flex items-center gap-2
                            bg-gradient-to-r from-emerald-50 via-white to-cyan-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800
                            rounded-xl px-4 py-2 shadow-md border border-emerald-100/60 dark:border-emerald-800/40
                            hover:bg-emerald-50/80 dark:hover:bg-gray-900/70 transition
                          "
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 bg-emerald-100/60  dark:bg-emerald-800/40 p-1 rounded-full">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                          </svg>
                          <span className="text-gray-700 dark:text-gray-200 font-medium">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {product.specifications?.length > 0 && (
                  <div className="mb-5">
                    <h3 className="text-xl mb-4 text-emerald-700 dark:text-emerald-200 flex items-center gap-2 drop-shadow-lg mt-10">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
                      </svg>


                      <span className="moraba">
                        مشخصات
                      </span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {product.specifications.slice(0, 8).map((s, i) => (
                        <div
                          key={i}
                          className="
                            flex items-center gap-2
                            bg-gradient-to-r from-emerald-50 via-white to-cyan-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800
                            rounded-xl px-4 py-2 shadow-md border border-emerald-100/60 dark:border-emerald-800/40
                            hover:bg-emerald-50/80 dark:hover:bg-gray-900/70 transition justify-between
                          "
                        >
                          <span className="text-gray-700 dark:text-gray-200 font-semibold flex items-center gap-1">
                            <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 16 16"><circle cx="8" cy="8" r="8" fillOpacity="0.10" /><path d="M8 5v2.5l1.5 1" stroke="#06b6d4" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            {s.name}
                          </span>
                          <span className=" text-gray-900 dark:text-white  dark:from-gray-900 dark:to-gray-800">
                            {s.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Comments and FAQ Section */}
                <div className="mt-8">
                  {/* Comments Accordion */}
                  <div className="mb-10">
                    <h3 className="text-xl mb-4 text-emerald-700 dark:text-emerald-200 flex items-center gap-2 drop-shadow-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                      </svg>

                      <span className="moraba">نظرات کاربران</span>
                    </h3>
                    {/* Shadcn Accordion for Comments */}
                    <div className="border border-emerald-100/60 dark:border-emerald-800/40 dark:bg-gray-900 rounded-xl px-4 py-4 mb-6">
                      {/* Comment Form */}
                      <form className="mb-6 flex flex-col gap-3">
                        <textarea
                          className="w-full h-20 p-3 border border-gray-200 dark:border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-300 dark:bg-gray-900 dark:text-gray-200 transition"
                          placeholder="نظر خود را وارد کنید..."
                          disabled
                        ></textarea>
                        <div className="flex items-center justify-between gap-2">

                          <div className="flex">

                            <span className="text-gray-700 dark:text-gray-300 ml-2 mt-1">امتیاز شما:</span>
                            <div className="flex gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <svg
                                  key={star}
                                  className="w-6 h-6 text-yellow-400 opacity-60"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.242 3.826a1 1 0 0 0 .95.69h4.02c.969 0 1.371 1.24.588 1.81l-3.252 2.36a1 1 0 0 0-.364 1.118l1.242 3.826c.3.921-.755 1.688-1.54 1.118l-3.252-2.36a1 1 0 0 0-1.176 0l-3.252 2.36c-.784.57-1.838-.197-1.539-1.118l1.242-3.826a1 1 0 0 0-.364-1.118l-3.252-2.36c-.783-.57-.38-1.81.588-1.81h4.02a1 1 0 0 0 .95-.69l1.242-3.826z" />
                                </svg>
                              ))}
                            </div>
                          </div>
                          <div className="p-2.5 bg-gray-50 dark:bg-gray-800 rounded-lg text-gray-700 dark:text-gray-200 text-xs hidden md:block">
                            <span>
                              ارسال نظرات به زودی فعال خواهد شد. خوشحال می‌شویم نظر ارزشمند شما را بخوانیم!
                            </span>
                          </div>

                        </div>
                        <button
                          type="button"
                          className="mt-2 px-5 py-2 bg-emerald-600 text-white rounded-lg shadow hover:bg-emerald-700 transition flex items-center gap-2 justify-center"
                          disabled
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                          </svg>
                          ارسال نظر
                        </button>

                      </form>
                      {/* Placeholder for List of Comments */}
                      <div>
                        {/* Shadcn Accordion style */}
                        <div className="space-y-2">
                          {[1, 2, 3].map((item) => (
                            <div key={item} className="border border-gray-200 dark:border-gray-800 rounded-lg">
                              <button
                                type="button"
                                className="w-full flex justify-between items-center px-4 py-3 focus:outline-none group"
                                aria-expanded="false"
                                tabIndex={0}
                              >
                                <span className="text-gray-700 dark:text-gray-200 font-medium">نام کاربر {item}</span>
                              </button>
                              {/* Comment Content (Shadcn Accordion Panel) */}
                              <div className="px-4 pb-3 pt-1 text-gray-600 dark:text-gray-300 text-sm">
                                محتوای کامنت نمونه برای محصول. (این بخش UI است)
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* FAQ Accordion */}
                  <div>
                    <h3 className="text-xl mb-7 text-emerald-700 dark:text-emerald-200 flex items-center gap-2 drop-shadow-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 2" />
                        <circle cx="12" cy="12" r="9" />
                      </svg>
                      <span className="moraba">سوالات متداول</span>
                    </h3>
                    {/* Shadcn Accordion for FAQ */}
                    <Accordion type="single" collapsible className="space-y-2">
                      {[
                        {
                          q: "چگونه می‌توانم این محصول را سفارش دهم؟",
                          a: "کافیست بر روی دکمه افزودن به سبد خرید کلیک کنید و فرآیند خرید را تکمیل نمایید."
                        },
                        {
                          q: "آیا این محصول گارانتی دارد؟",
                          a: "بله، تمامی محصولات دارای گارانتی اصالت و سلامت فیزیکی کالا هستند."
                        },
                        {
                          q: "مدت زمان ارسال چقدر است؟",
                          a: "محصولات در سریع‌ترین زمان ممکن ارسال خواهند شد که معمولا بین ۱ تا ۳ روز کاری است."
                        }
                      ].map((faq, idx) => (
                        <AccordionItem
                          key={idx}
                          value={`faq-${idx}`}
                          className="border-2 border-emerald-400 dark:border-emerald-900 rounded-xl shadow-md transition-all hover:scale-[1.02] hover:border-emerald-500 dark:bg-gray-900"
                        >
                          <AccordionTrigger className="text-md w-full flex justify-between items-center px-4 py-3  text-gray-700 dark:text-gray-200">
                            {faq.q}
                          </AccordionTrigger>
                          <AccordionContent className="px-4 pb-3 pt-1 text-gray-600 dark:text-gray-300 text-sm">
                            {faq.a}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </div>
              </div>
              {/* Sticky Side Box */}
              <div className="h-full w-full">
                <div className="sticky top-28">
                  <div className="bg-gradient-to-br from-white via-emerald-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 p-6 mb-8 transition-all duration-300">
                    {/* Title */}
                    <h2 className="text-xl font-extrabold text-gray-900 dark:text-white mb-2 text-center tracking-tight">{product.title}</h2>
                    {/* Price & Stock */}
                    <div className="flex items-center justify-center gap-4 my-4">
                      <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 drop-shadow">
                        {formatPrice(product.price)} <span className="text-base font-normal">تومان</span>
                      </span>
                      {product.stock > 0 ? (
                        <span className="px-3 py-1 bg-emerald-100/80 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 rounded-full text-xs font-medium shadow flex items-center gap-1"><svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" fill="#4ade80" fillOpacity="0.35" /><path d="M13.5 9l-3 3-1.5-1.5" stroke="#059669" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>موجود</span>
                      ) : (
                        <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-full text-xs font-medium shadow flex items-center gap-1 animate-pulse"><svg className="w-3.5 h-3.5 text-red-400" fill="none" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" fill="#f87171" fillOpacity="0.18" /><path d="M8.5 12.5l3-3m-3 0l3 3" stroke="#ef4444" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>ناموجود</span>
                      )}
                    </div>
                    <ul className="mb-4 flex flex-col space-y-2">
                      <li className="flex items-center gap-2 text-gray-800 dark:text-gray-200 text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                        </svg>
                        گارانتی اصالت و سلامت فیزیکی کالا
                      </li>
                      <li className="flex items-center gap-2 text-gray-800 dark:text-gray-200 text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                        </svg>
                        ارسال رایگان به سراسر کشور
                      </li>
                    </ul>
                    <div className="mb-4">
                      <div className="flex items-center rounded-lg bg-cyan-100 dark:bg-cyan-950 border border-cyan-300 dark:border-cyan-900 px-3 py-2 text-cyan-800 dark:text-cyan-200 text-xs transition-all shadow gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5-3.9 19.5m-2.1-19.5-3.9 19.5" />
                        </svg>
                        ارسال زیر ۲۴ ساعت
                      </div>
                    </div>
                    {/* Quantity & Add to Cart */}
                    <StickyCartBox product={product} />
                  </div>
                  {/* Related Products */}
                  <RelatedProducts currentProductId={product._id || product.id || product.slug} category={product.category} />
                </div>
              </div>
            </div>
          ) : null}
        </section>
      </main>
      <Footer />
    </div>
  )
}

// StickyCartBox Component
function StickyCartBox({ product }) {
  const { items, addToCart, updateQuantity, removeFromCart } = useCart()
  const cartItem = items.find(item => item.id === (product._id || product.id || product.slug))
  const [quantity, setQuantity] = useState(cartItem ? cartItem.quantity : 1)

  useEffect(() => {
    if (cartItem) setQuantity(cartItem.quantity)
  }, [cartItem])

  const handleAdd = () => {
    if (!cartItem) {
      addToCart({
        id: product._id || product.id || product.slug,
        name: product.name || product.title,
        price: product.price,
        image: product.images?.[0]?.url || product.images?.[0] || "",
      })
      setQuantity(1)
    }
  }

  const handleIncrease = () => {
    if (cartItem && quantity < product.stock) {
      updateQuantity(product._id || product.id || product.slug, quantity + 1)
      setQuantity(q => q + 1)
    }
  }

  const handleDecrease = () => {
    if (cartItem && quantity > 1) {
      updateQuantity(product._id || product.id || product.slug, quantity - 1)
      setQuantity(q => q - 1)
    }
  }

  const handleRemove = () => {
    if (cartItem) {
      removeFromCart(product._id || product.id || product.slug)
      setQuantity(1)
    }
  }

  return (
    <div>
      {product.stock > 0 ? (
        cartItem ? (
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={handleDecrease}
                className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 text-2xl font-bold text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-gray-200 dark:border-gray-700"
                aria-label="کاهش تعداد"
              ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                </svg>
              </button>
              <span className="text-lg font-bold w-8 text-center">{quantity}</span>
              <button
                onClick={handleIncrease}
                disabled={quantity >= product.stock}
                className={`w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 text-2xl font-bold text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-gray-200 dark:border-gray-700 ${quantity >= product.stock ? "opacity-50 cursor-not-allowed" : ""}`}
                aria-label="افزایش تعداد"
              ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </button>
            </div>
            <button
              onClick={handleRemove}
              className="w-full p-2 rounded-lg text-lg flex items-center justify-center gap-2 transition-all duration-300 border border-red-500 text-red-600 dark:bg-gray-900 moraba"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
              حذف از سبد خرید
            </button>
          </div>
        ) : (
          <button
            onClick={handleAdd}
            className="w-full p-2 rounded-lg text-lg flex items-center justify-center gap-2 transition-all duration-300 border border-emerald-500 dark:bg-gray-900 moraba"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            افزودن به سبد خرید
          </button>
        )
      ) : (
        <button
          disabled
          className="w-full py-3 mt-2 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-400 font-extrabold text-lg shadow-lg cursor-not-allowed"
        >
          ناموجود
        </button>
      )}
    </div>
  )
}

// RelatedProducts Component
function RelatedProducts({ currentProductId, category }) {
  const [related, setRelated] = useState([])
  useEffect(() => {
    let isMounted = true
    if (!category) return
    const fetchRelated = async () => {
      try {
        const axios = (await import('axios')).default
        const res = await axios.get('/api/products')
        const data = res.data
        if (!isMounted) return
        const filtered = (data.products || []).filter(
          p => (p._id || p.id || p.slug) !== currentProductId
        )
        setRelated(filtered.slice(0, 4))
      } catch (e) {
        setRelated([])
      }
    }
    fetchRelated()
    return () => { isMounted = false }
  }, [category, currentProductId])

  if (!related.length) return null

  return (
    <div>
      <h3 className="text-lg moraba text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <span className="text-gray-900 dark:text-white"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
        </svg>
        </span> محصولات مرتبط
      </h3>
      <div className="grid grid-cols-1 gap-4">
        {related.map(prod => (
          <Link
            key={prod._id || prod.id || prod.slug}
            href={`/products/${prod.slug || prod._id || prod.id}`}
            className="flex items-center gap-3 p-2 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-all border border-gray-100 dark:border-gray-800"
          >
            <img
              src={prod.images?.[0]?.url || prod.images?.[0] || "/placeholder.png"}
              alt={prod.title || prod.name}
              className="w-14 h-14 object-cover rounded-lg bg-white border border-gray-100 dark:border-gray-800"
            />
            <div className="flex-1">
              <div className="text-gray-900 dark:text-white text-sm line-clamp-1">{prod.title || prod.name}</div>
              <div className="text-emerald-600 dark:text-emerald-400 font-bold text-xs mt-1">
                {formatPrice(prod.price)} تومان
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
