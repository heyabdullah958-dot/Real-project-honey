const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  productId: { type: String },
  name:      { type: String, required: true },
  quantity:  { type: Number, required: true, min: 1 },
  price:     { type: Number, required: true }
}, { _id: false });

const orderSchema = new mongoose.Schema({
  orderId:     { type: String, required: true, unique: true },
  fullName:    { type: String, required: true },
  whatsapp:    { type: String, required: true },
  email:       { type: String },
  city:        { type: String, required: true },
  address:     { type: String, required: true },
  items:       [orderItemSchema],
  totalAmount: { type: Number, required: true },
  orderNote:   { type: String, default: '' },
  status:      {
    type: String,
    enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  emailSent:   { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
