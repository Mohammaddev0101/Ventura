'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import axios from 'axios'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/badge'
import {
  UserIcon,
  ShoppingBagIcon,
  HeartIcon,
  TruckIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon
} from '@heroicons/react/24/outline'
import { formatPrice, formatDate } from '@/lib/utils'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog'

// --- Admin Panel Style Imports ---
import {
  LayoutDashboard,
  User2,
  ShoppingCart,
  Heart,
  Settings,
  LogOut,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
  Key,
  LockOpen,
  Repeat
} from 'lucide-react'

const SIDEBAR_ITEMS = [
  { key: 'dashboard', label: 'داشبورد', icon: <LayoutDashboard className="w-5 h-5" /> },
  { key: 'orders', label: 'سفارشات', icon: <ShoppingCart className="w-5 h-5" /> },
  { key: 'wishlist', label: 'علاقه‌مندی‌ها', icon: <Heart className="w-5 h-5" /> },
  { key: 'profile', label: 'پروفایل', icon: <User2 className="w-5 h-5" /> },
  { key: 'settings', label: 'تنظیمات', icon: <Settings className="w-5 h-5" /> },
]

export default function DashboardPage() {
  const { user, loading, logout } = useAuth()
  const router = useRouter()
  const [orders, setOrders] = useState([])
  const [wishlist, setWishlist] = useState([])
  const [profile, setProfile] = useState(null)
  const [ordersLoading, setOrdersLoading] = useState(false)
  const [wishlistLoading, setWishlistLoading] = useState(false)
  const [profileLoading, setProfileLoading] = useState(false)
  const [error, setError] = useState(null)

  // Modal state for profile edit
  const [editOpen, setEditOpen] = useState(false)
  const [editProfile, setEditProfile] = useState({
    name: '',
    email: '',
    phone: ''
  })
  const [editLoading, setEditLoading] = useState(false)
  const [editError, setEditError] = useState(null)
  const [editSuccess, setEditSuccess] = useState(false)

  // Sidebar state
  const [activeTab, setActiveTab] = useState('dashboard')

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  // Fetch orders from backend
  useEffect(() => {
    if (user) {
      setOrdersLoading(true)
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : ''
      axios.get(`/api/orders?userId=${user._id}`, {
        headers: {
          'Authorization': `Bearer ${token || ''}`,
        }
      })
        .then(res => setOrders(res.data.orders || []))
        .catch(err => setError(err.response?.data?.message || 'خطا در دریافت سفارشات'))
        .finally(() => setOrdersLoading(false))
    }
  }, [user])

  // Fetch wishlist from backend
  useEffect(() => {
    if (user) {
      setWishlistLoading(true)
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : ''
      axios.get('/api/users/wishlist', {
        headers: {
          'Authorization': `Bearer ${token || ''}`,
        }
      })
        .then(res => setWishlist(res.data.wishlist || []))
        .catch(err => setError(err.response?.data?.message || 'خطا در دریافت علاقه‌مندی‌ها'))
        .finally(() => setWishlistLoading(false))
    }
  }, [user])

  // Fetch profile from backend (if needed for more info)
  useEffect(() => {
    if (user) {
      setProfileLoading(true)
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : ''
      axios.get(`/api/users/${user._id}`, {
        headers: {
          'Authorization': `Bearer ${token || ''}`,
        }
      })
        .then(res => setProfile(res.data || null))
        .catch(err => setError(err.response?.data?.message || 'خطا در دریافت پروفایل'))
        .finally(() => setProfileLoading(false))
    }
  }, [user])

  // When opening edit modal, fill form with current profile data
  const handleOpenEdit = () => {
    setEditError(null)
    setEditSuccess(false)
    setEditProfile({
      name: (profile?.name || user?.name) ?? '',
      email: (profile?.email || user?.email) ?? '',
      phone: (profile?.phone || user?.phone) ?? ''
    })
    setEditOpen(true)
  }

  // Handle profile edit form change
  const handleEditChange = (e) => {
    setEditProfile({ ...editProfile, [e.target.name]: e.target.value })
  }

  // Handle profile update submit
  const handleEditSubmit = async (e) => {
    e.preventDefault()
    setEditLoading(true)
    setEditError(null)
    setEditSuccess(false)
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : ''
      const res = await axios.put(
        `/api/users/${user._id}`,
        {
          name: editProfile.name,
          email: editProfile.email,
          phone: editProfile.phone
        },
        {
          headers: {
            'Authorization': `Bearer ${token || ''}`,
          }
        }
      )
      setProfile(res.data)
      setEditSuccess(true)
      setTimeout(() => {
        setEditOpen(false)
        setEditSuccess(false)
      }, 1200)
    } catch (err) {
      setEditError(err.response?.data?.message || 'خطا در ویرایش پروفایل')
    } finally {
      setEditLoading(false)
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'shipped':
        return <Truck className="w-5 h-5 text-blue-500" />
      case 'processing':
        return <Clock className="w-5 h-5 text-yellow-500" />
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-500" />
      default:
        return <Clock className="w-5 h-5 text-gray-500" />
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

  if (loading || ordersLoading || wishlistLoading || profileLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex flex-1 items-center justify-center min-h-[60vh]">
          <div className="spinner"></div>
        </div>
        <Footer />
      </div>
    )
  }

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    const form = e.target;
    const currentPassword = form.currentPassword.value.trim();
    const newPassword = form.newPassword.value.trim();
    const confirmPassword = form.confirmPassword.value.trim();
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert('لطفا همه فیلدها را پر کنید.');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('رمز عبور جدید و تکرار آن یکسان نیستند.');
      return;
    }
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';
      await axios.put(
        `/api/users/${user._id}/password`,
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            'Authorization': `Bearer ${token || ''}`,
          }
        }
      );
      alert('رمز عبور با موفقیت تغییر کرد.');
      form.reset();
    } catch (err) {
      alert(
        err?.response?.data?.message ||
        'خطا در تغییر رمز عبور'
      );
    }
  }



