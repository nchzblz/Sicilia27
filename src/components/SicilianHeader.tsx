import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { ScreenId, Language } from '../types';
import { WeddingLogo } from './WeddingLogo';

interface SicilianHeaderProps {
  currentScreen: ScreenId;
  language: Language;
  onNavigate: (screen: ScreenId) => void;
  onBack: () => void;
  canGoBack: boolean;
  guestName?: string;
}

const SCREEN_STEPS: ScreenId[] = [
  'intro',
  'schedule_overview',
  'day1',
  'day2',
  'day3',
  'extras',
  'songs',
  'review',
];

export const SicilianHeader: React.FC<SicilianHeaderProps> = ({
  currentScreen,
  language,
  onNavigate,
  onBack,
  canGoBack,
}) => {
  const currentStepIndex = SCREEN_STEPS.indexOf(currentScreen);
  const totalSteps = SCREEN_STEPS.length;
  const isFormStep = currentStepIndex >= 0;

  return (
    <header className="sticky top-0 z-30 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#EFE8DE] transition-all duration-300">
      <div className="max-w-lg mx-auto px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between">
        {/* Left: Back button or Sicilian 2027 subtle mark */}
        <div className="flex items-center min-w-[70px]">
          {canGoBack && currentScreen !== 'token_entry' && currentScreen !== 'submitted' ? (
            <button
              onClick={onBack}
              id="header-back-btn"
              className="p-1.5 -ml-1.5 text-[#1C1917] hover:text-[#BD532E] rounded-full hover:bg-[#EAE2D5]/50 transition flex items-center gap-1 text-xs font-medium cursor-pointer"
              aria-label="Volver / Back"
            >
              <ChevronLeft className="w-4 h-4 text-[#BD532E]" />
              <span className="font-sans text-[11px] uppercase tracking-wider font-semibold text-[#554A41]">
                {language === 'es' ? 'Volver' : 'Back'}
              </span>
            </button>
          ) : (
            <div className="flex items-center gap-1.5 text-[#5B6842]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5B6842] animate-pulse" />
              <span className="font-serif text-[12px] italic text-[#5B6842]">Noto 2027</span>
            </div>
          )}
        </div>

        {/* Center: Official Mariana & Lukas Wedding Logo */}
        <button
          onClick={() => onNavigate('schedule_overview')}
          className="text-center group focus:outline-none cursor-pointer flex flex-col items-center justify-center py-0.5 px-2 select-none"
          title={language === 'es' ? 'Ir al itinerario general' : 'Go to schedule overview'}
        >
          <WeddingLogo size="sm" className="transition-transform duration-200 group-hover:scale-105" />
        </button>

        {/* Right: Balance spacer */}
        <div className="flex items-center justify-end min-w-[70px]" />
      </div>

      {/* Progress Bar for RSVP flow */}
      {isFormStep && (
        <div className="w-full bg-[#EAE2D5]/60 h-0.5 overflow-hidden">
          <div
            className="h-full bg-[#BD532E] transition-all duration-400 ease-out"
            style={{ width: `${((currentStepIndex + 1) / totalSteps) * 100}%` }}
          />
        </div>
      )}
    </header>
  );
};
