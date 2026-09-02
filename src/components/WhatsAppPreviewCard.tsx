import React from 'react';
import { GuestProfile, Language } from '../types';
import { ArrowRight, MessageCircle, ShieldCheck } from 'lucide-react';
import { WeddingLogo } from './WeddingLogo';

interface WhatsAppPreviewCardProps {
  guest: GuestProfile;
  language: Language;
  onOpenInvitation: () => void;
  onSwitchGuest: (token: string) => void;
  allGuests: GuestProfile[];
}

export const WhatsAppPreviewCard: React.FC<WhatsAppPreviewCardProps> = ({
  guest,
  language,
  onOpenInvitation,
  onSwitchGuest,
  allGuests,
}) => {
  const isEs = language === 'es';

  return (
    <div className="min-h-[80vh] flex flex-col justify-center px-4 py-6 text-left">
      {/* Context Badge */}
      <div className="mb-4 text-center">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E5ECE0] text-[#445228] text-xs font-medium border border-[#CCD8C4]">
          <MessageCircle className="w-3.5 h-3.5" />
          {isEs ? 'Paso 0: Simulación Link WhatsApp' : 'Step 0: WhatsApp Link Preview'}
        </span>
        <p className="text-xs text-[#7A6E65] mt-1.5 max-w-xs mx-auto">
          {isEs
            ? 'Así recibe cada invitado su enlace único e intransferible por WhatsApp.'
            : 'How each guest receives their unique, personalized WhatsApp invite link.'}
        </p>
      </div>

      {/* Mock WhatsApp Chat Message bubble */}
      <div className="max-w-sm mx-auto w-full bg-[#EFEAE2] p-3.5 rounded-2xl shadow-sm border border-[#DDD5CA]">
        <div className="flex items-center justify-between border-b border-[#D8CEBF] pb-2 mb-3 text-xs text-[#6B5E52]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#BD5D38] text-white flex items-center justify-center font-serif text-xs font-bold">
              M&L
            </div>
            <div>
              <p className="font-semibold text-[#221C18]">Mariana & Lukas</p>
              <p className="text-[10px] text-[#7A6E65]">{isEs ? 'en línea' : 'online'}</p>
            </div>
          </div>
          <span className="text-[10px] text-[#8C7F72]">11:20 AM</span>
        </div>

        {/* The Chat Bubble */}
        <div className="bg-white rounded-2xl rounded-tl-sm p-3.5 shadow-sm border border-[#E2DDD5] space-y-3">
          <p className="text-xs text-[#332B25] leading-relaxed">
            {isEs ? (
              <>
                ¡Hola <strong>{guest.primaryName}</strong>! 🍋❤️ Ya es oficial: cumplimos 10 años
                juntos y lo vamos a celebrar en Sicilia del 28 al 30 de Mayo de 2027. Te dejamos tu
                enlace personal para ver los 3 días y confirmar tu asistencia:
              </>
            ) : (
              <>
                Hello <strong>{guest.primaryName}</strong>! 🍋❤️ It is official: we are celebrating 10
                years together in Sicily from May 28 to 30, 2027. Here is your personal link to view
                the 3-day schedule and RSVP:
              </>
            )}
          </p>

          {/* Rich OG Card Preview */}
          <div
            className="rounded-xl overflow-hidden border border-[#D5CABB] bg-[#FAF7F2] hover:border-[#BD5D38] transition cursor-pointer group"
            onClick={onOpenInvitation}
          >
            <div className="relative py-4 px-3 bg-[#FAF8F5] border-b border-[#EAE2D5] flex flex-col items-center justify-center text-center">
              <WeddingLogo size="sm" />
            </div>

            <div className="p-3 bg-[#FAF6F0]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-semibold text-[#221C18]">
                    {isEs ? 'Invitación Personal de RSVP' : 'Personal RSVP Invitation'}
                  </p>
                  <p className="text-[10px] text-[#7A6E65] truncate font-mono">
                    rsvp.mariana-lukas.com/{guest.token}
                  </p>
                </div>
                <span className="text-[#BD5D38] text-xs flex items-center font-medium group-hover:translate-x-0.5 transition">
                  {isEs ? 'Abrir' : 'Open'} <ArrowRight className="w-3 h-3 ml-1" />
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] text-[#9E9084] pt-1">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-[#5E6C3B]" />
              {isEs ? 'Token único intransferible' : 'Personal secure token'}
            </span>
            <span>✓✓ 11:20 AM</span>
          </div>
        </div>
      </div>

      {/* Main Action Button */}
      <div className="max-w-sm mx-auto w-full mt-5 space-y-3">
        <button
          onClick={onOpenInvitation}
          id="btn-open-invitation"
          className="w-full py-3.5 px-6 rounded-2xl bg-[#BD5D38] hover:bg-[#A34D2D] active:scale-[0.99] text-white font-medium text-sm tracking-wide shadow-md shadow-[#BD5D38]/20 flex items-center justify-center gap-2 transition"
        >
          <span>{isEs ? 'Acceder a la Invitación' : 'Enter Invitation'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        {/* Switch Guest Profile demo helper */}
        <div className="pt-2 border-t border-[#E3D8CE] text-center">
          <p className="text-[11px] uppercase tracking-wider text-[#8A7C70] mb-2 font-medium">
            {isEs ? 'Probar con otro perfil de invitado:' : 'Test with another guest profile:'}
          </p>
          <div className="grid grid-cols-2 gap-1.5 text-left">
            {allGuests.map((g) => (
              <button
                key={g.token}
                onClick={() => onSwitchGuest(g.token)}
                className={`p-2 rounded-xl text-xs border transition ${
                  g.token === guest.token
                    ? 'border-[#5E6C3B] bg-[#EFF3E8] text-[#33421A] font-medium'
                    : 'border-[#DDD4C9] bg-white text-[#554A41] hover:bg-[#F3EDE6]'
                }`}
              >
                <div className="font-semibold truncate">{g.primaryName}</div>
                <div className="text-[10px] text-[#7A6E65]">
                  {g.originCity.split(',')[0]} • {g.language.toUpperCase()}{' '}
                  {g.hasCompanionInvite ? '(+1)' : ''}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
