import React, { useState } from 'react';
import Image from 'next/image';

const images = [
  '/1.jpg',
  '/2.jpg',
  '/3.jpg',
  '/4.jpg',
  '/5.jpg',
  '/6.jpg',
  '/7.jpg',
];

const ClimateCarousel: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % images.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="relative w-full h-[60vw] max-h-[80vh] min-h-[300px] flex items-center justify-center overflow-hidden rounded-2xl shadow-2xl bg-black" style={{maxWidth: '100vw', aspectRatio: '16/9'}}>
      <button
        aria-label="Previous slide"
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/70 text-white rounded-full p-2 transition"
      >
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
      </button>
      <div className="w-full h-full flex items-center justify-center">
        <Image
          src={images[current]}
          alt={`Slide ${current + 1}`}
          fill
          style={{ objectFit: 'cover' }}
          className="transition-all duration-700"
          sizes="100vw"
          priority
        />
      </div>
      <button
        aria-label="Next slide"
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/70 text-white rounded-full p-2 transition"
      >
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
      </button>
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, idx) => (
          <span
            key={idx}
            className={`block w-2 h-2 rounded-full ${idx === current ? 'bg-green-400' : 'bg-gray-400/40'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ClimateCarousel; 