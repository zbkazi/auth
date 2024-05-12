'use client';
import { useState } from 'react';
import axios from 'axios';
import SuccessToast from '../toasts/SuccessToast';
import ErrorToast from '../toasts/ErrorToast';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

   const [showSuccessToast, setShowSuccessToast] = useState(false); 
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');



  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validation
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    }
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      try {
        // Register user
        const response = await axios.post('http://localhost:4000/auth/register', formData);
        console.log(response.data); // Log response data
        setRegistrationSuccess(true);
        // Clear form fields
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
        // Redirect to login page after successful registration
        setToastMessage('Registration successful! Redirecting to login page...');
        setShowSuccessToast(true);
        setTimeout(() => {
          window.location.href = '/login';
        })
      } catch (error) {
        console.error('Error:', error);
        setToastMessage('Failed to register'); // Set error message for toast
        setShowErrorToast(true); // Show error toast
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Register</h2>
        {registrationSuccess && (
          <p className="text-green-500 text-center mb-4">Registration successful! Redirecting to login page...</p>
        )}
         <SuccessToast show={showSuccessToast} message={toastMessage} /> {/* Show success toast */}
        <ErrorToast show={showErrorToast} message={toastMessage} /> {/* Show error toast */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            />
            {errors.name && <p className="text-red-500 mt-1">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            />
            {errors.email && <p className="text-red-500 mt-1">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
              <button
                type="button"
                className="absolute top-1/2 right-2 transform -translate-y-1/2 focus:outline-none"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" clipRule="evenodd"/>
                    <path fillRule="evenodd" d="M10 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12zM4 10a6 6 0 1 1 12 0 6 6 0 0 1-12 0z" clipRule="evenodd"/>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 7.293a1 1 0 0 1 1.414 1.414l-6 6a1 1 0 0 1-1.414 0l-6-6a1 1 0 1 1 1.414-1.414L10 12.586l2.293-2.293a1 1 0 0 1 1.414 0z" clipRule="evenodd"/>
                  </svg>
                )}
              </button>
            </div>
            {errors.password && <p className="text-red-500 mt-1">{errors.password}</p>}
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-gray-700">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            />
            {errors.confirmPassword && <p className="text-red-500 mt-1">{errors.confirmPassword}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600 transition duration-300"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
