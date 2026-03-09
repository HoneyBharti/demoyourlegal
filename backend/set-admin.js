require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/User');

const setAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    const email = process.argv[2];
    if (!email) {
      console.log('Usage: node set-admin.js <email>');
      process.exit(1);
    }

    const user = await User.findOneAndUpdate(
      { email },
      { role: 'admin' },
      { new: true }
    );

    if (!user) {
      console.log('User not found');
    } else {
      console.log(`✓ ${user.email} is now admin`);
    }
    
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

setAdmin();
