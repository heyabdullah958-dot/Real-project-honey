const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const updateDb = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected!');
    
    // Update mgo-30 bestFor
    const res30 = await mongoose.connection.db.collection('products').updateOne(
      { slug: 'mgo-30' },
      { $set: { bestFor: 'Everyday Use' } }
    );
    console.log('MGO 30 update result:', res30);

    // Update mgo-100 bestFor
    const res100 = await mongoose.connection.db.collection('products').updateOne(
      { slug: 'mgo-100' },
      { $set: { bestFor: 'Gentle Balance' } }
    );
    console.log('MGO 100 update result:', res100);
    
    mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error);
  }
};

updateDb();
