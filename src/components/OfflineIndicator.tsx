import React, { useEffect, useState } from 'react';
import { WifiOff } from 'lucide-react';

export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-sm z-50 flex items-center gap-2.5 rounded-2xl bg-[#2B1E16] text-[#FAF8F5] px-4 py-3 text-xs font-medium shadow-2xl border border-[#BD532E]/30 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <WifiOff className="w-4 h-4 text-[#BD532E] shrink-0 animate-pulse" />
      <span className="leading-snug">
        Modo sin conexión — La app y tus datos guardados continúan disponibles.
      </span>
    </div>
  );
};
