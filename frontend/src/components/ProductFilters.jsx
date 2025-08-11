'use client'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent } from '@/components/ui/Card'
import axios from 'axios'

export default function ProductFilters({ filters, onFilterChange }) {
  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])

  useEffect(() => {
    fetchCategories()
    fetchBrands()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/categories')
      setCategories(response.data)
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const fetchBrands = async () => {
    // Mock brands data
    setBrands([
      'Coleman', 'North Face', 'Deuter', 'Jetboil', 'Fenix', 
      'Helinox', 'Bushnell', 'Oakley'
    ])
  }

  const sortOptions = [
    { value: '-createdAt', label: 'جدیدترین' },
    { value: 'createdAt', label: 'قدیمی‌ترین' },
    { value: 'price', label: 'ارزان‌ترین' },
    { value: '-price', label: 'گران‌ترین' },
    { value: '-rating.average', label: 'بهترین امتیاز' },
    { value: '-salesCount', label: 'پرفروش‌ترین' }
  ]

  const clearFilters = () => {
    onFilterChange('category', '')
    onFilterChange('brand', '')
    onFilterChange('minPrice', '')
    onFilterChange('maxPrice', '')
    onFilterChange('sort', '-createdAt')
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-text-dark dark:text-white mb-2">
              دسته‌بندی
            </label>
            <select
              value={filters.category}
              onChange={(e) => onFilterChange('category', e.target.value)}
              className="w-full h-12 px-4 border border-neutral-light rounded-lg bg-white dark:bg-neutral-gray/20 dark:border-neutral-gray focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">همه دسته‌ها</option>
              {categories.map((category) => (
                <option key={category._id} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Brand Filter */}
          <div>
            <label className="block text-sm font-medium text-text-dark dark:text-white mb-2">
              برند
            </label>
            <select
              value={filters.brand}
              onChange={(e) => onFilterChange('brand', e.target.value)}
              className="w-full h-12 px-4 border border-neutral-light rounded-lg bg-white dark:bg-neutral-gray/20 dark:border-neutral-gray focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">همه برندها</option>
              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium text-text-dark dark:text-white mb-2">
              محدوده قیمت
            </label>
            <div className="flex space-x-2 space-x-reverse">
              <Input
                type="number"
                placeholder="از"
                value={filters.minPrice}
                onChange={(e) => onFilterChange('minPrice', e.target.value)}
                className="h-12"
              />
              <Input
                type="number"
                placeholder="تا"
                value={filters.maxPrice}
                onChange={(e) => onFilterChange('maxPrice', e.target.value)}
                className="h-12"
              />
            </div>
          </div>

          {/* Sort */}
          <div>
            <label className="block text-sm font-medium text-text-dark dark:text-white mb-2">
              مرتب‌سازی
            </label>
            <select
              value={filters.sort}
              onChange={(e) => onFilterChange('sort', e.target.value)}
              className="w-full h-12 px-4 border border-neutral-light rounded-lg bg-white dark:bg-neutral-gray/20 dark:border-neutral-gray focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Clear Filters */}
        <div className="mt-4 flex justify-end">
          <Button variant="outline" onClick={clearFilters}>
            پاک کردن فیلترها
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}