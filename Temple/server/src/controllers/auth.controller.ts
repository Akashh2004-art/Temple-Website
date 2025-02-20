import { Request, Response } from 'express';
import { OTPService } from '../services/otp.service';
import chalk from 'chalk';

export class AuthController {
  public static async sendOTP(req: Request, res: Response) {
    try {
      const { phone } = req.body;

      if (!phone) {
        return res.status(400).json({ message: 'Phone number is required' });
      }

      // Generate and send OTP
      const otp = await OTPService.generateAndSendOTP(phone);

      res.status(200).json({ 
        success: true,
        message: 'OTP sent successfully',
        phone,
        // Include OTP in development environment only
        ...(process.env.NODE_ENV === 'development' && { otp })
      });

    } catch (error) {
      console.error(chalk.red('❌ Send OTP Error:'), error);
      res.status(500).json({ 
        success: false,
        message: 'Failed to send OTP',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  public static async verifyOTP(req: Request, res: Response) {
    try {
      const { phone, otp } = req.body;

      if (!phone || !otp) {
        return res.status(400).json({ message: 'Phone and OTP are required' });
      }

      const isValid = await OTPService.verifyOTP(phone, otp);

      if (!isValid) {
        return res.status(400).json({ 
          success: false,
          message: 'Invalid or expired OTP' 
        });
      }

      res.status(200).json({ 
        success: true,
        message: 'OTP verified successfully',
        phone 
      });

    } catch (error) {
      console.error(chalk.red('❌ Verify OTP Error:'), error);
      res.status(500).json({ 
        success: false,
        message: 'Failed to verify OTP' 
      });
    }
  }
}