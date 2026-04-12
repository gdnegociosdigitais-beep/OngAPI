import { Card } from './Card';

export function Media() {
  const mediaItems = [
    {
      type: 'image',
      url: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Cachorro resgatado feliz',
      category: 'Resgate'
    },
    {
      type: 'image',
      url: 'https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Adoção responsável',
      category: 'Adoção'
    },
    {
      type: 'image',
      url: 'https://images.pexels.com/photos/1490908/pexels-photo-1490908.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Gato recuperado',
      category: 'Tratamento'
    },
    {
      type: 'image',
      url: 'https://images.pexels.com/photos/4587998/pexels-photo-4587998.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Voluntários cuidando',
      category: 'Voluntariado'
    },
    {
      type: 'image',
      url: 'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Cachorro feliz no novo lar',
      category: 'Antes/Depois'
    },
    {
      type: 'image',
      url: 'https://images.pexels.com/photos/1828875/pexels-photo-1828875.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Gatinha adorável',
      category: 'Adoção'
    },
    {
      type: 'image',
      url: 'https://images.pexels.com/photos/1458925/pexels-photo-1458925.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Cachorro brincalhão',
      category: 'Resgate'
    },
    {
      type: 'image',
      url: 'https://images.pexels.com/photos/1366957/pexels-photo-1366957.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Gato curioso',
      category: 'Antes/Depois'
    }
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4 sm:mb-6">
            Galeria de Amor
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 px-2">
            Cada foto conta uma história de transformação e esperança
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {mediaItems.map((item, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-2xl sm:rounded-3xl shadow-lg cursor-pointer transform hover:scale-105 transition-all duration-300"
              style={{ height: index % 3 === 0 ? '200px' : '160px' }}
            >
              <img
                src={item.url}
                alt={item.alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 sm:p-4 md:p-6">
                <div className="text-white">
                  <span className="inline-block bg-[#ffd100] text-gray-900 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-bold mb-1 sm:mb-2">
                    {item.category}
                  </span>
                  <p className="text-xs sm:text-sm md:text-base font-semibold">{item.alt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 sm:mt-10 md:mt-12 text-center">
          <Card className="max-w-3xl mx-auto bg-gradient-to-r from-[#ff8149] to-[#9e19dd] text-white" padding="large">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-black mb-3 sm:mb-4">Histórias de Antes e Depois</h3>
            <p className="text-sm sm:text-base md:text-lg text-white/95 mb-4 sm:mb-6 px-2">
              Cada animal que resgatamos passa por uma transformação incrível.
              Do abandono ao amor, da dor à alegria. Essas histórias nos motivam todos os dias.
            </p>
            <p className="font-bold text-base sm:text-lg md:text-xl">
              Você também pode fazer parte dessa transformação
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
