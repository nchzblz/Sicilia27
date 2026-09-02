import React, { useState } from 'react';
import { Language, SongItem } from '../types';
import { SPOTIFY_SEARCH_CATALOG } from '../data/eventData';
import {
  Trash2,
  Search,
  Disc3,
  Check,
  Heart,
  ArrowRight,
  ArrowLeft,
  Plus,
} from 'lucide-react';
import { motion } from 'motion/react';

interface SpotifyWidgetProps {
  songs: SongItem[];
  personalMessage: string;
  guestName: string;
  language: Language;
  onUpdateSongs: (songs: SongItem[]) => void;
  onUpdatePersonalMessage: (message: string) => void;
  onNext: () => void;
  onPrev: () => void;
}

// Official Spotify Brand SVG Logo
function SpotifyLogo({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.507 17.307a.753.753 0 01-1.036.249c-2.833-1.731-6.4-2.124-10.601-1.164a.75.75 0 11-.334-1.462c4.606-1.05 8.57-.604 11.722 1.341.345.212.457.664.249 1.036zm1.47-3.266a.939.939 0 01-1.293.309c-3.242-1.993-8.185-2.57-12.02-1.405a.94.94 0 11-.548-1.797c4.383-1.33 9.83-.687 13.552 1.6a.938.938 0 01.309 1.293zm.126-3.411c-3.888-2.309-10.298-2.522-14.01-1.394a1.125 1.125 0 11-.652-2.154c4.267-1.295 11.353-1.05 15.82 1.603a1.125 1.125 0 01-1.158 1.945z" />
    </svg>
  );
}

