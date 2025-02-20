import mongoose from 'mongoose';
import { config } from './config/env.config';
import app from './app';
import chalk from 'chalk';

const startServer = async () => {
  try {
    // Check if MongoDB URI exists
    if (!config.mongoUri) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    // Connect to MongoDB
    await mongoose.connect(config.mongoUri);
    console.log(chalk.green('✅ Connected to MongoDB'));

    // Start the server
    const PORT = config.port;
    app.listen(PORT, () => {
      console.log(chalk.blue(`🚀 Server running on port ${PORT}`));
    });

  } catch (error) {
    console.error(chalk.red('❌ Server Error:'), error);
    process.exit(1);
  }
};

startServer();