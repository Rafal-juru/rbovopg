import React from 'react';
import { AtSign, Clock, MapPin, MessageCircle, Phone } from 'lucide-react';

const phoneNumber = '5516991853878';
const whatsappMessage = 'Olá, vim pelo site e gostaria de agendar uma consulta.';
const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
const mapUrl = 'https://www.google.com/maps/search/?api=1&query=Rua%20Saldanha%20Marinho%202375%20sala%203%20Sao%20Jose%20Franca%20SP';
const instagramUrl = 'https://www.instagram.com/ricardobovodermato/';

const contacts = [
  {
    label: 'WhatsApp',
    value: '(16) 99185-3878',
    href: whatsappUrl,
    icon: MessageCircle
  },
  {
    label: 'Telefone',
    value: '(16) 3725-0991',
    href: 'tel:+551637250991',
    icon: Phone
  },
  {
    label: 'Endereço',
    value: 'Rua Saldanha Marinho, 2375, sala 3, São José, Franca - SP',
    href: mapUrl,
    icon: MapPin
  },
  {
    label: 'Instagram',
    value: '@ricardobovodermato',
    href: instagramUrl,
    icon: AtSign
  }
];

export const Footer: React.FC = () => {
  return (
    <footer className="relative border-t border-brand-gold/18 bg-[#f6ead6]">
      <div className="container mx-auto px-4 py-12 md:py-14">
        <div className="clinic-card p-8 md:p-10">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="section-kicker mb-4">Dr. Ricardo Bovo</p>
              <h2 className="mb-5 text-3xl font-semibold leading-tight text-brand-black md:text-4xl">
                Dermatologia clínica e medicina estética
              </h2>
              <p className="max-w-xl text-base leading-relaxed text-brand-black/72">
                Atendimento com foco em diagnóstico preciso, segurança, acompanhamento responsável e resultados naturais.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <span className="clinic-chip">CRM/SP 117501</span>
                <span className="clinic-chip">Franca - SP</span>
                <span className="clinic-chip">Agendamento prévio</span>
              </div>
            </div>

            <div>
              <div>
                <h3 className="mb-5 text-xl font-semibold text-brand-black">Contato</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  {contacts.map((contact) => {
                    const Icon = contact.icon;

                    return (
                      <a
                        key={contact.label}
                        href={contact.href}
                        target={contact.href.startsWith('http') ? '_blank' : undefined}
                        rel={contact.href.startsWith('http') ? 'noreferrer' : undefined}
                        className="flex min-w-0 gap-3 text-brand-black/72 transition-colors hover:text-brand-gold-deep"
                      >
                        <Icon className="mt-1 h-5 w-5 flex-none text-brand-gold-deep" />
                        <span className="min-w-0">
                          <strong className="block text-sm text-brand-black">{contact.label}</strong>
                          <span className="block break-words text-sm leading-relaxed">{contact.value}</span>
                        </span>
                      </a>
                    );
                  })}

                  <div className="flex min-w-0 gap-3 text-brand-black/70">
                    <Clock className="mt-1 h-5 w-5 flex-none text-brand-gold-deep" />
                    <span>
                      <strong className="block text-sm text-brand-black">Atendimento</strong>
                      <span className="block text-sm leading-relaxed">Com agendamento prévio.</span>
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-brand-gold/15 pt-6 text-sm text-brand-black/52 md:flex-row md:items-center md:justify-between">
            <p>© {new Date().getFullYear()} Dr. Ricardo Bovo. Todos os direitos reservados.</p>
            <p>Informações do site não substituem consulta médica individualizada.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
