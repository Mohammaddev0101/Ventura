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
  UsersIcon, 
  ShoppingBagIcon, 
  CubeIcon, 
  ChartBarIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon
} from '@heroicons/react/24/outline'
import { formatPrice, formatDate } from '@/lib/utils'

export default function AdminPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [stats, setStats] = useState({})
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [users, setUsers] = useState([])

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      router.push('/')
    }
  }, [user, loading, router])

  // Mock data for demonstration
  useEffect(() => {
    if (user && user.role === 'admin') {
      setStats({
        totalProducts: 25,
        totalOrders: 156,
        totalUsers: 89,
        totalRevenue: 45600000
      })

      setProducts([
        {
          id: 1,
          name: 'چادر کوهنوردی ۴ نفره',
          price: 1299000,
          stock: 15,
          category: 'چادر',
          status: 'active'
        },
        {
          id: 2,
          name: 'کوله پشتی ۶۰ لیتری',
          price: 899000,
          stock: 8,
          category: 'کوله پشتی',
          status: 'active'
        },
        {
          id: 3,
          name: 'کیسه خواب زمستانی',
          price: 649000,
          stock: 0,
          category: 'کیسه خواب',
          status: 'inactive'
        }
      ])

      setOrders([
        {
          id: 'VNT20241001',
          customer: 'علی احمدی',
          date: '2024-01-15',
          status: 'delivered',
          total: 1299000
        },
        {
          id: 'VNT20241002',
          customer: 'سارا محمدی',
          date: '2024-01-14',
          status: 'shipped',
          total: 899000
        },
        {
          id: 'VNT20241003',
          customer: 'رضا کریمی',
          date: '2024-01-13',
          status: 'processing',
          total: 649000
        }
      ])

      setUsers([
        {
          id: 1,
          name: 'علی احمدی',
          email: 'ali@example.com',
          role: 'user',
          joinDate: '2024-01-01',
          orders: 3
        },
        {
          id: 2,
          name: 'سارا محمدی',
          email: 'sara@example.com',
          role: 'user',
          joinDate: '2024-01-05',
          orders: 1
        },
        {
          id: 3,
          name: 'رضا کریمی',
          email: 'reza@example.com',
          role: 'user',
          joinDate: '2024-01-10',
          orders: 2
        }
      ])
    }
  }, [user])

  const getStatusVariant = (status) => {
    switch (status) {
      case 'active':
      case 'delivered':
        return 'default'
      case 'shipped':
        return 'secondary'
      case 'processing':
        return 'outline'
      case 'inactive':
      case 'cancelled':
        return 'destructive'
      default:
        return 'outline'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'active':
        return 'فعال'
      case 'inactive':
        return 'غیرفعال'
      case 'delivered':
        return 'تحویل شده'
      case 'shipped':
        return 'ارسال شده'
      case 'processing':
        return 'در حال پردازش'
      case 'cancelled':
        return 'لغو شده'
      default:
        return status
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

  if (!user || user.role !== 'admin') {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            پنل مدیریت ونتورا
          </h1>
          <p className="text-muted-foreground">
            مدیریت فروشگاه و محصولات
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 space-x-reverse">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                  <CubeIcon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.totalProducts}</p>
                  <p className="text-sm text-muted-foreground">کل محصولات</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 space-x-reverse">
                <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                  <ShoppingBagIcon className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.totalOrders}</p>
                  <p className="text-sm text-muted-foreground">کل سفارشات</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 space-x-reverse">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                  <UsersIcon className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.totalUsers}</p>
                  <p className="text-sm text-muted-foreground">کل کاربران</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 space-x-reverse">
                <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                  <ChartBarIcon className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {formatPrice(stats.totalRevenue)}
                  </p>
                  <p className="text-sm text-muted-foreground">کل فروش</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="products">محصولات</TabsTrigger>
            <TabsTrigger value="orders">سفارشات</TabsTrigger>
            <TabsTrigger value="users">کاربران</TabsTrigger>
            <TabsTrigger value="analytics">آمار</TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>مدیریت محصولات</CardTitle>
                  <Button>
                    <PlusIcon className="w-4 h-4 ml-2" />
                    افزودن محصول
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-right py-3 px-4 font-medium text-foreground">نام محصول</th>
                        <th className="text-right py-3 px-4 font-medium text-foreground">قیمت</th>
                        <th className="text-right py-3 px-4 font-medium text-foreground">موجودی</th>
                        <th className="text-right py-3 px-4 font-medium text-foreground">دسته‌بندی</th>
                        <th className="text-right py-3 px-4 font-medium text-foreground">وضعیت</th>
                        <th className="text-right py-3 px-4 font-medium text-foreground">عملیات</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product.id} className="border-b border-border">
                          <td className="py-3 px-4 text-foreground">{product.name}</td>
                          <td className="py-3 px-4 text-foreground">
                            {formatPrice(product.price)} تومان
                          </td>
                          <td className="py-3 px-4 text-foreground">{product.stock}</td>
                          <td className="py-3 px-4 text-muted-foreground">{product.category}</td>
                          <td className="py-3 px-4">
                            <Badge variant={getStatusVariant(product.status)}>
                              {getStatusText(product.status)}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2 space-x-reverse">
                              <Button variant="outline" size="sm">
                                <EyeIcon className="w-4 h-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <PencilIcon className="w-4 h-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <TrashIcon className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>مدیریت سفارشات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-right py-3 px-4 font-medium text-foreground">شماره سفارش</th>
                        <th className="text-right py-3 px-4 font-medium text-foreground">مشتری</th>
                        <th className="text-right py-3 px-4 font-medium text-foreground">تاریخ</th>
                        <th className="text-right py-3 px-4 font-medium text-foreground">مبلغ</th>
                        <th className="text-right py-3 px-4 font-medium text-foreground">وضعیت</th>
                        <th className="text-right py-3 px-4 font-medium text-foreground">عملیات</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.id} className="border-b border-border">
                          <td className="py-3 px-4 text-foreground font-medium">#{order.id}</td>
                          <td className="py-3 px-4 text-foreground">{order.customer}</td>
                          <td className="py-3 px-4 text-muted-foreground">
                            {formatDate(order.date)}
                          </td>
                          <td className="py-3 px-4 text-foreground">
                            {formatPrice(order.total)} تومان
                          </td>
                          <td className="py-3 px-4">
                            <Badge variant={getStatusVariant(order.status)}>
                              {getStatusText(order.status)}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2 space-x-reverse">
                              <Button variant="outline" size="sm">
                                <EyeIcon className="w-4 h-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <PencilIcon className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>مدیریت کاربران</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-right py-3 px-4 font-medium text-foreground">نام</th>
                        <th className="text-right py-3 px-4 font-medium text-foreground">ایمیل</th>
                        <th className="text-right py-3 px-4 font-medium text-foreground">نقش</th>
                        <th className="text-right py-3 px-4 font-medium text-foreground">تاریخ عضویت</th>
                        <th className="text-right py-3 px-4 font-medium text-foreground">سفارشات</th>
                        <th className="text-right py-3 px-4 font-medium text-foreground">عملیات</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id} className="border-b border-border">
                          <td className="py-3 px-4 text-foreground">{user.name}</td>
                          <td className="py-3 px-4 text-muted-foreground">{user.email}</td>
                          <td className="py-3 px-4">
                            <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                              {user.role === 'admin' ? 'ادمین' : 'کاربر'}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-muted-foreground">
                            {formatDate(user.joinDate)}
                          </td>
                          <td className="py-3 px-4 text-foreground">{user.orders}</td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2 space-x-reverse">
                              <Button variant="outline" size="sm">
                                <EyeIcon className="w-4 h-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <PencilIcon className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>فروش ماهانه</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">نمودار فروش ماهانه</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>محبوب‌ترین محصولات</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {products.slice(0, 3).map((product, index) => (
                      <div key={product.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-primary">
                              {index + 1}
                            </span>
                          </div>
                          <span className="text-foreground">{product.name}</span>
                        </div>
                        <span className="text-muted-foreground">
                          {Math.floor(Math.random() * 50) + 10} فروش
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>آمار کلی</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">میانگین سفارش:</span>
                      <span className="text-foreground font-medium">
                        {formatPrice(Math.floor(stats.totalRevenue / stats.totalOrders))} تومان
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">کاربران فعال:</span>
                      <span className="text-foreground font-medium">
                        {Math.floor(stats.totalUsers * 0.7)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">نرخ تبدیل:</span>
                      <span className="text-foreground font-medium">3.2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">رضایت مشتریان:</span>
                      <span className="text-foreground font-medium">4.8/5</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>فعالیت‌های اخیر</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-muted-foreground">
                        سفارش جدید از علی احمدی
                      </span>
                    </div>
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-muted-foreground">
                        محصول جدید اضافه شد
                      </span>
                    </div>
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm text-muted-foreground">
                        موجودی کم شده
                      </span>
                    </div>
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-sm text-muted-foreground">
                        کاربر جدید ثبت نام کرد
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  )
}