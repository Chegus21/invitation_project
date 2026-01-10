import { InvitationData } from '../data/invitations';

export function buildThemeVars(data: InvitationData, typeDefaults?: { primary: string; secondary: string; accent: string }) {
  const { primary, secondary, accent } = {
    primary: data.colors?.primary ?? typeDefaults?.primary ?? '#0f172a',
    secondary: data.colors?.secondary ?? typeDefaults?.secondary ?? '#1f2937',
    accent: data.colors?.accent ?? typeDefaults?.accent ?? '#6366f1',
  };
  return {
    '--color-primary': primary,
    '--color-secondary': secondary,
    '--color-accent': accent,
    // Derivados útiles
    '--btn-bg': primary,
    '--btn-hover': secondary,
    '--chip-bg': `${accent}20`,
    '--chip-text': accent,
  } as React.CSSProperties;
}