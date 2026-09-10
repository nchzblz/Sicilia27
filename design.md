# Design Document - Mariana & Lukas Wedding App

## Overview
A progressive web app (PWA) for a destination wedding celebration in Noto, Sicily (2027). The app serves as an invitation, RSVP manager, and multi-day event itinerary.

## Purpose & Goals
- **Invite guests** with a beautiful digital invitation
- **Manage RSVPs** and track guest responses
- **Provide itinerary** for multiple wedding events across multiple days
- **Accessible offline** with PWA technology
- **Mobile-first experience** optimized for smartphones and tablets

## Technology Stack

### Frontend Framework
- **React 19** - Modern UI library with latest features
- **TypeScript** - Type-safe development
- **Vite 6** - Fast build tool and dev server
- **Tailwind CSS 4** - Utility-first CSS framework

### Styling & Animation
- **Tailwind CSS 4** - Responsive, utility-based styling
- **Motion (Framer Motion)** - Smooth animations and transitions

### Icons & UI
- **Lucide React** - Icon library for consistent visual design

### PWA & Offline Support
- **Vite PWA Plugin** - Enables progressive web app capabilities
- **Workbox** - Service worker management for offline support
- **Manifest** - App installation and homescreen support

## Architecture

### Project Structure
```
src/
├── components/          # Reusable React components
├── pages/              # Page-level components
├── hooks/              # Custom React hooks
├── utils/              # Helper functions & utilities
├── types/              # TypeScript type definitions
├── styles/             # Global styles
└── App.tsx             # Root component
public/
├── manifest.json       # PWA manifest
└── icons/              # App icons for PWA
dist/                   # Production build output
```

## Core Features

### 1. Wedding Invitation
- Digital invitation with event details
- Beautiful UI showcasing wedding theme
- Guest information and special instructions

### 2. RSVP Management
- Guest response collection (Yes/No/Maybe)
- Dietary preferences and allergies
- Plus-one management
- Real-time response tracking

### 3. Event Itinerary
- Multi-day schedule of events
- Individual event details:
  - Time and location
  - Description and agenda
  - Map integration (optional)
  - Dress code information
  - Contact person/emergency contacts

### 4. Offline Support
- Full app functionality without internet connection
- Service worker for background sync
- Cached data and assets
- Automatic sync when reconnected

## Design Principles

### Visual Design
- **Wedding Theme** - Elegant, romantic aesthetic appropriate for a wedding
- **Sicily Inspiration** - Colors and imagery reflecting Noto's architecture and charm
- **Consistency** - Uniform spacing, typography, and component patterns
- **Accessibility** - WCAG 2.1 compliant with proper contrast and readability

### User Experience
- **Mobile-First** - Optimized for small screens first
- **Responsive** - Adapts seamlessly to tablets and desktops
- **Intuitive Navigation** - Clear paths to RSVP and itinerary
- **Fast Load Times** - Critical assets preloaded, lazy loading for images
- **Smooth Interactions** - Animated transitions between states

### Typography
- Clear hierarchy with multiple font sizes
- Readable line heights and spacing
- Elegant serif or script font for headings
- Sans-serif for body text (accessibility)

### Color Palette
- **Primary** - Warm, romantic tones (gold, terracotta, rose)
- **Secondary** - Natural Sicily colors (olive green, warm stone)
- **Neutral** - Whites, creams, soft grays for backgrounds
- **Accent** - Bold colors for CTAs and important information

## Pages & Flows

### Home / Invitation Page
- Welcome greeting
- Wedding date, time, and location
- Call-to-action: "View Schedule" or "RSVP"
- Guest name (if personalized)

### RSVP Form
1. Confirm attendance (Yes/No/Maybe)
2. Plus-one information (if applicable)
3. Dietary requirements
4. Special requests/allergies
5. Submit confirmation

### Itinerary / Schedule
- **Day view** - All events for a specific day
- **Event detail view** - Full information for an event
  - Time and duration
  - Location with optional map
  - Agenda and description
  - Dress code
  - Transportation info
  - Emergency contacts

### Admin / Response Dashboard (Optional)
- View all RSVP responses
- Filter and search guests
- Export guest list
- Track attendance

## Data Model

### Guest
```typescript
interface Guest {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  rsvpStatus: 'pending' | 'yes' | 'no' | 'maybe';
  plusOne?: boolean;
  plusOneName?: string;
  dietaryRestrictions: string[];
  specialRequests?: string;
  updatedAt: Date;
}
```

### Event
```typescript
interface Event {
  id: string;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  location: string;
  coordinates?: { lat: number; lng: number };
  dresscode?: string;
  agenda?: string;
  contacts?: Contact[];
  category: 'ceremony' | 'reception' | 'brunch' | 'activity';
}
```

## Responsive Design Breakpoints
- **Mobile** - 320px to 640px
- **Tablet** - 641px to 1024px
- **Desktop** - 1025px and above

## Performance Optimization
- **Code Splitting** - Lazy load pages and components
- **Image Optimization** - Compress and serve responsive images
- **Caching Strategy** - Cache-first for assets, network-first for data
- **Bundle Size** - Minimize JavaScript using tree-shaking
- **Lighthouse Targets**:
  - Performance: ≥ 90
  - Accessibility: ≥ 90
  - Best Practices: ≥ 90
  - SEO: ≥ 90

## Accessibility (a11y)
- **WCAG 2.1 Level AA** compliance
- Semantic HTML markup
- Proper heading hierarchy
- Alt text for images
- Color contrast ratios ≥ 4.5:1
- Keyboard navigation support
- Screen reader friendly
- Focus indicators visible

## PWA Implementation
- **Installable** - Add to home screen on iOS/Android
- **Offline-first** - Works without internet connection
- **Fast Loading** - Service worker enables instant load
- **Push Notifications** (optional) - Remind guests of upcoming events
- **Share Functionality** - Share invitation with others

## Browser Support
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- iOS Safari 14+
- Samsung Internet 14+

## Security Considerations
- HTTPS only (required for PWA)
- Input validation and sanitization
- XSS protection
- CSRF tokens for form submissions
- Secure storage of sensitive guest data
- No exposed API keys or credentials
- Rate limiting on form submissions

## Future Enhancements
- **Guest Messaging** - In-app messaging between guests
- **Hotel Information** - Curated hotel recommendations
- **Photo Gallery** - Share wedding photos post-event
- **Seat Assignments** - Table seating chart
- **Gift Registry** - Link to external gift registry
- **Travel Info** - Flight/transportation recommendations
- **Camera Integration** - Photo upload for guests
- **Real-time Updates** - Push notifications for schedule changes

## Deployment
- **Hosting** - Vercel, Netlify, or GitHub Pages
- **Environment Variables** - Manage API keys and configuration
- **CI/CD** - Automated builds and deployments
- **Monitoring** - Error tracking and performance monitoring

## Testing Strategy
- **Unit Tests** - Component and utility function tests
- **E2E Tests** - Critical user flows (RSVP submission, navigation)
- **Accessibility Tests** - Automated a11y checks
- **Performance Tests** - Lighthouse audits
- **Cross-browser Testing** - Manual testing on target browsers

## Version History
- **v1.0** - Initial launch (core features: invitation, RSVP, itinerary)
- **v1.1** - (Future) Additional features based on guest feedback
