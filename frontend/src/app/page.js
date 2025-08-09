import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Categories from '@/components/Categories'
import FeaturedProducts from '@/components/FeaturedProducts'
import BrandShowcase from '@/components/BrandShowcase'
import PopularProducts from '@/components/PopularProducts'
import Newsletter from '@/components/Newsletter'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Categories />
      <FeaturedProducts />
      <BrandShowcase />
      <PopularProducts />
      <Newsletter />
      <Footer />
    </main>
  )
}