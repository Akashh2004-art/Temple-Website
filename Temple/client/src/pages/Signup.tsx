import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { validatePassword, validateName, validatePhone } from '../utils/validate';

const Signup = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    // Validations
    if (!validateName(formData.name)) {
      setError('সঠিক নাম প্রদান করুন');
      return;
    }

    if (!validatePhone(formData.phone)) {
      setError('সঠিক ফোন নম্বর প্রদান করুন');
      return;
    }

    if (!validatePassword(formData.password)) {
      setError('পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('পাসওয়ার্ড মিলছে না');
      return;
    }

    try {
      setLoading(true);
      await signup(formData.name, formData.phone, formData.password);
      navigate('/');
    } catch (err) {
      setError('অ্যাকাউন্ট তৈরি করতে সমস্যা হয়েছে');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">নতুন অ্যাকাউন্ট খুলুন</h2>
          <p className="mt-2 text-gray-600">
            অথবা{' '}
            <Link to="/login" className="text-orange-500 hover:text-orange-600">
              লগইন করুন
            </Link>
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-gray-700 mb-2">নাম</label>
            <input
              id="name"
              type="text"
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-orange-500 focus:border-orange-500"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-gray-700 mb-2">ফোন নম্বর</label>
            <input
              id="phone"
              type="tel"
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-orange-500 focus:border-orange-500"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="01XXXXXXXXX"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 mb-2">পাসওয়ার্ড</label>
            <input
              id="password"
              type="password"
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-orange-500 focus:border-orange-500"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">পাসওয়ার্ড নিশ্চিত করুন</label>
            <input
              id="confirmPassword"
              type="password"
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-orange-500 focus:border-orange-500"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:bg-gray-400"
          >
            {loading ? 'অপেক্ষা করুন...' : 'নিবন্ধন করুন'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;