import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import Admin from '../models/Admin.js';
import connectDB from '../config/db.js';

dotenv.config();

const seedAdmin = async () => {
  try {
    await connectDB();

    // Check if admin already exists
    const adminExists = await Admin.findOne({ email: 'admin@powermed.com' });
    
    if (adminExists) {
      console.log('✅ Admin already exists');
      console.log('Email: admin@powermed.com');
      console.log('Password: (the one you set previously)');
      process.exit(0);
    }

    // Create admin using model (password will be hashed by pre-save hook)
    const admin = await Admin.create({
      name: 'Admin User',
      email: 'admin@powermed.com',
      password: 'admin123', // Will be hashed by pre-save hook
      isActive: true,
    });

    console.log('✅ Admin created successfully!');
    console.log('\n📋 Login Credentials:');
    console.log('Email: admin@powermed.com');
    console.log('Password: admin123');
    console.log('\n⚠️  IMPORTANT: Change the password after first login!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();
