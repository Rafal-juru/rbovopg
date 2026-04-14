import React from 'react';
import videoBg from '../assets/video/Ricardo Institucional - Trim.mp4';
import logoSdesc from '../assets/images/logo_sdesc.png';

export const HeroSection: React.FC = () => {
  const phoneNumber = '5516991853878';
  const message = 'Ola, vim pelo site e gostaria de agendar uma consulta.';
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <section
      id="home"
      className="section-shell relative flex min-h-[calc(100vh-6rem)] items-center justify-center overflow-hidden bg-black"
    >
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
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a140f]/28 via-[#1f1711]/36 to-[#6f5732]/28" />
      </div>

      <div className="container relative z-10 mx-auto flex flex-col items-center justify-center px-4 py-12 text-center">
        <img
          src={logoSdesc}
          alt="Logotipo Ricardo Bovo"
          className="mb-8 h-32 w-auto object-contain md:h-44 lg:h-48"
        />
        <p className="mb-8 max-w-lg text-base font-medium leading-relaxed text-[#f2e7d7] md:text-lg">
          Dermatologia e medicina estética com resultados naturais.
        </p>
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-[#f5e7d2]/45 bg-[#f8efe3]/14 px-10 py-4 text-sm font-medium uppercase tracking-[0.22em] text-[#fff7ee] backdrop-blur-sm transition-all duration-300 hover:bg-[#f6eee4] hover:text-brand-black"
        >
          Agende sua Consulta
        </a>
      </div>
    </section>
  );
};
