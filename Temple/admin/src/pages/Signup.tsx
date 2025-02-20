import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface SignupState {
  phone: string;
  otp: string;
  name: string;
  password: string;
  confirmPassword: string;
}

const Signup: React.FC = () => {
  const { sendOTP, verifyOTP, signup } = useAuth();
  const [step, setStep] = useState<'phone' | 'otp' | 'details'>('phone');
  const [isLoading, setIsLoading] = useState(false);  // renamed from loading
  const [errorMessage, setErrorMessage] = useState<string | null>(null);  // renamed from error
  const [otpCooldown, setOtpCooldown] = useState(0);  // renamed from cooldown
  const [formData, setFormData] = useState<SignupState>({
    phone: '',
    otp: '',
    name: '',
    password: '',
    confirmPassword: ''
  });

  const startCooldownTimer = () => {
    setOtpCooldown(30);
    const timer = setInterval(() => {
      setOtpCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSendOTP = async () => {
    try {
      setIsLoading(true);
      setErrorMessage(null);
      
      await sendOTP(formData.phone);
      setStep('otp');
      startCooldownTimer();
      
    } catch (err: any) {
      setErrorMessage(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    try {
      setIsLoading(true);
      setErrorMessage(null);

      await verifyOTP(formData.phone, formData.otp);
      setStep('details');
    } catch (err: any) {
      setErrorMessage(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async () => {
    try {
      if (formData.password !== formData.confirmPassword) {
        setErrorMessage('Passwords do not match');
        return;
      }

      if (formData.password.length < 6) {
        setErrorMessage('Password must be at least 6 characters long');
        return;
      }

      setIsLoading(true);
      setErrorMessage(null);

      await signup({
        phone: formData.phone,
        otp: formData.otp,
        name: formData.name,
        password: formData.password
      });
      
    } catch (err: any) {
      setErrorMessage(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {step === 'phone' && 'Enter your phone number to get started'}
            {step === 'otp' && 'Enter the OTP sent to your phone'}
            {step === 'details' && 'Complete your profile'}
          </p>
        </div>
        
        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {errorMessage}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
          {step === 'phone' && (
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                placeholder="Enter your phone number"
                required
              />
              <button
                onClick={handleSendOTP}
                disabled={isLoading || !formData.phone || formData.phone.length < 10}
                className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
              >
                {isLoading ? 'Sending...' : 'Send OTP'}
              </button>
            </div>
          )}

          {step === 'otp' && (
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                Enter OTP
              </label>
              <input
                id="otp"
                type="text"
                maxLength={6}
                value={formData.otp}
                onChange={(e) => setFormData({ ...formData, otp: e.target.value.replace(/\D/g, '') })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                placeholder="Enter 6-digit OTP"
                required
              />
              {otpCooldown > 0 ? (
                <p className="mt-2 text-sm text-gray-500">
                  Resend OTP in {otpCooldown}s
                </p>
              ) : (
                <button
                  onClick={handleSendOTP}
                  disabled={isLoading}
                  className="mt-2 text-sm text-indigo-600 hover:text-indigo-500"
                >
                  Resend OTP
                </button>
              )}
              <button
                onClick={handleVerifyOTP}
                disabled={isLoading || !formData.otp || formData.otp.length !== 6}
                className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
              >
                {isLoading ? 'Verifying...' : 'Verify OTP'}
              </button>
            </div>
          )}

          {step === 'details' && (
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                  placeholder="Create a password"
                  required
                  minLength={6}
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                  placeholder="Confirm your password"
                  required
                />
              </div>
              <button
                onClick={handleSignup}
                disabled={isLoading || !formData.name || !formData.password || !formData.confirmPassword}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Signup;