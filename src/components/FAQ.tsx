import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Card } from './Card';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'Como funciona a doação?',
      answer: 'Você pode fazer doações únicas através de PIX. Basta escolher o valor e confirmar. É rápido, seguro e 100% do valor vai para os animais.'
    },
    {
      question: 'Como posso acompanhar o uso das doações?',
      answer: 'Publicamos relatórios mensais e anuais com transparência total sobre receitas e despesas. Você pode acessar todos os documentos na seção Transparência do nosso site.'
    },
    {
      question: 'Vocês aceitam doações de ração e produtos?',
      answer: 'Sim! Aceitamos doações de ração, medicamentos, produtos de limpeza, cobertores e outros itens. Consulte nossas necessidades atuais através do Instagram.'
    },
    {
      question: 'A ONG é legalizada?',
      answer: 'Sim, somos uma ONG registrada, sem fins lucrativos, com CNPJ ativo e toda documentação regularizada. Todos os documentos estão disponíveis na seção Transparência.'
    },
    {
      question: 'Como o PIX é processado?',
      answer: 'Ao escolher PIX, você receberá um QR Code e a chave PIX Copia e Cola. O pagamento é instantâneo e seguro, direto para a conta da ONG.'
    }
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-black text-gray-900 mb-4 sm:mb-6">
              Perguntas Frequentes
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-700 px-2">
              Tire suas dúvidas sobre doações e como ajudar
            </p>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-xl transition-shadow">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full text-left flex items-start justify-between gap-4"
                  aria-expanded={openIndex === index}
                >
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">
                      {faq.question}
                    </h3>
                    {openIndex === index && (
                      <p className="text-sm sm:text-base text-gray-700 leading-relaxed mt-3 sm:mt-4 animate-fade-in">
                        {faq.answer}
                      </p>
                    )}
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 sm:w-6 sm:h-6 text-[#9e19dd] flex-shrink-0 transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </Card>
            ))}
          </div>

          <Card className="mt-8 sm:mt-10 md:mt-12 bg-gradient-to-r from-[#ffd100]/20 to-[#ff8149]/20" padding="large">
            <div className="text-center">
              <h3 className="text-xl sm:text-2xl font-black text-gray-900 mb-3 sm:mb-4">
                Ainda tem dúvidas?
              </h3>
              <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6 px-2">
                Siga-nos no Instagram para ficar por dentro de tudo!
              </p>
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#9e19dd] text-white px-5 sm:px-6 py-2 sm:py-3 rounded-full font-bold text-sm sm:text-base hover:bg-[#ff8149] transition-colors"
                >
                  Seguir no Instagram
                </a>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
