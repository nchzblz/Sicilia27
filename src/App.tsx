/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { GuestProfile, Language, RsvpState, ScreenId, SongItem } from './types';
import { GUEST_PROFILES, VENUES_DATA, SEED_SONGS } from './data/eventData';
import { SicilianHeader } from './components/SicilianHeader';
import { WhatsAppPreviewCard } from './components/WhatsAppPreviewCard';
import { IntroZoomView } from './components/IntroZoomView';
import { OverviewScheduleView } from './components/OverviewScheduleView';
import { DestinationView } from './components/DestinationView';
import { DayRsvpCard } from './components/DayRsvpCard';
import { ExtrasForm } from './components/ExtrasForm';
import { SpotifyWidget } from './components/SpotifyWidget';
import { ReviewSummaryView } from './components/ReviewSummaryView';
import { PassKeepsakeView } from './components/PassKeepsakeView';
import { OfflineIndicator } from './components/OfflineIndicator';

export default function App() {
  // Check URL query parameters for guest token
  const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const tokenParam = urlParams?.get('token') || urlParams?.get('t') || urlParams?.get('guest');

  const initialGuest = tokenParam
    ? GUEST_PROFILES.find(
        (g) =>
          g.token.toLowerCase() === tokenParam.toLowerCase() ||
          g.primaryName.toLowerCase().includes(tokenParam.toLowerCase())
      ) || GUEST_PROFILES[0]
    : GUEST_PROFILES[0];

  // Active guest profile and automated language
  const [currentGuest, setCurrentGuest] = useState<GuestProfile>(initialGuest);
  const [language, setLanguage] = useState<Language>(initialGuest.language);

  // Screen navigation state
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('intro');
  const [history, setHistory] = useState<ScreenId[]>(['token_entry']);

  // Core RSVP state
  const [rsvpState, setRsvpState] = useState<RsvpState>({
    guestToken: initialGuest.token,
    guestName: initialGuest.primaryName,
    language: initialGuest.language,
    day1: { attending: true, companionAttending: initialGuest.hasCompanionInvite },
    day2: { attending: true, companionAttending: initialGuest.hasCompanionInvite },
    day3: { attending: true, companionAttending: initialGuest.hasCompanionInvite },
    companionName: initialGuest.defaultCompanionName || '',
    guestDietaryInput: '',
    companionDietaryInput: '',
    needsShuttle: true,
    songs: [SEED_SONGS[2]],
    personalMessage: '',
    isSubmitted: false,
  });

  // Switch guest profile
  const handleSelectGuest = (token: string) => {
    const selected = GUEST_PROFILES.find((g) => g.token === token) || GUEST_PROFILES[0];
    setCurrentGuest(selected);
    setLanguage(selected.language);
    setRsvpState((prev) => ({
      ...prev,
      guestToken: selected.token,
      guestName: selected.primaryName,
      language: selected.language,
      companionName: selected.defaultCompanionName || '',
      day1: { attending: true, companionAttending: selected.hasCompanionInvite },
      day2: { attending: true, companionAttending: selected.hasCompanionInvite },
      day3: { attending: true, companionAttending: selected.hasCompanionInvite },
      isSubmitted: false,
    }));
    setCurrentScreen('intro');
    setHistory(['token_entry']);
  };

  // Navigation handlers
  const navigateTo = (screen: ScreenId) => {
    setHistory((prev) => [...prev, currentScreen]);
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    if (history.length > 0) {
      const prev = history[history.length - 1];
      setHistory((h) => h.slice(0, -1));
      setCurrentScreen(prev);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Partial RSVP updater
  const handleUpdateRsvp = (partial: Partial<RsvpState>) => {
    setRsvpState((prev) => ({ ...prev, ...partial }));
  };

  // Submit RSVP handler
  const handleSubmitRsvp = () => {
    setRsvpState((prev) => ({
      ...prev,
      isSubmitted: true,
      submittedAt: new Date().toISOString(),
    }));
    navigateTo('submitted');
  };

  // Render current screen component
  const renderScreen = () => {
    const venues = VENUES_DATA;

    switch (currentScreen) {
      case 'token_entry':
        return (
          <WhatsAppPreviewCard
            guest={currentGuest}
            language={language}
            onOpenInvitation={() => navigateTo('intro')}
            onSwitchGuest={handleSelectGuest}
            allGuests={GUEST_PROFILES}
          />
        );

      case 'intro':
        return (
          <IntroZoomView
            onStartRsvp={() => navigateTo('schedule_overview')}
          />
        );

      case 'schedule_overview':
        return (
          <OverviewScheduleView
            guest={currentGuest}
            language={language}
            onProceedToDay1={() => navigateTo('day1')}
            onBackToIntro={() => navigateTo('intro')}
          />
        );

      case 'destination':
      case 'guide':
        return (
          <DestinationView
            language={language}
            onProceedToRsvp={() => navigateTo('day1')}
          />
        );

      case 'day1':
        return (
          <DayRsvpCard
            dayNumber={1}
            venue={venues[1][language]}
            attendance={rsvpState.day1}
            guest={currentGuest}
            language={language}
            onUpdateAttendance={(day1) => handleUpdateRsvp({ day1 })}
            onNext={() => navigateTo('day2')}
            onPrev={handleBack}
            isFirstDay
          />
        );

      case 'day2':
        return (
          <DayRsvpCard
            dayNumber={2}
            venue={venues[2][language]}
            attendance={rsvpState.day2}
            guest={currentGuest}
            language={language}
            onUpdateAttendance={(day2) => handleUpdateRsvp({ day2 })}
            onNext={() => navigateTo('day3')}
            onPrev={handleBack}
          />
        );

      case 'day3':
        return (
          <DayRsvpCard
            dayNumber={3}
            venue={venues[3][language]}
            attendance={rsvpState.day3}
            guest={currentGuest}
            language={language}
            onUpdateAttendance={(day3) => handleUpdateRsvp({ day3 })}
            onNext={() => navigateTo('extras')}
            onPrev={handleBack}
            isLastDay
          />
        );

      case 'extras':
        return (
          <ExtrasForm
            rsvpState={rsvpState}
            guest={currentGuest}
            language={language}
            onUpdate={handleUpdateRsvp}
            onNext={() => {
              const hasAttendance =
                rsvpState.day1.attending ||
                rsvpState.day2.attending ||
                rsvpState.day3.attending;
              if (hasAttendance) {
                navigateTo('songs');
              } else {
                navigateTo('review');
              }
            }}
            onPrev={handleBack}
          />
        );

      case 'songs':
        return (
          <SpotifyWidget
            songs={rsvpState.songs}
            personalMessage={rsvpState.personalMessage}
            guestName={currentGuest.primaryName}
            language={language}
            onUpdateSongs={(songs: SongItem[]) => handleUpdateRsvp({ songs })}
            onUpdatePersonalMessage={(personalMessage: string) =>
              handleUpdateRsvp({ personalMessage })
            }
            onNext={() => navigateTo('review')}
            onPrev={handleBack}
          />
        );

      case 'review':
        return (
          <ReviewSummaryView
            rsvpState={rsvpState}
            guest={currentGuest}
            language={language}
            onNavigateToScreen={navigateTo}
            onSubmitRsvp={handleSubmitRsvp}
            onPrev={handleBack}
          />
        );

      case 'submitted':
        return (
          <PassKeepsakeView
            rsvpState={rsvpState}
            guest={currentGuest}
            language={language}
            onViewGuide={() => navigateTo('destination')}
            onViewSongs={() => navigateTo('songs')}
            onResetForDemo={() => {
              handleUpdateRsvp({ isSubmitted: false });
              navigateTo('intro');
            }}
          />
        );

      default:
        return null;
    }
  };

  // If currently on intro splash screen, render full-page cinematic intro directly
  if (currentScreen === 'intro') {
    return (
      <IntroZoomView
        onStartRsvp={() => navigateTo('schedule_overview')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1917] flex flex-col font-sans selection:bg-[#BD532E] selection:text-white">
      {/* Main Guest Container */}
      <main className="flex-1 flex flex-col items-center justify-start sm:justify-center p-0 sm:p-4 lg:p-6 w-full">
        <div className="relative w-full max-w-lg min-h-screen sm:min-h-[760px] sm:max-h-[min(900px,calc(100vh-40px))] bg-[#FAF8F5] rounded-none sm:rounded-3xl sm:border sm:border-[#EFE8DE] sm:shadow-[0_12px_40px_rgba(43,30,22,0.06)] overflow-hidden flex flex-col my-0 sm:my-auto transition-all duration-300">
          {/* In-app Navigation Header with Official Wedding Logo */}
          <SicilianHeader
            currentScreen={currentScreen}
            language={language}
            onNavigate={navigateTo}
            onBack={handleBack}
            canGoBack={history.length > 0}
            guestName={currentGuest.primaryName}
          />

          {/* Screen Content Viewport with Motion Transition */}
          <div className="flex-1 overflow-y-auto bg-[#FAF8F5] overscroll-contain">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentScreen}-${language}-${currentGuest.token}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                className="min-h-full flex-1 flex flex-col"
              >
                {renderScreen()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
      <OfflineIndicator />
    </div>
  );
}
