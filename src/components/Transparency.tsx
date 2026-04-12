import { FileText, Download, Shield, Award } from 'lucide-react';
import { Card } from './Card';

export function Transparency() {
  const documents = [
    {
      title: 'Relatório Anual 2024',
      description: 'Prestação de contas completa do ano anterior',
      icon: FileText,
      size: '2.5 MB'
    },
    {
      title: 'Notas Fiscais',
      description: 'Comprovantes de todas as despesas',
      icon: FileText,
      size: '8.7 MB'
    },
    {
      title: 'Estatuto da ONG',
      description: 'Documentação legal e registro',
      icon: Shield,
      size: '450 KB'
    },
    {
      title: 'Certificações',
      description: 'Selos e certificados de transparência',
      icon: Award,
      size: '1.2 MB'
    }
  ];

  return (
    <section id="transparencia" className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-black text-gray-900 mb-4 sm:mb-6">
            Transparência
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-2xl text-gray-700 px-2">
            Cada real tem destino. Veja nossos relatórios.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Card className="mb-8 sm:mb-10 md:mb-12" padding="large">
            <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="bg-[#ffd100] w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center">
                <Shield className="w-7 h-7 sm:w-8 sm:h-8 text-gray-900" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-gray-900">Organização Transparente</h3>
                <p className="text-sm sm:text-base text-gray-600">Certificada e auditada</p>
              </div>
            </div>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              Mantemos total transparência sobre o uso das doações. Todos os documentos financeiros,
              relatórios de atividades e comprovantes estão disponíveis para consulta pública.
              Nossa gestão é auditada regularmente e seguimos as melhores práticas de governança do terceiro setor.
            </p>
          </Card>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-10 md:mb-12">
            {documents.map((doc, index) => {
              const Icon = doc.icon;
              return (
                <Card key={index} className="hover:shadow-xl transition-all cursor-pointer group">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="bg-[#9e19dd]/10 w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#9e19dd] transition-colors">
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-[#9e19dd] group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-1">{doc.title}</h4>
                      <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">{doc.description}</p>
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <span className="text-xs text-gray-500">{doc.size}</span>
                        <button className="flex items-center gap-1 sm:gap-2 text-[#9e19dd] font-semibold text-xs sm:text-sm hover:text-[#ff8149] transition-colors">
                          <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="whitespace-nowrap">Baixar PDF</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          <Card className="bg-gradient-to-r from-[#ff8149] to-[#9e19dd] text-white" padding="large">
            <div className="text-center">
              <h3 className="text-2xl sm:text-3xl font-black mb-3 sm:mb-4">Acesso Total</h3>
              <p className="text-sm sm:text-base md:text-lg mb-4 sm:mb-6 text-white/95 px-2">
                Todos os nossos documentos e relatórios estão disponíveis para download.
                Acompanhe nossa transparência no Instagram.
              </p>
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-[#9e19dd] px-4 sm:px-6 py-2 sm:py-3 rounded-full font-bold text-sm sm:text-base hover:bg-gray-100 transition-colors"
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
