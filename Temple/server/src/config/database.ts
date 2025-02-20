import mongoose from 'mongoose';
import { config } from './env.config';

export const connectDatabase = async () => {
  try {
    await mongoose.connect(config.mongoUri);
    console.log('\x1b[32m%s\x1b[0m', '✅ Database Connected Successfully');
  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m', '❌ Database Connection Error:', error);
    process.exit(1);
  }
};