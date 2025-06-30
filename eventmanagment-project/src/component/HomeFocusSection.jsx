import React from "react";
import banner from '../assets/imagebanner.jpg'
const HomeFocusSection = () => {
  return (
    <section className="bg-gray-50 py-16 px-6 sm:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        {/* Left Text */}
        <div className="lg:w-1/2">
          <h2 className="text-5xl font-bold text-gray-900 leading-tight mb-6">
            Smart Event Management for Everyone
          </h2>
          <p className="text-gray-700 text-lg mb-8 max-w-lg">
            Plan, publish, and promote your events in one place. Whether it’s a tech conference or a community meetup, we make your event shine.
          </p>

          <ul className="space-y-6">
            <li className="flex items-start gap-3">
              <div className="w-5 h-5 mt-1 bg-gray-300 rounded-full"></div>
              <span className="text-gray-800 text-base">
                <strong>Effortless Creation:</strong> Set up events quickly with our clean dashboard.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-5 h-5 mt-1 bg-gray-300 rounded-full"></div>
              <span className="text-gray-800 text-base">
                <strong>Live Updates:</strong> Keep attendees informed with real-time notifications.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-5 h-5 mt-1 bg-gray-300 rounded-full"></div>
              <span className="text-gray-800 text-base">
                <strong>Analytics Dashboard:</strong> Monitor performance and track engagement easily.
              </span>
            </li>
          </ul>

          <button className="mt-10 bg-black text-white px-8 py-3 rounded-md font-semibold shadow-md hover:shadow-lg hover:bg-gray-900 transition duration-300">
            Start Managing Events
          </button>
        </div>

        {/* Right Image */}
        <div className="lg:w-1/2">
          <img
            src={banner}
            alt="Event dashboard"
            className="rounded-xl shadow-md"
          />
        </div>
      </div>
    </section>
  );
};

export default HomeFocusSection;
