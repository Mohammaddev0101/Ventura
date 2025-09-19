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

    res.status(201).json({
      message: 'سفارش با موفقیت ثبت شد',
      order
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ message: 'خطا در ثبت سفارش' });
  }
});

module.exports = router;