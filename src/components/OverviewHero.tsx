import React from 'react';
import { Language, translations } from '../i18n/translations';
import {
  Map,
  Users,
  Stethoscope,
  TrendingUp,
  CloudSun,
  ShieldCheck,
  ArrowRight,
  Sprout,
  CheckCircle2,
  Calendar,
  AlertCircle,
  Landmark,
  CreditCard,
} from 'lucide-react';

interface OverviewHeroProps {
  lang: Language;
  onNavigate: (tabId: string) => void;
  onOpenKycModal: () => void;
}

export const OverviewHero: React.FC<OverviewHeroProps> = ({
  lang,
  onNavigate,
  onOpenKycModal,
}) => {
  const t = translations[lang];

  return (
    <div className="space-y-8">
      {/* Editorial Hero Banner Section */}
      <div className="relative rounded-2xl bg-stone-900 text-white overflow-hidden border border-stone-800 shadow-md">
        {/* Subtle SVG Agricultural Contour Background */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="contour" width="80" height="80" patternUnits="userSpaceOnUse">
                <circle cx="40" cy="40" r="38" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                <circle cx="40" cy="40" r="24" fill="none" stroke="rgba(52,211,153,0.2)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#contour)" />
          </svg>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 p-6 sm:p-10 max-w-4xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-widest">
            <Sprout className="w-4 h-4 text-emerald-400" />
            <span>Digital Public Infrastructure for Agriculture</span>
            <span aria-hidden="true">·</span>
            <span>AgriStack Hub</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white text-balance leading-tight">
            {t.heroTitle}
          </h1>

          <p className="text-sm sm:text-base text-stone-300 leading-relaxed max-w-2xl">
            {t.heroSubtitle}
          </p>

          {/* Quick Action Triggers */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('card-generator')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] text-white text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer whitespace-nowrap"
            >
              <CreditCard className="w-4 h-4 text-emerald-100" />
              <span>{lang === 'bn' ? 'পিভিসি কিষাণ কার্ড জেনারেটর' : 'Generate PVC Kisan Card'}</span>
              <ArrowRight className="w-4 h-4 text-emerald-200" />
            </button>

            <button
              onClick={() => onNavigate('cadastral')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-stone-800/90 hover:bg-stone-700/90 text-white text-xs sm:text-sm font-semibold border border-stone-700 transition-all cursor-pointer whitespace-nowrap"
            >
              <Map className="w-4 h-4 text-emerald-400" />
              <span>{t.navCadastral}</span>
            </button>

            <button
              onClick={() => onNavigate('doctor')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-stone-800/90 hover:bg-stone-700/90 text-white text-xs sm:text-sm font-semibold border border-stone-700 transition-all cursor-pointer whitespace-nowrap"
            >
              <Stethoscope className="w-4 h-4 text-emerald-400" />
              <span>{t.navCropDoctor}</span>
            </button>

            <button
              onClick={onOpenKycModal}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-stone-700 text-stone-300 hover:text-white hover:border-stone-500 text-xs sm:text-sm font-medium transition-colors cursor-pointer whitespace-nowrap"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{t.verifyAction}</span>
            </button>
          </div>
        </div>

        {/* Ambient bottom status strip */}
        <div className="px-6 sm:px-10 py-3 bg-stone-950/80 border-t border-stone-800/80 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-400">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-400" />
            <span>{t.statActiveSeason}</span>
          </div>
          <div className="flex items-center gap-3 font-mono text-[11px]">
            <span>District: Purba Bardhaman & Gangetic Delta</span>
            <span aria-hidden="true">·</span>
            <span>Survey Cadastre: WGS84 Datum</span>
          </div>
        </div>
      </div>

      {/* 4-Column Key Performance Metric Strip (Tabular Numerals) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs space-y-1">
          <div className="text-xs font-semibold text-stone-500 uppercase tracking-wide">
            {t.statFarmers}
          </div>
          <div className="text-2xl sm:text-3xl font-black text-stone-900 tabular-nums">
            14,820 <span className="text-xs font-normal text-stone-500">Farmers</span>
          </div>
          <div className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>98.4% Aadhaar e-KYC Linked</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs space-y-1">
          <div className="text-xs font-semibold text-stone-500 uppercase tracking-wide">
            {t.statCadastralArea}
          </div>
          <div className="text-2xl sm:text-3xl font-black text-stone-900 tabular-nums">
            42,650 <span className="text-xs font-normal text-stone-500">Acres</span>
          </div>
          <div className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Geo-Tagged Drone Surveyed</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs space-y-1">
          <div className="text-xs font-semibold text-stone-500 uppercase tracking-wide">
            {t.statVerifiedPlots}
          </div>
          <div className="text-2xl sm:text-3xl font-black text-stone-900 tabular-nums">
            8,914 <span className="text-xs font-normal text-stone-500">Parcels</span>
          </div>
          <div className="text-xs text-stone-600 font-medium">
            Avg NDVI Health: <span className="text-emerald-700 font-bold">0.78 (Vigorous)</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs space-y-1">
          <div className="text-xs font-semibold text-stone-500 uppercase tracking-wide">
            {t.statDbtTransferred}
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-800 tabular-nums">
            ₹6.48 Cr
          </div>
          <div className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
            <Landmark className="w-3.5 h-3.5" />
            <span>PM-Kisan & Krishak Bandhu DBT</span>
          </div>
        </div>
      </div>

      {/* Six Pillars of AgriStack Ecosystem Navigation Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-stone-900">
            {lang === 'bn' ? 'এগ্রিস্ট্যাক এর প্রধান সেবা ও মডিউল' : 'Core AgriStack Pillars & Services'}
          </h2>
          <span className="text-xs text-stone-500 font-medium">
            {lang === 'bn' ? 'সরাসরি প্রবেশ করুন' : 'Select module to inspect live records'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Card 1: Cadastral GIS */}
          <button
            onClick={() => onNavigate('cadastral')}
            className="p-5 bg-white rounded-xl border border-stone-200 hover:border-emerald-600 text-left transition-all shadow-xs hover:shadow-sm cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3 group-hover:bg-emerald-700 group-hover:text-white transition-colors">
                <Map className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-stone-900 group-hover:text-emerald-700 transition-colors">
                {t.navCadastral}
              </h3>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                {lang === 'bn'
                  ? 'স্যাটেলাইট এনডিভিআই সূচক, মাটির গুণাগুণ এবং দাগ ও খতিয়ান সীমানা সমন্বিত ভূ-তথ্য মানচিত্র।'
                  : 'Interactive cadastral GIS boundary registry with satellite NDVI health and soil fertility analysis.'}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-emerald-700">
              <span>Inspect Farm Parcels</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Card 2: Farmer Registry */}
          <button
            onClick={() => onNavigate('farmers')}
            className="p-5 bg-white rounded-xl border border-stone-200 hover:border-emerald-600 text-left transition-all shadow-xs hover:shadow-sm cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3 group-hover:bg-emerald-700 group-hover:text-white transition-colors">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-stone-900 group-hover:text-emerald-700 transition-colors">
                {t.navFarmers}
              </h3>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                {lang === 'bn'
                  ? 'কিষাণ ডিজিটাল আইডি (Kisan D-ID), আধার ই-কেওয়াইসি এবং ব্যাংক একাউন্ট ভেরিফিকেশন ব্যবস্থা।'
                  : 'Kisan Digital ID database linking landholding records, biometric e-KYC, and bank direct benefits.'}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-emerald-700">
              <span>View Farmer Profiles</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Card 3: AI Crop Doctor */}
          <button
            onClick={() => onNavigate('doctor')}
            className="p-5 bg-white rounded-xl border border-stone-200 hover:border-emerald-600 text-left transition-all shadow-xs hover:shadow-sm cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3 group-hover:bg-emerald-700 group-hover:text-white transition-colors">
                <Stethoscope className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-stone-900 group-hover:text-emerald-700 transition-colors">
                {t.navCropDoctor}
              </h3>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                {lang === 'bn'
                  ? 'জেমিনি ৩.৮ ফ্ল্যাশ দ্বারা চালিত তাৎক্ষণিক উদ্ভিদ রোগ নির্ণয়, ভয়েস প্রেসক্রিপশন ও জৈব প্রতিকার।'
                  : 'Gemini 3.8 Flash multimodal vision diagnosis for crop diseases, organic remedies, and chemical dosage.'}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-emerald-700">
              <span>Launch AI Clinic</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Card 4: Mandi Intelligence */}
          <button
            onClick={() => onNavigate('mandi')}
            className="p-5 bg-white rounded-xl border border-stone-200 hover:border-emerald-600 text-left transition-all shadow-xs hover:shadow-sm cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3 group-hover:bg-emerald-700 group-hover:text-white transition-colors">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-stone-900 group-hover:text-emerald-700 transition-colors">
                {t.navMandi}
              </h3>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                {lang === 'bn'
                  ? 'ধান, গম, আলু, সরিষা ও পাটের দৈনিক লাইভ এপিএমসি মান্ডি দর এবং সরকারি এমএসপি তুলনা।'
                  : 'Daily modal prices across regional mandis, comparison against MSP benchmarks, and revenue calculator.'}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-emerald-700">
              <span>Check Live Rates</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Card 5: Weather Advisory */}
          <button
            onClick={() => onNavigate('weather')}
            className="p-5 bg-white rounded-xl border border-stone-200 hover:border-emerald-600 text-left transition-all shadow-xs hover:shadow-sm cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3 group-hover:bg-emerald-700 group-hover:text-white transition-colors">
                <CloudSun className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-stone-900 group-hover:text-emerald-700 transition-colors">
                {t.navWeather}
              </h3>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                {lang === 'bn'
                  ? 'কেভিকে (KVK) হতে ৭ দিনের কৃষি আবহাওয়া পূর্বাভাস, কীটনাশক স্প্রে করার জো ও সতর্কবার্তা।'
                  : '7-day agro-meteorological forecast with spray suitability indices and district crop bulletins.'}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-emerald-700">
              <span>View Weather Station</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Card 6: Schemes & KCC */}
          <button
            onClick={() => onNavigate('schemes')}
            className="p-5 bg-white rounded-xl border border-stone-200 hover:border-emerald-600 text-left transition-all shadow-xs hover:shadow-sm cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3 group-hover:bg-emerald-700 group-hover:text-white transition-colors">
                <Landmark className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-stone-900 group-hover:text-emerald-700 transition-colors">
                {t.navSchemes}
              </h3>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                {lang === 'bn'
                  ? 'পিএম-কিষাণ, কৃষক বন্ধু সহায়তা ও কিষাণ ক্রেডিট কার্ডে মাত্র ৪% সুদে কৃষি ঋণ ক্যালকুলেটর।'
                  : 'Subsidized 4% KCC credit calculator, crop insurance claim portal, and direct DBT assistance.'}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-emerald-700">
              <span>Calculate KCC Loan</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
