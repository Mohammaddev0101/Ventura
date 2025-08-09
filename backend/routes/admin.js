const express = require('express');
const Product = require('../models/Product');
const Category = require('../models/Category');
const Order = require('../models/Order');
const User = require('../models/User');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

const router = express.Router();

// Apply auth and admin middleware to all routes
router.use(auth);
router.use(adminAuth);

// Dashboard stats
router.get('/stats', async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments({ isActive: true });
    const totalOrders = await Order.countDocuments();
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalRevenue = await Order.aggregate([
      { $match: { orderStatus: { $in: ['delivered', 'shipped'] } } },
      { $group: { _id: null, total: { $sum: '$total' } } }
    ]);

    const recentOrders = await Order.find()
      .populate('user', 'name email')
      .sort('-createdAt')
      .limit(5);

    const topProducts = await Product.find({ isActive: true })
      .sort('-salesCount')
      .limit(5)
      .select('name salesCount price images');

    res.json({
      stats: {
        totalProducts,
        totalOrders,
        totalUsers,
        totalRevenue: totalRevenue[0]?.total || 0
      },
      recentOrders,
      topProducts
    });
  } catch (error) {
    console.error('Get admin stats error:', error);
    res.status(500).json({ message: 'خطا در دریافت آمار' });
  }
});

// Products management
router.get('/products', async (req, res) => {
  try {
    const { page = 1, limit = 20, search, category } = req.query;
    
    const filter = {};
    if (search) {
      filter.$text = { $search: search };
    }
    if (category) {
      filter.category = category;
    }

    const products = await Product.find(filter)
      .populate('category', 'name')
      .sort('-createdAt')
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Product.countDocuments(filter);

    res.json({
      products,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get admin products error:', error);
    res.status(500).json({ message: 'خطا در دریافت محصولات' });
  }
});

// Create product
router.post('/products', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    await product.populate('category', 'name slug');

    res.status(201).json({
      message: 'محصول با موفقیت ایجاد شد',
      product
    });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ message: 'خطا در ایجاد محصول' });
  }
});

// Update product
router.put('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('category', 'name slug');

    if (!product) {
      return res.status(404).json({ message: 'محصول یافت نشد' });
    }

    res.json({
      message: 'محصول با موفقیت به‌روزرسانی شد',
      product
    });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ message: 'خطا در به‌روزرسانی محصول' });
  }
});

// Delete product
router.delete('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'محصول یافت نشد' });
    }

    res.json({ message: 'محصول با موفقیت حذف شد' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ message: 'خطا در حذف محصول' });
  }
});

// Orders management
router.get('/orders', async (req, res) => {
  try {
    const { page = 1, limit = 20, status } = req.query;
    
    const filter = {};
    if (status) {
      filter.orderStatus = status;
    }

    const orders = await Order.find(filter)
      .populate('user', 'name email phone')
      .sort('-createdAt')
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Order.countDocuments(filter);

    res.json({
      orders,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get admin orders error:', error);
    res.status(500).json({ message: 'خطا در دریافت سفارشات' });
  }
});

// Update order status
router.put('/orders/:id/status', async (req, res) => {
  try {
    const { orderStatus, trackingNumber } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { 
        orderStatus,
        ...(trackingNumber && { trackingNumber }),
        ...(orderStatus === 'delivered' && { deliveredAt: new Date() })
      },
      { new: true }
    ).populate('user', 'name email phone');

    if (!order) {
      return res.status(404).json({ message: 'سفارش یافت نشد' });
    }

    res.json({
      message: 'وضعیت سفارش با موفقیت به‌روزرسانی شد',
      order
    });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({ message: 'خطا در به‌روزرسانی وضعیت سفارش' });
  }
});

module.exports = router;