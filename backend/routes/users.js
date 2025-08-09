const express = require('express');
const User = require('../models/User');
const Product = require('../models/Product');
const auth = require('../middleware/auth');

const router = express.Router();

// Add to wishlist
router.post('/wishlist/:productId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const productId = req.params.productId;

    if (user.wishlist.includes(productId)) {
      return res.status(400).json({ message: 'محصول قبلاً به علاقه‌مندی‌ها اضافه شده' });
    }

    user.wishlist.push(productId);
    await user.save();

    res.json({ message: 'محصول به علاقه‌مندی‌ها اضافه شد' });
  } catch (error) {
    console.error('Add to wishlist error:', error);
    res.status(500).json({ message: 'خطا در افزودن به علاقه‌مندی‌ها' });
  }
});

// Remove from wishlist
router.delete('/wishlist/:productId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const productId = req.params.productId;

    user.wishlist = user.wishlist.filter(id => id.toString() !== productId);
    await user.save();

    res.json({ message: 'محصول از علاقه‌مندی‌ها حذف شد' });
  } catch (error) {
    console.error('Remove from wishlist error:', error);
    res.status(500).json({ message: 'خطا در حذف از علاقه‌مندی‌ها' });
  }
});

// Get wishlist
router.get('/wishlist', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate({
      path: 'wishlist',
      populate: {
        path: 'category',
        select: 'name slug'
      }
    });

    res.json(user.wishlist);
  } catch (error) {
    console.error('Get wishlist error:', error);
    res.status(500).json({ message: 'خطا در دریافت علاقه‌مندی‌ها' });
  }
});

module.exports = router;