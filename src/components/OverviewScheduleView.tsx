import React from 'react';
import { GuestProfile, Language } from '../types';
import day1Img from '../assets/images/day1_welcome_watercolor_1788272599885.jpg';
import day2Img from '../assets/images/day2_celebration_watercolor_1788272613900.jpg';
import day3Img from '../assets/images/day3_brunch_watercolor_1788272629254.jpg';
import {
  Check,
  Users,
  UtensilsCrossed,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';

interface OverviewScheduleViewProps {
  guest: GuestProfile;
  language: Language;
  onProceedToDay1: () => void;
  onBackToIntro: () => void;
}

export const OverviewScheduleView: React.FC<OverviewScheduleViewProps> = ({
  guest,
  language,
  onProceedToDay1,
  onBackToIntro,
}) => {
  const isEs = language === 'es';
  const isIt = language === 'it';

  // High quality curated Sicilian watercolor artwork for the 3 event cards
  const DAY1_IMG = day1Img;
  const DAY2_IMG = day2Img;
  const DAY3_IMG = day3Img;

  return (
    <div className="pb-16 pt-4 px-4 sm:px-6 max-w-lg mx-auto space-y-6 text-left selection:bg-[#BD532E] selection:text-white">
      {/* Top Floating Guest Header Pill */}
      <div className="flex items-center justify-between bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-full border border-[#EAE2D5] shadow-[0_2px_12px_rgba(43,30,22,0.03)]">
        <div className="flex items-center gap-2 text-xs sm:text-[13px] text-[#554A41] truncate pr-2">
          <span className="w-2 h-2 rounded-full bg-[#5B6842] shrink-0" />
          <span className="truncate">
            {isEs ? 'Invitación para:' : isIt ? 'Invito per:' : 'Invitation for:'}{' '}
            <strong className="text-[#1C1917] font-semibold">{guest.primaryName}</strong>
          </span>
        </div>
        <span className="text-[11px] text-[#73685E] font-medium bg-[#F6F1EA] px-3 py-1 rounded-full border border-[#EAE2D5] whitespace-nowrap shrink-0">
          {guest.hasCompanionInvite
            ? isEs
              ? 'Pase Doble (+1)'
              : isIt
              ? 'Pass Doppio (+1)'
              : 'Double Pass (+1)'
            : isEs
            ? 'Pase Individual'
            : isIt
            ? 'Pass Singolo'
            : 'Single Pass'}
        </span>
      </div>

      {/* Category Pill & Date Tag */}
      <div className="flex items-center justify-between pt-1">
        <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-[#E2E8DC] text-[#485532] text-[11px] font-semibold tracking-wider uppercase border border-[#D1DCB8]/60">
          {isEs ? 'RSVP 3 DÍAS EN SICILIA' : isIt ? 'RSVP 3 GIORNI IN SICILIA' : '3-DAY SICILY RSVP'}
        </span>
        <span className="text-xs sm:text-[13px] text-[#73685E] font-medium tracking-wider">
          28 – 30 MAYO 2027
        </span>
      </div>

      {/* Main Title & Description */}
      <div className="pt-1 w-full">
        <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#1C1917] leading-[1.15] tracking-tight">
          RSVP
        </h1>
        <p className="text-[13px] sm:text-sm text-[#5A524A] mt-3 leading-relaxed font-normal w-full">
          {isEs ? (
            <>
              <span className="block mb-1 text-[#1C1917]">
                Hola <strong className="font-semibold">{guest.primaryName.split(' ')[0]}</strong>,
              </span>
              <span>
                Celebraremos los 10 años en tres momentos especiales en el corazón de Sicilia. Cada día cuenta con su propia confirmación independiente.
              </span>
            </>
          ) : isIt ? (
            <>
              <span className="block mb-1 text-[#1C1917]">
                Ciao <strong className="font-semibold">{guest.primaryName.split(' ')[0]}</strong>,
              </span>
              <span>
                Festeggeremo i 10 anni in tre momenti speciali nel cuore della Sicilia. Ogni giorno prevede una conferma separata e independiente.
              </span>
            </>
          ) : (
            <>
              <span className="block mb-1 text-[#1C1917]">
                Hello <strong className="font-semibold">{guest.primaryName.split(' ')[0]}</strong>,
              </span>
              <span>
                We are celebrating our 10th anniversary across three special moments in Sicily. Each day has its own independent RSVP.
              </span>
            </>
          )}
        </p>
      </div>

      {/* 3 Days Schedule Overview Cards (Informational Brief) */}
      <div className="space-y-3.5 pt-2">
        {/* DAY 1 */}
        <div className="relative flex items-center gap-3.5 sm:gap-4 p-3.5 sm:p-4 rounded-2xl bg-white/95 border border-[#EFE8DE] shadow-[0_2px_12px_rgba(43,30,22,0.02)] overflow-hidden">
          {/* Photo Thumbnail */}
          <div className="w-20 h-24 sm:w-24 sm:h-28 rounded-xl overflow-hidden shrink-0 relative bg-[#F4EDE4]">
            <img
              src={DAY1_IMG}
              alt="Welcome Drinks en la Terraza"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          {/* Card Info */}
          <div className="flex-1 min-w-0 pr-1">
            <div className="flex items-center justify-between gap-1.5 mb-1 text-[10.5px] min-[380px]:text-[11.5px]">
              <span className="font-semibold text-[#BD532E] uppercase tracking-normal sm:tracking-wider truncate">
                {isEs ? 'DÍA 1 • VIERNES 28 DE MAYO' : isIt ? 'GIORNO 1 • VENERDÌ 28 MAGGIO' : 'DAY 1 • FRIDAY, MAY 28'}
              </span>
              <span className="text-[#73685E] font-medium whitespace-nowrap shrink-0">
                {isEs ? 'A LAS 19:00' : isIt ? 'ALLE 19:00' : 'AT 19:00'}
              </span>
            </div>

            <h3 className="font-serif text-[15px] leading-[19px] font-medium text-[#1C1917]">
              {isEs ? 'Welcome Drinks en la Terraza' : isIt ? 'Welcome Drinks in Terrazza' : 'Welcome Drinks on the Terrace'}
            </h3>

            <p className="text-xs text-[#73685E] mt-1 line-clamp-2 leading-relaxed">
              Aria Boutique Hotel (Palazzo storico)
              <br />
              Via R. Trigona, Noto
            </p>
          </div>
        </div>

        {/* DAY 2 */}
        <div className="relative flex items-center gap-3.5 sm:gap-4 p-3.5 sm:p-4 rounded-2xl bg-white/95 border border-[#EFE8DE] shadow-[0_2px_12px_rgba(43,30,22,0.02)] overflow-hidden">
          {/* Photo Thumbnail */}
          <div className="w-20 h-24 sm:w-24 sm:h-28 rounded-xl overflow-hidden shrink-0 relative bg-[#F4EDE4]">
            <img
              src={DAY2_IMG}
              alt="La Gran Celebración de los 10 Años"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          {/* Card Info */}
          <div className="flex-1 min-w-0 pr-1">
            <div className="flex items-center justify-between gap-1.5 mb-1 text-[10.5px] min-[380px]:text-[11.5px]">
              <span className="font-semibold text-[#5B6842] uppercase tracking-normal sm:tracking-wider truncate">
                {isEs ? 'DÍA 2 • SÁBADO 29 DE MAYO' : isIt ? 'GIORNO 2 • SABATO 29 MAGGIO' : 'DAY 2 • SATURDAY, MAY 29'}
              </span>
              <span className="text-[#73685E] font-medium whitespace-nowrap shrink-0">
                {isEs ? 'A LAS 17:30' : isIt ? 'ALLE 17:30' : 'AT 17:30'}
              </span>
            </div>

            <h3 className="font-serif text-[15px] leading-[19px] font-medium text-[#1C1917]">
              {isEs ? 'La Gran Celebración de los 10 Años' : isIt ? 'La Grande Festa dei 10 Anni' : 'The 10-Year Grand Celebration'}
            </h3>

            <p className="text-xs text-[#73685E] mt-1 line-clamp-2 leading-relaxed">
              Villa Donnafugata & Pérgola de Olivos
              <br />
              Ragusa / Noto
            </p>
          </div>
        </div>

        {/* DAY 3 */}
        <div className="relative flex items-center gap-3.5 sm:gap-4 p-3.5 sm:p-4 rounded-2xl bg-white/95 border border-[#EFE8DE] shadow-[0_2px_12px_rgba(43,30,22,0.02)] overflow-hidden">
          {/* Photo Thumbnail */}
          <div className="w-20 h-24 sm:w-24 sm:h-28 rounded-xl overflow-hidden shrink-0 relative bg-[#F4EDE4]">
            <img
              src={DAY3_IMG}
              alt="Brunch & Despedida Frente al Mar"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          {/* Card Info */}
          <div className="flex-1 min-w-0 pr-1">
            <div className="flex items-center justify-between gap-1.5 mb-1 text-[10.5px] min-[380px]:text-[11.5px]">
              <span className="font-semibold text-[#5C7F92] uppercase tracking-normal sm:tracking-wider truncate">
                {isEs ? 'DÍA 3 • DOMINGO 30 DE MAYO' : isIt ? 'GIORNO 3 • DOMENICA 30 MAGGIO' : 'DAY 3 • SUNDAY, MAY 30'}
              </span>
              <span className="text-[#73685E] font-medium whitespace-nowrap shrink-0">
                {isEs ? 'A LAS 12:30' : isIt ? 'ALLE 12:30' : 'AT 12:30'}
              </span>
            </div>

            <h3 className="font-serif text-[15px] leading-[19px] font-medium text-[#1C1917]">
              {isEs ? 'Brunch & Despedida Frente al Mar' : isIt ? 'Brunch & Saluti sul Mare' : 'Seaside Farewell Brunch'}
            </h3>

            <p className="text-xs text-[#73685E] mt-1 line-clamp-2 leading-relaxed">
              Antica Tonnara di Marzamemi
              <br />
              Mar Jónico
            </p>
          </div>
        </div>
      </div>

      {/* Information / Instruction Items Block */}
      <div className="bg-white/95 rounded-2xl p-4 sm:p-5 border border-[#EFE8DE] shadow-[0_2px_12px_rgba(43,30,22,0.02)] space-y-3.5">
        {/* Item 1 */}
        <div className="flex items-start gap-3.5">
          <div className="w-7 h-7 rounded-full border border-[#5B6842]/30 flex items-center justify-center shrink-0 mt-0.5 text-[#5B6842] bg-[#F2F6ED]">
            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
          </div>
          <p className="text-xs sm:text-[13px] text-[#4A423B] leading-relaxed">
            {isEs
              ? 'Confirmarás asistencia (SÍ / NO) de forma independiente para cada día.'
              : isIt
              ? 'Confermerai la presenza (SÌ / NO) in modo indipendente per ciascun giorno.'
              : 'You will confirm attendance (YES / NO) independently for each day.'}
          </p>
        </div>

        <div className="h-[1px] bg-[#F0EBE2]" />

        {/* Item 2 */}
        <div className="flex items-start gap-3.5">
          <div className="w-7 h-7 rounded-full border border-[#BD532E]/30 flex items-center justify-center shrink-0 mt-0.5 text-[#BD532E] bg-[#FAECE8]">
            <Users className="w-3.5 h-3.5 stroke-[2]" />
          </div>
          <p className="text-xs sm:text-[13px] text-[#4A423B] leading-relaxed">
            {guest.hasCompanionInvite
              ? isEs
                ? 'Tu invitación incluye +1: podrás activar su asistencia para los días que te acompañe.'
                : isIt
                ? 'Il tuo invito include un +1: potrai attivare la sua presenza per i giorni in cui ti accompagnerà.'
                : 'Your invitation includes a +1: you can enable their attendance for the days they join.'
              : isEs
              ? 'Invitación individual para la celebración.'
              : 'Single invitation for the celebration.'}
          </p>
        </div>

        <div className="h-[1px] bg-[#F0EBE2]" />

        {/* Item 3 */}
        <div className="flex items-start gap-3.5">
          <div className="w-7 h-7 rounded-full border border-[#5C7F92]/30 flex items-center justify-center shrink-0 mt-0.5 text-[#5C7F92] bg-[#EEF4F7]">
            <UtensilsCrossed className="w-3.5 h-3.5 stroke-[2]" />
          </div>
          <p className="text-xs sm:text-[13px] text-[#4A423B] leading-relaxed">
            {isEs
              ? 'Al final podrás ingresar restricciones alimenticias, transporte y temas para Spotify.'
              : isIt
              ? 'Alla fine potrai inserire allergie, preferenze navetta e brani per Spotify.'
              : 'At the end you can submit dietary restrictions, shuttle options, and songs for Spotify.'}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 pt-2">
        <button
          type="button"
          onClick={onProceedToDay1}
          id="btn-overview-start-day1"
          className="w-full py-4 px-6 rounded-full bg-[#BD532E] hover:bg-[#A34423] active:scale-[0.98] text-white text-xs sm:text-sm font-semibold tracking-[0.14em] uppercase shadow-[0_8px_24px_rgba(189,83,46,0.28)] flex items-center justify-center gap-3 transition-all duration-200 cursor-pointer group"
        >
          <span>{isEs ? 'CONFIRMAR DÍA 1' : isIt ? 'CONFERMA GIORNO 1' : 'CONFIRM DAY 1'}</span>
          <ArrowRight className="w-4 h-4 text-white/90 group-hover:translate-x-1 transition-transform" />
        </button>

        <button
          type="button"
          onClick={onBackToIntro}
          id="btn-overview-back-intro"
          className="w-full py-3.5 px-6 rounded-full bg-transparent hover:bg-[#F2ECE1] active:scale-[0.98] text-[#554A41] text-xs font-semibold tracking-[0.12em] uppercase border border-[#DFD5C7] flex items-center justify-center gap-2.5 transition-all duration-200 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{isEs ? 'VOLVER A LA PORTADA' : isIt ? 'TORNA ALLA COPERTINA' : 'BACK TO COVER'}</span>
        </button>
      </div>

      {/* Dotted Carousel / Pagination indicators */}
      <div className="flex items-center justify-center gap-2 pt-2">
        <span className="w-2 h-2 rounded-full bg-[#BD532E]" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#D5C7B8]" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#D5C7B8]" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#D5C7B8]" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#D5C7B8]" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#D5C7B8]" />
      </div>
    </div>
  );
};
