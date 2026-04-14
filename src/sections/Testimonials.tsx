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
    <section id="relatos" className="section-shell py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="section-kicker mb-4 text-xl md:text-2xl">Relatos e avaliações</p>
          <h2 className="mb-6 text-5xl font-semibold md:text-6xl">
            Experiências positivas que reforçam confiança
          </h2>
          <p className="text-lg text-brand-black/70">
            Nova aba transformada em seção dedicada a depoimentos, pronta para receber avaliações reais e fortalecer prova social.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((item) => (
            <article key={item.author} className="glass-card rounded-[28px] p-8">
              <div className="mb-6 text-4xl leading-none text-brand-gold-deep">"</div>
              <p className="mb-6 text-lg leading-relaxed text-brand-black/80">{item.text}</p>
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
