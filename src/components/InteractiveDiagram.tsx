import React, { useState } from 'react';
import { InteractiveDiagramConfig } from '../data/curriculum';
import { Zap, Play, RotateCcw, Flame, Snowflake, AlertCircle, Compass, Layers, CheckCircle2 } from 'lucide-react';

interface InteractiveDiagramProps {
  config: InteractiveDiagramConfig;
  subjectColor: string;
}

export const InteractiveDiagram: React.FC<InteractiveDiagramProps> = ({ config, subjectColor }) => {
  // 1. Circuit Simulator State
  const [switchClosed, setSwitchClosed] = useState(true);
  const [circuitMode, setCircuitMode] = useState<'serie' | 'derivation'>('serie');
  const [bulb1Working, setBulb1Working] = useState(true);
  const [bulb2Working, setBulb2Working] = useState(true);

  // 2. Matter State Simulator State
  const [temperature, setTemperature] = useState<number>(20);

  // 3. Fraction Explorer State
  const [numerator, setNumerator] = useState<number>(3);
  const [denominator, setDenominator] = useState<number>(4);

  // 4. Tectonics Simulator State
  const [tectonicMode, setTectonicMode] = useState<'subduction' | 'divergence'>('subduction');
  const [stress, setStress] = useState<number>(40);
  const [earthquakeTriggered, setEarthquakeTriggered] = useState<boolean>(false);

  // 5. Algorithm / Robot Simulator State
  const [robotDistance, setRobotDistance] = useState<number>(18);
  const [robotStatus, setRobotStatus] = useState<string>('En marche normale');

  // Trigger earthquake animation
  const triggerQuake = () => {
    setEarthquakeTriggered(true);
    setTimeout(() => setEarthquakeTriggered(false), 1200);
  };

  // Helper to determine bulb lighting in series vs parallel
  const isLoopClosed = switchClosed;
  const isBulb1On = isLoopClosed && bulb1Working && (circuitMode === 'derivation' || bulb2Working);
  const isBulb2On = isLoopClosed && bulb2Working && (circuitMode === 'derivation' || bulb1Working);

  return (
    <div className="bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 md:p-6 my-4 shadow-inner">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h4 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              {config.title}
            </h4>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {config.description}
          </p>
        </div>
        <span className="text-xs font-mono px-2 py-1 rounded bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shadow-xs">
          Schéma interactif 5ème
        </span>
      </div>

      {/* 1. Circuit Simulator */}
      {config.type === 'circuit' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2 justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSwitchClosed(!switchClosed)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 shadow-xs ${
                  switchClosed
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-[0_2px_0_#065f46]'
                    : 'bg-rose-600 hover:bg-rose-700 text-white shadow-[0_2px_0_#9f1239]'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                Interrupteur : {switchClosed ? 'FERMÉ (Courant passe)' : 'OUVERT (Coupé)'}
              </button>

              <button
                onClick={() => setCircuitMode(circuitMode === 'serie' ? 'derivation' : 'serie')}
                className="px-3 py-1.5 text-xs font-medium rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shadow-xs"
              >
                Montage : <strong className="capitalize">{circuitMode}</strong>
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
              <button
                onClick={() => setBulb1Working(!bulb1Working)}
                className={`px-2 py-1 rounded text-xs border ${
                  bulb1Working ? 'bg-amber-50 text-amber-800 border-amber-300' : 'bg-slate-200 text-slate-500 line-through'
                }`}
              >
                Lampe 1 {bulb1Working ? 'active' : 'dévissée'}
              </button>
              <button
                onClick={() => setBulb2Working(!bulb2Working)}
                className={`px-2 py-1 rounded text-xs border ${
                  bulb2Working ? 'bg-amber-50 text-amber-800 border-amber-300' : 'bg-slate-200 text-slate-500 line-through'
                }`}
              >
                Lampe 2 {bulb2Working ? 'active' : 'dévissée'}
              </button>
            </div>
          </div>

          {/* Circuit Canvas SVG */}
          <div className="w-full bg-white dark:bg-slate-950 rounded-xl p-4 border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center">
            <svg viewBox="0 0 500 240" className="w-full max-w-lg h-auto">
              {/* Main Battery */}
              <rect x="30" y="90" width="40" height="60" rx="4" fill="#0284c7" />
              <rect x="42" y="82" width="16" height="8" rx="2" fill="#38bdf8" />
              <text x="50" y="125" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="12">
                4.5V
              </text>
              <text x="35" y="78" fill="#ef4444" fontWeight="bold" fontSize="14">+</text>
              <text x="60" y="78" fill="#3b82f6" fontWeight="bold" fontSize="14">-</text>

              {/* Wire paths */}
              {circuitMode === 'serie' ? (
                <>
                  {/* Outer Loop */}
                  <path
                    d="M 50 82 L 50 30 L 450 30 L 450 210 L 50 210 L 50 150"
                    fill="none"
                    stroke={isLoopClosed && (isBulb1On || isBulb2On) ? '#f59e0b' : '#94a3b8'}
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  {/* Current flow animation dots if closed */}
                  {isLoopClosed && (isBulb1On || isBulb2On) && (
                    <circle r="4" fill="#fbbf24">
                      <animateMotion
                        path="M 50 82 L 50 30 L 450 30 L 450 210 L 50 210 L 50 150"
                        dur="3s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  )}
                </>
              ) : (
                <>
                  {/* Parallel loops */}
                  <path
                    d="M 50 82 L 50 30 L 450 30 L 450 210 L 50 210 L 50 150"
                    fill="none"
                    stroke={isLoopClosed ? '#f59e0b' : '#94a3b8'}
                    strokeWidth="4"
                  />
                  <path
                    d="M 270 30 L 270 210"
                    fill="none"
                    stroke={isLoopClosed ? '#f59e0b' : '#94a3b8'}
                    strokeWidth="4"
                  />
                </>
              )}

              {/* Switch on top wire */}
              <circle cx="140" cy="30" r="5" fill="#334155" />
              <circle cx="180" cy="30" r="5" fill="#334155" />
              {switchClosed ? (
                <line x1="140" y1="30" x2="180" y2="30" stroke="#10b981" strokeWidth="4" />
              ) : (
                <line x1="140" y1="30" x2="175" y2="10" stroke="#ef4444" strokeWidth="4" />
              )}
              <text x="160" y="50" textAnchor="middle" fontSize="11" fill="#64748b">
                K ({switchClosed ? 'fermé' : 'ouvert'})
              </text>

              {/* Bulb 1 */}
              <g transform="translate(270, 120)">
                <circle
                  cx="0"
                  cy="0"
                  r="24"
                  fill={isBulb1On ? '#fef08a' : '#f1f5f9'}
                  stroke={isBulb1On ? '#eab308' : '#94a3b8'}
                  strokeWidth="3"
                  className={isBulb1On ? 'filter drop-shadow-[0_0_12px_#facc15]' : ''}
                />
                <line x1="-12" y1="-12" x2="12" y2="12" stroke="#64748b" strokeWidth="2" />
                <line x1="-12" y1="12" x2="12" y2="-12" stroke="#64748b" strokeWidth="2" />
                <text x="0" y="38" textAnchor="middle" fontSize="11" fill="#475569" fontWeight="bold">
                  Lampe L1 {isBulb1On ? '(Allumée)' : '(Éteinte)'}
                </text>
              </g>

              {/* Bulb 2 */}
              <g transform="translate(450, 120)">
                <circle
                  cx="0"
                  cy="0"
                  r="24"
                  fill={isBulb2On ? '#fef08a' : '#f1f5f9'}
                  stroke={isBulb2On ? '#eab308' : '#94a3b8'}
                  strokeWidth="3"
                  className={isBulb2On ? 'filter drop-shadow-[0_0_12px_#facc15]' : ''}
                />
                <line x1="-12" y1="-12" x2="12" y2="12" stroke="#64748b" strokeWidth="2" />
                <line x1="-12" y1="12" x2="12" y2="-12" stroke="#64748b" strokeWidth="2" />
                <text x="0" y="38" textAnchor="middle" fontSize="11" fill="#475569" fontWeight="bold">
                  Lampe L2 {isBulb2On ? '(Allumée)' : '(Éteinte)'}
                </text>
              </g>
            </svg>

            <div className="mt-2 text-center text-xs text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-900 px-3 py-1.5 rounded-lg">
              {circuitMode === 'serie' ? (
                <span>
                  💡 <strong>Règle du circuit en série :</strong> Une seule boucle. Si L1 est dévissée, le courant ne passe plus et L2 s’éteint aussi !
                </span>
              ) : (
                <span>
                  💡 <strong>Règle du circuit en dérivation :</strong> Deux boucles indépendantes. Si L1 est dévissée, L2 reste allumée car sa boucle est fermée !
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 2. States of Matter Simulator */}
      {config.type === 'matter' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              {temperature < 0 ? (
                <Snowflake className="w-6 h-6 text-sky-500 animate-pulse" />
              ) : temperature >= 100 ? (
                <Flame className="w-6 h-6 text-amber-500 animate-bounce" />
              ) : (
                <Zap className="w-6 h-6 text-emerald-500" />
              )}
              <div>
                <div className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  Température : <span className="font-mono text-base">{temperature}°C</span>
                </div>
                <div className="text-xs text-slate-500">
                  État de l’eau pure :{' '}
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {temperature < 0
                      ? 'SOLIDE (Glace ordonnée)'
                      : temperature < 100
                      ? 'LIQUIDE (Molécules mobiles et liées)'
                      : 'GAZ (Vapeur d’eau très agitée et dispersée)'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-64">
              <span className="text-xs text-slate-400 font-mono">-20°C</span>
              <input
                type="range"
                min="-20"
                max="120"
                value={temperature}
                onChange={(e) => setTemperature(parseInt(e.target.value))}
                className="w-full accent-sky-500 cursor-pointer"
              />
              <span className="text-xs text-slate-400 font-mono">120°C</span>
            </div>
          </div>

          {/* Molecular visualization */}
          <div className="relative w-full h-48 bg-slate-900 rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center">
            {/* Particles */}
            <div className="relative w-full h-full flex items-center justify-center p-6">
              {temperature < 0 ? (
                /* Solid: Compact, orderly crystal grid */
                <div className="grid grid-cols-6 gap-2">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-4 h-4 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8] flex items-center justify-center text-[8px] font-bold text-slate-900"
                    >
                      H₂O
                    </div>
                  ))}
                </div>
              ) : temperature < 100 ? (
                /* Liquid: Fluid, contact, moving at bottom */
                <div className="absolute bottom-4 left-6 right-6 h-28 flex flex-wrap gap-2.5 items-end justify-center">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <div
                      key={i}
                      style={{
                        animation: `bounce ${1 + (i % 5) * 0.2}s infinite alternate`,
                      }}
                      className="w-4 h-4 rounded-full bg-blue-500 shadow-[0_0_6px_#60a5fa] flex items-center justify-center text-[8px] font-bold text-white"
                    >
                      H₂O
                    </div>
                  ))}
                  <div className="absolute top-0 left-0 right-0 border-t border-dashed border-sky-400/50 flex justify-end">
                    <span className="text-[10px] text-sky-300 font-mono pr-2">Surface libre plane et horizontale</span>
                  </div>
                </div>
              ) : (
                /* Gas: Fast, completely dispersed throughout volume */
                <div className="relative w-full h-full">
                  {Array.from({ length: 24 }).map((_, i) => {
                    const top = ((i * 19) % 80) + 10;
                    const left = ((i * 29) % 85) + 5;
                    return (
                      <div
                        key={i}
                        style={{
                          top: `${top}%`,
                          left: `${left}%`,
                          animation: `pulse 0.8s infinite`,
                        }}
                        className="absolute w-3.5 h-3.5 rounded-full bg-amber-400 shadow-[0_0_10px_#f59e0b] flex items-center justify-center text-[7px] font-bold text-slate-950"
                      >
                        H₂O
                      </div>
                    );
                  })}
                  <div className="absolute top-2 right-4 text-[10px] text-amber-300 font-mono">
                    Compressible & Occupe tout le récipient
                  </div>
                </div>
              )}
            </div>

            <div className="absolute bottom-2 left-4 text-xs font-mono text-slate-400 bg-slate-950/80 px-2 py-1 rounded">
              Conservation de la masse : 24 molécules d’eau à tout moment (m = constante)
            </div>
          </div>
        </div>
      )}

      {/* 3. Fractions & Proportions Simulator */}
      {config.type === 'fraction' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Numérateur (parts coloriées) : <span className="font-mono text-blue-600 font-bold">{numerator}</span>
              </label>
              <input
                type="range"
                min="0"
                max={denominator}
                value={numerator}
                onChange={(e) => setNumerator(Math.min(parseInt(e.target.value), denominator))}
                className="w-full accent-blue-600 cursor-pointer"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Dénominateur (découpage total) : <span className="font-mono text-blue-600 font-bold">{denominator}</span>
              </label>
              <input
                type="range"
                min="1"
                max="12"
                value={denominator}
                onChange={(e) => {
                  const newDen = parseInt(e.target.value);
                  setDenominator(newDen);
                  if (numerator > newDen) setNumerator(newDen);
                }}
                className="w-full accent-indigo-600 cursor-pointer"
              />
            </div>
          </div>

          {/* Fraction visualization bar & circle */}
          <div className="bg-white dark:bg-slate-950 p-6 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col items-center">
            <div className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 font-mono mb-4 flex items-center gap-4">
              <span className="flex flex-col items-center leading-none">
                <span>{numerator}</span>
                <span className="w-12 h-1 bg-slate-900 dark:bg-slate-100 my-1 rounded" />
                <span>{denominator}</span>
              </span>
              <span className="text-slate-400 font-normal">=</span>
              <span className="text-2xl text-slate-700 dark:text-slate-200">
                {((numerator / denominator) * 100).toFixed(1)}%
              </span>
            </div>

            {/* Visual Partition Bar */}
            <div className="w-full max-w-md h-12 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden flex border-2 border-slate-300 dark:border-slate-700 shadow-inner">
              {Array.from({ length: denominator }).map((_, index) => (
                <div
                  key={index}
                  onClick={() => setNumerator(index + 1)}
                  className={`flex-1 h-full border-r border-slate-300 dark:border-slate-700 flex items-center justify-center text-xs font-mono font-bold transition-all cursor-pointer ${
                    index < numerator
                      ? 'bg-blue-500 text-white shadow-inner'
                      : 'hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400'
                  }`}
                >
                  1/{denominator}
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-3 text-center">
              Clique sur une case de la barre pour ajuster les parts directement !
            </p>
          </div>
        </div>
      )}

      {/* 4. Tectonics & Earthquake Simulator */}
      {config.type === 'tectonics' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setTectonicMode('subduction')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  tectonicMode === 'subduction'
                    ? 'bg-green-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                Convergence (Subduction & Fosse)
              </button>
              <button
                onClick={() => setTectonicMode('divergence')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  tectonicMode === 'divergence'
                    ? 'bg-green-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                Divergence (Dorsale Océanique)
              </button>
            </div>

            <button
              onClick={triggerQuake}
              className="px-4 py-2 text-xs font-bold rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-[0_3px_0_#b45309] active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-1.5"
            >
              <AlertCircle className="w-4 h-4 text-slate-950" />
              Déclencher la rupture (Séisme)
            </button>
          </div>

          <div className={`relative w-full h-56 bg-slate-900 rounded-xl overflow-hidden border border-slate-800 p-4 transition-transform ${earthquakeTriggered ? 'animate-bounce' : ''}`}>
            <svg viewBox="0 0 500 200" className="w-full h-full">
              {/* Asthenosphere background */}
              <rect x="0" y="120" width="500" height="80" fill="#78350f" opacity="0.6" />
              <text x="20" y="180" fill="#fde68a" fontSize="11" fontStyle="italic">Asthénosphère déformable (manteau ductile)</text>

              {tectonicMode === 'subduction' ? (
                <>
                  {/* Continental Plate on right */}
                  <polygon points="260,30 490,30 490,120 280,120" fill="#475569" />
                  <text x="350" y="70" fill="#ffffff" fontWeight="bold" fontSize="12">Plaque continentale</text>

                  {/* Ocean Plate sliding underneath on left */}
                  <polygon points="10,60 250,60 320,150 260,160 10,120" fill="#0284c7" />
                  <text x="60" y="90" fill="#ffffff" fontWeight="bold" fontSize="12">Plaque océanique dense</text>

                  {/* Foyer rupture point */}
                  <circle cx="285" cy="110" r={earthquakeTriggered ? "14" : "6"} fill="#ef4444" className={earthquakeTriggered ? "animate-ping" : ""} />
                  <text x="300" y="115" fill="#f87171" fontWeight="bold" fontSize="12">★ Foyer (Hypocentre en profondeur)</text>

                  {/* Epicenter on surface */}
                  <circle cx="285" cy="30" r="5" fill="#facc15" />
                  <line x1="285" y1="110" x2="285" y2="30" stroke="#facc15" strokeDasharray="3 3" strokeWidth="2" />
                  <text x="300" y="35" fill="#facc15" fontWeight="bold" fontSize="12">▲ Épicentre (dégâts maximaux)</text>
                </>
              ) : (
                <>
                  {/* Divergence - Ridge */}
                  <polygon points="10,40 220,40 200,120 10,120" fill="#0284c7" />
                  <polygon points="280,40 490,40 490,120 300,120" fill="#0284c7" />
                  <path d="M 220 40 L 250 80 L 280 40" fill="none" stroke="#f97316" strokeWidth="3" />
                  <polygon points="240,160 260,160 250,80" fill="#ea580c" />
                  <text x="250" y="25" textAnchor="middle" fill="#ea580c" fontWeight="bold" fontSize="13">Dorsale : remontée de magma & expansion</text>
                  <text x="100" y="80" fill="#ffffff" fontSize="12">← Écartement plaque A</text>
                  <text x="340" y="80" fill="#ffffff" fontSize="12">Écartement plaque B →</text>
                </>
              )}
            </svg>
          </div>
        </div>
      )}

      {/* 5. Algorithm & Robot Controller */}
      {config.type === 'algorithm' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Capteur Ultrason (Distance obstacle) : <span className="font-mono text-purple-600 font-bold">{robotDistance} cm</span>
              </label>
              <input
                type="range"
                min="2"
                max="50"
                value={robotDistance}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  setRobotDistance(val);
                  if (val <= 10) {
                    setRobotStatus('⚠️ OBSTACLE DÉTECTÉ (< 10 cm) : Arrêt & Rotation 90° droite');
                  } else {
                    setRobotStatus('🟢 Voie libre : Avancer en ligne droite (Moteurs G & D = 100%)');
                  }
                }}
                className="w-full accent-purple-600 cursor-pointer"
              />
            </div>

            <div className="flex flex-col justify-center">
              <span className="text-xs text-slate-500">Comportement du microcontrôleur :</span>
              <div className={`text-xs font-bold font-mono mt-1 p-2 rounded border ${
                robotDistance <= 10
                  ? 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-900'
                  : 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-900'
              }`}>
                {robotStatus}
              </div>
            </div>
          </div>

          {/* Scratch Blocks Visual Representation */}
          <div className="bg-slate-900 p-4 rounded-xl font-mono text-xs text-white space-y-2 border border-slate-800">
            <div className="bg-amber-600 px-3 py-1.5 rounded-md inline-block font-bold">
              quand 🟢 cliqué
            </div>
            <div className="bg-amber-700/80 px-3 py-1.5 rounded-md ml-2 inline-block">
              répéter indéfiniment
            </div>
            <div className="ml-6 space-y-1.5 border-l-2 border-amber-600/50 pl-3">
              <div className="bg-sky-600 px-3 py-1 rounded-md">
                mettre <span className="bg-sky-800 px-1 rounded text-amber-300">distance</span> à (distance capteur ultrason)
              </div>
              <div className="bg-orange-600 px-3 py-1.5 rounded-md">
                si &lt; <span className="bg-orange-800 px-1 rounded">distance</span> &lt; 10 &gt; alors
              </div>
              <div className="ml-4 space-y-1 border-l-2 border-orange-500/50 pl-3">
                <div className={`px-2 py-1 rounded transition-colors ${robotDistance <= 10 ? 'bg-rose-600 font-bold' : 'bg-blue-600'}`}>
                  arrêter les moteurs
                </div>
                <div className={`px-2 py-1 rounded transition-colors ${robotDistance <= 10 ? 'bg-rose-600 font-bold' : 'bg-blue-600'}`}>
                  tourner de 90 degrés
                </div>
              </div>
              <div className="bg-orange-600 px-3 py-1 rounded-md">
                sinon
              </div>
              <div className="ml-4 border-l-2 border-orange-500/50 pl-3">
                <div className={`px-2 py-1 rounded transition-colors ${robotDistance > 10 ? 'bg-emerald-600 font-bold' : 'bg-blue-600'}`}>
                  avancer de 10 pas
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
