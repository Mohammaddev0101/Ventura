const express = require('express');
const Product = require('../models/Product');
const Category = require('../models/Category');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

const router = express.Router();

// Get all products with filtering and pagination
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      category,
      brand,
      minPrice,
      maxPrice,
      search,
      sort = '-createdAt',
      featured,
      popular
    } = req.query;

    // Build filter object
    const filter = { isActive: true };

    if (category) {
      const categoryDoc = await Category.findOne({ slug: category });
      if (categoryDoc) {
        filter.category = categoryDoc._id;
      }
    }

    if (brand) {
      filter.brand = new RegExp(brand, 'i');
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    if (search) {
      filter.$text = { $search: search };
    }

    if (featured === 'true') {
      filter.isFeatured = true;
    }

    if (popular === 'true') {
      filter.isPopular = true;
    }

    // Execute query
    const products = await Product.find(filter)
      .populate('category', 'name slug')
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-reviews');

    const total = await Product.countDocuments(filter);

    res.json({
      products,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ message: 'خطا در دریافت محصولات' });
  }
});

// Get single product
router.get('/:slug', async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug, isActive: true })
      .populate('category', 'name slug')
      .populate('reviews.user', 'name avatar');

    if (!product) {
      return res.status(404).json({ message: 'محصول یافت نشد' });
    }

    // Increment view count
    product.viewCount += 1;
    await product.save();

    res.json(product);
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ message: 'خطا در دریافت محصول' });
  }
});

// Add product review
router.post('/:id/reviews', auth, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'محصول یافت نشد' });
    }

    // Check if user already reviewed
    const existingReview = product.reviews.find(
      review => review.user.toString() === req.userId
    );

    if (existingReview) {
      return res.status(400).json({ message: 'شما قبلاً این محصول را نظر داده‌اید' });
    }

    // Add review
    product.reviews.push({
      user: req.userId,
      rating,
      comment
    });

    // Update rating
    product.updateRating();
    await product.save();

    await product.populate('reviews.user', 'name avatar');

    res.status(201).json({
      message: 'نظر شما با موفقیت ثبت شد',
      reviews: product.reviews
    });
  } catch (error) {
    console.error('Add review error:', error);
    res.status(500).json({ message: 'خطا در ثبت نظر' });
  }
});

// Get related products
router.get('/:id/related', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'محصول یافت نشد' });
    }

    const relatedProducts = await Product.find({
      _id: { $ne: product._id },
      category: product.category,
      isActive: true
    })
    .populate('category', 'name slug')
    .limit(4)
    .select('-reviews');

    res.json(relatedProducts);
  } catch (error) {
    console.error('Get related products error:', error);
    res.status(500).json({ message: 'خطا در دریافت محصولات مرتبط' });
  }
});

module.exports = router;