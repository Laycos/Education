export type ThemeColorKey = 'ocean' | 'grey' | 'dark' | 'emerald' | 'amber' | 'purple';
export type DepthIntensity = 'subtle' | 'medium' | 'bold';
export type LightMode = 'light' | 'dark';

export interface ThemeConfig {
  preset: ThemeColorKey;
  intensity: DepthIntensity;
  mode: LightMode;
}

export interface ThemePresetMeta {
  id: ThemeColorKey;
  name: string;
  description: string;
  primaryColor: string;
  primaryShadow: string;
  accentBg: string;
  gradientBg: string;
  darkBg: string;
  previewClass: string;
  iconColor: string;
}

export const THEME_PRESETS: Record<ThemeColorKey, ThemePresetMeta> = {
  ocean: {
    id: 'ocean',
    name: 'Bleu Océan Lumineux',
    description: 'Nuances azur polaire, fraîcheur marine et biseaux bleu ciel',
    primaryColor: '#0284c7',
    primaryShadow: '#0369a1',
    accentBg: 'bg-sky-500',
    gradientBg: 'from-sky-50/80 via-white to-blue-50/60',
    darkBg: 'bg-[#091528]',
    previewClass: 'from-sky-400 to-blue-600',
    iconColor: 'text-sky-500',
  },
  grey: {
    id: 'grey',
    name: 'Gris Ardoise Moderne',
    description: 'Style épuré architectural, zinc contemporain et acier brossé',
    primaryColor: '#475569',
    primaryShadow: '#334155',
    accentBg: 'bg-slate-700',
    gradientBg: 'from-slate-100 via-slate-50 to-zinc-100',
    darkBg: 'bg-[#0f172a]',
    previewClass: 'from-slate-500 to-zinc-700',
    iconColor: 'text-slate-500',
  },
  dark: {
    id: 'dark',
    name: 'Nébuleuse Sombre 3D',
    description: 'Immersion spatiale noir obsidienne et touches néon luminescentes',
    primaryColor: '#38bdf8',
    primaryShadow: '#0284c7',
    accentBg: 'bg-sky-400',
    gradientBg: 'from-slate-900 via-[#0b1120] to-[#070b14]',
    darkBg: 'bg-[#070b14]',
    previewClass: 'from-slate-900 to-sky-900',
    iconColor: 'text-sky-400',
  },
  emerald: {
    id: 'emerald',
    name: 'Émeraude Végétal',
    description: 'Ambiance nature apaisante, vert menthe vivifiant et sauge douce',
    primaryColor: '#059669',
    primaryShadow: '#047857',
    accentBg: 'bg-emerald-600',
    gradientBg: 'from-emerald-50/80 via-white to-teal-50/60',
    darkBg: 'bg-[#06241b]',
    previewClass: 'from-emerald-500 to-teal-700',
    iconColor: 'text-emerald-500',
  },
  amber: {
    id: 'amber',
    name: 'Crépuscule Solaire',
    description: 'Chaleur stimulante, reflets oranger ambré et énergie créative',
    primaryColor: '#d97706',
    primaryShadow: '#b45309',
    accentBg: 'bg-amber-500',
    gradientBg: 'from-amber-50/80 via-white to-orange-50/60',
    darkBg: 'bg-[#1c1209]',
    previewClass: 'from-amber-500 to-orange-600',
    iconColor: 'text-amber-500',
  },
  purple: {
    id: 'purple',
    name: 'Améthyste Galactique',
    description: 'Harmonie violette royale, clarté cognitive et lavande veloutée',
    primaryColor: '#7c3aed',
    primaryShadow: '#6d28d9',
    accentBg: 'bg-purple-600',
    gradientBg: 'from-purple-50/80 via-white to-indigo-50/60',
    darkBg: 'bg-[#150d2a]',
    previewClass: 'from-purple-600 to-indigo-700',
    iconColor: 'text-purple-500',
  },
};
