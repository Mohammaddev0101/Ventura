'use client'
import React from 'react'

export default function PageHero({ title, subtitle, emoji }) {
  return (
    <section className="relative py-20 pt-36 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 overflow-hidden">
      <div className="absolute left-0 top-0 w-64 h-64 bg-white/10 dark:bg-white/5 rounded-full blur-3xl -z-10" />
      <div className="container mx-auto px-4 text-center">
        {emoji && (
          <div className="flex items-center justify-center w-24 h-24 rounded-2xl bg-white/20 mb-6 shadow-lg mx-auto text-5xl select-none">
            <span>{emoji}</span>
          </div>
        )}
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg md:text-2xl text-white/85 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  )
}


