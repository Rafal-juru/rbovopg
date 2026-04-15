import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import proc1 from '../assets/images/procedimento1.jpg';
import proc2 from '../assets/images/procedimento2.jpg';
import proc3 from '../assets/images/procedimento3.jpg';
import proc4 from '../assets/images/procedimento4.jpg';
import proc5 from '../assets/images/procedimento5.jpeg';
import proc6 from '../assets/images/procedimento6.jpeg';
import proc7 from '../assets/images/procedimento7.jpeg';

interface Specialty {
  group: string;
  category: string;
  title: string;
  description: string;
  image: string;
  fullDescription: string[];
}

interface SpecialtyCardProps extends Specialty {
  index: number;
  onOpen: () => void;
}

const specialties: Specialty[] = [
  {
    group: 'Estética facial',
    category: 'Face',
    title: 'Preenchimento facial',
    image: proc1,
    description: 'Repõe volume, suaviza rugas e harmoniza o contorno do rosto com ácido hialurônico e resultados naturais.',
    fullDescription: [
      'O preenchimento facial com ácido hialurônico é um dos procedimentos mais procurados para devolver harmonia e jovialidade ao rosto sem recorrer à cirurgia.',
      'É indicado para repor volume perdido com o envelhecimento, corrigir sulcos profundos, como o bigode chinês, e melhorar o contorno de regiões como mandíbula e maçãs do rosto.',
      'Na Clínica Dr. Ricardo Bovo, o preenchimento é realizado após avaliação individualizada, respeitando a anatomia e o objetivo de cada paciente.',
      'O ácido hialurônico é uma substância biocompatível que atrai água para a região tratada, promovendo hidratação e sustentação.',
      'O diferencial está na busca por equilíbrio e naturalidade, evitando resultados artificiais ou exagerados.'
    ]
  },
  {
    group: 'Estética facial',
    category: 'Face',
    title: 'Fios de sustentação',
    image: proc2,
    description: 'Promove efeito lifting imediato, trata a flacidez facial e estimula colágeno sem necessidade de cirurgia.',
    fullDescription: [
      'Os fios de sustentação são indicados para pacientes que desejam tratar a flacidez facial e melhorar o contorno do rosto de forma minimamente invasiva.',
      'O procedimento promove efeito lifting imediato, reposicionando tecidos caídos, e continua agindo ao longo do tempo ao estimular a produção de colágeno.',
      'É indicado para flacidez leve a moderada em áreas como terço médio da face, mandíbula, linha da jawline e pescoço.',
      'Durante a aplicação, os fios são inseridos por microagulhas ou cânulas, tracionando a pele para uma posição mais elevada.',
      'O resultado é um rosto mais definido, com contornos suavizados e aparência naturalmente rejuvenescida.'
    ]
  },
  {
    group: 'Estética facial',
    category: 'Face',
    title: 'Toxina botulínica',
    image: proc3,
    description: 'Suaviza rugas de expressão, previne sinais do envelhecimento e pode auxiliar em bruxismo e suor excessivo.',
    fullDescription: [
      'A toxina botulínica, popularmente conhecida como botox, é referência na prevenção e suavização das rugas de expressão.',
      'Ela age relaxando a musculatura facial responsável por linhas da testa, glabela e pés de galinha, mantendo um olhar descansado sem perder expressividade natural.',
      'Além do uso estético, pode ser indicada para tratamentos funcionais, como bruxismo, enxaqueca crônica e hiperidrose.',
      'O efeito costuma durar de 4 a 6 meses, exigindo manutenção para prolongar os benefícios.',
      'A aplicação é rápida, realizada em consultório, e o paciente pode retomar suas atividades no mesmo dia.'
    ]
  },
  {
    group: 'Estética facial',
    category: 'Tecnologia',
    title: 'Ultraformer facial',
    image: proc4,
    description: 'Ultrassom microfocado para tratar flacidez, estimular colágeno e melhorar a definição do contorno facial.',
    fullDescription: [
      'O Ultraformer facial é uma tecnologia avançada para rejuvenescimento sem cirurgia.',
      'Utilizando ultrassom microfocado, o tratamento atinge camadas profundas da pele, chegando à musculatura, onde promove efeito lifting progressivo.',
      'Seu diferencial é agir sem agredir a superfície da pele, ao mesmo tempo em que estimula fortemente a produção de novo colágeno.',
      'O resultado é uma pele mais firme, com redução da flacidez e contorno facial mais definido.',
      'A melhora é progressiva e se consolida nos meses seguintes, sem cortes e sem tempo de recuperação cirúrgica.'
    ]
  },
  {
    group: 'Estética facial',
    category: 'Pele',
    title: 'Peeling químico',
    image: proc5,
    description: 'Promove renovação da pele, auxiliando no tratamento de manchas, acne, cicatrizes e textura irregular.',
    fullDescription: [
      'O peeling químico utiliza ácidos específicos para promover esfoliação profunda da pele e estimular renovação celular.',
      'É indicado para manchas, melasma, manchas solares, cicatrizes de acne, linhas finas e textura áspera da pele.',
      'Existem diferentes tipos de peeling, desde superficiais até protocolos mais profundos, conforme a necessidade do paciente.',
      'Na Clínica Dr. Ricardo Bovo, o tipo de ácido e a concentração são escolhidos após avaliação clínica detalhada.',
      'O resultado é uma pele mais uniforme, luminosa, macia e com sinais de envelhecimento e danos solares atenuados.'
    ]
  },
  {
    group: 'Estética facial',
    category: 'Pele',
    title: 'Microagulhamento',
    image: proc6,
    description: 'Estimula colágeno e elastina, sendo indicado para cicatrizes de acne, melasma e rejuvenescimento.',
    fullDescription: [
      'O microagulhamento é um procedimento minimamente invasivo que cria microperfurações controladas na pele com microagulhas.',
      'Essas lesões induzem o organismo a iniciar um processo de reparação, produzindo novo colágeno e elastina.',
      'É indicado para cicatrizes de acne, estrias, poros dilatados, melasma e rejuvenescimento.',
      'O procedimento também potencializa a absorção de ativos aplicados após a sessão.',
      'A pele pode ficar avermelhada por alguns dias, mas tende a apresentar melhora de textura, firmeza e qualidade geral.'
    ]
  },
  {
    group: 'Estética facial',
    category: 'Tecnologia',
    title: 'Radiofrequência facial',
    image: proc7,
    description: 'Aquece camadas profundas da pele para tratar flacidez, melhorar firmeza e favorecer a qualidade da pele.',
    fullDescription: [
      'A radiofrequência facial é conhecida por sua eficácia no combate à flacidez.',
      'O aparelho emite ondas eletromagnéticas que aquecem de forma controlada as camadas profundas da pele.',
      'Esse aquecimento causa contração das fibras de colágeno e estimula a produção de novas fibras ao longo do tempo.',
      'O processo resulta em pele mais firme, flacidez reduzida e contorno facial mais definido.',
      'É um tratamento indolor, sem tempo de repouso, indicado como manutenção ou alternativa inicial para casos leves.'
    ]
  },
  {
    group: 'Estética facial',
    category: 'Pele',
    title: 'Protocolo de melasma',
    image: proc5,
    description: 'Tratamento personalizado e contínuo que combina técnicas para controlar e clarear manchas na pele.',
    fullDescription: [
      'O melasma é uma condição complexa, caracterizada por manchas escuras que surgem principalmente no rosto.',
      'Por isso, seu tratamento não deve ser feito com uma única abordagem. O protocolo de melasma é um plano contínuo e personalizado.',
      'Ele pode combinar peelings químicos, microagulhamento com ativos clareadores, lasers específicos e uso de despigmentantes tópicos.',
      'Tudo isso deve estar aliado ao controle rigoroso do uso de protetor solar.',
      'O objetivo é controlar a ativação das manchas, clarear a pele e manter resultados duradouros com acompanhamento.'
    ]
  },
  {
    group: 'Estética facial',
    category: 'Face',
    title: 'Laser labial',
    image: proc2,
    description: 'Estimula colágeno nos lábios, melhorando textura, hidratação e promovendo aumento de volume discreto.',
    fullDescription: [
      'O laser labial é um procedimento para quem deseja melhorar a aparência dos lábios sem recorrer necessariamente a preenchedores.',
      'O tratamento utiliza tecnologia a laser para estimular a produção de colágeno e elastina na região.',
      'Com isso, promove melhora de textura, hidratação e definição do contorno labial.',
      'O resultado é um aumento de volume sutil e natural, além da redução de linhas finas ao redor da boca.',
      'É uma opção rápida, segura e gradual para rejuvenescimento labial.'
    ]
  },
  {
    group: 'Estética corporal',
    category: 'Corpo',
    title: 'Ultraformer corporal',
    image: proc4,
    description: 'Ultrassom microfocado para reduzir gordura localizada, tratar flacidez e modelar o contorno corporal.',
    fullDescription: [
      'Assim como na versão facial, o Ultraformer corporal é uma tecnologia para tratar flacidez e gordura localizada.',
      'O ultrassom microfocado atinge camadas profundas, destruindo células de gordura e estimulando produção de colágeno.',
      'É indicado para áreas como abdômen, flancos, culote e parte interna das coxas.',
      'O resultado é uma pele mais firme, com flacidez reduzida e contorno corporal mais definido, sem cortes e sem repouso.',
      'Os resultados são progressivos e se tornam mais evidentes nos meses seguintes ao tratamento.'
    ]
  },
  {
    group: 'Estética corporal',
    category: 'Corpo',
    title: 'CoolSculpting',
    image: proc6,
    description: 'Criolipólise para reduzir gordura localizada pelo congelamento controlado das células de gordura.',
    fullDescription: [
      'O CoolSculpting é um dos aparelhos mais reconhecidos para criolipólise, método não invasivo para gordura localizada.',
      'O tratamento resfria as células de gordura de forma controlada, levando-as à morte celular programada.',
      'Essas células são eliminadas naturalmente pelo organismo ao longo das semanas seguintes.',
      'É indicado para áreas como barriga, flancos, costas e coxas, especialmente quando a gordura localizada resiste a dieta e exercícios.',
      'O CoolSculpting não é um tratamento para emagrecer, mas para modelar o corpo e refinar o contorno.'
    ]
  },
  {
    group: 'Estética corporal',
    category: 'Corpo',
    title: 'Mesoterapia para papada',
    image: proc7,
    description: 'Tratamento minimamente invasivo para reduzir gordura sob o queixo e melhorar o contorno da mandíbula.',
    fullDescription: [
      'A mesoterapia para papada é uma alternativa não cirúrgica para tratar a gordura submentoniana.',
      'O procedimento consiste em microinjeções de substâncias lipolíticas diretamente na gordura localizada sob o queixo.',
      'Essas substâncias atuam destruindo membranas das células de gordura, que são metabolizadas e eliminadas pelo corpo.',
      'O tratamento é realizado em sessões e pode promover redução progressiva do volume.',
      'Com isso, melhora a definição do contorno da mandíbula e do perfil facial.'
    ]
  },
  {
    group: 'Estética corporal',
    category: 'Corpo',
    title: 'Mesoterapia abdominal',
    image: proc6,
    description: 'Técnica que atua na gordura localizada do abdômen, ajudando a reduzir medidas e modelar a região.',
    fullDescription: [
      'A mesoterapia abdominal é um tratamento estético voltado à gordura localizada no abdômen.',
      'Utiliza microinjeções de medicamentos lipolíticos na camada de gordura subcutânea.',
      'Essas substâncias rompem células de gordura, que são posteriormente eliminadas pelo sistema linfático.',
      'É um procedimento complementar a hábitos saudáveis, ajudando a reduzir medidas e melhorar o contorno abdominal.',
      'Pode ser indicado para pequenas áreas de gordura localizada que resistem a dieta e exercícios.'
    ]
  },
  {
    group: 'Tratamentos capilares',
    category: 'Cabelos',
    title: 'Protocolo capilar',
    image: proc3,
    description: 'Plano individualizado para investigar e tratar queda de cabelo, fortalecendo fios e estimulando crescimento.',
    fullDescription: [
      'A queda de cabelo é um problema que afeta a autoestima de muitas pessoas.',
      'O protocolo capilar começa com diagnóstico dermatológico preciso para identificar causas genéticas, hormonais, nutricionais ou relacionadas ao estresse.',
      'A partir do diagnóstico, o plano pode incluir medicamentos tópicos ou orais, suplementação vitamínica e procedimentos de estímulo capilar.',
      'O objetivo é frear a queda, fortalecer os fios existentes e, quando possível, estimular o crescimento de novos cabelos.',
      'O acompanhamento médico ajuda a ajustar o tratamento conforme a resposta de cada paciente.'
    ]
  },
  {
    group: 'Tratamentos capilares',
    category: 'Cabelos',
    title: 'Manutenção capilar',
    image: proc3,
    description: 'Acompanhamento para preservar resultados obtidos no tratamento da queda e manter a saúde dos fios.',
    fullDescription: [
      'Assim como a pele, o cabelo precisa de cuidados contínuos.',
      'A manutenção capilar consolida resultados obtidos em ciclos intensivos de tratamento e ajuda a evitar nova queda acentuada.',
      'O protocolo envolve consultas de acompanhamento e continuidade de tratamentos de forma espaçada.',
      'Podem ser indicadas loções tópicas, medicamentos em dose de manutenção ou sessões periódicas de estímulo capilar.',
      'A proposta é manter a saúde dos folículos e regular o ciclo de crescimento do cabelo.'
    ]
  },
  {
    group: 'Dermatologia clínica',
    category: 'Médico',
    title: 'Remoção de tatuagem a laser',
    image: proc4,
    description: 'Método para fragmentar pigmentos indesejados da pele e favorecer sua eliminação pelo organismo.',
    fullDescription: [
      'A remoção de tatuagem a laser funciona por fototermólise seletiva.',
      'O laser emite pulsos de luz de alta energia que são absorvidos pelas partículas de tinta da tatuagem.',
      'Essa energia fragmenta o pigmento em micropartículas que o sistema imunológico consegue remover naturalmente.',
      'O número de sessões varia conforme cor, profundidade e idade da tatuagem.',
      'O procedimento é realizado em consultório, com cuidado para conforto e segurança do paciente.'
    ]
  },
  {
    group: 'Dermatologia clínica',
    category: 'Médico',
    title: 'Cirurgias dermatológicas',
    image: proc1,
    description: 'Procedimentos como lobuloplastia e cantoplastia, realizados com rigor técnico e anestesia local.',
    fullDescription: [
      'A experiência em procedimentos cirúrgicos é um dos diferenciais da clínica.',
      'Entre as cirurgias dermatológicas estão lobuloplastia, para correção do lóbulo da orelha, e cantoplastia, para reparo da região palpebral.',
      'A lobuloplastia reconstrui deformidades causadas por brincos pesados, traumas ou alargamentos.',
      'A cantoplastia corrige a posição ou forma do canto externo dos olhos, quando indicada por questões funcionais ou estéticas.',
      'Essas cirurgias são realizadas em ambiente seguro, com anestesia local e responsabilidade médica.'
    ]
  },
  {
    group: 'Estética íntima',
    category: 'Íntimo',
    title: 'Procedimentos íntimos a laser',
    image: proc5,
    description: 'Tratamentos a laser para saúde e estética íntima, melhorando lubrificação, flacidez e qualidade dos tecidos.',
    fullDescription: [
      'A saúde íntima vai além da estética, impactando diretamente qualidade de vida e bem-estar.',
      'Procedimentos íntimos a laser podem incluir laser CO2 fracionado vaginal e laser intravaginal.',
      'São indicados para rejuvenescimento vaginal, ressecamento, flacidez, incontinência urinária leve e desconforto durante relações.',
      'O laser estimula a produção de colágeno, melhora vascularização e hidratação da mucosa vaginal.',
      'O atendimento deve ser feito com respeito, sigilo, cuidado e avaliação individualizada.'
    ]
  },
  {
    group: 'Tecnologias e lasers avançados',
    category: 'Laser',
    title: 'Laser CO2 fracionado',
    image: proc4,
    description: 'Tratamento intenso para renovação da pele, cicatrizes, rugas, manchas e flacidez em rosto, corpo e região íntima.',
    fullDescription: [
      'O laser CO2 fracionado é considerado uma referência para rejuvenescimento e tratamento de cicatrizes.',
      'Sua tecnologia cria microcolunas de ablação na pele, preservando áreas saudáveis entre elas.',
      'Isso acelera a cicatrização e estimula uma potente produção de colágeno.',
      'Pode ser indicado para rugas profundas, cicatrizes de acne, manchas, estrias, flacidez e rejuvenescimento da mucosa vaginal.',
      'O pós-procedimento requer cuidados específicos, mas os resultados podem ser expressivos.'
    ]
  },
  {
    group: 'Tecnologias e lasers avançados',
    category: 'Laser',
    title: 'Laser Acroma',
    image: proc5,
    description: 'Tecnologia para tratar manchas, incluindo melasma, promovendo clareamento gradual e seguro.',
    fullDescription: [
      'O laser Acroma atua no tratamento de hiperpigmentações.',
      'Ele utiliza comprimento de onda específico absorvido pela melanina, fragmentando o pigmento escuro sem agredir a pele ao redor.',
      'É indicado para manchas solares, lentigos, manchas senis e melasma.',
      'Por ser mais suave, geralmente exige múltiplas sessões, com baixo tempo de recuperação.',
      'É uma opção para clarear a pele de forma gradual, controlada e segura.'
    ]
  },
  {
    group: 'Tecnologias e lasers avançados',
    category: 'Laser',
    title: 'Laser para vasinhos',
    image: proc2,
    description: 'Tratamento para vasos sanguíneos aparentes no rosto e corpo, com redução gradual dos vasinhos tratados.',
    fullDescription: [
      'Os vasinhos são pequenos vasos sanguíneos dilatados visíveis na superfície da pele.',
      'O laser para vasinhos funciona por fototermólise seletiva, sendo absorvido pela hemoglobina dentro do vaso.',
      'O calor coagula e destrói o vaso, que depois é reabsorvido pelo organismo.',
      'Pode ser indicado para vasinhos no rosto, nariz, bochechas ou pernas.',
      'O tratamento é rápido e os vasinhos somem gradualmente nas semanas seguintes.'
    ]
  },
  {
    group: 'Tecnologias e lasers avançados',
    category: 'Laser',
    title: 'Laser para unhas',
    image: proc7,
    description: 'Tratamento complementar para micose de unha, auxiliando no controle dos fungos sem medicamentos orais.',
    fullDescription: [
      'A micose de unha é uma infecção fúngica que deixa as unhas amareladas, espessas e quebradiças.',
      'O laser para unhas aquece a unha e a pele ao redor, criando ambiente desfavorável para os fungos.',
      'Pode ser uma alternativa para pacientes que não podem ou não desejam usar antifúngicos orais.',
      'O tratamento é rápido, indolor e geralmente exige algumas sessões.',
      'Pode ser combinado ou não com tratamentos tópicos, conforme avaliação médica.'
    ]
  },
  {
    group: 'Tecnologias e lasers avançados',
    category: 'Laser',
    title: 'Laser LIP',
    image: proc1,
    description: 'Laser não ablativo para rejuvenescimento de rosto, pálpebras, mãos e colo, melhorando manchas e textura.',
    fullDescription: [
      'O laser LIP é uma tecnologia não ablativa, que age sem destruir a camada superficial da pele.',
      'É indicado para áreas delicadas onde o envelhecimento é mais evidente, como rosto, pálpebras, mãos e colo.',
      'No rosto e colo, melhora textura, reduz manchas solares, estimula colágeno e combate sinais iniciais de flacidez.',
      'Nas pálpebras, ajuda a reduzir olheiras, pequenas rugas e flacidez da pele.',
      'Nas mãos, reduz manchas e melhora o aspecto geral, deixando a pele mais lisa e jovem.'
    ]
  },
  {
    group: 'Tecnologias e lasers avançados',
    category: 'Laser',
    title: 'Laser melasma + colágeno',
    image: proc5,
    description: 'Tecnologia dual para controle do melasma e estímulo de colágeno, favorecendo firmeza e rejuvenescimento.',
    fullDescription: [
      'O laser ZYE combina dois comprimentos de onda em um único equipamento.',
      'Um dos modos atua fragmentando o pigmento escuro do melasma, favorecendo o clareamento da mancha.',
      'O outro modo atua em camadas profundas da pele, estimulando a produção de colágeno e melhorando a firmeza.',
      'Essa combinação é indicada para pacientes com melasma associado à flacidez e primeiros sinais de envelhecimento.',
      'O tratamento é gradual, com múltiplas sessões, e busca resultado mais completo e harmonioso para a pele.'
    ]
  }
];

