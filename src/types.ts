export type Language = 'es' | 'en';

export type ScreenId =
  | 'token_entry'
  | 'intro'
  | 'overview'
  | 'schedule_overview'
  | 'day1'
  | 'day2'
  | 'day3'
  | 'extras'
  | 'songs'
  | 'review'
  | 'submitted'
  | 'guide'
  | 'destination';

export interface GuestProfile {
  token: string;
  primaryName: string;
  hasCompanionInvite: boolean;
  defaultCompanionName?: string;
  language: Language;
  phone: string;
  originCity: string;
  relationship: string;
}

export interface DayAttendance {
  attending: boolean;
  companionAttending: boolean;
}

export interface SongItem {
  id: string;
  title: string;
  artist: string;
  albumArt?: string;
  albumName?: string;
  addedBy?: string;
  genre?: string;
  duration?: string;
  year?: string;
}

export interface VenueInfo {
  dayNumber: 1 | 2 | 3;
  dayName: string;
  date: string;
  time: string;
  title: string;
  subtitle: string;
  venueName: string;
  venueType: string;
  location: string;
  mapCoordinates: { lat: number; lng: number };
  accentColor: string;
  accentBg: string;
  accentBorder: string;
  badgeBg: string;
  description: string;
  dressCode: string;
  imageUrl: string;
  highlights: string[];
}

export interface RsvpState {
  guestToken: string;
  guestName: string;
  language: Language;
  day1: DayAttendance;
  day2: DayAttendance;
  day3: DayAttendance;
  companionName: string;
  guestDietaryInput: string;
  companionDietaryInput: string;
  needsShuttle: boolean;
  shuttleLocation: string;
  songs: SongItem[];
  personalMessage: string;
  isSubmitted: boolean;
  submittedAt?: string;
}

