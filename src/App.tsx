import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { OverviewHero } from './components/OverviewHero';
import { CadastralGISViewer } from './components/CadastralGISViewer';
import { FarmerRegistry } from './components/FarmerRegistry';
import { CropDoctorAI } from './components/CropDoctorAI';
import { MandiMarketIntelligence } from './components/MandiMarketIntelligence';
import { AgroWeatherAdvisory } from './components/AgroWeatherAdvisory';
import { SchemesAndKCC } from './components/SchemesAndKCC';
import { KycVerificationModal } from './components/KycVerificationModal';

import { IdCardStudio } from './components/IdCardStudio';

import {
  INITIAL_FARMERS,
  INITIAL_PLOTS,
  MANDI_PRICES,
  CROP_DISEASES,
  WEATHER_FORECAST,
  AGRO_SCHEMES,
} from './data/mockAgriData';
import { Farmer } from './types/agristack';
import { Language, translations } from './i18n/translations';
import { Sprout } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('card-generator');
  const [lang, setLang] = useState<Language>('bn'); // default Bengali for the user, easily toggled to English
  const [farmers, setFarmers] = useState<Farmer[]>(INITIAL_FARMERS);
  const [plots] = useState(INITIAL_PLOTS);
  const [prices] = useState(MANDI_PRICES);
  const [diseases] = useState(CROP_DISEASES);
  const [weather] = useState(WEATHER_FORECAST);
  const [schemes] = useState(AGRO_SCHEMES);
  const [isKycModalOpen, setIsKycModalOpen] = useState(false);

  const t = translations[lang];

  const handleAddFarmer = (newFarmer: Farmer) => {
    setFarmers((prev) => [newFarmer, ...prev]);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans">
      {/* Strict 3-zone Top Bar Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        lang={lang}
        setLang={setLang}
        onOpenKycModal={() => setIsKycModalOpen(true)}
      />

      {/* Main Content Viewport Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'card-generator' && <IdCardStudio />}

        {activeTab === 'overview' && (
          <OverviewHero
            lang={lang}
            onNavigate={(tab) => setActiveTab(tab)}
            onOpenKycModal={() => setIsKycModalOpen(true)}
          />
        )}

        {activeTab === 'cadastral' && (
          <CadastralGISViewer
            plots={plots}
            lang={lang}
          />
        )}

        {activeTab === 'farmers' && (
          <FarmerRegistry
            farmers={farmers}
            onAddFarmer={handleAddFarmer}
            lang={lang}
          />
        )}

        {activeTab === 'doctor' && (
          <CropDoctorAI
            diseases={diseases}
            lang={lang}
          />
        )}

        {activeTab === 'mandi' && (
          <MandiMarketIntelligence
            prices={prices}
            lang={lang}
          />
        )}

        {activeTab === 'weather' && (
          <AgroWeatherAdvisory
            weather={weather}
            lang={lang}
          />
        )}

        {activeTab === 'schemes' && (
          <SchemesAndKCC
            schemes={schemes}
            lang={lang}
          />
        )}
      </main>

      {/* e-KYC Verification Modal */}
      <KycVerificationModal
        isOpen={isKycModalOpen}
        onClose={() => setIsKycModalOpen(false)}
        farmers={farmers}
        lang={lang}
      />

      {/* Quiet, Professional Government / DPI Footer */}
      <footer className="border-t border-stone-200 bg-white py-8 px-4 sm:px-6 lg:px-8 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div className="flex items-center gap-2 font-medium text-stone-700">
            <Sprout className="w-4 h-4 text-emerald-700" />
            <span>AgriStack · National Digital Agriculture Public Infrastructure</span>
          </div>

          <div className="flex items-center gap-4 text-stone-500">
            <span>Department of Agriculture & Farmers Empowerment</span>
            <span aria-hidden="true">·</span>
            <span>Digital Cadastral Survey WGS84</span>
          </div>

          <div className="text-stone-400 font-mono text-[11px]">
            © 2026 AgriStack Public Stack
          </div>
        </div>
      </footer>
    </div>
  );
}
