import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Categories from '@/components/Categories'
import FeaturedProducts from '@/components/FeaturedProducts'
import BrandShowcase from '@/components/BrandShowcase'
import PopularProducts from '@/components/PopularProducts'
import WeeklyDeals from '@/components/WeeklyDeals'
import Newsletter from '@/components/Newsletter'
import Footer from '@/components/Footer'
import BlogSection from '@/components/BlogSection'

  import Loading from '@/app/loading'


export const metadata = {
  title: 'ونتورا - فروشگاه تجهیزات کمپینگ و طبیعت‌گردی',
  description: 'بهترین تجهیزات کمپینگ، کوهنوردی و طبیعت‌گردی را از ونتورا بخرید. چادر، کوله پشتی، لوازم آشپزی و تجهیزات حرفه‌ای',
  keywords: 'کمپینگ, چادر, کوله پشتی, طبیعت گردی, کوهنوردی, تجهیزات سفر',
  openGraph: {
    title: 'ونتورا - فروشگاه تجهیزات کمپینگ',
    description: 'بهترین تجهیزات کمپینگ و طبیعت‌گردی',
    type: 'website',
    locale: 'fa_IR',
  },
}

export default function Home() {



  return (
    <main className="overflow-x-hidden">
      <Header />
      <Hero />
      <Categories />
      <FeaturedProducts />
      <WeeklyDeals />
      <PopularProducts />
      <BrandShowcase />
      <BlogSection />
      {/* <Newsletter /> */}
      <Footer />
    </main>
  )
}