import React from 'react';
import { Language, translations } from '../i18n/translations';
import { Sprout, ShieldCheck, Globe } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  lang: Language;
  setLang: (lang: Language) => void;
  onOpenKycModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  lang,
  setLang,
  onOpenKycModal,
}) => {
  const t = translations[lang];

  const navItems = [
    { id: 'card-generator', label: lang === 'bn' ? 'স্মার্ট পিভিসি কার্ড জেনারেটর' : 'PVC ID Card Generator', highlight: true },
    { id: 'overview', label: lang === 'bn' ? 'সারসংক্ষেপ' : 'Overview' },
    { id: 'cadastral', label: t.navCadastral },
    { id: 'farmers', label: t.navFarmers },
    { id: 'doctor', label: t.navCropDoctor },
    { id: 'mandi', label: t.navMandi },
    { id: 'weather', label: t.navWeather },
    { id: 'schemes', label: t.navSchemes },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Title (Single line, display face, clean text wordmark) */}
        <button
          onClick={() => setActiveTab('overview')}
          className="flex items-center gap-2.5 text-stone-900 font-bold text-xl tracking-tight whitespace-nowrap shrink-0 hover:opacity-85 transition-opacity"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center shadow-xs">
            <Sprout className="w-5 h-5 text-emerald-200" />
          </div>
          <span className="font-extrabold text-emerald-950 font-display">
            Agri<span className="text-emerald-600">Stack</span>
          </span>
        </button>

        {/* Zone 2: Navigation Links (Clean single-line text with subtle hover effect) */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-stone-600">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`py-1 text-xs sm:text-sm font-medium whitespace-nowrap transition-colors relative cursor-pointer ${
                  isActive
                    ? 'text-emerald-700 font-semibold after:absolute after:bottom-[-16px] after:left-0 after:right-0 after:h-0.5 after:bg-emerald-600'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary Action + Quick Language Switcher */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Language Switcher */}
          <button
            onClick={() => setLang(lang === 'en' ? 'bn' : 'en')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-stone-200 text-xs font-semibold text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer whitespace-nowrap"
            title="Switch Language / ভাষা পরিবর্তন করুন"
          >
            <Globe className="w-3.5 h-3.5 text-emerald-700" />
            <span>{lang === 'en' ? 'বাংলা' : 'English'}</span>
          </button>

          {/* Primary Action Button */}
          <button
            onClick={onOpenKycModal}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 active:scale-[0.98] text-white text-xs font-semibold shadow-xs transition-all cursor-pointer whitespace-nowrap"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-200" />
            <span>{t.verifyAction}</span>
          </button>
        </div>
      </div>

      {/* Mobile Horizontal Navigation Scroll */}
      <div className="lg:hidden flex items-center gap-2 overflow-x-auto px-4 py-2 border-t border-stone-100 bg-stone-50 text-xs">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap font-medium transition-colors ${
              activeTab === item.id
                ? 'bg-emerald-700 text-white font-semibold shadow-xs'
                : 'text-stone-600 bg-white border border-stone-200'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
};
