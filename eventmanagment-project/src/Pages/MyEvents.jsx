import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
const MyEvents = () => {
  const { user } = useAuth();
  const [myEvents, setMyEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingEvent, setEditingEvent] = useState(null);
 const navigate = useNavigate();
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
           await axios.patch(`https://eventmanagment-flax.vercel.app/api/events/${editingEvent._id}`, editingEvent);
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
  onClick={() => navigate(`/update/${event._id}`)}
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

   

    </div>
   </div> 
   </>
  );
};

export default MyEvents;
