import React from 'react';
import doctorPhoto from '../assets/images/bovo2.jpeg';

export const AboutDoctor: React.FC = () => {
  return (
    <section id="sobre" className="section-shell py-24">
      <div className="container mx-auto flex flex-col items-center gap-16 px-4 md:flex-row">
        <div className="relative flex w-full justify-center md:w-1/2">
          <img
            src={doctorPhoto}
            alt="Dr. Ricardo Bovo"
            className="glass-card aspect-[3/4] w-full max-w-md object-cover p-3"
          />
        </div>
        <div className="w-full md:w-1/2">
          <p className="section-kicker mb-3 text-2xl md:text-3xl">Quem cuida</p>
          <h2 className="mb-6 text-4xl font-semibold md:text-6xl">
            Sobre o Dr. Ricardo Bovo
          </h2>
          <div className="space-y-4 text-lg leading-relaxed text-brand-black/80">
            <p>
              Médico dermatologista e especialista em medicina estética, com atuação dedicada
              ao cuidado da pele e ao rejuvenescimento natural. Sua prática une critério técnico,
              escuta qualificada e atualização constante.
            </p>
            <p>
              Cada paciente é atendido de forma individualizada, com planos personalizados que
              priorizam segurança, naturalidade e resultados harmônicos, sem descaracterizar a
              identidade de quem procura o consultório.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
