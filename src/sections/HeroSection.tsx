import React from 'react';
import videoBg from '../assets/video/Ricardo Institucional - Trim.mp4';
import logoSdesc from '../assets/images/logo_sdesc.png';

export const HeroSection: React.FC = () => {
  const phoneNumber = '5516991853878';
  const message = 'Olá, vim pelo site e gostaria de agendar uma consulta.';
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <section
      id="home"
      className="relative flex min-h-[calc(100vh-6rem)] items-center justify-center overflow-hidden bg-black"
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
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a140f]/35 via-[#1f1711]/42 to-[#6f5732]/35" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#fbf5eb] to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto flex flex-col items-center justify-center px-4 py-16 text-center">
        <img
          src={logoSdesc}
          alt="Logotipo Ricardo Bovo"
          className="mb-8 h-32 w-auto object-contain drop-shadow-[0_20px_45px_rgba(0,0,0,0.28)] md:h-44 lg:h-52"
        />
        <p className="mb-9 max-w-2xl text-lg font-medium leading-relaxed text-[#f8efe3] md:text-2xl">
          Dermatologia e medicina estética com precisão médica, acolhimento e resultados naturais.
        </p>
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-[#f5e7d2]/45 bg-[#f8efe3]/16 px-10 py-4 text-sm font-bold uppercase tracking-[0.2em] text-[#fff7ee] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#f6eee4] hover:text-brand-black"
        >
          Agende sua consulta
        </a>
      </div>
    </section>
  );
};
