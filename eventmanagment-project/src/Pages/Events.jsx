import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [joinedEvents, setJoinedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('all');

  useEffect(() => {
    fetch('https://eventmanagment-flax.vercel.app/api/events')
      .then(res => res.json())
      .then(data => {
        data.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));
        setEvents(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const isSameDay = (d1, d2) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  const getWeekRange = (date) => {
    const day = date.getDay();
    const diffToMonday = (day + 6) % 7;
    const monday = new Date(date);
    monday.setDate(date.getDate() - diffToMonday);
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    return [monday, sunday];
  };

  const isInRange = (date, start, end) => date >= start && date <= end;

  const filterByDate = (eventDate) => {
    const now = new Date();
    const d = new Date(eventDate);

    switch (dateFilter) {
      case 'today':
        return isSameDay(d, now);
      case 'currentWeek': {
        const [start, end] = getWeekRange(now);
        return isInRange(d, start, end);
      }
      case 'lastWeek': {
        const [start, end] = getWeekRange(now);
        const lastWeekStart = new Date(start);
        lastWeekStart.setDate(start.getDate() - 7);
        const lastWeekEnd = new Date(end);
        lastWeekEnd.setDate(end.getDate() - 7);
        return isInRange(d, lastWeekStart, lastWeekEnd);
      }
      case 'currentMonth':
        return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
      case 'lastMonth': {
        const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1);
        return d.getFullYear() === lastMonthDate.getFullYear() && d.getMonth() === lastMonthDate.getMonth();
      }
      default:
        return true;
    }
  };

  const handleJoin = async (eventId) => {
    if (joinedEvents.includes(eventId)) return;

    try {
      const res = await fetch(`https://eventmanagment-flax.vercel.app/api/events/${eventId}/join`, {
        method: 'PATCH',
      });

      if (res.ok) {
        setEvents(prev =>
          prev.map(e =>
            e._id === eventId ? { ...e, attendeeCount: e.attendeeCount + 1 } : e
          )
        );
        setJoinedEvents(prev => [...prev, eventId]);
      } else {
        alert('Failed to join the event.');
      }
    } catch (err) {
      alert('Server error. Try again.');
    }
  };

  const filteredEvents = events.filter(event => {
    return (
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      filterByDate(event.dateTime)
    );
  });

  if (loading) return <p className="text-center mt-10">Loading events...</p>;

  return (
    <>
      <Helmet><title>Organizo || Events</title></Helmet>
      <div className="max-w-7xl mx-auto px-4 py-20">
        <h1 className="text-3xl font-bold mb-2 text-center text-amber-700">Explore All Events</h1>
        <p className="text-center text-lg text-gray-600 mb-6 max-w-xl mx-auto">
          Discover upcoming events and join the ones you love!
        </p>

        <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mb-8 max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Search by event title..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="flex-grow border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />

          <select
            value={dateFilter}
            onChange={e => setDateFilter(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            <option value="all">All Dates</option>
            <option value="today">Today</option>
            <option value="currentWeek">Current Week</option>
            <option value="lastWeek">Last Week</option>
            <option value="currentMonth">Current Month</option>
            <option value="lastMonth">Last Month</option>
          </select>
        </div>

        {filteredEvents.length === 0 ? (
          <p className="text-center text-gray-600 min-h-screen">No events found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map(event => (
              <div
                key={event._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="h-48 w-full object-cover"
                />
                <div className="p-5 flex flex-col flex-grow">
                  <h2 className="text-xl font-bold text-amber-700 mb-1">{event.title}</h2>
                  <p className="text-base text-gray-600 mb-1">
                    <span className="font-medium">Posted by:</span> {event.postedBy}
                  </p>
                  <p className="text-base text-gray-600 mb-1">
                    <span className="font-medium">Date & Time:</span>{' '}
                    {new Date(event.dateTime).toLocaleString(undefined, {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    })}
                  </p>
                  <p className="text-base text-gray-600 mb-1">
                    <span className="font-medium">Location:</span> {event.location}
                  </p>
                  <p className="text-gray-700 text-sm mt-2 mb-4 flex-grow">{event.description}</p>
                  <p className="text-base font-medium mb-3 text-gray-600">
                    Attendees: {event.attendeeCount}
                  </p>
                  <button
                    onClick={() => handleJoin(event._id)}
                    disabled={joinedEvents.includes(event._id)}
                    className={`py-2 text-lg rounded-lg font-semibold mt-auto transition duration-300 ${
                      joinedEvents.includes(event._id)
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        : 'bg-amber-600 text-white hover:bg-amber-700'
                    }`}
                  >
                    {joinedEvents.includes(event._id) ? 'Joined' : 'Join Event'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Events;
