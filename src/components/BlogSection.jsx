'use client'
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/Card";
import { TagIcon, UserIcon, CalendarIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import { formatDate } from '@/lib/utils'

const BlogSection = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("/api/blog/posts?limit=3")
      .then(res => {
        console.log(res.data.posts);
        setPosts(res.data.posts || [])
      })
      .catch(() => setPosts([]));
  }, []);

  return (
    <section className="py-16 bg-gradient-to-b bg-white dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-emerald-100/50 dark:bg-emerald-900/30 px-5 py-2 rounded-full mb-6 border border-emerald-200/50 dark:border-emerald-800/50">
            <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5-3.9 19.5m-2.1-19.5-3.9 19.5" />
              </svg>

              تازه‌های وبلاگ
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-gray-900 to-emerald-600 dark:from-white dark:to-emerald-400 bg-clip-text text-transparent mb-4 moraba">
            مقالات و راهنماها
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            جدیدترین مقالات آموزشی و بررسی محصولات کمپینگ و طبیعت‌گردی را بخوانید.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {posts.slice(0, 3).map((post) => (
            <div className='relative' key={post._id}>
              <Card
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
                        <span>{typeof formatDate === "function" ? formatDate(post.updatedAt) : post.updatedAt}</span>
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
          {posts.length === 0 && (
            <div className="col-span-3 text-center text-gray-500 dark:text-gray-400">هیچ پستی یافت نشد.</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;