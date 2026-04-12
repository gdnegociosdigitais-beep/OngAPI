import { useState } from 'react';
import { Heart, Shield, Zap, Loader } from 'lucide-react';
import { Button } from './Button';
import { Card } from './Card';
import { Input } from './Input';
import { PixModal } from './PixModal';

interface PixResponse {
  id: string;
  transactionId: string;
  qrCode?: string;
  copyPaste?: string;
  amount: number;
  status: string;
  error?: string;
}

export function Hero() {
  const [selectedAmount, setSelectedAmount] = useState<number>(2000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [pixData, setPixData] = useState<PixResponse | null>(null);
  const [error, setError] = useState<string>('');
  const [customError, setCustomError] = useState<string>('');

  const MIN_AMOUNT_CENTS = 1000;

  const amounts = [1000, 2000, 5000, 10000, 15000, 20000];

  const impactTexts: { [key: number]: string } = {
    1000: 'antipulgas',
    2000: '1 banho',
    5000: '1 vacina',
    10000: '1 castração parcial',
    15000: 'exame completo',
    20000: 'tratamento completo'
  };

  const handleAmountClick = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
    setCustomError('');
    setError('');
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    if (!value) {
      setCustomError('');
      setSelectedAmount(amounts[0]);
      return;
    }
    const parsed = parseFloat(value.replace(',', '.'));
    const numValue = Math.round(parsed * 100);
    if (isNaN(numValue) || numValue <= 0) {
      setCustomError('Digite um valor válido');
      return;
    }
    if (numValue < MIN_AMOUNT_CENTS) {
      setCustomError('O valor mínimo para doação é de R$ 10,00');
      setSelectedAmount(numValue);
      return;
    }
    setCustomError('');
    setSelectedAmount(numValue);
    setError('');
  };

  const isCustomAmountInvalid = customAmount !== '' && customError !== '';
  const isDonateDisabled = loading || isCustomAmountInvalid;

  const handleDonate = async () => {
    setError('');

    const amountInt = Math.round(selectedAmount);
    if (!amountInt || amountInt < MIN_AMOUNT_CENTS) {
      setError('O valor mínimo para doação é de R$ 10,00');
      return;
    }

    setLoading(true);

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !anonKey) {
        throw new Error('Configuração do Supabase não encontrada');
      }

      const apiUrl = `${supabaseUrl}/functions/v1/create-pix-payment`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${anonKey}`,
        },
        body: JSON.stringify({
          amount: amountInt,
          donor_name: 'Doador Anônimo',
        }),
      });

      let data: PixResponse;
      try {
        data = await response.json();
      } catch {
        throw new Error('Resposta inválida do servidor');
      }

      if (!response.ok || data.error) {
        const msg = data?.error || `Erro do servidor (${response.status})`;
        console.error('Erro na API SafefyPay:', msg, data);
        throw new Error(msg);
      }

      if (!data.qrCode || !data.copyPaste) {
        throw new Error(`Dados do PIX incompletos. qrCode: ${!!data.qrCode}, copyPaste: ${!!data.copyPaste}. Resposta: ${JSON.stringify(data).slice(0, 200)}`);
      }

      const qrCodeSrc = data.qrCode.startsWith('data:')
        ? data.qrCode
        : `data:image/png;base64,${data.qrCode}`;

      setPixData({ ...data, qrCode: qrCodeSrc });
    } catch (err) {
      let errorMessage = 'Erro desconhecido ao processar doação';
      if (err instanceof Error) {
        errorMessage = `${err.name}: ${err.message}`;
      } else if (typeof err === 'string') {
        errorMessage = err;
      } else {
        try {
          errorMessage = JSON.stringify(err);
        } catch {
          errorMessage = String(err);
        }
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="hero" className="relative bg-[#ff8149] overflow-hidden pt-32 pb-12 sm:pt-36 sm:pb-20 lg:pt-44 lg:pb-28">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#ffd100] rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute top-1/2 -right-24 w-96 h-96 bg-[#9e19dd] rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-white rounded-full opacity-10 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="text-white space-y-4 sm:space-y-6 text-center lg:text-left">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-black leading-tight">
              Transforme latidos em lares.
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-3xl font-semibold text-white/95">
              Com R$5 você muda um destino. Doe em 10 segundos.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3 pt-2 sm:pt-4">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-semibold text-sm sm:text-base">Transparência</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full">
                <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-semibold text-sm sm:text-base">Site Seguro</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full">
                <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-semibold text-sm sm:text-base">Fazer a Diferença</span>
              </div>
            </div>
          </div>

          <Card className="max-w-lg mx-auto w-full">
            <div className="space-y-4 sm:space-y-6">
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 text-center">
                  Faça sua doação
                </h2>
                <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2 sm:mb-3 text-center">
                  Escolha o valor
                </label>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {amounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => handleAmountClick(amount)}
                      disabled={loading}
                      className={`p-2 sm:p-4 rounded-xl sm:rounded-2xl border-2 transition-all font-semibold disabled:opacity-50 ${
                        selectedAmount === amount && !customAmount
                          ? 'border-[#ff8149] bg-[#ff8149]/10 text-[#ff8149]'
                          : 'border-gray-200 text-gray-700 hover:border-[#ff8149]'
                      }`}
                    >
                      <div className="text-base sm:text-xl mb-0.5 sm:mb-1">R${(amount / 100).toFixed(0)}</div>
                      <div className="text-[10px] sm:text-xs text-gray-600">{impactTexts[amount]}</div>
                    </button>
                  ))}
                </div>
                <div className="mt-3 sm:mt-4">
                  <Input
                    type="number"
                    placeholder="Outro valor (R$)"
                    value={customAmount}
                    onChange={(e) => handleCustomAmountChange(e.target.value)}
                    min="10"
                    step="0.01"
                    disabled={loading}
                  />
                  {customError && (
                    <p className="text-xs text-red-600 mt-1.5 ml-1">{customError}</p>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={handleDonate}
                  fullWidth
                  size="large"
                  disabled={isDonateDisabled}
                >
                  {loading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Processando...
                    </>
                  ) : (
                    <>
                      <Heart className="w-5 h-5 fill-current" />
                      Doar agora com PIX
                    </>
                  )}
                </Button>

                {error && (
                  <div className="bg-red-50 border-2 border-red-300 p-3 rounded-xl">
                    <p className="text-sm font-bold text-red-700 text-center mb-1">Erro ao gerar PIX</p>
                    <p className="text-xs text-red-600 break-all whitespace-pre-wrap">{error}</p>
                  </div>
                )}

                <p className="text-xs text-gray-500 leading-relaxed text-center">
                  Sua doação será processada instantaneamente via PIX.
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="mt-8 sm:mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 text-white text-center">
          <div className="bg-white/10 backdrop-blur-sm p-4 sm:p-6 rounded-2xl sm:rounded-3xl">
            <div className="text-2xl sm:text-3xl md:text-4xl font-black mb-1 sm:mb-2">R$5</div>
            <div className="text-xs sm:text-sm font-semibold">= 1 refeição</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-4 sm:p-6 rounded-2xl sm:rounded-3xl">
            <div className="text-2xl sm:text-3xl md:text-4xl font-black mb-1 sm:mb-2">R$20</div>
            <div className="text-xs sm:text-sm font-semibold">= 1 banho</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-4 sm:p-6 rounded-2xl sm:rounded-3xl">
            <div className="text-2xl sm:text-3xl md:text-4xl font-black mb-1 sm:mb-2">R$50</div>
            <div className="text-xs sm:text-sm font-semibold">= 1 vacina</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-4 sm:p-6 rounded-2xl sm:rounded-3xl">
            <div className="text-2xl sm:text-3xl md:text-4xl font-black mb-1 sm:mb-2">R$100</div>
            <div className="text-xs sm:text-sm font-semibold">= 1 castração parcial</div>
          </div>
        </div>
      </div>

      <PixModal
        isOpen={!!pixData}
        onClose={() => setPixData(null)}
        qrCode={pixData?.qrCode}
        copyPaste={pixData?.copyPaste}
        amount={pixData?.amount || 0}
      />
    </section>
  );
}
