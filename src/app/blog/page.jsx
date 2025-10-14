'use client'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/ui/PageHero'
import { Card, CardContent } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { MagnifyingGlassIcon, CalendarIcon, UserIcon, TagIcon, ArrowPathIcon } from '@heroicons/react/24/outline'
import { formatDate } from '@/lib/utils'
import { API_BASE_URL } from '@/context/AuthContext'
import { useAlertDialog } from '@/components/ui/AlertDialog'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu'

export default function BlogPage() {
  const { showError, AlertDialogComponent } = useAlertDialog()
  const [posts, setPosts] = useState([])
  const [categories, setCategories] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('همه')
  const [sort, setSort] = useState('جدیدترین')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [pageSize] = useState(12)
  const [total, setTotal] = useState(0)

  // Fetch posts and categories from backend
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const postsRes = await axios.get('/api/blog/posts');
        console.log(postsRes.data.posts);
        
          setPosts(postsRes.data.posts || []);
          setTotal(postsRes.data.total || 0);

      } catch (err) {
        setError('خطا در دریافت اطلاعات از سرور')
        showError('خطا', 'خطا در دریافت اطلاعات از سرور')
      }
      setLoading(false)
    }
    fetchData()
  }, [])

  // Filter, search, sort, and paginate posts
  const filteredPosts = posts
    .filter(post => {
      const matchesSearch =
        post.title.includes(searchTerm) ||
        post.excerpt.includes(searchTerm) ||
        (post.tags && post.tags.some(tag => tag.includes(searchTerm)))
      const matchesCategory =
        selectedCategory === 'همه' || post.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      if (sort === 'جدیدترین') {
        return new Date(b.date) - new Date(a.date)
      }
      if (sort === 'قدیمی‌ترین') {
        return new Date(a.date) - new Date(b.date)
      }
      if (sort === 'پر بازدیدترین') {
        return (b.views || 0) - (a.views || 0)
      }
      return 0
    })

  // Pagination
  const paginatedPosts = filteredPosts.slice((page - 1) * pageSize, page * pageSize)
  const totalPages = Math.ceil(filteredPosts.length / pageSize)

  // Reset page on filter/search/sort change
  useEffect(() => {
    setPage(1)
  }, [searchTerm, selectedCategory, sort])

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        <section className="relative pb-24 pt-32 overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
          {/* Dark mode background overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.08'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
          <div className="container mx-auto px-4 relative z-10">
            <div
              className="text-center text-white dark:text-white"
            >
              <div className="inline-flex items-center gap-2 bg-white/30 dark:bg-gray-800/40 backdrop-blur px-6 py-2 rounded-full mb-8 shadow-lg">
                <span className="text-2xl">🧭</span>
                <span className="text-md">جدیدترین و بهترین مطالب وبلاگ</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold mb-6 moraba drop-shadow-lg dark:drop-shadow-[0_2px_24px_rgba(16,185,129,0.25)]">
                وبلاگ ونتورا
              </h1>
              <p className="text-lg mt-10 text-white/90 dark:text-gray-200 max-w-2xl mx-auto mb-10 font-light">
                الهام بگیر، یاد بگیر و حرفه‌ای کمپ کن!
              </p>
            </div>
          </div>
        </section>

        {/* Filters & Search */}
        <section className="py-6 backdrop-blur border-t border-neutral-light dark:border-neutral-gray bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Category Filters */}
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {categories && categories.length > 0 && (
                  <>
                    <Button
                      key="همه"
                      variant={!selectedCategory ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedCategory('')}
                      className={`rounded-full px-4 py-2 font-medium transition-all duration-200 ${!selectedCategory ? 'shadow-md bg-gradient-to-r from-emerald-400 to-cyan-400 text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-emerald-50 dark:hover:bg-gray-700'}`}
                    >
                      همه دسته‌ها
                    </Button>
                    {categories.map((cat) => (
                      <Button
                        key={cat}
                        variant={selectedCategory === cat ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedCategory(cat)}
                        className={`rounded-full px-4 py-2 font-medium transition-all duration-200 ${selectedCategory === cat ? 'shadow-md bg-gradient-to-r from-emerald-400 to-cyan-400 text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-emerald-50 dark:hover:bg-gray-700'}`}
                      >
                        {cat}
                      </Button>
                    ))}
                  </>
                )}
              </div>
              {/* Search & Sort */}
              <div className="flex flex-col md:flex-row gap-4 items-center w-full md:w-auto justify-end">
                {/* Search */}
                <div className="relative w-full">
                  <Input
                    type="text"
                    placeholder="جستجو در عنوان..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="h-12 pr-12 text-base bg-white/20 dark:bg-gray-800/40 backdrop-blur border-none text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-300 rounded-2xl shadow-lg focus:ring-2 focus:ring-emerald-400"
                  />
                  <MagnifyingGlassIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                </div>
                {/* Sort */}
                <div className="flex items-center gap-2">
                  <label htmlFor="sort" className="text-sm text-neutral-gray">مرتب‌سازی:</label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="rounded-xl border border-emerald-200 dark:border-emerald-800 bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white px-4 py-2 text-sm min-w-[140px] flex justify-between items-center shadow-sm hover:bg-emerald-50/60 dark:hover:bg-emerald-900/30 transition-all duration-200"
                        id="sort"
                      >
                        <span className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-emerald-500 dark:text-emerald-400 ml-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                          {sort || "انتخاب"}
                        </span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="min-w-[160px] rounded-xl border border-emerald-100 dark:border-emerald-900 bg-white/90 dark:bg-gray-900/95 shadow-xl p-1"
                    >
                      <DropdownMenuItem
                        onSelect={() => setSort("جدیدترین")}
                        className={`rounded-lg px-3 py-2 transition-all duration-150 cursor-pointer ${sort === "جدیدترین"
                          ? "bg-gradient-to-r from-emerald-100 to-cyan-100 dark:from-emerald-900 dark:to-cyan-900 text-emerald-700 dark:text-emerald-300 font-bold shadow"
                          : "hover:bg-emerald-50 dark:hover:bg-emerald-900/40"
                          }`}
                      >
                        <span className="flex flex-row-reverse items-center gap-2 justify-between w-full">
                          جدیدترین
                          {sort === "جدیدترین" && (
                            <svg className="w-4 h-4 text-emerald-500 dark:text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                              <circle cx="10" cy="10" r="6" />
                            </svg>
                          )}
                        </span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onSelect={() => setSort("قدیمی‌ترین")}
                        className={`rounded-lg px-3 py-2 transition-all duration-150 cursor-pointer ${sort === "قدیمی‌ترین"
                          ? "bg-gradient-to-r from-emerald-100 to-cyan-100 dark:from-emerald-900 dark:to-cyan-900 text-emerald-700 dark:text-emerald-300 font-bold shadow"
                          : "hover:bg-emerald-50 dark:hover:bg-emerald-900/40"
                          }`}
                      >
                        <span className="flex flex-row-reverse items-center gap-2 justify-between w-full">
                          قدیمی‌ترین
                          {sort === "قدیمی‌ترین" && (
                            <svg className="w-4 h-4 text-emerald-500 dark:text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                              <circle cx="10" cy="10" r="6" />
                            </svg>
                          )}
                        </span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onSelect={() => setSort("پر بازدیدترین")}
                        className={`rounded-lg px-3 py-2 transition-all duration-150 cursor-pointer ${sort === "پر بازدیدترین"
                          ? "bg-gradient-to-r from-emerald-100 to-cyan-100 dark:from-emerald-900 dark:to-cyan-900 text-emerald-700 dark:text-emerald-300 font-bold shadow"
                          : "hover:bg-emerald-50 dark:hover:bg-emerald-900/40"
                          }`}
                      >
                        <span className="flex flex-row-reverse items-center gap-2 justify-between w-full">
                          پر بازدیدترین
                          {sort === "پر بازدیدترین" && (
                            <svg className="w-4 h-4 text-emerald-500 dark:text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                              <circle cx="10" cy="10" r="6" />
                            </svg>
                          )}
                        </span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-10 md:py-16 min-h-[40vh] bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-24">
                <ArrowPathIcon className="w-12 h-12 text-primary animate-spin mb-4" />
                <span className="text-lg text-primary font-bold">در حال بارگذاری...</span>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-24">
                <span className="text-5xl mb-4">😢</span>
                <span className="text-lg text-red-500 font-bold">{error}</span>
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24">
                <span className="text-6xl mb-4">📝</span>
                <h3 className="text-2xl font-semibold text-text-dark dark:text-white mb-2">
                  مقاله‌ای یافت نشد
                </h3>
                <p className="text-neutral-gray">
                  هیچ مقاله‌ای با این شرایط پیدا نشد. جستجو یا دسته‌بندی را تغییر دهید.
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {paginatedPosts.map((post) => (
                    <div className='relative'>
                      <Card
                        key={post._id}
                        className="overflow-hidden relative bg-gray-100 dark:bg-gray-800 border-0 rounded-[28px] shadow-[0_20px_60px_rgba(16,24,40,0.08)] hover:shadow-[0_24px_80px_rgba(16,24,40,0.12)] transition-all duration-500 inverted-radius !w-full group"
                      >
                        <div className="relative">
                          {/* Post Image */}
                          <div className="relative w-full h-44 md:h-60">
                            {post.imageUrl ? (
                              <img
                                src={post.imageUrl}
                                alt={post.title}
                                className="object-cover w-full h-full"
                                style={{
                                  borderTopLeftRadius: "28px",
                                  borderTopRightRadius: "28px"
                                }}
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center text-6xl">{post.emoji || "📝"}</div>
                            )}

                            {/* Rounded corners overlay */}
                            <div className="pointer-events-none absolute inset-0 rounded-[28px] rounded-b-none ring-1 ring-black/5" />

                            {/* Category badge at top-left */}
                            <span className="absolute top-4 left-4 z-10 inline-flex items-center rounded-full bg-emerald-500 px-3 py-1 text-xs font-bold text-white shadow">
                              <TagIcon className="w-4 h-4 text-white mr-1" />
                              {post.category}
                            </span>
                          </div>
                        </div>
                        <CardContent className="p-4 md:p-6 flex flex-col">
                          {/* Title */}
                          <h3 className="text-center text-md md:text-xl font-extrabold tracking-tight text-gray-900 dark:text-white mt-2 group-hover:text-primary transition-colors line-clamp-2">
                            <Link href={`/blog/${post._id}`}>{post.title}</Link>
                          </h3>
                          {/* Excerpt */}
                          <p className="my-5 text-center text-sm leading-7 text-gray-500 line-clamp-2">{post.excerpt}</p>
                          {/* Meta Info */}
                          <div className="flex items-center justify-between text-xs text-neutral-gray mt-2">
                            <div className="flex items-center justify-between w-full text-xs text-gray-500 dark:text-gray-400">
                              <div className="flex items-center gap-2">
                                <UserIcon className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                                <span className="font-medium">{post.author}</span>
                                <span className="mx-2 text-gray-300 dark:text-gray-600">|</span>
                                <CalendarIcon className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                                <span>{formatDate(post.updatedAt)}</span>
                                <span className="mx-2 text-gray-300 dark:text-gray-600">|</span>
                                {post.readTime && (
                              <span className="flex items-center gap-1 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-full text-sm">
                                <ArrowPathIcon className="w-4 h-4" />
                                {post.readTime}
                              </span>
                            )}
                              </div>

                            </div>
                          </div>
                          {/* Tags */}
                          <div className="flex flex-wrap gap-1 mt-5">
                            {post.tags && post.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-1 bg-transparent text-xs rounded-full border border-emerald-400 shadow text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/40 transition-all"
                              >
                                # {tag}
                              </span>
                            ))}
                            
                          </div>
                        </CardContent>
                      </Card>
                      <div className="absolute left-2 bottom-0 lg:bottom-1 flex">
                        <Link
                          href={`/blog/${post._id}`}
                          className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-gray-700 shadow-[0_8px_24px_rgba(16,24,40,0.12)] ring-1 ring-black/5 dark:bg-gray-900 dark:text-white"
                          aria-label="مشاهده مقاله"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                          </svg>

                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-10">
                    <nav className="flex gap-2 items-center" aria-label="Pagination">
                      <button
                        onClick={() => setPage(page - 1)}
                        disabled={page === 1}
                        className={`w-9 h-9 flex items-center justify-center rounded-full transition-all duration-150 text-sm font-bold border border-gray-200 dark:border-gray-700 ${page === 1
                          ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                          : 'bg-white dark:bg-gray-900 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/40'
                          }`}
                        aria-label="صفحه قبلی"
                      >
                        <span className="text-lg">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                          </svg>

                        </span>
                      </button>
                      {[...Array(totalPages)].map((_, idx) => (
                        <button
                          key={idx + 1}
                          onClick={() => setPage(idx + 1)}
                          className={`w-9 h-9 flex items-center justify-center rounded-full transition-all duration-150 text-sm font-bold border border-gray-200 dark:border-gray-700 ${page === idx + 1
                            ? 'bg-emerald-500 text-white shadow'
                            : 'bg-white dark:bg-gray-900 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/40'
                            }`}
                          aria-current={page === idx + 1 ? "page" : undefined}
                        >
                          {idx + 1}
                        </button>
                      ))}
                      <button
                        onClick={() => setPage(page + 1)}
                        disabled={page === totalPages}
                        className={`w-9 h-9 flex items-center justify-center rounded-full transition-all duration-150 text-sm font-bold border border-gray-200 dark:border-gray-700 ${page === totalPages
                          ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                          : 'bg-white dark:bg-gray-900 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/40'
                          }`}
                        aria-label="صفحه بعدی"
                      >
                        <span className="text-lg">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                          </svg>

                        </span>
                      </button>
                    </nav>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
      <AlertDialogComponent />
    </div>
  )
}