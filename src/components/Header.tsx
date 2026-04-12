import { useState, useEffect } from 'react';
import { Heart, Menu, X } from 'lucide-react';
import { Button } from './Button';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleModalChange = () => {
      const modalOpen = document.body.style.overflow === 'hidden';
      setIsVisible(!modalOpen);
    };

    const observer = new MutationObserver(handleModalChange);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['style'],
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  if (!isVisible) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-md">
      <div className="bg-[#9e19dd] text-white text-center py-0.5 text-xs sm:text-sm font-medium">
        ONG sem fins lucrativos
      </div>

      <nav className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-center lg:justify-between">
          <button
            onClick={() => scrollToSection('hero')}
            className="flex items-center focus:outline-none focus:ring-2 focus:ring-[#9e19dd] rounded-lg"
            aria-label="Late Coração - Página inicial"
          >
            <img
              src="/LATE CORACAO.png"
              alt="Late Coração"
              className="h-12 sm:h-14 md:h-16 w-auto"
            />
          </button>

          <div className="hidden lg:block">
            <Button onClick={() => scrollToSection('hero')} size="large">
              <Heart className="w-5 h-5" />
              Quero Doar
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
}
