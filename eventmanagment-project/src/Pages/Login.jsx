import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';  // import your AuthContext hook
import { Helmet } from 'react-helmet';
const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const { loginUser } = useAuth();  // get loginUser function from context

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!form.email || !form.password) {
      Swal.fire({
        icon: 'error',
        title: 'Missing Fields',
        text: 'Please fill in both email and password.',
      });
      return;
    }

    const result = loginUser(form.email, form.password);

    if (result.success) {
      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        text: result.message,
        confirmButtonColor: '#4f46e5',
      }).then(() => {
        navigate('/');  // redirect after alert closes
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: result.message || 'Invalid credentials.',
      });
    }
  };

  return (
    <> 
        <Helmet><title>Organizo||Login</title> </Helmet>
    <div className="min-h-screen container mx-auto flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label htmlFor="email" className="block mb-1 font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 font-medium text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300 font-semibold"
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{' '}
          <Link to="/reg" className="text-indigo-600 hover:underline font-medium">
            Sign up now
          </Link>
        </p>
      </div>
    </div> </>
  );
};

export default Login;
