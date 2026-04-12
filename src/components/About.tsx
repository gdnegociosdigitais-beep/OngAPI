import { Heart, Target, Sparkles } from 'lucide-react';
import { Card } from './Card';

export function About() {
  return (
    <section id="quem-somos" className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-black text-gray-900 mb-4 sm:mb-6">
            Quem somos
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-2xl text-gray-700 leading-relaxed px-2">
            Somos a Late Coração, uma ONG que resgata, trata e transforma a vida de cães e gatos de rua.
            Acreditamos que cada latido merece um lar e cada miado merece cuidado. Com transparência e carinho,
            unimos resgate, reabilitação e adoção responsável.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-10 sm:mb-12 md:mb-16">
          <Card className="text-center hover:shadow-xl transition-shadow">
            <div className="bg-[#ff8149] w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-white fill-white" />
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-gray-900 mb-3 sm:mb-4">Nossa História</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              Nascemos da paixão de voluntários que não conseguiam ignorar o sofrimento dos animais de rua.
              Desde 2018, cada resgate é uma história de amor e segunda chance.
            </p>
          </Card>

          <Card className="text-center hover:shadow-xl transition-shadow">
            <div className="bg-[#ffd100] w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <Target className="w-8 h-8 sm:w-10 sm:h-10 text-gray-900" />
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-gray-900 mb-3 sm:mb-4">Nossa Missão</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              Resgatar, tratar e amar. Conectar animais de rua a famílias responsáveis,
              com transparência e carinho. Cada vida importa, cada história merece um final feliz.
            </p>
          </Card>

          <Card className="text-center hover:shadow-xl transition-shadow sm:col-span-2 md:col-span-1">
            <div className="bg-[#9e19dd] w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-gray-900 mb-3 sm:mb-4">Nossos Valores</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              Amor incondicional, respeito pela vida, responsabilidade social, transparência total
              e adoção consciente. Estes pilares guiam cada decisão que tomamos.
            </p>
          </Card>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl h-48 sm:h-64 md:h-96">
            <img
              src="https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Cachorro resgatado feliz"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl h-48 sm:h-64 md:h-96">
            <img
              src="https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Gato sendo cuidado"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl h-48 sm:h-64 md:h-96">
            <img
              src="https://images.pexels.com/photos/4587998/pexels-photo-4587998.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Voluntários cuidando de animais"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl h-48 sm:h-64 md:h-96">
            <img
              src="https://images.pexels.com/photos/4588047/pexels-photo-4588047.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Adoção responsável"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
