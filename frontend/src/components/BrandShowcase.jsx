'use client'

export default function BrandShowcase() {
  const brands = [
    { name: 'Jack Wolfskin', logo: 'JW' },
    { name: 'Coleman', logo: 'CO' },
    { name: 'The North Face', logo: 'TNF' },
    { name: 'Patagonia', logo: 'PAT' },
    { name: 'Mammut', logo: 'MAM' },
    { name: 'Salomon', logo: 'SAL' },
    { name: 'Deuter', logo: 'DEU' },
    { name: 'Osprey', logo: 'OSP' }
  ]

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Jack Wolfskin Featured Section */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-orange-100 to-orange-50 dark:from-orange-900/20 dark:to-orange-800/10 rounded-3xl p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Content */}
              <div className="space-y-6">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">JW</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      کوله‌های پشتی سری
                    </h3>
                    <p className="text-orange-500 font-semibold">JACK WOLFSKIN</p>
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300">
                  کوله‌های پشتی جک ولف‌اسکین با کیفیت بالا و طراحی ارگونومیک، 
                  همراه ایده‌آل شما در تمام ماجراجویی‌ها
                </p>

                <div className="flex items-center space-x-6 space-x-reverse">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">۲۰+</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">مدل متنوع</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">۵ سال</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">گارانتی</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">۴.۸</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">امتیاز کاربران</div>
                  </div>
                </div>

                <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                  مشاهده محصولات
                </button>
              </div>

              {/* Visual */}
              <div className="relative">
                <div className="w-full h-80 bg-gradient-to-br from-orange-100 to-green-100 dark:from-orange-900/20 dark:to-green-900/20 rounded-2xl flex items-center justify-center relative overflow-hidden">
                  {/* Backpack Illustration */}
                  <div className="relative z-10">
                    <svg width="200" height="240" viewBox="0 0 200 240" className="drop-shadow-lg">
                      {/* Main Body */}
                      <rect x="40" y="60" width="120" height="150" rx="20" fill="#FF6B35" stroke="#E55A2B" strokeWidth="3" />
                      
                      {/* Top Flap */}
                      <rect x="50" y="40" width="100" height="40" rx="15" fill="#FF8C42" stroke="#E55A2B" strokeWidth="2" />
                      
                      {/* Side Pockets */}
                      <ellipse cx="25" cy="120" rx="15" ry="30" fill="#FF8C42" stroke="#E55A2B" strokeWidth="2" />
                      <ellipse cx="175" cy="120" rx="15" ry="30" fill="#FF8C42" stroke="#E55A2B" strokeWidth="2" />
                      
                      {/* Straps */}
                      <rect x="60" y="220" width="12" height="20" rx="6" fill="#8B4513" />
                      <rect x="128" y="220" width="12" height="20" rx="6" fill="#8B4513" />
                      
                      {/* Details */}
                      <circle cx="100" cy="100" r="8" fill="#FFF" stroke="#E55A2B" strokeWidth="2" />
                      <rect x="70" y="130" width="60" height="4" rx="2" fill="#E55A2B" />
                      <rect x="80" y="150" width="40" height="4" rx="2" fill="#E55A2B" />
                      
                      {/* Logo */}
                      <text x="100" y="190" textAnchor="middle" className="fill-white font-bold text-sm">JW</text>
                    </svg>
                  </div>

                  {/* Background Elements */}
                  <div className="absolute top-4 right-4 w-16 h-16 bg-orange-300/30 rounded-full blur-xl"></div>
                  <div className="absolute bottom-4 left-4 w-20 h-20 bg-green-300/30 rounded-full blur-xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* All Brands Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            برندها
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            با بهترین برندهای دنیا همراه باشید
          </p>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 flex items-center justify-center hover:shadow-lg transition-all duration-300 cursor-pointer group"
            >
              <div className="text-center">
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mb-2 group-hover:bg-green-600 group-hover:text-white transition-colors">
                  <span className="font-bold text-sm">{brand.logo}</span>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-green-600 transition-colors">
                  {brand.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}