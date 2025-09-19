const mongoose = require('mongoose');
const User = require('../models/User');
const Category = require('../models/Category');
const Product = require('../models/Product');
require('dotenv').config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ventura_store');
    
    // Clear existing data
    await User.deleteMany({});
    await Category.deleteMany({});
    await Product.deleteMany({});

    console.log('Cleared existing data');

    // Create 30 users
    const users = [];
    for (let i = 1; i <= 30; i++) {
      users.push({
        name: `کاربر ${i}`,
        email: `user${i}@example.com`,
        password: '1234',
        phone: `0912345${String(i).padStart(4, '0')}`,
        role: i === 1 ? 'admin' : 'user',
        address: {
          street: `خیابان ${i}`,
          city: 'تهران',
          state: 'تهران',
          zipCode: `1234${String(i).padStart(2, '0')}`,
          country: 'Iran'
        }
      });
    }
    
    const createdUsers = await User.insertMany(users);
    console.log('30 users created');

    // Create 30 categories
    const categories = [];
    const categoryNames = [
      'چادر و سرپناه', 'کیسه خواب', 'کوله پشتی', 'تجهیزات آشپزی', 'روشنایی',
      'لوازم جانبی', 'صندلی و میز', 'ابزار و تجهیزات', 'پوشاک کوهنوردی', 'کفش کوهنوردی',
      'تجهیزات ایمنی', 'طناب و بند', 'کمپاس و ناوبری', 'تجهیزات آب', 'غذای کوهنوردی',
      'داروی اولیه', 'تجهیزات عکاسی', 'باتری و شارژر', 'تجهیزات ماهیگیری', 'تجهیزات شکار',
      'دوربین و دوچشمی', 'تجهیزات نجوم', 'ورزش‌های آبی', 'دوچرخه سواری', 'اسکی و برف',
      'کایاک و قایق', 'تجهیزات صخره نوردی', 'پاراگلایدر', 'موتور سیکلت', 'ماشین‌های آفرود'
    ];

    for (let i = 0; i < 30; i++) {
      categories.push({
        name: categoryNames[i],
        description: `دسته‌بندی ${categoryNames[i]} شامل انواع تجهیزات مربوطه`,
        icon: '🏕️'
      });
    }

    const createdCategories = await Category.insertMany(categories);
    console.log('30 categories created');

    // Create 30 products
    const products = [];
    const productNames = [
      'چادر کوهنوردی ۲ نفره', 'کیسه خواب زمستانی', 'کوله پشتی ۵۰ لیتری', 'اجاق گاز پرتابل',
      'چراغ قوه LED قابل شارژ', 'صندلی تاشو کمپینگ', 'میز تاشو آلومینیومی', 'چاقوی چندکاره',
      'کاپشن کوهنوردی', 'کفش کوهنوردی مردانه', 'کلاه ایمنی', 'طناب کوهنوردی ۱۰ متری',
      'قطب نما دیجیتال', 'بطری آب ۱ لیتری', 'غذای خشک کوهنوردی', 'کیت کمک‌های اولیه',
      'دوربین ورزشی', 'پاور بانک خورشیدی', 'قلاب ماهیگیری', 'تیر و کمان شکاری',
      'دوربین شکاری ۸x۲۵', 'تلسکوپ قابل حمل', 'لباس غواصی', 'دوچرخه کوهستان', 'اسکی آلپاین',
      'کایاک تک نفره', 'هارنس صخره نوردی', 'چتر پاراگلایدر', 'موتور تریل', 'جیپ آفرود'
    ];

    for (let i = 0; i < 30; i++) {
      const basePrice = Math.floor(Math.random() * 2000000) + 100000;
      const discount = Math.floor(Math.random() * 30);
      const originalPrice = Math.floor(basePrice / (1 - discount / 100));

      products.push({
        name: productNames[i],
        description: `${productNames[i]} با کیفیت بالا و مناسب برای استفاده در طبیعت. این محصول دارای ویژگی‌های منحصر به فرد و کاربردی است که آن را به انتخابی ایده‌آل برای علاقه‌مندان به طبیعت‌گردی تبدیل می‌کند.`,
        shortDescription: `${productNames[i]} با کیفیت بالا`,
        price: basePrice,
        originalPrice: originalPrice,
        discount: discount,
        category: createdCategories[i]._id,
        brand: ['Coleman', 'North Face', 'Deuter', 'Jetboil', 'Fenix', 'Helinox'][Math.floor(Math.random() * 6)],
        images: [
          { url: 'https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg', alt: productNames[i], isPrimary: true }
        ],
        specifications: [
          { name: 'وزن', value: `${Math.floor(Math.random() * 5) + 1} کیلوگرم` },
          { name: 'ابعاد', value: `${Math.floor(Math.random() * 50) + 20} × ${Math.floor(Math.random() * 30) + 10} سانتی‌متر` },
          { name: 'مواد', value: 'آلومینیوم و پلاستیک مقاوم' }
        ],
        features: ['مقاوم', 'سبک وزن', 'قابل حمل', 'کیفیت بالا'],
        stock: Math.floor(Math.random() * 50) + 5,
        sku: `VNT-${String(i + 1).padStart(3, '0')}`,
        weight: Math.random() * 5 + 0.5,
        isActive: true,
        isFeatured: Math.random() > 0.7,
        isPopular: Math.random() > 0.6,
        tags: ['کمپینگ', 'طبیعت‌گردی', 'کوهنوردی'],
        rating: {
          average: Math.random() * 2 + 3, // 3-5 stars
          count: Math.floor(Math.random() * 200) + 10
        }
      });
    }

    await Product.insertMany(products);
    console.log('30 products created');

    console.log('Seed data completed successfully!');
    console.log('Admin user: user1@example.com / 1234');
    console.log('Regular users: user2@example.com to user30@example.com / 1234');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedData();