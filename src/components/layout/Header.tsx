import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '../ui/Button';
import logo from '../../assets/images/logo.png';

const menuItems = [
  { name: 'Início', id: 'home' },
  { name: 'Sobre', id: 'sobre' },
  { name: 'Especialidades', id: 'especialidades' }
];

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-[10px] border-b border-gray-100/50">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Esquerda: Logo */}
        <div className="flex-shrink-0 cursor-pointer" onClick={() => scrollToSection('home')}>
          <img src={logo} alt="Dr. Ricardo Bovo" className="h-8 md:h-10 w-auto object-contain" />
        </div>

        {/* Centro: Menu Horizontal */}
        <nav className="hidden md:flex items-center space-x-8">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-[14px] font-medium tracking-wide text-brand-black hover:text-brand-gray transition-colors"
              style={{ fontFamily: 'Arial, sans-serif' }}
            >
              {item.name}
            </button>
          ))}
        </nav>

        {/* Direita: CTA */}
        <div className="hidden md:block">
          <Button variant="primary" className="!py-3 !px-6 text-xs">
            Agendar Consulta
          </Button>
        </div>

        {/* Mobile: Menu Hambúrguer */}
        <button 
          className="md:hidden p-2 text-brand-black"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Menu Mobile */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 py-4 px-4 flex flex-col space-y-4 shadow-lg">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-left text-[14px] font-medium tracking-wide text-brand-black py-3 border-b border-gray-50"
              style={{ fontFamily: 'Arial, sans-serif' }}
            >
              {item.name}
            </button>
          ))}
          <Button variant="primary" className="w-full mt-2">
            Agendar Consulta
          </Button>
        </div>
      )}
    </header>
  );
};
