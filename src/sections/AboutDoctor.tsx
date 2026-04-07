import React from 'react';
import doctorPhoto from '../assets/images/bovo2.jpeg';

export const AboutDoctor: React.FC = () => {
  return (
    <section id="sobre" className="py-24 bg-white">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-16">
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={doctorPhoto}
            alt="Dr. Ricardo Bovo"
            className="w-full max-w-md aspect-[3/4] object-cover border border-gray-100"
          />
        </div>
        <div className="w-full md:w-1/2">
          <h2 className="text-4xl md:text-5xl mb-6 text-brand-black">
            Sobre o Dr. Ricardo Bovo
          </h2>
          <div className="space-y-4 text-brand-gray leading-relaxed text-lg">
            <p>
              Médico dermatologista e especialista em medicina estética, com atuação dedicada no cuidado da pele e no rejuvenescimento natural. Formado com excelência e constantemente atualizado com as mais recentes técnicas e protocolos da dermatologia.
            </p>
            <p>
              Acredita que cada paciente é único e merece um plano de tratamento personalizado, priorizando sempre resultados sutis, harmônicos e que preservem a identidade de cada pessoa.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
