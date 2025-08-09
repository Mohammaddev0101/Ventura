const express = require('express');
const Order = require('../models/Order');
const Product = require('../models/Product');
const auth = require('../middleware/auth');

const router = express.Router();

// Create order
router.post('/', auth, async (req, res) => {
  try {
    const {
      items,
      shippingAddress,
      billingAddress,
      paymentMethod,
      notes
    } = req.body;

    // Validate items and calculate totals
    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product || !product.isActive) {
        return res.status(400).json({ message: `محصول ${item.name} موجود نیست` });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({ 
          message: `موجودی محصول ${product.name} کافی نیست` 
        });
      }

      const itemTotal = product.price * item.quantity;
      subtotal += itemTotal;

      orderItems.push({
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        image: product.images[0]?.url || '',
        sku: product.sku
      });
    }

    // Calculate shipping and total
    const shippingCost = subtotal > 500000 ? 0 : 50000; // Free shipping over 500k
    const tax = Math.round(subtotal * 0.09); // 9% tax
    const total = subtotal + shippingCost + tax;

    // Create order
    const order = new Order({
      user: req.userId,
      items: orderItems,
      shippingAddress,
      billingAddress: billingAddress || shippingAddress,
      paymentMethod,
      subtotal,
      shippingCost,
      tax,
      total,
      notes
    });

    await order.save();

    // Update product stock and sales count
    for (const item of items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: {
          stock: -item.quantity,
          salesCount: item.quantity
        }
      });
    }

    await order.populate('user', 'name email phone');

    res.status(201).json({
      message: 'سفارش با موفقیت ثبت شد',
      order
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ message: 'خطا در ثبت سفارش' });
  }
});

// Get user orders
router.get('/my-orders', auth, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const orders = await Order.find({ user: req.userId })
      .populate('items.product', 'name images slug')
      .sort('-createdAt')
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Order.countDocuments({ user: req.userId });

    res.json({
      orders,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get user orders error:', error);
    res.status(500).json({ message: 'خطا در دریافت سفارشات' });
  }
});

// Get single order
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.userId
    })
    .populate('items.product', 'name images slug')
    .populate('user', 'name email phone');

    if (!order) {
      return res.status(404).json({ message: 'سفارش یافت نشد' });
    }

    res.json(order);
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ message: 'خطا در دریافت سفارش' });
  }
});

// Cancel order
router.put('/:id/cancel', auth, async (req, res) => {
  try {
    const { cancelReason } = req.body;

    const order = await Order.findOne({
      _id: req.params.id,
      user: req.userId
    });

    if (!order) {
      return res.status(404).json({ message: 'سفارش یافت نشد' });
    }

    if (!['pending', 'confirmed'].includes(order.orderStatus)) {
      return res.status(400).json({ message: 'امکان لغو این سفارش وجود ندارد' });
    }

    // Update order status
    order.orderStatus = 'cancelled';
    order.cancelledAt = new Date();
    order.cancelReason = cancelReason;
    await order.save();

    // Restore product stock
    for (const item of order.items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: {
          stock: item.quantity,
          salesCount: -item.quantity
        }
      });
    }

    res.json({
      message: 'سفارش با موفقیت لغو شد',
      order
    });
  } catch (error) {
    console.error('Cancel order error:', error);
    res.status(500).json({ message: 'خطا در لغو سفارش' });
  }
});

module.exports = router;