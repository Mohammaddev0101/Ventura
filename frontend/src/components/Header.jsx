'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useTheme } from '@/components/ThemeProvider'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'
import { 
  MagnifyingGlassIcon, 
  ShoppingCartIcon, 
  UserIcon, 
  SunIcon, 
  MoonIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline'

export default function Header() {
  const { theme, toggleTheme } = useTheme()
  const { getTotalItems } = useCart()
  const { user, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const navigation = [
    { name: 'خانه', href: '/' },
    { name: 'محصولات', href: '/products' },
    { name: 'دسته‌بندی‌ها', href: '/categories' },
    { name: 'برندها', href: '/brands' },
    { name: 'تماس با ما', href: '/contact' },
  ]

  return (
    <header className="bg-white dark:bg-gray-900 shadow-lg sticky top-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between py-2 text-sm border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-4 space-x-reverse">
            <span className="text-gray-600 dark:text-gray-400">ارسال رایگان برای خریدهای بالای ۵۰۰ هزار تومان</span>
          </div>
          <div className="flex items-center space-x-4 space-x-reverse">
            <Link href="/track-order" className="text-gray-600 dark:text-gray-400 hover:text-green-600 transition-colors">
              پیگیری سفارش
            </Link>
            <span className="text-gray-400">|</span>
            <Link href="/help" className="text-gray-600 dark:text-gray-400 hover:text-green-600 transition-colors">
              راهنما
            </Link>
          </div>
        </div>

        {/* Main Header */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 space-x-reverse">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">V</span>
            </div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">ونتورا</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 space-x-reverse">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 dark:text-gray-300 hover:text-green-600 transition-colors font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4 space-x-reverse">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-green-600 transition-colors"
            >
              <MagnifyingGlassIcon className="w-6 h-6" />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-green-600 transition-colors"
            >
              {theme === 'light' ? (
                <MoonIcon className="w-6 h-6" />
              ) : (
                <SunIcon className="w-6 h-6" />
              )}
            </button>

            {/* Cart */}
            <Link href="/cart" className="relative p-2 text-gray-700 dark:text-gray-300 hover:text-green-600 transition-colors">
              <ShoppingCartIcon className="w-6 h-6" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Link>

            {/* User Menu */}
            <div className="relative group">
              <button className="p-2 text-gray-700 dark:text-gray-300 hover:text-green-600 transition-colors">
                <UserIcon className="w-6 h-6" />
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                {user ? (
                  <div className="py-2">
                    <Link href="/profile" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
                      پروفایل من
                    </Link>
                    <Link href="/orders" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
                      سفارش‌های من
                    </Link>
                    <Link href="/wishlist" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
                      علاقه‌مندی‌ها
                    </Link>
                    <hr className="my-2" />
                    <button
                      onClick={logout}
                      className="block w-full text-right px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      خروج
                    </button>
                  </div>
                ) : (
                  <div className="py-2">
                    <Link href="/login" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
                      ورود
                    </Link>
                    <Link href="/register" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
                      ثبت نام
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-700 dark:text-gray-300 hover:text-green-600 transition-colors"
            >
              {isMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 dark:text-gray-300 hover:text-green-600 transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">جستجو در محصولات</h3>
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
                className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                autoFocus
              />
              <MagnifyingGlassIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">جستجوهای پرطرفدار:</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {['چادر', 'کوله پشتی', 'کیسه خواب', 'چراغ قوه'].map((term) => (
                  <button
                    key={term}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm hover:bg-green-100 dark:hover:bg-green-900 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}