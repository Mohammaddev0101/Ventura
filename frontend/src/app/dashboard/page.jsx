'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { 
  UserIcon, 
  ShoppingBagIcon, 
  HeartIcon, 
  CogIcon,
  TruckIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon
} from '@heroicons/react/24/outline'
import { formatPrice, formatDate } from '@/lib/utils'

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [orders, setOrders] = useState([])
  const [wishlist, setWishlist] = useState([])

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  // Mock data for demonstration
  useEffect(() => {
    if (user) {
      setOrders([
        {
          id: 'VNT20241001',
          date: '2024-01-15',
          status: 'delivered',
          total: 1299000,
          items: [
            { name: 'چادر کوهنوردی ۴ نفره', quantity: 1, price: 1299000 }
          ]
        },
        {
          id: 'VNT20241002',
          date: '2024-01-10',
          status: 'shipped',
          total: 899000,
          items: [
            { name: 'کوله پشتی ۶۰ لیتری', quantity: 1, price: 899000 }
          ]
        },
        {
          id: 'VNT20241003',
          date: '2024-01-05',
          status: 'processing',
          total: 649000,
          items: [
            { name: 'کیسه خواب زمستانی', quantity: 1, price: 649000 }
          ]
        }
      ])

      setWishlist([
        { id: 1, name: 'چراغ قوه LED قابل شارژ', price: 189000 },
        { id: 2, name: 'صندلی تاشو کمپینگ', price: 329000 },
        { id: 3, name: 'اجاق گاز پرتابل', price: 459000 }
      ])
    }
  }, [user])

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />
      case 'shipped':
        return <TruckIcon className="w-5 h-5 text-blue-500" />
      case 'processing':
        return <ClockIcon className="w-5 h-5 text-yellow-500" />
      case 'cancelled':
        return <XCircleIcon className="w-5 h-5 text-red-500" />
      default:
        return <ClockIcon className="w-5 h-5 text-gray-500" />
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'delivered':
        return 'تحویل داده شده'
      case 'shipped':
        return 'ارسال شده'
      case 'processing':
        return 'در حال پردازش'
      case 'cancelled':
        return 'لغو شده'
      default:
        return 'نامشخص'
    }
  }

  const getStatusVariant = (status) => {
    switch (status) {
      case 'delivered':
        return 'default'
      case 'shipped':
        return 'secondary'
      case 'processing':
        return 'outline'
      case 'cancelled':
        return 'destructive'
      default:
        return 'outline'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-center">
            <div className="spinner"></div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            خوش آمدید، {user.name}
          </h1>
          <p className="text-muted-foreground">
            پنل کاربری شما در ونتورا
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 space-x-reverse">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <ShoppingBagIcon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{orders.length}</p>
                  <p className="text-sm text-muted-foreground">کل سفارشات</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 space-x-reverse">
                <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                  <CheckCircleIcon className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {orders.filter(o => o.status === 'delivered').length}
                  </p>
                  <p className="text-sm text-muted-foreground">تحویل شده</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 space-x-reverse">
                <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
                  <HeartIcon className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{wishlist.length}</p>
                  <p className="text-sm text-muted-foreground">علاقه‌مندی‌ها</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 space-x-reverse">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                  <TruckIcon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {orders.filter(o => o.status === 'shipped').length}
                  </p>
                  <p className="text-sm text-muted-foreground">در حال ارسال</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="orders">سفارشات</TabsTrigger>
            <TabsTrigger value="wishlist">علاقه‌مندی‌ها</TabsTrigger>
            <TabsTrigger value="profile">پروفایل</TabsTrigger>
            <TabsTrigger value="settings">تنظیمات</TabsTrigger>
          </TabsList>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>سفارشات شما</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border border-border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3 space-x-reverse">
                          {getStatusIcon(order.status)}
                          <div>
                            <p className="font-medium text-foreground">سفارش #{order.id}</p>
                            <p className="text-sm text-muted-foreground">
                              {formatDate(order.date)}
                            </p>
                          </div>
                        </div>
                        <Badge variant={getStatusVariant(order.status)}>
                          {getStatusText(order.status)}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2 mb-3">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span>{item.name} × {item.quantity}</span>
                            <span>{formatPrice(item.price)} تومان</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex justify-between items-center pt-3 border-t border-border">
                        <span className="font-medium text-foreground">
                          مجموع: {formatPrice(order.total)} تومان
                        </span>
                        <Button variant="outline" size="sm">
                          جزئیات سفارش
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Wishlist Tab */}
          <TabsContent value="wishlist">
            <Card>
              <CardHeader>
                <CardTitle>علاقه‌مندی‌ها</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {wishlist.map((item) => (
                    <div key={item.id} className="border border-border rounded-lg p-4">
                      <div className="w-full h-32 bg-muted rounded-lg mb-3 flex items-center justify-center">
                        <span className="text-3xl">🏕️</span>
                      </div>
                      <h3 className="font-medium text-foreground mb-2">{item.name}</h3>
                      <p className="text-primary font-bold mb-3">
                        {formatPrice(item.price)} تومان
                      </p>
                      <div className="flex space-x-2 space-x-reverse">
                        <Button size="sm" className="flex-1">
                          افزودن به سبد
                        </Button>
                        <Button variant="outline" size="sm">
                          حذف
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>اطلاعات پروفایل</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                    <UserIcon className="w-10 h-10 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">{user.name}</h3>
                    <p className="text-muted-foreground">{user.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      نام و نام خانوادگی
                    </label>
                    <p className="text-muted-foreground">{user.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      ایمیل
                    </label>
                    <p className="text-muted-foreground">{user.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      شماره تلفن
                    </label>
                    <p className="text-muted-foreground">{user.phone || 'وارد نشده'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      تاریخ عضویت
                    </label>
                    <p className="text-muted-foreground">
                      {user.createdAt ? formatDate(user.createdAt) : 'نامشخص'}
                    </p>
                  </div>
                </div>

                <Button>ویرایش پروفایل</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>تنظیمات</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-foreground">اعلان‌های ایمیل</h4>
                      <p className="text-sm text-muted-foreground">
                        دریافت اعلان‌ها از طریق ایمیل
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      فعال
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-foreground">اعلان‌های SMS</h4>
                      <p className="text-sm text-muted-foreground">
                        دریافت اعلان‌ها از طریق پیامک
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      غیرفعال
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-foreground">خبرنامه</h4>
                      <p className="text-sm text-muted-foreground">
                        دریافت آخرین اخبار و تخفیف‌ها
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      فعال
                    </Button>
                  </div>
                </div>

                <div className="pt-6 border-t border-border">
                  <h4 className="font-medium text-foreground mb-4">تغییر رمز عبور</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        رمز عبور فعلی
                      </label>
                      <input
                        type="password"
                        className="w-full px-3 py-2 border border-border rounded-md bg-background"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        رمز عبور جدید
                      </label>
                      <input
                        type="password"
                        className="w-full px-3 py-2 border border-border rounded-md bg-background"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        تکرار رمز عبور جدید
                      </label>
                      <input
                        type="password"
                        className="w-full px-3 py-2 border border-border rounded-md bg-background"
                      />
                    </div>
                    <Button>تغییر رمز عبور</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  )
}