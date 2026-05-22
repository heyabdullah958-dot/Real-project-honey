const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const checkDb = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected!');
    
    // Query products
    const products = await mongoose.connection.db.collection('products').find({}).toArray();
    console.log('PRODUCTS_START');
    console.log(JSON.stringify(products, null, 2));
    console.log('PRODUCTS_END');
    
    mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error);
  }
};

checkDb();
