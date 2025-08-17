'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useTheme } from '@/components/ThemeProvider'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/Button'
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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    { name: 'خانه', href: '/' },
    { name: 'محصولات', href: '/products' },
    { name: 'دسته‌بندی‌ها', href: '/categories' },
    { name: 'وبلاگ', href: '/blog' },
    { name: 'درباره ما', href: '/about' },
    { name: 'تماس با ما', href: '/contact' },
  ]

  return (
    <>
      {/* Top Bar */}
      <div className="bg-green-600 dark:bg-green-800 text-white py-2">
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
      </div>

      {/* Main Header */}
      <motion.header 
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg' 
            : 'bg-white dark:bg-gray-900'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/" className="flex items-center space-x-3 space-x-reverse">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">V</span>
                </div>
                <div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-orange-500 bg-clip-text text-transparent">
                    ونتورا
                  </span>
                  <div className="text-xs text-gray-500 dark:text-gray-400">تجهیزات کمپینگ</div>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8 space-x-reverse">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className="relative text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 font-medium transition-colors group"
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4 space-x-reverse">
              {/* Search */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              >
                <MagnifyingGlassIcon className="w-6 h-6" />
              </motion.button>

              {/* Theme Toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className="p-2 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              >
                {theme === 'light' ? (
                  <MoonIcon className="w-6 h-6" />
                ) : (
                  <SunIcon className="w-6 h-6" />
                )}
              </motion.button>

              {/* Notifications */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors relative"
              >
                <BellIcon className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </motion.button>

              {/* Wishlist */}
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Link href="/wishlist" className="p-2 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors">
                  <HeartIcon className="w-6 h-6" />
                </Link>
              </motion.div>

              {/* Cart */}
              <motion.div 
                whileHover={{ scale: 1.1 }} 
                whileTap={{ scale: 0.9 }}
                className="relative"
              >
                <Link href="/cart" className="p-2 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors">
                  <ShoppingCartIcon className="w-6 h-6" />
                  {getTotalItems() > 0 && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium"
                    >
                      {getTotalItems()}
                    </motion.span>
                  )}
                </Link>
              </motion.div>

              {/* User Menu */}
              <div className="relative group">
                <motion.button 
                  whileHover={{ scale: 1.1 }} 
                  whileTap={{ scale: 0.9 }}
                  className="p-2 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                >
                  <UserIcon className="w-6 h-6" />
                </motion.button>
                
                <AnimatePresence>
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300"
                  >
                    {user ? (
                      <div className="py-2">
                        <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                          <div className="font-medium text-gray-900 dark:text-white">{user.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                        </div>
                        <Link href="/dashboard" className="block px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                          پنل کاربری
                        </Link>
                        <Link href="/orders" className="block px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                          سفارش‌های من
                        </Link>
                        <Link href="/wishlist" className="block px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                          علاقه‌مندی‌ها
                        </Link>
                        {user.role === 'admin' && (
                          <Link href="/admin" className="block px-4 py-2 text-sm text-green-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            پنل مدیریت
                          </Link>
                        )}
                        <hr className="my-2" />
                        <button
                          onClick={logout}
                          className="block w-full text-right px-4 py-2 text-sm text-red-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          خروج
                        </button>
                      </div>
                    ) : (
                      <div className="py-2">
                        <Link href="/login" className="block px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                          ورود
                        </Link>
                        <Link href="/register" className="block px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                          ثبت نام
                        </Link>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Mobile Menu Toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              >
                {isMenuOpen ? (
                  <XMarkIcon className="w-6 h-6" />
                ) : (
                  <Bars3Icon className="w-6 h-6" />
                )}
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="lg:hidden py-4 border-t border-gray-100 dark:border-gray-700"
              >
                <nav className="flex flex-col space-y-4">
                  {navigation.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 font-medium transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

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
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">جستجو در محصولات</h3>
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="نام محصول، برند یا دسته‌بندی را جستجو کنید..."
                  className="w-full px-4 py-3 pr-12 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                  autoFocus
                />
                <MagnifyingGlassIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">جستجوهای پرطرفدار:</p>
                <div className="flex flex-wrap gap-2">
                  {['چادر', 'کوله پشتی', 'کیسه خواب', 'چراغ قوه'].map((term) => (
                    <motion.button
                      key={term}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 hover:bg-green-100 dark:hover:bg-green-900/30 text-sm rounded-full transition-colors"
                    >
                      {term}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}