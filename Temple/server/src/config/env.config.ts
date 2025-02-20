import dotenv from 'dotenv';
dotenv.config();

if (!process.env.CLERK_SECRET_KEY) {
  throw new Error('CLERK_SECRET_KEY must be defined in environment variables');
}

export const config = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGODB_URI || 'mongodb+srv://akashsaha0751:US1VPMcJTKy3FSYS@cluster0.iz9uj.mongodb.net/temple_management',
  clerk: {
    publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    secretKey: process.env.CLERK_SECRET_KEY
  }
};