'use client'
import { useState, useEffect, useRef } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import axios from 'axios'
import { Badge } from '@/components/ui/badge'
import { formatPrice, formatDate } from '@/lib/utils'
import { useTheme } from '@/components/ThemeProvider';
import {
  UsersIcon,
  ShoppingBagIcon,
  CubeIcon,
  ChartBarIcon,
  PhoneIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  ArrowPathIcon,
  EnvelopeIcon,
  ClipboardDocumentListIcon,
  HomeIcon,
  ArrowRightOnRectangleIcon,
  ChatBubbleLeftRightIcon,
  TagIcon
} from '@heroicons/react/24/outline'
import { useAlertDialog } from '@/components/ui/AlertDialog';

const adminTabs = [
  { value: 'categories', label: 'دسته‌بندی‌ها', icon: 'CubeIcon' },
  { value: 'contactmessages', label: 'پیام‌های تماس', icon: 'PhoneIcon' },
  { value: 'newslettersubscribers', label: 'خبرنامه', icon: 'EnvelopeIcon' },
  { value: 'blogposts', label: 'پست‌های وبلاگ', icon: 'PencilIcon' },
  { value: 'products', label: 'محصولات', icon: 'ShoppingBagIcon' },
  { value: 'orders', label: 'سفارشات', icon: 'ClipboardDocumentListIcon' },
  { value: 'users', label: 'کاربران', icon: 'UsersIcon' },
  { value: 'analytics', label: 'آمار', icon: 'ChartBarIcon' }
];

