import { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { validateEmail, validatePhone } from '../utils/validate';

const ForgotPassword = () => {
  const [resetMethod, setResetMethod] = useState<'email' | 'phone'>('email');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (resetMethod === 'email' && !validateEmail(emailOrPhone)) {
      setError('সঠিক ইমেইল প্রদান করুন');
      return;
    }

    if (resetMethod === 'phone' && !validatePhone(emailOrPhone)) {
      setError('সঠিক ফোন নম্বর প্রদান করুন');
      return;
    }

    try {
      setLoading(true);
      // Here you would typically make an API call to send reset instructions
      // For now, we'll just show a success message
      setSuccess(true);
    } catch (err) {
      setError('পাসওয়ার্ড রিসেট করতে সমস্যা হয়েছে। পরে আবার চেষ্টা করুন।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            পাসওয়ার্ড পুনরুদ্ধার
          </h2>
          <p className="mt-2 text-gray-600">
            আপনার {resetMethod === 'email' ? 'ইমেইল' : 'ফোন নম্বর'} দিন, আমরা পাসওয়ার্ড রিসেট লিংক পাঠাবো
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {success ? (
          <div className="text-center">
            <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-6">
              পাসওয়ার্ড রিসেট নির্দেশনা পাঠানো হয়েছে। অনুগ্রহ করে আপনার {resetMethod === 'email' ? 'ইমেইল' : 'ফোন'} চেক করুন।
            </div>
            <Link
              to="/login"
              className="text-orange-500 hover:text-orange-600"
            >
              লগইন পেজে ফিরে যান
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Reset Method Toggle */}
            <div className="flex rounded-md shadow-sm">
              <button
                type="button"
                onClick={() => setResetMethod('email')}
                className={`flex-1 py-2 px-4 text-sm font-medium rounded-l-md border ${
                  resetMethod === 'email'
                    ? 'bg-orange-500 text-white border-orange-500'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                ইমেইল দিয়ে
              </button>
              <button
                type="button"
                onClick={() => setResetMethod('phone')}
                className={`flex-1 py-2 px-4 text-sm font-medium rounded-r-md border ${
                  resetMethod === 'phone'
                    ? 'bg-orange-500 text-white border-orange-500'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                ফোন নম্বর দিয়ে
              </button>
            </div>

            <div>
              <label htmlFor="emailOrPhone" className="block text-gray-700 mb-2">
                {resetMethod === 'email' ? 'ইমেইল' : 'ফোন নম্বর'}
              </label>
              <input
                id="emailOrPhone"
                type={resetMethod === 'email' ? 'email' : 'tel'}
                required
                placeholder={resetMethod === 'email' ? 'example@mail.com' : '01XXXXXXXXX'}
                className="w-full px-4 py-2 border rounded-lg focus:ring-orange-500 focus:border-orange-500"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:bg-gray-400"
            >
              {loading ? 'অনুরোধ পাঠানো হচ্ছে...' : 'রিসেট লিংক পাঠান'}
            </button>

            <div className="text-center">
              <Link
                to="/login"
                className="text-orange-500 hover:text-orange-600"
              >
                লগইন পেজে ফিরে যান
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword; 