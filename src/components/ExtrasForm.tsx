import React from 'react';
import { GuestProfile, Language, RsvpState } from '../types';
import {
  UtensilsCrossed,
  Users,
  Bus,
  ArrowRight,
  ArrowLeft,
  Check,
} from 'lucide-react';

interface ExtrasFormProps {
  rsvpState: RsvpState;
  guest: GuestProfile;
  language: Language;
  onUpdate: (partial: Partial<RsvpState>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const ExtrasForm: React.FC<ExtrasFormProps> = ({
  rsvpState,
  guest,
  language,
  onUpdate,
  onNext,
  onPrev,
}) => {
  const isEs = language === 'es';
  const isIt = language === 'it';

  // Check if companion was confirmed on ANY day
  const hasCompanionAnyDay =
    (rsvpState.day1.attending && rsvpState.day1.companionAttending) ||
    (rsvpState.day2.attending && rsvpState.day2.companionAttending) ||
    (rsvpState.day3.attending && rsvpState.day3.companionAttending);

  return (
    <div className="pb-16 pt-4 px-4 sm:px-6 max-w-lg mx-auto space-y-6 text-left selection:bg-[#BD532E] selection:text-white">
      {/* Top Header Card */}
      <div className="bg-white/95 rounded-3xl p-5 sm:p-6 border border-[#EFE8DE] shadow-[0_4px_20px_rgba(43,30,22,0.03)] space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FAECE8] text-[#BD532E] text-[11px] font-semibold tracking-wider uppercase border border-[#F2DDD6]">
          <UtensilsCrossed className="w-3.5 h-3.5" />
          {isEs ? 'Paso 4: Alergias & Logística' : isIt ? 'Passo 4: Diete & Logistica' : 'Step 4: Dietary & Logistics'}
        </div>

        <h1 className="font-serif text-2xl sm:text-3xl font-medium text-[#1C1917] leading-tight">
          {isEs
            ? 'Restricciones Alimenticias & Shuttles'
            : isIt
            ? 'Preferenze Alimentari & Navetta'
            : 'Dietary Restrictions & Shuttles'}
        </h1>

        <p className="text-[13px] sm:text-sm text-[#5A524A] leading-relaxed">
          {isEs
            ? 'Queremos que disfrutes cada plato del banquete siciliano con total tranquilidad.'
            : isIt
            ? 'Vogliamo che tu possa assaporare ogni piatto del banchetto siciliano in totale serenità.'
            : 'We want you to savor every dish of the Sicilian feast safely and comfortably.'}
        </p>
      </div>

      {/* 1. Primary Guest Dietary / Allergies Input */}
      <div className="bg-white/95 rounded-3xl p-5 sm:p-6 border border-[#EFE8DE] shadow-[0_4px_20px_rgba(43,30,22,0.03)] space-y-3.5">
        <div className="flex items-center gap-2 border-b border-[#F0EBE2] pb-3">
          <div className="w-7 h-7 rounded-full bg-[#FAECE8] text-[#BD532E] flex items-center justify-center">
            <UtensilsCrossed className="w-3.5 h-3.5" />
          </div>
          <h2 className="font-serif text-lg font-medium text-[#1C1917]">
            {isEs ? 'Restricciones alimenticias y alergias' : isIt ? 'Allergie e intolleranze' : 'Dietary restrictions & allergies'}
          </h2>
        </div>

        <div>
          <label
            htmlFor="input-guest-dietary"
            className="text-xs sm:text-[13px] font-semibold text-[#1C1917] block mb-2"
          >
            {isEs
              ? `¿Tienes alguna alergia o restricción alimenticia, ${guest.primaryName}?`
              : isIt
              ? `Hai allergie o preferenze alimentari, ${guest.primaryName}?`
              : `Do you have any allergies or dietary requirements, ${guest.primaryName}?`}
          </label>
          <input
            id="input-guest-dietary"
            type="text"
            value={rsvpState.guestDietaryInput}
            onChange={(e) => onUpdate({ guestDietaryInput: e.target.value })}
            placeholder={
              isEs
                ? 'Ej. Celíaco / Sin gluten, mariscos, vegetariano, lactosa...'
                : isIt
                ? 'Es. Celiachia / Senza glutine, crostacei, vegetariano, lattosio...'
                : 'e.g. Celiac / Gluten-Free, shellfish, vegetarian, lactose...'
            }
            className="w-full px-4 py-3 rounded-2xl border border-[#DFD5C7] bg-[#FAF8F5] text-xs sm:text-sm text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-[#BD532E]/30 focus:border-[#BD532E] transition-all"
          />
          <p className="text-[11px] text-[#73685E] mt-1.5">
            {isEs
              ? 'Si no tienes ninguna restricción, puedes dejarlo vacío.'
              : isIt
              ? 'Se non hai restrizioni, puoi lasciare il campo vuoto.'
              : 'If you have no dietary restrictions, you can leave this empty.'}
          </p>
        </div>
      </div>

      {/* 2. Companion Dietary & Name (shown if +1 is selected on at least one day) */}
      {hasCompanionAnyDay && (
        <div className="bg-white/95 rounded-3xl p-5 sm:p-6 border border-[#D9E2D2] shadow-[0_4px_20px_rgba(43,30,22,0.03)] space-y-3.5">
          <div className="flex items-center gap-2 border-b border-[#F0EBE2] pb-3">
            <div className="w-7 h-7 rounded-full bg-[#E2E8DC] text-[#485532] flex items-center justify-center">
              <Users className="w-3.5 h-3.5" />
            </div>
            <h2 className="font-serif text-lg font-medium text-[#1C1917]">
              {isEs ? '¿Y tu acompañante (+1)?' : isIt ? 'E il tuo accompagnatore (+1)?' : 'And your +1 companion?'}
            </h2>
          </div>

          <div>
            <label
              htmlFor="input-companion-dietary"
              className="text-xs sm:text-[13px] font-semibold text-[#1C1917] block mb-2"
            >
              {isEs
                ? 'Nombre (opcional) - Alergias o restricciones'
                : isIt
                ? 'Nome (opzionale) - Allergie o restrizioni'
                : 'Name (optional) - Dietary restrictions'}
            </label>
            <input
              id="input-companion-dietary"
              type="text"
              value={rsvpState.companionDietaryInput}
              onChange={(e) => onUpdate({ companionDietaryInput: e.target.value })}
              placeholder={
                isEs
                  ? 'Ej. María Pérez - Vegetariana estricta, sin frutos secos'
                  : isIt
                  ? 'Es. Maria Rossi - Vegetariana, no frutta a guscio'
                  : 'e.g. Jane Doe - Strictly vegetarian, nut allergy'
              }
              className="w-full px-4 py-3 rounded-2xl border border-[#DFD5C7] bg-[#FAF8F5] text-xs sm:text-sm text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-[#5B6842]/30 focus:border-[#5B6842] transition-all"
            />
          </div>
        </div>
      )}

      {/* 3. Transport Shuttle Preference */}
      <div className="bg-white/95 rounded-3xl p-5 sm:p-6 border border-[#EFE8DE] shadow-[0_4px_20px_rgba(43,30,22,0.03)] space-y-4">
        <div className="flex items-center gap-2 border-b border-[#F0EBE2] pb-3">
          <div className="w-7 h-7 rounded-full bg-[#EEF4F7] text-[#3B5B6D] flex items-center justify-center">
            <Bus className="w-3.5 h-3.5" />
          </div>
          <div>
            <h2 className="font-serif text-lg font-medium text-[#1C1917]">
              {isEs ? 'Transporte & Shuttles' : isIt ? 'Navette & Trasporti' : 'Shuttle & Transportation'}
            </h2>
            <p className="text-xs text-[#73685E]">
              {isEs ? 'Servicio de transfer gratuito para los invitados' : isIt ? 'Servizio navetta gratuito per gli ospiti' : 'Complimentary shuttle service for guests'}
            </p>
          </div>
        </div>

        <div className="space-y-2.5">
          <label
            onClick={() => onUpdate({ needsShuttle: true })}
            className={`flex items-start gap-3 p-3.5 rounded-2xl border transition-all cursor-pointer ${
              rsvpState.needsShuttle
                ? 'bg-[#F2F6ED] border-[#5B6842] shadow-[0_2px_8px_rgba(91,104,66,0.12)]'
                : 'bg-[#FAF8F5] border-[#DFD5C7] hover:bg-white'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full border mt-0.5 flex items-center justify-center shrink-0 ${
                rsvpState.needsShuttle
                  ? 'border-[#5B6842] bg-[#5B6842] text-white'
                  : 'border-[#C4B7A6] bg-white'
              }`}
            >
              {rsvpState.needsShuttle && <Check className="w-3 h-3 stroke-[3]" />}
            </div>
            <div className="text-xs sm:text-[13px] leading-relaxed">
              <strong className="text-[#1C1917] block font-semibold">
                {isEs
                  ? 'Sí, me gustaría usar los shuttles oficiales'
                  : isIt
                  ? 'Sì, vorrei utilizzare le navette ufficiali'
                  : 'Yes, I would like to use the official shuttles'}
              </strong>
              <span className="text-[#73685E]">
                {isEs
                  ? 'Habrá puntos de encuentro en el centro histórico de Noto hacia las villas.'
                  : isIt
                  ? 'Punti di ritrovo nel centro storico di Noto verso le location.'
                  : 'Pickup points in historic Noto to the celebration venues.'}
              </span>
            </div>
          </label>

          <label
            onClick={() => onUpdate({ needsShuttle: false })}
            className={`flex items-start gap-3 p-3.5 rounded-2xl border transition-all cursor-pointer ${
              !rsvpState.needsShuttle
                ? 'bg-[#FAF8F5] border-[#73685E] shadow-[0_2px_8px_rgba(115,104,94,0.12)]'
                : 'bg-[#FAF8F5] border-[#DFD5C7] hover:bg-white'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full border mt-0.5 flex items-center justify-center shrink-0 ${
                !rsvpState.needsShuttle
                  ? 'border-[#73685E] bg-[#73685E] text-white'
                  : 'border-[#C4B7A6] bg-white'
              }`}
            >
              {!rsvpState.needsShuttle && <Check className="w-3 h-3 stroke-[3]" />}
            </div>
            <div className="text-xs sm:text-[13px] leading-relaxed">
              <strong className="text-[#1C1917] block font-semibold">
                {isEs
                  ? 'No, tendré auto de alquiler / me trasladaré por mi cuenta'
                  : isIt
                  ? 'No, avrò un’auto a noleggio / mi sposterò autonomamente'
                  : 'No, I will rent a car / arrange my own transportation'}
              </strong>
              <span className="text-[#73685E]">
                {isEs
                  ? 'Los venues disponen de estacionamiento privado para invitados.'
                  : isIt
                  ? 'Le location dispongono di parcheggio privato per gli ospiti.'
                  : 'All celebration venues offer private parking for guests.'}
              </span>
            </div>
          </label>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 pt-2">
        <button
          type="button"
          onClick={onNext}
          id="btn-extras-next"
          className="w-full py-4 px-6 rounded-full bg-[#BD532E] hover:bg-[#A34423] active:scale-[0.98] text-white text-xs sm:text-sm font-semibold tracking-[0.14em] uppercase shadow-[0_8px_24px_rgba(189,83,46,0.28)] flex items-center justify-center gap-3 transition-all duration-200 cursor-pointer group"
        >
          <span>{isEs ? 'MÚSICA PARA LA FIESTA' : isIt ? 'MUSICA PER LA FESTA' : 'PARTY MUSIC & PLAYLIST'}</span>
          <ArrowRight className="w-4 h-4 text-white/90 group-hover:translate-x-1 transition-transform" />
        </button>

        <button
          type="button"
          onClick={onPrev}
          id="btn-extras-prev"
          className="w-full py-3.5 px-6 rounded-full bg-transparent hover:bg-[#F2ECE1] active:scale-[0.98] text-[#554A41] text-xs font-semibold tracking-[0.12em] uppercase border border-[#DFD5C7] flex items-center justify-center gap-2.5 transition-all duration-200 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{isEs ? 'VOLVER A DÍA 3' : isIt ? 'TORNA A GIORNO 3' : 'BACK TO DAY 3'}</span>
        </button>
      </div>

      {/* Dotted pagination indicator */}
      <div className="flex items-center justify-center gap-2 pt-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#BD532E]" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#BD532E]" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#BD532E]" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#BD532E]" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#D5C7B8]" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#D5C7B8]" />
      </div>
    </div>
  );
};
