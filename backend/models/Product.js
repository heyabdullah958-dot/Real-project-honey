const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  slug:          { type: String, required: true, unique: true },
  name:          { type: String, required: true },
  mgo:           { type: Number, required: true },
  price:         { type: Number, required: true },
  size:          { type: String, default: '250g' },
  activityLevel: { type: Number, min: 1, max: 5 },
  rating:        { type: Number, min: 1, max: 5 },
  tagline:       { type: String },
  description:   { type: String },
  benefits:      [{ type: String }],
  bestFor:       { type: String },
  activity:      { type: String },
  taste:         { type: String },
  image:         { type: String },
  color:         { type: String },
  parentSlug:    { type: String },
  isActive:      { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
