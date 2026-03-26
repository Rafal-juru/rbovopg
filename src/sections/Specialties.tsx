import React from 'react';

interface SpecialtyProps {
  title: string;
  description: string;
}

const SpecialtyCard: React.FC<SpecialtyProps> = ({ title, description }) => (
  <div className="bg-white p-8 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
    <h3 className="text-2xl mb-4 text-brand-black">{title}</h3>
    <p className="text-brand-gray leading-relaxed">{description}</p>
  </div>
);

export const Specialties: React.FC = () => {
  const specialties = [
    {
      title: 'Botox',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.'
    },
    {
      title: 'Preenchimento Facial',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.'
    },
    {
      title: 'Bioestimulador de Colágeno',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.'
    }
  ];

  return (
    <section className="py-24 bg-bg-light">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl mb-6 text-brand-black">Procedimentos</h2>
          <p className="text-brand-gray text-lg">
            Conheça os principais procedimentos realizados com foco em resultados naturais e harmoniosos.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {specialties.map((spec, index) => (
            <SpecialtyCard key={index} title={spec.title} description={spec.description} />
          ))}
        </div>
      </div>
    </section>
  );
};
