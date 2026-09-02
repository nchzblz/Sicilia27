import React, { useState } from 'react';
import { Language } from '../types';
import { TRAVEL_GUIDE_DATA } from '../data/eventData';
import {
  ArrowRight,
  Globe,
  Plane,
  Car,
  Info,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DestinationViewProps {
  language: Language;
  onProceedToRsvp: () => void;
}

type TabId = 'noto' | 'trips' | 'europe' | 'logistics';

export const DestinationView: React.FC<DestinationViewProps> = ({
  language,
  onProceedToRsvp,
}) => {
  const isEs = language === 'es';
  const isIt = language === 'it';
  const guide = isEs ? TRAVEL_GUIDE_DATA.es : TRAVEL_GUIDE_DATA.en;
  const [activeTab, setActiveTab] = useState<TabId>('noto');

  const sectionNoto = guide.sections.find((s) => s.id === 'noto_surroundings');
  const sectionTrips = guide.sections.find((s) => s.id === 'sicily_roadtrips');
  const sectionEurope = guide.sections.find((s) => s.id === 'europe_fyi');
  const sectionLogistics = guide.sections.find((s) => s.id === 'logistics_airports');

  const handleNextTab = () => {
    if (activeTab === 'noto') {
      setActiveTab('trips');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (activeTab === 'trips') {
      setActiveTab('europe');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (activeTab === 'europe') {
      setActiveTab('logistics');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onProceedToRsvp();
    }
  };

  const getNextButtonText = () => {
    if (activeTab === 'noto') {
      return isEs ? 'CONTINUAR A SICILIA' : isIt ? 'CONTINUA A SICILIA' : 'CONTINUE TO SICILY';
    }
    if (activeTab === 'trips') {
      return isEs ? 'CONTINUAR A EUROPA' : isIt ? 'CONTINUA A EUROPA' : 'CONTINUE TO EUROPE';
    }
    if (activeTab === 'europe') {
      return isEs ? 'CONTINUAR A VIAJE & VUELOS' : isIt ? 'CONTINUA A VIAGGIO' : 'CONTINUE TO TRAVEL & FLIGHTS';
    }
    return isEs ? 'COMENZAR CONFIRMACIÓN DE RSVP' : isIt ? 'INIZIA CONFERMA RSVP' : 'START RSVP CONFIRMATION';
  };

  return (
    <div className="pb-16 pt-3 px-3 sm:px-5 max-w-lg mx-auto space-y-6 text-left selection:bg-[#BD532E] selection:text-white">
      {/* 1. Main Visual Header with Hero Banner */}
      <div className="bg-white/95 rounded-3xl overflow-hidden border border-[#EFE8DE] shadow-[0_6px_24px_rgba(43,30,22,0.04)]">
        {/* Cover Photo Banner */}
        <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-[#2B1E16]">
          <img
            src={
              guide.hero.coverImage ||
              'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1200&auto=format&fit=crop'
            }
            alt="Sicily & Noto"
            className="w-full h-full object-cover object-center opacity-85 hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent flex flex-col justify-end p-5 sm:p-6 text-white">
            <h1 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug drop-shadow-sm">
              {guide.hero.title}
            </h1>
          </div>
        </div>

        {/* Subtitle & Tab Navigation */}
        <div className="p-4 sm:p-5 space-y-4">
          <p className="text-xs sm:text-[13px] text-[#5A524A] leading-relaxed">
            {guide.hero.subtitle}
          </p>

          {/* Tab Selector */}
          <div className="grid grid-cols-4 gap-1 p-1 bg-[#FAF8F5] rounded-full border border-[#EAE2D5] text-[11px] sm:text-xs font-bold">
            <button
              type="button"
              onClick={() => {
                setActiveTab('noto');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`py-2 rounded-full transition-all text-center cursor-pointer ${
                activeTab === 'noto'
                  ? 'bg-[#BD532E] text-white shadow-sm'
                  : 'text-[#73685E] hover:text-[#1C1917]'
              }`}
            >
              Noto
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('trips');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`py-2 rounded-full transition-all text-center cursor-pointer ${
                activeTab === 'trips'
                  ? 'bg-[#5B6842] text-white shadow-sm'
                  : 'text-[#73685E] hover:text-[#1C1917]'
              }`}
            >
              Sicilia
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('europe');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`py-2 rounded-full transition-all text-center cursor-pointer ${
                activeTab === 'europe'
                  ? 'bg-[#C99824] text-white shadow-sm'
                  : 'text-[#73685E] hover:text-[#1C1917]'
              }`}
            >
              Europa
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('logistics');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`py-2 rounded-full transition-all text-center cursor-pointer ${
                activeTab === 'logistics'
                  ? 'bg-[#5C7F92] text-white shadow-sm'
                  : 'text-[#73685E] hover:text-[#1C1917]'
              }`}
            >
              {isEs ? 'Viaje' : 'Travel'}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* Tab 1: Noto */}
        {activeTab === 'noto' && sectionNoto && (
          <motion.div
            key="tab-noto"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-5"
          >
            {sectionNoto.items.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white/95 rounded-3xl overflow-hidden border border-[#EFE8DE] shadow-[0_4px_20px_rgba(43,30,22,0.03)] hover:shadow-md transition-all duration-300"
              >
                {item.imageUrl && (
                  <div className="relative h-44 w-full overflow-hidden bg-[#241A13]">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 right-3">
                      <span className="text-[10px] px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white font-bold tracking-wide border border-white/20">
                        {item.badge}
                      </span>
                    </div>
                  </div>
                )}

                <div className="p-5 space-y-2.5">
                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#1C1917] leading-snug">
                    {item.name}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-[#554A41] leading-relaxed">
                    {item.desc}
                  </p>

                  <div className="pt-2.5 border-t border-[#F0EBE2] flex items-start gap-2 text-xs text-[#BD532E] font-medium bg-[#FAF8F5] p-3 rounded-2xl">
                    <Info className="w-4 h-4 shrink-0 mt-0.5 text-[#BD532E]" />
                    <span className="leading-snug">{item.tips}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Tab 2: Road Trips */}
        {activeTab === 'trips' && sectionTrips && (
          <motion.div
            key="tab-trips"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-5"
          >
            {sectionTrips.items.map((trip, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white/95 rounded-3xl overflow-hidden border border-[#EFE8DE] shadow-[0_4px_20px_rgba(43,30,22,0.03)] hover:shadow-md transition-all duration-300"
              >
                {trip.imageUrl && (
                  <div className="relative h-44 w-full overflow-hidden bg-[#241A13]">
                    <img
                      src={trip.imageUrl}
                      alt={trip.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 right-3 flex items-center gap-1.5">
                      <span className="text-[10px] px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white font-bold tracking-wide border border-white/20">
                        {trip.badge}
                      </span>
                    </div>
                  </div>
                )}

                <div className="p-5 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-base sm:text-lg font-bold text-[#1C1917]">
                      {trip.name}
                    </h3>
                    <Car className="w-4 h-4 text-[#5B6842] shrink-0" />
                  </div>
                  <p className="text-xs sm:text-[13px] text-[#554A41] leading-relaxed">
                    {trip.desc}
                  </p>
                  <div className="pt-2.5 border-t border-[#F0EBE2] flex items-start gap-2 text-xs text-[#5B6842] font-medium bg-[#FAF8F5] p-3 rounded-2xl">
                    <Info className="w-4 h-4 text-[#5B6842] shrink-0 mt-0.5" />
                    <span className="leading-snug">{trip.tips}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Tab 3: Europe */}
        {activeTab === 'europe' && sectionEurope && (
          <motion.div
            key="tab-europe"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-5"
          >
            {sectionEurope.items.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white/95 rounded-3xl overflow-hidden border border-[#EFE8DE] shadow-[0_4px_20px_rgba(43,30,22,0.03)] hover:shadow-md transition-all duration-300"
              >
                {item.imageUrl && (
                  <div className="relative h-44 w-full overflow-hidden bg-[#241A13]">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 right-3">
                      <span className="text-[10px] px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white font-bold tracking-wide border border-white/20">
                        {item.badge}
                      </span>
                    </div>
                  </div>
                )}

                <div className="p-5 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-base sm:text-lg font-bold text-[#1C1917]">
                      {item.name}
                    </h3>
                    <Globe className="w-4 h-4 text-[#5C7F92] shrink-0" />
                  </div>
                  <p className="text-xs sm:text-[13px] text-[#554A41] leading-relaxed">
                    {item.desc}
                  </p>
                  <div className="pt-2.5 border-t border-[#F0EBE2] flex items-start gap-2 text-xs text-[#BD532E] font-medium bg-[#FAF8F5] p-3 rounded-2xl">
                    <Info className="w-4 h-4 shrink-0 mt-0.5 text-[#BD532E]" />
                    <span className="leading-snug">{item.tips}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Tab 4: Logistics */}
        {activeTab === 'logistics' && sectionLogistics && (
          <motion.div
            key="tab-logistics"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-5"
          >
            {sectionLogistics.items.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white/95 rounded-3xl overflow-hidden border border-[#EFE8DE] shadow-[0_4px_20px_rgba(43,30,22,0.03)] hover:shadow-md transition-all duration-300"
              >
                {item.imageUrl && (
                  <div className="relative h-44 w-full overflow-hidden bg-[#241A13]">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 right-3">
                      <span className="text-[10px] px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white font-bold tracking-wide border border-white/20">
                        {item.badge}
                      </span>
                    </div>
                  </div>
                )}

                <div className="p-5 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-base sm:text-lg font-bold text-[#1C1917]">
                      {item.name}
                    </h3>
                    <Plane className="w-4 h-4 text-[#BD532E] shrink-0" />
                  </div>
                  <p className="text-xs sm:text-[13px] text-[#554A41] leading-relaxed whitespace-pre-line">
                    {item.desc}
                  </p>
                  <div className="pt-2.5 border-t border-[#F0EBE2] flex items-start gap-2 text-xs text-[#554A41] font-medium bg-[#FAF8F5] p-3 rounded-2xl">
                    <Info className="w-4 h-4 text-[#5C7F92] shrink-0 mt-0.5" />
                    <span className="leading-snug">{item.tips}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action CTA to proceed sequentially */}
      <div className="pt-2 space-y-3">
        <button
          type="button"
          onClick={handleNextTab}
          id="btn-guide-next-step"
          className="w-full py-4 px-6 rounded-full bg-[#BD532E] hover:bg-[#A34423] active:scale-[0.98] text-white text-xs sm:text-sm font-bold tracking-[0.14em] uppercase shadow-[0_8px_24px_rgba(189,83,46,0.28)] flex items-center justify-center gap-3 transition-all duration-200 cursor-pointer group"
        >
          <span>{getNextButtonText()}</span>
          <ArrowRight className="w-4 h-4 text-white/90 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
