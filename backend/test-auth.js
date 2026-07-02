const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');

const testAuth = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const user = await User.findOne({ email: 'zeeshan.ahmed2691@gmail.com' }).select('+password');
    if (!user) {
      console.log('User not found');
      return;
    }
    console.log('User found:', user.email);
    const isMatch = await user.comparePassword('password123');
    console.log('Password match?', isMatch);
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.connection.close();
  }
};

testAuth();
