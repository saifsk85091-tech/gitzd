import React, { useState } from 'react';
import { Farmer } from '../types/agristack';
import { Language, translations } from '../i18n/translations';
import {
  Search,
  UserPlus,
  ShieldCheck,
  AlertCircle,
  FileCheck2,
  Landmark,
  CreditCard,
  QrCode,
  X,
  Printer,
  ChevronRight,
} from 'lucide-react';

interface FarmerRegistryProps {
  farmers: Farmer[];
  onAddFarmer: (newFarmer: Farmer) => void;
  lang: Language;
}

export const FarmerRegistry: React.FC<FarmerRegistryProps> = ({
  farmers,
  onAddFarmer,
  lang,
}) => {
  const t = translations[lang];
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [activeFarmerModal, setActiveFarmerModal] = useState<Farmer | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // New Farmer Form State
  const [newFarmerName, setNewFarmerName] = useState('');
  const [newFarmerPhone, setNewFarmerPhone] = useState('');
  const [newFarmerVillage, setNewFarmerVillage] = useState('');
  const [newFarmerDistrict, setNewFarmerDistrict] = useState('Purba Bardhaman');
  const [newFarmerAcres, setNewFarmerAcres] = useState('');
  const [newFarmerDag, setNewFarmerDag] = useState('');
  const [newFarmerCrop, setNewFarmerCrop] = useState('Paddy (Swarna Sub-1)');

  const filteredFarmers = farmers.filter((f) => {
    const matchesSearch =
      f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.nameBn.includes(searchTerm) ||
      f.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.aadhaarMasked.includes(searchTerm) ||
      f.village.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDistrict =
      selectedDistrict === 'all' || f.district === selectedDistrict;

    return matchesSearch && matchesDistrict;
  });

  const handleRegisterFarmer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFarmerName.trim()) return;

    const acresNum = parseFloat(newFarmerAcres) || 2.0;
    const newId = `KID-WB-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const newFarmer: Farmer = {
      id: newId,
      name: newFarmerName.trim(),
      nameBn: newFarmerName.trim(),
      phone: newFarmerPhone.trim() || '+91 98000 00000',
      village: newFarmerVillage.trim() || 'Rampur',
      block: 'Sadar Block',
      district: newFarmerDistrict,
      state: 'West Bengal',
      totalLandAcres: acresNum,
      totalLandBighas: Number((acresNum * 3.025).toFixed(1)),
      plots: [newFarmerDag.trim() || `DAG-${Math.floor(500 + Math.random() * 100)}`],
      kycStatus: 'VERIFIED',
      aadhaarMasked: 'XXXX-XXXX-9912',
      bankAccountMasked: 'SBI ···· 8011',
      primaryCrop: newFarmerCrop,
      season: 'Kharif',
      registrationDate: 'Just Now',
      dbtStatus: {
        pmKisanInstallment: 17,
        pmKisanTotalDisbursed: 34000,
        krishakBandhuStatus: 'Approved',
        cropInsurancePolicy: `PMFBY-WB-2026-${Math.floor(10000 + Math.random() * 90000)}`,
        kccApprovedLimit: 140000,
        kccUtilized: 0,
      },
    };

    onAddFarmer(newFarmer);
    setShowAddModal(false);
    setActiveFarmerModal(newFarmer); // Show their newly minted digital ID card!

    // Reset form
    setNewFarmerName('');
    setNewFarmerPhone('');
    setNewFarmerVillage('');
    setNewFarmerAcres('');
    setNewFarmerDag('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 tracking-wide uppercase">
            <span>National Farmer Registry</span>
            <span aria-hidden="true">·</span>
            <span>Aadhaar e-KYC Linked</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mt-1">
            {t.farmerHeading}
          </h2>
          <p className="text-sm text-stone-600 max-w-3xl mt-1">
            {t.farmerSubheading}
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 active:scale-[0.98] text-white text-xs font-semibold shadow-xs transition-all cursor-pointer whitespace-nowrap self-start md:self-auto"
        >
          <UserPlus className="w-4 h-4 text-emerald-200" />
          <span>{t.addFarmerBtn}</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 bg-white p-3 rounded-xl border border-stone-200 shadow-xs">
        <div className="sm:col-span-8 relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-emerald-600"
          />
        </div>

        <div className="sm:col-span-4 flex items-center gap-2">
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            aria-label="Filter farmers by district"
            className="w-full py-2 px-3 bg-stone-50 border border-stone-200 rounded-lg text-xs sm:text-sm text-stone-800 focus:outline-none focus:ring-1 focus:ring-emerald-600"
          >
            <option value="all">{t.allDistricts}</option>
            <option value="Purba Bardhaman">Purba Bardhaman</option>
            <option value="Hooghly">Hooghly</option>
            <option value="Nadia">Nadia</option>
            <option value="Murshidabad">Murshidabad</option>
            <option value="Malda">Malda</option>
          </select>
        </div>
      </div>

      {/* Farmer Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredFarmers.map((farmer) => (
          <div
            key={farmer.id}
            className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs hover:border-emerald-500/60 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Top row: Name & KYC Status (No pill badge sandwiches - clean unboxed typography) */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-stone-900 tracking-tight">
                    {farmer.name}
                  </h3>
                  <div className="text-xs text-stone-500 font-medium">
                    <span>{farmer.nameBn}</span>
                    <span className="mx-1.5" aria-hidden="true">·</span>
                    <span className="font-mono text-emerald-800">{farmer.id}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs">
                  {farmer.kycStatus === 'VERIFIED' ? (
                    <div className="flex items-center gap-1 text-emerald-700 font-semibold">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>{t.kycVerified}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-amber-700 font-semibold">
                      <AlertCircle className="w-4 h-4 text-amber-600" />
                      <span>{t.kycAction}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Location & Landholding unboxed text metadata */}
              <div className="mt-3 flex items-center gap-2 text-xs text-stone-600">
                <span>{farmer.village}, {farmer.district}</span>
                <span aria-hidden="true">·</span>
                <span className="font-medium text-stone-800">
                  {farmer.totalLandAcres} Acres ({farmer.totalLandBighas} Bighas)
                </span>
              </div>

              {/* Data Strip */}
              <div className="mt-4 grid grid-cols-3 gap-2 p-2.5 bg-stone-50 rounded-lg border border-stone-100 text-xs">
                <div>
                  <div className="text-[11px] text-stone-500">Parcels</div>
                  <div className="font-semibold text-stone-800 mt-0.5">
                    {farmer.plots.join(', ')}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-stone-500">Bank DBT</div>
                  <div className="font-mono text-stone-800 mt-0.5">
                    {farmer.bankAccountMasked}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-stone-500">PM-KISAN DBT</div>
                  <div className="font-semibold text-emerald-700 tabular-nums mt-0.5">
                    ₹{farmer.dbtStatus.pmKisanTotalDisbursed.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions footer */}
            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
              <span className="text-[11px] text-stone-500">
                Primary: <strong className="text-stone-700">{farmer.primaryCrop}</strong>
              </span>

              <button
                onClick={() => setActiveFarmerModal(farmer)}
                className="flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-900 transition-colors cursor-pointer"
              >
                <span>{t.viewDossier}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Digital Kisan Card Modal */}
      {activeFarmerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl border border-stone-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-emerald-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Landmark className="w-5 h-5 text-emerald-300" />
                <div>
                  <div className="text-xs text-emerald-200 uppercase font-semibold tracking-wider">
                    Ministry of Agriculture & Farmers Welfare
                  </div>
                  <div className="text-sm font-bold">Digital Kisan Identity Card</div>
                </div>
              </div>
              <button
                onClick={() => setActiveFarmerModal(null)}
                aria-label="Close Kisan Identity Card"
                className="text-emerald-200 hover:text-white p-1 rounded-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Card Body */}
            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-xl font-extrabold text-stone-900">
                    {activeFarmerModal.name}
                  </div>
                  <div className="text-sm font-semibold text-stone-600">
                    {activeFarmerModal.nameBn}
                  </div>
                  <div className="font-mono text-xs font-bold text-emerald-700 mt-1">
                    ID: {activeFarmerModal.id}
                  </div>
                  <div className="text-xs text-stone-600">
                    {activeFarmerModal.village}, {activeFarmerModal.block}, {activeFarmerModal.district}
                  </div>
                </div>

                {/* Simulated QR & Biometric Seal */}
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-stone-100 border border-stone-300 rounded-lg flex items-center justify-center p-1.5">
                    <QrCode className="w-full h-full text-stone-800" />
                  </div>
                  <span className="text-[10px] text-stone-500 font-mono mt-1">VERIFIED e-KYC</span>
                </div>
              </div>

              {/* Data Table */}
              <div className="bg-stone-50 rounded-xl p-3.5 border border-stone-200 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-stone-500">Aadhaar (Encrypted):</span>
                  <span className="font-mono font-medium text-stone-800">
                    {activeFarmerModal.aadhaarMasked}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Registered Land:</span>
                  <span className="font-semibold text-stone-900">
                    {activeFarmerModal.totalLandAcres} Acres ({activeFarmerModal.totalLandBighas} Bighas)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Cadastral Plots:</span>
                  <span className="font-medium text-stone-800">
                    {activeFarmerModal.plots.join(', ')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Linked Bank DBT:</span>
                  <span className="font-mono font-medium text-stone-800">
                    {activeFarmerModal.bankAccountMasked}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">PMFBY Insurance Policy:</span>
                  <span className="font-mono font-medium text-emerald-800">
                    {activeFarmerModal.dbtStatus.cropInsurancePolicy}
                  </span>
                </div>
                <div className="flex justify-between pt-1 border-t border-stone-200">
                  <span className="text-stone-500">Approved KCC Credit:</span>
                  <span className="font-semibold text-emerald-700 tabular-nums">
                    ₹{activeFarmerModal.dbtStatus.kccApprovedLimit.toLocaleString()} (Effective 4%)
                  </span>
                </div>
              </div>

              {/* Print and Close Action */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => window.print()}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>{t.printKisanCard}</span>
                </button>
                <button
                  onClick={() => setActiveFarmerModal(null)}
                  className="py-2.5 px-4 rounded-lg border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-100 transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add New Farmer Registration Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl border border-stone-200 overflow-hidden">
            <div className="px-6 py-4 bg-stone-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold">{t.addFarmerBtn}</h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                aria-label="Close Registration Form"
                className="text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRegisterFarmer} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Farmer Full Name (কৃষকের নাম) *
                </label>
                <input
                  type="text"
                  required
                  value={newFarmerName}
                  onChange={(e) => setNewFarmerName(e.target.value)}
                  placeholder="e.g. Ramesh Chandra Das"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Mobile Number (মোবাইল)
                  </label>
                  <input
                    type="tel"
                    value={newFarmerPhone}
                    onChange={(e) => setNewFarmerPhone(e.target.value)}
                    placeholder="+91 98321 00000"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Village / Mouza (মৌজা / গ্রাম)
                  </label>
                  <input
                    type="text"
                    value={newFarmerVillage}
                    onChange={(e) => setNewFarmerVillage(e.target.value)}
                    placeholder="e.g. Galsi / Singur"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    District (জেলা)
                  </label>
                  <select
                    value={newFarmerDistrict}
                    onChange={(e) => setNewFarmerDistrict(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                  >
                    <option value="Purba Bardhaman">Purba Bardhaman</option>
                    <option value="Hooghly">Hooghly</option>
                    <option value="Nadia">Nadia</option>
                    <option value="Murshidabad">Murshidabad</option>
                    <option value="Malda">Malda</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Landholding (Acres)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={newFarmerAcres}
                    onChange={(e) => setNewFarmerAcres(e.target.value)}
                    placeholder="e.g. 3.5"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Dag / Plot Number
                  </label>
                  <input
                    type="text"
                    value={newFarmerDag}
                    onChange={(e) => setNewFarmerDag(e.target.value)}
                    placeholder="e.g. DAG-512"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Primary Sown Crop
                  </label>
                  <select
                    value={newFarmerCrop}
                    onChange={(e) => setNewFarmerCrop(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                  >
                    <option value="Paddy (Swarna Sub-1)">Paddy (ধান)</option>
                    <option value="Potato (Kufri Jyoti)">Potato (আলু)</option>
                    <option value="Jute (JRO-524)">Jute (পাট)</option>
                    <option value="Mustard (B-9)">Mustard (সরিষা)</option>
                    <option value="Vegetables">Vegetables (সবজি)</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-stone-300 rounded-lg text-xs font-semibold text-stone-700 hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold shadow-xs"
                >
                  Generate Kisan D-ID
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
