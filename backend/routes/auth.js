const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'کاربری با این ایمیل قبلاً ثبت نام کرده است' });
    }

    // Create user
    const user = new User({
      name,
      email,
      password,
      phone
    });

    await user.save();

    // Generate token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'ثبت نام با موفقیت انجام شد',
      token,
      user
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'خطا در ثبت نام' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email, isActive: true });
    if (!user) {
      return res.status(401).json({ message: 'ایمیل یا رمز عبور اشتباه است' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'ایمیل یا رمز عبور اشتباه است' });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'ورود با موفقیت انجام شد',
      token,
      user
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'خطا در ورود' });
  }
});

// Get current user
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate('wishlist');
    res.json(user);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'خطا در دریافت اطلاعات کاربر' });
  }
});

// Update profile
router.put('/profile', auth, async (req, res) => {
  try {
    const { name, phone, address } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.userId,
      { name, phone, address },
      { new: true, runValidators: true }
    );

    res.json({
      message: 'پروفایل با موفقیت به‌روزرسانی شد',
      user
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'خطا در به‌روزرسانی پروفایل' });
  }
});

// Change password
router.put('/change-password', auth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    const user = await User.findById(req.userId);
    
    // Check current password
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ message: 'رمز عبور فعلی اشتباه است' });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.json({ message: 'رمز عبور با موفقیت تغییر کرد' });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ message: 'خطا در تغییر رمز عبور' });
  }
});

module.exports = router;