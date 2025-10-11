'use client'
import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useTheme } from '@/components/ThemeProvider'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  UserIcon, 
  BellIcon, 
  ShieldCheckIcon, 
  PaintBrushIcon,
  EyeIcon,
  EyeSlashIcon,
  CameraIcon
} from '@heroicons/react/24/outline'

export default function SettingsPage() {
  const { user } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const [activeTab, setActiveTab] = useState('profile')
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    bio: user?.bio || ''
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    newsletter: true,
    orderUpdates: true,
    promotions: false
  })

  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showEmail: false,
    showPhone: false,
    dataCollection: true
  })

  const tabs = [
    { id: 'profile', name: 'پروفایل', icon: UserIcon },
    { id: 'notifications', name: 'اعلان‌ها', icon: BellIcon },
    { id: 'security', name: 'امنیت', icon: ShieldCheckIcon },
    { id: 'appearance', name: 'ظاهر', icon: PaintBrushIcon }
  ]

  const handleProfileUpdate = (e) => {
    e.preventDefault()
    // Handle profile update
    console.log('Profile updated:', profileData)
  }

  const handlePasswordChange = (e) => {
    e.preventDefault()
    // Handle password change
    console.log('Password changed')
  }

  const handleNotificationChange = (key, value) => {
    setNotifications(prev => ({ ...prev, [key]: value }))
  }

  const handlePrivacyChange = (key, value) => {
    setPrivacy(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              تنظیمات حساب کاربری
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              مدیریت اطلاعات شخصی و تنظیمات حساب خود
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="p-0">
                  <nav className="space-y-1">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center space-x-3 space-x-reverse px-4 py-3 text-right transition-colors ${
                          activeTab === tab.id
                            ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-l-2 border-green-500'
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                        }`}
                      >
                        <tab.icon className="w-5 h-5" />
                        <span className="font-medium">{tab.name}</span>
                      </button>
                    ))}
                  </nav>
                </CardContent>
              </Card>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <Card>
                  <CardHeader>
                    <CardTitle>اطلاعات پروفایل</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Avatar */}
                    <div className="flex items-center space-x-6 space-x-reverse">
                      <div className="relative">
                        <Avatar className="w-24 h-24">
                          <AvatarImage src={user?.avatar} />
                          <AvatarFallback className="bg-gradient-to-br from-green-500 to-emerald-600 text-white text-2xl">
                            {user?.name?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <Button
                          size="icon"
                          className="absolute -bottom-2 -left-2 w-8 h-8 rounded-full"
                        >
                          <CameraIcon className="w-4 h-4" />
                        </Button>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          تصویر پروفایل
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          تصویر پروفایل خود را آپلود کنید
                        </p>
                        <div className="flex space-x-2 space-x-reverse mt-2">
                          <Button size="sm" variant="outline">آپلود تصویر</Button>
                          <Button size="sm" variant="ghost">حذف</Button>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Profile Form */}
                    <form onSubmit={handleProfileUpdate} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">نام و نام خانوادگی</Label>
                          <Input
                            id="name"
                            value={profileData.name}
                            onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">ایمیل</Label>
                          <Input
                            id="email"
                            type="email"
                            value={profileData.email}
                            onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">شماره تلفن</Label>
                          <Input
                            id="phone"
                            value={profileData.phone}
                            onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="address">آدرس</Label>
                          <Input
                            id="address"
                            value={profileData.address}
                            onChange={(e) => setProfileData(prev => ({ ...prev, address: e.target.value }))}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bio">درباره من</Label>
                        <textarea
                          id="bio"
                          rows={3}
                          value={profileData.bio}
                          onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="چند کلمه درباره خودتان بنویسید..."
                        />
                      </div>

                      <Button type="submit" className="w-full md:w-auto">
                        ذخیره تغییرات
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <Card>
                  <CardHeader>
                    <CardTitle>تنظیمات اعلان‌ها</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">اعلان‌های ایمیل</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            دریافت اعلان‌ها از طریق ایمیل
                          </p>
                        </div>
                        <Switch
                          checked={notifications.email}
                          onCheckedChange={(checked) => handleNotificationChange('email', checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">اعلان‌های پیامکی</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            دریافت اعلان‌ها از طریق پیامک
                          </p>
                        </div>
                        <Switch
                          checked={notifications.sms}
                          onCheckedChange={(checked) => handleNotificationChange('sms', checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">اعلان‌های Push</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            دریافت اعلان‌های فوری در مرورگر
                          </p>
                        </div>
                        <Switch
                          checked={notifications.push}
                          onCheckedChange={(checked) => handleNotificationChange('push', checked)}
                        />
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">خبرنامه</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            دریافت آخرین اخبار و تخفیف‌ها
                          </p>
                        </div>
                        <Switch
                          checked={notifications.newsletter}
                          onCheckedChange={(checked) => handleNotificationChange('newsletter', checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">بروزرسانی سفارشات</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            اطلاع از وضعیت سفارشات
                          </p>
                        </div>
                        <Switch
                          checked={notifications.orderUpdates}
                          onCheckedChange={(checked) => handleNotificationChange('orderUpdates', checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">پیشنهادات ویژه</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            دریافت پیشنهادات و تخفیف‌های ویژه
                          </p>
                        </div>
                        <Switch
                          checked={notifications.promotions}
                          onCheckedChange={(checked) => handleNotificationChange('promotions', checked)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <div className="space-y-6">
                  {/* Password Change */}
                  <Card>
                    <CardHeader>
                      <CardTitle>تغییر رمز عبور</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handlePasswordChange} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="currentPassword">رمز عبور فعلی</Label>
                          <div className="relative">
                            <Input
                              id="currentPassword"
                              type={showCurrentPassword ? 'text' : 'password'}
                              value={passwordData.currentPassword}
                              onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                            />
                            <button
                              type="button"
                              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            >
                              {showCurrentPassword ? (
                                <EyeSlashIcon className="w-5 h-5" />
                              ) : (
                                <EyeIcon className="w-5 h-5" />
                              )}
                            </button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="newPassword">رمز عبور جدید</Label>
                          <div className="relative">
                            <Input
                              id="newPassword"
                              type={showNewPassword ? 'text' : 'password'}
                              value={passwordData.newPassword}
                              onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                            />
                            <button
                              type="button"
                              onClick={() => setShowNewPassword(!showNewPassword)}
                              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            >
                              {showNewPassword ? (
                                <EyeSlashIcon className="w-5 h-5" />
                              ) : (
                                <EyeIcon className="w-5 h-5" />
                              )}
                            </button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">تکرار رمز عبور جدید</Label>
                          <Input
                            id="confirmPassword"
                            type="password"
                            value={passwordData.confirmPassword}
                            onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                          />
                        </div>

                        <Button type="submit">تغییر رمز عبور</Button>
                      </form>
                    </CardContent>
                  </Card>

                  {/* Privacy Settings */}
                  <Card>
                    <CardHeader>
                      <CardTitle>تنظیمات حریم خصوصی</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">نمایش ایمیل</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            نمایش ایمیل در پروفایل عمومی
                          </p>
                        </div>
                        <Switch
                          checked={privacy.showEmail}
                          onCheckedChange={(checked) => handlePrivacyChange('showEmail', checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">نمایش شماره تلفن</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            نمایش شماره تلفن در پروفایل عمومی
                          </p>
                        </div>
                        <Switch
                          checked={privacy.showPhone}
                          onCheckedChange={(checked) => handlePrivacyChange('showPhone', checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">جمع‌آوری داده‌ها</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            اجازه جمع‌آوری داده‌ها برای بهبود خدمات
                          </p>
                        </div>
                        <Switch
                          checked={privacy.dataCollection}
                          onCheckedChange={(checked) => handlePrivacyChange('dataCollection', checked)}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Appearance Tab */}
              {activeTab === 'appearance' && (
                <Card>
                  <CardHeader>
                    <CardTitle>تنظیمات ظاهری</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">حالت تاریک</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          تغییر ظاهر سایت به حالت تاریک یا روشن
                        </p>
                      </div>
                      <Switch
                        checked={theme === 'dark'}
                        onCheckedChange={toggleTheme}
                      />
                    </div>

                    <Separator />

                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-4">پیش‌نمایش تم</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="border-2 border-gray-200 dark:border-gray-700 rounded-lg p-4 cursor-pointer hover:border-green-500 transition-colors">
                          <div className="bg-white rounded-lg p-3 shadow-sm">
                            <div className="h-2 bg-gray-200 rounded mb-2"></div>
                            <div className="h-2 bg-gray-100 rounded w-2/3"></div>
                          </div>
                          <p className="text-center mt-2 text-sm font-medium">حالت روشن</p>
                        </div>
                        <div className="border-2 border-gray-200 dark:border-gray-700 rounded-lg p-4 cursor-pointer hover:border-green-500 transition-colors">
                          <div className="bg-gray-800 rounded-lg p-3 shadow-sm">
                            <div className="h-2 bg-gray-600 rounded mb-2"></div>
                            <div className="h-2 bg-gray-700 rounded w-2/3"></div>
                          </div>
                          <p className="text-center mt-2 text-sm font-medium">حالت تاریک</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}