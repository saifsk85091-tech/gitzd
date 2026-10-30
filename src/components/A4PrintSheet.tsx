import React from 'react';
import { FarmerCardData, CardTheme, CardLanguage, PrintLayout } from '../types/card';
import { FarmerIdCard } from './FarmerIdCard';
import { Printer, Sliders, Scissors, Layers } from 'lucide-react';

interface A4PrintSheetProps {
  farmers: FarmerCardData[];
  layout: PrintLayout;
  theme: CardTheme;
  language: CardLanguage;
  topMarginMm?: number;
  leftMarginMm?: number;
  gapMm?: number;
}

export const A4PrintSheet: React.FC<A4PrintSheetProps> = ({
  farmers,
  layout,
  theme,
  language,
  topMarginMm = 10,
  leftMarginMm = 12,
  gapMm = 6,
}) => {
  return (
    <div className="print-area w-full bg-white text-stone-900">
      {/* On-screen Print Guidance Bar (hidden during actual print) */}
      <div className="no-print p-4 mb-6 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2">
          <Scissors className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            <strong>PVC Printing Ready:</strong> Set paper to <strong>A4</strong>, margins to <strong>None / 0</strong>, and enable <strong>Background graphics</strong> in your browser print dialogue.
          </span>
        </div>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg shadow-xs transition-colors cursor-pointer whitespace-nowrap self-stretch sm:self-auto justify-center"
        >
          <Printer className="w-4 h-4 text-emerald-200" />
          <span>Print All Now</span>
        </button>
      </div>

      {/* A4 Sheet Container */}
      <div
        className="mx-auto bg-white p-4 sm:p-8 rounded-xl border border-stone-300 shadow-md print:shadow-none print:border-none print:p-0"
        style={{
          width: '100%',
          maxWidth: '210mm',
          minHeight: '297mm',
          paddingTop: `${topMarginMm}mm`,
          paddingLeft: `${leftMarginMm}mm`,
          paddingRight: `${leftMarginMm}mm`,
        }}
      >
        {/* Render Cards according to Layout */}
        <div
          className="flex flex-col gap-6"
          style={{ gap: `${gapMm}mm` }}
        >
          {farmers.map((farmer, idx) => (
            <div
              key={farmer.id || idx}
              className="relative p-2 border border-dashed border-stone-300 print:border-stone-400 rounded-lg flex flex-col xl:flex-row items-center justify-center gap-4 bg-stone-50/50 print:bg-transparent page-break-inside-avoid"
            >
              {/* Card Label and Cut Guide Markers (Front & Back) */}
              <div className="no-print absolute top-1 left-2 text-[10px] font-mono font-bold text-stone-400">
                #{idx + 1} · {farmer.nameEn} ({farmer.id})
              </div>

              {/* Front and Back Pair */}
              <FarmerIdCard
                farmer={farmer}
                scale={1}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
