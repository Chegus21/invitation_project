import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { InvitationData } from '../../data/invitations';
import { isExpired, expirationLabel } from '../../data/validity';

export const ExpiredBanner: React.FC<{ data: InvitationData }> = ({ data }) => {
  if (!isExpired(data)) return null;
  return (
    <div className="max-w-5xl mx-auto my-4 px-4">
      <div className="rounded-lg border border-amber-300 bg-amber-50 p-3 text-amber-800 flex items-center gap-2">
        <AlertTriangle className="w-5 h-5" />
        Esta invitación ha expirado. Vigente hasta {expirationLabel(data)}.
      </div>
    </div>
  );
};
