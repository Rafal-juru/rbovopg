import React from 'react';

const values = [
  {
    title: 'Resolutividade médica',
    text: 'Diagnóstico preciso e tratamentos eficazes para buscar a solução real do problema dermatológico.'
  },
  {
    title: 'Transparência',
    text: 'Comunicação clara sobre diagnósticos, procedimentos e resultados possíveis, sem promessas irreais.'
  },
  {
    title: 'Responsabilidade estética',
    text: 'Procedimentos com critério médico, preservando naturalidade, saúde da pele e equilíbrio.'
  },
  {
    title: 'Atendimento individualizado',
    text: 'Planos personalizados para pele, cabelos e unhas, respeitando a necessidade de cada paciente.'
  },
  {
    title: 'Qualidade técnica',
    text: 'Conhecimento atualizado, tecnologias adequadas e boas práticas para mais segurança e eficiência.'
  },
  {
    title: 'Acessibilidade com equilíbrio',
    text: 'Atendimento de alta qualidade com preço justo, sem abrir mão da excelência.'
  },
  {
    title: 'Cuidado contínuo',
    text: 'Acompanhamento ao longo do tempo para prevenção, manutenção e resultados consistentes.'
  }
];

export const MissionValues: React.FC = () => {
  return (
    <section id="missao" className="section-shell">
      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="section-kicker mb-4">Institucional</p>
          <h2 className="text-4xl font-semibold leading-tight text-brand-black md:text-6xl">
            Missão e valores em uma mesma direção
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <div className="clinic-card relative overflow-hidden p-8 md:p-12">
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand-gold/15 blur-2xl" />
            <p className="section-kicker relative mb-4">Propósito clínico</p>
            <h2 className="relative mb-8 text-4xl font-semibold leading-tight text-brand-black md:text-6xl">
              Dermatologia clara, ética e centrada no paciente
            </h2>
            <div className="relative space-y-5 text-lg leading-relaxed text-brand-black/75">
              <p>
                Promover saúde e bem-estar por meio da dermatologia, oferecendo diagnóstico preciso e tratamentos resolutivos para doenças da pele, cabelos e unhas.
              </p>
              <p>
                Cada plano é construído de forma individualizada, com segurança, responsabilidade médica e expectativas reais de resultado.
              </p>
              <p>
                Mais do que realizar procedimentos, a clínica busca transformar o cuidado dermatológico em um processo contínuo de prevenção, acompanhamento e confiança.
              </p>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {values.map((value, index) => (
              <article key={value.title} className="clinic-card p-6 transition-transform duration-300 hover:-translate-y-1">
                <span className="mb-5 inline-flex text-sm font-bold text-brand-gold-deep">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mb-3 text-2xl font-semibold text-brand-black">{value.title}</h3>
                <p className="leading-relaxed text-brand-black/72">{value.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
