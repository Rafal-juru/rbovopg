import React from 'react';
import doctorPhoto from '../assets/images/bovo2.jpeg';

const highlights = ['Diagnóstico preciso', 'Planos individualizados', 'Resultados naturais'];

export const AboutDoctor: React.FC = () => {
  return (
    <section id="sobre" className="section-shell">
      <div className="container relative z-10 mx-auto grid gap-12 px-4 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
        <div className="relative mx-auto w-full max-w-md lg:mx-0">
          <div className="absolute -left-6 -top-6 hidden h-28 w-28 rounded-full border border-brand-gold/25 bg-white/35 md:block" />
          <div className="absolute -bottom-5 -right-5 hidden h-36 w-36 rounded-full bg-brand-gold/15 blur-2xl md:block" />
          <img
            src={doctorPhoto}
            alt="Dr. Ricardo Bovo"
            className="relative aspect-[3/4] w-full rounded-[38px] border border-white/75 bg-white/70 object-cover p-3 shadow-[0_28px_70px_rgba(66,47,24,0.14)]"
          />
        </div>

        <div className="clinic-card p-8 md:p-12">
          <p className="section-kicker mb-4">Quem cuida</p>
          <h2 className="mb-6 text-4xl font-semibold leading-tight text-brand-black md:text-6xl">
            Técnica médica com escuta, precisão e naturalidade
          </h2>
          <div className="space-y-5 text-lg leading-relaxed text-brand-black/78">
            <p>
              O Dr. Ricardo Bovo atua em dermatologia com foco no diagnóstico preciso e no tratamento resolutivo de doenças da pele, cabelos e unhas, integrando saúde e estética com responsabilidade médica.
            </p>
            <p>
              A abordagem prioriza a compreensão de cada caso, evitando soluções padronizadas e promessas irreais. O cuidado é construído com tempo, segurança e coerência com as necessidades de cada paciente.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {highlights.map((item) => (
              <span key={item} className="clinic-chip normal-case tracking-normal">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
