const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./models/Product');

mongoose.connect(process.env.MONGO_URI).then(async () => {
  // Fix the bad slug "mgo 1999" -> "mgo-1999"
  const result = await Product.findOneAndUpdate(
    { slug: 'mgo 1999' },
    { slug: 'mgo-1999' },
    { new: true }
  );
  
  if (result) {
    console.log('✅ Fixed product slug:', result.slug, '|', result.name);
  } else {
    console.log('No product with slug "mgo 1999" found.');
  }
  
  mongoose.disconnect();
}).catch(e => console.error('Error:', e.message));