const groupOrder = [
  'Estética facial',
  'Estética corporal',
  'Tratamentos capilares',
  'Dermatologia clínica',
  'Estética íntima',
  'Tecnologias e lasers avançados'
];

const groupedSpecialties = groupOrder
  .map((group) => ({
    group,
    items: specialties.filter((specialty) => specialty.group === group)
  }))
  .filter(({ items }) => items.length > 0);

const SpecialtyCard: React.FC<SpecialtyCardProps> = ({ index, category, title, description, image, onOpen }) => (
  <article className="group overflow-hidden rounded-[30px] border border-white/75 bg-[#fffaf2]/90 shadow-[0_18px_45px_rgba(66,47,24,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(66,47,24,0.13)]">
    <div className="relative h-56 overflow-hidden">
      <img src={image} alt={title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-black/62 via-brand-black/14 to-transparent" />
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3">
        <span className="rounded-full bg-[#fffaf2]/92 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-brand-gold-deep">
          {category}
        </span>
        <span className="rounded-full bg-brand-black/55 px-3 py-1 text-sm font-semibold text-white/82">
          {String(index).padStart(2, '0')}
        </span>
      </div>
    </div>
    <div className="flex min-h-[250px] flex-col p-7">
      <h3 className="mb-4 text-2xl font-semibold leading-tight text-brand-black md:text-[1.7rem]">{title}</h3>
      <p className="mb-7 leading-relaxed text-brand-black/72">{description}</p>
      <button
        type="button"
        onClick={onOpen}
        className="mt-auto inline-flex w-fit items-center rounded-full border border-brand-gold/30 bg-white/35 px-5 py-2 text-sm font-bold uppercase tracking-[0.16em] text-brand-gold-deep transition-colors hover:border-brand-gold-deep hover:bg-white hover:text-brand-black"
      >
        Ver detalhes
      </button>
    </div>
  </article>
);

export const Specialties: React.FC = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState<Specialty | null>(null);

  useEffect(() => {
    if (!selectedSpecialty) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedSpecialty(null);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [selectedSpecialty]);

  return (
    <section id="especialidades" className="section-shell">
      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto mb-16 grid max-w-6xl gap-8 md:grid-cols-[0.88fr_1.12fr] md:items-end">
          <div>
            <p className="section-kicker mb-4">Especialidades</p>
            <h2 className="text-4xl font-semibold leading-tight text-brand-black md:text-6xl">
              Tratamentos organizados por objetivo
            </h2>
          </div>
          <p className="text-lg leading-relaxed text-brand-black/72">
            Os procedimentos foram agrupados por área de cuidado para facilitar a leitura. Cada card mantém uma visão objetiva, e os textos completos aparecem em detalhes.
          </p>
        </div>

        <div className="space-y-16">
          {groupedSpecialties.map(({ group, items }) => (
            <div key={group} className="clinic-card p-5 md:p-7">
              <div className="mb-7 flex flex-col gap-3 border-b border-brand-gold/20 pb-5 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="section-kicker mb-2">Linha de cuidado</p>
                  <h3 className="text-3xl font-semibold text-brand-black md:text-4xl">{group}</h3>
                </div>
                <span className="w-fit rounded-full bg-brand-gold/12 px-4 py-2 text-sm font-semibold uppercase tracking-[0.16em] text-brand-black/50">
                  {items.length} tratamentos
                </span>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {items.map((spec, index) => (
                  <SpecialtyCard
                    key={spec.title}
                    index={index + 1}
                    group={spec.group}
                    category={spec.category}
                    title={spec.title}
                    description={spec.description}
                    image={spec.image}
                    fullDescription={spec.fullDescription}
                    onOpen={() => setSelectedSpecialty(spec)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedSpecialty && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-brand-black/62 px-4 py-6 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="specialty-modal-title"
          onMouseDown={() => setSelectedSpecialty(null)}
        >
          <div
            className="relative max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-[34px] border border-white/75 bg-[#fffaf2] p-7 shadow-2xl md:p-10"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedSpecialty(null)}
              className="absolute right-5 top-5 rounded-full border border-brand-gold/25 bg-white/60 p-2 text-brand-black/70 transition-colors hover:bg-white hover:text-brand-black"
              aria-label="Fechar detalhes"
            >
              <X size={20} />
            </button>

            <p className="section-kicker mb-4 pr-12">{selectedSpecialty.group}</p>
            <h3 id="specialty-modal-title" className="mb-6 pr-12 text-4xl font-semibold leading-tight text-brand-black md:text-5xl">
              {selectedSpecialty.title}
            </h3>
            <div className="space-y-5 text-lg leading-relaxed text-brand-black/78">
              {selectedSpecialty.fullDescription.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
