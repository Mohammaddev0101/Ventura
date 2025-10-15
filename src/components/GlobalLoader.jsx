'use client'

import Image from 'next/image'

export default function GlobalLoader() {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm dark:bg-neutral-950/80"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div class="flex-col gap-4 w-full flex items-center justify-center">
        <div
          class="w-20 h-20 border-4 border-transparent text-green-400 text-4xl animate-spin flex items-center justify-center border-t-green-300 rounded-full"
        >
          <div
            class="w-16 h-16 border-4 border-transparent text-green-800 text-2xl animate-spin flex items-center justify-center border-t-green-900 rounded-full"
          ></div>
        </div>
      </div>

    </div>
  )
}


