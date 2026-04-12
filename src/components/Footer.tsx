import { Heart, Instagram } from 'lucide-react';

export function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-10 sm:py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 gap-8 sm:gap-10 md:gap-12 mb-8 sm:mb-10 md:mb-12">
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-3 sm:mb-4">
              <Heart className="w-6 h-6 sm:w-8 sm:h-8 fill-[#ff8149] text-[#ff8149]" />
              <span className="text-xl sm:text-2xl font-black">Late Coração</span>
            </div>
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-4 sm:mb-6">
              Resgatar, tratar e amar. Conectar animais de rua a famílias responsáveis,
              com transparência e carinho.
            </p>
            <div className="flex justify-center sm:justify-start gap-3 sm:gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#ff8149] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>

          <div className="text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Links Úteis</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <button onClick={() => scrollToSection('hero')} className="text-sm sm:text-base text-gray-400 hover:text-[#ffd100] transition-colors">
                  Doar
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('quem-somos')} className="text-sm sm:text-base text-gray-400 hover:text-[#ffd100] transition-colors">
                  Quem Somos
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('transparencia')} className="text-sm sm:text-base text-gray-400 hover:text-[#ffd100] transition-colors">
                  Transparência
                </button>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-800 pt-6 sm:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-400">
            <p className="text-center md:text-left">
              © {new Date().getFullYear()} Late Coração. Todos os direitos reservados.
            </p>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6">
              <button className="text-xs sm:text-sm hover:text-[#ffd100] transition-colors">
                Política de Privacidade
              </button>
              <button className="text-xs sm:text-sm hover:text-[#ffd100] transition-colors">
                Termos de Uso
              </button>
              <button className="text-xs sm:text-sm hover:text-[#ffd100] transition-colors">
                LGPD
              </button>
            </div>
          </div>
          <p className="text-center mt-3 sm:mt-4 text-gray-500 text-xs sm:text-sm">
            CNPJ: 00.000.000/0001-00 • ONG sem fins lucrativos
          </p>
        </div>
      </div>
    </footer>
  );
}
