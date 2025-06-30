import React from "react";
import { FaHandshake, FaLightbulb, FaSmile } from "react-icons/fa";

const missionPoints = [
  {
    icon: <FaHandshake className="text-indigo-600 text-3xl" />,
    title: "Client-Centered Approach",
    description:
      "We listen closely to understand your needs and make your vision a reality through careful planning and collaboration.",
  },
  {
    icon: <FaLightbulb className="text-yellow-500 text-3xl" />,
    title: "Creative Excellence",
    description:
      "Every event is a canvas — our team designs unique experiences that reflect your style and purpose.",
  },
  {
    icon: <FaSmile className="text-pink-500 text-3xl" />,
    title: "Memorable Moments",
    description:
      "We ensure smooth execution and joyful outcomes that leave lasting impressions on every guest.",
  },
];

const OurMission = () => {
  return (
    <section className="bg-gray-100 text-gray-800 py-20 px-6 mb-20 md:px-20">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Our Mission</h2>
        <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto">
          At Organizo, our mission is to turn your ideas into extraordinary events that reflect your values, inspire connection, and leave unforgettable memories.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {missionPoints.map((point, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all duration-300 text-left"
          >
            <div className="mb-4">{point.icon}</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{point.title}</h3>
            <p className="text-gray-600 text-base">{point.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurMission;
