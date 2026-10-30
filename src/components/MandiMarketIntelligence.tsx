import React, { useState } from 'react';
import { MandiPrice } from '../types/agristack';
import { Language, translations } from '../i18n/translations';
import {
  TrendingUp,
  TrendingDown,
  Search,
  ArrowUpRight,
  Calculator,
  Building2,
  CheckCircle2,
} from 'lucide-react';

interface MandiMarketIntelligenceProps {
  prices: MandiPrice[];
  lang: Language;
}

export const MandiMarketIntelligence: React.FC<MandiMarketIntelligenceProps> = ({
  prices,
  lang,
}) => {
  const t = translations[lang];

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCommodity, setSelectedCommodity] = useState('all');
  const [calculatorQty, setCalculatorQty] = useState('20'); // 20 Quintals default
  const [calcMandiId, setCalcMandiId] = useState<string>('MP-01');

  const commodities = ['all', 'Paddy', 'Potato', 'Jute', 'Mustard', 'Wheat', 'Onion', 'Lentil'];

  const filteredPrices = prices.filter((item) => {
    const matchesSearch =
      item.mandiName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.commodity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.commodityBn.includes(searchTerm);

    const matchesCommodity =
      selectedCommodity === 'all' ||
      item.commodity.toLowerCase().includes(selectedCommodity.toLowerCase());

    return matchesSearch && matchesCommodity;
  });

  const selectedCalcPrice =
    prices.find((p) => p.id === calcMandiId) || prices[0];
  const qtyNum = parseFloat(calculatorQty) || 0;
  const estimatedRevenue = qtyNum * selectedCalcPrice.modalPrice;
  const mspRevenue = qtyNum * selectedCalcPrice.mspPrice;
  const diffFromMsp = estimatedRevenue - mspRevenue;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-stone-200 pb-5">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 tracking-wide uppercase">
          <span>APMC Market Intelligence</span>
          <span aria-hidden="true">·</span>
          <span>National e-NAM & Regional Mandis</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mt-1">
          {t.mandiHeading}
        </h2>
        <p className="text-sm text-stone-600 max-w-3xl mt-1">
          {t.mandiSubheading}
        </p>
      </div>

      {/* Top Controls: Search & Commodity Tabs */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-xl border border-stone-200 shadow-xs">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t.searchMandi}
            className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
          />
        </div>

        {/* Commodity Segmented Controls */}
        <div className="flex items-center gap-1 overflow-x-auto p-1 bg-stone-100 rounded-lg text-xs">
          {commodities.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCommodity(c)}
              className={`px-3 py-1.5 font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                selectedCommodity === c
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {c === 'all' ? (lang === 'bn' ? 'সব ফসল' : 'All Crops') : c}
            </button>
          ))}
        </div>
      </div>

      {/* Mandi Prices Data Grid */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-stone-50 text-stone-600 border-b border-stone-200">
                <th className="py-3 px-4 font-semibold">Commodity (ফসল)</th>
                <th className="py-3 px-4 font-semibold">Mandi & District</th>
                <th className="py-3 px-4 font-semibold text-right">{t.minRate}</th>
                <th className="py-3 px-4 font-semibold text-right">{t.modalRate}</th>
                <th className="py-3 px-4 font-semibold text-right">{t.maxRate}</th>
                <th className="py-3 px-4 font-semibold text-right">{t.mspRate}</th>
                <th className="py-3 px-4 font-semibold text-right">{t.dailyDiff}</th>
                <th className="py-3 px-4 font-semibold text-center">Trend (6D)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredPrices.map((item) => {
                const aboveMsp = item.modalPrice >= item.mspPrice;
                const mspDiff = item.modalPrice - item.mspPrice;

                return (
                  <tr
                    key={item.id}
                    className="hover:bg-stone-50/80 transition-colors"
                  >
                    {/* Commodity */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-stone-900">
                        {item.commodity}
                      </div>
                      <div className="text-[11px] text-stone-500 font-medium">
                        {item.commodityBn}
                      </div>
                    </td>

                    {/* Mandi */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-stone-800">
                        {item.mandiName}
                      </div>
                      <div className="text-[11px] text-stone-500">
                        {item.district} · {item.arrivalTons} Tons Arrival
                      </div>
                    </td>

                    {/* Min Price */}
                    <td className="py-3.5 px-4 text-right tabular-nums text-stone-600 font-medium">
                      ₹{item.minPrice.toLocaleString()}
                    </td>

                    {/* Modal Price */}
                    <td className="py-3.5 px-4 text-right tabular-nums">
                      <span className="font-extrabold text-stone-900 text-sm">
                        ₹{item.modalPrice.toLocaleString()}
                      </span>
                      <span className="text-[11px] text-stone-500 block">
                        / Qtl
                      </span>
                    </td>

                    {/* Max Price */}
                    <td className="py-3.5 px-4 text-right tabular-nums text-stone-600 font-medium">
                      ₹{item.maxPrice.toLocaleString()}
                    </td>

                    {/* MSP Price & Delta */}
                    <td className="py-3.5 px-4 text-right tabular-nums">
                      <div className="font-medium text-stone-700">
                        ₹{item.mspPrice.toLocaleString()}
                      </div>
                      <div
                        className={`text-[10px] font-semibold ${
                          aboveMsp ? 'text-emerald-700' : 'text-amber-700'
                        }`}
                      >
                        {aboveMsp ? `+₹${mspDiff} above MSP` : `-₹${Math.abs(mspDiff)} below`}
                      </div>
                    </td>

                    {/* Daily Change */}
                    <td className="py-3.5 px-4 text-right tabular-nums">
                      <div
                        className={`inline-flex items-center gap-0.5 font-bold ${
                          item.dailyChangePercent >= 0
                            ? 'text-emerald-700'
                            : 'text-amber-700'
                        }`}
                      >
                        {item.dailyChangePercent >= 0 ? (
                          <TrendingUp className="w-3.5 h-3.5" />
                        ) : (
                          <TrendingDown className="w-3.5 h-3.5" />
                        )}
                        <span>
                          {item.dailyChangePercent >= 0 ? '+' : ''}
                          {item.dailyChangePercent}%
                        </span>
                      </div>
                    </td>

                    {/* Sparkline Visual (Simple inline SVG) */}
                    <td className="py-3.5 px-4 text-center">
                      <svg width="70" height="24" className="inline-block">
                        <polyline
                          fill="none"
                          stroke={item.dailyChangePercent >= 0 ? '#059669' : '#d97706'}
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          points={item.priceTrend
                            .map((val, idx) => {
                              const min = Math.min(...item.priceTrend);
                              const max = Math.max(...item.priceTrend);
                              const range = max - min || 1;
                              const x = 5 + idx * 12;
                              const y = 20 - ((val - min) / range) * 16;
                              return `${x},${y}`;
                            })
                            .join(' ')}
                        />
                      </svg>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Farmer Selling Revenue Calculator & Mandi Recommendation */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Profit Calculator (7 cols) */}
        <div className="md:col-span-7 bg-white rounded-xl border border-stone-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
            <Calculator className="w-4 h-4 text-emerald-600" />
            <span>
              {lang === 'bn' ? 'ফসলের বিক্রয় মূল্য ও লাভ হিসাব' : 'Gross Farm-Gate Revenue Estimator'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Select Market & Commodity
              </label>
              <select
                value={calcMandiId}
                onChange={(e) => setCalcMandiId(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
              >
                {prices.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.commodity} · {p.mandiName} (₹{p.modalPrice}/Qtl)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Quantity to Sell (Quintals / কুইন্টাল)
              </label>
              <input
                type="number"
                min="1"
                value={calculatorQty}
                onChange={(e) => setCalculatorQty(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
              />
            </div>
          </div>

          {/* Revenue Calculation Results */}
          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 grid grid-cols-3 gap-3 text-center">
            <div>
              <span className="text-[11px] text-stone-500">Gross Realization</span>
              <div className="text-lg font-extrabold text-stone-900 tabular-nums mt-0.5">
                ₹{estimatedRevenue.toLocaleString()}
              </div>
              <span className="text-[10px] text-stone-500 font-mono">at modal rate</span>
            </div>

            <div className="border-x border-stone-200">
              <span className="text-[11px] text-stone-500">At Govt. MSP</span>
              <div className="text-lg font-bold text-stone-700 tabular-nums mt-0.5">
                ₹{mspRevenue.toLocaleString()}
              </div>
              <span className="text-[10px] text-stone-500 font-mono">benchmark</span>
            </div>

            <div>
              <span className="text-[11px] text-stone-500">Net Delta</span>
              <div
                className={`text-lg font-extrabold tabular-nums mt-0.5 ${
                  diffFromMsp >= 0 ? 'text-emerald-700' : 'text-amber-700'
                }`}
              >
                {diffFromMsp >= 0 ? '+' : ''}₹{diffFromMsp.toLocaleString()}
              </div>
              <span className="text-[10px] text-emerald-600 font-medium">
                {diffFromMsp >= 0 ? 'Surplus' : 'Deficit'}
              </span>
            </div>
          </div>
        </div>

        {/* Regional Procurement Advisory (5 cols) */}
        <div className="md:col-span-5 bg-emerald-900 text-white rounded-xl p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300 uppercase tracking-wide">
            <Building2 className="w-4 h-4" />
            <span>Government Procurement Alert</span>
          </div>

          <h3 className="text-base font-bold text-white tracking-tight">
            Kharif MSP Paddy Procurement Active
          </h3>

          <p className="text-xs text-emerald-100 leading-relaxed">
            {lang === 'bn'
              ? 'খরিফ মৌসুমে খাদ্য ও সরবরাহ দপ্তরের সিপিসি (Central Procurement Centers) কেন্দ্রে সরাসরি ধান বিক্রয়ের জন্য কৃষক ডিজিটাল রেজিস্ট্রি আইডি ও ব্যাংক ডিবিটি তথ্য বাধ্যতামূলক।'
              : 'Direct Paddy procurement at central CPC centers is active. Recorded farmers with verified AgriStack D-ID receive direct bank credit within 72 hours of weighing.'}
          </p>

          <div className="pt-2 border-t border-emerald-800 text-xs flex items-center justify-between">
            <span className="text-emerald-200">Govt. Paddy MSP (Grade A):</span>
            <span className="font-extrabold text-white text-sm tabular-nums">₹2,320 / Qtl</span>
          </div>
        </div>
      </div>
    </div>
  );
};
