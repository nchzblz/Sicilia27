import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import photoLandscape from '../assets/images/sicily_coastal_photo_1788196885831.jpg';
import watercolorLandscape from '../assets/images/sicily_watercolor_1788196901533.jpg';
import logoImage from '../assets/images/regenerated_image_1788268500011.png';

interface IntroZoomViewProps {
  onStartRsvp: () => void;
}

export const IntroZoomView: React.FC<IntroZoomViewProps> = ({
  onStartRsvp,
}) => {
  // Animation states matching video:
  // 1. 'photo' (0.0s - 2.0s): Clear photograph of the coastal terrace
  // 2. 'crossfade' (2.0s - 4.0s): Smooth zoom push-in and crossfade into watercolor
  // 3. 'logo' (4.0s+): Transition complete -> Logo and Enter button appear
  const [animStep, setAnimStep] = useState<'photo' | 'crossfade' | 'logo'>('photo');

  useEffect(() => {
    setAnimStep('photo');

    // After 2.0s, begin the zoom push-in and crossfade to watercolor
    const t1 = setTimeout(() => {
      setAnimStep('crossfade');
    }, 2000);

    // After 4.0s (after transition completes), reveal logo and enter button
    const t2 = setTimeout(() => {
      setAnimStep('logo');
    }, 4000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div
      onClick={() => {
        if (animStep === 'logo') {
          onStartRsvp();
        } else {
          // If tapped during animation, skip directly to logo + button view
          setAnimStep('logo');
        }
      }}
      className="fixed inset-0 w-full h-full min-h-screen z-50 flex flex-col justify-between overflow-hidden select-none bg-[#FAF8F5] cursor-pointer"
    >
      {/* Layer 1: Photograph */}
      <motion.div
        className="absolute inset-0 w-full h-full pointer-events-none"
        initial={{ scale: 1.0, opacity: 1 }}
        animate={{
          scale: animStep === 'photo' ? 1.0 : 1.1,
          opacity: animStep === 'logo' ? 0 : 1,
        }}
        transition={{
          scale: { duration: 4.5, ease: [0.25, 0.1, 0.25, 1] },
          opacity: { duration: 1.8, ease: 'easeInOut' },
        }}
      >
        <img
          src={photoLandscape}
          alt="Sicily Coast"
          className="w-full h-full object-cover object-center"
        />
      </motion.div>

      {/* Layer 2: Watercolor Painting */}
      <motion.div
        className="absolute inset-0 w-full h-full pointer-events-none"
        initial={{ scale: 1.0, opacity: 0 }}
        animate={{
          scale: animStep === 'photo' ? 1.0 : 1.1,
          opacity: animStep === 'photo' ? 0 : 1,
        }}
        transition={{
          scale: { duration: 4.5, ease: [0.25, 0.1, 0.25, 1] },
          opacity: { duration: 1.8, ease: 'easeInOut' },
        }}
      >
        <img
          src={watercolorLandscape}
          alt="Sicily Watercolor"
          className="w-full h-full object-cover object-center"
        />

        {/* Soft white radial wash / vignette exactly matching video at 00:06 */}
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.70) 40%, rgba(255,255,255,0.25) 75%, rgba(255,255,255,0) 100%)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: animStep === 'logo' ? 1 : 0 }}
          transition={{ duration: 1.2 }}
        />
      </motion.div>

      {/* Center: Official Logo (Appears when animStep === 'logo') */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center p-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{
            opacity: animStep === 'logo' ? 1 : 0,
            scale: animStep === 'logo' ? 1 : 0.95,
          }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="w-full max-w-[340px] sm:max-w-[440px] px-4 pointer-events-auto flex flex-col items-center justify-center"
        >
          <img
            src={logoImage}
            alt="Mariana & Lukas - SICILIA - NOTO, 2027"
            className="w-full h-auto object-contain drop-shadow-xs"
          />
        </motion.div>
      </div>

      {/* Bottom Action: Enter Button (Appears ONLY after the transition happens) */}
      <div className="relative z-30 pb-8 sm:pb-12 px-6 pointer-events-auto w-full min-h-[90px] flex items-center justify-center">
        <AnimatePresence>
          {animStep === 'logo' && (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 18 }}
              transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
              className="w-full max-w-xs sm:max-w-sm mx-auto"
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onStartRsvp();
                }}
                id="btn-intro-enter"
                className="w-full py-4 px-8 rounded-full bg-[#be1e2d]/90 hover:bg-[#be1e2d] active:scale-[0.98] text-white font-semibold text-xs sm:text-sm tracking-[0.2em] uppercase shadow-[0_10px_28px_rgba(190,30,45,0.35)] flex items-center justify-center gap-3 transition-all duration-200 cursor-pointer group"
              >
                <span>ENTRAR</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white/90 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
