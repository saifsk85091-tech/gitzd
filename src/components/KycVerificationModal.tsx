import React, { useState } from 'react';
import { Farmer } from '../types/agristack';
import { Language, translations } from '../i18n/translations';
import {
  ShieldCheck,
  Search,
  CheckCircle2,
  AlertCircle,
  X,
  CreditCard,
  Building,
  Landmark,
  User,
} from 'lucide-react';

interface KycVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  farmers: Farmer[];
  lang: Language;
}

export const KycVerificationModal: React.FC<KycVerificationModalProps> = ({
  isOpen,
  onClose,
  farmers,
  lang,
}) => {
  if (!isOpen) return null;
  const t = translations[lang];

  const [inputVal, setInputVal] = useState('8921');
  const [matchedFarmer, setMatchedFarmer] = useState<Farmer | null>(farmers[0]);
  const [isSearching, setIsSearching] = useState(false);
  const [searched, setSearched] = useState(true);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setSearched(true);

    setTimeout(() => {
      const query = inputVal.trim().toLowerCase();
      const match = farmers.find(
        (f) =>
          f.id.toLowerCase().includes(query) ||
          f.aadhaarMasked.includes(query) ||
          f.phone.includes(query) ||
          f.name.toLowerCase().includes(query)
      );

      setMatchedFarmer(match || null);
      setIsSearching(false);
    }, 350);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-stone-200 overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-emerald-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <div>
              <div className="text-xs text-emerald-300 uppercase font-semibold tracking-wider">
                Digital Public Infrastructure
              </div>
              <h3 className="text-sm font-bold text-white">
                Kisan e-KYC & Land Record Verification
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-white p-1 rounded-md"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search input form */}
        <div className="p-6 space-y-4">
          <form onSubmit={handleVerify} className="space-y-3">
            <label className="block text-xs font-semibold text-stone-700">
              Enter Kisan D-ID, Aadhaar Number, or Mobile (কিষাণ আইডি বা আধার নম্বর)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="e.g. 8921 or KID-WB-2024-8921"
                className="flex-1 px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
              />
              <button
                type="submit"
                disabled={isSearching}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer whitespace-nowrap"
              >
                {isSearching ? 'Verifying...' : 'Verify Record'}
              </button>
            </div>
            <div className="text-[11px] text-stone-500">
              Try sample digits: <button type="button" onClick={() => setInputVal('8921')} className="underline text-emerald-700 font-semibold cursor-pointer">8921 (Subhash Ghosh)</button> or <button type="button" onClick={() => setInputVal('5114')} className="underline text-emerald-700 font-semibold cursor-pointer">5114 (Anwara Begum)</button>
            </div>
          </form>

          {/* Verification Results Panel */}
          {matchedFarmer ? (
            <div className="p-4 bg-emerald-50/70 rounded-xl border border-emerald-200 space-y-3 animate-in fade-in">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs font-bold text-emerald-900">
                    {matchedFarmer.name}
                  </div>
                  <div className="text-[11px] text-emerald-800 font-mono">
                    {matchedFarmer.id} · {matchedFarmer.district}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-white px-2 py-0.5 rounded-md border border-emerald-300 shadow-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Aadhaar e-KYC Active</span>
                </div>
              </div>

              {/* Status checklist */}
              <div className="space-y-1.5 text-xs text-stone-800 pt-2 border-t border-emerald-200/60 divide-y divide-emerald-100">
                <div className="flex justify-between items-center py-1">
                  <span className="text-stone-600">Cadastral Parcels Linked:</span>
                  <span className="font-semibold text-emerald-950">
                    {matchedFarmer.plots.join(', ')} ({matchedFarmer.totalLandAcres} Acres)
                  </span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-stone-600">NPCI Direct Benefit Bank:</span>
                  <span className="font-mono font-medium text-emerald-950">
                    {matchedFarmer.bankAccountMasked} (Seeded)
                  </span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-stone-600">PM-KISAN 17th Installment:</span>
                  <span className="font-semibold text-emerald-700 tabular-nums">
                    ₹2,000 Transferred (Total: ₹{matchedFarmer.dbtStatus.pmKisanTotalDisbursed.toLocaleString()})
                  </span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-stone-600">Krishak Bandhu DBT:</span>
                  <span className="font-semibold text-emerald-700">
                    {matchedFarmer.dbtStatus.krishakBandhuStatus}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-stone-600">Crop Insurance (PMFBY):</span>
                  <span className="font-mono text-emerald-900 text-[11px]">
                    {matchedFarmer.dbtStatus.cropInsurancePolicy}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            searched && (
              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">No Matching AgriStack Record Found</span>
                  <p className="mt-0.5 text-amber-800 leading-relaxed">
                    The entered identification does not match verified farmers in Purba Bardhaman or Hooghly registry. Please visit your local Krishi Prajukti Sahayak (KPS) block office or enroll as a new farmer.
                  </p>
                </div>
              </div>
            )
          )}

          <div className="pt-2 flex justify-end">
            <button
              onClick={onClose}
              className="py-2 px-4 rounded-lg bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
