import QRCode from 'qrcode';

export const generateQrDataUrl = async (text: string): Promise<string> => {
  try {
    const dataUrl = await QRCode.toDataURL(text, {
      width: 180,
      margin: 1,
      color: {
        dark: '#1e293b',
        light: '#ffffff',
      },
      errorCorrectionLevel: 'M',
    });
    return dataUrl;
  } catch (err) {
    console.error('Failed to generate QR code:', err);
    // Return a fallback SVG data URL
    return 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" fill="%23eee"/><text x="50" y="50" font-size="10" text-anchor="middle">QR</text></svg>';
  }
};
