import { FarmerCardData } from '../types/card';
import * as pdfjsLib from 'pdfjs-dist';

// Configure pdfjs worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

export interface ScanResult {
  data: Partial<FarmerCardData>;
  extractedPhoto?: string;
  rawText: string;
}

export const scanPdfDocument = async (file: File): Promise<ScanResult> => {
  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
  const pdf = await loadingTask.promise;

  let fullText = '';
  let extractedPhoto: string | undefined;

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const textContent = await page.getTextContent();
    const pageStrings = textContent.items
      .map((item: any) => item.str)
      .filter((s: string) => s && s.trim());
    fullText += ' ' + pageStrings.join(' \n ');

    // Render first page to canvas to allow photo crop if needed
    if (pageNum === 1) {
      try {
        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        if (ctx) {
          const renderContext = { canvasContext: ctx, viewport } as any;
          await page.render(renderContext).promise;
          // Crop passport photo region typically located in top right (x: ~70%, y: ~15%)
          const cropX = canvas.width * 0.68;
          const cropY = canvas.height * 0.12;
          const cropW = canvas.width * 0.26;
          const cropH = canvas.height * 0.28;

          const photoCanvas = document.createElement('canvas');
          photoCanvas.width = 200;
          photoCanvas.height = 240;
          const photoCtx = photoCanvas.getContext('2d');
          if (photoCtx) {
            photoCtx.drawImage(canvas, cropX, cropY, cropW, cropH, 0, 0, 200, 240);
            extractedPhoto = photoCanvas.toDataURL('image/jpeg', 0.9);
          }
        }
      } catch (e) {
        console.warn('Canvas rendering for photo extraction failed:', e);
      }
    }
  }

  // Parse text using pattern recognition
  const parsedData = parseAgriStackText(fullText);

  return {
    data: parsedData,
    extractedPhoto,
    rawText: fullText,
  };
};

export const parseAgriStackText = (text: string): Partial<FarmerCardData> => {
  const result: Partial<FarmerCardData> = {};

  // Extract Farmer ID (e.g. IN-WB-24-892104 or KID-WB-2024-8921)
  const idMatch =
    text.match(/IN-[A-Z]{2}-\d{2}-\d{6}/i) ||
    text.match(/KID-[A-Z]{2}-\d{4}-\d{4}/i) ||
    text.match(/Farmer\s*ID[:\s]+([A-Z0-9-]+)/i);
  if (idMatch) {
    result.id = idMatch[1] || idMatch[0];
  }

  // Extract Mobile
  const mobileMatch = text.match(/(?:\+91[\s-]?)?[6-9]\d{9}/);
  if (mobileMatch) {
    result.mobile = mobileMatch[0];
  }

  // Extract Aadhaar
  const aadhaarMatch = text.match(/X{4}-X{4}-\d{4}/i) || text.match(/\d{4}\s*\d{4}\s*\d{4}/);
  if (aadhaarMatch) {
    result.aadhaarMasked = aadhaarMatch[0];
  }

  // Extract Name
  const nameMatch = text.match(/(?:Farmer Name|Name of Farmer|কৃষকের নাম)[:\s]+([A-Za-z\s]+)/i);
  if (nameMatch) {
    result.nameEn = nameMatch[1].trim();
  }

  // Extract District
  const districtMatch = text.match(/(?:District|জেলা)[:\s]+([A-Za-z\s]+)/i);
  if (districtMatch) {
    result.district = districtMatch[1].trim();
  }

  // Extract Block
  const blockMatch = text.match(/(?:Block|Sub-District|ব্লক)[:\s]+([A-Za-z\s]+)/i);
  if (blockMatch) {
    result.block = blockMatch[1].trim();
  }

  // Extract Village
  const villageMatch = text.match(/(?:Village|Mouza|গ্রাম|মৌজা)[:\s]+([A-Za-z\s]+)/i);
  if (villageMatch) {
    result.village = villageMatch[1].trim();
  }

  // Extract Area / Acres
  const acresMatch = text.match(/(\d+\.?\d*)\s*(?:Acres|Acre|একর)/i);
  if (acresMatch) {
    result.totalAcres = parseFloat(acresMatch[1]);
    result.totalBighas = Number((parseFloat(acresMatch[1]) * 3.025).toFixed(2));
  }

  // Extract Dag / Survey
  const dagMatch = text.match(/(?:Dag|Plot|Survey|দাগ নং)[:\s]+([0-9,\s\/-]+)/i);
  if (dagMatch) {
    result.dagNumbers = dagMatch[1].trim();
  }

  return result;
};
