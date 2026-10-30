import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json({ limit: '20mb' }));

// Initialize Google GenAI on server
const getGenAI = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

// API: Diagnose Crop Disease using Gemini 3.8 Flash
app.post('/api/diagnose-crop', async (req: Request, res: Response) => {
  try {
    const { cropName, symptoms, imageBase64, language = 'en' } = req.body;
    const ai = getGenAI();

    if (!ai) {
      return res.status(200).json({
        fallback: true,
        message: 'No server API key found. Using agricultural rule-based diagnostic database.',
      });
    }

    const promptText = `
You are an expert Agricultural Plant Pathologist and Agronomist specialized in South Asian crops (Paddy/Rice, Potato, Jute, Wheat, Mustard, Vegetables).
Diagnose the crop problem based on the provided details:
Crop: ${cropName || 'Unspecified'}
Reported Symptoms: ${symptoms || 'Visual examination required'}
Target Response Language: ${language === 'bn' ? 'Bengali (বাংলা)' : 'English'}

Provide a structured JSON output with these exact fields:
{
  "diseaseName": "Common name of disease/pest (${language === 'bn' ? 'বাংলা ও ইংরেজি' : 'English & Scientific'})",
  "pathogen": "Fungus / Bacteria / Virus / Insect Pest / Nutrient Deficiency",
  "severity": "Low | Moderate | Severe",
  "confidenceScore": 92,
  "symptomsSummary": "Clear summary of signs and damage observed",
  "organicRemedy": "Bio-pesticides, neem formulations, Trichoderma viride or cultural practices",
  "chemicalRemedy": "Recommended chemical spray with active ingredient, commercial name, and exact dosage per liter of water",
  "safetyPrecautions": "Protective gear, waiting period before harvest (PHI)",
  "preventionTips": "Crop rotation, seed treatment, irrigation regulation"
}
Output only valid JSON without markdown fences.
`;

    const contents: any[] = [];
    if (imageBase64) {
      const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, '');
      contents.push({
        inlineData: {
          mimeType: 'image/jpeg',
          data: cleanBase64,
        },
      });
    }
    contents.push({ text: promptText });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: { parts: contents },
      config: {
        responseMimeType: 'application/json',
      },
    });

    const outputText = response.text || '{}';
    const parsed = JSON.parse(outputText);
    return res.status(200).json({ success: true, diagnosis: parsed });
  } catch (error: any) {
    console.error('Error diagnosing crop:', error);
    return res.status(500).json({
      success: false,
      error: error?.message || 'Failed to diagnose crop disease.',
      fallback: true,
    });
  }
});

// API: Agricultural Advisory Q&A using Gemini 3.8 Flash
app.post('/api/ask-advisory', async (req: Request, res: Response) => {
  try {
    const { question, crop, district, language = 'en' } = req.body;
    const ai = getGenAI();

    if (!ai) {
      return res.status(200).json({
        fallback: true,
        answer: language === 'bn' 
          ? 'স্থানীয় কৃষি বিজ্ঞান কেন্দ্র (KVK) ও কৃষি প্রযুক্তি ব্যবস্থাপনা সংস্থা (ATMA) এর সাথে যোগাযোগ করুন।' 
          : 'Please contact your local Krishi Vigyan Kendra (KVK) or block agricultural officer for district-specific advice.',
      });
    }

    const systemPrompt = `You are AgriStack AI Agro-Advisor, an AI agricultural extension officer guiding farmers and agricultural officers in India & South Asia. Provide concise, highly practical, practical agronomic advice in ${language === 'bn' ? 'Bengali (বাংলা)' : 'English'}. Keep answers under 180 words, formatted clearly with bullet points where appropriate.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `Crop: ${crop || 'General'}. District/Region: ${district || 'West Bengal'}. Question: ${question}`,
      config: {
        systemInstruction: systemPrompt,
      },
    });

    return res.status(200).json({
      success: true,
      answer: response.text || '',
    });
  } catch (error: any) {
    console.error('Error generating advisory:', error);
    return res.status(500).json({
      success: false,
      error: error?.message || 'Advisory service currently unavailable.',
    });
  }
});

// API: Parse AgriStack Certificate / Slip using Gemini Vision OCR
app.post('/api/parse-certificate', async (req: Request, res: Response) => {
  try {
    const { imageBase64, textContent } = req.body;
    const ai = getGenAI();

    if (!ai) {
      return res.status(200).json({
        fallback: true,
        message: 'No server API key found. Using client-side pattern matching.',
      });
    }

    const promptText = `
You are an expert OCR parser for Indian & South Asian Government Agricultural Certificates, specifically AgriStack, PM-KISAN, and Krishak Bandhu registration slips.
Extract the following information from the provided document image or text:
- id: Farmer ID / Kisan D-ID (e.g. IN-WB-24-892104)
- nameEn: Farmer Name in English
- nameBn: Farmer Name in Bengali / Tiro Bangla
- guardianNameEn: Father's / Husband's Name in English
- guardianNameBn: Father's / Husband's Name in Bengali
- dob: Date of Birth (DD/MM/YYYY)
- age: Calculated age in numbers
- gender: "Male" | "Female" | "Other"
- genderBn: "পুরুষ" | "মহিলা" | "অন্যান্য"
- mobile: 10-digit mobile number
- aadhaarMasked: Masked Aadhaar (e.g. XXXX-XXXX-1234)
- village: Village / Mouza name
- block: Block / Sub-district
- district: District name
- state: State name (default: West Bengal)
- pincode: 6-digit PIN code
- totalAcres: Landholding in acres as a float
- totalBighas: Landholding in bighas (acres * 3.025)
- dagNumbers: Dag / Survey plot numbers (e.g. "Dag 401, 402")
- khatianNumber: Khatian number
- soilType: Soil classification
- bankMasked: Bank name and masked account
- ifsc: Bank IFSC code
- kycStatus: "VERIFIED" | "PENDING"
- registrationDate: Registration date (DD/MM/YYYY)
- validUntil: "LIFETIME / আজীবন"

Raw Text context if available: ${textContent || 'None'}

Return ONLY a valid JSON object matching the fields above without markdown formatting.
`;

    const contents: any[] = [];
    if (imageBase64) {
      const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, '');
      contents.push({
        inlineData: {
          mimeType: 'image/jpeg',
          data: cleanBase64,
        },
      });
    }
    contents.push({ text: promptText });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: { parts: contents },
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.status(200).json({ success: true, data: parsed });
  } catch (error: any) {
    console.error('Error parsing certificate:', error);
    return res.status(500).json({
      success: false,
      error: error?.message || 'Certificate parsing failed.',
      fallback: true,
    });
  }
});

// Static / Vite Middleware Setup
async function startServer() {
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`AgriStack platform listening at http://0.0.0.0:${PORT}`);
  });
}

startServer();
