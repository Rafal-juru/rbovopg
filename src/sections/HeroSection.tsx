import React from 'react';
import videoBg from '../assets/video/Ricardo Institucional.mp4';
import logo from '../assets/images/logo.png';

export const HeroSection: React.FC = () => {
  return (
    <section id="home" className="section-shell relative flex min-h-screen items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover object-center"
        >
          <source src={videoBg} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a140f]/30 via-[#1f1711]/40 to-[#6f5732]/34" />
      </div>

      <div className="container relative z-10 mx-auto flex flex-col items-center px-4 text-center">
        <img
          src={logo}
          alt="Logotipo Ricardo Bovo"
          className="mb-10 h-28 w-auto object-contain md:h-40 lg:h-44"
        />
        <h1 className="mb-4 max-w-4xl text-5xl font-semibold leading-tight tracking-[0.01em] text-[#f8f2e8] md:text-7xl lg:text-8xl">
          Dr. Ricardo Bovo
        </h1>
        <p className="mb-10 max-w-xl text-base font-medium leading-relaxed text-[#f2e7d7] md:text-lg">
          Dermatologia e medicina estetica com resultados naturais.
        </p>
        <button className="rounded-full border border-[#f5e7d2]/45 bg-[#f8efe3]/14 px-10 py-4 text-sm font-medium uppercase tracking-[0.22em] text-[#fff7ee] backdrop-blur-sm transition-all duration-300 hover:bg-[#f6eee4] hover:text-brand-black">
          Agende sua Consulta
        </button>
      </div>
    </section>
  );
};
