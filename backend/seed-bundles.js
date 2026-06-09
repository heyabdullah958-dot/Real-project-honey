require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const bundleProducts = [
  {
    slug: "mgo-263-pack-3",
    name: "Manuka Honey MGO 263 — Pack of 3",
    mgo: 263,
    price: 114,
    size: "3 × 250g",
    activityLevel: 3,
    rating: 5,
    tagline: "Naturally Concentrated Support — Bundle",
    description: "Pack of 3 mid-range potency jars for targeted wellness and natural support.",
    benefits: ["Natural Support", "Wellness Support", "Bioactive Support"],
    bestFor: "Enhanced Support",
    activity: "High",
    taste: "Medium",
    image: "/assets/products/mgo-263.png",
    color: "#D4930A",
    isActive: true
  },
  {
    slug: "mgo-30-pack-5",
    name: "Manuka Honey MGO 30 — Pack of 5",
    mgo: 30,
    price: 63,
    size: "5 × 250g",
    activityLevel: 1,
    rating: 4,
    tagline: "The Amazing Standard for Daily Use — Bundle",
    description: "Pack of 5 daily wellness jars, mild taste, perfect as a natural sweetener.",
    benefits: ["Daily Wellness", "Natural Energy", "Sugar Substitute"],
    bestFor: "Everyday Use",
    activity: "Balanced",
    taste: "Mild",
    image: "/assets/products/mgo-30.png",
    color: "#C8A96E",
    isActive: true
  },
  {
    slug: "mgo-30-pack-3",
    name: "Manuka Honey MGO 30 — Pack of 3",
    mgo: 30,
    price: 39,
    size: "3 × 250g",
    activityLevel: 1,
    rating: 4,
    tagline: "The Amazing Standard for Daily Use — Bundle",
    description: "Pack of 3 daily wellness jars, mild taste, perfect as a natural sweetener.",
    benefits: ["Daily Wellness", "Natural Energy", "Sugar Substitute"],
    bestFor: "Everyday Use",
    activity: "Balanced",
    taste: "Mild",
    image: "/assets/products/mgo-30.png",
    color: "#C8A96E",
    isActive: true
  },
  {
    slug: "mgo-100-pack-3",
    name: "Manuka Honey MGO 100 — Pack of 3",
    mgo: 100,
    price: 51,
    size: "3 × 250g",
    activityLevel: 2,
    rating: 4,
    tagline: "Premium Reserve Wellness — Bundle",
    description: "Pack of 3 regular wellness support jars, gentle bioactive profile for everyday use.",
    benefits: ["Digestive Wellness", "Wellness Boost", "Daily Maintenance"],
    bestFor: "Gentle Balance",
    activity: "Moderate",
    taste: "Mild-Med",
    image: "/assets/products/mgo-100.png",
    color: "#C49A2A",
    isActive: true
  },
  {
    slug: "mgo-100-pack-5",
    name: "Manuka Honey MGO 100 — Pack of 5",
    mgo: 100,
    price: 82,
    size: "5 × 250g",
    activityLevel: 2,
    rating: 4,
    tagline: "Premium Reserve Wellness — Bundle",
    description: "Pack of 5 regular wellness support jars, gentle bioactive profile for everyday use.",
    benefits: ["Digestive Wellness", "Wellness Boost", "Daily Maintenance"],
    bestFor: "Gentle Balance",
    activity: "Moderate",
    taste: "Mild-Med",
    image: "/assets/products/mgo-100.png",
    color: "#C49A2A",
    isActive: true
  }
];

const seedBundles = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB for seeding bundles...');

    await Product.deleteMany({ slug: { $in: ["mgo-263-pack-3", "mgo-30-pack-5", "mgo-30-pack-3", "mgo-100-pack-3", "mgo-100-pack-5"] } });

    await Product.insertMany(bundleProducts);
    console.log('🌱 5 bundle products seeded successfully.');

    mongoose.connection.close();
    console.log('🔌 Database connection closed.');
    process.exit(0);
  } catch (error) {
    console.error(`❌ Seeding failed: ${error.message}`);
    process.exit(1);
  }
};

seedBundles();
