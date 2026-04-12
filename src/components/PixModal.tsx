import { useState, useEffect, useRef } from 'react';
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
  const [copyFailed, setCopyFailed] = useState(false);
  const [qrLoaded, setQrLoaded] = useState(false);
  const [qrError, setQrError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQrLoaded(false);
      setQrError(false);
      setCopied(false);
      setCopyFailed(false);
    }
  }, [isOpen, copyPaste]);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  if (!isOpen) return null;

  const selectInput = () => {
    const el = inputRef.current;
    if (!el) return;
    el.focus();
    el.setSelectionRange(0, el.value.length);
    try {
      el.select();
    } catch {}
  };

  const handleCopy = () => {
    if (!copyPaste) return;
    setCopyFailed(false);

    const doNativeCopy = (): boolean => {
      try {
        selectInput();
        const ok = document.execCommand('copy');
        return ok;
      } catch {
        return false;
      }
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(copyPaste)
        .then(() => setCopied(true))
        .catch(() => {
          const ok = doNativeCopy();
          if (ok) {
            setCopied(true);
          } else {
            setCopyFailed(true);
            selectInput();
          }
        });
    } else {
      const ok = doNativeCopy();
      if (ok) {
        setCopied(true);
      } else {
        setCopyFailed(true);
        selectInput();
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl max-w-md w-full shadow-2xl max-h-[95vh] overflow-y-auto">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800">Pagar com PIX</h2>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-5">
          <div className="text-center">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Valor da doação</p>
            <p className="text-4xl font-black text-[#ff8149]">R$ {(amount / 100).toFixed(2)}</p>
          </div>

          {copyPaste && (
            <div className="flex justify-center">
              {!qrError ? (
                <div className="relative w-56 h-56">
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
                    className={`w-56 h-56 border-2 border-gray-200 rounded-2xl p-2 bg-white transition-opacity duration-300 ${qrLoaded ? 'opacity-100' : 'opacity-0'}`}
                  />
                </div>
              ) : (
                <div className="w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl flex items-center justify-center bg-gray-50">
                  <p className="text-sm text-gray-500 text-center px-4">Escaneie o QR Code ou use o código abaixo</p>
                </div>
              )}
            </div>
          )}

          {copyPaste && (
            <div className="space-y-2">
              <p className="text-sm font-semibold text-gray-700">Código PIX (copia e cola)</p>

              <div
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-2xl text-xs font-mono text-gray-700 break-all cursor-pointer select-all active:bg-blue-50 active:border-blue-300 transition"
                onClick={selectInput}
              >
                {copyPaste}
              </div>

              <input
                ref={inputRef}
                type="text"
                readOnly
                value={copyPaste}
                className="sr-only"
                aria-hidden="true"
              />

              <button
                onClick={handleCopy}
                className={`w-full py-4 rounded-2xl font-bold text-base transition-all flex items-center justify-center gap-2 ${
                  copied
                    ? 'bg-green-500 text-white'
                    : 'bg-[#ff8149] text-white active:scale-95'
                }`}
              >
                {copied ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Copiado com sucesso!
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    Copiar código PIX
                  </>
                )}
              </button>

              {copyFailed && (
                <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-3">
                  <p className="text-sm text-amber-800 text-center">
                    Toque no codigo acima para selecionar e copie manualmente.
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4">
            <p className="text-sm text-gray-600 leading-relaxed">
              Abra seu app de banco, selecione <strong>PIX Copia e Cola</strong> e cole o codigo para completar o pagamento.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-full py-3 text-gray-600 font-semibold rounded-2xl border-2 border-gray-200 hover:bg-gray-50 active:bg-gray-100 transition"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
