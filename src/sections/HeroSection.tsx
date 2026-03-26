import React from 'react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-bg-light overflow-hidden">
      <div className="container mx-auto px-4 z-10 flex flex-col items-center text-center">
        <h1 className="text-5xl md:text-7xl mb-6">
          Dr. Ricardo Bovo
        </h1>
        <p className="text-brand-gray text-lg md:text-xl max-w-2xl mb-10">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elevando a sua autoestima com dermatologia e medicina estética de excelência.
        </p>
        <button className="bg-brand-black text-white px-8 py-4 rounded-sm text-lg tracking-wider hover:bg-black/80 transition-colors uppercase font-semibold">
          Agende sua Consulta
        </button>
      </div>
      {/* Placeholder para uma imagem de fundo elegante */}
      <div className="absolute inset-0 z-0 opacity-[0.03] bg-brand-black"></div>
    </section>
  );
};
