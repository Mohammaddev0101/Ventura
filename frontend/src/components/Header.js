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
    <header className="bg-white dark:bg-text-dark shadow-lg sticky top-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between py-2 text-sm border-b border-neutral-light dark:border-neutral-gray">
          <div className="flex items-center space-x-4 space-x-reverse">
            <span className="text-neutral-gray">ارسال رایگان برای خریدهای بالای ۵۰۰ هزار تومان</span>
          </div>
          <div className="flex items-center space-x-4 space-x-reverse">
            <Link href="/track-order" className="text-neutral-gray hover:text-primary transition-colors">
              پیگیری سفارش
            </Link>
            <span className="text-neutral-gray">|</span>
            <Link href="/help" className="text-neutral-gray hover:text-primary transition-colors">
              راهنما
            </Link>
          </div>
        </div>

        {/* Main Header */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 space-x-reverse">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">V</span>
            </div>
            <span className="text-2xl font-bold text-text-dark dark:text-white">ونتورا</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 space-x-reverse">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-text-dark dark:text-white hover:text-primary transition-colors font-medium"
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
              className="p-2 text-text-dark dark:text-white hover:text-primary transition-colors"
            >
              <MagnifyingGlassIcon className="w-6 h-6" />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-text-dark dark:text-white hover:text-primary transition-colors"
            >
              {theme === 'light' ? (
                <MoonIcon className="w-6 h-6" />
              ) : (
                <SunIcon className="w-6 h-6" />
              )}
            </button>

            {/* Cart */}
            <Link href="/cart" className="relative p-2 text-text-dark dark:text-white hover:text-primary transition-colors">
              <ShoppingCartIcon className="w-6 h-6" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-auxiliary-orange text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Link>

            {/* User Menu */}
            <div className="relative group">
              <button className="p-2 text-text-dark dark:text-white hover:text-primary transition-colors">
                <UserIcon className="w-6 h-6" />
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-neutral-gray rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                {user ? (
                  <div className="py-2">
                    <Link href="/profile" className="block px-4 py-2 text-sm hover:bg-neutral-light dark:hover:bg-neutral-gray/50">
                      پروفایل من
                    </Link>
                    <Link href="/orders" className="block px-4 py-2 text-sm hover:bg-neutral-light dark:hover:bg-neutral-gray/50">
                      سفارش‌های من
                    </Link>
                    <Link href="/wishlist" className="block px-4 py-2 text-sm hover:bg-neutral-light dark:hover:bg-neutral-gray/50">
                      علاقه‌مندی‌ها
                    </Link>
                    <hr className="my-2" />
                    <button
                      onClick={logout}
                      className="block w-full text-right px-4 py-2 text-sm hover:bg-neutral-light dark:hover:bg-neutral-gray/50"
                    >
                      خروج
                    </button>
                  </div>
                ) : (
                  <div className="py-2">
                    <Link href="/login" className="block px-4 py-2 text-sm hover:bg-neutral-light dark:hover:bg-neutral-gray/50">
                      ورود
                    </Link>
                    <Link href="/register" className="block px-4 py-2 text-sm hover:bg-neutral-light dark:hover:bg-neutral-gray/50">
                      ثبت نام
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-text-dark dark:text-white hover:text-primary transition-colors"
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
          <div className="lg:hidden py-4 border-t border-neutral-light dark:border-neutral-gray">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-text-dark dark:text-white hover:text-primary transition-colors font-medium"
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
          <div className="bg-white dark:bg-neutral-gray rounded-lg p-6 w-full max-w-2xl mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">جستجو در محصولات</h3>
              <button
                onClick={() => setIsSearchOpen(false)}
                className="text-neutral-gray hover:text-text-dark dark:hover:text-white"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="نام محصول، برند یا دسته‌بندی را جستجو کنید..."
                className="w-full px-4 py-3 pr-12 border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                autoFocus
              />
              <MagnifyingGlassIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-gray" />
            </div>
            <div className="mt-4">
              <p className="text-sm text-neutral-gray">جستجوهای پرطرفدار:</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {['چادر', 'کوله پشتی', 'کیسه خواب', 'چراغ قوه'].map((term) => (
                  <button
                    key={term}
                    className="px-3 py-1 bg-neutral-light dark:bg-neutral-gray/50 rounded-full text-sm hover:bg-primary hover:text-white transition-colors"
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