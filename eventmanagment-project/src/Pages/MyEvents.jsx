import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';
const MyEvents = () => {
  const { user } = useAuth();
  const [myEvents, setMyEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingEvent, setEditingEvent] = useState(null);

  const fetchMyEvents = async () => {
    try {
      const res = await axios.get(`https://eventmanagment-flax.vercel.app/api/events/user-events?email=${user?.email}`);
      setMyEvents(res.data);
      setLoading(false);
      console.log(user.email);
    } catch (err) {
      console.error('Fetch failed:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchMyEvents();
    }
  }, [user?.email]);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'This will permanently delete the event.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      confirmButtonColor: '#d33',
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`https://eventmanagment-flax.vercel.app/api/events/${id}`);
        Swal.fire('Deleted!', 'The event has been deleted.', 'success');
        fetchMyEvents();
      } catch {
        Swal.fire('Error!', 'Failed to delete the event.', 'error');
      }
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`https://eventmanagment-flax.vercel.app/api/events/${editingEvent._id}`, editingEvent);
      Swal.fire('Updated!', 'Event updated successfully.', 'success');
      setEditingEvent(null);
      fetchMyEvents();
    } catch {
      Swal.fire('Error!', 'Failed to update event.', 'error');
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingEvent((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) return <p className="text-center mt-20">Loading your events...</p>;

  return (
    <>       <Helmet><title>Organizo||My Events</title> </Helmet>  
   <div className=''>
    <div className="max-w-6xl mx-auto p-6 min-h-screen mt-20">
      <h1 className="text-3xl font-bold mb-4 text-center text-amber-700">My Events</h1>

      {myEvents.length === 0 ? (
        <p className="text-center text-gray-500 justify-center items-center  font-bold ">You haven't added any events yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {myEvents.map((event) => (
            <div
              key={event._id}
              className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-amber-400 transition-shadow flex flex-col"
            >
              <img src={event.image} alt={event.title} className="w-full h-70 object-cover" />
              <div className="p-5 flex flex-col flex-grow">
                <h2 className="text-xl font-bold text-amber-700">{event.title}</h2>
                <p className="text-base text-gray-600">
                  <strong>Name:</strong> {event.postedBy}
                </p>
                <p className="text-base text-gray-600">
                  <strong>Date:</strong> {new Date(event.dateTime).toLocaleString()}
                </p>
                <p className="text-base text-gray-600">
                  <strong>Location:</strong> {event.location}
                </p>
                <p className="text-gray-700 mt-2">{event.description}</p>
                <p className="text-base text-gray-500 mt-2 mb-4">Attendees: {event.attendeeCount}</p>

                <div className="mt-auto flex gap-3">
                  <button
                    onClick={() => setEditingEvent(event)}
                    className="min-w-[100px] bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(event._id)}
                    className="min-w-[100px] bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    {editingEvent && (
  <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
    <form
      onSubmit={handleUpdateSubmit}
      className="bg-white rounded-lg shadow-xl max-w-lg w-full p-8 relative
                 animate-fadeIn"
    >
      {/* Close Icon */}
      <button
        type="button"
        onClick={() => setEditingEvent(null)}
        aria-label="Close modal"
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <h2 className="text-2xl font-semibold mb-6 text-gray-900">Update Event</h2>

      <input
        name="title"
        value={editingEvent.title}
        onChange={handleEditChange}
        placeholder="Title"
        className="w-full border border-gray-300 rounded-md p-3 mb-4
                   focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
        required
      />

      <input
        name="postedBy"
        value={editingEvent.postedBy}
        onChange={handleEditChange}
        placeholder="Posted By"
        className="w-full border border-gray-300 rounded-md p-3 mb-4
                   focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
        required
      />

      <input
        type="datetime-local"
        name="dateTime"
        value={new Date(editingEvent.dateTime).toISOString().slice(0, 16)}
        onChange={handleEditChange}
        className="w-full border border-gray-300 rounded-md p-3 mb-4
                   focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
        required
      />

      <input
        name="location"
        value={editingEvent.location}
        onChange={handleEditChange}
        placeholder="Location"
        className="w-full border border-gray-300 rounded-md p-3 mb-4
                   focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
        required
      />

      <textarea
        name="description"
        value={editingEvent.description}
        onChange={handleEditChange}
        rows="4"
        placeholder="Description"
        className="w-full border border-gray-300 rounded-md p-3 mb-6
                   focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
        required
      />

      <input
        name="image"
        value={editingEvent.image}
        onChange={handleEditChange}
        placeholder="Image URL"
        className="w-full border border-gray-300 rounded-md p-3 mb-6
                   focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
        required
      />

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => setEditingEvent(null)}
          className="bg-gray-300 text-gray-700 px-5 py-2 rounded-md hover:bg-gray-400 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-amber-600 text-white px-5 py-2 rounded-md hover:bg-amber-700 transition"
        >
          Save
        </button>
      </div>
    </form>
  </div>
)}

    </div>
   </div> 
   </>
  );
};

export default MyEvents;
