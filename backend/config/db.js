const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    if (process.env.NODE_ENV !== 'production') {
      console.log('⚠️  Falling back to Local Mock Database Mode. Server remains active for testing.');
      require('./mockDb')();
    } else {
      process.exit(1);
    }
  }
};

module.exports = connectDB;
