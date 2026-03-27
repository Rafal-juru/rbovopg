import React from 'react';

export const AboutDoctor: React.FC = () => {
  return (
    <section id="sobre" className="py-24 bg-white">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-16">
        <div className="w-full md:w-1/2 flex justify-center">
          {/* Placeholder para a Foto do Médico */}
          <div className="w-full max-w-md aspect-[3/4] bg-bg-light flex items-center justify-center text-brand-gray border border-gray-100">
            [Foto Elegante do Dr. Ricardo]
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <h2 className="text-4xl md:text-5xl mb-6 text-brand-black">
            Sobre o Dr. Ricardo Bovo
          </h2>
          <div className="space-y-4 text-brand-gray leading-relaxed text-lg">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
