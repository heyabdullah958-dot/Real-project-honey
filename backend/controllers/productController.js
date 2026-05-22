const Product = require('../models/Product');

// @desc    Get all active products
// @route   GET /api/products
// @access  Public
exports.getAll = async (req, res, next) => {
  try {
    const products = await Product.find({ isActive: true });
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single product by slug
// @route   GET /api/products/:slug
// @access  Public
exports.getBySlug = async (req, res, next) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug, isActive: true });
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found.' });
    }
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new product
// @route   POST /api/products
// @access  Private (Admin)
exports.create = async (req, res, next) => {
  try {
    const {
      slug, name, mgo, price, size, activityLevel, rating,
      tagline, description, benefits, bestFor, activity, taste, image, color
    } = req.body;

    // Check unique slug
    const slugExists = await Product.findOne({ slug });
    if (slugExists) {
      return res.status(409).json({ success: false, message: 'Product with this slug already exists.' });
    }

    const product = await Product.create({
      slug, name, mgo, price, size, activityLevel, rating,
      tagline, description, benefits, bestFor, activity, taste, image, color
    });

    res.status(201).json({ success: true, message: 'Product created successfully.', data: product });
  } catch (error) {
    next(error);
  }
};

// @desc    Update product by slug
// @route   PUT /api/products/:slug
// @access  Private (Admin)
exports.update = async (req, res, next) => {
  try {
    const product = await Product.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found.' });
    }

    res.status(200).json({ success: true, message: 'Product updated successfully.', data: product });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete product (soft delete)
// @route   DELETE /api/products/:slug
// @access  Private (Admin)
exports.remove = async (req, res, next) => {
  try {
    const product = await Product.findOneAndUpdate(
      { slug: req.params.slug },
      { isActive: false },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found.' });
    }

    res.status(200).json({ success: true, message: 'Product deleted successfully.' });
  } catch (error) {
    next(error);
  }
};

const fs = require('fs');
const path = require('path');

// @desc    Upload product image (Base64)
// @route   POST /api/products/upload
// @access  Private (Admin)
exports.uploadImage = async (req, res, next) => {
  try {
    const { image } = req.body;
    if (!image) {
      return res.status(400).json({ success: false, message: 'No image data provided.' });
    }

    const matches = image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return res.status(400).json({ success: false, message: 'Invalid image format. Must be a base64 Data URL.' });
    }

    const mimeType = matches[1];
    const base64Data = matches[2];
    const buffer = Buffer.from(base64Data, 'base64');

    if (buffer.length > 5 * 1024 * 1024) {
      return res.status(400).json({ success: false, message: 'Image size exceeds the 5MB limit.' });
    }

    let extension = 'png';
    if (mimeType.includes('jpeg') || mimeType.includes('jpg')) {
      extension = 'jpg';
    } else if (mimeType.includes('webp')) {
      extension = 'webp';
    } else if (mimeType.includes('gif')) {
      extension = 'gif';
    }

    const filename = `product-${Date.now()}-${Math.round(Math.random() * 1e9)}.${extension}`;
    const filepath = path.join(__dirname, '../uploads', filename);

    fs.writeFileSync(filepath, buffer);

    const fileUrl = `/uploads/${filename}`;

    res.status(200).json({
      success: true,
      message: 'Image uploaded successfully.',
      data: { url: fileUrl }
    });
  } catch (error) {
    next(error);
  }
};
