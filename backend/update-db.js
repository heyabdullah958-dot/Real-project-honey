const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const updateDb = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected!');
    
    // Update the product mgo-400's bestFor field
    const result = await mongoose.connection.db.collection('products').updateOne(
      { slug: 'mgo-400' },
      { $set: { bestFor: 'Intensive Support' } }
    );
    
    console.log('Update result:', result);
    
    mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error);
  }
};

updateDb();
