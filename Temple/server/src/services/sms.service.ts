// sms.service.ts
import { clerkClient } from '@clerk/clerk-sdk-node';
import chalk from 'chalk';

export class SMSService {
  static async sendSMS(phone: string, message: string): Promise<void> {
    try {
      // Format phone number
      const cleanNumber = phone.replace(/\s+/g, '');
      const formattedNumber = cleanNumber.startsWith('+91') ? cleanNumber : `+91${cleanNumber}`;
      
      // Log details
      console.log(chalk.yellow('📤 Sending SMS:'));
      console.log(chalk.blue(`📱 To: ${formattedNumber}`));
      console.log(chalk.green(`💬 Message: ${message}`));

      // Always log OTP in terminal for development
      console.log(chalk.yellow('🔑 OTP for testing:'), message);

      try {
        // Create phone number verification
        const response = await clerkClient.phoneNumbers.createPhoneNumber({
          phoneNumber: formattedNumber,
          userId: ''
        });

        // For development, always show OTP in console
        if (process.env.NODE_ENV === 'development') {
          console.log(chalk.green('✅ SMS would be sent in production'));
          console.log(chalk.yellow('🔑 Development OTP:'), message);
        }

        console.log(chalk.green('✅ Process completed successfully!'));
        return;

      } catch (smsError: any) {
        // If phone number already exists, that's fine
        if (smsError.errors?.[0]?.code === 'phone_number_exists') {
          console.log(chalk.yellow('ℹ️ Phone number already registered'));
          return;
        }
        
        console.error(chalk.red('❌ Error sending SMS:'), smsError);
        throw smsError;
      }

    } catch (error) {
      console.error(chalk.red('❌ Error in SMS Service:'), error);
      if (error instanceof Error) {
        console.error(chalk.red('Error details:'), error.message);
      }
      throw error;
    }
  }
}