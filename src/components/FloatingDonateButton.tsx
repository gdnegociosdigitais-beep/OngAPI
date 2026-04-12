import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

export function FloatingDonateButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToHero = () => {
    const element = document.getElementById('hero');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <button
      onClick={scrollToHero}
      className={`fixed bottom-6 right-6 z-40 bg-[#9e19dd] text-white p-4 rounded-full shadow-2xl hover:bg-[#ff8149] transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-[#ffd100]/50 lg:hidden ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
      }`}
      aria-label="Fazer doação"
      title="Voltar ao formulário de doação"
    >
      <Heart className="w-6 h-6 fill-current animate-pulse" />
    </button>
  );
}
