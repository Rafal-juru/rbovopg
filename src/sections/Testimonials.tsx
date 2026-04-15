import React from 'react';

const testimonials = [
  {
    author: 'Paciente de dermatologia estética',
    text: 'Atendimento extremamente cuidadoso, explicações claras e resultados muito naturais. A experiência inteira foi acolhedora do começo ao fim.'
  },
  {
    author: 'Paciente de rejuvenescimento facial',
    text: 'O plano foi personalizado e o resultado respeitou totalmente meu rosto. Saí mais confiante sem perder minha identidade.'
  },
  {
    author: 'Paciente de acompanhamento clínico',
    text: 'Além da parte técnica, senti segurança em cada orientação. O cuidado no pós-atendimento fez toda a diferença.'
  }
];

export const Testimonials: React.FC = () => {
  return (
    <section id="relatos" className="section-shell">
      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="section-kicker mb-4">Avaliações</p>
          <h2 className="mb-5 text-4xl font-semibold text-brand-black md:text-6xl">
            Relatos que transmitem confiança
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-brand-black/70 md:text-lg">
            Uma seleção de experiências positivas para reforçar acolhimento, segurança e naturalidade no atendimento.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((item) => (
            <article key={item.author} className="clinic-card flex h-full flex-col p-8 transition-transform duration-300 hover:-translate-y-1">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-brand-gold/15 text-4xl leading-none text-brand-gold-deep">
                “
              </div>
              <p className="mb-8 flex-1 text-lg leading-relaxed text-brand-black/80">{item.text}</p>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-gold-deep">
                {item.author}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
