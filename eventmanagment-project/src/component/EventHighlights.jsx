import React from 'react';
import {
  FaRegCalendarCheck,
  FaMapMarkerAlt,
  FaMicrophoneAlt,
  FaGlassCheers,
} from 'react-icons/fa';

const highlights = [
  {
    icon: <FaRegCalendarCheck className="text-3xl text-teal-500" />,
    title: '24/7 Access',
    description:
      'Round-the-clock event availability with real-time support and assistance.',
    buttonClasses:
      'border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white',
  },
  {
    icon: <FaMapMarkerAlt className="text-3xl text-lime-500" />,
    title: 'Top Locations',
    description:
      'Hosted at premium, easily accessible venues with all facilities.',
    buttonClasses:
      'border-lime-500 text-lime-500 hover:bg-lime-500 hover:text-white',
  },
  {
    icon: <FaMicrophoneAlt className="text-3xl text-amber-500" />,
    title: 'Global Speakers',
    description:
      'Featuring 300+ experts from various industries to inspire and educate.',
    buttonClasses:
      'border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white',
  },
  {
    icon: <FaGlassCheers className="text-3xl text-violet-500" />,
    title: 'After-Party Fun',
    description:
      'Celebrate with networking parties, music, and joyful experiences.',
    buttonClasses:
      'border-violet-500 text-violet-500 hover:bg-violet-500 hover:text-white',
  },
];

const EventHighlights = () => {
  return (
    <section className="bg-gradient-to-b from-neutral-100 to-white py-10 px-6">
      <div className="max-w-5xl mx-auto text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Why Choose Organizo
        </h2>
        <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
          Discover what makes Organizo events truly unique – from global experts to lively after-parties, we offer a complete experience you won’t forget.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {highlights.map((item, index) => (
          <div
            key={index}
            className="flex flex-col bg-white p-6 rounded-2xl shadow-md hover:shadow-xl border-t-4 border-neutral-200 transition-all duration-300"
          >
            <div className="mb-4 flex items-center justify-center w-14 h-14 rounded-full bg-gray-100 mx-auto">
              {item.icon}
            </div>
            <h3 className="text-xl font-bold text-gray-800 text-center mb-2">
              {item.title}
            </h3>
            <p className=" text-gray-600 text-center mb-4 text-base">
              {item.description}
            </p>
            <div className="flex-grow"></div>
            <button
              className={`mt-4 w-full py-2 font-medium rounded-lg border transition duration-300 ${item.buttonClasses}`}
            >
              Learn More
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EventHighlights;
