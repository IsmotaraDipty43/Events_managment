import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useAuth } from '../AuthContext'; // make sure this path is correct
import { Helmet } from 'react-helmet';
const AddEvent = () => {
  const { user } = useAuth(); // Get logged-in user from context

  const [formData, setFormData] = useState({
    title: '',
    postedBy: '',
    dateTime: '',
    location: '',
    description: '',
    attendeeCount: 0,
    image: '',
    email: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        email: user.email,        // prefill email
        postedBy: user.name       // optionally set postedBy from user name
      }));
    }
  }, [user]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'attendeeCount' ? Number(value) : value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const { title, postedBy, dateTime, location, description, image, email } = formData;

    if (!title || !postedBy || !dateTime || !location || !description || !image || !email) {
      setMessage('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const res = await axios.post('https://eventmanagment-flax.vercel.app/events', formData);

      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Event added successfully.',
        confirmButtonColor: '#4B5563',
      });

      setFormData({
        title: '',
        postedBy: user?.name || '',
        dateTime: '',
        location: '',
        description: '',
        attendeeCount: 0,
        image: '',
        email: user?.email || '',
      });
    } catch (err) {
      console.error(err);
      setMessage('Failed to add event.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <> 
  
      <Helmet><title>Organizo||Add Events </title> </Helmet>
    <div className="max-w-xl mx-auto p-6 mt-24 mb-20 bg-white rounded-lg shadow-lg">
  
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Add New Event</h2>
      {message && (
        <p
          className={`mb-4 ${
            message.includes('successfully') ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {message}
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="text-gray-700 font-semibold">Event Title *</span>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </label>

        <label className="block">
          <span className="text-gray-700 font-semibold">Posted By *</span>
          <input
            type="text"
            name="postedBy"
            value={formData.postedBy}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </label>

        <label className="block">
          <span className="text-gray-700 font-semibold">Email *</span>
          <input
            type="email"
            name="email"
            value={formData.email}
            readOnly
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-gray-100 text-gray-600"
            required
          />
        </label>

        <label className="block">
          <span className="text-gray-700 font-semibold">Date & Time *</span>
          <input
            type="datetime-local"
            name="dateTime"
            value={formData.dateTime}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </label>

        <label className="block">
          <span className="text-gray-700 font-semibold">Location *</span>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </label>

        <label className="block">
          <span className="text-gray-700 font-semibold">Description *</span>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 resize-none"
            rows="4"
            required
          />
        </label>

        <label className="block">
          <span className="text-gray-700 font-semibold">Image URL *</span>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            placeholder="https://example.com/image.jpg"
            required
          />
        </label>

        <label className="block">
          <span className="text-gray-700 font-semibold">Attendee Count</span>
          <input
            type="number"
            name="attendeeCount"
            value={formData.attendeeCount}
            readOnly
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-gray-100 text-gray-600"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-full bg-gray-900 text-white py-2 rounded-md hover:bg-gray-800 transition-colors"
        >
          {loading ? 'Adding...' : 'Add Event'}
        </button>
      </form>
    </div>
    </>
  );
};

export default AddEvent;
