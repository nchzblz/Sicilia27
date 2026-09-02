import React from 'react';
import { DayAttendance, GuestProfile, Language, VenueInfo } from '../types';
import {
  Calendar,
  Clock,
  MapPin,
  Check,
  X,
  Users,
  ArrowRight,
  ArrowLeft,
  Shirt,
} from 'lucide-react';
import { BotanicalOliveBranch } from './SicilianMotifs';

interface DayRsvpCardProps {
  dayNumber: 1 | 2 | 3;
  venue: VenueInfo;
  attendance: DayAttendance;
  guest: GuestProfile;
  language: Language;
  onUpdateAttendance: (attendance: DayAttendance) => void;
  onNext: () => void;
  onPrev: () => void;
  isFirstDay?: boolean;
  isLastDay?: boolean;
}

export const DayRsvpCard: React.FC<DayRsvpCardProps> = ({
  dayNumber,
  venue,
  attendance,
  guest,
  language,
  onUpdateAttendance,
  onNext,
  onPrev,
}) => {
  const isEs = language === 'es';
  const isIt = language === 'it';

  // Toggle handler for primary guest
  const handlePrimaryToggle = (attending: boolean) => {
    onUpdateAttendance({
      attending,
      // If primary guest is NOT attending, companion must also be false per spec
      companionAttending: attending ? attendance.companionAttending : false,
    });
  };

  // Toggle handler for companion
  const handleCompanionToggle = (companionAttending: boolean) => {
    if (!attendance.attending) return;
    onUpdateAttendance({
      ...attendance,
      companionAttending,
    });
  };

  // Palette theme according to day
  const theme = {
    1: {
      accent: '#BD532E',
      badgeBg: 'bg-[#FAECE8]',
      badgeText: 'text-[#BD532E]',
      border: 'border-[#F2DDD6]',
      btnBg: 'bg-[#BD532E]',
      btnHover: 'hover:bg-[#A34423]',
      activePill: 'bg-[#BD532E] text-white shadow-[0_4px_16px_rgba(189,83,46,0.25)]',
    },
    2: {
      accent: '#5B6842',
      badgeBg: 'bg-[#E2E8DC]',
      badgeText: 'text-[#485532]',
      border: 'border-[#D9E2D2]',
      btnBg: 'bg-[#5B6842]',
      btnHover: 'hover:bg-[#485334]',
      activePill: 'bg-[#5B6842] text-white shadow-[0_4px_16px_rgba(91,104,66,0.25)]',
    },
    3: {
      accent: '#5C7F92',
      badgeBg: 'bg-[#EEF4F7]',
      badgeText: 'text-[#3B5B6D]',
      border: 'border-[#D2E0E7]',
      btnBg: 'bg-[#5C7F92]',
      btnHover: 'hover:bg-[#4A697B]',
      activePill: 'bg-[#5C7F92] text-white shadow-[0_4px_16px_rgba(92,127,146,0.25)]',
    },
  }[dayNumber];

  return (
    <div className="pb-16 pt-4 px-4 sm:px-6 max-w-lg mx-auto space-y-6 text-left selection:bg-[#BD532E] selection:text-white">
      {/* Top Header Card */}
      <div className="bg-white/95 rounded-3xl p-5 sm:p-6 border border-[#EFE8DE] shadow-[0_4px_20px_rgba(43,30,22,0.03)] space-y-4 relative overflow-hidden">
        {/* Category Pill & Date */}
        <div className="flex items-center justify-between">
          <span
            className={`inline-flex items-center px-3.5 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wider ${theme.badgeBg} ${theme.badgeText}`}
          >
            {isEs
              ? `Día ${dayNumber} de 3`
              : isIt
              ? `Giorno ${dayNumber} di 3`
              : `Day ${dayNumber} of 3`}
          </span>
          <span className="text-xs sm:text-[13px] text-[#73685E] font-medium tracking-wider flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#5B6842]" />
            {venue.date}
          </span>
        </div>

        {/* Title and Subtitle */}
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-medium text-[#1C1917] leading-tight">
            {venue.title}
          </h1>
          <p className="text-xs sm:text-sm font-serif italic text-[#73685E] mt-1">
            «{venue.subtitle}»
          </p>
        </div>

        {/* Venue Location and Time details */}
        <div className="pt-3 border-t border-[#F0EBE2] flex flex-wrap items-center justify-between gap-y-2 text-xs sm:text-[13px] text-[#554A41]">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#5B6842]" />
            {venue.time}
          </span>
          <span className="flex items-center gap-1.5 font-medium text-[#1C1917]">
            <MapPin className="w-3.5 h-3.5 text-[#BD532E]" />
            {venue.venueName}
          </span>
        </div>
      </div>

      {/* Venue Photo & Atmosphere Card */}
      <div className="bg-white/95 rounded-3xl p-5 border border-[#EFE8DE] shadow-[0_4px_20px_rgba(43,30,22,0.03)] space-y-4">
        <div className="relative rounded-2xl overflow-hidden aspect-[16/9] bg-[#F4EDE4]">
          <img
            src={venue.imageUrl}
            alt={venue.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-3 left-3">
            <span className="bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-[10px] sm:text-xs text-white uppercase tracking-wider font-medium">
              {venue.venueType}
            </span>
          </div>
        </div>

        <p className="text-[13px] sm:text-sm text-[#5A524A] leading-relaxed">
          {venue.description}
        </p>

        {/* Dress code note */}
        <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#EFE8DE] flex items-start gap-2.5">
          <Shirt className="w-4 h-4 text-[#5B6842] shrink-0 mt-0.5" />
          <div className="text-xs sm:text-[13px] text-[#554A41] leading-relaxed">
            <strong className="text-[#1C1917] font-semibold">Dress Code: </strong>
            {venue.dressCode}
          </div>
        </div>

        {/* Highlights */}
        <div className="space-y-2 pt-1">
          {venue.highlights.map((h, i) => (
            <div key={i} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-[#554A41]">
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5"
                style={{ backgroundColor: theme.accent }}
              />
              <span className="leading-snug">{h}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Attendance Confirmation Section (The core RSVP decision) */}
      <div className="bg-white/95 rounded-3xl p-5 sm:p-6 border border-[#EAE2D5] shadow-[0_4px_20px_rgba(43,30,22,0.04)] space-y-5">
        <div className="border-b border-[#F0EBE2] pb-3">
          <h2 className="font-serif text-xl sm:text-2xl font-medium text-[#1C1917]">
            {isEs
              ? 'Tu Asistencia a este día'
              : isIt
              ? 'La tua presenza per questo giorno'
              : 'Your Attendance for this day'}
          </h2>
          <p className="text-xs text-[#73685E] mt-0.5">
            {dayNumber === 1
              ? (isEs ? 'Viernes 28 de Mayo' : isIt ? 'Venerdì 28 Maggio' : 'Friday, May 28')
              : dayNumber === 2
              ? (isEs ? 'Sábado 29 de Mayo' : isIt ? 'Sabato 29 Maggio' : 'Saturday, May 29')
              : (isEs ? 'Domingo 30 de Mayo' : isIt ? 'Domenica 30 Maggio' : 'Sunday, May 30')}
          </p>
        </div>

        {/* Primary Guest Choice */}
        <div className="space-y-2">
          <label className="text-xs sm:text-[13px] font-semibold text-[#1C1917] block">
            {guest.primaryName}
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handlePrimaryToggle(true)}
              id={`btn-day-${dayNumber}-attending-yes`}
              className={`py-3.5 px-4 rounded-2xl border text-xs sm:text-[13px] font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer touch-manipulation active:scale-[0.98] ${
                attendance.attending
                  ? 'bg-[#5B6842] text-white border-transparent shadow-[0_4px_16px_rgba(91,104,66,0.25)]'
                  : 'bg-white border-[#DFD5C7] text-[#554A41] hover:bg-[#FAF8F5]'
              }`}
            >
              <Check className="w-4 h-4 stroke-[2.5]" />
              <span>{isEs ? 'Sí, asistiré' : isIt ? 'Sì, ci sarò' : 'Yes, I will attend'}</span>
            </button>

            <button
              type="button"
              onClick={() => handlePrimaryToggle(false)}
              id={`btn-day-${dayNumber}-attending-no`}
              className={`py-3.5 px-4 rounded-2xl border text-xs sm:text-[13px] font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer touch-manipulation active:scale-[0.98] ${
                !attendance.attending
                  ? 'bg-[#73685E] text-white border-transparent shadow-[0_4px_16px_rgba(115,104,94,0.25)]'
                  : 'bg-white border-[#DFD5C7] text-[#554A41] hover:bg-[#FAF8F5]'
              }`}
            >
              <X className="w-4 h-4 stroke-[2.5]" />
              <span>{isEs ? 'No podré ir' : isIt ? 'Non potrò' : 'Cannot attend'}</span>
            </button>
          </div>
        </div>

        {/* Companion Choice (if guest has companion) */}
        {guest.hasCompanionInvite && (
          <div
            className={`pt-4 border-t border-[#F0EBE2] space-y-2.5 transition-opacity duration-200 ${
              !attendance.attending ? 'opacity-40 pointer-events-none' : 'opacity-100'
            }`}
          >
            <div className="flex items-center justify-between">
              <label className="text-xs sm:text-[13px] font-semibold text-[#1C1917] flex items-center gap-2">
                <Users className="w-4 h-4 text-[#BD532E]" />
                <span>
                  {isEs
                    ? 'Acompañante (+1)'
                    : isIt
                    ? 'Accompagnatore (+1)'
                    : 'Companion / +1 Guest'}
                </span>
              </label>
              {!attendance.attending && (
                <span className="text-[10px] text-[#8C7F72] italic">
                  {isEs ? '(Debes asistir tú primero)' : '(Must attend first)'}
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleCompanionToggle(true)}
                disabled={!attendance.attending}
                id={`btn-day-${dayNumber}-companion-yes`}
                className={`py-3 px-3.5 rounded-2xl border text-xs sm:text-[13px] font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer touch-manipulation active:scale-[0.98] ${
                  attendance.attending && attendance.companionAttending
                    ? 'bg-[#5B6842] text-white border-transparent shadow-[0_4px_16px_rgba(91,104,66,0.25)]'
                    : 'bg-white border-[#DFD5C7] text-[#554A41] hover:bg-[#FAF8F5]'
                }`}
              >
                <Check className="w-4 h-4 stroke-[2.5]" />
                <span>{isEs ? 'Asistirá conmigo' : isIt ? 'Verrà con me' : 'Will attend'}</span>
              </button>

              <button
                type="button"
                onClick={() => handleCompanionToggle(false)}
                disabled={!attendance.attending}
                id={`btn-day-${dayNumber}-companion-no`}
                className={`py-3 px-3.5 rounded-2xl border text-xs sm:text-[13px] font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer touch-manipulation active:scale-[0.98] ${
                  !attendance.companionAttending || !attendance.attending
                    ? 'bg-[#73685E] text-white border-transparent shadow-[0_4px_16px_rgba(115,104,94,0.25)]'
                    : 'bg-white border-[#DFD5C7] text-[#554A41] hover:bg-[#FAF8F5]'
                }`}
              >
                <X className="w-4 h-4 stroke-[2.5]" />
                <span>{isEs ? 'Solo voy yo' : isIt ? 'Vado da solo' : 'Attending solo'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Live Headcount Preview for this Day */}
        <div className="pt-2 flex items-center justify-between text-xs text-[#73685E] border-t border-[#F0EBE2]">
          <span>
            {isEs
              ? 'Conteo confirmado para este día:'
              : isIt
              ? 'Conferme per questo giorno:'
              : 'Confirmed count for this day:'}
          </span>
          <span className="font-semibold px-3 py-1 rounded-full bg-[#F6F1EA] text-[#1C1917] border border-[#EAE2D5]">
            {attendance.attending
              ? attendance.companionAttending
                ? '2 personas'
                : '1 persona'
              : '0 personas'}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 pt-2">
        <button
          type="button"
          onClick={onNext}
          id="btn-day-next"
          className="w-full py-4 px-6 rounded-full bg-[#BD532E] hover:bg-[#A34423] active:scale-[0.98] text-white text-xs sm:text-sm font-semibold tracking-[0.14em] uppercase shadow-[0_8px_24px_rgba(189,83,46,0.28)] flex items-center justify-center gap-3 transition-all duration-200 cursor-pointer group"
        >
          {dayNumber === 1 && (
            <>
              <span>{isEs ? 'CONTINUAR A DÍA 2' : isIt ? 'CONTINUA A GIORNO 2' : 'CONTINUE TO DAY 2'}</span>
              <ArrowRight className="w-4 h-4 text-white/90 group-hover:translate-x-1 transition-transform" />
            </>
          )}
          {dayNumber === 2 && (
            <>
              <span>{isEs ? 'CONTINUAR A DÍA 3' : isIt ? 'CONTINUA A GIORNO 3' : 'CONTINUE TO DAY 3'}</span>
              <ArrowRight className="w-4 h-4 text-white/90 group-hover:translate-x-1 transition-transform" />
            </>
          )}
          {dayNumber === 3 && (
            <>
              <span>{isEs ? 'DETALLES & DIETAS' : isIt ? 'DIETE & LOGISTICA' : 'DIETARY & EXTRAS'}</span>
              <ArrowRight className="w-4 h-4 text-white/90 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>

        <button
          type="button"
          onClick={onPrev}
          id="btn-day-prev"
          className="w-full py-3.5 px-6 rounded-full bg-transparent hover:bg-[#F2ECE1] active:scale-[0.98] text-[#554A41] text-xs font-semibold tracking-[0.12em] uppercase border border-[#DFD5C7] flex items-center justify-center gap-2.5 transition-all duration-200 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{isEs ? 'VOLVER' : isIt ? 'INDIETRO' : 'BACK'}</span>
        </button>
      </div>

      {/* Dotted pagination indicator */}
      <div className="flex items-center justify-center gap-2 pt-2">
        <span className={`w-1.5 h-1.5 rounded-full ${dayNumber >= 1 ? 'bg-[#BD532E]' : 'bg-[#D5C7B8]'}`} />
        <span className={`w-1.5 h-1.5 rounded-full ${dayNumber >= 2 ? 'bg-[#BD532E]' : 'bg-[#D5C7B8]'}`} />
        <span className={`w-1.5 h-1.5 rounded-full ${dayNumber >= 3 ? 'bg-[#BD532E]' : 'bg-[#D5C7B8]'}`} />
        <span className="w-1.5 h-1.5 rounded-full bg-[#D5C7B8]" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#D5C7B8]" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#D5C7B8]" />
      </div>
    </div>
  );
};
