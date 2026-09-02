import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { GuestProfile, Language, RsvpState } from '../types';
import {
  Check,
  Calendar,
  MapPin,
  QrCode,
  MessageCircle,
  Compass,
  Lock,
  ArrowRight,
} from 'lucide-react';
import { WeddingLogo } from './WeddingLogo';
import { PWAInstallButton } from './PWAInstallButton';

interface PassKeepsakeViewProps {
  rsvpState: RsvpState;
  guest: GuestProfile;
  language: Language;
  onViewGuide: () => void;
  onViewSongs?: () => void;
  onResetForDemo?: () => void;
}

export const PassKeepsakeView: React.FC<PassKeepsakeViewProps> = ({
  rsvpState,
  guest,
  language,
  onViewGuide,
  onViewSongs,
  onResetForDemo,
}) => {
  const isEs = language === 'es';
  const isIt = language === 'it';

  // Trigger celebration confetti on initial render
  useEffect(() => {
    try {
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#BD532E', '#5B6842', '#5C7F92', '#F0CD6D'],
      });
    } catch (e) {
      // ignore
    }
  }, []);

  const day1Count = rsvpState.day1.attending
    ? rsvpState.day1.companionAttending
      ? 2
      : 1
    : 0;
  const day2Count = rsvpState.day2.attending
    ? rsvpState.day2.companionAttending
      ? 2
      : 1
    : 0;
  const day3Count = rsvpState.day3.attending
    ? rsvpState.day3.companionAttending
      ? 2
      : 1
    : 0;

  const hasCompanion =
    (rsvpState.day1.attending && rsvpState.day1.companionAttending) ||
    (rsvpState.day2.attending && rsvpState.day2.companionAttending) ||
    (rsvpState.day3.attending && rsvpState.day3.companionAttending);

  return (
    <div className="pb-16 pt-4 px-4 sm:px-6 max-w-lg mx-auto space-y-6 text-left selection:bg-[#BD532E] selection:text-white">
      {/* Top Confirmed Ribbon */}
      <div className="bg-[#E2E8DC] border border-[#D1DCB8] rounded-3xl p-6 text-center shadow-[0_4px_20px_rgba(91,104,66,0.08)]">
        <div className="w-12 h-12 rounded-full bg-[#5B6842] text-white flex items-center justify-center mx-auto mb-3 shadow-sm">
          <Check className="w-6 h-6 stroke-[2.5]" />
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-medium text-[#1C1917]">
          {isEs
            ? '¡RSVP Confirmado con Éxito!'
            : isIt
            ? '¡RSVP Confermato con Successo!'
            : 'RSVP Successfully Confirmed!'}
        </h1>
        <p className="text-xs sm:text-[13px] text-[#485532] mt-1.5 max-w-xs mx-auto leading-relaxed">
          {isEs
            ? 'Tu respuesta ya quedó registrada para Mariana & Lukas y los venues en Sicilia.'
            : isIt
            ? 'La tua risposta è stata registrata per Mariana & Lukas e le location in Sicilia.'
            : 'Your response is now saved for Mariana & Lukas and the venues in Sicily.'}
        </p>
      </div>

      {/* Luxury Italian Keepsake Pass Card */}
      <div className="relative bg-white/95 rounded-3xl p-6 sm:p-7 shadow-[0_8px_30px_rgba(43,30,22,0.06)] border border-[#EAE2D5] overflow-hidden space-y-5">
        {/* Top Brand & Pass Header */}
        <div className="flex items-start justify-between border-b border-[#F0EBE2] pb-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#BD532E] font-bold">
              Pass di Ingresso • Official Pass
            </p>
            <h2 className="font-serif text-2xl font-medium text-[#1C1917] mt-0.5">
              Mariana & Lukas
            </h2>
            <p className="text-[11px] tracking-wider text-[#73685E]">
              NOTO, SICILIA • 2027
            </p>
          </div>
          <WeddingLogo variant="badge" className="w-16 h-11" />
        </div>

        {/* Guest Name Box */}
        <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EFE8DE]">
          <p className="text-[10px] uppercase tracking-wider text-[#73685E] font-semibold">
            {isEs ? 'Invitado(s) Confirmado(s)' : isIt ? 'Ospite/i Confermato/i' : 'Confirmed Guest(s)'}
          </p>
          <p className="font-serif text-lg sm:text-xl font-medium text-[#1C1917] mt-0.5">
            {guest.primaryName}
          </p>
          {hasCompanion && (
            <p className="text-xs text-[#5B6842] font-semibold mt-0.5">
              + {rsvpState.companionName || (isEs ? 'Acompañante (+1)' : '+1 Companion')}
            </p>
          )}
          <div className="flex items-center justify-between text-[11px] text-[#73685E] mt-3 pt-2.5 border-t border-[#EAE2D5]">
            <span>Noto • Sicilia</span>
            <span className="font-medium">28–30 Maggio 2027</span>
          </div>
        </div>

        {/* Per-Day Confirmed Status Strip */}
        <div className="space-y-2.5">
          <p className="text-[10px] uppercase tracking-wider text-[#73685E] font-semibold">
            {isEs ? 'Eventos Confirmados' : isIt ? 'Eventi Confermati' : 'Confirmed Schedule'}
          </p>

          {/* Day 1 */}
          <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#F2DDD6] flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0 pr-2">
              <span className="w-2 h-2 rounded-full bg-[#BD532E] shrink-0" />
              <div className="min-w-0">
                <span className="text-xs sm:text-[13px] font-semibold text-[#1C1917] block truncate">
                  {isEs ? 'Día 1: Welcome Drinks' : isIt ? 'Giorno 1: Welcome Drinks' : 'Day 1: Welcome Drinks'}
                </span>
                <p className="text-[10px] text-[#73685E]">28.05.2027 • Aria Boutique Hotel (Noto)</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-[#BD532E] shrink-0">
              {day1Count > 0
                ? isEs
                  ? `${day1Count} ${day1Count === 1 ? 'persona' : 'personas'}`
                  : `${day1Count} ${day1Count === 1 ? 'guest' : 'guests'}`
                : isEs
                ? 'No asiste'
                : 'Not attending'}
            </span>
          </div>

          {/* Day 2 */}
          <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#D9E2D2] flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0 pr-2">
              <span className="w-2 h-2 rounded-full bg-[#5B6842] shrink-0" />
              <div className="min-w-0">
                <span className="text-xs sm:text-[13px] font-semibold text-[#1C1917] block truncate">
                  {isEs ? 'Día 2: La Gran Mesa de 10 Años' : isIt ? 'Giorno 2: La Grande Festa' : 'Day 2: 10-Year Celebration'}
                </span>
                <p className="text-[10px] text-[#73685E]">29.05.2027 • Villa Donnafugata</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-[#5B6842] shrink-0">
              {day2Count > 0
                ? isEs
                  ? `${day2Count} ${day2Count === 1 ? 'persona' : 'personas'}`
                  : `${day2Count} ${day2Count === 1 ? 'guest' : 'guests'}`
                : isEs
                ? 'No asiste'
                : 'Not attending'}
            </span>
          </div>

          {/* Day 3 */}
          <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#D2E0E7] flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0 pr-2">
              <span className="w-2 h-2 rounded-full bg-[#5C7F92] shrink-0" />
              <div className="min-w-0">
                <span className="text-xs sm:text-[13px] font-semibold text-[#1C1917] block truncate">
                  {isEs ? 'Día 3: Brunch en Marzamemi' : isIt ? 'Giorno 3: Brunch a Marzamemi' : 'Day 3: Seaside Farewell'}
                </span>
                <p className="text-[10px] text-[#73685E]">30.05.2027 • Antica Tonnara</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-[#5C7F92] shrink-0">
              {day3Count > 0
                ? isEs
                  ? `${day3Count} ${day3Count === 1 ? 'persona' : 'personas'}`
                  : `${day3Count} ${day3Count === 1 ? 'guest' : 'guests'}`
                : isEs
                ? 'No asiste'
                : 'Not attending'}
            </span>
          </div>
        </div>

        {/* QR Code & Token Bar */}
        <div className="pt-4 border-t border-[#F0EBE2] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white p-1 rounded-2xl border border-[#DFD5C7] flex items-center justify-center shadow-xs">
              <QrCode className="w-9 h-9 text-[#1C1917]" />
            </div>
            <div>
              <p className="text-[9px] uppercase tracking-wider text-[#73685E]">Token ID</p>
              <p className="font-mono text-xs font-bold text-[#1C1917]">{guest.token}</p>
              <p className="text-[10px] text-[#5B6842] font-semibold">✓ {isEs ? 'Registrado' : 'Registered'}</p>
            </div>
          </div>
          <div className="text-right">
            <span className="inline-flex items-center gap-1 text-[11px] px-3 py-1.5 rounded-full bg-[#FAF8F5] text-[#554A41] font-medium border border-[#EAE2D5]">
              <Lock className="w-3 h-3 text-[#5B6842]" />
              {isEs ? 'Guardado' : 'Saved'}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Access Action Buttons */}
      <div className="space-y-3">
        {/* WhatsApp Contact with Matching Card Background & Single Line (Placed above, small non-bold font) */}
        <a
          href="https://wa.me/390000000000?text=Hola%20Mariana%20y%20Lukas!%20Quería%20consultarles%20sobre%20mi%20RSVP%20para%20Sicilia%202027"
          target="_blank"
          rel="noreferrer"
          id="link-keepsake-whatsapp"
          className="w-full py-3 px-4 rounded-3xl bg-white/95 hover:bg-[#FAF8F5] border border-[#EAE2D5] text-[#554A41] text-[11px] sm:text-xs font-normal tracking-wide uppercase flex items-center justify-center gap-2 shadow-[0_2px_12px_rgba(43,30,22,0.02)] transition-all cursor-pointer touch-manipulation active:scale-[0.98] whitespace-nowrap overflow-hidden"
        >
          <MessageCircle className="w-3.5 h-3.5 text-[#25D366] fill-[#25D366]/20 shrink-0" />
          <span className="truncate">
            {isEs ? '¿CAMBIO DE PLANES? ESCRÍBENOS POR WHATSAPP' : isIt ? 'CAMBIO DI PROGRAMMA? SCRIVICI SU WHATSAPP' : 'NEED ADJUSTMENTS? WHATSAPP US'}
          </span>
        </a>

        {/* Enlarged Travel Guide Button */}
        <button
          type="button"
          onClick={onViewGuide}
          id="btn-keepsake-view-guide"
          className="w-full p-4.5 sm:p-5 rounded-3xl bg-white/95 hover:bg-[#FAF8F5] border border-[#EAE2D5] text-left transition-all flex items-center justify-between shadow-[0_4px_16px_rgba(43,30,22,0.03)] cursor-pointer touch-manipulation active:scale-[0.98] group"
        >
          <div className="flex items-center gap-3.5 sm:gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#E2E8DC] text-[#485532] flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <p className="text-base sm:text-lg font-serif font-bold text-[#1C1917] leading-tight">
                {isEs ? 'Guía de Viaje a Sicilia' : isIt ? 'Guida di Viaggio Sicilia' : 'Sicily Travel Guide'}
              </p>
              <p className="text-xs sm:text-[13px] text-[#73685E] pt-0.5">
                {isEs ? 'Noto, playas, mapas & tips de transporte' : isIt ? 'Noto, spiagge, mappe e consigli' : 'Noto, beaches, maps & travel tips'}
              </p>
            </div>
          </div>
          <div className="w-9 h-9 rounded-full bg-[#FAF8F5] border border-[#EAE2D5] flex items-center justify-center shrink-0 group-hover:translate-x-1 transition-transform">
            <ArrowRight className="w-4 h-4 text-[#BD532E]" />
          </div>
        </button>

        {/* PWA Install Action Card */}
        <PWAInstallButton language={language} variant="card" />

        {/* Prototype Reset Helper */}
        {onResetForDemo && (
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={onResetForDemo}
              className="text-xs text-[#73685E] hover:text-[#BD532E] underline cursor-pointer touch-manipulation"
            >
              {isEs ? 'Reiniciar demo para probar de nuevo' : 'Reset demo to test again'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
