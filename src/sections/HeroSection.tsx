import React from 'react';
import videoBg from '../assets/video/Ricardo Institucional.mp4';

export const HeroSection: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={videoBg} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="container mx-auto px-4 z-10 flex flex-col items-center text-center">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-wide mb-6 text-white/95">
          Dr. Ricardo Bovo
        </h1>
        <p className="text-white/80 text-lg md:text-xl max-w-xl mb-10 leading-relaxed font-light">
          Dermatologia e medicina estética de excelência,
          com foco em resultados naturais e harmônicos.
        </p>
        <button className="bg-white/10 backdrop-blur-sm text-white border border-white/30 px-10 py-4 text-sm tracking-[0.25em] hover:bg-white hover:text-black transition-all duration-300 uppercase font-medium">
          Agende sua Consulta
        </button>
      </div>
    </section>
  );
};
