import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuth } from '../AuthContext'; // import context hook
import { Helmet } from 'react-helmet';
const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    image: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { registerUser } = useAuth();  // get registerUser function from context

  const validate = () => {
    if (form.name.trim().length < 5) {
      setError('Name must be at least 5 characters long');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError('Email is invalid');
      return false;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    if (!form.image.trim()) {
      setError('User image link is required');
      return false;
    }
    return true;
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    if (!validate()) return;

    // Use context registerUser instead of localStorage directly
    const result = registerUser(form);

    if (result.success) {
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: result.message,
        confirmButtonColor: '#4f46e5',
      });
      setForm({ name: '', email: '', password: '', image: '' });
      navigate('/login');  // redirect to login page after registration
    } else {
      setError(result.message);
    }
  };

  return (
    <>
     <Helmet><title>Organizo||Register</title> </Helmet>
  <div className='container mx-auto min-h-screen'> 
     <div className="max-w-md mx-auto x p-8 bg-white rounded-lg shadow-lg mt-32 ">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Register</h2>
      <form onSubmit={handleSubmit} noValidate className="space-y-5">

        <div>
          <label htmlFor="name" className="block mb-1 font-medium text-gray-700">Name</label>
          <input
            id="name"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="At least 5 characters"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block mb-1 font-medium text-gray-700">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="example@mail.com"
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
            placeholder="At least 6 characters"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label htmlFor="image" className="block mb-1 font-medium text-gray-700">User Image Link</label>
          <input
            id="image"
            type="text"
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300 font-semibold"
        >
          Register
        </button>
      </form>

      {error && (
        <p className="mt-4 text-center text-red-600 font-medium">{error}</p>
      )}

      <p className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link to="/login" className="text-indigo-600 hover:underline font-medium">
          Login here
        </Link>
      </p>
    </div>
    </div>
    </>
  );
};

export default Register;
