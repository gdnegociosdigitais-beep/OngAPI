import { DollarSign, Heart, Pill, Scissors, Stethoscope, UtensilsCrossed } from 'lucide-react';
import { Button } from './Button';
import { Card } from './Card';

export function Impact() {
  const costs = [
    { icon: UtensilsCrossed, label: 'Ração (1kg)', amount: 'R$ 15', color: 'text-[#ff8149]' },
    { icon: Pill, label: 'Vermífugo', amount: 'R$ 25', color: 'text-[#ffd100]' },
    { icon: Heart, label: 'Vacina V10/V8', amount: 'R$ 80', color: 'text-[#9e19dd]' },
    { icon: Scissors, label: 'Castração', amount: 'R$ 200', color: 'text-[#ff8149]' },
    { icon: Stethoscope, label: 'Exames completos', amount: 'R$ 350', color: 'text-[#9e19dd]' },
    { icon: DollarSign, label: 'Tratamento urgente', amount: 'R$ 800+', color: 'text-[#ffd100]' }
  ];

  const distribution = [
    { category: 'Alimentação', percentage: 35, color: 'bg-[#ff8149]' },
    { category: 'Veterinária', percentage: 40, color: 'bg-[#9e19dd]' },
    { category: 'Infraestrutura', percentage: 15, color: 'bg-[#ffd100]' },
    { category: 'Operacional', percentage: 10, color: 'bg-gray-400' }
  ];

  const scrollToHero = () => {
    const element = document.getElementById('hero');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-black text-gray-900 mb-4 sm:mb-6">
            Para onde vai sua doação
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-700 px-2">
            Cada real doado é investido com carinho e responsabilidade no bem-estar dos animais.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-10 sm:mb-12 md:mb-16">
          {costs.map((cost, index) => {
            const Icon = cost.icon;
            return (
              <Card key={index} className="text-center hover:shadow-xl transition-shadow">
                <Icon className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mx-auto mb-2 sm:mb-3 md:mb-4 ${cost.color}`} />
                <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-gray-900 mb-1 sm:mb-2">{cost.label}</h3>
                <p className="text-xl sm:text-2xl md:text-3xl font-black text-[#9e19dd]">{cost.amount}</p>
              </Card>
            );
          })}
        </div>

        <Card className="max-w-4xl mx-auto mb-8 sm:mb-10 md:mb-12" padding="large">
          <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-6 sm:mb-8 text-center">
            Distribuição de Recursos
          </h3>

          <div className="space-y-4 sm:space-y-6">
            {distribution.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1 sm:mb-2">
                  <span className="text-sm sm:text-base font-bold text-gray-900">{item.category}</span>
                  <span className="text-sm sm:text-base font-bold text-gray-900">{item.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 sm:h-4 overflow-hidden">
                  <div
                    className={`h-full ${item.color} rounded-full transition-all duration-1000`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-gradient-to-r from-[#ff8149]/10 to-[#9e19dd]/10 rounded-xl sm:rounded-2xl">
            <p className="text-sm sm:text-base text-center text-gray-700 leading-relaxed">
              <strong className="text-[#9e19dd]">100% das doações</strong> vão diretamente para os animais.
              Nossa equipe é composta por voluntários dedicados que trabalham por amor à causa.
            </p>
          </div>
        </Card>

        <div className="text-center">
          <Button onClick={scrollToHero} size="large">
            <Heart className="w-5 h-5 fill-current" />
            Doe mensalmente e garanta cuidado contínuo
          </Button>
        </div>
      </div>
    </section>
  );
}
