// src/pages/Update.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://eventmanagment-flax.vercel.app/api/events/${id}`)
      .then(res => {
        setEventData(res.data);
        setLoading(false);
        console.log(res.data)
      })
      .catch(() => {
        Swal.fire('Error', 'Event not found', 'error');
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`https://eventmanagment-flax.vercel.app/api/events/${id}`, eventData);
      Swal.fire('Success', 'Event updated successfully!', 'success');
      navigate('/myevents');
    } catch {
      Swal.fire('Error', 'Update failed!', 'error');
    }
  };

  if (loading) return <p className="text-center mt-20">Loading event data...</p>;

  return (
    <>
      <Helmet><title>Organizo || Update Event</title></Helmet>
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-xl max-w-xl w-full p-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900 text-center">Update Event</h2>

          <input
            name="title"
            value={eventData.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full border border-gray-300 rounded-md p-3 mb-4 focus:ring-amber-500"
            required
          />
          <input
            name="postedBy"
            value={eventData.postedBy}
            onChange={handleChange}
            placeholder="Posted By"
            className="w-full border border-gray-300 rounded-md p-3 mb-4 focus:ring-amber-500"
            required
          />
          <input
            type="datetime-local"
            name="dateTime"
            value={new Date(eventData.dateTime).toISOString().slice(0, 16)}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-3 mb-4 focus:ring-amber-500"
            required
          />
          <input
            name="location"
            value={eventData.location}
            onChange={handleChange}
            placeholder="Location"
            className="w-full border border-gray-300 rounded-md p-3 mb-4 focus:ring-amber-500"
            required
          />
          <textarea
            name="description"
            value={eventData.description}
            onChange={handleChange}
            rows="4"
            placeholder="Description"
            className="w-full border border-gray-300 rounded-md p-3 mb-4 focus:ring-amber-500"
            required
          />
          <input
            name="image"
            value={eventData.image}
            onChange={handleChange}
            placeholder="Image URL"
            className="w-full border border-gray-300 rounded-md p-3 mb-6 focus:ring-amber-500"
            required
          />

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate('/myevents')}
              className="bg-gray-300 text-gray-700 px-5 py-2 rounded-md hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-amber-600 text-white px-5 py-2 rounded-md hover:bg-amber-700 transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Update;
