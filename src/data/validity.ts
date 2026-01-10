import { InvitationData, TIER_CAPS } from './invitations';

export function isExpired(inv: InvitationData): boolean {
  const created = inv.createdAt ? new Date(inv.createdAt) : null;
  if (!created) return false; // si no hay createdAt, no expira
  const months = TIER_CAPS[inv.tier].validityMonths;
  const expires = new Date(created);
  expires.setMonth(expires.getMonth() + months);
  return new Date() > expires;
}

export function expirationLabel(inv: InvitationData): string {
  const created = inv.createdAt ? new Date(inv.createdAt) : null;
  if (!created) return '';
  const months = TIER_CAPS[inv.tier].validityMonths;
  const expires = new Date(created);
  expires.setMonth(expires.getMonth() + months);
  return expires.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
}
