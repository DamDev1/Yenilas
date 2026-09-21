import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/deluv';

async function clean() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
    
    // Drop the entire database
    if (mongoose.connection.db) {
        await mongoose.connection.db.dropDatabase();
        console.log('Database cleaned successfully.');
    } else {
        console.log('No db connection found.');
    }
  } catch (error) {
    console.error('Error cleaning database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

clean();
