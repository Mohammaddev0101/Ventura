const express = require('express');
const User = require('../models/User');
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

module.exports = router;