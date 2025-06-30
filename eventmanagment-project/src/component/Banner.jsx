import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import image1 from '../assets/image1.jpg';
import image2 from '../assets/image2.jpg';
import image3 from '../assets/image3.jpg';
import image4 from '../assets/image4.jpg';

const bannerData = [
  {
    image: image4,
    title: 'Organizo',
    slogan: 'Making Every Moment Memorable',
    subtext: 'Your trusted partner in event planning and execution.',
  },
  {
    image: image3,
    title: 'Effortless Planning',
    slogan: 'From Vision to Celebration',
    subtext: 'We handle the details, so you can enjoy the moment.',
  },
  {
    image: image1,
    title: 'Celebrate With Style',
    slogan: 'Events That Spark Joy',
    subtext: 'Let us create an unforgettable experience for you.',
  },
  {
    image: image2,
    title: 'Your Event, Our Mission',
    slogan: 'Turning Dreams into Reality',
    subtext: 'Organizing events with precision and passion.',
  },
];

const Banner = () => {
  return (
    <div className="relative">
      <Carousel
        autoPlay
        infiniteLoop
        interval={3000}
        stopOnHover
        showThumbs={false}
        showStatus={false}
        dynamicHeight={false}
        className="carousel-container"
      >
        {bannerData.map((item, index) => (
          <div key={index} className="relative">
            <img
              src={item.image}
              alt={`Slide ${index + 1}`}
              className="object-cover h-[500px] md:h-[650px] w-full"
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/50 px-6 py-6 rounded-lg w-11/12 md:w-8/12 lg:w-6/12 text-center space-y-3">
              <h1 className="text-white text-3xl md:text-5xl font-extrabold">
                {item.title}
              </h1>
              <h2 className="text-white text-xl md:text-3xl font-bold">
                {item.slogan}
              </h2>
              <p className="text-gray-200 text-sm md:text-base">
                {item.subtext}
              </p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
