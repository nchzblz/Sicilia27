# Mariana & Lukas - Wedding App (Sicilia 2027)

A progressive web app (PWA) wedding invitation, RSVP manager, and multi-day itinerary for Mariana & Lukas's celebration in Noto, Sicily.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or newer recommended)
- `npm` or `yarn` or `pnpm` or `bun`

### Installation
1. Unzip the project folder.
2. Open a terminal in the project root directory.
3. Install dependencies:
   ```bash
   npm install
   ```

### Development
Start the local Vite development server:
```bash
npm run dev
```
Open your browser at [http://localhost:3000](http://localhost:3000) (or the URL printed in the terminal).

### Production Build
To create an optimized production build:
```bash
npm run build
```
The output will be placed in the `dist/` directory.

### Tech Stack
- **React 19** + **TypeScript**
- **Vite 6** + **Tailwind CSS 4**
- **Vite PWA Plugin** (Workbox offline support, service worker, manifest)
- **Motion** (Framer Motion animations)
- **Lucide React** (icons)