export default function AdminPage() {
  const { user, loading, logout } = useAuth()
  const router = useRouter()
  const { showSuccess, showError, showConfirm, AlertDialogComponent } = useAlertDialog()
  const [stats, setStats] = useState({})
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [users, setUsers] = useState([])
  const [categories, setCategories] = useState([])
  const [contactMessages, setContactMessages] = useState([])
  const [newsletterSubscribers, setNewsletterSubscribers] = useState([])
  const [blogPosts, setBlogPosts] = useState([])

  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedBlogPost, setSelectedBlogPost] = useState(null)

  const [showProductModal, setShowProductModal] = useState(false)
  const [showOrderModal, setShowOrderModal] = useState(false)
  const [showUserModal, setShowUserModal] = useState(false)
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [showBlogPostModal, setShowBlogPostModal] = useState(false)
  const [openContactMsg, setOpenContactMsg] = useState(false)


  const [refresh, setRefresh] = useState(false)

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [closeSidebar, setCloseSidebar] = useState(true);
  const [activeTab, setActiveTab] = useState("products");

  const { theme, toggleTheme } = useTheme();




  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      router.push('/')
    }
  }, [user, loading, router])

  const getToken = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token')
    }
    return null
  }

  useEffect(() => {
    const fetchStats = async () => {
      const token = getToken()
      if (user && user.role === 'admin' && token) {
        try {
          const res = await axios.get('/api/admin/stats', {
            headers: { Authorization: `Bearer ${token}` }
          })
          setStats(res.data.stats || {})
        } catch {
          setStats({})
        }
      }
    }
    fetchStats()
  }, [user, refresh])

  useEffect(() => {
    const fetchProducts = async () => {
      const token = getToken()
      if (user && user.role === 'admin' && token) {
        try {
          const res = await axios.get('/api/products', {
            headers: { Authorization: `Bearer ${token}` }
          })
          setProducts(res.data.products || [])
        } catch {
          setProducts([])
        }
      }
    }
    fetchProducts()
  }, [user, refresh])

  useEffect(() => {
    const fetchOrders = async () => {
      const token = getToken()
      if (user && user.role === 'admin' && token) {
        try {
          const res = await axios.get('/api/orders', {
            headers: { Authorization: `Bearer ${token}` }
          })
          setOrders(res.data)
        } catch {
          setOrders([])
        }
      }
    }
    fetchOrders()
  }, [user, refresh])

  useEffect(() => {
    const fetchUsers = async () => {
      const token = getToken()
      if (user && user.role === 'admin' && token) {
        try {
          const res = await axios.get('/api/users', {
            headers: { Authorization: `Bearer ${token}` }
          })

          setUsers(res.data)
        } catch {
          setUsers([])
        }
      }
    }
    fetchUsers()
  }, [user, refresh])

  useEffect(() => {
    const fetchCategories = async () => {
      const token = getToken()
      if (user && user.role === 'admin' && token) {
        try {
          const res = await axios.get('/api/categories', {
            headers: { Authorization: `Bearer ${token}` }
          })

          setCategories(res.data)
        } catch {
          setCategories([])
        }
      }
    }
    fetchCategories()
  }, [user, refresh])

  useEffect(() => {
    const fetchContactMessages = async () => {
      const token = getToken()
      if (user && user.role === 'admin' && token) {
        try {
          const res = await axios.get('/api/contact', {
            headers: { Authorization: `Bearer ${token}` }
          })

          setContactMessages(res.data.messages)
        } catch {
          setContactMessages([])
        }
      }
    }
    fetchContactMessages()
  }, [user, refresh])

  useEffect(() => {
    const fetchNewsletterSubscribers = async () => {
      const token = getToken()
      if (user && user.role === 'admin' && token) {
        try {
          const res = await axios.get('/api/newsletter', {
            headers: { Authorization: `Bearer ${token}` }
          })

          setNewsletterSubscribers(res.data.subscribers)
        } catch {
          setNewsletterSubscribers([])
        }
      }
    }
    fetchNewsletterSubscribers()
  }, [user, refresh])

  useEffect(() => {
    const fetchBlogPosts = async () => {
      const token = getToken()
      if (user && user.role === 'admin' && token) {
        try {
          const res = await axios.get('/api/blog/posts', {
            headers: { Authorization: `Bearer ${token}` }
          })

          setBlogPosts(res.data.posts)
        } catch {
          setBlogPosts([])
        }
      }
    }
    fetchBlogPosts()
  }, [user, refresh])

  // CRUD handlers for products
  const handleAddProduct = () => {
    setSelectedProduct(null)
    setShowProductModal(true)
  }
  const handleEditProduct = (product) => {
    setSelectedProduct(product)
    setShowProductModal(true)
  }
  const handleDeleteProduct = async (id) => {
    if (window.confirm('آیا از حذف محصول مطمئن هستید؟')) {
      const token = getToken()
      await axios.delete(`/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setRefresh(r => !r)
    }
  }
  const handleViewProduct = (product) => {
    setSelectedProduct(product)
    setShowProductModal(true)
  }

  // CRUD handlers for categories
  const handleAddCategory = () => {
    setSelectedCategory(null)
    setShowCategoryModal(true)
  }
  const handleEditCategory = (category) => {
    setSelectedCategory(category)
    setShowCategoryModal(true)
  }
  const handleDeleteCategory = async (id) => {
    showConfirm(
      "حذف دسته‌بندی",
      "آیا از حذف دسته‌بندی مطمئن هستید؟",
      async () => {
        const token = getToken()
        await axios.delete(`/api/categories/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setRefresh(r => !r)
        showSuccess("حذف شد!", "دسته‌بندی با موفقیت حذف شد.")
      }
    )
  }

  // CRUD handlers for blogposts
  const handleAddBlogPost = () => {
    setSelectedBlogPost(null)
    setShowBlogPostModal(true)
  }
  const handleEditBlogPost = (post) => {
    setSelectedBlogPost(post)
    setShowBlogPostModal(true)
  }
  const handleDeleteBlogPost = async (id) => {
    showConfirm(
      "حذف پست وبلاگ",
      "آیا از حذف پست مطمئن هستید؟",
      async () => {
        const token = getToken()
        await axios.delete(`/api/blog/posts/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setRefresh(r => !r)
        showSuccess("حذف شد!", "پست وبلاگ با موفقیت حذف شد.")
      }
    )
  }

  // CRUD handlers for orders
  const handleEditOrder = (order) => {
    setSelectedOrder(order)
    setShowOrderModal(true)
  }
  const handleViewOrder = (order) => {
    setSelectedOrder(order)
    setShowOrderModal(true)
  }

  // CRUD handlers for users
  const handleEditUser = (user) => {
    setSelectedUser(user)
    setShowUserModal(true)
    setRefresh(r => !r)
  }
  const handleViewUser = (user) => {
    setSelectedUser(user)
    setShowUserModal(true)
  }

  // CRUD handler for deleting users
  const handleDeleteUser = async (id) => {
    showConfirm(
      "حذف کاربر",
      "آیا از حذف این کاربر مطمئن هستید؟",
      async () => {
        const token = getToken()
        try {
          await axios.delete(`/api/users/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
          })
          setRefresh(r => !r)
          showSuccess("حذف شد!", "کاربر با موفقیت حذف شد.")
        } catch (err) {
          showError("خطا", "خطا در حذف کاربر")
        }
      }
    )
  }

  // CRUD handler for deleting contact messages
  const handleDeleteContactMessage = async (id) => {
    showConfirm(
      "حذف پیام",
      "آیا از حذف این پیام مطمئن هستید؟",
      async () => {
        const token = getToken()
        try {
          await axios.delete(`/api/contact/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
          })
          setRefresh(r => !r)
          showSuccess("حذف شد!", "پیام با موفقیت حذف شد.")
        } catch (err) {
          showError("خطا", "خطا در حذف پیام")
        }
      }
    )
  }

  // Seed sample data into the database by calling /api/seed endpoint
  const handleSeedData = async () => {
    const token = getToken();
    showConfirm(
      "قرار دادن داده نمونه",
      "آیا مطمئن هستید که می‌خواهید داده‌های نمونه را اضافه کنید؟ این کار می‌تواند داده‌های فعلی را پاک کند!",
      async () => {
        try {
          await axios.post(
            '/api/seed/30?clear=true',
            {},
            {
              headers: { Authorization: `Bearer ${token}` }
            }
          );
          setRefresh(r => !r);
          showSuccess("عملیات موفق", "داده‌های نمونه با موفقیت اضافه شد!");
        } catch (err) {
          showError("خطا", err?.response?.data?.message || "خطا در افزودن داده نمونه");
        }
      }
    );
  };

  // Status helpers
  const getStatusVariant = (status) => {
    switch (status) {
      case 'active':
      case 'delivered':
        return 'success'
      case 'shipped':
        return 'info'
      case 'processing':
        return 'warning'
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
      <div className="min-h-screen bg-gradient-to-tr from-primary/10 to-background" dir="rtl">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!user || user.role !== 'admin') {
    return null
  }

  // Helper to render category name safely
  const renderCategory = (category) => {
    if (!category) return '-'
    if (typeof category === 'string') return category
    if (typeof category === 'object' && category.name) return category.name
    return '-'
  }

  // --- TABS CONTENTS (REVERSED ORDER) ---
  const tabsContent = [
    // Analytics Tab
    <TabsContent value="analytics" key="analytics">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        <Card className="shadow-lg border-0 bg-gradient-to-br from-green-100 to-green-200 dark:from-gray-900 dark:to-gray-800">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-green-200 dark:bg-gray-800 rounded-xl">
              <CubeIcon className="w-7 h-7 text-green-700 dark:text-green-300" />
            </div>
            <div>
              <p className="text-3xl font-bold text-green-800 dark:text-green-300">{stats.totalProducts ?? '-'}</p>
              <p className="text-base text-green-900/70 dark:text-green-200">کل محصولات</p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-lg border-0 bg-gradient-to-br from-green-200 to-green-300 dark:from-gray-900 dark:to-gray-800">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-green-300 dark:bg-gray-800 rounded-xl">
              <ShoppingBagIcon className="w-7 h-7 text-green-800 dark:text-green-300" />
            </div>
            <div>
              <p className="text-3xl font-bold text-green-900 dark:text-green-200">{stats.totalOrders ?? '-'}</p>
              <p className="text-base text-green-900/70 dark:text-green-200">کل سفارشات</p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-900 dark:to-gray-800">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-green-100 dark:bg-gray-800 rounded-xl">
              <UsersIcon className="w-7 h-7 text-green-600 dark:text-green-300" />
            </div>
            <div>
              <p className="text-3xl font-bold text-green-700 dark:text-green-300">{stats.totalUsers ?? '-'}</p>
              <p className="text-base text-green-900/70 dark:text-green-200">کل کاربران</p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-lg border-0 bg-gradient-to-br from-green-300 to-green-400 dark:from-gray-900 dark:to-gray-800">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-green-400 dark:bg-gray-800 rounded-xl">
              <ChartBarIcon className="w-7 h-7 text-green-900 dark:text-green-300" />
            </div>
            <div>
              <p className="text-3xl font-bold text-green-900 dark:text-green-200">
                {stats.totalRevenue ? formatPrice(stats.totalRevenue) : '-'}
              </p>
              <p className="text-base text-green-900/70 dark:text-green-200">کل فروش</p>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-md border-0 bg-white dark:bg-gray-900">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-green-700 dark:text-green-200">فروش ماهانه</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gradient-to-br from-green-100 to-green-50 dark:from-gray-900 dark:to-gray-800 rounded-lg flex items-center justify-center">
              {/* TODO: Replace with real chart */}
              <p className="text-gray-500 dark:text-gray-400">نمودار فروش ماهانه (در حال توسعه)</p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-md border-0 bg-white dark:bg-gray-900">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-green-700 dark:text-green-200">محبوب‌ترین محصولات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {products.slice(0, 3).map((product, index) => (
                <div key={product.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-green-700 dark:text-green-300">{index + 1}</span>
                    </div>
                    <span className="text-gray-900 dark:text-gray-100 font-medium">{product.name}</span>
                  </div>
                  <span className="text-gray-500 dark:text-gray-400">
                    {Math.floor(Math.random() * 50) + 10} فروش
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-md border-0 bg-white dark:bg-gray-900">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-green-700 dark:text-green-200">آمار کلی</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">میانگین سفارش:</span>
                <span className="text-gray-900 dark:text-gray-100 font-bold">
                  {stats.totalRevenue && stats.totalOrders
                    ? formatPrice(Math.floor(stats.totalRevenue / stats.totalOrders))
                    : '-'} تومان
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">کاربران فعال:</span>
                <span className="text-gray-900 dark:text-gray-100 font-bold">
                  {stats.totalUsers ? Math.floor(stats.totalUsers * 0.7) : '-'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">نرخ تبدیل:</span>
                <span className="text-gray-900 dark:text-gray-100 font-bold">3.2%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">رضایت مشتریان:</span>
                <span className="text-gray-900 dark:text-gray-100 font-bold">4.8/5</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-md border-0 bg-white dark:bg-gray-900">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-green-700 dark:text-green-200">فعالیت‌های اخیر</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full"></div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  سفارش جدید از علی احمدی
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-400 dark:bg-green-300 rounded-full"></div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  محصول جدید اضافه شد
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-300 dark:bg-green-200 rounded-full"></div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  موجودی کم شده
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-700 dark:bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  کاربر جدید ثبت نام کرد
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </TabsContent>,

    // Users Tab
    <TabsContent value="users" key="users">
      <Card className="shadow-md border-0 bg-white dark:bg-gray-800">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <UsersIcon className="w-7 h-7 text-green-700 dark:text-green-200" />
            <CardTitle className="text-xl font-bold text-green-700 dark:text-green-200 moraba">مدیریت کاربران</CardTitle>
          </div>
          <div className="flex items-center gap-1 bg-green-100 dark:bg-green-900/40 px-3 py-1 rounded-lg">
            <span className="text-green-700 dark:text-green-200 text-lg">{users.length}</span>
            <span className="text-green-700 dark:text-green-200 text-sm">کاربر</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <table className="w-full text-right">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800 bg-green-50 dark:bg-green-800/40">
                  <th className="py-3 px-4 text-green-700 dark:text-green-200">نام</th>
                  <th className="py-3 px-4 text-green-700 dark:text-green-200">ایمیل</th>
                  <th className="py-3 px-4 text-green-700 dark:text-green-200">نقش</th>
                  <th className="py-3 px-4 text-green-700 dark:text-green-200">تاریخ عضویت</th>
                  <th className="py-3 px-4 text-green-700 dark:text-green-200">شماره تلفن</th>
                  <th className="py-3 px-4 text-green-700 dark:text-green-200">آدرس</th>
                  <th className="py-3 px-4 text-green-700 dark:text-green-200">عملیات</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-6 text-center text-gray-400 dark:text-gray-500">کاربری یافت نشد.</td>
                  </tr>
                )}
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-gray-200 dark:border-gray-800 hover:bg-green-50 dark:hover:bg-green-900/20 transition"
                  >
                    <td className="py-3 px-4 text-gray-900 dark:text-gray-100">{user.name}</td>
                    <td className="py-3 px-4 text-gray-500 dark:text-gray-400">{user.email}</td>
                    <td className="py-3 px-4">
                      <Badge variant={user.role === 'admin' ? 'success' : 'info'}>
                        {user.role === 'admin' ? 'ادمین' : 'کاربر'}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-gray-500 dark:text-gray-400">
                      {new Date(user.createdAt).toLocaleDateString('fa-IR')}
                    </td>
                    <td className="py-3 px-4 text-gray-500 dark:text-gray-400">{user.phone}</td>
                    <td className="py-3 px-4 text-gray-500 dark:text-gray-400">
                      {user.address && typeof user.address === 'object'
                        ? [
                          user.address.street,
                          user.address.city,
                          user.address.state,
                          user.address.zipCode,
                          user.address.country
                        ].filter(Boolean).join('، ')
                        : user.address || '-'}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2 justify-start">
                        <Button variant="ghost" size="icon" onClick={() => handleEditUser(user)} title="ویرایش">
                          <PencilIcon className="w-5 h-5 text-green-600 dark:text-green-300" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteUser(user.id)} title="حذف">
                          <TrashIcon className="w-5 h-5 text-red-500 dark:text-red-400" />
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
      {showUserModal && (
        <UserModal
          user={selectedUser}
          onClose={() => setShowUserModal(false)}
          onSaved={() => { setShowUserModal(false); setRefresh(r => !r) }}
        />
      )}
    </TabsContent>,

    // Orders Tab
    <TabsContent value="orders" key="orders">
      <Card className="shadow-md border-0 bg-white dark:bg-gray-800">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <ClipboardDocumentListIcon className="w-7 h-7 text-green-700 dark:text-green-200" />
            <CardTitle className="text-xl font-bold text-green-700 dark:text-green-200 moraba">مدیریت سفارشات</CardTitle>
          </div>
          <div className="flex items-center gap-1 bg-green-100 dark:bg-green-900/40 px-3 py-1 rounded-lg">
            <span className="text-green-700 dark:text-green-200 text-lg">{orders.length}</span>
            <span className="text-green-700 dark:text-green-200 text-sm">سفارش</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <table className="w-full text-right">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800 bg-green-50 dark:bg-green-800/40">
                  <th className="py-3 px-4 text-green-700 dark:text-green-200">شماره سفارش</th>
                  <th className="py-3 px-4 text-green-700 dark:text-green-200">مشتری</th>
                  <th className="py-3 px-4 text-green-700 dark:text-green-200">تاریخ</th>
                  <th className="py-3 px-4 text-green-700 dark:text-green-200">مبلغ</th>
                  <th className="py-3 px-4 text-green-700 dark:text-green-200">وضعیت</th>
                  <th className="py-3 px-4 text-green-700 dark:text-green-200">عملیات</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-6 text-center text-gray-400 dark:text-gray-500">سفارشی یافت نشد.</td>
                  </tr>
                )}
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-gray-200 dark:border-gray-800 hover:bg-green-50 dark:hover:bg-green-900/20 transition"
                  >
                    <td className="py-3 px-4 font-medium text-gray-900 dark:text-gray-100">#{order.id}</td>
                    <td className="py-3 px-4 text-gray-900 dark:text-gray-100">{order.customer}</td>
                    <td className="py-3 px-4 text-gray-500 dark:text-gray-400">{order.createdAt ? formatDate(order.createdAt) : '-'}</td>
                    <td className="py-3 px-4 text-gray-900 dark:text-gray-100">{formatPrice(order.total)} تومان</td>
                    <td className="py-3 px-4">
                      <Badge variant={getStatusVariant(order.status)}>
                        {getStatusText(order.status)}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2 justify-start">
                        <Button variant="ghost" size="icon" onClick={() => handleViewOrder(order)} title="مشاهده">
                          <EyeIcon className="w-5 h-5 text-green-700 dark:text-green-200" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleEditOrder(order)} title="ویرایش">
                          <PencilIcon className="w-5 h-5 text-green-600 dark:text-green-300" />
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
      {showOrderModal && (
        <OrderModal
          order={selectedOrder}
          onClose={() => setShowOrderModal(false)}
          onSaved={() => { setShowOrderModal(false); setRefresh(r => !r) }}
        />
      )}
    </TabsContent>,

    // Products Tab
    <TabsContent value="products" key="products">
      <Card className="shadow-md border-0 bg-white dark:bg-gray-800">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <CubeIcon className="w-6 h-6 text-green-700 dark:text-green-300" />
              <CardTitle className="text-xl text-green-700 dark:text-green-200 moraba">مدیریت محصولات</CardTitle>
            </div>
            <div className="flex items-center gap-1 bg-green-100 dark:bg-green-900/40 rounded-full px-3 py-1 ms-auto">

              <span className=" text-green-700 dark:text-green-200 text-base">{products.length} محصول</span>
            </div>
            <Button onClick={handleAddProduct} className="flex items-center gap-2 bg-green-600 text-white hover:bg-green-700">
              <PlusIcon className="w-5 h-5" />
              افزودن محصول
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <table className="w-full text-right">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800 bg-green-50 dark:bg-green-800/40">
                  <th className="py-3 px-4 text-green-700 dark:text-green-200">نام محصول</th>
                  <th className="py-3 px-4 text-green-700 dark:text-green-200">قیمت</th>
                  <th className="py-3 px-4 text-green-700 dark:text-green-200">موجودی</th>
                  <th className="py-3 px-4 text-green-700 dark:text-green-200">دسته‌بندی</th>
                  <th className="py-3 px-4 text-green-700 dark:text-green-200">وضعیت</th>
                  <th className="py-3 px-4 text-green-700 dark:text-green-200">عملیات</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-6 text-center text-gray-400 dark:text-gray-500">محصولی یافت نشد.</td>
                  </tr>
                )}
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-gray-200 dark:border-gray-800 hover:bg-green-50 dark:hover:bg-green-900/20 transition"
                  >
                    <td className="py-3 px-4 text-gray-900 dark:text-gray-100">{product.name}</td>
                    <td className="py-3 px-4 text-gray-900 dark:text-gray-100">{formatPrice(product.price)} تومان</td>
                    <td className="py-3 px-4 text-gray-900 dark:text-gray-100">{product.stock}</td>
                    <td className="py-3 px-4 text-gray-500 dark:text-gray-400">{renderCategory(product.category)}</td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={getStatusVariant(product.isActive) ? 'active' : 'inactive'}
                        className={
                          product.isActive
                            ? "bg-green-600 text-white"
                            : "bg-red-500 text-white"
                        }
                      >
                        {getStatusText(product.isActive) ? 'فعال' : 'غیرفعال'}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2 justify-start">
                        <Button variant="ghost" size="icon" onClick={() => handleViewProduct(product)} title="مشاهده">
                          <EyeIcon className="w-5 h-5 text-green-700 dark:text-green-200" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleEditProduct(product)} title="ویرایش">
                          <PencilIcon className="w-5 h-5 text-green-600 dark:text-green-300" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteProduct(product.id)} title="حذف">
                          <TrashIcon className="w-5 h-5 text-red-500 dark:text-red-400" />
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
      {showProductModal && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setShowProductModal(false)}
          onSaved={() => { setShowProductModal(false); setRefresh(r => !r) }}
        />
      )}
    </TabsContent>,

    // BlogPosts Tab
    <TabsContent value="blogposts" key="blogposts">
      <Card className="shadow-md border-0 bg-white dark:bg-gray-800">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <PencilIcon className="w-6 h-6 text-green-700 dark:text-green-300" />
              <CardTitle className="text-xl text-green-700 dark:text-green-200 moraba">مدیریت پست‌های وبلاگ</CardTitle>
            </div>
            <div className="flex items-center gap-1 bg-green-100 dark:bg-green-900/40 rounded-full px-3 py-1 ms-auto">
              <span className="text-green-700 dark:text-green-200 text-base">{blogPosts.length} پست</span>
            </div>
            <Button onClick={handleAddBlogPost} className="flex items-center gap-2 bg-green-600 text-white hover:bg-green-700">
              <PlusIcon className="w-5 h-5" />
              افزودن پست
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <table className="w-full text-right">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800 bg-green-50 dark:bg-green-800/40">
                  <th className="py-3 px-4 text-green-700 dark:text-green-200">عنوان</th>
                  <th className="py-3 px-4 text-green-700 dark:text-green-200">نویسنده</th>
                  <th className="py-3 px-4 text-green-700 dark:text-green-200">تاریخ</th>
                  <th className="py-3 px-4 text-green-700 dark:text-green-200">وضعیت</th>
                  <th className="py-3 px-4 text-green-700 dark:text-green-200">عملیات</th>
                </tr>
              </thead>
              <tbody>
                {blogPosts.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-gray-400 dark:text-gray-500">پستی یافت نشد.</td>
                  </tr>
                )}
                {blogPosts.map((post) => (
                  <tr
                    key={post.id}
                    className="border-b border-gray-200 dark:border-gray-800 hover:bg-green-50 dark:hover:bg-green-900/20 transition"
                  >
                    <td className="py-3 px-4 text-gray-900 dark:text-gray-100">{post.title}</td>
                    <td className="py-3 px-4 text-gray-900 dark:text-gray-100">{post.author}</td>
                    <td className="py-3 px-4 text-gray-900 dark:text-gray-100">{formatDate(post.createdAt)}</td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={getStatusVariant(post.status) ? 'active' : 'inactive'}
                        className={
                          getStatusVariant(post.status)
                            ? "bg-green-600 text-white"
                            : "bg-red-500 text-white"
                        }
                      >
                        {getStatusText(post.status) ? 'منتشر شده' : 'پیش‌نویس'}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2 justify-start">
                        <Button variant="ghost" size="icon" onClick={() => handleEditBlogPost(post)} title="ویرایش">
                          <PencilIcon className="w-5 h-5 text-green-600 dark:text-green-300" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteBlogPost(post.id)} title="حذف">
                          <TrashIcon className="w-5 h-5 text-red-500 dark:text-red-400" />
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
      {showBlogPostModal && (
        <BlogPostModal
          post={selectedBlogPost}
          onClose={() => setShowBlogPostModal(false)}
          onSaved={() => { setShowBlogPostModal(false); setRefresh(r => !r) }}
        />
      )}
    </TabsContent>,

    // Newsletter Tab
    <TabsContent value="newslettersubscribers" key="newslettersubscribers">
      <Card className="shadow-md border-0 bg-white dark:bg-gray-800">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <EnvelopeIcon className="w-6 h-6 text-green-700 dark:text-green-300" />
              <CardTitle className="text-xl text-green-700 dark:text-green-200 moraba">مدیریت خبرنامه</CardTitle>
            </div>
            <div className="flex items-center gap-1 bg-green-100 dark:bg-green-900/40 rounded-full px-3 py-1 ms-auto">
              <span className="text-green-700 dark:text-green-200 text-base">{newsletterSubscribers.length} عضو</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <table className="w-full text-right">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800 bg-green-50 dark:bg-green-800/40">
                  <th className="py-3 px-4 text-green-700 dark:text-green-200">ایمیل</th>
                  <th className="py-3 px-4 text-green-700 dark:text-green-200">تاریخ عضویت</th>
                </tr>
              </thead>
              <tbody>
                {newsletterSubscribers.length === 0 && (
                  <tr>
                    <td colSpan={2} className="py-6 text-center text-gray-400 dark:text-gray-500">عضوی یافت نشد.</td>
                  </tr>
                )}
                {newsletterSubscribers.map((sub) => (
                  <tr
                    key={sub.id}
                    className="border-b border-gray-200 dark:border-gray-800 hover:bg-green-50 dark:hover:bg-green-900/20 transition"
                  >
                    <td className="py-3 px-4 text-gray-900 dark:text-gray-100">{sub.email}</td>
                    <td className="py-3 px-4 text-gray-900 dark:text-gray-100">{formatDate(sub.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </TabsContent>,

    // ContactMessages Tab
    <TabsContent value="contactmessages" key="contactmessages">
      <Card className="shadow-md border-0 bg-white dark:bg-gray-800">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <ChatBubbleLeftRightIcon className="w-6 h-6 text-green-700 dark:text-green-300" />
              <CardTitle className="text-xl text-green-700 dark:text-green-200 moraba">پیام‌های تماس</CardTitle>
            </div>
            <div className="flex items-center gap-1 bg-green-100 dark:bg-green-900/40 rounded-full px-3 py-1 ms-auto">
              <span className="text-green-700 dark:text-green-200 text-base">{contactMessages.length} پیام</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            {typeof useState !== "undefined" && (() => {
              return null;
            })()}
            <table className="w-full text-right">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800 bg-green-50 dark:bg-green-800/40">
                  <th className="py-3 px-4 text-green-700 dark:text-green-200">شماره</th>
                  <th className="py-3 px-4 text-green-700 dark:text-green-200">نام</th>
                  <th className="py-3 px-4 text-green-700 dark:text-green-200">ایمیل</th>
                  <th className="py-3 px-4 text-green-700 dark:text-green-200">پیام</th>
                  <th className="py-3 px-4 text-green-700 dark:text-green-200">تاریخ</th>
                  <th className="py-3 px-4 text-green-700 dark:text-green-200">عملیات</th>
                </tr>
              </thead>
              <tbody>
                {contactMessages.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-6 text-center text-gray-400 dark:text-gray-500">پیامی یافت نشد.</td>
                  </tr>
                )}
                {contactMessages.map((msg, idx) => (
                  <tr
                    key={msg._id || msg.id}
                    className="border-b border-gray-200 dark:border-gray-800 hover:bg-green-50 dark:hover:bg-green-900/20 transition"
                  >
                    <td className="py-3 px-4 text-gray-900 dark:text-gray-100">{idx + 1}</td>
                    <td className="py-3 px-4 text-gray-900 dark:text-gray-100">{msg.name}</td>
                    <td className="py-3 px-4 text-gray-900 dark:text-gray-100">{msg.email}</td>
                    <td className="py-3 px-4 text-gray-900 dark:text-gray-100">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-green-700 border-green-400 dark:text-green-200 dark:border-green-700"
                        onClick={() => setOpenContactMsg(msg)}
                      >
                        مشاهده پیام
                      </Button>
                    </td>
                    <td className="py-3 px-4 text-gray-900 dark:text-gray-100">{formatDate(msg.createdAt)}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2 justify-start">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteContactMessage(msg._id)}
                          title="حذف"
                        >
                          <TrashIcon className="w-5 h-5 text-red-500 dark:text-red-400" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Contact Message Modal */}
            {openContactMsg && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                <div className="relative bg-white/90 dark:bg-gray-900/90 rounded-2xl shadow-2xl w-full max-w-md p-6 backdrop-blur-lg border border-gray-200" dir="rtl">
                  <button
                    type="button"
                    onClick={() => setOpenContactMsg(null)}
                    aria-label="بستن"
                    className="absolute left-4 top-4 text-xl text-gray-400 hover:text-green-700 transition rounded-full bg-white/60 dark:bg-gray-900/60 p-1 shadow-md backdrop-blur"
                    style={{ lineHeight: 1 }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                  <h2 className="text-xl font-bold mb-4 text-green-700 text-center">مشاهده پیام تماس</h2>
                  <div className="space-y-3">
                    <div>
                      <span className="font-semibold">شماره:</span>{" "}
                      <span>{contactMessages.findIndex(m => (m._id || m.id) === (openContactMsg._id || openContactMsg.id)) + 1}</span>
                    </div>
                    <div>
                      <span className="font-semibold">نام:</span>{" "}
                      <span>{openContactMsg.name}</span>
                    </div>
                    <div>
                      <span className="font-semibold">ایمیل:</span>{" "}
                      <span>{openContactMsg.email}</span>
                    </div>
                    {openContactMsg.subject && (
                      <div>
                        <span className="font-semibold">موضوع:</span>{" "}
                        <span>{openContactMsg.subject}</span>
                      </div>
                    )}
                    <div>
                      <span className="font-semibold">تاریخ:</span>{" "}
                      <span>{formatDate(openContactMsg.createdAt)}</span>
                    </div>
                    <div>
                      <span className="font-semibold">پیام:</span>
                      <div className="mt-2 p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 whitespace-pre-line break-words">
                        {openContactMsg.message}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end mt-6">
                    <Button onClick={() => setOpenContactMsg(null)} className="bg-green-600 text-white px-6 py-2 rounded-lg shadow hover:bg-green-700 transition">
                      بستن
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </TabsContent>,

    // Categories Tab
    <TabsContent value="categories" key="categories">
      <Card className="shadow-md border-0 bg-white dark:bg-gray-800">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <TagIcon className="w-6 h-6 text-green-700 dark:text-green-300" />
              <CardTitle className="text-xl text-green-700 dark:text-green-200 moraba">مدیریت دسته‌بندی‌ها</CardTitle>
            </div>
            <div className="flex items-center gap-1 bg-green-100 dark:bg-green-900/40 rounded-full px-3 py-1 ms-auto">
              <span className="text-green-700 dark:text-green-200 text-base">{categories.length} دسته‌بندی</span>
            </div>
            <Button onClick={handleAddCategory} className="flex items-center gap-2 bg-green-600 text-white hover:bg-green-700">
              <PlusIcon className="w-5 h-5" />
              افزودن دسته‌بندی
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <table className="w-full text-right">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800 bg-green-50 dark:bg-green-800/40">
                  <th className="py-3 px-4 text-green-700 dark:text-green-200">نام</th>
                  <th className="py-3 px-4 text-green-700 dark:text-green-200">اسلاگ</th>
                  <th className="py-3 px-4 text-green-700 dark:text-green-200">عملیات</th>
                </tr>
              </thead>
              <tbody>
                {categories.length === 0 && (
                  <tr>
                    <td colSpan={3} className="py-6 text-center text-gray-400 dark:text-gray-500">دسته‌بندی‌ای یافت نشد.</td>
                  </tr>
                )}
                {categories.map((cat) => (
                  <tr
                    key={cat.id}
                    className="border-b border-gray-200 dark:border-gray-800 hover:bg-green-50 dark:hover:bg-green-900/20 transition"
                  >
                    <td className="py-3 px-4 text-gray-900 dark:text-gray-100">{cat.name}</td>
                    <td className="py-3 px-4 text-gray-900 dark:text-gray-100">{cat.slug}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2 justify-start">
                        <Button variant="ghost" size="icon" onClick={() => handleEditCategory(cat)} title="ویرایش">
                          <PencilIcon className="w-5 h-5 text-green-600 dark:text-green-300" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteCategory(cat._id)} title="حذف">
                          <TrashIcon className="w-5 h-5 text-red-500 dark:text-red-400" />
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
      {showCategoryModal && (
        <CategoryModal
          category={selectedCategory}
          onClose={() => setShowCategoryModal(false)}
          onSaved={() => { setShowCategoryModal(false); setRefresh(r => !r) }}
        />
      )}
    </TabsContent>
  ].reverse();



  return (
    <div className="min-h-screen flex bg-gradient-to-tr from-green-50 to-green-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Sidebar */}
      <aside
        className={`
          fixed ${closeSidebar ? 'hidden' : ''} min-h-screen z-40 top-0 right-0 h-full
          bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 shadow-lg transition-all duration-300
          ${sidebarOpen ? "w-64" : "w-16"}
          lg:flex flex-col
        `}
        style={{ direction: "rtl" }}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-4 py-5 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 relative">
          {/* Admin Avatar & Name */}
          <div className="flex items-center gap-2 w-full justify-start mb-2">
            <div className="bg-green-100 dark:bg-green-900/40 rounded-full p-2 shadow">
              <UsersIcon className="w-6 h-6 text-green-700 dark:text-green-300" />
            </div>
            <span
              className={`
                  font-bold text-green-700 dark:text-green-200 text-base transition-all duration-200
                  ${sidebarOpen ? "opacity-100 block" : "opacity-0 w-0 overflow-hidden hidden"}
                `}
            >
              {user?.name || "ادمین"}
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen((o) => !o)}
            className={`ml-0 border border-green-200 dark:border-green-800 rounded-full absolute  bg-white dark:bg-gray-900 ${sidebarOpen ? "top-4 -left-5" : "top-5 left-2"} `}
            aria-label={sidebarOpen ? "بستن سایدبار" : "باز کردن سایدبار"}
          >
            <span className="sr-only">{sidebarOpen ? "بستن سایدبار" : "باز کردن سایدبار"}</span>
            <svg
              className="w-6 h-6 text-green-700 dark:text-green-200"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              {sidebarOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              )}
            </svg>
          </Button>
        </div>
        {/* Tabs in Sidebar */}
        <nav className="flex-1 py-4 overflow-y-auto bg-white dark:bg-gray-900 transition-colors duration-300">
          <ul className="space-y-3 px-3">
            {adminTabs.map((tab) => (
              <li key={tab.value}>
                <button
                  className={`
                    flex items-center w-full ${sidebarOpen ? 'px-4' : 'pr-2'} py-2 rounded-lg transition
                    ${activeTab === tab.value
                      ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-200"
                      : "hover:bg-green-50 dark:hover:bg-green-900/30 text-gray-700 dark:text-gray-200"}
                  `}
                  onClick={() => setActiveTab(tab.value)}
                >
                  {(() => {
                    const icons = {
                      CubeIcon: CubeIcon,
                      ChartBarIcon: ChartBarIcon,
                      PencilIcon: PencilIcon,
                      ShoppingBagIcon: ShoppingBagIcon,
                      UsersIcon: UsersIcon,
                      EnvelopeIcon: EnvelopeIcon,
                      ClipboardDocumentListIcon: ClipboardDocumentListIcon,
                      PhoneIcon: PhoneIcon
                    };
                    const IconComponent = icons[tab.icon];
                    return IconComponent ? <IconComponent className="w-5 h-5 ml-2" /> : null;
                  })()}
                  <span className={`transition-all duration-200 ${sidebarOpen ? "opacity-100 block" : "opacity-0 w-0 overflow-hidden hidden"}`}>
                    {tab.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        {/* Footer in Sidebar */}
        <div
          className={`
            ${sidebarOpen ? "px-4 py-5" : "p-2"}
            text-center flex flex-col gap-3 items-center
            shadow-inner mt-auto
            bg-white dark:bg-gray-900 transition-colors duration-300
          `}
        >
          <div className="flex flex-col gap-3 w-full items-center">

            <button
              onClick={toggleTheme}
              className={`
                flex items-center justify-start gap-2 w-full px-3 py-2 rounded-lg
                text-gray-900 dark:text-gray-100 hover:bg-green-50 dark:hover:bg-green-900/30
                transition-colors font-medium
                ${sidebarOpen ? "" : "justify-center"}
              `}
              type="button"
            >
              <span className="w-5 h-5">
                {theme === "dark" ? (
                  // Moon icon for dark mode
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke="currentColor"
                      strokeWidth="2"
                      d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
                    />
                  </svg>
                ) : (
                  // Sun icon for light mode
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" fill="none" />
                    <path stroke="currentColor" strokeWidth="2" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                  </svg>
                )}
              </span>
              <span className={`${sidebarOpen ? "inline" : "hidden"}`}>دارک مود</span>
            </button>
            <button
              onClick={handleSeedData}
              className={`
                flex items-center justify-start gap-2 w-full px-3 py-2 rounded-lg
                text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20
                transition-colors font-medium
                ${sidebarOpen ? "" : "justify-center"}
              `}
              type="button"
            >
              <span className="w-5 h-5">
                {/* Plus icon */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke="currentColor" strokeWidth="2" d="M12 6v12M6 12h12" />
                </svg>
              </span>
              <span className={`${sidebarOpen ? "inline" : "hidden"}`}>اضافه کردن داده جدید</span>
            </button>
            {/* Update Button */}
            <button
              onClick={() => setRefresh(r => !r)}
              className={`
                 items-center justify-start gap-2 w-full px-3 py-2 rounded-lg
                 hover:bg-green-900/30 dark:hover:bg-green-900/50 dark:text-white transition
                active:scale-95 hidden md:flex
                ${sidebarOpen ? "" : "justify-center"}
              `}
              type="button"
            >
              <ArrowPathIcon className="w-5 h-5" />
              <span className={`${sidebarOpen ? "inline" : "hidden"}`}>بروزرسانی</span>
            </button>
            {/* Home Button */}
            <button
              onClick={() => router.push('/')}
              className={`
                flex items-center justify-start gap-2 w-full px-3 py-2 rounded-lg
                text-gray-900 dark:text-gray-100 hover:bg-green-50 dark:hover:bg-green-900/30
                transition-colors font-medium
                ${sidebarOpen ? "" : "justify-center"}
              `}
              type="button"
            >
              <HomeIcon className="w-5 h-5" />
              <span className={`${sidebarOpen ? "inline" : "hidden"}`}>خانه</span>
            </button>
            {/* Logout Button */}
            <button
              onClick={logout}
              className={`
                flex items-center justify-start gap-2 w-full px-3 py-2 rounded-lg
                text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20
                transition-colors font-medium
                ${sidebarOpen ? "" : "justify-center"}
              `}
              type="button"
            >
              <ArrowRightOnRectangleIcon className="w-5 h-5" />
              <span className={`${sidebarOpen ? "inline" : "hidden"}`}>خروج</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 w-full transition-all duration-300 ${sidebarOpen ? 'lg:mr-64' : 'lg:mr-16'} bg-white dark:bg-gray-900`}>
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white/80 dark:bg-gray-900/90 lg:hidden backdrop-blur border-b border-gray-200 dark:border-gray-800 px-4 py-4 flex items-center justify-between" style={{ direction: "rtl" }}>
          <div>
            <h1 className="text-xl moraba text-green-700 dark:text-green-200 tracking-tight">
              {user.name} خوش آمدید !
            </h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setRefresh(r => !r)} className="flex items-center gap-2 p-3 border-green-600 text-green-700 dark:border-green-400 dark:text-green-200 rounded-full">
              <ArrowPathIcon className="w-5 h-5" />
              <span className='hidden md:inline'>بروزرسانی</span>
            </Button>
            <Button variant="outline" onClick={() => setCloseSidebar(r => !r)} className="flex lg:hidden items-center gap-2 p-3 border-green-600 text-green-700 dark:border-green-400 dark:text-green-200 rounded-full">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="container mx-auto px-4 py-6">
          {/* Main Tabs Content */}
          <div className="mt-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8" dir="rtl">
              {tabsContent.map((content, idx) =>
                content.props.value === activeTab ? content : null
              )}
            </Tabs>
          </div>
        </div>
      </div>
      <AlertDialogComponent />
    </div>
  )
}

// --- Product Modal (CRUD) ---
function ProductModal({ product, onClose, onSaved }) {
  // Ensure category is string for input
  const [form, setForm] = useState(() => {
    if (!product) return { name: '', price: '', stock: '', category: '', status: 'active', images: [] }
    // If product.category is object, use its slug or name
    let categoryValue = ''
    if (product.category) {
      if (typeof product.category === 'string') categoryValue = product.category
      else if (typeof product.category === 'object') categoryValue = product.category.slug || product.category.name || ''
    }
    return { ...product, category: categoryValue }
  })
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const isEdit = !!product
  const fileInputRef = useRef(null)

  const handleChange = e => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      const token = (typeof window !== 'undefined') ? localStorage.getItem('token') : null
      const method = isEdit ? 'put' : 'post'
      const url = isEdit ? `/api/products/${product._id || product.id}` : '/api/products'
      await axios[method](url, form, {
        headers: { Authorization: `Bearer ${token}` }
      })
    } catch { }
    setLoading(false)
    onSaved()
  }

  const handleUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const token = (typeof window !== 'undefined') ? localStorage.getItem('token') : null
      const formData = new FormData()
      formData.append('image', file)
      const res = await axios.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` }
      })
      const url = res.data.url
      setForm(f => ({ ...f, images: [...(f.images || []), { url, alt: f.name, isPrimary: !(f.images && f.images.length) }] }))
    } catch { }
    setUploading(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative bg-white/70 dark:bg-gray-900/70 rounded-2xl shadow-2xl w-full max-w-md p-6 backdrop-blur-lg border border-gray-200" dir="rtl" style={{ WebkitBackdropFilter: 'blur(16px)', backdropFilter: 'blur(16px)' }}>
        <button
          type="button"
          onClick={onClose}
          aria-label="بستن"
          className="absolute left-4 top-4 text-xl text-gray-400 hover:text-green-700 transition rounded-full bg-white/60 dark:bg-gray-900/60 p-1 shadow-md backdrop-blur"
          style={{ lineHeight: 1 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <h2 className="text-xl font-bold mb-4 text-green-700 text-center">{isEdit ? 'ویرایش محصول' : 'افزودن محصول'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">نام محصول</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 bg-white/60 dark:bg-gray-900/60 focus:ring-2 focus:ring-green-600 transition"
              required
            />
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block mb-1 font-medium">قیمت</label>
              <input
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 bg-white/60 dark:bg-gray-900/60 focus:ring-2 focus:ring-green-600 transition"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block mb-1 font-medium">موجودی</label>
              <input
                name="stock"
                type="number"
                value={form.stock}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 bg-white/60 dark:bg-gray-900/60 focus:ring-2 focus:ring-green-600 transition"
                required
              />
            </div>
          </div>
          <div>
            <label className="block mb-1 font-medium">دسته‌بندی</label>
            <input
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 bg-white/60 dark:bg-gray-900/60 focus:ring-2 focus:ring-green-600 transition"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">وضعیت</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 bg-white/60 dark:bg-gray-900/60 focus:ring-2 focus:ring-green-600 transition"
            >
              <option value="active">فعال</option>
              <option value="inactive">غیرفعال</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">تصویر محصول</label>
            <div className="flex items-center gap-3">
              <label
                htmlFor="product-image-upload"
                className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg border border-green-300 font-medium transition"
                style={{ direction: 'rtl' }}
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12" />
                </svg>
                آپلود تصویر
              </label>
              <input
                id="product-image-upload"
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleUpload}
                className="hidden"
              />
              {uploading && <span className="text-sm text-gray-400">در حال آپلود...</span>}
            </div>
            {form.images?.length > 0 && (
              <div className="grid grid-cols-4 gap-2 mt-2">
                {form.images.map((img, idx) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={idx} src={img.url} alt={img.alt || form.name} className="w-full h-20 object-cover rounded shadow" />
                ))}
              </div>
            )}
          </div>
          <div className="flex justify-end mt-6">
            <Button type="submit" disabled={loading} className="bg-green-600 text-white px-6 py-2 rounded-lg shadow hover:bg-green-700 transition">
              {loading ? 'در حال ذخیره...' : isEdit ? 'ذخیره تغییرات' : 'افزودن'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

// --- Order Modal (CRUD) ---
function OrderModal({ order, onClose, onSaved }) {
  const [form, setForm] = useState(order || {})
  const [loading, setLoading] = useState(false)
  if (!order) return null

  const handleChange = e => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    await axios.put(`/api/orders/${order._id}`, form)
    setLoading(false)
    onSaved()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative bg-white/70 dark:bg-gray-900/70 rounded-2xl shadow-2xl w-full max-w-md p-6 backdrop-blur-lg border border-gray-200" dir="rtl" style={{ WebkitBackdropFilter: 'blur(16px)', backdropFilter: 'blur(16px)' }}>
        <button
          type="button"
          onClick={onClose}
          aria-label="بستن"
          className="absolute left-4 top-4 text-xl text-gray-400 hover:text-green-700 transition rounded-full bg-white/60 dark:bg-gray-900/60 p-1 shadow-md backdrop-blur"
          style={{ lineHeight: 1 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <h2 className="text-xl font-bold mb-4 text-green-700 text-center">ویرایش سفارش</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">وضعیت سفارش</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 bg-white/60 dark:bg-gray-900/60 focus:ring-2 focus:ring-green-600 transition"
            >
              <option value="processing">در حال پردازش</option>
              <option value="shipped">ارسال شده</option>
              <option value="delivered">تحویل شده</option>
              <option value="cancelled">لغو شده</option>
            </select>
          </div>
          <div className="flex justify-end mt-6">
            <Button type="submit" disabled={loading} className="bg-green-600 text-white px-6 py-2 rounded-lg shadow hover:bg-green-700 transition">
              {loading ? 'در حال ذخیره...' : 'ذخیره تغییرات'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

// --- User Modal (CRUD) ---
function UserModal({ user, onClose, onSaved }) {
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: {
      street: user?.address?.street || '',
      city: user?.address?.city || '',
      state: user?.address?.state || '',
      zipCode: user?.address?.zipCode || '',
      country: user?.address?.country || 'Iran',
    },
    role: user?.role || 'user',
    isActive: typeof user?.isActive === 'boolean' ? user.isActive : true,
  });
  const [loading, setLoading] = useState(false);
  if (!user) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith('address.')) {
      const addrField = name.split('.')[1];
      setForm((f) => ({
        ...f,
        address: {
          ...f.address,
          [addrField]: value,
        },
      }));
    } else if (name === 'isActive') {
      setForm((f) => ({
        ...f,
        isActive: type === 'checkbox' ? checked : value === 'true',
      }));
    } else {
      setForm((f) => ({
        ...f,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Only send allowed fields
    const payload = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      address: form.address,
      role: form.role,
      isActive: form.isActive,
    };
    await axios.put(`/api/users/${user._id}`, payload);
    setLoading(false);
    onSaved();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative bg-white/70 dark:bg-gray-900/70 rounded-2xl shadow-2xl w-full max-w-md p-6 backdrop-blur-lg border border-gray-200" dir="rtl" style={{ WebkitBackdropFilter: 'blur(16px)', backdropFilter: 'blur(16px)' }}>
        <button
          type="button"
          onClick={onClose}
          aria-label="بستن"
          className="absolute left-4 top-4 text-xl text-gray-400 hover:text-green-700 transition rounded-full bg-white/60 dark:bg-gray-900/60 p-1 shadow-md backdrop-blur"
          style={{ lineHeight: 1 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <h2 className="text-xl font-bold mb-4 text-green-700 text-center">ویرایش کاربر</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">نام</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 bg-white/60 dark:bg-gray-900/60 focus:ring-2 focus:ring-green-600 transition"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">ایمیل</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 bg-white/60 dark:bg-gray-900/60 focus:ring-2 focus:ring-green-600 transition"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">شماره تلفن</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 bg-white/60 dark:bg-gray-900/60 focus:ring-2 focus:ring-green-600 transition"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">آدرس</label>
            <div className="grid grid-cols-2 gap-2">
              <input
                name="address.street"
                value={form.address.street}
                onChange={handleChange}
                placeholder="خیابان"
                className="border rounded-lg px-3 py-2 bg-white/60 dark:bg-gray-900/60 focus:ring-2 focus:ring-green-600 transition"
              />
              <input
                name="address.city"
                value={form.address.city}
                onChange={handleChange}
                placeholder="شهر"
                className="border rounded-lg px-3 py-2 bg-white/60 dark:bg-gray-900/60 focus:ring-2 focus:ring-green-600 transition"
              />
              <input
                name="address.state"
                value={form.address.state}
                onChange={handleChange}
                placeholder="استان"
                className="border rounded-lg px-3 py-2 bg-white/60 dark:bg-gray-900/60 focus:ring-2 focus:ring-green-600 transition"
              />
              <input
                name="address.zipCode"
                value={form.address.zipCode}
                onChange={handleChange}
                placeholder="کد پستی"
                className="border rounded-lg px-3 py-2 bg-white/60 dark:bg-gray-900/60 focus:ring-2 focus:ring-green-600 transition"
              />
              <input
                name="address.country"
                value={form.address.country}
                onChange={handleChange}
                placeholder="کشور"
                className="border rounded-lg px-3 py-2 bg-white/60 dark:bg-gray-900/60 focus:ring-2 focus:ring-green-600 transition col-span-2"
              />
            </div>
          </div>
          <div>
            <label className="block mb-1 font-medium">نقش</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 bg-white/60 dark:bg-gray-900/60 focus:ring-2 focus:ring-green-600 transition"
            >
              <option value="user">کاربر</option>
              <option value="admin">ادمین</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">فعال</label>
            <input
              type="checkbox"
              name="isActive"
              checked={!!form.isActive}
              onChange={handleChange}
              className="ml-2 accent-green-600"
            />
            <span className="text-sm text-gray-600">حساب کاربری فعال باشد</span>
          </div>
          <div className="flex justify-end mt-6">
            <Button type="submit" disabled={loading} className="bg-green-600 text-white px-6 py-2 rounded-lg shadow hover:bg-green-700 transition">
              {loading ? 'در حال ذخیره...' : 'ذخیره تغییرات'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

// --- Category Modal (CRUD) ---
function CategoryModal({ category, onClose, onSaved }) {
  const [form, setForm] = useState(
    category
      ? {
        name: category.name || '',
        slug: category.slug || '',
        parent: category.parent?._id || category.parent || '',
      }
      : { name: '', slug: '', parent: '' }
  );
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [catLoading, setCatLoading] = useState(true);

  useEffect(() => {
    // Fetch all categories for parent select
    const fetchCategories = async () => {
      setCatLoading(true);
      try {
        const token = (typeof window !== 'undefined') ? localStorage.getItem('token') : null;
        const res = await axios.get('/api/categories', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setCategories(res.data || []);
      } catch {
        setCategories([]);
      }
      setCatLoading(false);
    };
    fetchCategories();
  }, []);

  if (!category && !form) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((f) => ({
      ...f,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = (typeof window !== 'undefined') ? localStorage.getItem('token') : null;
      const method = category ? 'put' : 'post';
      const url = category
        ? `/api/categories/${category._id}`
        : '/api/categories';

      // Always send both name and slug explicitly
      const payload = {
        name: form.name,
        slug: form.slug,
        parent: !form.parent || form.parent === 'default' ? null : form.parent,
      };

      await axios[method](url, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch { }
    setLoading(false);
    onSaved();
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div
        className="relative bg-white/70 dark:bg-gray-900/70 rounded-2xl shadow-2xl w-full max-w-md p-6 backdrop-blur-lg border border-gray-200"
        dir="rtl"
        style={{ WebkitBackdropFilter: 'blur(16px)', backdropFilter: 'blur(16px)' }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="بستن"
          className="absolute left-4 top-4 text-xl text-gray-400 hover:text-green-700 transition rounded-full bg-white/60 dark:bg-gray-900/60 p-1 shadow-md backdrop-blur"
          style={{ lineHeight: 1 }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <h2 className="text-xl font-bold mb-4 text-green-700 text-center">
          {category ? 'ویرایش دسته‌بندی' : 'افزودن دسته‌بندی'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">نام دسته‌بندی</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 bg-white/60 dark:bg-gray-900/60 focus:ring-2 focus:ring-green-600 transition"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">اسلاگ</label>
            <input
              name="slug"
              value={form.slug}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 bg-white/60 dark:bg-gray-900/60 focus:ring-2 focus:ring-green-600 transition"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">دسته‌بندی والد</label>
            <select
              name="parent"
              value={form.parent || 'default'}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 bg-white/60 dark:bg-gray-900/60 focus:ring-2 focus:ring-green-600 transition"
              disabled={catLoading}
            >
              <option value="default">بدون والد (دسته‌بندی اصلی)</option>
              {categories
                .filter((cat) => !category || cat._id !== category._id) // Prevent self as parent
                .map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="flex justify-end mt-6">
            <Button
              type="submit"
              disabled={loading}
              className="bg-green-600 text-white px-6 py-2 rounded-lg shadow hover:bg-green-700 transition"
            >
              {loading
                ? 'در حال ذخیره...'
                : category
                  ? 'ذخیره تغییرات'
                  : 'افزودن'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

// --- BlogPost Modal (CRUD) ---
function BlogPostModal({ post, onClose, onSaved }) {

  const [form, setForm] = useState(() => {
    if (!post) {
      return {
        title: '',
        author: '',
        content: '',
        emoji: '📝',
        category: '',
        tags: [],
      }
    }
    // category: if post.category is a string, use it; if object, use _id or id
    let categoryValue = ''
    if (post.category) {
      if (typeof post.category === 'string') categoryValue = post.category
      else if (typeof post.category === 'object') categoryValue = post.category._id || post.category.id || post.category.name || ''
    }



    let tagsValue = Array.isArray(post.tags) ? post.tags.filter(Boolean) : []
    return { ...post, category: categoryValue, tags: tagsValue }
  });
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [categoriesBlog, setCategoriesBlog] = useState([])
  const [catLoading, setCatLoading] = useState(false)
  const [tagInput, setTagInput] = useState('')
  const fileInputRef = useRef(null)
  const isEdit = !!post

  // Fetch categoriesBlog on mount
  useEffect(() => {
    const fetchCategories = async () => {
      setCatLoading(true)
      try {
        const res = await axios.get('/api/categories')
        setCategoriesBlog(res.data || [])
      } catch (err) {
        setCategoriesBlog([])
      }
      setCatLoading(false)
    }
    fetchCategories()
  }, [])

  const handleChange = e => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  // Tag input handlers
  const handleTagInputChange = (e) => {
    setTagInput(e.target.value)
  }
  const handleTagInputKeyDown = (e) => {
    if ((e.key === 'Enter' || e.key === ',') && tagInput.trim()) {
      e.preventDefault()
      addTag(tagInput.trim())
    }
  }
  const addTag = (tag) => {
    if (!tag) return
    if (form.tags.includes(tag)) return
    setForm(f => ({ ...f, tags: [...(f.tags || []), tag] }))
    setTagInput('')
  }
  const removeTag = (tag) => {
    setForm(f => ({ ...f, tags: (f.tags || []).filter(t => t !== tag) }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const token = (typeof window !== 'undefined') ? localStorage.getItem('token') : null
      const method = isEdit ? 'put' : 'post'
      const url = isEdit
        ? `/api/blog/posts/${post._id}`
        : '/api/blog/posts'

      let payload = { ...form }

      // Replace category with category name for backend if needed
      if (form.category && categoriesBlog.length > 0) {
        const selectedCat = categoriesBlog.find(cat => cat._id === form.category)
        if (selectedCat) {
          payload.category = selectedCat.name
        }
      }

      // tags: always array of strings
      if (!Array.isArray(payload.tags)) payload.tags = []
      payload.tags = payload.tags.map(t => t.trim()).filter(Boolean)


      console.log(payload);

      await axios[method](url, payload, {
        headers: { Authorization: `Bearer ${token}` }
      })
    } catch (err) {
      console.log("err");
    }
    setLoading(false)
    onSaved()
  }

  const handleUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const token = (typeof window !== 'undefined') ? localStorage.getItem('token') : null
      const formData = new FormData()
      formData.append('image', file)
      const res = await axios.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` }
      })
      const url = res.data.url
      setForm(f => ({ ...f, cover: url }))
    } catch { }
    setUploading(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div
        className="relative bg-white/70 dark:bg-gray-900/70 rounded-2xl shadow-2xl w-full max-w-md p-6 backdrop-blur-lg border border-gray-200"
        dir="rtl"
        style={{
          WebkitBackdropFilter: 'blur(16px)',
          backdropFilter: 'blur(16px)',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="بستن"
          className="absolute left-4 top-4 text-xl text-gray-400 hover:text-green-700 transition rounded-full bg-white/60 dark:bg-gray-900/60 p-1 shadow-md backdrop-blur"
          style={{ lineHeight: 1 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <h2 className="text-xl font-bold mb-4 text-green-700 text-center">{isEdit ? 'ویرایش پست' : 'افزودن پست'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">عنوان</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 bg-white/60 dark:bg-gray-900/60 focus:ring-2 focus:ring-green-600 transition"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">نویسنده</label>
            <input
              name="author"
              value={form.author}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 bg-white/60 dark:bg-gray-900/60 focus:ring-2 focus:ring-green-600 transition"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">ایموجی</label>
            <input
              name="emoji"
              value={form.emoji}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 bg-white/60 dark:bg-gray-900/60 focus:ring-2 focus:ring-green-600 transition text-2xl"
              maxLength={2}
              placeholder="مثلاً 📝"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">متن پست</label>
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 bg-white/60 dark:bg-gray-900/60 focus:ring-2 focus:ring-green-600 transition"
              rows={4}
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">دسته‌بندی</label>
            <div className="flex gap-2 items-center">
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 bg-white/60 dark:bg-gray-900/60 focus:ring-2 focus:ring-green-600 transition"
                disabled={catLoading}
                required
              >
                <option value={form.category ? form.category : ''}>{form.category ? form.category : 'انتخاب دسته‌بندی'}</option>

                {categoriesBlog.map(cat => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block mb-1 font-medium">تگ‌ها</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {(form.tags || []).map((tag, idx) => (
                <span key={tag + idx} className="flex items-center bg-green-100 text-green-700 px-2 py-1 rounded-lg text-sm">
                  <button
                    type="button"
                    className="ml-1 text-red-500 hover:text-red-700 focus:outline-none"
                    onClick={() => removeTag(tag)}
                    tabIndex={-1}
                  >
                    ×
                  </button>
                  {tag}
                </span>
              ))}
            </div>
            <input
              type="text"
              value={tagInput}
              onChange={handleTagInputChange}
              onKeyDown={handleTagInputKeyDown}
              placeholder="تگ جدید را وارد کنید و Enter یا , بزنید"
              className="w-full border rounded-lg px-3 py-2 bg-white/60 dark:bg-gray-900/60 focus:ring-2 focus:ring-green-600 transition"
              dir="rtl"
            />
            <div className="text-xs text-gray-400 mt-1">برای افزودن تگ، اینتر یا ویرگول بزنید</div>
          </div>
          <div>
            <label className="block mb-1 font-medium">کاور پست</label>
            <div className="flex items-center gap-3">
              <label
                htmlFor="blogpost-cover-upload"
                className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg border border-green-300 font-medium transition"
                style={{ direction: 'rtl' }}
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12" />
                </svg>
                آپلود کاور
              </label>
              <input
                id="blogpost-cover-upload"
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleUpload}
                className="hidden"
              />
              {uploading && <span className="text-sm text-gray-400">در حال آپلود...</span>}
            </div>
            {form.cover && (
              <div className="mt-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={form.cover} alt="کاور" className="w-full h-24 object-cover rounded shadow" />
              </div>
            )}
          </div>
          <div className="flex justify-end mt-6">
            <Button type="submit" disabled={loading} className="bg-green-600 text-white px-6 py-2 rounded-lg shadow hover:bg-green-700 transition">
              {loading ? 'در حال ذخیره...' : isEdit ? 'ذخیره تغییرات' : 'افزودن'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}