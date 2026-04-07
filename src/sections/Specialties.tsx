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
  <div className="bg-white border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300">
    <div className="overflow-hidden">
      <img src={image} alt={title} className="w-full h-72 object-cover" />
    </div>
    <div className="p-8">
      <h3 className="text-2xl mb-4 text-brand-black">{title}</h3>
      <p className="text-brand-gray leading-relaxed">{description}</p>
    </div>
  </div>
);

export const Specialties: React.FC = () => {
  const specialties = [
    {
      title: 'Botox',
      image: proc1,
      description:
        'Ação rejuvenescedora com toxina botulínica aplicada com técnica precisa, suavizando linhas de expressão e rugas dinâmicas do terço superior do rosto.'
    },
    {
      title: 'Preenchimento Facial',
      image: proc2,
      description:
        'Harmonização dos contornos faciais com ácido hialurônico para restaurar volume, realçar traços e devolver jovialidade ao semblante.'
    },
    {
      title: 'Bioestimulador de Colágeno',
      image: proc3,
      description:
        'Estímulo natural à produção de colágeno que melhora a firmeza, a densidade e a qualidade da pele de forma gradual e duradoura.'
    },
    {
      title: 'Peeling Químico',
      image: proc4,
      description:
        'Renovação celular profunda por meio de ácidos selecionados, tratando manchas, cicatrizes e textura irregular da pele.'
    },
    {
      title: 'Laser Facial',
      image: proc5,
      description:
        'Tecnologia de ponta para tratamento de lesões pigmentadas, vasculares e texturais, promovendo rejuvenescimento com mínima agressão.'
    },
    {
      title: 'Dermatologia Clínica',
      image: proc6,
      description:
        'Acompanhamento especializado de doenças da pele, unhas, cabelos e mucosas, com diagnóstico preciso e protocolos individualizados.'
    },
    {
      title: 'Microneurolagem com Drug Delivery',
      image: proc7,
      description:
        'Microperfuras combinadas à entrega controlada de ativos para tratar cicatrizes, estrias e melasma de maneira eficaz e segura.'
    }
  ];

  return (
    <section id="especialidades" className="py-24 bg-bg-light">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl mb-6 text-brand-black">
            Procedimentos
          </h2>
          <p className="text-brand-gray text-lg">
            Conheça os principais procedimentos realizados com foco em resultados naturais e harmoniosos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {specialties.map((spec, index) => (
            <SpecialtyCard
              key={index}
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
