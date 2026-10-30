import React, { useState } from 'react';
import { WeatherDay } from '../types/agristack';
import { Language, translations } from '../i18n/translations';
import {
  CloudSun,
  Sun,
  CloudRain,
  Wind,
  Droplets,
  AlertCircle,
  CheckCircle2,
  Calendar,
  Compass,
} from 'lucide-react';

interface AgroWeatherAdvisoryProps {
  weather: WeatherDay[];
  lang: Language;
}

export const AgroWeatherAdvisory: React.FC<AgroWeatherAdvisoryProps> = ({
  weather,
  lang,
}) => {
  const t = translations[lang];
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [selectedDistrict, setSelectedDistrict] = useState('Purba Bardhaman');

  const activeWeather = weather[selectedDayIndex] || weather[0];

  const getWeatherIcon = (condition: string) => {
    if (condition.includes('Rain') || condition.includes('Shower')) {
      return <CloudRain className="w-6 h-6 text-cyan-600" />;
    }
    if (condition.includes('Cloud')) {
      return <CloudSun className="w-6 h-6 text-amber-500" />;
    }
    return <Sun className="w-6 h-6 text-amber-500" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 tracking-wide uppercase">
            <span>Agro-Meteorological Service</span>
            <span aria-hidden="true">·</span>
            <span>Krishi Vigyan Kendra (KVK) Weather Station</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mt-1">
            {t.weatherHeading}
          </h2>
          <p className="text-sm text-stone-600 max-w-3xl mt-1">
            {t.weatherSubheading}
          </p>
        </div>

        {/* District Switcher */}
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-emerald-700" />
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            aria-label="Select agro-climatic zone district"
            className="text-xs bg-white border border-stone-300 rounded-lg px-3 py-2 text-stone-800 font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-600 shadow-xs"
          >
            <option value="Purba Bardhaman">Purba Bardhaman (New Alluvial Zone)</option>
            <option value="Hooghly">Hooghly (Gangetic Delta Zone)</option>
            <option value="Nadia">Nadia (Alluvial Plains)</option>
            <option value="Murshidabad">Murshidabad (North Central)</option>
            <option value="Malda">Malda (Barind Tract)</option>
          </select>
        </div>
      </div>

      {/* 7-Day Strip Carousel Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {weather.map((item, idx) => {
          const isSelected = selectedDayIndex === idx;
          return (
            <button
              key={item.date}
              onClick={() => setSelectedDayIndex(idx)}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'border-emerald-600 bg-emerald-50/80 shadow-xs'
                  : 'border-stone-200 bg-white hover:border-stone-300'
              }`}
            >
              <div>
                <div className="text-xs font-bold text-stone-900">
                  {lang === 'bn' ? item.dayBn : item.day}
                </div>
                <div className="text-[11px] text-stone-500 font-mono">
                  {item.date}
                </div>

                <div className="my-2.5 flex items-center justify-center">
                  {getWeatherIcon(item.condition)}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs tabular-nums">
                  <span className="font-extrabold text-stone-900">
                    {item.tempMax}°C
                  </span>
                  <span className="text-stone-500">{item.tempMin}°C</span>
                </div>

                {/* Spray tag unboxed */}
                <div className="mt-2 text-[10px] font-semibold text-center border-t border-stone-100 pt-1.5">
                  <span
                    className={
                      item.sprayCondition === 'Optimal'
                        ? 'text-emerald-700'
                        : item.sprayCondition === 'Caution'
                        ? 'text-amber-700'
                        : 'text-rose-700'
                    }
                  >
                    {item.sprayCondition === 'Optimal' ? 'Spray: OK' : 'Spray: Caution'}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Day Deep Dive + Official Agro-Advisory Bulletin */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Deep Dive Micro-Metrics (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-stone-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div>
              <span className="text-[11px] font-semibold text-stone-500 uppercase">
                Detailed Forecast for {selectedDistrict}
              </span>
              <h3 className="text-lg font-bold text-stone-900">
                {lang === 'bn' ? activeWeather.dayBn : activeWeather.day} · {activeWeather.date}
              </h3>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-stone-900 tabular-nums">
                {activeWeather.tempMax}°
              </span>
              <span className="text-xs text-stone-500 block">
                Min: {activeWeather.tempMin}°C
              </span>
            </div>
          </div>

          {/* Environmental telemetry */}
          <div className="grid grid-cols-3 gap-2.5 text-center">
            <div className="p-3 bg-stone-50 rounded-lg border border-stone-100">
              <div className="text-cyan-700 flex justify-center mb-1">
                <CloudRain className="w-4 h-4" />
              </div>
              <div className="text-[11px] text-stone-500">{t.rainRisk}</div>
              <div className="text-sm font-bold text-stone-900 tabular-nums">
                {activeWeather.rainProbability}%
              </div>
            </div>

            <div className="p-3 bg-stone-50 rounded-lg border border-stone-100">
              <div className="text-emerald-700 flex justify-center mb-1">
                <Droplets className="w-4 h-4" />
              </div>
              <div className="text-[11px] text-stone-500">{t.humidity}</div>
              <div className="text-sm font-bold text-stone-900 tabular-nums">
                {activeWeather.humidity}%
              </div>
            </div>

            <div className="p-3 bg-stone-50 rounded-lg border border-stone-100">
              <div className="text-stone-700 flex justify-center mb-1">
                <Wind className="w-4 h-4" />
              </div>
              <div className="text-[11px] text-stone-500">{t.windSpeed}</div>
              <div className="text-sm font-bold text-stone-900 tabular-nums">
                {activeWeather.windKmh} km/h
              </div>
            </div>
          </div>

          {/* Spray Window Verdict */}
          <div
            className={`p-3.5 rounded-xl border flex items-start gap-3 ${
              activeWeather.sprayCondition === 'Optimal'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                : 'bg-amber-50 border-amber-200 text-amber-950'
            }`}
          >
            {activeWeather.sprayCondition === 'Optimal' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            )}
            <div>
              <div className="font-bold text-xs">
                {activeWeather.sprayCondition === 'Optimal'
                  ? t.sprayOptimal
                  : t.sprayCaution}
              </div>
              <p className="text-xs text-stone-700 mt-0.5 leading-relaxed">
                Wind speed is {activeWeather.windKmh} km/h with {activeWeather.rainProbability}% chance of rain. Ideal window for foliar treatments between 8:00 AM and 11:30 AM.
              </p>
            </div>
          </div>
        </div>

        {/* KVK Agronomic Advisory Bulletin (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-stone-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-700" />
              <h3 className="text-sm font-bold text-stone-900">
                {t.kvkAdvisory}
              </h3>
            </div>
            <span className="text-[11px] font-mono text-stone-500">
              Bulletin Ref: KVK/WB/2026/W44
            </span>
          </div>

          <div className="space-y-3 text-xs text-stone-700 leading-relaxed">
            <div className="p-3 bg-stone-50 rounded-lg border border-stone-100">
              <span className="font-bold text-stone-900 block mb-1">
                🌾 Aman Paddy Harvesting & Post-Harvest Storage:
              </span>
              <p>
                {lang === 'bn'
                  ? 'ধানের ৮০% দানা সোনালী রঙ ধারণ করলে কর্তন শুরু করুন। কাটা ধান খোলা রোদে ২-৩ দিন শুকিয়ে আর্দ্রতা ১২% এর নিচে নামিয়ে গুদামজাত করুন।'
                  : 'Initiate harvesting when 80% grains turn golden-straw colored. Dry threshed paddy under sun for 2-3 days until moisture drops below 12% to prevent mold.'}
              </p>
            </div>

            <div className="p-3 bg-stone-50 rounded-lg border border-stone-100">
              <span className="font-bold text-stone-900 block mb-1">
                🥔 Potato & Mustard Rabi Preparation:
              </span>
              <p>
                {lang === 'bn'
                  ? 'আলু লাগানোর পূর্বে জমি ভালো করে চাষ দিন ও গোবর সার মিশিয়ে নিন। সরিষার ক্ষেত্রে বীজ কার্বেনডাজিম বা ট্রাইকোডার্মা দিয়ে শোধন করে তবেই বপন করুন।'
                  : 'Prepare well-pulverized seedbed for rabi potato and mustard. Treat mustard seeds with Trichoderma viride @ 4g/kg seed before sowing.'}
              </p>
            </div>

            <div className="p-3 bg-stone-50 rounded-lg border border-stone-100">
              <span className="font-bold text-stone-900 block mb-1">
                💧 Soil Moisture & Irrigation Strategy:
              </span>
              <p>
                {lang === 'bn'
                  ? 'জমিতে অতিরিক্ত জল নিষ্কাশন নালা সচল রাখুন। রবি সবজির নার্সারি বেডে ভোরবেলা হালকা সেচ দিন।'
                  : 'Maintain unblocked boundary furrows. Apply light morning sprinkler irrigation to vegetable nurseries to buffer nighttime temperature dips.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
