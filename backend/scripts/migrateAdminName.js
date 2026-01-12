import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from '../models/Admin.js';
import connectDB from '../config/db.js';

dotenv.config();

const migrateAdminName = async () => {
  try {
    await connectDB();

    // Find all admins that don't have firstName/lastName but have name
    const admins = await Admin.find({ 
      $or: [
        { firstName: { $exists: false } },
        { lastName: { $exists: false } }
      ],
      name: { $exists: true }
    });

    if (admins.length === 0) {
      console.log('✅ No admins need migration');
      process.exit(0);
    }

    console.log(`📋 Found ${admins.length} admin(s) to migrate...`);

    for (const admin of admins) {
      if (admin.name) {
        const nameParts = admin.name.split(' ');
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ') || '';

        await Admin.findByIdAndUpdate(admin._id, {
          firstName,
          lastName,
        }, { runValidators: false });

        console.log(`✅ Migrated admin: ${admin.email}`);
        console.log(`   - First Name: ${firstName}`);
        console.log(`   - Last Name: ${lastName}`);
      }
    }

    console.log('\n✅ Migration completed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error migrating admin names:', error);
    process.exit(1);
  }
};

migrateAdminName();
