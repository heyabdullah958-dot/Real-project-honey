const User = require('../models/User');

const authorize = (...roles) => {
  return async (req, res, next) => {
    try {
      // Find user from db using req.user.id populated by verifyToken middleware
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found.' });
      }

      if (!roles.includes(user.role)) {
        return res.status(403).json({ success: false, message: 'Forbidden. Access is restricted.' });
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = authorize;
