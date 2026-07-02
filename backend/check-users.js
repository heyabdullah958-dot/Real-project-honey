const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');

const checkUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const users = await User.find({}).select('+password');
    console.log(users);
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.connection.close();
  }
};

checkUsers();
