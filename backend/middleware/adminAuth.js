const adminAuth = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'دسترسی محدود - فقط ادمین' });
  }
  next();
};

module.exports = adminAuth;