const express = require('express');
const Category = require('../models/Category');

const router = express.Router();

// Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true })
      .populate('parent', 'name slug')
      .sort('sortOrder name');

    res.json(categories);
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ message: 'خطا در دریافت دسته‌بندی‌ها' });
  }
});

// Get category by slug
router.get('/:slug', async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug, isActive: true })
      .populate('parent', 'name slug');

    if (!category) {
      return res.status(404).json({ message: 'دسته‌بندی یافت نشد' });
    }

    res.json(category);
  } catch (error) {
    console.error('Get category error:', error);
    res.status(500).json({ message: 'خطا در دریافت دسته‌بندی' });
  }
});

module.exports = router;