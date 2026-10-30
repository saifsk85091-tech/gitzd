import { FarmerCardData } from '../types/card';

// High quality clean SVG portrait for Rajib Chatterjee and other farmers
const createRajibPortraitSvg = () => {
  // Uses a photorealistic or clean stylized SVG portrait matching the sample photo
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 240" width="200" height="240">
    <rect width="200" height="240" fill="%23edf2f7"/>
    <!-- Head -->
    <ellipse cx="100" cy="95" rx="42" ry="52" fill="%23d4a373"/>
    <!-- Short Hair with grey highlights -->
    <path d="M 58 85 Q 100 35 142 85 Q 148 60 100 50 Q 52 60 58 85 Z" fill="%234a5568"/>
    <path d="M 64 78 Q 100 45 136 78" stroke="%23cbd5e1" stroke-width="2" fill="none" opacity="0.6"/>
    <!-- Ears -->
    <ellipse cx="56" cy="98" rx="6" ry="12" fill="%23c5915d"/>
    <ellipse cx="144" cy="98" rx="6" ry="12" fill="%23c5915d"/>
    <!-- Eyebrows -->
    <path d="M 72 75 Q 85 72 95 76" stroke="%232d3748" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <path d="M 105 76 Q 115 72 128 75" stroke="%232d3748" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <!-- Eyes -->
    <circle cx="84" cy="85" r="4.5" fill="%231a202c"/>
    <circle cx="116" cy="85" r="4.5" fill="%231a202c"/>
    <!-- Nose -->
    <path d="M 100 85 L 97 104 L 103 104" stroke="%23b07d4b" stroke-width="2" fill="none"/>
    <!-- Mustache -->
    <path d="M 76 112 Q 100 114 124 112 Q 100 126 76 112 Z" fill="%232d3748"/>
    <!-- Mouth -->
    <path d="M 88 126 Q 100 129 112 126" stroke="%239c6644" stroke-width="2" fill="none"/>
    <!-- Neck -->
    <rect x="85" y="140" width="30" height="25" fill="%23c5915d"/>
    <!-- Blue Striped Polo Shirt as in screenshot -->
    <path d="M 30 240 L 45 155 Q 100 168 155 155 L 170 240 Z" fill="%233b82f6"/>
    <!-- Horizontal White Stripes on Polo -->
    <path d="M 38 180 L 162 180 M 34 200 L 166 200 M 31 220 L 169 220" stroke="%23ffffff" stroke-width="2.5" opacity="0.8"/>
    <!-- Collar -->
    <path d="M 85 155 L 100 185 L 115 155" fill="none" stroke="%231d4ed8" stroke-width="4"/>
  </svg>`;
};

export const SAMPLE_FARMERS: FarmerCardData[] = [
  {
    id: '61986355634',
    nameEn: 'RAJIB CHATTERJEE',
    nameBn: 'রাজীব চ্যাটার্জী',
    guardianNameEn: 'N/A',
    guardianNameBn: 'প্রযোজ্য নয়',
    dob: '14/07/1983',
    age: 43,
    gender: 'Male',
    genderBn: 'পুরুষ',
    mobile: '+91 98321 44510',
    aadhaarMasked: 'XXXX-XXXX-5563',
    village: 'Galsi-II (Mouza Rampur)',
    block: 'Burdwan Sadar Block',
    district: 'Purba Bardhaman',
    state: 'West Bengal',
    pincode: '713406',
    totalAcres: 3.85,
    totalBighas: 11.64,
    dagNumbers: 'Dag 402, 403',
    khatianNumber: 'Khatian 112/1',
    soilType: 'Alluvial Loam (pH 6.8)',
    bankMasked: 'State Bank of India ···· 5563',
    ifsc: 'SBIN0001245',
    kycStatus: 'VERIFIED',
    registrationDate: '14/07/2024',
    validUntil: 'LIFETIME / আজীবন',
    photoUrl: createRajibPortraitSvg(),
    signatureUrl: 'Rajib Chatterjee',
    qrPayload: 'https://agristack.gov.in/verify?id=61986355634&name=RAJIB+CHATTERJEE&dob=14/07/1983&gender=Male&status=UIDAI_VERIFIED',
  },
  {
    id: '61986351148',
    nameEn: 'ANWARA BEGUM',
    nameBn: 'আনোয়ারা বেগম',
    guardianNameEn: 'SHEIKH JAHANGIR',
    guardianNameBn: 'শেখ জাহাঙ্গীর',
    dob: '08/09/1986',
    age: 40,
    gender: 'Female',
    genderBn: 'মহিলা',
    mobile: '+91 97491 88201',
    aadhaarMasked: 'XXXX-XXXX-3891',
    village: 'Singur (Mouza Beraberi)',
    block: 'Singur Block',
    district: 'Hooghly',
    state: 'West Bengal',
    pincode: '712409',
    totalAcres: 2.40,
    totalBighas: 7.25,
    dagNumbers: 'Dag 405, 407',
    khatianNumber: 'Khatian 104',
    soilType: 'Loamy Sand (pH 6.4)',
    bankMasked: 'Punjab National Bank ···· 4412',
    ifsc: 'PUNB0218400',
    kycStatus: 'VERIFIED',
    registrationDate: '04/03/2024',
    validUntil: 'LIFETIME / আজীবন',
    photoUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 240"><rect width="200" height="240" fill="%23fef3c7"/><circle cx="100" cy="85" r="42" fill="%23d4a373"/><path d="M 50 90 Q 100 20 150 90 Q 160 160 100 160 Q 40 160 50 90 Z" fill="%2315803d" opacity="0.85"/><circle cx="85" cy="88" r="4" fill="%232d3748"/><circle cx="115" cy="88" r="4" fill="%232d3748"/><path d="M 92 108 Q 100 114 108 108" stroke="%239c6644" stroke-width="2" fill="none"/><path d="M 30 240 L 50 160 Q 100 170 150 160 L 170 240 Z" fill="%23b45309"/></svg>',
    signatureUrl: 'Anwara Begum',
    qrPayload: 'https://agristack.gov.in/verify?id=61986351148&name=ANWARA+BEGUM&dob=08/09/1986&gender=Female&status=UIDAI_VERIFIED',
  },
  {
    id: '61986353990',
    nameEn: 'SUBHASH CHANDRA GHOSH',
    nameBn: 'সুভাষ চন্দ্র ঘোষ',
    guardianNameEn: 'GOPAL CHANDRA GHOSH',
    guardianNameBn: 'গোপাল চন্দ্র ঘোষ',
    dob: '15/04/1982',
    age: 44,
    gender: 'Male',
    genderBn: 'পুরুষ',
    mobile: '+91 98321 44510',
    aadhaarMasked: 'XXXX-XXXX-7142',
    village: 'Galsi-II',
    block: 'Burdwan Sadar',
    district: 'Purba Bardhaman',
    state: 'West Bengal',
    pincode: '713406',
    totalAcres: 4.80,
    totalBighas: 14.50,
    dagNumbers: 'Dag 401, 402, 408',
    khatianNumber: 'Khatian 88/1',
    soilType: 'Gangetic Clay Loam',
    bankMasked: 'SBI ···· 6109',
    ifsc: 'SBIN0001245',
    kycStatus: 'VERIFIED',
    registrationDate: '12/01/2024',
    validUntil: 'LIFETIME / আজীবন',
    photoUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 240"><rect width="200" height="240" fill="%23e2e8f0"/><ellipse cx="100" cy="95" rx="42" ry="50" fill="%23d4a373"/><path d="M 60 75 Q 100 35 140 75 Q 145 55 100 45 Q 55 55 60 75 Z" fill="%232d3748"/><circle cx="85" cy="85" r="4.5" fill="%231a202c"/><circle cx="115" cy="85" r="4.5" fill="%231a202c"/><path d="M 80 110 Q 100 112 120 110 Q 100 124 80 110 Z" fill="%234a5568"/><path d="M 30 240 L 45 155 Q 100 165 155 155 L 170 240 Z" fill="%23047857"/></svg>',
    signatureUrl: 'Subhash C. Ghosh',
    qrPayload: 'https://agristack.gov.in/verify?id=61986353990&name=SUBHASH+CHANDRA+GHOSH&dob=15/04/1982&gender=Male&status=UIDAI_VERIFIED',
  },
];
