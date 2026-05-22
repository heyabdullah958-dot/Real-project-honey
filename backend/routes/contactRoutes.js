const express = require('express');
const { body } = require('express-validator');
const { create, getAll, markAsRead } = require('../controllers/contactController');
const { verifyToken } = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const validate = require('../middleware/validate');

const router = express.Router();

const contactRules = [
  body('name').trim().notEmpty().withMessage('Name is required.'),
  body('email').isEmail().withMessage('Please provide a valid email.').normalizeEmail(),
  body('subject').trim().notEmpty().withMessage('Subject is required.'),
  body('message').trim().notEmpty().withMessage('Message is required.')
];

// Public route to submit contact inquiry
router.post('/', contactRules, validate, create);

// Protected routes (Admin only)
router.get('/', verifyToken, authorize('admin'), getAll);
router.patch('/:id', verifyToken, authorize('admin'), markAsRead);

module.exports = router;
