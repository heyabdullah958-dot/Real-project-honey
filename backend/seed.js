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
    tagline: "The Gold Standard for Daily Use",
    description: "Entry-level Manuka honey for daily use and natural wellness. Ethically harvested Australian Manuka honey with a premium bioactive profile based on MGO level.",
    benefits: ["Daily Wellness", "Natural Energy", "Sugar Substitute"],
    bestFor: "Daily Use",
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
    description: "Moderate strength Manuka honey suitable for regular wellness support. Ethically harvested Australian Manuka honey with a premium bioactive profile based on MGO level.",
    benefits: ["Digestive Wellness", "Wellness Boost", "Daily Maintenance"],
    bestFor: "Wellness",
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
    description: "Ethically harvested Australian Manuka honey with a premium bioactive profile based on MGO level. Ideal for targeted wellness and natural support.",
    benefits: ["Natural Support", "Wellness Support", "Bioactive Support"],
    bestFor: "Wellness Support",
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
    description: "Ethically harvested Australian Manuka honey with a premium bioactive profile based on MGO level. Premium reserve grade for intensive wellness support.",
    benefits: ["Skin Wellness", "Intensive Wellness Support", "Natural Support"],
    bestFor: "Wellness Support",
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
    description: "Our highest activity level, premium reserve grade Manuka. Ethically harvested Australian Manuka honey with a premium bioactive profile based on MGO level.",
    benefits: ["Advanced Wellness", "Max Bio-Activity", "Premium Support"],
    bestFor: "Targeted Support",
    activity: "Exceptional",
    taste: "Intense",
    image: "/assets/products/mgo-800.png",
    color: "#9B6500",
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
    console.log('🌱 5 products seeded successfully.');

    mongoose.connection.close();
    console.log('🔌 Database connection closed.');
    process.exit(0);
  } catch (error) {
    console.error(`❌ Seeding failed: ${error.message}`);
    process.exit(1);
  }
};

seedProducts();
