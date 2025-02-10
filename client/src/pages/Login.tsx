import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { validateEmail, validatePhone } from '../utils/validate';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (loginMethod === 'email' && !validateEmail(formData.emailOrPhone)) {
      setError('সঠিক ইমেইল প্রদান করুন');
      return;
    }

    if (loginMethod === 'phone' && !validatePhone(formData.emailOrPhone)) {
      setError('সঠিক ফোন নম্বর প্রদান করুন');
      return;
    }

    try {
      setLoading(true);
      await login(formData.emailOrPhone, formData.password);
      navigate('/');
    } catch (err) {
      setError('লগইন তথ্য সঠিক নয়');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            লগইন করুন
          </h2>
          <p className="mt-2 text-gray-600">
            অথবা{' '}
            <Link to="/signup" className="text-orange-500 hover:text-orange-600">
              নতুন অ্যাকাউন্ট খুলুন
            </Link>
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Login Method Toggle */}
          <div className="flex rounded-md shadow-sm">
            <button
              type="button"
              onClick={() => setLoginMethod('email')}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-l-md border ${
                loginMethod === 'email'
                  ? 'bg-orange-500 text-white border-orange-500'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              ইমেইল দিয়ে
            </button>
            <button
              type="button"
              onClick={() => setLoginMethod('phone')}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-r-md border ${
                loginMethod === 'phone'
                  ? 'bg-orange-500 text-white border-orange-500'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              ফোন নম্বর দিয়ে
            </button>
          </div>

          <div>
            <label htmlFor="emailOrPhone" className="block text-gray-700 mb-2">
              {loginMethod === 'email' ? 'ইমেইল' : 'ফোন নম্বর'}
            </label>
            <input
              id="emailOrPhone"
              type={loginMethod === 'email' ? 'email' : 'tel'}
              required
              placeholder={loginMethod === 'email' ? 'example@mail.com' : '01XXXXXXXXX'}
              className="w-full px-4 py-2 border rounded-lg focus:ring-orange-500 focus:border-orange-500"
              value={formData.emailOrPhone}
              onChange={(e) => setFormData({ ...formData, emailOrPhone: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 mb-2">
              পাসওয়ার্ড
            </label>
            <input
              id="password"
              type="password"
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-orange-500 focus:border-orange-500"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember_me"
                type="checkbox"
                className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
              />
              <label htmlFor="remember_me" className="ml-2 block text-gray-700">
                মনে রাখুন
              </label>
            </div>

            <div className="text-sm">
              <Link to="/forgot-password" className="text-orange-500 hover:text-orange-600">
                পাসওয়ার্ড ভুলে গেছেন?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:bg-gray-400"
          >
            {loading ? 'লগইন হচ্ছে...' : 'লগইন করুন'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login; 