export const SpotifyWidget: React.FC<SpotifyWidgetProps> = ({
  songs,
  personalMessage,
  guestName,
  language,
  onUpdateSongs,
  onUpdatePersonalMessage,
  onNext,
  onPrev,
}) => {
  const isEs = language === 'es';
  const isIt = language === 'it';
  const [searchQuery, setSearchQuery] = useState('');
  const [customTitle, setCustomTitle] = useState('');
  const [customArtist, setCustomArtist] = useState('');

  // Filter Spotify search catalog based on query
  const searchResults = SPOTIFY_SEARCH_CATALOG.filter((item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.artist.toLowerCase().includes(q) ||
      (item.albumName && item.albumName.toLowerCase().includes(q)) ||
      (item.genre && item.genre.toLowerCase().includes(q))
    );
  });

  const handleAddSong = (song: SongItem) => {
    if (songs.length >= 3) return;
    if (songs.some((s) => s.title.toLowerCase() === song.title.toLowerCase())) return;

    const newSong: SongItem = {
      ...song,
      id: `user-track-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
      addedBy: guestName,
    };
    onUpdateSongs([...songs, newSong]);
  };

  const handleAddCustomTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTitle.trim() || songs.length >= 3) return;

    const newSong: SongItem = {
      id: `custom-track-${Date.now()}`,
      title: customTitle.trim(),
      artist: customArtist.trim() || (isEs ? 'Artista Sugerido' : 'Suggested Artist'),
      albumName: isEs ? 'Sugerencia de Invitado' : 'Guest Suggestion',
      albumArt:
        'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=300&auto=format&fit=crop',
      addedBy: guestName,
      duration: '3:30',
    };

    onUpdateSongs([...songs, newSong]);
    setCustomTitle('');
    setCustomArtist('');
  };

  const handleRemoveSong = (id: string) => {
    onUpdateSongs(songs.filter((s) => s.id !== id));
  };

  return (
    <div className="w-full max-w-full pb-14 pt-3 px-3 sm:px-5 space-y-4 text-left box-border selection:bg-[#1DB954] selection:text-black">
      {/* 1. Main Spotify Container (Authentic Spotify Dark/Green Theme) */}
      <div className="w-full bg-[#121212] text-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-[#282828] shadow-[0_12px_32px_rgba(0,0,0,0.35)] space-y-3.5 box-border overflow-hidden">
        {/* Top Header with Spotify Logo Badge & Counter */}
        <div className="flex items-center justify-between gap-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1DB954]/15 text-[#1DB954] text-xs font-bold tracking-wider border border-[#1DB954]/30 shrink-0">
            <SpotifyLogo className="w-4 h-4 text-[#1DB954]" />
            <span>Spotify</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] sm:text-xs text-[#B3B3B3] font-medium bg-[#1F1F1F] px-2.5 py-1 rounded-full border border-[#2E2E2E] shrink-0">
            <span className="font-mono text-[#1DB954] font-bold">{songs.length}/3</span>
            <span>{isEs ? 'elegidas' : isIt ? 'scelte' : 'selected'}</span>
          </div>
        </div>

        <div>
          <h1 className="font-sans text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
            {isEs ? 'Elige Canciones para la Boda' : isIt ? 'Scegli i Brani per il Matrimonio' : 'Choose Wedding Songs'}
          </h1>
          <p className="text-xs text-[#A7A7A7] mt-1 leading-relaxed">
            {isEs
              ? 'Busca en el catálogo de Spotify hasta 3 temas para la fiesta. Se enviarán a Mariana & Lukas para la playlist oficial.'
              : isIt
              ? 'Cerca nel catalogo Spotify fino a 3 brani per la festa. Saranno inviati a Mariana & Lukas.'
              : 'Search and select up to 3 songs from the Spotify catalog. Your picks will be sent to the couple.'}
          </p>
        </div>

        {/* Selected Tracks Box */}
        <div className="pt-1">
          <div className="flex items-center justify-between pb-2 border-b border-[#282828] mb-2">
            <span className="text-[11px] sm:text-xs font-bold text-[#E5E5E5] uppercase tracking-wider flex items-center gap-1.5">
              <Disc3 className="w-3.5 h-3.5 text-[#1DB954]" />
              {isEs ? 'Tus Selecciones' : isIt ? 'Le Tue Selezioni' : 'Your Picks'}
            </span>
            <span className="text-[11px] text-[#8C8C8C]">
              {3 - songs.length} {isEs ? 'cupos restantes' : isIt ? 'rimanenti' : 'slots left'}
            </span>
          </div>

          {songs.length === 0 ? (
            <div className="py-5 px-3 rounded-xl border border-dashed border-[#2E2E2E] bg-[#181818] text-center">
              <Disc3 className="w-6 h-6 text-[#1DB954] mx-auto mb-1.5 opacity-90 animate-pulse" />
              <p className="text-xs font-semibold text-[#E5E5E5]">
                {isEs ? 'Ninguna canción seleccionada todavía' : isIt ? 'Nessun brano selezionato' : 'No tracks selected yet'}
              </p>
              <p className="text-[11px] text-[#8C8C8C] mt-0.5">
                {isEs
                  ? 'Usa el buscador de abajo para encontrar y añadir tus canciones'
                  : isIt
                  ? 'Usa la ricerca per trovare e aggiungere i tuoi brani'
                  : 'Use the search box below to find and add songs'}
              </p>
            </div>
          ) : (
            <div className="space-y-1.5">
              {songs.map((song, index) => (
                <motion.div
                  key={song.id}
                  initial={{ opacity: 0, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between p-2 rounded-xl bg-[#181818] border border-[#282828] hover:bg-[#202020] transition group"
                >
                  <div className="flex items-center gap-2.5 min-w-0 pr-2">
                    <img
                      src={
                        song.albumArt ||
                        'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=300&auto=format&fit=crop'
                      }
                      alt={song.title}
                      className="w-10 h-10 rounded-lg object-cover shrink-0 shadow-sm"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono font-bold text-[#1DB954]">
                          #{index + 1}
                        </span>
                        <p className="text-xs font-semibold text-white truncate">
                          {song.title}
                        </p>
                      </div>
                      <p className="text-[11px] text-[#A7A7A7] truncate">
                        {song.artist}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemoveSong(song.id)}
                    className="p-1.5 text-[#737373] hover:text-[#FF5555] rounded-lg hover:bg-white/5 transition shrink-0 cursor-pointer"
                    title={isEs ? 'Quitar canción' : 'Remove song'}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Spotify Search Bar & Catalog (if < 3 songs) */}
        {songs.length < 3 ? (
          <div className="pt-1 space-y-2.5">
            <div className="relative">
              <Search className="w-4 h-4 text-[#8C8C8C] absolute left-3 top-2.5" />
              <input
                type="text"
                id="input-spotify-search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  isEs
                    ? 'Buscar canción o artista...'
                    : isIt
                    ? 'Cerca brano o artista...'
                    : 'Search song or artist...'
                }
                className="w-full pl-9 pr-3 py-2 rounded-full border border-[#333333] bg-[#242424] text-xs text-white placeholder-[#8C8C8C] focus:outline-none focus:ring-1.5 focus:ring-[#1DB954] focus:border-[#1DB954] transition-all box-border"
              />
            </div>

            {/* Spotify Catalog List */}
            <div className="space-y-1 max-h-48 overflow-y-auto pr-0.5">
              {searchResults.map((item) => {
                const alreadyAdded = songs.some(
                  (s) => s.title.toLowerCase() === item.title.toLowerCase()
                );

                return (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-1.5 rounded-lg bg-[#181818] hover:bg-[#222222] transition border border-[#262626]"
                  >
                    <div className="flex items-center gap-2 min-w-0 pr-2">
                      <img
                        src={
                          item.albumArt ||
                          'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=300&auto=format&fit=crop'
                        }
                        alt={item.title}
                        className="w-8 h-8 rounded-md object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-white truncate">
                          {item.title}
                        </p>
                        <p className="text-[10.5px] text-[#A7A7A7] truncate">
                          {item.artist}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleAddSong(item)}
                      disabled={alreadyAdded}
                      className={`py-1 px-2.5 rounded-full text-[10.5px] font-bold flex items-center gap-1 shrink-0 transition cursor-pointer ${
                        alreadyAdded
                          ? 'bg-[#282828] text-[#1DB954] cursor-default'
                          : 'bg-[#1DB954] hover:bg-[#1ed760] active:scale-95 text-black shadow-sm'
                      }`}
                    >
                      {alreadyAdded ? (
                        <>
                          <Check className="w-3 h-3 stroke-[3]" />
                          <span>{isEs ? 'Elegida' : isIt ? 'Scelta' : 'Selected'}</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3 h-3 stroke-[2.5]" />
                          <span>{isEs ? 'Elegir' : isIt ? 'Scegli' : 'Select'}</span>
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Manual fallback option */}
            <div className="pt-2 border-t border-[#262626]">
              <p className="text-[10.5px] text-[#8C8C8C] mb-1.5">
                {isEs ? '¿No la encuentras? Escríbela:' : isIt ? 'Non la trovi? Scrivila qui:' : 'Can’t find it? Type here:'}
              </p>
              <form onSubmit={handleAddCustomTrack} className="space-y-1.5">
                <div className="grid grid-cols-2 gap-1.5">
                  <input
                    type="text"
                    placeholder={isEs ? 'Título' : isIt ? 'Titolo' : 'Title'}
                    value={customTitle}
                    onChange={(e) => setCustomTitle(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-[#333333] bg-[#242424] text-xs text-white placeholder-[#737373] focus:outline-none focus:border-[#1DB954] box-border"
                  />
                  <input
                    type="text"
                    placeholder={isEs ? 'Artista' : isIt ? 'Artista' : 'Artist'}
                    value={customArtist}
                    onChange={(e) => setCustomArtist(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-[#333333] bg-[#242424] text-xs text-white placeholder-[#737373] focus:outline-none focus:border-[#1DB954] box-border"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!customTitle.trim()}
                  className="w-full py-1.5 px-3 rounded-full bg-[#242424] hover:bg-[#2C2C2C] disabled:opacity-40 text-[#1DB954] text-xs font-bold border border-[#333333] transition flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3 h-3" />
                  <span>{isEs ? 'Añadir sugerencia' : isIt ? 'Aggiungi suggerimento' : 'Add custom song'}</span>
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="p-3 rounded-xl bg-[#181818] border border-[#1DB954]/40 text-center text-xs text-[#1DB954] font-semibold flex items-center justify-center gap-2">
            <Check className="w-4 h-4 stroke-[3]" />
            <span>{isEs ? '¡Has completado tus 3 canciones!' : isIt ? 'Hai completato i tuoi 3 brani!' : 'All 3 tracks chosen!'}</span>
          </div>
        )}
      </div>

      {/* 2. Personal Message for Mariana & Lukas (Warm Card) */}
      <div className="w-full bg-white/95 rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-[#EFE8DE] shadow-[0_4px_20px_rgba(43,30,22,0.03)] space-y-2.5 box-border overflow-hidden">
        <div className="flex items-center gap-2 border-b border-[#F0EBE2] pb-2">
          <Heart className="w-4 h-4 text-[#BD532E]" />
          <h2 className="font-serif text-base sm:text-lg font-medium text-[#1C1917]">
            {isEs ? 'Mensaje para Mariana & Lukas' : isIt ? 'Messaggio per Mariana & Lukas' : 'Message for Mariana & Lukas'}
          </h2>
        </div>

        <p className="text-xs text-[#73685E]">
          {isEs
            ? 'Dedica unas palabras o un deseo especial para sus 10 años juntos:'
            : isIt
            ? 'Lascia un messaggio o un augurio speciale per i loro 10 anni insieme:'
            : 'Leave a heartfelt message for Mariana & Lukas:'}
        </p>

        <textarea
          id="textarea-personal-message"
          rows={3}
          value={personalMessage}
          onChange={(e) => onUpdatePersonalMessage(e.target.value)}
          placeholder={
            isEs
              ? 'Escribe tu mensaje para Mariana & Lukas...'
              : isIt
              ? 'Scrivi il tuo messaggio per Mariana & Lukas...'
              : 'Write your message for Mariana & Lukas...'
          }
          className="w-full px-3.5 py-2.5 rounded-xl border border-[#DFD5C7] bg-[#FAF8F5] text-xs sm:text-sm text-[#1C1917] focus:outline-none focus:ring-1.5 focus:ring-[#BD532E]/30 focus:border-[#BD532E] transition-all resize-none box-border"
        />
      </div>

      {/* 3. Navigation Action Buttons */}
      <div className="w-full space-y-2 pt-1">
        <button
          type="button"
          onClick={onNext}
          id="btn-songs-next"
          className="w-full py-3.5 sm:py-4 px-5 rounded-full bg-[#BD532E] hover:bg-[#A34423] active:scale-[0.98] text-white text-xs sm:text-sm font-semibold tracking-[0.14em] uppercase shadow-[0_8px_24px_rgba(189,83,46,0.28)] flex items-center justify-center gap-2.5 transition-all duration-200 cursor-pointer group box-border"
        >
          <span>{isEs ? 'ENVIAR CANCIONES & CONTINUAR' : isIt ? 'INVIA BRANI & CONTINUA' : 'SUBMIT SONGS & CONTINUE'}</span>
          <ArrowRight className="w-4 h-4 text-white/90 group-hover:translate-x-1 transition-transform" />
        </button>

        <button
          type="button"
          onClick={onPrev}
          id="btn-songs-prev"
          className="w-full py-3 px-5 rounded-full bg-transparent hover:bg-[#F2ECE1] active:scale-[0.98] text-[#554A41] text-xs font-semibold tracking-[0.12em] uppercase border border-[#DFD5C7] flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer box-border"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{isEs ? 'VOLVER' : isIt ? 'TORNA INDIETRO' : 'GO BACK'}</span>
        </button>
      </div>
    </div>
  );
};
