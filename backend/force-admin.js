const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');

const updateAdmin = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected!');

    // Remove all users to ensure a clean slate for the admin
    await User.deleteMany({});
    console.log('Cleared existing users.');

    const admin = new User({
      fullName: 'Zeeshan Ahmed',
      email: 'Zeeshan.ahmed2691@gmail.com',
      password: 'password123',
      role: 'admin'
    });

    await admin.save();
    console.log('Successfully created/updated admin:', admin.email);

  } catch (error) {
    console.error('Error updating admin:', error);
  } finally {
    mongoose.connection.close();
  }
};

updateAdmin();
