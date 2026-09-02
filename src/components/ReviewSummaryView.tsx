import React from 'react';
import { GuestProfile, Language, RsvpState, ScreenId } from '../types';
import { VENUES_DATA } from '../data/eventData';
import {
  Check,
  Edit2,
  Calendar,
  UtensilsCrossed,
  Music,
  Users,
  Send,
  ArrowLeft,
  ShieldCheck,
  Heart,
} from 'lucide-react';
import { WeddingLogo } from './WeddingLogo';

interface ReviewSummaryViewProps {
  rsvpState: RsvpState;
  guest: GuestProfile;
  language: Language;
  onNavigateToScreen: (screen: ScreenId) => void;
  onSubmitRsvp: () => void;
  onPrev: () => void;
}

export const ReviewSummaryView: React.FC<ReviewSummaryViewProps> = ({
  rsvpState,
  guest,
  language,
  onNavigateToScreen,
  onSubmitRsvp,
  onPrev,
}) => {
  const isEs = language === 'es';
  const isIt = language === 'it';
  const venues = VENUES_DATA;

  // Compute Head Count for each day
  const getDayCount = (day: 1 | 2 | 3) => {
    const attendance =
      day === 1 ? rsvpState.day1 : day === 2 ? rsvpState.day2 : rsvpState.day3;
    if (!attendance.attending) return 0;
    return attendance.companionAttending ? 2 : 1;
  };

  const day1Count = getDayCount(1);
  const day2Count = getDayCount(2);
  const day3Count = getDayCount(3);

  const hasAnyAttendance = day1Count > 0 || day2Count > 0 || day3Count > 0;
  const hasCompanionAnyDay =
    (rsvpState.day1.attending && rsvpState.day1.companionAttending) ||
    (rsvpState.day2.attending && rsvpState.day2.companionAttending) ||
    (rsvpState.day3.attending && rsvpState.day3.companionAttending);

  return (
    <div className="pb-16 pt-4 px-4 sm:px-6 max-w-lg mx-auto space-y-6 text-left selection:bg-[#BD532E] selection:text-white">
      {/* Header */}
      <div className="bg-white/95 rounded-3xl p-5 sm:p-6 border border-[#EFE8DE] shadow-[0_4px_20px_rgba(43,30,22,0.03)] space-y-3">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#E2E8DC] text-[#485532] text-[11px] font-semibold tracking-wider uppercase border border-[#D1DCB8]">
            <ShieldCheck className="w-3.5 h-3.5" />
            {isEs ? 'Paso 6: Resumen Final' : isIt ? 'Passo 6: Riepilogo Finale' : 'Step 6: Final Review'}
          </span>
          <WeddingLogo variant="badge" className="w-14 h-9" />
        </div>

        <h1 className="font-serif text-2xl sm:text-3xl font-medium text-[#1C1917] leading-tight">
          {isEs ? 'Resumen de tu RSVP' : isIt ? 'Riepilogo del tuo RSVP' : 'Review Your RSVP'}
        </h1>
        <p className="text-[13px] sm:text-sm text-[#5A524A] leading-relaxed">
          {isEs
            ? 'Por favor verifica tus elecciones para cada uno de los 3 días antes de confirmar tu respuesta.'
            : isIt
            ? 'Controlla le tue scelte per ciascuno dei 3 giorni prima di confermare.'
            : 'Please review your choices for each of the 3 celebration days before confirming.'}
        </p>
      </div>

      {/* 3-Days Attendance Summary Card */}
      <div className="bg-white/95 rounded-3xl p-5 sm:p-6 border border-[#EAE2D5] shadow-[0_4px_20px_rgba(43,30,22,0.04)] space-y-4">
        <div className="flex items-center justify-between border-b border-[#F0EBE2] pb-3">
          <div>
            <h2 className="font-serif text-lg font-medium text-[#1C1917]">
              {isEs ? 'Asistencia a los 3 Días' : isIt ? 'Presenza ai 3 Giorni' : '3-Day Attendance'}
            </h2>
            <p className="text-xs text-[#73685E]">
              {isEs ? '28, 29 y 30 de Mayo de 2027 • Sicilia' : '28, 29 & 30 May 2027 • Sicily'}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigateToScreen('day1')}
            className="text-xs font-semibold text-[#BD532E] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <Edit2 className="w-3 h-3" />
            <span>{isEs ? 'Modificar' : isIt ? 'Modifica' : 'Edit'}</span>
          </button>
        </div>

        {/* Day 1 Row */}
        <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#F2DDD6] flex items-center justify-between">
          <div className="min-w-0 pr-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#BD532E]" />
              <span className="text-[11px] font-semibold text-[#BD532E] uppercase tracking-wider">
                {isEs ? 'Día 1 (28.05)' : isIt ? 'Giorno 1 (28.05)' : 'Day 1 (28.05)'}
              </span>
            </div>
            <p className="font-serif text-sm font-medium text-[#1C1917] mt-0.5 truncate">
              {isEs ? venues[1].es.title : venues[1].en.title}
            </p>
            <p className="text-xs text-[#73685E]">
              {rsvpState.day1.attending
                ? rsvpState.day1.companionAttending
                  ? isEs
                    ? 'Asistes tú + acompañante'
                    : 'You + companion (+1)'
                  : isEs
                  ? 'Asistes solo tú'
                  : 'Attending solo'
                : isEs
                ? 'No asistirás'
                : 'Not attending'}
            </p>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold shrink-0 ${
              day1Count > 0
                ? 'bg-[#BD532E] text-white shadow-[0_2px_8px_rgba(189,83,46,0.2)]'
                : 'bg-[#EAE2D5] text-[#73685E]'
            }`}
          >
            {day1Count} {isEs ? (day1Count === 1 ? 'persona' : 'personas') : (day1Count === 1 ? 'guest' : 'guests')}
          </span>
        </div>

        {/* Day 2 Row */}
        <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#D9E2D2] flex items-center justify-between">
          <div className="min-w-0 pr-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#5B6842]" />
              <span className="text-[11px] font-semibold text-[#5B6842] uppercase tracking-wider">
                {isEs ? 'Día 2 (29.05)' : isIt ? 'Giorno 2 (29.05)' : 'Day 2 (29.05)'}
              </span>
            </div>
            <p className="font-serif text-sm font-medium text-[#1C1917] mt-0.5 truncate">
              {isEs ? venues[2].es.title : venues[2].en.title}
            </p>
            <p className="text-xs text-[#73685E]">
              {rsvpState.day2.attending
                ? rsvpState.day2.companionAttending
                  ? isEs
                    ? 'Asistes tú + acompañante'
                    : 'You + companion (+1)'
                  : isEs
                  ? 'Asistes solo tú'
                  : 'Attending solo'
                : isEs
                ? 'No asistirás'
                : 'Not attending'}
            </p>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold shrink-0 ${
              day2Count > 0
                ? 'bg-[#5B6842] text-white shadow-[0_2px_8px_rgba(91,104,66,0.2)]'
                : 'bg-[#EAE2D5] text-[#73685E]'
            }`}
          >
            {day2Count} {isEs ? (day2Count === 1 ? 'persona' : 'personas') : (day2Count === 1 ? 'guest' : 'guests')}
          </span>
        </div>

        {/* Day 3 Row */}
        <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#D2E0E7] flex items-center justify-between">
          <div className="min-w-0 pr-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#5C7F92]" />
              <span className="text-[11px] font-semibold text-[#5C7F92] uppercase tracking-wider">
                {isEs ? 'Día 3 (30.05)' : isIt ? 'Giorno 3 (30.05)' : 'Day 3 (30.05)'}
              </span>
            </div>
            <p className="font-serif text-sm font-medium text-[#1C1917] mt-0.5 truncate">
              {isEs ? venues[3].es.title : venues[3].en.title}
            </p>
            <p className="text-xs text-[#73685E]">
              {rsvpState.day3.attending
                ? rsvpState.day3.companionAttending
                  ? isEs
                    ? 'Asistes tú + acompañante'
                    : 'You + companion (+1)'
                  : isEs
                  ? 'Asistes solo tú'
                  : 'Attending solo'
                : isEs
                ? 'No asistirás'
                : 'Not attending'}
            </p>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold shrink-0 ${
              day3Count > 0
                ? 'bg-[#5C7F92] text-white shadow-[0_2px_8px_rgba(92,127,146,0.2)]'
                : 'bg-[#EAE2D5] text-[#73685E]'
            }`}
          >
            {day3Count} {isEs ? (day3Count === 1 ? 'persona' : 'personas') : (day3Count === 1 ? 'guest' : 'guests')}
          </span>
        </div>
      </div>

      {/* Guest & Dietary Summary */}
      <div className="bg-white/95 rounded-3xl p-5 sm:p-6 border border-[#EFE8DE] shadow-[0_4px_20px_rgba(43,30,22,0.03)] space-y-3.5">
        <div className="flex items-center justify-between border-b border-[#F0EBE2] pb-2.5">
          <div className="flex items-center gap-2">
            <UtensilsCrossed className="w-4 h-4 text-[#BD532E]" />
            <h2 className="font-serif text-base font-medium text-[#1C1917]">
              {isEs ? 'Alergias & Logística' : isIt ? 'Diete & Logistica' : 'Dietary & Logistics'}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigateToScreen('extras')}
            className="text-xs font-semibold text-[#BD532E] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <Edit2 className="w-3 h-3" />
            <span>{isEs ? 'Editar' : isIt ? 'Modifica' : 'Edit'}</span>
          </button>
        </div>

        <div className="text-xs sm:text-[13px] space-y-2 leading-relaxed">
          <p className="text-[#554A41]">
            <strong className="text-[#1C1917] font-semibold">{isEs ? 'Invitado: ' : 'Guest: '}</strong>
            {guest.primaryName}
          </p>

          <p className="text-[#554A41]">
            <strong className="text-[#1C1917] font-semibold">{isEs ? 'Alergias / Restricciones: ' : 'Dietary Needs: '}</strong>
            {rsvpState.guestDietaryInput.trim() ||
              (isEs ? 'Sin restricciones informadas' : 'None specified')}
          </p>

          {hasCompanionAnyDay && (
            <p className="text-[#554A41]">
              <strong className="text-[#1C1917] font-semibold">{isEs ? 'Acompañante (+1): ' : '+1 Companion: '}</strong>
              {rsvpState.companionDietaryInput.trim() ||
                (isEs ? 'Sin restricciones especificadas' : 'None specified')}
            </p>
          )}

          <p className="text-[#554A41]">
            <strong className="text-[#1C1917] font-semibold">{isEs ? 'Shuttle Oficial: ' : 'Official Shuttle: '}</strong>
            {rsvpState.needsShuttle
              ? isEs
                ? 'Sí, utilizará el transporte oficial del evento'
                : 'Yes, will use official shuttles'
              : isEs
                ? 'No requiere shuttle (traslado por cuenta propia)'
                : 'Shuttle not needed'}
          </p>
        </div>
      </div>

      {/* Songs & Message Summary */}
      {hasAnyAttendance && (
        <div className="bg-white/95 rounded-3xl p-5 sm:p-6 border border-[#EFE8DE] shadow-[0_4px_20px_rgba(43,30,22,0.03)] space-y-3.5">
          <div className="flex items-center justify-between border-b border-[#F0EBE2] pb-2.5">
            <div className="flex items-center gap-2">
              <Music className="w-4 h-4 text-[#5B6842]" />
              <h2 className="font-serif text-base font-medium text-[#1C1917]">
                {isEs ? 'Música & Mensaje' : isIt ? 'Musica & Messaggio' : 'Music & Message'}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigateToScreen('songs')}
              className="text-xs font-semibold text-[#BD532E] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Edit2 className="w-3 h-3" />
              <span>{isEs ? 'Editar' : isIt ? 'Modifica' : 'Edit'}</span>
            </button>
          </div>

          {rsvpState.songs.length > 0 ? (
            <div className="space-y-1.5 text-xs sm:text-[13px]">
              {rsvpState.songs.map((s) => (
                <div key={s.id} className="text-[#554A41] flex items-center gap-2.5">
                  <img
                    src={
                      s.albumArt ||
                      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=300&auto=format&fit=crop'
                    }
                    alt={s.title}
                    className="w-7 h-7 rounded-lg object-cover border border-[#EAE2D5]"
                  />
                  <span>
                    <strong className="text-[#1C1917]">{s.title}</strong> — {s.artist}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-[#73685E] italic">
              {isEs ? 'No se seleccionaron canciones.' : 'No tracks selected.'}
            </p>
          )}

          {rsvpState.personalMessage.trim() && (
            <div className="pt-2.5 border-t border-[#F0EBE2]">
              <p className="text-xs text-[#73685E] font-semibold mb-1 flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-[#BD532E]" />
                {isEs ? 'Mensaje para Mariana & Lukas:' : 'Message for Mariana & Lukas:'}
              </p>
              <p className="text-xs sm:text-[13px] text-[#1C1917] italic bg-[#FAF8F5] p-3 rounded-2xl border border-[#EFE8DE] leading-relaxed">
                «{rsvpState.personalMessage}»
              </p>
            </div>
          )}
        </div>
      )}

      {/* Confirmation Lock Notice */}
      <p className="text-xs text-[#73685E] text-center max-w-sm mx-auto leading-relaxed">
        {isEs
          ? 'Al enviar, tu respuesta quedará registrada para Mariana & Lukas. Podrás ver tu pase de acceso y la guía de viaje cuando quieras.'
          : 'Upon submitting, your response is saved for Mariana & Lukas. You can view your pass and travel guide anytime.'}
      </p>

      {/* Action Buttons */}
      <div className="space-y-3 pt-2">
        <button
          type="button"
          onClick={onSubmitRsvp}
          id="btn-confirm-submit-rsvp"
          className="w-full py-4 px-6 rounded-full bg-[#BD532E] hover:bg-[#A34423] active:scale-[0.98] text-white text-xs sm:text-sm font-semibold tracking-[0.14em] uppercase shadow-[0_8px_24px_rgba(189,83,46,0.28)] flex items-center justify-center gap-3 transition-all duration-200 cursor-pointer group"
        >
          <Send className="w-4 h-4" />
          <span>{isEs ? 'ENVIAR CONFIRMACIÓN FINAL' : isIt ? 'INVIA CONFERMA FINALE' : 'SUBMIT FINAL RSVP'}</span>
        </button>

        <button
          type="button"
          onClick={onPrev}
          id="btn-review-prev"
          className="w-full py-3.5 px-6 rounded-full bg-transparent hover:bg-[#F2ECE1] active:scale-[0.98] text-[#554A41] text-xs font-semibold tracking-[0.12em] uppercase border border-[#DFD5C7] flex items-center justify-center gap-2.5 transition-all duration-200 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{isEs ? 'MODIFICAR PASOS' : isIt ? 'MODIFICA PASSI' : 'MODIFY STEPS'}</span>
        </button>
      </div>

      {/* Dotted pagination indicator */}
      <div className="flex items-center justify-center gap-2 pt-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#BD532E]" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#BD532E]" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#BD532E]" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#BD532E]" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#BD532E]" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#BD532E]" />
      </div>
    </div>
  );
};
