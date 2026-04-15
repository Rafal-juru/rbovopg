import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';

const menuItems = [
  { name: 'Início', id: 'home' },
  { name: 'Sobre', id: 'sobre' },
  { name: 'Especialidades', id: 'especialidades' },
  { name: 'Missão e valores', id: 'missao' },
  { name: 'Relatos', id: 'relatos' }
];

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/45 bg-[#fffaf2]/88 shadow-[0_12px_35px_rgba(66,47,24,0.06)] backdrop-blur-xl">
      <div className="container relative mx-auto flex h-24 items-center justify-center px-5 md:px-6">
        <nav className="hidden items-center justify-center gap-5 rounded-full border border-brand-gold/15 bg-white/45 px-6 py-3 md:flex lg:gap-7">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-[13px] font-semibold tracking-wide text-brand-black/76 transition-colors hover:text-brand-gold-deep lg:text-[14px]"
            >
              {item.name}
            </button>
          ))}
          <Link
            to="/blog"
            className="text-[13px] font-semibold tracking-wide text-brand-black/76 transition-colors hover:text-brand-gold-deep lg:text-[14px]"
          >
            Blog-Bovo
          </Link>
        </nav>

        <div className="absolute right-6 hidden md:block">
          <Button variant="primary" className="!bg-brand-black !px-7 !py-3 text-xs hover:!bg-brand-gold-deep">
            Agendar consulta
          </Button>
        </div>

        <button
          className="absolute right-5 rounded-full border border-brand-gold/20 bg-white/55 p-2 text-brand-black md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menu"
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="absolute left-0 right-0 top-full flex flex-col space-y-4 border-b border-white/35 bg-[#fffaf2] px-5 py-5 shadow-lg md:hidden">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="border-b border-brand-gold/20 py-3 text-left text-[15px] font-semibold tracking-wide text-brand-black"
            >
              {item.name}
            </button>
          ))}
          <Link
            to="/blog"
            onClick={() => setMobileMenuOpen(false)}
            className="border-b border-brand-gold/20 py-3 text-left text-[15px] font-semibold tracking-wide text-brand-black"
          >
            Blog-Bovo
          </Link>
          <Button variant="primary" className="mt-2 w-full !bg-brand-black hover:!bg-brand-gold-deep">
            Agendar consulta
          </Button>
        </div>
      )}
    </header>
  );
};
