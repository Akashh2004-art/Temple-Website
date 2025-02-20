import { OTP } from '../models/otp.model';
import chalk from 'chalk';
import { SMSService } from './sms.service';

export class OTPService {
  static async generateAndSendOTP(phone: string): Promise<void> {
    try {
      // Generate 6 digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      
      // Format phone number
      const cleanNumber = phone.replace(/\s+/g, '');
      const formattedPhone = cleanNumber.startsWith('+91') ? cleanNumber : `+91${cleanNumber}`;

      // Delete any existing OTP for this phone
      await OTP.deleteMany({ phone: formattedPhone });

      // Save new OTP
      const otpDoc = new OTP({
        phone: formattedPhone,
        otp: otp,
        createdAt: new Date()
      });

      await otpDoc.save();
      console.log(chalk.green('✅ OTP saved to database'));

      // Send OTP via SMS
      const message = `Your Temple Admin OTP is: ${otp}. Valid for 5 minutes.`;
      await SMSService.sendSMS(formattedPhone, message);

    } catch (error) {
      console.error(chalk.red('❌ Error in generateAndSendOTP:'), error);
      throw error;
    }
  }

  static async verifyOTP(phone: string, otp: string): Promise<boolean> {
    try {
      // Format phone number
      const cleanNumber = phone.replace(/\s+/g, '');
      const formattedPhone = cleanNumber.startsWith('+91') ? cleanNumber : `+91${cleanNumber}`;
      
      console.log(chalk.yellow('🔍 Verifying OTP:'));
      console.log(chalk.blue(`📱 Phone: ${formattedPhone}`));
      console.log(chalk.green(`🔑 OTP: ${otp}`));

      const otpRecord = await OTP.findOne({
        phone: formattedPhone,
        otp: otp
      });

      if (!otpRecord) {
        console.log(chalk.red('❌ Invalid OTP'));
        return false;
      }

      // Check if OTP is expired (5 minutes)
      const now = new Date();
      const otpTime = new Date(otpRecord.createdAt);
      const diffMinutes = (now.getTime() - otpTime.getTime()) / (1000 * 60);

      if (diffMinutes > 5) {
        console.log(chalk.red('❌ OTP expired'));
        await OTP.deleteOne({ _id: otpRecord._id });
        return false;
      }

      // Delete verified OTP
      await OTP.deleteOne({ _id: otpRecord._id });
      console.log(chalk.green('✅ OTP verified successfully'));
      
      return true;
    } catch (error) {
      console.error(chalk.red('❌ Error in verifyOTP:'), error);
      return false;
    }
  }
}