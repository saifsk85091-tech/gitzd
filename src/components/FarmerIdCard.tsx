import React, { useEffect, useState } from 'react';
import { FarmerCardData, PhotoAdjustments } from '../types/card';
import { generateQrDataUrl } from '../utils/qrGenerator';

interface FarmerIdCardProps {
  farmer: FarmerCardData;
  photoAdjustments?: PhotoAdjustments;
  scale?: number;
}

export const FarmerIdCard: React.FC<FarmerIdCardProps> = ({
  farmer,
  photoAdjustments = { brightness: 100, contrast: 100, zoom: 100, rotation: 0 },
  scale = 1,
}) => {
  const [qrUrl, setQrUrl] = useState<string>('');

  useEffect(() => {
    const payload =
      farmer.qrPayload ||
      `https://agristack.gov.in/verify?id=${farmer.id}&name=${encodeURIComponent(
        farmer.nameEn
      )}&dob=${farmer.dob}&gender=${farmer.gender}&status=UIDAI_VERIFIED`;
    generateQrDataUrl(payload).then(setQrUrl);
  }, [farmer]);

  // Clean AgriStack Logo matching screenshot exactly
  const AgriStackLogo = () => (
    <div className="flex items-center gap-0.5 select-none font-sans leading-none">
      <span className="text-white text-lg font-extrabold tracking-tight flex items-center">
        Agr
        <span className="relative inline-block">
          i
          {/* Sprout leaf on top of 'i' */}
          <svg
            className="absolute -top-1.5 -right-0.5 w-2.5 h-2.5 text-[#4ade80]"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12c0 3.31 1.61 6.25 4.09 8.08C7.14 18.25 9.4 16.5 12 16.5s4.86 1.75 5.91 3.58C20.39 18.25 22 15.31 22 12c0-5.52-4.48-10-10-10z" />
          </svg>
        </span>
      </span>
      {/* Curved Green Sprout 'S' */}
      <span className="text-[#22c55e] text-2xl font-black italic -ml-0.5 transform -skew-x-6">
        S
      </span>
      {/* Orange 'tack' */}
      <span className="text-[#f59e0b] text-lg font-black tracking-tight -ml-0.5">
        tack
      </span>
    </div>
  );

  // Turbaned Farmer Emblem on top-right matching screenshot exactly
  const FarmerEmblem = () => (
    <div className="w-8 h-8 rounded-full bg-white border-2 border-[#d97706] p-0.5 flex items-center justify-center shadow-xs shrink-0 overflow-hidden">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="48" fill="#ffffff" />
        {/* Saffron / Orange Turban */}
        <path d="M 28 42 Q 50 16 74 40 Q 82 28 50 20 Q 22 28 28 42 Z" fill="#ea580c" />
        <ellipse cx="50" cy="36" rx="22" ry="12" fill="#f97316" />
        <circle cx="48" cy="24" r="5" fill="#facc15" />
        {/* Face */}
        <circle cx="50" cy="52" r="16" fill="#d4a373" />
        {/* Mustache */}
        <path d="M 40 56 Q 50 62 60 56 Q 50 67 40 56 Z" fill="#2d3748" />
        <circle cx="44" cy="48" r="1.8" fill="#1e293b" />
        <circle cx="56" cy="48" r="1.8" fill="#1e293b" />
        {/* Kurta & Golden Wheat Sheaf */}
        <path d="M 30 85 L 38 66 Q 50 72 62 66 L 70 85 Z" fill="#1e40af" />
        {/* Golden wheat sheaf in farmer hand */}
        <path d="M 66 52 Q 74 44 80 34 M 68 48 Q 78 44 82 40 M 67 56 Q 76 56 82 52" stroke="#eab308" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </div>
  );

  // Guilloche rosette decorative background pattern
  const GuillocheBackground = () => (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden opacity-[0.22]">
      <svg viewBox="0 0 400 250" className="w-full h-full" preserveAspectRatio="none">
        <g stroke="#94a3b8" strokeWidth="0.6" fill="none">
          {Array.from({ length: 18 }).map((_, i) => (
            <ellipse
              key={i}
              cx="200"
              cy="125"
              rx={60 + i * 7}
              ry={35 + i * 5}
              transform={`rotate(${i * 10} 200 125)`}
              stroke="rgba(120, 160, 120, 0.45)"
            />
          ))}
          <circle cx="200" cy="125" r="50" stroke="rgba(180, 200, 160, 0.6)" strokeWidth="0.8" />
          <circle cx="200" cy="125" r="75" stroke="rgba(180, 200, 160, 0.4)" strokeWidth="0.8" />
        </g>
      </svg>
    </div>
  );

  return (
    <div
      className="flex flex-col xl:flex-row items-center justify-center gap-8 select-none"
      style={{ transform: `scale(${scale})`, transformOrigin: 'top center' }}
    >
      {/* ======================= FRONT OF CARD ======================= */}
      <div
        className="pvc-card relative rounded-2xl overflow-hidden shadow-xl border border-stone-200/90 bg-white flex flex-col justify-between text-stone-900"
        style={{
          width: '85.6mm',
          height: '53.98mm',
          boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.18), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        }}
      >
        <GuillocheBackground />

        {/* Top Header Bar */}
        <div className="relative z-10 bg-[#0a6836] px-3.5 py-1.5 flex items-center justify-between border-b-2 border-[#d4af37]">
          <AgriStackLogo />
          <FarmerEmblem />
        </div>

        {/* Card Main Body */}
        <div className="relative z-10 px-3.5 pt-1.5 pb-1 flex-1 flex flex-col justify-between">
          {/* Card Title */}
          <div className="text-center">
            <h2 className="text-[9.5px] font-black tracking-wider text-[#0a6836] uppercase font-sans leading-none">
              AGRI STACK DIGITAL FARMER ID CARD
            </h2>
          </div>

          {/* 3-Column Content Layout (Photo & ID | Credentials | QR Code) */}
          <div className="flex items-center justify-between gap-3 my-auto">
            {/* Left: Photo & Farmer ID */}
            <div className="flex flex-col items-center shrink-0">
              <div className="w-[19mm] h-[23mm] rounded-2xl overflow-hidden border-[2.5px] border-[#16a34a] bg-stone-100 shadow-xs">
                <img
                  src={farmer.photoUrl}
                  alt={farmer.nameEn}
                  className="w-full h-full object-cover"
                  style={{
                    filter: `brightness(${photoAdjustments.brightness}%) contrast(${photoAdjustments.contrast}%)`,
                    transform: `scale(${photoAdjustments.zoom / 100}) rotate(${photoAdjustments.rotation}deg)`,
                  }}
                />
              </div>

              {/* Farmer ID block below photo */}
              <div className="text-center mt-1">
                <span className="text-[7.5px] text-stone-500 font-semibold block leading-tight">
                  Farmer ID:
                </span>
                <span className="text-[10px] font-extrabold text-stone-900 tracking-wider font-mono block leading-tight">
                  {farmer.id}
                </span>
              </div>
            </div>

            {/* Middle: Farmer Personal Details */}
            <div className="flex-1 space-y-1.5 text-left pl-1">
              {/* Farmer Name */}
              <div>
                <h3 className="text-[11.5px] font-black text-stone-900 tracking-tight leading-none uppercase">
                  {farmer.nameEn}
                </h3>
              </div>

              {/* Grid: DOB and GENDER */}
              <div className="grid grid-cols-2 gap-2 text-[7px] leading-tight">
                <div>
                  <span className="text-stone-500 font-bold block uppercase tracking-tight">
                    DOB:
                  </span>
                  <span className="font-extrabold text-stone-900 text-[8.5px] tabular-nums">
                    {farmer.dob}
                  </span>
                </div>

                <div>
                  <span className="text-stone-500 font-bold block uppercase tracking-tight">
                    GENDER:
                  </span>
                  <span className="font-extrabold text-stone-900 text-[8.5px]">
                    {farmer.gender}
                  </span>
                </div>
              </div>

              {/* Father / Guardian */}
              <div className="text-[7px] leading-tight">
                <span className="text-stone-500 font-bold block uppercase tracking-tight">
                  FATHER / GUARDIAN:
                </span>
                <span className="font-extrabold text-stone-900 text-[8px] truncate block">
                  {farmer.guardianNameEn || 'N/A'}
                </span>
              </div>
            </div>

            {/* Right: QR Code and UIDAI Verification Pill */}
            <div className="flex flex-col items-center shrink-0">
              <div className="w-[18mm] h-[18mm] bg-white p-1 rounded-xl border border-stone-200/90 shadow-xs flex items-center justify-center">
                {qrUrl ? (
                  <img src={qrUrl} alt="AgriStack QR" className="w-full h-full object-contain" />
                ) : (
                  <div className="w-full h-full bg-stone-100 rounded-md animate-pulse" />
                )}
              </div>

              <span className="text-[6px] font-medium text-stone-600 mt-1 block leading-none">
                Scan to Verify
              </span>

              {/* UIDAI Verified Badge Pill */}
              <div className="mt-1 px-1.5 py-0.5 bg-[#e6f8ee] border border-[#a3e4be] rounded-full flex items-center gap-0.5 shadow-2xs">
                <span className="text-[#0a8244] text-[6.5px] font-bold">✓</span>
                <span className="text-[#0a8244] text-[6.5px] font-bold whitespace-nowrap">
                  UIDAI Verified
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer Bar */}
        <div className="relative z-10 bg-[#0a6836] px-3.5 py-1 border-t-2 border-[#d4af37] flex items-center justify-between text-[6.5px]">
          <span className="text-white font-bold tracking-wider uppercase">
            DIGITAL PUBLIC INFRASTRUCTURE FOR AGRICULTURE
          </span>
          <span className="text-[#fde047] font-black tracking-wider uppercase">
            AGRISTACK.GOV.IN
          </span>
        </div>
      </div>

      {/* ======================= BACK OF CARD ======================= */}
      <div
        className="pvc-card relative rounded-2xl overflow-hidden shadow-xl border border-stone-200/90 bg-white flex flex-col justify-between text-stone-900"
        style={{
          width: '85.6mm',
          height: '53.98mm',
          boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.18), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        }}
      >
        <GuillocheBackground />

        {/* Top Header Bar */}
        <div className="relative z-10 bg-[#0a6836] px-3.5 py-1.5 flex items-center justify-between border-b-2 border-[#d4af37]">
          <AgriStackLogo />
          <div className="text-right">
            <span className="text-white text-[7.5px] font-black uppercase tracking-wider block">
              LANDHOLDING & CADASTRAL RECORD
            </span>
            <span className="text-[#fde047] text-[6px] font-bold font-mono">
              DIRECTORATE OF AGRICULTURE
            </span>
          </div>
        </div>

        {/* Back Body Content */}
        <div className="relative z-10 px-3.5 py-1 flex-1 flex flex-col justify-between text-[7px] text-stone-800">
          {/* Address */}
          <div className="leading-tight">
            <span className="text-stone-500 font-bold uppercase">Permanent Address: </span>
            <span className="font-extrabold text-stone-900">
              {farmer.village}, {farmer.block}, {farmer.district}, {farmer.state} - {farmer.pincode}
            </span>
          </div>

          {/* Cadastral Land Table */}
          <div className="rounded-lg border border-stone-300 overflow-hidden bg-white/90 shadow-2xs">
            <table className="w-full text-left border-collapse text-[6.5px]">
              <thead>
                <tr className="bg-stone-100 text-stone-700 font-black border-b border-stone-300">
                  <th className="py-0.5 px-1.5 border-r border-stone-300">Dag / Plot No</th>
                  <th className="py-0.5 px-1.5 border-r border-stone-300">Khatian No</th>
                  <th className="py-0.5 px-1.5 border-r border-stone-300 text-center">Area (Acres / Bighas)</th>
                  <th className="py-0.5 px-1.5">Soil Classification</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="py-0.5 px-1.5 font-bold text-[#0a6836] border-r border-stone-200">
                    {farmer.dagNumbers}
                  </td>
                  <td className="py-0.5 px-1.5 font-semibold text-stone-800 border-r border-stone-200">
                    {farmer.khatianNumber}
                  </td>
                  <td className="py-0.5 px-1.5 text-center font-bold text-stone-900 border-r border-stone-200 tabular-nums">
                    {farmer.totalAcres} Acres ({farmer.totalBighas} Bighas)
                  </td>
                  <td className="py-0.5 px-1.5 text-stone-600 truncate">
                    {farmer.soilType}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Linked Bank & Support Info */}
          <div className="grid grid-cols-2 gap-2 p-1.5 bg-emerald-50/70 rounded-lg border border-emerald-200 text-[6.5px] leading-tight">
            <div>
              <span className="text-stone-500 font-bold block">DIRECT BENEFIT BANK:</span>
              <span className="font-extrabold text-[#0a6836] truncate block">
                {farmer.bankMasked}
              </span>
              <span className="text-[6px] text-stone-500 font-mono">IFSC: {farmer.ifsc}</span>
            </div>
            <div>
              <span className="text-stone-500 font-bold block">GOVERNMENT SUBSIDY:</span>
              <span className="font-extrabold text-stone-900 block">
                PM-KISAN & e-KYC Active
              </span>
              <span className="text-[6px] text-stone-500 font-mono">Helpline: 1800-180-1551</span>
            </div>
          </div>

          {/* Barcode Strip */}
          <div className="flex items-center justify-between border-t border-stone-200 pt-0.5">
            <div className="flex flex-col">
              <svg width="125" height="11" className="overflow-hidden">
                {Array.from({ length: 44 }).map((_, i) => (
                  <rect
                    key={i}
                    x={i * 2.8}
                    y="0"
                    width={i % 3 === 0 ? 1.8 : 0.9}
                    height="11"
                    fill="#1e293b"
                  />
                ))}
              </svg>
              <span className="text-[5.5px] font-mono text-stone-600 font-bold tracking-widest text-center leading-none mt-0.5">
                *{farmer.id}*
              </span>
            </div>

            <div className="text-right text-[5.5px] text-stone-500 font-mono">
              <div>Valid across all APMC Mandis</div>
              <div className="font-bold text-stone-700">Digital Cadastral Seal Verified</div>
            </div>
          </div>
        </div>

        {/* Bottom Footer Bar */}
        <div className="relative z-10 bg-[#0a6836] px-3.5 py-1 border-t-2 border-[#d4af37] flex items-center justify-between text-[6.5px]">
          <span className="text-white font-bold tracking-wider uppercase">
            MINISTRY OF AGRICULTURE & FARMERS WELFARE
          </span>
          <span className="text-[#fde047] font-black tracking-wider uppercase">
            AGRISTACK.GOV.IN
          </span>
        </div>
      </div>
    </div>
  );
};
