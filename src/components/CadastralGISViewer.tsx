import React, { useState } from 'react';
import { CadastralPlot } from '../types/agristack';
import { Language, translations } from '../i18n/translations';
import {
  Layers,
  MapPin,
  CheckCircle2,
  Droplets,
  Sprout,
  FileText,
  ScanLine,
  Compass,
  Maximize2,
  Search,
} from 'lucide-react';

interface CadastralGISViewerProps {
  plots: CadastralPlot[];
  lang: Language;
  onSelectPlotFarmer?: (farmerId: string) => void;
}

export const CadastralGISViewer: React.FC<CadastralGISViewerProps> = ({
  plots,
  lang,
}) => {
  const t = translations[lang];
  const [selectedPlotId, setSelectedPlotId] = useState<string>('DAG-401');
  const [activeLayer, setActiveLayer] = useState<'cadastral' | 'ndvi' | 'moisture' | 'satellite'>('cadastral');
  const [filterCrop, setFilterCrop] = useState<string>('all');
  const [hoveredPlot, setHoveredPlot] = useState<CadastralPlot | null>(null);

  const selectedPlot = plots.find((p) => p.id === selectedPlotId) || plots[0];

  const filteredPlots = plots.filter((p) => {
    if (filterCrop === 'all') return true;
    return p.currentCrop.toLowerCase().includes(filterCrop.toLowerCase());
  });

  const getPlotFill = (plot: CadastralPlot) => {
    if (activeLayer === 'ndvi') {
      if (plot.ndviScore >= 0.8) return 'rgba(22, 101, 52, 0.78)'; // deep green
      if (plot.ndviScore >= 0.7) return 'rgba(34, 197, 94, 0.72)'; // vibrant green
      if (plot.ndviScore >= 0.6) return 'rgba(163, 230, 53, 0.68)'; // lime
      return 'rgba(234, 179, 8, 0.65)'; // yellowish amber
    }
    if (activeLayer === 'moisture') {
      if (plot.moisturePercentage >= 65) return 'rgba(14, 116, 144, 0.75)'; // cyan/blue deep
      if (plot.moisturePercentage >= 50) return 'rgba(56, 189, 248, 0.65)'; // sky blue
      return 'rgba(217, 119, 6, 0.65)'; // dry amber
    }
    if (activeLayer === 'satellite') {
      return 'rgba(64, 80, 48, 0.82)';
    }
    // Default cadastral boundary: clean light tone
    return selectedPlotId === plot.id
      ? 'rgba(16, 185, 129, 0.35)'
      : 'rgba(245, 245, 244, 0.6)';
  };

  const getPlotStroke = (plot: CadastralPlot) => {
    if (selectedPlotId === plot.id) return '#059669'; // Emerald-600
    if (activeLayer === 'cadastral') return '#78716c'; // Stone-500
    return '#ffffff';
  };

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 tracking-wide uppercase">
            <span>Cadastral GIS Registry</span>
            <span aria-hidden="true">·</span>
            <span>Drone & Satellite Verified</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mt-1">
            {t.cadastralHeading}
          </h2>
          <p className="text-sm text-stone-600 max-w-3xl mt-1">
            {t.cadastralSubheading}
          </p>
        </div>

        {/* Filter & Crop Selectors */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1 p-1 bg-stone-200/70 rounded-lg text-xs">
            <button
              onClick={() => setActiveLayer('cadastral')}
              className={`px-3 py-1.5 font-medium rounded-md transition-all cursor-pointer whitespace-nowrap ${
                activeLayer === 'cadastral'
                  ? 'bg-white text-emerald-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {t.layerCadastral}
            </button>
            <button
              onClick={() => setActiveLayer('ndvi')}
              className={`px-3 py-1.5 font-medium rounded-md transition-all cursor-pointer whitespace-nowrap ${
                activeLayer === 'ndvi'
                  ? 'bg-white text-emerald-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {t.layerNdvi}
            </button>
            <button
              onClick={() => setActiveLayer('moisture')}
              className={`px-3 py-1.5 font-medium rounded-md transition-all cursor-pointer whitespace-nowrap ${
                activeLayer === 'moisture'
                  ? 'bg-white text-emerald-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {t.layerMoisture}
            </button>
            <button
              onClick={() => setActiveLayer('satellite')}
              className={`px-3 py-1.5 font-medium rounded-md transition-all cursor-pointer whitespace-nowrap ${
                activeLayer === 'satellite'
                  ? 'bg-white text-emerald-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {t.layerSatellite}
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Interactive Map Canvas + Plot Cadastral Dossier Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Interactive GIS Map (7 cols on desktop) */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-stone-200 shadow-xs overflow-hidden">
          {/* Map Controls Top Bar */}
          <div className="px-4 py-3 border-b border-stone-200 bg-stone-50 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-stone-600 font-medium">
              <Compass className="w-4 h-4 text-emerald-700" />
              <span>Galsi-II Mouza · Purba Bardhaman</span>
              <span className="hidden sm:inline" aria-hidden="true">·</span>
              <span className="hidden sm:inline">Coordinate Grid EPSG:4326</span>
            </div>

            {/* Crop Selector Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-stone-500 hidden sm:inline">Filter:</span>
              <select
                value={filterCrop}
                onChange={(e) => setFilterCrop(e.target.value)}
                aria-label="Filter crops by type"
                className="text-xs bg-white border border-stone-300 rounded-md px-2 py-1 text-stone-700 focus:outline-none focus:ring-1 focus:ring-emerald-600"
              >
                <option value="all">All Crops</option>
                <option value="paddy">Paddy / ধান</option>
                <option value="potato">Potato / আলু</option>
                <option value="jute">Jute / পাট</option>
                <option value="mustard">Mustard / সরিষা</option>
              </select>
            </div>
          </div>

          {/* SVG Map Canvas Container */}
          <div className="relative bg-[#1c2e22] w-full aspect-[4/3] max-h-[500px] select-none overflow-hidden flex items-center justify-center p-3">
            {/* Background Map Grid & Irrigation Canal */}
            <svg
              viewBox="0 0 600 420"
              className="w-full h-full object-contain filter drop-shadow-sm"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
                </pattern>
                {/* Radial gradient for satellite background */}
                <radialGradient id="satelliteGlow" cx="50%" cy="50%" r="70%">
                  <stop offset="0%" stopColor="#243d2c" />
                  <stop offset="100%" stopColor="#142118" />
                </radialGradient>
              </defs>

              {/* Base terrain */}
              <rect width="600" height="420" fill="url(#satelliteGlow)" />
              <rect width="600" height="420" fill="url(#grid)" />

              {/* Water Canal / Irrigation Line */}
              <path
                d="M 10 390 Q 200 370, 310 310 T 590 280"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="5"
                strokeOpacity="0.8"
                strokeDasharray="4 2"
              />
              <text x="360" y="300" fill="#bae6fd" fontSize="9" fontFamily="monospace">
                Damodar Canal Branch (Canal #3)
              </text>

              {/* Village Access Road */}
              <path
                d="M 20 20 L 580 25"
                fill="none"
                stroke="#d6d3d1"
                strokeWidth="4"
                strokeOpacity="0.4"
              />
              <text x="250" y="16" fill="#e7e5e4" fontSize="9" fontFamily="sans-serif">
                Panchayat Road (East-West)
              </text>

              {/* Cadastral Farm Plots */}
              {plots.map((plot) => {
                const pointsString = plot.polygonCoords
                  .map(([x, y]) => `${x},${y}`)
                  .join(' ');
                const isSelected = selectedPlotId === plot.id;
                const isDimmed =
                  filterCrop !== 'all' &&
                  !plot.currentCrop.toLowerCase().includes(filterCrop.toLowerCase());

                // Center for label
                const avgX =
                  plot.polygonCoords.reduce((sum, p) => sum + p[0], 0) /
                  plot.polygonCoords.length;
                const avgY =
                  plot.polygonCoords.reduce((sum, p) => sum + p[1], 0) /
                  plot.polygonCoords.length;

                return (
                  <g
                    key={plot.id}
                    onClick={() => setSelectedPlotId(plot.id)}
                    onMouseEnter={() => setHoveredPlot(plot)}
                    onMouseLeave={() => setHoveredPlot(null)}
                    className="cursor-pointer transition-all duration-150"
                    opacity={isDimmed ? 0.25 : 1}
                  >
                    <polygon
                      points={pointsString}
                      fill={getPlotFill(plot)}
                      stroke={getPlotStroke(plot)}
                      strokeWidth={isSelected ? 3.5 : 1.5}
                      className="hover:filter hover:brightness-110 transition-all"
                    />

                    {/* Cadastral Label in Center */}
                    <text
                      x={avgX}
                      y={avgY - 6}
                      textAnchor="middle"
                      fill={isSelected ? '#ffffff' : '#f5f5f4'}
                      fontSize={isSelected ? '12' : '10'}
                      fontWeight={isSelected ? '700' : '600'}
                      className="pointer-events-none drop-shadow-md select-none"
                    >
                      {plot.dagNumber}
                    </text>

                    {/* Crop Label & Area */}
                    <text
                      x={avgX}
                      y={avgY + 9}
                      textAnchor="middle"
                      fill={isSelected ? '#a7f3d0' : '#e7e5e4'}
                      fontSize="9"
                      fontWeight="500"
                      className="pointer-events-none select-none drop-shadow-sm"
                    >
                      {plot.currentCrop.split(' ')[0]} · {plot.areaAcres} ac
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Hover Tooltip Overlay */}
            {hoveredPlot && (
              <div className="absolute top-4 left-4 bg-stone-900/90 backdrop-blur-md text-white text-xs px-3 py-2 rounded-lg border border-stone-700 shadow-lg pointer-events-none z-20">
                <div className="font-semibold text-emerald-300">
                  {hoveredPlot.dagNumber} ({hoveredPlot.khatianNumber})
                </div>
                <div className="text-stone-300">
                  {lang === 'bn' ? hoveredPlot.currentCropBn : hoveredPlot.currentCrop}
                </div>
                <div className="text-stone-400 font-mono text-[11px] mt-0.5">
                  {hoveredPlot.farmerName} · {hoveredPlot.areaAcres} Acres
                </div>
              </div>
            )}
          </div>

          {/* Map Footer Legend & Indicator */}
          <div className="p-4 bg-stone-50 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-600">
            <div className="flex items-center gap-4">
              <span className="font-semibold text-stone-700">Map Legend:</span>
              {activeLayer === 'ndvi' && (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-xs bg-[#166534] inline-block" />
                    <span>Lush (&gt;0.8)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-xs bg-[#22c55e] inline-block" />
                    <span>Healthy (0.7)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-xs bg-[#eab308] inline-block" />
                    <span>Moderate (&lt;0.6)</span>
                  </div>
                </div>
              )}
              {activeLayer === 'moisture' && (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-xs bg-[#0e7490] inline-block" />
                    <span>High Moisture (&gt;65%)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-xs bg-[#38bdf8] inline-block" />
                    <span>Adequate (50-65%)</span>
                  </div>
                </div>
              )}
              {activeLayer === 'cadastral' && (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-xs border-2 border-emerald-600 bg-emerald-100 inline-block" />
                    <span>Selected Parcel</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-xs border border-stone-500 bg-stone-100 inline-block" />
                    <span>Cadastral Boundary</span>
                  </div>
                </div>
              )}
            </div>

            <div className="text-[11px] text-stone-500 font-mono">
              Survey Authority: Dept of Land Records & Agriculture
            </div>
          </div>
        </div>

        {/* Plot Cadastral Dossier (5 cols on desktop) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-stone-200 shadow-xs p-5 space-y-5">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div>
              <span className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wide">
                Digital Record of Rights (RoR)
              </span>
              <h3 className="text-xl font-bold text-stone-900 mt-0.5">
                {selectedPlot.dagNumber}
              </h3>
            </div>
            <div className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 font-medium border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>{selectedPlot.surveyStatus}</span>
            </div>
          </div>

          {/* Key Metrics Strip (Tabular Numerals) */}
          <div className="grid grid-cols-3 gap-2 bg-stone-50 p-3 rounded-lg border border-stone-200 text-center">
            <div>
              <div className="text-[11px] text-stone-500">{t.plotArea}</div>
              <div className="text-base font-bold text-stone-900 tabular-nums">
                {selectedPlot.areaAcres} <span className="text-xs font-normal text-stone-500">Acres</span>
              </div>
              <div className="text-[11px] text-stone-500 font-mono">
                ({selectedPlot.areaBighas} Bighas)
              </div>
            </div>
            <div className="border-x border-stone-200">
              <div className="text-[11px] text-stone-500">{t.ndviIndex}</div>
              <div className="text-base font-bold text-emerald-700 tabular-nums">
                {selectedPlot.ndviScore.toFixed(2)}
              </div>
              <div className="text-[11px] text-emerald-600 font-medium">Vigorous</div>
            </div>
            <div>
              <div className="text-[11px] text-stone-500">{t.moistureLevel}</div>
              <div className="text-base font-bold text-cyan-700 tabular-nums">
                {selectedPlot.moisturePercentage}%
              </div>
              <div className="text-[11px] text-cyan-600 font-medium">Adequate</div>
            </div>
          </div>

          {/* Dossier Data Grid */}
          <div className="space-y-3 text-xs text-stone-700 divide-y divide-stone-100">
            <div className="flex items-center justify-between pt-2">
              <span className="text-stone-500">{t.ownerName}</span>
              <span className="font-semibold text-stone-900">{selectedPlot.farmerName}</span>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-stone-500">{t.kisanId}</span>
              <span className="font-mono font-medium text-emerald-800">{selectedPlot.farmerId}</span>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-stone-500">{t.khatianNo}</span>
              <span className="font-medium text-stone-800">{selectedPlot.khatianNumber}</span>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-stone-500">{t.sownCrop}</span>
              <span className="font-semibold text-emerald-900">
                {lang === 'bn' ? selectedPlot.currentCropBn : selectedPlot.currentCrop}
              </span>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-stone-500">Variety / Cultivar</span>
              <span className="font-medium text-stone-800">{selectedPlot.cropVariety}</span>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-stone-500">{t.growthStage}</span>
              <span className="px-2 py-0.5 rounded-sm bg-stone-100 font-medium text-stone-800">
                {lang === 'bn' ? selectedPlot.growthStageBn : selectedPlot.growthStage}
              </span>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-stone-500">{t.soilProfile}</span>
              <span className="font-medium text-stone-800">
                {selectedPlot.soilType} (pH {selectedPlot.soilPh})
              </span>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-stone-500">Organic Carbon (OC)</span>
              <span className="font-medium text-stone-800">{selectedPlot.organicCarbon}</span>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-stone-500">{t.irrigationType}</span>
              <span className="font-medium text-stone-800">{selectedPlot.irrigationSource}</span>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-2 flex items-center gap-2">
            <button
              onClick={() => {
                alert(
                  lang === 'bn'
                    ? `খতিয়ান দাগ ${selectedPlot.dagNumber} এর ডিজিটাল শস্য শংসাপত্র প্রস্তুত হয়েছে।`
                    : `Geo-tagged digital RoR certificate generated for ${selectedPlot.dagNumber}.`
                );
              }}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <FileText className="w-4 h-4 text-emerald-200" />
              <span>{lang === 'bn' ? 'ডিজিটাল দাগ সার্টিফিকেট ডাউনলোড' : 'Download Digital Plot RoR'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
