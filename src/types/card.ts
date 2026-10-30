export interface FarmerCardData {
  id: string; // e.g. "IN-WB-24-892104"
  nameEn: string;
  nameBn: string;
  guardianNameEn: string;
  guardianNameBn: string;
  dob: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  genderBn: 'পুরুষ' | 'মহিলা' | 'অন্যান্য';
  mobile: string;
  aadhaarMasked: string;
  village: string;
  block: string;
  district: string;
  state: string;
  pincode: string;
  totalAcres: number;
  totalBighas: number;
  dagNumbers: string;
  khatianNumber: string;
  soilType: string;
  bankMasked: string;
  ifsc: string;
  kycStatus: 'VERIFIED' | 'PENDING';
  registrationDate: string;
  validUntil: string;
  photoUrl: string;
  signatureUrl?: string;
  qrPayload?: string;
}

export type CardTheme = 'green-gold' | 'tri-color' | 'royal-navy' | 'bengal-edition';
export type CardLanguage = 'bilingual' | 'english' | 'bengali';
export type PrintLayout = 'single-pvc' | 'a4-5cards' | 'a4-8cards' | 'duplex-pvc';

export interface PhotoAdjustments {
  brightness: number; // 50 to 150 (default 100)
  contrast: number;   // 50 to 150 (default 100)
  zoom: number;       // 80 to 150 (default 100)
  rotation: number;   // 0, 90, 180, 270
}
