require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const dummyProduct = {
  slug: "dummy-test",
  name: "Dummy Test Product ($1)",
  mgo: 30,
  price: 1,
  size: "250g",
  activityLevel: 1,
  rating: 5,
  tagline: "Test Payment",
  description: "This is a 1$ dummy product for testing Stripe payment flow.",
  benefits: ["Testing"],
  bestFor: "Testing",
  activity: "Balanced",
  taste: "Mild",
  image: "/assets/products/mgo-30.png",
  color: "#cccccc",
  isActive: true
};

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Product.deleteOne({ slug: "dummy-test" });
    await Product.create(dummyProduct);
    console.log("Dummy product created successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Error creating dummy product:", error);
    process.exit(1);
  }
};

run();
