const express = require('express');
const { body } = require('express-validator');
const { register, login, refresh, logout, getProfile } = require('../controllers/authController');
const { verifyToken } = require('../middleware/auth');
const validate = require('../middleware/validate');

const router = express.Router();

const registerRules = [
  body('fullName').trim().notEmpty().withMessage('Full name is required.'),
  body('email').trim().toLowerCase().isEmail().withMessage('Please provide a valid email.'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.')
];

const loginRules = [
  body('email').trim().toLowerCase().isEmail().withMessage('Please provide a valid email.'),
  body('password').notEmpty().withMessage('Password is required.')
];

router.post('/register', registerRules, validate, register);
router.post('/login', loginRules, validate, login);
router.post('/refresh', refresh);
router.post('/logout', logout);
router.get('/profile', verifyToken, getProfile);

module.exports = router;
