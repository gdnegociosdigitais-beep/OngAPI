import { useEffect, useState } from 'react';
import { Heart, Home, Scissors, Users } from 'lucide-react';
import { Card } from './Card';
import { supabase } from '../lib/supabase';

interface StatisticData {
  animals_rescued: number;
  adoptions_completed: number;
  castrations: number;
  active_volunteers: number;
}

function Counter({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end, duration]);

  return <span>{count}</span>;
}

export function SocialProof() {
  const [stats, setStats] = useState<StatisticData>({
    animals_rescued: 347,
    adoptions_completed: 289,
    castrations: 412,
    active_volunteers: 57
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const { data, error } = await supabase
        .from('statistics')
        .select('*')
        .order('updated_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      if (data) setStats(data);
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
    }
  };

  const testimonials = [
    {
      name: 'Maria Silva',
      text: 'Adotei a Luna há 6 meses e minha vida mudou completamente. Ela trouxe alegria e amor para nossa casa. Obrigada Late Coração!',
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200'
    },
    {
      name: 'João Santos',
      text: 'Thor é o melhor companheiro que eu poderia ter. O processo de adoção foi tranquilo e responsável. Super recomendo!',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200'
    },
    {
      name: 'Ana Costa',
      text: 'Ser voluntária da Late Coração é gratificante. Ver os animais sendo resgatados e encontrando lares amorosos não tem preço.',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200'
    }
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-10 sm:mb-12 md:mb-16">
          <Card className="text-center transform hover:scale-105 transition-transform">
            <Heart className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[#ff8149] mx-auto mb-2 sm:mb-3 md:mb-4" />
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#9e19dd] mb-1 sm:mb-2">
              <Counter end={stats.animals_rescued} />
            </div>
            <div className="text-[10px] sm:text-xs md:text-sm font-semibold text-gray-700">Animais Resgatados</div>
          </Card>

          <Card className="text-center transform hover:scale-105 transition-transform">
            <Home className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[#ffd100] mx-auto mb-2 sm:mb-3 md:mb-4" />
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#9e19dd] mb-1 sm:mb-2">
              <Counter end={stats.adoptions_completed} />
            </div>
            <div className="text-[10px] sm:text-xs md:text-sm font-semibold text-gray-700">Adoções Concluídas</div>
          </Card>

          <Card className="text-center transform hover:scale-105 transition-transform">
            <Scissors className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[#ff8149] mx-auto mb-2 sm:mb-3 md:mb-4" />
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#9e19dd] mb-1 sm:mb-2">
              <Counter end={stats.castrations} />
            </div>
            <div className="text-[10px] sm:text-xs md:text-sm font-semibold text-gray-700">Castrações</div>
          </Card>

          <Card className="text-center transform hover:scale-105 transition-transform">
            <Users className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[#9e19dd] mx-auto mb-2 sm:mb-3 md:mb-4" />
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#9e19dd] mb-1 sm:mb-2">
              <Counter end={stats.active_volunteers} />
            </div>
            <div className="text-[10px] sm:text-xs md:text-sm font-semibold text-gray-700">Voluntários Ativos</div>
          </Card>
        </div>

        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-center text-gray-900 mb-8 sm:mb-10 md:mb-12">
            Histórias que transformam
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full object-cover flex-shrink-0"
                  />
                  <div>
                    <div className="text-sm sm:text-base font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-xs sm:text-sm text-gray-600">Adotante</div>
                  </div>
                </div>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{testimonial.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
