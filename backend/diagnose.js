require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

async function diagnose() {
  const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
  console.log('Using URI prefix:', uri ? uri.substring(0, 40) + '...' : 'UNDEFINED');
  
  await mongoose.connect(uri);
  console.log('Connected to MongoDB');

  const db = mongoose.connection.db;
  const users = await db.collection('users').find({}).toArray();
  
  console.log('\n=== ALL USERS IN DB (' + users.length + ' found) ===');
  for (const u of users) {
    console.log('Email:', u.email);
    console.log('Role:', u.role);
    console.log('Has password hash:', !!u.password);
    
    const testPasswords = ['password123', 'admin123', 'Password123', '123456'];
    for (const pw of testPasswords) {
      try {
        const match = await bcrypt.compare(pw, u.password);
        console.log(`  ${match ? '✅' : '❌'} "${pw}"`);
      } catch(e) {
        console.log(`  ⚠️ Error for "${pw}":`, e.message);
      }
    }
    console.log('---');
  }

  await mongoose.disconnect();
}

diagnose().catch(console.error);
