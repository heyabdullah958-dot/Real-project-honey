const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./models/Product');

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const products = await Product.find({});
  console.log(`Total products (including inactive): ${products.length}`);
  products.forEach(p => {
    console.log(`\n--- ${p.name} ---`);
    console.log(`  slug: "${p.slug}"`);
    console.log(`  isActive: ${p.isActive}`);
    console.log(`  mgo: ${p.mgo}`);
    console.log(`  price: ${p.price}`);
    console.log(`  image: ${p.image?.substring(0, 60)}`);
    console.log(`  parentSlug: ${p.parentSlug}`);
  });
  mongoose.disconnect();
}).catch(e => console.error(e.message));
