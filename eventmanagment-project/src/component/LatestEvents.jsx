import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const LatestEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('https://eventmanagment-flax.vercel.app/events'); 
        const allEvents = response.data;

        const now = new Date();

        const upcomingEvents = allEvents
          .filter(event => new Date(event.dateTime) > now)
          .sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime))
          .slice(0, 3);

        setEvents(upcomingEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-4xl font-bold text-center text-gray-900 mb-2">
        Upcoming Events
      </h2>
      <p className="text-center text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
        Discover and attend the latest events happening around you. Join the experience, network, and grow.
      </p>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-5 flex flex-col"
          >
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-52 object-cover rounded-xl mb-4"
            />
            <h3 className="text-3xl font-semibold text-gray-900 mb-2">
              {event.title}
            </h3>
            <p className="text-base text-gray-600 mb-4">
              {event.description.length > 90
                ? event.description.slice(0, 90) + '...'
                : event.description}
            </p>
            <p className="text-base text-gray-700 mb-1">
              <span className="font-semibold text-gray-900">Posted by:</span>{' '}
              {event.postedBy}
            </p>
            <p className="text-base text-gray-700 mb-1">
              <span className="font-semibold text-gray-900">Location:</span>{' '}
              {event.location}
            </p>
            <p className="text-base text-gray-700 mb-4">
              <span className="font-semibold text-gray-900">Date:</span>{' '}
              {new Date(event.dateTime).toLocaleString()}
            </p>

            {/* Button container with mt-auto to push button to bottom */}
            <Link to="/events" className="mt-auto">
              <button className="w-full text-white bg-gray-900 hover:bg-gray-800 px-4 py-2 rounded-lg font-medium text-base transition">
                See More
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestEvents;
