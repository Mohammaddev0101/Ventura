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

    // Create admin user
    const admin = new User({
      name: 'مدیر سیستم',
      email: 'admin@ventura.com',
      password: 'admin123',
      role: 'admin'
    });
    await admin.save();
    console.log('Admin user created');

    // Create categories
    const categories = [
      {
        name: 'چادر و سرپناه',
        description: 'انواع چادر و تجهیزات سرپناه',
        icon: '🏕️'
      },
      {
        name: 'کیسه خواب',
        description: 'کیسه خواب برای فصول مختلف',
        icon: '🛏️'
      },
      {
        name: 'کوله پشتی',
        description: 'کوله پشتی و کیف سفر',
        icon: '🎒'
      },
      {
        name: 'تجهیزات آشپزی',
        description: 'وسایل آشپزی و غذاخوری',
        icon: '🍳'
      },
      {
        name: 'روشنایی',
        description: 'چراغ قوه و تجهیزات روشنایی',
        icon: '🔦'
      },
      {
        name: 'لوازم جانبی',
        description: 'سایر تجهیزات مورد نیاز',
        icon: '🧰'
      }
    ];

    const createdCategories = await Category.insertMany(categories);
    console.log('Categories created');

    // Create products
    const products = [
      {
        name: 'چادر کوهنوردی ۲ نفره',
        description: 'چادر مقاوم و سبک مناسب برای کوهنوردی و کمپینگ. ساخته شده از مواد با کیفیت و ضد آب.',
        shortDescription: 'چادر مقاوم ۲ نفره مناسب کوهنوردی',
        price: 1299000,
        originalPrice: 1599000,
        discount: 19,
        category: createdCategories[0]._id,
        brand: 'Coleman',
        images: [
          { url: 'https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg', alt: 'چادر کوهنوردی', isPrimary: true }
        ],
        specifications: [
          { name: 'ظرفیت', value: '۲ نفر' },
          { name: 'وزن', value: '۲.۵ کیلوگرم' },
          { name: 'مقاومت آب', value: '۳۰۰۰ میلی‌متر' }
        ],
        features: ['ضد آب', 'سبک وزن', 'نصب آسان', 'مقاوم در برابر باد'],
        stock: 15,
        sku: 'TENT-001',
        weight: 2.5,
        isActive: true,
        isFeatured: true,
        isPopular: true,
        tags: ['چادر', 'کوهنوردی', 'کمپینگ']
      },
      {
        name: 'کیسه خواب زمستانی',
        description: 'کیسه خواب گرم مناسب برای فصل زمستان و دماهای پایین تا منفی ۱۰ درجه.',
        shortDescription: 'کیسه خواب گرم مناسب زمستان',
        price: 899000,
        originalPrice: 1099000,
        discount: 18,
        category: createdCategories[1]._id,
        brand: 'North Face',
        images: [
          { url: 'https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg', alt: 'کیسه خواب زمستانی', isPrimary: true }
        ],
        specifications: [
          { name: 'دمای راحتی', value: '-۵ درجه سانتیگراد' },
          { name: 'دمای حداقل', value: '-۱۰ درجه سانتیگراد' },
          { name: 'وزن', value: '۱.۸ کیلوگرم' }
        ],
        features: ['عایق حرارتی عالی', 'قابل شستشو', 'فشرده شدنی', 'زیپ دو طرفه'],
        stock: 20,
        sku: 'SLEEP-001',
        weight: 1.8,
        isActive: true,
        isFeatured: true,
        tags: ['کیسه خواب', 'زمستان', 'گرم']
      },
      {
        name: 'کوله پشتی ۵۰ لیتری',
        description: 'کوله پشتی حرفه‌ای با ظرفیت ۵۰ لیتر مناسب برای سفرهای چند روزه.',
        shortDescription: 'کوله پشتی ۵۰ لیتری حرفه‌ای',
        price: 1599000,
        originalPrice: 1899000,
        discount: 16,
        category: createdCategories[2]._id,
        brand: 'Deuter',
        images: [
          { url: 'https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg', alt: 'کوله پشتی', isPrimary: true }
        ],
        specifications: [
          { name: 'ظرفیت', value: '۵۰ لیتر' },
          { name: 'وزن', value: '۲.۲ کیلوگرم' },
          { name: 'ابعاد', value: '۷۰ × ۳۵ × ۲۵ سانتی‌متر' }
        ],
        features: ['سیستم تهویه پشت', 'جیب‌های متعدد', 'بند کمری', 'پوشش باران'],
        stock: 12,
        sku: 'BACK-001',
        weight: 2.2,
        isActive: true,
        isPopular: true,
        tags: ['کوله پشتی', 'سفر', 'کوهنوردی']
      },
      {
        name: 'اجاق گاز پرتابل',
        description: 'اجاق گاز کوچک و قابل حمل مناسب برای آشپزی در طبیعت.',
        shortDescription: 'اجاق گاز کوچک قابل حمل',
        price: 459000,
        originalPrice: 529000,
        discount: 13,
        category: createdCategories[3]._id,
        brand: 'Jetboil',
        images: [
          { url: 'https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg', alt: 'اجاق گاز', isPrimary: true }
        ],
        specifications: [
          { name: 'قدرت', value: '۳۵۰۰ وات' },
          { name: 'وزن', value: '۴۵۰ گرم' },
          { name: 'نوع سوخت', value: 'کپسول گاز' }
        ],
        features: ['سبک وزن', 'شعله قابل تنظیم', 'پایه‌های تاشو', 'ایمن'],
        stock: 25,
        sku: 'STOVE-001',
        weight: 0.45,
        isActive: true,
        tags: ['اجاق گاز', 'آشپزی', 'پرتابل']
      },
      {
        name: 'چراغ قوه LED قابل شارژ',
        description: 'چراغ قوه قدرتمند با باتری قابل شارژ و نور بالا.',
        shortDescription: 'چراغ قوه LED با باتری قابل شارژ',
        price: 189000,
        originalPrice: 229000,
        discount: 17,
        category: createdCategories[4]._id,
        brand: 'Fenix',
        images: [
          { url: 'https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg', alt: 'چراغ قوه', isPrimary: true }
        ],
        specifications: [
          { name: 'قدرت نور', value: '۱۰۰۰ لومن' },
          { name: 'مدت روشنایی', value: '۱۲ ساعت' },
          { name: 'نوع باتری', value: 'لیتیوم یون قابل شارژ' }
        ],
        features: ['ضد آب', 'قابل شارژ', 'چند حالت نور', 'مقاوم'],
        stock: 30,
        sku: 'LIGHT-001',
        weight: 0.2,
        isActive: true,
        isPopular: true,
        tags: ['چراغ قوه', 'روشنایی', 'قابل شارژ']
      },
      {
        name: 'صندلی تاشو کمپینگ',
        description: 'صندلی راحت و سبک قابل حمل برای استراحت در طبیعت.',
        shortDescription: 'صندلی تاشو راحت کمپینگ',
        price: 329000,
        originalPrice: 399000,
        discount: 18,
        category: createdCategories[5]._id,
        brand: 'Helinox',
        images: [
          { url: 'https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg', alt: 'صندلی کمپینگ', isPrimary: true }
        ],
        specifications: [
          { name: 'ظرفیت وزن', value: '۱۲۰ کیلوگرم' },
          { name: 'وزن', value: '۱.۲ کیلوگرم' },
          { name: 'ابعاد', value: '۵۵ × ۶۵ × ۹۰ سانتی‌متر' }
        ],
        features: ['سبک وزن', 'تاشو', 'راحت', 'مقاوم'],
        stock: 18,
        sku: 'CHAIR-001',
        weight: 1.2,
        isActive: true,
        tags: ['صندلی', 'کمپینگ', 'تاشو']
      },
      {
        name: 'دوربین شکاری ۸x۲۵',
        description: 'دوربین دوچشمی با کیفیت بالا مناسب برای رصد طبیعت و شکار.',
        shortDescription: 'دوربین شکاری با کیفیت بالا',
        price: 759000,
        originalPrice: 899000,
        discount: 16,
        category: createdCategories[5]._id,
        brand: 'Bushnell',
        images: [
          { url: 'https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg', alt: 'دوربین شکاری', isPrimary: true }
        ],
        specifications: [
          { name: 'بزرگنمایی', value: '۸ برابر' },
          { name: 'قطر عدسی', value: '۲۵ میلی‌متر' },
          { name: 'میدان دید', value: '۱۲۶ متر در ۱۰۰۰ متر' }
        ],
        features: ['لنز با پوشش چندلایه', 'ضد آب', 'مقاوم', 'کیف حمل'],
        stock: 8,
        sku: 'BINO-001',
        weight: 0.6,
        isActive: true,
        isPopular: true,
        tags: ['دوربین', 'شکار', 'رصد']
      },
      {
        name: 'عینک آفتابی کوهنوردی',
        description: 'عینک آفتابی با محافظت UV مناسب برای کوهنوردی و ورزش‌های کوهستانی.',
        shortDescription: 'عینک آفتابی ورزشی با محافظت UV',
        price: 149000,
        originalPrice: 189000,
        discount: 21,
        category: createdCategories[5]._id,
        brand: 'Oakley',
        images: [
          { url: 'https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg', alt: 'عینک آفتابی', isPrimary: true }
        ],
        specifications: [
          { name: 'محافظت UV', value: '۱۰۰٪' },
          { name: 'وزن', value: '۳۰ گرم' },
          { name: 'جنس فریم', value: 'پلاستیک مقاوم' }
        ],
        features: ['ضد خش', 'سبک وزن', 'طراحی ورزشی', 'محافظت کامل'],
        stock: 22,
        sku: 'GLASS-001',
        weight: 0.03,
        isActive: true,
        tags: ['عینک', 'آفتابی', 'کوهنوردی']
      }
    ];

    await Product.insertMany(products);
    console.log('Products created');

    console.log('Seed data completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedData();