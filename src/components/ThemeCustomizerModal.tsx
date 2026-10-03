import React from 'react';
import { ThemeConfig, ThemeColorKey, DepthIntensity, LightMode, THEME_PRESETS } from '../types/theme';
import { Palette, Sun, Moon, Sparkles, Check, X, Sliders, RotateCcw, Box } from 'lucide-react';

interface ThemeCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: ThemeConfig;
  onChangeConfig: (newConfig: ThemeConfig) => void;
  onReset: () => void;
}

export const ThemeCustomizerModal: React.FC<ThemeCustomizerModalProps> = ({
  isOpen,
  onClose,
  config,
  onChangeConfig,
  onReset,
}) => {
  if (!isOpen) return null;

  const currentPreset = THEME_PRESETS[config.preset] || THEME_PRESETS.ocean;

  const presetsList = Object.values(THEME_PRESETS);

  const handleSelectPreset = (presetId: ThemeColorKey) => {
    // If switching to dark preset specifically, default mode to dark
    const newMode = presetId === 'dark' ? 'dark' : config.mode;
    onChangeConfig({
      ...config,
      preset: presetId,
      mode: newMode,
    });
  };

  const handleSelectIntensity = (intensity: DepthIntensity) => {
    onChangeConfig({
      ...config,
      intensity,
    });
  };

  const handleSelectMode = (mode: LightMode) => {
    onChangeConfig({
      ...config,
      mode,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-sky-100 dark:bg-sky-950/80 text-sky-600 dark:text-sky-400 flex items-center justify-center shadow-xs">
              <Palette className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">
                Personnalisation du Thème & Effets 3D
              </h3>
              <p className="text-xs text-slate-500">
                Ajuste les ambiances de couleurs, le mode d'éclairage et la profondeur tactile
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 flex items-center justify-center text-slate-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          {/* Section 1: Ambiances de Couleur */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-sky-500" />
              <span>Palette de Couleurs Thématique (6 ambiances)</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {presetsList.map((preset) => {
                const isSelected = config.preset === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => handleSelectPreset(preset.id)}
                    className={`p-3.5 rounded-2xl border text-left transition-all relative card-3d flex flex-col justify-between ${
                      isSelected
                        ? 'bg-slate-50 dark:bg-slate-800/90 border-sky-500 dark:border-sky-400 shadow-md ring-2 ring-sky-500/20'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-6 h-6 rounded-lg bg-gradient-to-tr ${preset.previewClass} shadow-xs border border-white/20`}
                        />
                        <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                          {preset.name}
                        </span>
                      </div>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-sky-500 text-white flex items-center justify-center">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                      {preset.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 2: Mode d'Éclairage (Clair vs Sombre) */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1.5">
              <Sun className="w-3.5 h-3.5 text-amber-500" />
              <span>Mode d'Éclairage</span>
            </label>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleSelectMode('light')}
                className={`p-3.5 rounded-2xl border transition-all flex items-center justify-center gap-2.5 ${
                  config.mode === 'light'
                    ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-400 text-amber-900 dark:text-amber-200 font-bold shadow-xs'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
                }`}
              >
                <Sun className="w-4 h-4 text-amber-500" />
                <span className="text-xs sm:text-sm">Mode Clair (Lumière du jour)</span>
              </button>

              <button
                onClick={() => handleSelectMode('dark')}
                className={`p-3.5 rounded-2xl border transition-all flex items-center justify-center gap-2.5 ${
                  config.mode === 'dark'
                    ? 'bg-sky-950/60 border-sky-400 text-sky-200 font-bold shadow-xs'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
                }`}
              >
                <Moon className="w-4 h-4 text-indigo-400" />
                <span className="text-xs sm:text-sm">Mode Sombre (Confort nocturne)</span>
              </button>
            </div>
          </div>

          {/* Section 3: Intensité du Relief 3D */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1.5">
              <Box className="w-3.5 h-3.5 text-purple-500" />
              <span>Intensité du Relief 3D Tactile</span>
            </label>

            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => handleSelectIntensity('subtle')}
                className={`p-3 rounded-2xl border text-center transition-all ${
                  config.intensity === 'subtle'
                    ? 'bg-slate-100 dark:bg-slate-800 border-sky-500 text-sky-700 dark:text-sky-300 font-bold shadow-xs'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                <div className="text-xs font-bold mb-1">Subtil (2px)</div>
                <div className="text-[10px] text-slate-400">Relief doux & sobre</div>
              </button>

              <button
                onClick={() => handleSelectIntensity('medium')}
                className={`p-3 rounded-2xl border text-center transition-all ${
                  config.intensity === 'medium'
                    ? 'bg-slate-100 dark:bg-slate-800 border-sky-500 text-sky-700 dark:text-sky-300 font-bold shadow-xs'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                <div className="text-xs font-bold mb-1">Standard (4px)</div>
                <div className="text-[10px] text-slate-400">Équilibre parfait 5ème</div>
              </button>

              <button
                onClick={() => handleSelectIntensity('bold')}
                className={`p-3 rounded-2xl border text-center transition-all ${
                  config.intensity === 'bold'
                    ? 'bg-slate-100 dark:bg-slate-800 border-sky-500 text-sky-700 dark:text-sky-300 font-bold shadow-xs'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                <div className="text-xs font-bold mb-1">Prononcé (6px)</div>
                <div className="text-[10px] text-slate-400">Bouton mécanique fort</div>
              </button>
            </div>
          </div>

          {/* Section 4: Live Preview Box */}
          <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
              Aperçu en direct de ton thème :
            </span>

            <div
              className={`p-4 rounded-2xl border transition-all ${
                config.mode === 'dark'
                  ? 'bg-slate-900 border-slate-800 text-white'
                  : 'bg-white border-slate-200 text-slate-900'
              } flex flex-wrap items-center justify-between gap-3 shadow-md`}
              style={{
                borderBottomWidth: config.intensity === 'subtle' ? '2px' : config.intensity === 'medium' ? '4px' : '6px',
                borderBottomColor: currentPreset.primaryShadow,
              }}
            >
              <div>
                <div className="text-xs font-extrabold flex items-center gap-1.5">
                  <span style={{ color: currentPreset.primaryColor }}>Cap</span>
                  <span>Révision 5ème</span>
                </div>
                <div className="text-[11px] text-slate-500">
                  {currentPreset.name} · {config.mode === 'dark' ? 'Sombre' : 'Clair'} · 3D {config.intensity}
                </div>
              </div>

              {/* Sample interactive 3D button */}
              <button
                style={{
                  backgroundColor: currentPreset.primaryColor,
                  boxShadow: `0 ${config.intensity === 'subtle' ? '2px' : config.intensity === 'medium' ? '4px' : '6px'} 0 ${currentPreset.primaryShadow}`,
                }}
                className="px-4 py-2 rounded-xl text-white font-bold text-xs active:translate-y-1 transition-all"
              >
                Bouton 3D Test
              </button>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex items-center justify-between">
          <button
            onClick={onReset}
            className="px-3.5 py-2 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Réinitialiser par défaut</span>
          </button>

          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs sm:text-sm btn-3d-primary"
          >
            Appliquer et enregistrer
          </button>
        </div>
      </div>
    </div>
  );
};
