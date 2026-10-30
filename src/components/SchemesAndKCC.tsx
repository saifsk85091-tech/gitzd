import React, { useState } from 'react';
import { AgroScheme } from '../types/agristack';
import { Language, translations } from '../i18n/translations';
import {
  CreditCard,
  Landmark,
  ShieldCheck,
  Calculator,
  ExternalLink,
  CheckCircle2,
  Percent,
  Banknote,
  Sparkles,
} from 'lucide-react';

interface SchemesAndKCCProps {
  schemes: AgroScheme[];
  lang: Language;
}

export const SchemesAndKCC: React.FC<SchemesAndKCCProps> = ({ schemes, lang }) => {
  const t = translations[lang];

  // KCC Calculator State
  const [selectedCrop, setSelectedCrop] = useState<string>('paddy');
  const [acresInput, setAcresInput] = useState<string>('3.0');

  // Scale of finance per acre in INR (DLTC norms)
  const scaleOfFinance: Record<string, { perAcre: number; name: string }> = {
    paddy: { perAcre: 34000, name: 'Paddy / ধান' },
    potato: { perAcre: 68000, name: 'Potato / আলু' },
    mustard: { perAcre: 24000, name: 'Mustard / সরিষা' },
    jute: { perAcre: 31000, name: 'Jute / পাট' },
    vegetables: { perAcre: 45000, name: 'Vegetables / সবজি' },
  };

  const currentScale = scaleOfFinance[selectedCrop] || scaleOfFinance.paddy;
  const acreage = parseFloat(acresInput) || 0;
  const eligibleCredit = Math.min(Math.round(acreage * currentScale.perAcre), 300000);

  // Interest calculation
  const standardInterest = eligibleCredit * 0.07; // 7%
  const subsidizedInterest = eligibleCredit * 0.04; // Effective 4% with 3% prompt repayment incentive
  const annualSavings = standardInterest - subsidizedInterest;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-stone-200 pb-5">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 tracking-wide uppercase">
          <span>Digital Public Finance</span>
          <span aria-hidden="true">·</span>
          <span>Direct Benefit Transfer & Subsidized Agricultural Credit</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mt-1">
          {t.schemesHeading}
        </h2>
        <p className="text-sm text-stone-600 max-w-3xl mt-1">
          {t.schemesSubheading}
        </p>
      </div>

      {/* Interactive KCC Loan Calculator Section */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs space-y-5">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-emerald-700" />
            <h3 className="text-base font-bold text-stone-900">
              {t.kccCalculator}
            </h3>
          </div>
          <span className="text-xs text-emerald-800 font-semibold bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
            RBI Subsidized 4% Effective Rate
          </span>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              {t.cropTypeLabel}
            </label>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
            >
              <option value="paddy">Aman / Boro Paddy (ধান) - Scale: ₹34,000 / Acre</option>
              <option value="potato">Rabi Potato (আলু) - Scale: ₹68,000 / Acre</option>
              <option value="mustard">Rabi Mustard (সরিষা) - Scale: ₹24,000 / Acre</option>
              <option value="jute">Jute (পাট) - Scale: ₹31,000 / Acre</option>
              <option value="vegetables">Commercial Vegetables (সবজি) - Scale: ₹45,000 / Acre</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              {t.landAcresLabel}
            </label>
            <input
              type="number"
              step="0.5"
              min="0.5"
              max="20"
              value={acresInput}
              onChange={(e) => setAcresInput(e.target.value)}
              className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
            />
          </div>
        </div>

        {/* Dynamic Calculation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-stone-50 rounded-xl border border-stone-200 text-center">
          <div>
            <span className="text-[11px] text-stone-500">{t.eligibleCredit}</span>
            <div className="text-xl font-black text-stone-900 tabular-nums mt-0.5">
              ₹{eligibleCredit.toLocaleString()}
            </div>
            <span className="text-[10px] text-stone-500">
              {eligibleCredit <= 160000 ? 'Collateral-free eligible' : 'Mortgage required (>1.6L)'}
            </span>
          </div>

          <div className="border-x border-stone-200">
            <span className="text-[11px] text-stone-500">{t.effectiveInterest}</span>
            <div className="text-xl font-black text-emerald-700 tabular-nums mt-0.5">
              4.0% <span className="text-xs font-normal text-stone-600">p.a.</span>
            </div>
            <span className="text-[10px] text-emerald-600 font-medium">
              3% Prompt Repayment Rebate
            </span>
          </div>

          <div>
            <span className="text-[11px] text-stone-500">{t.annualSavings}</span>
            <div className="text-xl font-black text-stone-900 tabular-nums mt-0.5">
              ₹{Math.round(annualSavings).toLocaleString()}
            </div>
            <span className="text-[10px] text-stone-500 font-mono">
              saved vs commercial loan
            </span>
          </div>
        </div>
      </div>

      {/* DBT Scheme Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {schemes.map((scheme) => (
          <div
            key={scheme.id}
            className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs hover:border-emerald-500/60 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[11px] font-mono font-semibold text-emerald-800">
                    {scheme.code}
                  </span>
                  <h3 className="text-base font-bold text-stone-900 tracking-tight mt-0.5">
                    {lang === 'bn' ? scheme.titleBn : scheme.titleEn}
                  </h3>
                </div>

                <div className="flex items-center gap-1 text-xs text-emerald-700 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{scheme.status}</span>
                </div>
              </div>

              {/* Benefit Amount Callout */}
              <div className="mt-3 p-2.5 rounded-lg bg-emerald-50/70 border border-emerald-100 text-xs font-semibold text-emerald-950">
                Grant / Benefit: <span className="font-extrabold">{scheme.benefitAmount}</span>
              </div>

              {/* Eligibility description */}
              <p className="mt-3 text-xs text-stone-600 leading-relaxed">
                {lang === 'bn' ? scheme.eligibilityBn : scheme.eligibilityEn}
              </p>
            </div>

            {/* Bottom action */}
            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
              <span className="text-[11px] text-stone-500">
                Category: <strong>{scheme.category}</strong>
              </span>

              <a
                href={scheme.linkOfficial}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-900 transition-colors"
              >
                <span>{t.applySchemeBtn}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
