export interface Farmer {
  id: string;
  name: string;
  nameBn: string;
  phone: string;
  village: string;
  block: string;
  district: string;
  state: string;
  totalLandAcres: number;
  totalLandBighas: number;
  plots: string[];
  kycStatus: 'VERIFIED' | 'PENDING' | 'ACTION_REQUIRED';
  aadhaarMasked: string;
  bankAccountMasked: string;
  primaryCrop: string;
  season: 'Kharif' | 'Rabi' | 'Zaid';
  registrationDate: string;
  dbtStatus: {
    pmKisanInstallment: number;
    pmKisanTotalDisbursed: number;
    krishakBandhuStatus: 'Approved' | 'In Process';
    cropInsurancePolicy: string;
    kccApprovedLimit: number;
    kccUtilized: number;
  };
}

export interface CadastralPlot {
  id: string;
  dagNumber: string;
  khatianNumber: string;
  farmerId: string;
  farmerName: string;
  village: string;
  areaAcres: number;
  areaBighas: number;
  soilType: string;
  soilPh: number;
  organicCarbon: string;
  currentCrop: string;
  currentCropBn: string;
  cropVariety: string;
  sowingDate: string;
  growthStage: 'Germination' | 'Tillering' | 'Flowering' | 'Grain Filling' | 'Harvest Ready';
  growthStageBn: string;
  ndviScore: number; // 0.1 to 1.0
  moisturePercentage: number;
  irrigationSource: 'Solar Shallow Tube Well' | 'River Lift Canal' | 'Submersible Borewell' | 'Rainfed Pond';
  surveyStatus: 'Verified by Drone & AFO' | 'Self Surveyed' | 'Under Inspection';
  polygonCoords: [number, number][];
}

export interface MandiPrice {
  id: string;
  commodity: string;
  commodityBn: string;
  mandiName: string;
  district: string;
  minPrice: number;
  modalPrice: number;
  maxPrice: number;
  mspPrice: number;
  dailyChangePercent: number;
  arrivalTons: number;
  date: string;
  priceTrend: number[];
}

export interface CropDisease {
  id: string;
  nameEn: string;
  nameBn: string;
  crop: string;
  cropBn: string;
  pathogenType: string;
  severity: 'Low' | 'Moderate' | 'Severe';
  confidenceScore: number;
  symptomsEn: string;
  symptomsBn: string;
  organicControlEn: string;
  organicControlBn: string;
  chemicalControlEn: string;
  chemicalControlBn: string;
  preventiveTipsEn: string;
  preventiveTipsBn: string;
  sampleIcon: string;
}

export interface WeatherDay {
  day: string;
  dayBn: string;
  date: string;
  tempMax: number;
  tempMin: number;
  condition: 'Sunny' | 'Partly Cloudy' | 'Scattered Showers' | 'Rainy' | 'Clear Sky';
  conditionBn: string;
  rainProbability: number;
  humidity: number;
  windKmh: number;
  sprayCondition: 'Optimal' | 'Caution' | 'Avoid';
  advisory: string;
  advisoryBn: string;
}

export interface AgroScheme {
  id: string;
  code: string;
  titleEn: string;
  titleBn: string;
  category: 'Financial Grant' | 'Crop Insurance' | 'Input Subsidy' | 'Machinery';
  benefitAmount: string;
  eligibilityEn: string;
  eligibilityBn: string;
  status: 'Open for Application' | 'Direct Transfer Active' | 'Renewed';
  linkOfficial: string;
}
