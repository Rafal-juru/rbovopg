import React from 'react';
import proc1 from '../assets/images/procedimento1.jpg';
import proc2 from '../assets/images/procedimento2.jpg';
import proc3 from '../assets/images/procedimento3.jpg';
import proc4 from '../assets/images/procedimento4.jpg';
import proc5 from '../assets/images/procedimento5.jpeg';
import proc6 from '../assets/images/procedimento6.jpeg';
import proc7 from '../assets/images/procedimento7.jpeg';

interface SpecialtyProps {
  title: string;
  description: string;
  image: string;
}

const SpecialtyCard: React.FC<SpecialtyProps> = ({ title, description, image }) => (
  <div className="glass-card overflow-hidden transition-transform duration-300 hover:-translate-y-1">
    <div className="overflow-hidden">
      <img src={image} alt={title} className="h-72 w-full object-cover" />
    </div>
    <div className="p-8">
      <h3 className="mb-4 text-3xl font-semibold text-brand-black">{title}</h3>
      <p className="leading-relaxed text-brand-black/75">{description}</p>
    </div>
  </div>
);

export const Specialties: React.FC = () => {
  const specialties = [
    {
      title: 'Botox',
      image: proc1,
      description:
        'Aplicação precisa de toxina botulínica para suavizar linhas de expressão e valorizar a naturalidade do rosto.'
    },
    {
      title: 'Preenchimento Facial',
      image: proc2,
      description:
        'Harmonização dos contornos faciais com ácido hialurônico para restaurar volume, realçar traços e devolver jovialidade.'
    },
    {
      title: 'Bioestimulador de Colágeno',
      image: proc3,
      description:
        'Estimula a produção natural de colágeno, promovendo mais firmeza, viço e sustentação de forma gradual e duradoura.'
    },
    {
      title: 'Peeling Químico',
      image: proc4,
      description:
        'Renovação celular com ácidos selecionados para tratar manchas, cicatrizes e textura irregular da pele.'
    },
    {
      title: 'Laser Facial',
      image: proc5,
      description:
        'Tecnologia de ponta para tratar lesões pigmentadas, vasculares e texturais, com foco em rejuvenescimento e recuperação segura.'
    },
    {
      title: 'Dermatologia Clínica',
      image: proc6,
      description:
        'Acompanhamento especializado de doenças da pele, unhas, cabelos e mucosas, com diagnóstico preciso e protocolos individualizados.'
    },
    {
      title: 'Microagulhamento com Drug Delivery',
      image: proc7,
      description:
        'Microperfurações associadas à entrega controlada de ativos para tratar cicatrizes, estrias e melasma de maneira segura.'
    }
  ];

  return (
    <section id="especialidades" className="section-shell py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <p className="section-kicker mb-4 text-xl md:text-2xl">Especialidades</p>
          <h2 className="mb-6 text-5xl font-semibold text-brand-black md:text-7xl">
            Procedimentos
          </h2>
          <p className="text-lg text-brand-black/75">
            Conheça os principais procedimentos realizados com foco em resultados naturais e harmoniosos.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {specialties.map((spec) => (
            <SpecialtyCard
              key={spec.title}
              title={spec.title}
              description={spec.description}
              image={spec.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
