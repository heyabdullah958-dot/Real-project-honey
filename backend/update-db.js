const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const updateDb = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected!');
    
    // Update the product mgo-800's activity and taste fields
    const result = await mongoose.connection.db.collection('products').updateOne(
      { slug: 'mgo-800' },
      { $set: { activity: 'Ultimate', taste: 'Rich' } }
    );
    
    console.log('Update result:', result);
    
    mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error);
  }
};

updateDb();
