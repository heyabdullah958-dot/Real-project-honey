const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const updateDb = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected!');
    
    // Update mgo-100 bestFor
    const res100 = await mongoose.connection.db.collection('products').updateOne(
      { slug: 'mgo-100' },
      { $set: { bestFor: 'Daily Balance' } }
    );
    console.log('MGO 100 update result:', res100);

    // Update mgo-263 bestFor
    const res263 = await mongoose.connection.db.collection('products').updateOne(
      { slug: 'mgo-263' },
      { $set: { bestFor: 'Enhanced Support' } }
    );
    console.log('MGO 263 update result:', res263);
    
    mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error);
  }
};

updateDb();
