'use client'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import axios from 'axios'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  CalendarIcon, 
  UserIcon, 
  TagIcon, 
  ArrowPathIcon,
  ArrowLeftIcon,
  ShareIcon,
  BookOpenIcon,
  ClockIcon
} from '@heroicons/react/24/outline'
import { formatDate } from '@/lib/utils'
import { useAlertDialog } from '@/components/ui/AlertDialog'

export default function BlogPostPage() {
  const { showError, showSuccess, AlertDialogComponent } = useAlertDialog()
  const params = useParams()
  const router = useRouter()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [relatedPosts, setRelatedPosts] = useState([])

  // Fetch blog post details
  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await axios.get(`/api/blog/posts/${params.id}`)
        console.log(response.data);
        
        setPost(response.data)
        
        // Fetch related posts from the same category
        const relatedResponse = await axios.get('/api/blog/posts')
        const related = relatedResponse.data.posts
          .filter(p => p._id !== params.id && p.category === response.data.category)
          .slice(0, 3)
        setRelatedPosts(related)
      } catch (err) {
        setError('مقاله یافت نشد')
        showError('خطا', 'مقاله مورد نظر یافت نشد')
      }
      setLoading(false)
    }

    if (params.id) {
      fetchPost()
    }
  }, [params.id])

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      showSuccess('لینک کپی شد', 'لینک مقاله در کلیپ‌بورد کپی شد')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex flex-col items-center justify-center py-24">
          <ArrowPathIcon className="w-12 h-12 text-emerald-500 animate-spin mb-4" />
          <span className="text-lg text-emerald-600 font-bold">در حال بارگذاری...</span>
        </div>
        <Footer />
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex flex-col items-center justify-center py-24">
          <span className="text-6xl mb-4">😢</span>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            مقاله یافت نشد
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            مقاله مورد نظر شما وجود ندارد یا حذف شده است.
          </p>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative pb-16 pt-32 overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.08'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center text-white">

              {/* Category Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 dark:from-emerald-700 dark:via-teal-800 dark:to-cyan-800 px-5 py-2 rounded-full mb-6 shadow-xl border-2 border-white/40 dark:border-emerald-500/30 backdrop-blur-lg ">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white/80 dark:bg-gray-900/80 shadow-md">
                  <TagIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-300" />
                </span>
                <span className="text-base text-white tracking-wide drop-shadow-sm">
                  {post.category}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-6xl font-extrabold mb-6 moraba drop-shadow-lg">
                {post.title}
              </h1>

              {/* Excerpt */}
              {post.excerpt && (
                <p className="text-lg text-white/90 max-w-3xl mx-auto mb-8 font-light">
                  {post.excerpt}
                </p>
              )}

              {/* Meta Info */}
              <div className="flex flex-wrap items-center justify-center gap-6 text-white/80">
                <div className="flex items-center gap-2">
                  <UserIcon className="w-5 h-5" />
                  <span className="font-medium">{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5" />
                  <span>{formatDate(post.updatedAt)}</span>
                </div>
                {post.readTime && (
                  <div className="flex items-center gap-2">
                    <ClockIcon className="w-5 h-5" />
                    <span>{post.readTime}</span>
                  </div>
                )}
                <Button
                  onClick={handleShare}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-transparentborder border-white/30 text-white shadow backdrop-blur transition-all duration-150"
                  style={{
                    boxShadow: '0 2px 16px 0 rgba(16,185,129,0.15)',
                    borderWidth: '1.5px',
                  }}
                >
                  <ShareIcon className="w-4 h-4 ml-2" />
                  اشتراک‌گذاری
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-12 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Featured Image */}
              {post.imageUrl && (
                <div className="mb-8">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-lg"
                  />
                </div>
              )}

              {/* Article Content */}
              <Card className="border-0 overflow-hidden bg-white dark:bg-gray-900 transition-all duration-300">
                <CardContent className="p-6 md:p-10">
                  <div
                    className="text-base dark:text-gray-100"
                    style={{
                      background: "transparent",
                    }}
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                </CardContent>
              </Card>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-8 px-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    <span className="inline-flex items-center gap-2">
                      <TagIcon className="w-5 h-5 text-emerald-500" />
                      برچسب‌ها
                    </span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full text-sm font-medium"
                      >
                        # {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-12 bg-gray-50 dark:bg-gray-800">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-center mb-10">
                  <div className="inline-flex items-center gap-3 px-8 py-3 rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 dark:from-emerald-700 dark:via-teal-700 dark:to-cyan-700 shadow-lg">
                    <span className="text-xl font-extrabold text-white drop-shadow-lg tracking-tight moraba">
                      <span className="inline-block">🔗</span>
                      <span className="mx-2">مقالات مرتبط</span>
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <div className='relative'>
                      <Card
                        key={relatedPost._id}
                        className="overflow-hidden relative bg-gray-100 dark:bg-gray-900 border-0 rounded-[28px] shadow-[0_20px_60px_rgba(16,24,40,0.08)] hover:shadow-[0_24px_80px_rgba(16,24,40,0.12)] transition-all duration-500 inverted-radius !w-full group"
                      >
                        <div className="relative">
                          {/* Post Image */}
                          <div className="relative w-full h-44 md:h-60">
                            {relatedPost.imageUrl ? (
                              <img
                                src={relatedPost.imageUrl}
                                alt={relatedPost.title}
                                className="object-cover w-full h-full"
                                style={{
                                  borderTopLeftRadius: "28px",
                                  borderTopRightRadius: "28px"
                                }}
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center text-6xl">{relatedPost.emoji || "📝"}</div>
                            )}

                            {/* Rounded corners overlay */}
                            <div className="pointer-events-none absolute inset-0 rounded-[28px] rounded-b-none ring-1 ring-black/5" />

                            {/* Category badge at top-left */}
                            <span className="absolute top-4 left-4 z-10 inline-flex items-center rounded-full bg-emerald-500 px-3 py-1 text-xs font-bold text-white shadow">
                              <TagIcon className="w-4 h-4 text-white mr-1" />
                              {relatedPost.category}
                            </span>
                          </div>
                        </div>
                        <CardContent className="p-4 md:p-6 flex flex-col">
                          {/* Title */}
                          <h3 className="text-center text-md md:text-xl font-extrabold tracking-tight text-gray-900 dark:text-white mt-2 group-hover:text-primary transition-colors line-clamp-2">
                            <Link href={`/blog/${relatedPost._id}`}>{relatedPost.title}</Link>
                          </h3>
                          {/* Excerpt */}
                          <p className="my-5 text-center text-sm leading-7 text-gray-500 line-clamp-2">{relatedPost.excerpt}</p>
                          {/* Meta Info */}
                          <div className="flex items-center justify-between text-xs text-neutral-gray mt-2">
                            <div className="flex items-center justify-between w-full text-xs text-gray-500 dark:text-gray-400">
                              <div className="flex items-center gap-2">
                                <UserIcon className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                                <span className="font-medium">{relatedPost.author}</span>
                                <span className="mx-2 text-gray-300 dark:text-gray-600">|</span>
                                <CalendarIcon className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                                <span>{formatDate(relatedPost.updatedAt)}</span>
                              </div>
                            </div>
                          </div>
                          {/* Tags */}
                          <div className="flex flex-wrap gap-1 mt-5">
                            {relatedPost.tags && relatedPost.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-1 bg-transparent text-xs rounded-full border border-emerald-400 shadow text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/40 transition-all"
                              >
                                # {tag}
                              </span>
                            ))}
                            {relatedPost.readTime && (
                              <span className="flex items-center gap-1 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-full text-sm">
                                <ArrowPathIcon className="w-4 h-4" />
                                {relatedPost.readTime}
                              </span>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                      <div className="absolute left-2 bottom-0 lg:bottom-1 flex">
                        <Link
                          href={`/blog/${relatedPost._id}`}
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
              </div>
            </div>
          </section>
        )}

        {/* Back to Blog CTA */}
        <section className="py-12 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                از وبلاگ ما بیشتر بخوانید
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                مقالات و راهنماهای بیشتری برای بهبود تجربه کمپینگ شما
              </p>
              <Button
                onClick={() => router.push('/blog')}
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3"
              >
                <BookOpenIcon className="w-5 h-5 ml-2" />
                مشاهده همه مقالات
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <AlertDialogComponent />
    </div>
  )
}
