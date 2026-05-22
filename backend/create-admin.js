require('dotenv').config();
const mongoose = require('mongoose');
const readline = require('readline');
const User = require('./models/User');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const askQuestion = (query) => {
  return new Promise((resolve) => rl.question(query, resolve));
};

async function main() {
  console.log('\n👑 --- Amazing Natures Admin Account Creator ---');
  
  if (!process.env.MONGO_URI) {
    console.error('❌ Error: MONGO_URI is missing in your backend/.env file!');
    process.exit(1);
  }

  // Connect to DB
  try {
    console.log('🔄 Connecting to MongoDB database...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB successfully.');
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    process.exit(1);
  }

  try {
    const fullName = await askQuestion('👤 Enter Admin Full Name: ');
    if (!fullName.trim()) {
      console.log('❌ Error: Full name cannot be empty.');
      process.exit(1);
    }

    const email = await askQuestion('📧 Enter Admin Email: ');
    if (!email.trim() || !email.includes('@')) {
      console.log('❌ Error: Please enter a valid email address.');
      process.exit(1);
    }

    const password = await askQuestion('🔑 Enter Admin Password (min 6 characters): ');
    if (password.length < 6) {
      console.log('❌ Error: Password must be at least 6 characters long.');
      process.exit(1);
    }

    // Check if user already exists
    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      console.log(`❌ Error: Admin with email ${email} already exists in the database.`);
      process.exit(1);
    }

    // Create user
    const newUser = await User.create({
      fullName,
      email: email.toLowerCase(),
      password,
      role: 'admin'
    });

    console.log('\n✨ --------------------------------------------------');
    console.log('✅ Success: Admin account created successfully!');
    console.log(`👤 Name:  ${newUser.fullName}`);
    console.log(`📧 Email: ${newUser.email}`);
    console.log(`🔑 Role:  ${newUser.role}`);
    console.log('--------------------------------------------------');

  } catch (error) {
    console.error('❌ Failed to create admin user:', error.message);
  } finally {
    mongoose.connection.close();
    rl.close();
  }
}

main();
