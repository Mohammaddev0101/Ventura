'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useTheme } from '@/components/ThemeProvider'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/Button'
import Image from 'next/image'
import axios from 'axios'
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  UserIcon,
  SunIcon,
  MoonIcon,
  Bars3Icon,
  XMarkIcon,
  HeartIcon,
  BellIcon
} from '@heroicons/react/24/outline'

export default function Header() {
  const { theme, toggleTheme } = useTheme()
  const { getTotalItems } = useCart()
  const { user, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [categories, setCategories] = useState([])
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false)
  const [userDropdownOpen, setUserDropdownOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [searchLoading, setSearchLoading] = useState(false)
  const [searchError, setSearchError] = useState(null)
  const [searchTouched, setSearchTouched] = useState(false)
  const searchTimeout = useRef(null)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])


  // Fetch categories from backend
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await axios.get('/api/categories')
        let allCategories = Array.isArray(res.data) ? res.data : []
        // Pick 10 random categories each time
        if (allCategories.length > 10) {
          // Shuffle and pick 10
          allCategories = allCategories
            .map(cat => ({ cat, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .slice(0, 10)
            .map(obj => obj.cat)
        }
        setCategories(allCategories)
      } catch (err) {
        setCategories([])
      }
    }
    fetchCategories()
  }, [])

  // Search effect: debounce and fetch from backend
  useEffect(() => {
    if (!searchTouched) return
    if (searchTimeout.current) clearTimeout(searchTimeout.current)
    if (!searchQuery || searchQuery.trim().length < 2) {
      setSearchResults([])
      setSearchLoading(false)
      setSearchError(null)
      return
    }
    setSearchLoading(true)
    setSearchError(null)
    searchTimeout.current = setTimeout(async () => {
      try {
        // Replace with your backend search endpoint
        const res = await axios.get('/api/products/search', {
          params: { q: searchQuery }
        })
        setSearchResults(Array.isArray(res.data) ? res.data : [])
        setSearchLoading(false)
      } catch (err) {
        setSearchError('خطا در دریافت نتایج جستجو')
        setSearchLoading(false)
      }
    }, 400)
    return () => {
      if (searchTimeout.current) clearTimeout(searchTimeout.current)
    }
  }, [searchQuery, searchTouched])

  const navigation = [
    { name: 'دسته‌بندی‌ها', href: '/categories' },
    { name: 'محصولات', href: '/products' },
    { name: 'وبلاگ', href: '/blog' },
    { name: 'درباره ما', href: '/about' },
    { name: 'تماس با ما', href: '/contact' },
  ]

  // Custom logout: clear localStorage and call context logout
  const handleLogout = () => {
    localStorage.clear()
    logout()
    setUserDropdownOpen(false)
    router.push('/')
  }

  // Handle panel click: go to dashboard or admin
  const handlePanelClick = () => {
    setUserDropdownOpen(false)
    if (user?.role === 'admin') {
      router.push('/admin')
    } else {
      router.push('/dashboard')
    }
  }

  // Handle search submit (optional: go to search page)
  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim().length < 2) return
    // If you want to redirect to search page, uncomment below:
    // router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    // setIsSearchOpen(false)
    // Otherwise, just show results in modal (default)
    setSearchTouched(true)
  }

  // Handle click on a search result
  const handleResultClick = (href) => {
    setIsSearchOpen(false)
    setSearchQuery('')
    setSearchResults([])
    setSearchTouched(false)
    router.push(href)
  }

  // Handle click on popular term
  const handlePopularTerm = (term) => {
    setSearchQuery(term)
    setSearchTouched(true)
  }

  return (
    <>
      {/* Top Bar */}
      {/* <div className="bg-green-600 dark:bg-green-800 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4 space-x-reverse">
              <span>🚚 ارسال رایگان برای خریدهای بالای ۵۰۰ هزار تومان</span>
            </div>
            <div className="flex items-center space-x-4 space-x-reverse">
              <Link href="/track-order" className="hover:text-green-200 transition-colors">
                پیگیری سفارش
              </Link>
              <span>|</span>
              <Link href="/help" className="hover:text-green-200 transition-colors">
                راهنما
              </Link>
            </div>
          </div>
        </div>
      </div> */}

      {/* Main Header */}
      <header
        className='fixed w-full top-0 md:top-5 z-50 transition-all duration-300'
      >
        <div className={`hidden lg:block container md:w-[90%] xl:w-[80%] py-3 md:py-0 mx-auto px-4 ${isMenuOpen ? 'md:rounded-2xl' : 'md:rounded-full'} backdrop-blur-md shadow-lg`}>
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/" className="flex items-center space-x-2 gap-x-3">
                <Image
                  src="/img/logo.png"
                  width={30}
                  height={30}
                  alt="VENTURA"
                />
                <div className="text-3xl font-medium moraba ">
                  ونتورا
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-x-8 xl:gap-x-12">
              {navigation.map((item, index) => (
                item.name === 'دسته‌بندی‌ها' ? (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative"
                    onMouseEnter={() => setCategoriesDropdownOpen(true)}
                    onMouseLeave={() => setCategoriesDropdownOpen(false)}
                  >
                    <Link
                      href="/categories"
                      className="relative hover:text-green-600 dark:hover:text-green-400 font-medium transition-colors group flex items-center justify-center gap-1.5 cursor-pointer"
                      onClick={() => setCategoriesDropdownOpen(true)}
                    >
                      {item.name}
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-4 text-green-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                      </svg>
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all duration-100 group-hover:w-full rounded-2xl"></span>
                    </Link>
                    <AnimatePresence>
                      {categoriesDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.98 }}
                          className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 z-50"
                        >
                          <div className="py-2">
                            {categories.length === 0 ? (
                              <div className="flex items-center justify-center px-4 py-4">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 animate-spin">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                                </svg>

                              </div>
                            ) : (
                              categories.map((cat) => (
                                <Link
                                  key={cat._id}
                                  href={`/categories/${cat.slug || cat._id}`}
                                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-green-600 dark:hover:text-green-600 transition-colors"
                                  onClick={() => setCategoriesDropdownOpen(false)}
                                >
                                  {cat.name}
                                </Link>
                              ))
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ) : (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className="relative hover:text-green-600 dark:hover:text-green-400 font-medium transition-colors group flex items-center justify-center gap-1.5"
                    >
                      {item.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all duration-100 group-hover:w-full rounded-2xl"></span>
                    </Link>
                  </motion.div>
                )
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-2 space-x-reverse py-2">

              {/* Cart */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => router.push('/cart')}
                className="relative p-2.5 bg-gray-200 dark:bg-gray-700 dark:bg-neutral-gray/20 rounded-2xl text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                aria-label="سبد خرید"
              >
                <ShoppingCartIcon className="w-6 h-6" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs font-bold rounded-full px-1.5 py-0.5 min-w-[20px] flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </motion.button>

              {/* Theme Toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className="p-2.5 bg-gray-200 dark:bg-gray-700 dark:bg-neutral-gray/20 rounded-2xl text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              >
                {theme === 'light' ? (
                  <MoonIcon className="w-6 h-6" />
                ) : (
                  <SunIcon className="w-6 h-6" />
                )}
              </motion.button>

              {/* Search */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setIsSearchOpen(true)
                  setSearchQuery('')
                  setSearchResults([])
                  setSearchTouched(false)
                  setSearchError(null)
                }}
                className="p-2.5 bg-gray-200 dark:bg-gray-700 dark:bg-neutral-gray/20 rounded-2xl text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              >
                <MagnifyingGlassIcon className="w-6 h-6" />
              </motion.button>

              {/* User Dropdown */}
              {user ? (
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2.5 bg-gray-200 dark:bg-gray-700 dark:bg-neutral-gray/20 rounded-2xl text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                    onClick={() => setUserDropdownOpen((open) => !open)}
                  >
                    <UserIcon className="w-6 h-6" />
                  </motion.button>
                  <AnimatePresence>
                    {userDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 z-50"
                        onMouseLeave={() => setUserDropdownOpen(false)}
                      >
                        <div className="py-2">
                          <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                            <div className="font-medium text-gray-900 dark:text-white">{user.name}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">{user.email}</div>
                          </div>
                          <button
                            onClick={handlePanelClick}
                            className="block w-full text-right px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                          >
                            {user.role === 'admin' ? 'ورود به پنل مدیریت' : 'ورود به پنل کاربری'}
                          </button>
                          {/* <hr className="my-2" /> */}
                          <button
                            onClick={handleLogout}
                            className="block w-full text-right px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                          >
                            خروج
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (

                <Link
                  href="/login"
                  className="w-full text-sm items-center justify-center gap-2 transition-all duration-300 border border-emerald-500 dark:bg-gray-900 dark:text-white font-light rounded-3xl px-5 py-2.5 hidden md:block"
                >
                  ورود / ثبت نام
                </Link>

              )}

              {/* Mobile Menu Toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2.5 bg-gray-200 dark:bg-gray-700 dark:bg-neutral-gray/20 rounded-2xl text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              >
                {isMenuOpen ? (
                  <XMarkIcon className="w-6 h-6" />
                ) : (
                  <Bars3Icon className="w-6 h-6" />
                )}
              </motion.button>
            </div>
          </div>


        </div>

        {/* Mobile Glass Dock Menu */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 w-[350px] mx-auto">
          <div className="backdrop-blur-md bg-white/60 dark:bg-gray-800/50 border-t border-emerald-200/40 dark:border-emerald-800/40 shadow-[0_8px_36px_0_rgba(16,24,40,0.10)] glass-gradient-dock rounded-t-[32px] flex justify-around items-center py-3 px-2 relative">
            <Link href="/" className="flex flex-col items-center text-xs text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mb-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>

              خانه
            </Link>
            {/* Dark Mode Toggle */}
            <button
              onClick={() => toggleTheme()}
              className="flex flex-col items-center text-xs text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition-colors focus:outline-none"
              aria-label="تغییر حالت تیره/روشن"
            >
              {/* Sun/Moon Icon */}
              {theme == 'dark' ? (
                // Sun icon for light mode
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mb-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                </svg>

              ) : (
                // Moon icon for dark mode
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mb-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                </svg>

              )}
              {theme == 'dark' ? "روشن" : "تیره"}
            </button>
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex flex-col items-center text-xs text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition-colors focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mb-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>

              جستجو
            </button>
            <Link href="/cart" className="flex flex-col items-center text-xs text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mb-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
              </svg>

              سبد
            </Link>
            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  if (!user) {
                    router.push('/login');
                    return;
                  }
                  setUserDropdownOpen((open) => !open);
                }}
                className="flex flex-col items-center text-xs text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition-colors focus:outline-none"
                aria-label="پروفایل"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mb-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>

                پروفایل
              </button>
              {userDropdownOpen && (
                <div className="absolute bottom-12 left-1/2 -translate-x-1/3 w-44 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 z-50 py-2">
                  {user ? (
                    <>
                      <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                        <div className="font-medium text-gray-900 dark:text-white">{user.name}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{user.email}</div>
                      </div>
                      <button
                        onClick={handlePanelClick}
                        className="block w-full text-right px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        {user.role === 'admin' ? 'ورود به پنل مدیریت' : 'ورود به پنل کاربری'}
                      </button>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-right px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        خروج
                      </button>
                    </>
                  ) : (
                    <>
                      <Link href="/login" className="block w-full text-right px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">ورود</Link>
                      <Link href="/register" className="block w-full text-right px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">ثبت نام</Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-20"
            onClick={() => setIsSearchOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.95 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-2xl mx-4 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <form onSubmit={handleSearchSubmit}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">جستجو در محصولات</h3>
                  <button
                    type="button"
                    onClick={() => setIsSearchOpen(false)}
                    className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => {
                      setSearchQuery(e.target.value)
                      setSearchTouched(true)
                    }}
                    placeholder="نام محصول، برند یا دسته‌بندی را جستجو کنید..."
                    className="w-full px-4 py-3 pr-12 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-green-600"
                  >
                    <MagnifyingGlassIcon className="w-5 h-5" />
                  </button>
                </div>
              </form>
              <div className="mt-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">جستجوهای پرطرفدار:</p>
                <div className="flex flex-wrap gap-2">
                  {['چادر', 'کوله پشتی', 'کیسه خواب', 'چراغ قوه'].map((term) => (
                    <motion.button
                      key={term}
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 hover:bg-green-100 dark:hover:bg-green-900/30 text-sm rounded-full transition-colors"
                      onClick={() => handlePopularTerm(term)}
                    >
                      {term}
                    </motion.button>
                  ))}
                </div>
              </div>
              {/* Search Results */}
              <div className="mt-6">
                {searchLoading && (
                  <div className="flex items-center justify-center py-6 text-gray-500 dark:text-gray-400">
                    در حال جستجو...
                  </div>
                )}
                {searchError && (
                  <div className="flex items-center justify-center py-6 text-red-500">
                    {searchError}
                  </div>
                )}
                {!searchLoading && searchTouched && searchQuery.trim().length >= 2 && searchResults.length === 0 && !searchError && (
                  <div className="flex items-center justify-center py-6 text-gray-500 dark:text-gray-400">
                    نتیجه‌ای یافت نشد.
                  </div>
                )}
                {!searchLoading && searchResults.length > 0 && (
                  <ul className="divide-y divide-gray-100 dark:divide-gray-700">
                    {searchResults.map((item) => (
                      <li key={item._id || item.id || item.slug} className="py-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                        <div
                          className="flex items-center gap-3"
                          onClick={() => handleResultClick(
                            item.type === 'category'
                              ? `/categories/${item.slug || item._id || item.id}`
                              : item.type === 'brand'
                                ? `/brands/${item.slug || item._id || item.id}`
                                : `/products/${item.slug || item._id || item.id}`
                          )}
                        >
                          {item.image && (
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={40}
                              height={40}
                              className="rounded-md object-cover"
                            />
                          )}
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">{item.name}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {item.type === 'category'
                                ? 'دسته‌بندی'
                                : item.type === 'brand'
                                  ? 'برند'
                                  : 'محصول'}
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}