import React, { useState } from 'react';
import { Smartphone, Share, PlusSquare, X, Check, ArrowRight } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Language } from '../types';

interface PWAInstallButtonProps {
  language?: Language;
  variant?: 'banner' | 'card' | 'compact';
  className?: string;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  language = 'es',
  variant = 'banner',
  className = '',
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSModal, setShowIOSModal] = useState(false);
  const [hasInstalledJustNow, setHasInstalledJustNow] = useState(false);

  const isEs = language === 'es';
  const isIt = language === 'it';

  // Suppress completely if already running as an installed standalone PWA
  if (isInstalled) {
    return null;
  }

  const handleInstallClick = async () => {
    if (isInstallable) {
      const success = await install();
      if (success) {
        setHasInstalledJustNow(true);
      }
    } else {
      setShowIOSModal(true);
    }
  };

  const getButtonLabel = () => {
    if (hasInstalledJustNow) {
      return isEs ? '¡Guardada!' : isIt ? 'Salvata!' : 'Saved!';
    }
    return isEs ? 'Guardar App' : isIt ? 'Salva App' : 'Save App';
  };

  return (
    <>
      {variant === 'banner' && (
        <div
          className={`p-4 rounded-3xl bg-white/95 border border-[#EAE2D5] shadow-[0_2px_12px_rgba(43,30,22,0.02)] flex items-center justify-between gap-3 text-left ${className}`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FAECE8] text-[#BD532E] flex items-center justify-center shrink-0">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs sm:text-[13px] font-bold text-[#1C1917] font-serif leading-tight">
                {isEs ? 'Guarda la App en tu Inicio' : isIt ? 'Salva l’App sulla Schermata' : 'Save App to Home Screen'}
              </p>
              <p className="text-[11px] text-[#73685E] leading-tight pt-0.5">
                {isEs ? 'Acceso rápido a tu pase, guía y mapas sin navegador' : isIt ? 'Accesso rapido a pass e mappa offline' : 'Quick offline access to your pass & guide'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleInstallClick}
            id="btn-install-pwa-banner"
            className="px-3.5 py-2 rounded-full bg-[#BD532E] hover:bg-[#A34423] text-white text-xs font-bold shrink-0 transition-all active:scale-95 cursor-pointer shadow-xs"
          >
            {getButtonLabel()}
          </button>
        </div>
      )}

      {variant === 'card' && (
        <button
          type="button"
          onClick={handleInstallClick}
          id="btn-install-pwa-card"
          className={`w-full p-4 rounded-3xl bg-white/95 hover:bg-[#FAF8F5] border border-[#EAE2D5] text-left transition-all flex items-center justify-between shadow-[0_2px_12px_rgba(43,30,22,0.02)] cursor-pointer touch-manipulation active:scale-[0.98] group ${className}`}
        >
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-[#FAECE8] text-[#BD532E] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-serif font-bold text-[#1C1917] leading-tight">
                {isEs ? 'Instalar App en el Móvil' : isIt ? 'Installa App sul Telefono' : 'Install Wedding App'}
              </p>
              <p className="text-xs text-[#73685E] pt-0.5">
                {isEs ? 'Guarda el pase y mapa de Noto en tu pantalla' : isIt ? 'Salva pass e guida sullo schermo' : 'Add pass & guide to your home screen'}
              </p>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-[#FAF8F5] border border-[#EAE2D5] flex items-center justify-center shrink-0 group-hover:translate-x-1 transition-transform">
            <ArrowRight className="w-3.5 h-3.5 text-[#BD532E]" />
          </div>
        </button>
      )}

      {/* iOS Safari / Browser Instructions Centered Modal */}
      {showIOSModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto"
        >
          <div className="relative w-full max-w-sm my-auto rounded-3xl bg-[#FAF8F5] border border-[#EFE8DE] p-5 sm:p-6 shadow-2xl space-y-4 text-left animate-in zoom-in-95 fade-in duration-200 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#2B1E16] flex items-center justify-center overflow-hidden shadow-md border border-[#C99824]/40 shrink-0">
                  <img src="/pwa-192x192.png?v=3" alt="SICILIA'27" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-serif text-base font-bold text-[#1C1917] leading-tight">
                    {isEs ? 'Agregar a Pantalla de Inicio' : isIt ? 'Aggiungi a Schermata Home' : 'Add to Home Screen'}
                  </h3>
                  <p className="text-[11px] text-[#73685E]">Mariana & Lukas — Sicilia 2027</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowIOSModal(false)}
                className="p-1.5 -mr-1 text-[#73685E] hover:text-[#1C1917] rounded-full hover:bg-[#EAE2D5] transition cursor-pointer"
                aria-label="Cerrar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Step-by-step visual instructions */}
            <div className="p-4 rounded-2xl bg-white border border-[#EAE2D5] space-y-3.5 text-xs text-[#554A41]">
              <p className="font-semibold text-[#1C1917] text-[13px]">
                {isIOS
                  ? (isEs ? 'En iPhone / Safari:' : isIt ? 'Su iPhone / Safari:' : 'On iPhone / Safari:')
                  : (isEs ? 'Instrucciones para tu navegador:' : isIt ? 'Istruzioni per il browser:' : 'Instructions for your browser:')}
              </p>

              {/* Step 1 */}
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#FAECE8] text-[#BD532E] font-bold flex items-center justify-center shrink-0 text-xs mt-0.5">
                  1
                </div>
                <div className="leading-snug">
                  {isEs ? (
                    <span>
                      Toca el botón <strong>Compartir</strong> (<Share className="inline w-3.5 h-3.5 mx-0.5 text-[#BD532E] align-middle" />) en la barra inferior de Safari.
                    </span>
                  ) : (
                    <span>
                      Tap the <strong>Share</strong> button (<Share className="inline w-3.5 h-3.5 mx-0.5 text-[#BD532E] align-middle" />) in Safari's bottom toolbar.
                    </span>
                  )}
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#FAECE8] text-[#BD532E] font-bold flex items-center justify-center shrink-0 text-xs mt-0.5">
                  2
                </div>
                <div className="leading-snug">
                  {isEs ? (
                    <span>
                      Desplaza hacia abajo y selecciona <strong>«Agregar a pantalla de inicio»</strong> (<PlusSquare className="inline w-3.5 h-3.5 mx-0.5 text-[#BD532E] align-middle" />).
                    </span>
                  ) : (
                    <span>
                      Scroll down and select <strong>«Add to Home Screen»</strong> (<PlusSquare className="inline w-3.5 h-3.5 mx-0.5 text-[#BD532E] align-middle" />).
                    </span>
                  )}
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#E2E8DC] text-[#485532] font-bold flex items-center justify-center shrink-0 text-xs mt-0.5">
                  3
                </div>
                <div className="leading-snug">
                  {isEs ? (
                    <span>
                      Pulsa <strong>«Agregar»</strong>. La app se abrirá en pantalla completa como una aplicación nativa.
                    </span>
                  ) : (
                    <span>
                      Tap <strong>«Add»</strong>. The app will launch in full screen with no browser bars.
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom action button */}
            <button
              type="button"
              onClick={() => setShowIOSModal(false)}
              className="w-full py-3.5 rounded-2xl bg-[#BD532E] hover:bg-[#A34423] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-[0.98] cursor-pointer"
            >
              {isEs ? 'Entendido' : isIt ? 'Ho capito' : 'Got it'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
