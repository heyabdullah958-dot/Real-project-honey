const express = require('express');
const { body } = require('express-validator');
const { getAll, getBySlug, create, update, remove, uploadImage } = require('../controllers/productController');
const { verifyToken } = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const validate = require('../middleware/validate');

const router = express.Router();

const productRules = [
  body('slug').trim().notEmpty().withMessage('Slug is required.'),
  body('name').trim().notEmpty().withMessage('Product name is required.'),
  body('mgo').isNumeric().withMessage('MGO level must be a number.'),
  body('price').isNumeric().withMessage('Price must be a number.')
];

router.get('/', getAll);
router.get('/:slug', getBySlug);

// Protected routes (Admin only)
router.post('/upload', verifyToken, authorize('admin'), uploadImage);
router.post('/', verifyToken, authorize('admin'), productRules, validate, create);
router.put('/:slug', verifyToken, authorize('admin'), update);
router.delete('/:slug', verifyToken, authorize('admin'), remove);

module.exports = router;