if (!user) {
  return null
}

if (error) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex flex-1 items-center justify-center min-h-[60vh]">
        <div className="text-red-500">{error}</div>
      </div>
      <Footer />
    </div>
  )
}

// Use profile from backend if available, otherwise fallback to user context
const profileData = profile || user

// --- Admin Panel Layout ---
return (
  <div className="min-h-screen flex flex-col bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100" dir="rtl">
    {/* Profile Edit Modal (Admin Panel Style) */}
    <Dialog open={editOpen} onOpenChange={setEditOpen}>
      <DialogContent className="max-w-md w-full rounded-lg p-0 overflow-hidden bg-white dark:bg-gray-800">
        <form onSubmit={handleEditSubmit}>
          <DialogHeader className="border-b border-gray-200 dark:border-gray-700 px-6 py-4 bg-gray-50 dark:bg-gray-800">
            <DialogTitle className="text-lg font-bold flex items-center gap-2">
              <User2 className="w-6 h-6 text-green-600" />
              ویرایش پروفایل
            </DialogTitle>
          </DialogHeader>
          <div className="px-6 py-6 space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                نام و نام خانوادگی
              </label>
              <input
                name="name"
                type="text"
                value={editProfile.name}
                onChange={handleEditChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                required
                autoFocus
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                ایمیل
              </label>
              <input
                name="email"
                type="email"
                value={editProfile.email}
                onChange={handleEditChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                شماره تلفن
              </label>
              <input
                name="phone"
                type="text"
                value={editProfile.phone}
                onChange={handleEditChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                placeholder="اختیاری"
              />
            </div>
            {editError && (
              <div className="text-red-500 text-sm">{editError}</div>
            )}
            {editSuccess && (
              <div className="text-green-600 text-sm">پروفایل با موفقیت ویرایش شد.</div>
            )}
          </div>
          <DialogFooter className="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={editLoading} className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700">
                انصراف
              </Button>
            </DialogClose>
            <Button type="submit" loading={editLoading} className="bg-green-600 hover:bg-green-700 text-white">
              ذخیره تغییرات
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>

    <div className="flex flex-1 min-h-0">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-gray-50 dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 pt-16 pb-8 px-4 min-h-full">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-green-500 to-green-300 dark:from-green-600 dark:to-green-400 flex items-center justify-center shadow-lg mb-3">
            <User2 className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-xl font-extrabold text-green-600 dark:text-green-400 mb-1 tracking-tight">پنل کاربری</h2>
          <span className="text-sm text-gray-500 dark:text-gray-400">{profileData?.name || "کاربر عزیز"}</span>
        </div>
        <div className="flex flex-col gap-2">
          {SIDEBAR_ITEMS.map(item => (
            <button
              key={item.key}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg text-right transition-colors ${activeTab === item.key
                ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 font-bold'
                : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100'
                }`}
              onClick={() => setActiveTab(item.key)}
              type="button"
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            onClick={() => router.push('/')}
            type="button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
            <span> صفحه اصلی</span>
          </button>
        </div>

        <div className="mt-auto pt-8">
          <Button
            variant="destructive"
            className="w-full flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white"
            onClick={logout}
          >
            <LogOut className="w-4 h-4" />
            خروج
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 px-2 md:px-8 py-8 max-w-full">
        {/* Mobile Tabs */}
        <div
          className="md:hidden flex gap-2 fixed bottom-4 left-1/2 -translate-x-1/2 z-30
              bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-2xl px-3 py-2
              shadow-lg w-[95vw] max-w-md justify-center items-center"
          style={{ boxSizing: 'border-box' }}
        >
          {SIDEBAR_ITEMS.map(item => (
            <button
              key={item.key}
              className={`flex-1 flex flex-col items-center gap-1 px-2 py-2 rounded-lg text-xs transition-colors ${activeTab === item.key
                ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 font-bold'
                : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100'
                }`}
              onClick={() => setActiveTab(item.key)}
              type="button"
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                خوش آمدید، {profileData.name}
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                داشبورد کاربری شما در ونتورا
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Card 1: Total Orders */}
              <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm transition-colors">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg transition-colors">
                    <ShoppingCart className="w-6 h-6 text-green-600 dark:text-green-300" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{orders.length}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">کل سفارشات</p>
                  </div>
                </CardContent>
              </Card>
              {/* Card 2: Delivered Orders */}
              <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm transition-colors">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="p-2 bg-green-200 dark:bg-green-800 rounded-lg transition-colors">
                    <CheckCircle className="w-6 h-6 text-green-700 dark:text-green-300" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {orders.filter(o => o.status === 'delivered').length}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">تحویل شده</p>
                  </div>
                </CardContent>
              </Card>
              {/* Card 3: Wishlist */}
              <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm transition-colors">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg transition-colors">
                    <Heart className="w-6 h-6 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{wishlist.length}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">علاقه‌مندی‌ها</p>
                  </div>
                </CardContent>
              </Card>
              {/* Card 4: Shipped Orders */}
              <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm transition-colors">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg transition-colors">
                    <Truck className="w-6 h-6 text-blue-600 dark:text-blue-300" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {orders.filter(o => o.status === 'shipped').length}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">در حال ارسال</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm transition-colors">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-gray-100 moraba flex items-center gap-2">
                <ShoppingCart className="w-6 h-6 text-green-600" />
                سفارشات شما
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orders.length === 0 ? (
                  <div className="text-center text-gray-500 dark:text-gray-400 py-8">سفارشی یافت نشد.</div>
                ) : (
                  orders.map((order) => (
                    <div
                      key={order.id}
                      className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3 space-x-reverse">
                          {getStatusIcon(order.status)}
                          <div>
                            <p className="font-medium text-gray-900 dark:text-gray-100">سفارش #{order.id}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {formatDate(order.date)}
                            </p>
                          </div>
                        </div>
                        <Badge variant={getStatusVariant(order.status)}>
                          {getStatusText(order.status)}
                        </Badge>
                      </div>

                      <div className="space-y-2 mb-3">
                        {order.items && order.items.length > 0 ? (
                          order.items.map((item, index) => (
                            <div key={index} className="flex justify-between text-sm">
                              <span className="text-gray-700 dark:text-gray-200">{item.name} × {item.quantity}</span>
                              <span className="text-gray-900 dark:text-gray-100">{formatPrice(item.price)} تومان</span>
                            </div>
                          ))
                        ) : (
                          <div className="text-xs text-gray-500 dark:text-gray-400">آیتمی برای این سفارش ثبت نشده است.</div>
                        )}
                      </div>

                      <div className="flex justify-between items-center pt-3 border-t border-gray-200 dark:border-gray-700">
                        <span className="font-medium text-gray-900 dark:text-gray-100">
                          مجموع: {formatPrice(order.total)} تومان
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          جزئیات سفارش
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Wishlist Tab */}
        {activeTab === 'wishlist' && (
          <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm transition-colors">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-gray-100 moraba flex items-center gap-2">
                <Heart className="w-6 h-6 text-green-600" />
                علاقه‌مندی‌ها
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {wishlist.length === 0 ? (
                  <div className="text-center text-gray-500 dark:text-gray-400 py-8">آیتمی در علاقه‌مندی‌ها وجود ندارد.</div>
                ) : (
                  wishlist.map((item) => (
                    <div
                      key={item.id}
                      className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                            <Heart className="w-6 h-6 text-green-600 dark:text-green-400" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-gray-100">{item.name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{formatPrice(item.price)} تومان</p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          حذف
                        </Button>
                      </div>
                      <div className="flex justify-end">
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          افزودن به سبد خرید
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'profile' && (
          <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm transition-colors">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-gray-100 moraba flex items-center gap-2">
                <User2 className="w-6 h-6 text-green-600" />
                اطلاعات پروفایل
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 space-x-reverse mb-6">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <User2 className="w-10 h-10 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{profileData.name}</h3>
                  <p className="text-gray-500 dark:text-gray-400">{profileData.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    نام و نام خانوادگی
                  </label>
                  <p className="text-gray-500 dark:text-gray-400">{profileData.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    ایمیل
                  </label>
                  <p className="text-gray-500 dark:text-gray-400">{profileData.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    شماره تلفن
                  </label>
                  <p className="text-gray-500 dark:text-gray-400">{profileData.phone || 'وارد نشده'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    تاریخ عضویت
                  </label>
                  <p className="text-gray-500 dark:text-gray-400">
                    {profileData.createdAt ? formatDate(profileData.createdAt) : 'نامشخص'}
                  </p>
                </div>
              </div>
              <Button onClick={handleOpenEdit} className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2">
                <User2 className="w-5 h-5" />
                ویرایش پروفایل
              </Button>
            </CardContent>
          </Card>
        )}

        {activeTab === 'settings' && (
          <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm transition-colors">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-gray-100 moraba flex items-center gap-2">
                <Settings className="w-6 h-6 text-green-600" />
                تنظیمات
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">اعلان‌های ایمیل</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      دریافت اعلان‌ها از طریق ایمیل
                    </p>
                  </div>
                  <Button variant="outline" size="sm" type="button" className="border-gray-300 dark:border-gray-600 text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900 hover:bg-green-200 dark:hover:bg-green-800">
                    فعال
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">اعلان‌های SMS</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      دریافت اعلان‌ها از طریق پیامک
                    </p>
                  </div>
                  <Button variant="outline" size="sm" type="button" className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700">
                    غیرفعال
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">خبرنامه</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      دریافت آخرین اخبار و تخفیف‌ها
                    </p>
                  </div>
                  <Button variant="outline" size="sm" type="button" className="border-gray-300 dark:border-gray-600 text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900 hover:bg-green-200 dark:hover:bg-green-800">
                    فعال
                  </Button>
                </div>
              </div>
              <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                  {/* <Lock className="w-5 h-5 text-green-600" /> */}
                  تغییر رمز عبور
                </h4>
                <form
                  className="space-y-4"
                  onSubmit={handlePasswordChange}
                >
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2 flex items-center gap-1">
                      {/* <Key className="w-4 h-4 text-gray-400" /> */}
                      رمز عبور فعلی
                    </label>
                    <input
                      name="currentPassword"
                      type="password"
                      autoComplete="current-password"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2 flex items-center gap-1">
                      {/* <LockOpen className="w-4 h-4 text-gray-400" /> */}
                      رمز عبور جدید
                    </label>
                    <input
                      name="newPassword"
                      type="password"
                      autoComplete="new-password"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2 flex items-center gap-1">
                      {/* <Repeat className="w-4 h-4 text-gray-400" /> */}
                      تکرار رمز عبور جدید
                    </label>
                    <input
                      name="confirmPassword"
                      type="password"
                      autoComplete="new-password"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                  >
                    {/* <Lock className="w-4 h-4" /> */}
                    تغییر رمز عبور
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  </div>
)
}