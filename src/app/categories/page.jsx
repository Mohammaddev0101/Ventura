'use client'
import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  Squares2X2Icon,
  ListBulletIcon
} from '@heroicons/react/24/outline'

export default function CategoriesPage() {
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [priceRange, setPriceRange] = useState([0, 5000000])
  const [selectedBrands, setSelectedBrands] = useState([])
  const [sortBy, setSortBy] = useState('newest')
  const [viewMode, setViewMode] = useState('grid')
  const [showFilters, setShowFilters] = useState(false)

  // Remove color variables, use Tailwind classes directly
  const mockCategories = [
    { id: 1, name: 'چادر و سرپناه', count: 45, icon: '🏕️', bg: 'bg-green-100', border: 'border-green-500' },
    { id: 2, name: 'کوله پشتی', count: 32, icon: '🎒', bg: 'bg-blue-100', border: 'border-blue-500' },
    { id: 3, name: 'کیسه خواب', count: 28, icon: '🛏️', bg: 'bg-purple-100', border: 'border-purple-500' },
    { id: 4, name: 'تجهیزات آشپزی', count: 56, icon: '🍳', bg: 'bg-orange-100', border: 'border-orange-500' },
    { id: 5, name: 'روشنایی', count: 24, icon: '🔦', bg: 'bg-yellow-100', border: 'border-yellow-500' },
    { id: 6, name: 'لوازم جانبی', count: 38, icon: '🧰', bg: 'bg-gray-100', border: 'border-gray-400' },
    { id: 7, name: 'صندلی و میز', count: 19, icon: '🪑', bg: 'bg-indigo-100', border: 'border-indigo-500' },
    { id: 8, name: 'ابزار و تجهیزات', count: 41, icon: '🔧', bg: 'bg-teal-100', border: 'border-teal-500' }
  ]

  const mockProducts = [
    {
      id: 1,
      name: 'چادر کوهنوردی ۴ نفره',
      price: 1299000,
      originalPrice: 1599000,
      category: 'چادر و سرپناه',
      brand: 'Coleman',
      rating: { average: 4.8, count: 124 },
      image: 'https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg'
    },
    {
      id: 2,
      name: 'کوله پشتی ۶۰ لیتری',
      price: 899000,
      originalPrice: 1099000,
      category: 'کوله پشتی',
      brand: 'Deuter',
      rating: { average: 4.6, count: 89 },
      image: 'https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg'
    }
  ]

  const brands = ['Coleman', 'Deuter', 'North Face', 'Jetboil', 'Fenix', 'Helinox']

  useEffect(() => {
    setCategories(mockCategories)
    setProducts(mockProducts)
    setLoading(false)
  }, [])

  const handleBrandChange = (brand, checked) => {
    if (checked) {
      setSelectedBrands([...selectedBrands, brand])
    } else {
      setSelectedBrands(selectedBrands.filter(b => b !== brand))
    }
  }

  const filteredProducts = products.filter(product => {
    if (selectedCategory && product.category !== selectedCategory) return false
    if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) return false
    if (product.price < priceRange[0] || product.price > priceRange[1]) return false
    return true
  })

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pb-24 pt-32 overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 transition-colors duration-300">
          {/* Dark mode background overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.08'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center text-white dark:text-white">
              <div className="inline-flex items-center gap-2 bg-white/30 dark:bg-gray-800/60 backdrop-blur px-6 py-2 rounded-full mb-8 shadow-lg transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776" />
                </svg>

                <span className="text-md">دسته‌بندی محصولات</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold mb-6 moraba drop-shadow-lg dark:drop-shadow-[0_2px_24px_rgba(16,185,129,0.25)]">
                دسته‌بندی محصولات
              </h1>
              <p className="text-xl md:text-2xl text-white/90 dark:text-gray-200 max-w-2xl mx-auto mb-10 font-light">
                تجهیزات مورد نیاز خود را از میان بیش از ۳۰۰ محصول انتخاب کنید
              </p>
              <div className="relative max-w-md mx-auto">
                <Input
                  placeholder="جستجو در دسته‌بندی‌ها..."
                  className="h-12 bg-white/80 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-400 pr-12 shadow-lg"
                />
                <MagnifyingGlassIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-400" />
              </div>
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-16">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className={`
                    relative group cursor-pointer transition-all duration-300
                    ${selectedCategory === category.name
                      ? "scale-105 z-10 shadow-2xl"
                      : "hover:scale-105 hover:z-10"}
                  `}
                  onClick={() => setSelectedCategory(selectedCategory === category.name ? '' : category.name)}
                >
                  <div className={`
                    rounded-3xl overflow-hidden shadow-lg border-4
                    ${selectedCategory === category.name ? category.border + " bg-gradient-to-br from-emerald-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 border-primary" : "border-transparent bg-white dark:bg-gray-800"}
                    transition-all duration-300
                  `}>
                    <div className={`
                      flex flex-col items-center justify-center py-10 px-4
                      relative
                      ${category.bg} dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900
                    `}>
                      {/* Decorative Glow */}
                      <div className={`
                        absolute -top-8 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full
                        ${selectedCategory === category.name
                          ? "bg-gradient-to-tr from-orange-300/40 to-emerald-400/40 blur-2xl opacity-80"
                          : "bg-gradient-to-tr from-gray-200/30 to-gray-100/10 blur-xl opacity-40"}
                        z-0
                      `}></div>
                      {/* Icon */}
                      <span className={`
                        relative z-10 text-4xl mb-3
                        group-hover:scale-125 group-hover:rotate-6
                        transition-transform duration-300
                        ${selectedCategory === category.name ? "text-primary drop-shadow-lg" : ""}
                      `}>
                        {category.icon}
                      </span>
                      {/* Name */}
                      <h3 className={`
                        relative z-10 font-extrabold text-lg mb-1
                        bg-gradient-to-r ${selectedCategory === category.name
                          ? "from-orange-500 to-emerald-500 bg-clip-text text-transparent"
                          : "from-gray-900 to-emerald-600 dark:from-white dark:to-emerald-400 bg-clip-text text-transparent"}
                        transition-colors duration-300
                        moraba
                      `}>
                        {category.name}
                      </h3>
                      {/* Count */}
                      <p className="relative z-10 text-xs text-gray-500 dark:text-gray-400">{category.count} محصول</p>
                      {/* Animated underline */}
                      <div className={`
                        transition-all duration-300 mx-auto mt-4
                        ${selectedCategory === category.name
                          ? "w-12 h-2 rounded-full bg-gradient-to-r from-orange-400 to-emerald-400 shadow-lg"
                          : "w-6 h-1 rounded-full bg-gray-200 dark:bg-gray-700"}
                      `}></div>
                      {/* Floating badge */}
                      {selectedCategory === category.name && (
                        <div className="absolute top-3 left-3 bg-primary text-white text-xs px-3 py-1 rounded-full shadow-lg animate-bounce-once">
                          انتخاب شد!
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Filters and Products */}
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Filters Sidebar */}
              <aside className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                <Card className="sticky top-24 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">فیلترها</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-500 dark:text-gray-400"
                        onClick={() => {
                          setSelectedCategory('')
                          setSelectedBrands([])
                          setPriceRange([0, 5000000])
                        }}
                      >
                        پاک کردن
                      </Button>
                    </div>
                    <div className="space-y-6">
                      {/* Price Range */}
                      <div>
                        <Label className="text-sm font-medium mb-3 block text-gray-700 dark:text-gray-200">محدوده قیمت</Label>
                        <div className="mb-3">
                          <Slider
                            value={priceRange}
                            onValueChange={setPriceRange}
                            max={5000000}
                            step={50000}
                            className="w-full"
                          />
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                          <span>{priceRange[0].toLocaleString()} تومان</span>
                          <span>{priceRange[1].toLocaleString()} تومان</span>
                        </div>
                      </div>
                      <Separator />
                      {/* Brands */}
                      <div>
                        <Label className="text-sm font-medium mb-3 block text-gray-700 dark:text-gray-200">برند</Label>
                        <div className="space-y-2">
                          {brands.map((brand) => (
                            <div key={brand} className="flex items-center gap-2">
                              <Checkbox
                                id={brand}
                                checked={selectedBrands.includes(brand)}
                                onCheckedChange={(checked) => handleBrandChange(brand, checked)}
                              />
                              <Label htmlFor={brand} className="text-sm cursor-pointer text-gray-700 dark:text-gray-200">
                                {brand}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                      <Separator />
                      {/* Rating */}
                      <div>
                        <Label className="text-sm font-medium mb-3 block text-gray-700 dark:text-gray-200">امتیاز</Label>
                        <div className="space-y-2">
                          {[5, 4, 3, 2, 1].map((rating) => (
                            <div key={rating} className="flex items-center gap-2">
                              <Checkbox id={`rating-${rating}`} />
                              <Label htmlFor={`rating-${rating}`} className="flex items-center cursor-pointer text-gray-700 dark:text-gray-200">
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <span
                                      key={i}
                                      className={`text-sm ${i < rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                                    >
                                      ★
                                    </span>
                                  ))}
                                </div>
                                <span className="text-xs mr-2">و بالاتر</span>
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </aside>

              {/* Products */}
              <section className="lg:col-span-3">
                {/* Toolbar */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-lg shadow-sm">
                  <div className="flex items-center gap-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowFilters(!showFilters)}
                      className="lg:hidden text-gray-500 dark:text-gray-400"
                    >
                      <FunnelIcon className="w-4 h-4 ml-2" />
                      فیلترها
                    </Button>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {filteredProducts.length} محصول یافت شد
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                    >
                      <option value="newest">جدیدترین</option>
                      <option value="oldest">قدیمی‌ترین</option>
                      <option value="price-low">ارزان‌ترین</option>
                      <option value="price-high">گران‌ترین</option>
                      <option value="popular">محبوب‌ترین</option>
                    </select>
                    <div className="flex border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                      <Button
                        variant={viewMode === 'grid' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setViewMode('grid')}
                        className="rounded-none"
                      >
                        <Squares2X2Icon className="w-4 h-4" />
                      </Button>
                      <Button
                        variant={viewMode === 'list' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setViewMode('list')}
                        className="rounded-none"
                      >
                        <ListBulletIcon className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Products Grid */}
                {loading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 animate-pulse">
                        <div className="w-full h-44 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-4"></div>
                        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                      </div>
                    ))}
                  </div>
                ) : filteredProducts.length > 0 ? (
                  <div className={`grid gap-6 ${viewMode === 'grid'
                      ? 'grid-cols-2 lg:grid-cols-3'
                      : 'grid-cols-1 md:grid-cols-2'
                    }`}>
                    {filteredProducts.map((product) => (
                      <ProductCard key={product.id} product={product} viewMode={viewMode} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      محصولی یافت نشد
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      لطفاً فیلترهای خود را تغییر دهید
                    </p>
                    <Button onClick={() => {
                      setSelectedCategory('')
                      setSelectedBrands([])
                      setPriceRange([0, 5000000])
                    }}>
                      پاک کردن فیلترها
                    </Button>
                  </div>
                )}
              </section>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}