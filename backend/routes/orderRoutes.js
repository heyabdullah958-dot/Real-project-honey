const express = require('express');
const { body } = require('express-validator');
const { create, getAll, getById, updateStatus } = require('../controllers/orderController');
const { verifyToken } = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const validate = require('../middleware/validate');

const router = express.Router();

const orderRules = [
  body('fullName').trim().notEmpty().withMessage('Full name is required.'),
  body('whatsapp').trim().notEmpty().withMessage('WhatsApp number is required.'),
  body('city').trim().notEmpty().withMessage('City is required.'),
  body('address').trim().notEmpty().withMessage('Detailed shipping address is required.'),
  body('items').isArray({ min: 1 }).withMessage('At least one item must be in the order.'),
  body('totalAmount').isNumeric().withMessage('Total amount must be a number.')
];

// Public route to place order
router.post('/', orderRules, validate, create);

// Protected routes (Admin only)
router.get('/', verifyToken, authorize('admin'), getAll);
router.get('/:orderId', verifyToken, authorize('admin'), getById);
router.patch('/:orderId', verifyToken, authorize('admin'), [
  body('status').isIn(['pending', 'confirmed', 'shipped', 'delivered', 'cancelled']).withMessage('Invalid order status.')
], validate, updateStatus);

module.exports = router;
