require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const products = [
  {
    slug: "mgo-30",
    name: "Manuka Honey MGO 30",
    mgo: 30,
    price: 14,
    size: "250g",
    activityLevel: 1,
    rating: 4,
    tagline: "The Amazing Standard for Daily Use",
    description: "Daily wellness, mild taste, perfect as a natural sweetener.",
    benefits: ["Daily Wellness", "Natural Energy", "Sugar Substitute"],
    bestFor: "Everyday Use",
    activity: "Balanced",
    taste: "Mild",
    image: "/assets/products/mgo-30.png",
    color: "#C8A96E",
    isActive: true
  },
  {
    slug: "mgo-100",
    name: "Manuka Honey MGO 100",
    mgo: 100,
    price: 18,
    size: "250g",
    activityLevel: 2,
    rating: 4,
    tagline: "Premium Reserve Wellness",
    description: "Regular wellness support, gentle bioactive profile for everyday use.",
    benefits: ["Digestive Wellness", "Wellness Boost", "Daily Maintenance"],
    bestFor: "Gentle Balance",
    activity: "Moderate",
    taste: "Mild-Med",
    image: "/assets/products/mgo-100.png",
    color: "#C49A2A",
    isActive: true
  },
  {
    slug: "mgo-263",
    name: "Manuka Honey MGO 263",
    mgo: 263,
    price: 40,
    size: "250g",
    activityLevel: 3,
    rating: 5,
    tagline: "Naturally Concentrated Support",
    description: "Mid-range potency for targeted wellness and natural support.",
    benefits: ["Natural Support", "Wellness Support", "Bioactive Support"],
    bestFor: "Enhanced Support",
    activity: "High",
    taste: "Medium",
    image: "/assets/products/mgo-263.png",
    color: "#D4930A",
    isActive: true
  },
  {
    slug: "mgo-400",
    name: "Manuka Honey MGO 400",
    mgo: 400,
    price: 70,
    size: "250g",
    activityLevel: 4,
    rating: 5,
    tagline: "Dynamic Natural Activity",
    description: "High-activity reserve grade, ideal for intensive daily wellness routines.",
    benefits: ["Skin Wellness", "Intensive Wellness Support", "Natural Support"],
    bestFor: "Intensive Support",
    activity: "Very High",
    taste: "Strong",
    image: "/assets/products/mgo-400.png",
    color: "#B87800",
    isActive: true
  },
  {
    slug: "mgo-800",
    name: "Manuka Honey MGO 800",
    mgo: 800,
    price: 160,
    size: "250g",
    activityLevel: 5,
    rating: 5,
    tagline: "Liquid Gold Reserve",
    description: "Our most potent reserve, exceptional bioactive concentration for serious wellness focus.",
    benefits: ["Advanced Wellness", "Max Bio-Activity", "Premium Support"],
    bestFor: "Targeted Support",
    activity: "Ultimate",
    taste: "Rich",
    image: "/assets/products/mgo-800.png",
    color: "#9B6500",
    isActive: true
  },
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

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB for seeding...');

    await Product.deleteMany({});
    console.log('🗑️ Existing products deleted.');

    await Product.insertMany(products);
    console.log('🌱 10 products (including 5 bundles) seeded successfully.');

    mongoose.connection.close();
    console.log('🔌 Database connection closed.');
    process.exit(0);
  } catch (error) {
    console.error(`❌ Seeding failed: ${error.message}`);
    process.exit(1);
  }
};

seedProducts();
