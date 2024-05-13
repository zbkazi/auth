'use client';
import { useState } from 'react';
import axios from 'axios';
import LoginBySocial from './LoginBySocial';
import SuccessToast from '../toasts/SuccessToast';
import ErrorToast from '../toasts/ErrorToast';

import { useRouter } from 'next/navigation';



const Login = () => {

  const router = useRouter();

 const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false); // State variable for success toast
  const [showErrorToast, setShowErrorToast] = useState(false); // State variable for error toast
  const [toastMessage, setToastMessage] = useState(''); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    // Validation
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    }
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      try {
        // Check if user is registered

        // Log in logic
        const ipAddress = window.location.hostname; // Get IP address
        const userAgent = navigator.userAgent; // Get user agent
        const headers = { 'user-agent': userAgent, 'x-forwarded-for': ipAddress }; // Include in request headers
         await axios.post('http://localhost:4000/auth/login', formData, { headers });
        // Clear form fields
        setFormData({
          email: '',
          password: '',
        })
        
        // Log response data
        setToastMessage('Login successful!'); // Set success message for toast
        setShowSuccessToast(true); // Show success toast
        setTimeout(() => {
          router.push('/dashboard'); 
        }, 3000);
      } catch (error) {
        console.error('Error:', error);
        setToastMessage('Login failed'); // Set error message for toast
        setShowErrorToast(true); // Show error toast
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
           {/* Show success toast */}
      <SuccessToast show={showSuccessToast} message={toastMessage} />
      {/* Show error toast */}
      <ErrorToast show={showErrorToast} message={toastMessage} />

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={`appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${errors.email ? 'border-red-500' : ''}`}
                  placeholder="Enter your email address"
                />
                {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
              </div>
            </div>

           <div className="mt-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="mt-1 relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              value={formData.password}
              onChange={handleChange}
              className={`appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${errors.password ? 'border-red-500' : ''}`}
              placeholder="Enter your password"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <svg
                  className="h-6 w-7 text-gray-400 text-right text-2xl" 
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 7.293a1 1 0 0 1 1.414 1.414l-6 6a1 1 0 0 1-1.414 0l-6-6a1 1 0 1 1 1.414-1.414L10 12.586l2.293-2.293a1 1 0 0 1 1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5 text-gray-400 text-right text-2xl"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M10 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12zM4 10a6 6 0 1 1 12 0 6 6 0 0 1-12 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
        </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
          </div>
          <LoginBySocial />
    </div>
  );
};

export default Login;
