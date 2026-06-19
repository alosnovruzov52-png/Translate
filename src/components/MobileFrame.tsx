import React, { useState, useEffect } from "react";
import { Smartphone, Monitor, Wifi, Battery, Signal } from "lucide-react";

interface MobileFrameProps {
  children: React.ReactNode;
}

export default function MobileFrame({ children }: MobileFrameProps) {
  const [isMobileView, setIsMobileView] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<string>("09:41");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 py-4 px-2 select-none">
      {/* Viewport Control Panel */}
      <div className="flex items-center gap-2 mb-4 bg-white shadow-sm border border-slate-200/60 rounded-full px-4 py-1.5 text-xs text-slate-600 font-medium z-10">
        <span className="hidden sm:inline">Görünüm Modu:</span>
        <button
          id="btn-toggle-mobile"
          onClick={() => setIsMobileView(true)}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all cursor-pointer ${
            isMobileView
              ? "bg-indigo-600 text-white shadow-sm font-semibold"
              : "hover:bg-slate-100 text-slate-600"
          }`}
        >
          <Smartphone size={14} />
          <span>Mobil Telefon</span>
        </button>
        <button
          id="btn-toggle-desktop"
          onClick={() => setIsMobileView(false)}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all cursor-pointer ${
            !isMobileView
              ? "bg-indigo-600 text-white shadow-sm font-semibold"
              : "hover:bg-slate-100 text-slate-600"
          }`}
        >
          <Monitor size={14} />
          <span>Geniş Ekran</span>
        </button>
      </div>

      {isMobileView ? (
        /* Smartphone Frame mockup */
        <div 
          id="smartphone-frame"
          className="relative w-full max-w-[410px] h-[840px] rounded-[52px] border-[12px] border-slate-900 bg-white shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ring-4 ring-slate-900/10"
        >
          {/* Dynamic Island / Notch */}
          <div className="absolute top-2.5 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-full z-30 flex items-center justify-center">
            <div className="w-2.5 h-2.5 bg-slate-850 rounded-full ml-auto mr-4" />
          </div>

          {/* iOS-style Status Bar */}
          <div className="flex items-center justify-between px-7 pt-4 pb-2 bg-slate-900 text-white text-xs font-semibold select-none z-20 shrink-0">
            <span>{currentTime}</span>
            <div className="flex items-center gap-1.5">
              <Signal size={12} className="opacity-90" />
              <Wifi size={12} className="opacity-90" />
              <div className="flex items-center gap-0.5">
                <Battery size={14} className="opacity-90" />
              </div>
            </div>
          </div>

          {/* App Client Wrapper inside Phone */}
          <div className="flex-1 overflow-hidden flex flex-col bg-slate-50 relative">
            {children}
          </div>

          {/* Home Indicator bar */}
          <div className="absolute bottom-1.5 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-slate-900/40 rounded-full z-20 pointer-events-none" />
        </div>
      ) : (
        /* Full screen or responsive dashboard */
        <div 
          id="responsive-dashboard-wrapper"
          className="w-full max-w-6xl h-[840px] rounded-3xl border border-slate-200 bg-white shadow-xl flex flex-col overflow-hidden transition-all duration-300"
        >
          <div className="flex-1 overflow-hidden flex flex-col bg-slate-50 relative">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
