import { useState, useEffect } from 'react';
import { X, Copy, CheckCircle } from 'lucide-react';

interface PixModalProps {
  isOpen: boolean;
  onClose: () => void;
  copyPaste?: string;
  amount: number;
}

function buildQRUrl(text: string): string {
  return `https://api.qrserver.com/v1/create-qr-code/?size=256x256&ecc=H&data=${encodeURIComponent(text)}`;
}

export function PixModal({ isOpen, onClose, copyPaste, amount }: PixModalProps) {
  const [copied, setCopied] = useState(false);
  const [qrLoaded, setQrLoaded] = useState(false);
  const [qrError, setQrError] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setQrLoaded(false);
      setQrError(false);
    }
  }, [isOpen, copyPaste]);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  if (!isOpen) return null;

  const handleCopy = () => {
    if (!copyPaste) return;

    const tryExecCommand = () => {
      try {
        const textArea = document.createElement('textarea');
        textArea.value = copyPaste;
        textArea.style.position = 'fixed';
        textArea.style.top = '0';
        textArea.style.left = '0';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopied(true);
      } catch {
        setCopied(false);
      }
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(copyPaste).then(() => {
        setCopied(true);
      }).catch(() => {
        tryExecCommand();
      });
    } else {
      tryExecCommand();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Pagar com PIX</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition"
            aria-label="Fechar"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">Valor da doação</p>
            <p className="text-4xl font-black text-[#ff8149]">R$ {(amount / 100).toFixed(2)}</p>
          </div>

          {copyPaste && (
            <div className="flex justify-center">
              {!qrError ? (
                <div className="relative w-64 h-64">
                  {!qrLoaded && (
                    <div className="absolute inset-0 border-2 border-gray-200 rounded-2xl bg-gray-50 flex items-center justify-center">
                      <div className="w-8 h-8 border-4 border-[#ff8149] border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}
                  <img
                    src={buildQRUrl(copyPaste)}
                    alt="QR Code PIX"
                    onLoad={() => setQrLoaded(true)}
                    onError={() => setQrError(true)}
                    className={`w-64 h-64 border-2 border-gray-200 rounded-2xl p-2 bg-white transition-opacity duration-300 ${qrLoaded ? 'opacity-100' : 'opacity-0'}`}
                  />
                </div>
              ) : (
                <div className="w-64 h-20 border-2 border-gray-200 rounded-2xl flex items-center justify-center bg-gray-50">
                  <p className="text-xs text-gray-500 text-center px-4">Use o código abaixo para pagar</p>
                </div>
              )}
            </div>
          )}

          {copyPaste && (
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700">
                Código copia e cola
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value={copyPaste}
                  className="flex-1 px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-2xl text-sm font-mono truncate focus:outline-none"
                />
                <button
                  onClick={handleCopy}
                  className={`px-4 py-3 rounded-2xl font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
                    copied
                      ? 'bg-green-500 text-white'
                      : 'bg-[#ff8149] text-white hover:bg-[#ff6f2a]'
                  }`}
                >
                  {copied ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Copiado
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5" />
                      Copiar
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-4">
            <p className="text-sm text-blue-900">
              Abra seu app de banco ou carteira digital e cole o código acima, ou escaneie o QR Code para completar a transferência.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-full py-3 bg-gray-200 text-gray-800 font-semibold rounded-2xl hover:bg-gray-300 transition"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
