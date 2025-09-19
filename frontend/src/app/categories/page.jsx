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
  AdjustmentsHorizontalIcon,
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

  const mockCategories = [
    { id: 1, name: 'چادر و سرپناه', count: 45, icon: '🏕️', color: 'from-green-500 to-emerald-600' },
    { id: 2, name: 'کوله پشتی', count: 32, icon: '🎒', color: 'from-blue-500 to-cyan-600' },
    { id: 3, name: 'کیسه خواب', count: 28, icon: '🛏️', color: 'from-purple-500 to-pink-600' },
    { id: 4, name: 'تجهیزات آشپزی', count: 56, icon: '🍳', color: 'from-orange-500 to-red-600' },
    { id: 5, name: 'روشنایی', count: 24, icon: '🔦', color: 'from-yellow-500 to-orange-600' },
    { id: 6, name: 'لوازم جانبی', count: 38, icon: '🧰', color: 'from-gray-500 to-slate-600' },
    { id: 7, name: 'صندلی و میز', count: 19, icon: '🪑', color: 'from-indigo-500 to-blue-600' },
    { id: 8, name: 'ابزار و تجهیزات', count: 41, icon: '🔧', color: 'from-teal-500 to-green-600' }
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                دسته‌بندی محصولات
              </h1>
              <p className="text-xl text-green-100 mb-8">
                تجهیزات مورد نیاز خود را از میان بیش از ۳۰۰ محصول انتخاب کنید
              </p>
              <div className="relative max-w-md mx-auto">
                <Input
                  placeholder="جستجو در دسته‌بندی‌ها..."
                  className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/60"
                />
                <MagnifyingGlassIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
              </div>
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {categories.map((category) => (
                <Card 
                  key={category.id}
                  className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-0 overflow-hidden"
                  onClick={() => setSelectedCategory(selectedCategory === category.name ? '' : category.name)}
                >
                  <CardContent className="p-0">
                    <div className={`h-32 bg-gradient-to-br ${category.color} flex items-center justify-center relative overflow-hidden`}>
                      <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                        {category.icon}
                      </div>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-green-600 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {category.count} محصول
                      </p>
                      {selectedCategory === category.name && (
                        <div className="mt-2">
                          <div className="w-full h-1 bg-green-500 rounded-full"></div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Filters and Products */}
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Filters Sidebar */}
              <div className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                <Card className="sticky top-24">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">فیلترها</h3>
                      <Button variant="ghost" size="sm" onClick={() => {
                        setSelectedCategory('')
                        setSelectedBrands([])
                        setPriceRange([0, 5000000])
                      }}>
                        پاک کردن
                      </Button>
                    </div>

                    <div className="space-y-6">
                      {/* Price Range */}
                      <div>
                        <Label className="text-sm font-medium mb-3 block">محدوده قیمت</Label>
                        <Slider
                          value={priceRange}
                          onValueChange={setPriceRange}
                          max={5000000}
                          step={50000}
                          className="mb-3"
                        />
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>{priceRange[0].toLocaleString()} تومان</span>
                          <span>{priceRange[1].toLocaleString()} تومان</span>
                        </div>
                      </div>

                      <Separator />

                      {/* Brands */}
                      <div>
                        <Label className="text-sm font-medium mb-3 block">برند</Label>
                        <div className="space-y-3">
                          {brands.map((brand) => (
                            <div key={brand} className="flex items-center space-x-2 space-x-reverse">
                              <Checkbox
                                id={brand}
                                checked={selectedBrands.includes(brand)}
                                onCheckedChange={(checked) => handleBrandChange(brand, checked)}
                              />
                              <Label htmlFor={brand} className="text-sm cursor-pointer">
                                {brand}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      {/* Rating */}
                      <div>
                        <Label className="text-sm font-medium mb-3 block">امتیاز</Label>
                        <div className="space-y-2">
                          {[5, 4, 3, 2, 1].map((rating) => (
                            <div key={rating} className="flex items-center space-x-2 space-x-reverse">
                              <Checkbox id={`rating-${rating}`} />
                              <Label htmlFor={`rating-${rating}`} className="flex items-center cursor-pointer">
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <span
                                      key={i}
                                      className={`text-sm ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                    >
                                      ★
                                    </span>
                                  ))}
                                </div>
                                <span className="text-sm mr-2">و بالاتر</span>
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Products */}
              <div className="lg:col-span-3">
                {/* Toolbar */}
                <div className="flex items-center justify-between mb-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowFilters(!showFilters)}
                      className="lg:hidden"
                    >
                      <FunnelIcon className="w-4 h-4 ml-2" />
                      فیلترها
                    </Button>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {filteredProducts.length} محصول یافت شد
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="text-sm border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700"
                    >
                      <option value="newest">جدیدترین</option>
                      <option value="oldest">قدیمی‌ترین</option>
                      <option value="price-low">ارزان‌ترین</option>
                      <option value="price-high">گران‌ترین</option>
                      <option value="popular">محبوب‌ترین</option>
                    </select>
                    
                    <div className="flex border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
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
                      <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-4 animate-pulse">
                        <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-4"></div>
                        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                      </div>
                    ))}
                  </div>
                ) : filteredProducts.length > 0 ? (
                  <div className={`grid gap-6 ${
                    viewMode === 'grid' 
                      ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                      : 'grid-cols-1'
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
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}