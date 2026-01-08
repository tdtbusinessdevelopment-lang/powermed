import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    const options = {
      // Connection timeout settings
      serverSelectionTimeoutMS: 10000, // 10 seconds
      socketTimeoutMS: 45000, // 45 seconds
      // Connection pool settings
      maxPoolSize: 10,
      minPoolSize: 5,
    };

    const conn = await mongoose.connect(process.env.MONGODB_URI, options);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Database: ${conn.connection.name}`);
  } catch (error) {
    console.error('❌ MongoDB Connection Error:');
    console.error(`   ${error.message}`);
    
    // Provide helpful error messages for common issues
    if (error.message.includes('querySrv ESERVFAIL')) {
      console.error('\n💡 Troubleshooting tips:');
      console.error('   1. Check if your MongoDB Atlas cluster is active');
      console.error('   2. Verify your MONGODB_URI in the .env file');
      console.error('   3. Ensure your IP address is whitelisted in MongoDB Atlas');
      console.error('   4. Try using a direct connection string instead of SRV');
      console.error('   5. Check your internet connection and DNS settings');
    } else if (error.message.includes('authentication failed')) {
      console.error('\n💡 Check your MongoDB username and password in MONGODB_URI');
    } else if (!process.env.MONGODB_URI) {
      console.error('\n💡 Make sure you have a .env file with MONGODB_URI defined');
      console.error('   See backend/SETUP.md for setup instructions');
    }
    
    process.exit(1);
  }
};

export default connectDB;
