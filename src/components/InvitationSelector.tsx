import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  getAllInvitationIds,
  getInvitationData,
  invitationsDatabase,
  InvitationData,
  InvitationType,
  InvitationTier,
} from '../data/invitations';
import { Trash2, Plus, Filter, ExternalLink } from 'lucide-react';

const newId = (type: InvitationType) => `${type}-${Math.random().toString(36).slice(2, 8)}`;

const Card: React.FC<{
  data: InvitationData;
  id: string;
  onDelete?: (id: string) => void;
}> = ({ data, id, onDelete }) => {
  return (
    <div className="group relative rounded-2xl border border-slate-200/70 bg-white/70 backdrop-blur-sm shadow-sm hover:shadow-lg transition-all">
      <div className="p-4">
        <div className="flex items-center gap-2 text-[11px]">
          <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 capitalize">{data.type}</span>
          <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 capitalize">{data.tier}</span>
          {data.isDemo && <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">demo</span>}
        </div>

        <h3 className="mt-3 text-lg font-semibold text-slate-800">{data.name}</h3>
        <p className="text-sm text-slate-500">
          {new Date(data.eventDate).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <div className="mt-4 flex items-center gap-2">
          <Link
            to={`/invitation/${id}`}
            className="inline-flex items-center gap-1 rounded-lg bg-slate-900 text-white px-3 py-1.5 text-sm hover:bg-black transition"
          >
            Ver <ExternalLink className="w-4 h-4" />
          </Link>

          {onDelete && (
            <button
              onClick={() => onDelete(id)}
              className="ml-auto inline-flex items-center gap-1 rounded-lg bg-rose-50 text-rose-700 px-3 py-1.5 text-sm hover:bg-rose-100 transition"
              title="Eliminar"
            >
              <Trash2 className="w-4 h-4" /> Eliminar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export const InvitationSelector: React.FC = () => {
  const [_, force] = useState(0);

  const ids = useMemo(() => getAllInvitationIds(), [_]);
  const good = ids.filter((id) => getInvitationData(id)?.isDemo !== true);
  const demos = ids.filter((id) => getInvitationData(id)?.isDemo === true);

  const createDemo = (type: InvitationType, tier: InvitationTier) => {
    const id = newId(type);
    const base: InvitationData = {
      id,
      isDemo: true,
      type,
      tier,
      name: type === 'boda' ? 'Alex & Sam' : type === 'cumple' ? 'Cumple Demo' : 'Quince Demo',
      eventDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      parentsNames: type === 'quince' ? ['Padre Demo', 'Madre Demo'] : [],
      churchAddress: 'Parroquia demo, Centro',
      churchLink: 'CWpigdjFYYnkzeGU6',
      receptionAddress: 'Salón demo, Ciudad',
      receptionLink: '13P4LfYYk8wR7dKQ8',
      hashtag: '#EventoDemo',
      dressCode: 'Formal',
      giftRegistry: [],
      giftLink: ['#'],
      timeline: [
        { time: '17:00', event: 'Ceremonia' },
        { time: '19:00', event: 'Recepción' },
      ],
      googleFormsLink: 'https://forms.gle/ejemplo',
      musicLink: '',
      colors: { primary: '#0F172A', secondary: '#111827', accent: '#6366F1' },
      customization: {
        headerImage: '/media/fondos/9.jpg',
        churchImage: '/media/fondos/9.jpg',
        receptionImage: '/media/fondos/9.jpg',
        galleryImages: [],
      },
      createdAt: new Date().toISOString(),
    };
    invitationsDatabase[id] = base;
    force((x) => x + 1);
  };

  const deleteOne = (id: string) => {
    const inv = getInvitationData(id);
    const isDemo = inv?.isDemo === true;
    const msg = isDemo
      ? '¿Eliminar esta demo?'
      : 'Este registro no es demo. ¿Eliminar de todos modos?';
    if (!confirm(msg)) return;
    delete invitationsDatabase[id];
    force((x) => x + 1);
  };

  const deleteAllDemos = () => {
    if (!confirm('Eliminar TODAS las invitaciones demo?')) return;
    Object.keys(invitationsDatabase).forEach((id) => {
      if (invitationsDatabase[id].isDemo) delete invitationsDatabase[id];
    });
    force((x) => x + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900">
            ESSENCIAL PUEBLA
          </h1>
          <p className="mt-2 text-slate-500">Invitaciones digitales · modernas y personalizadas</p>
        </div>

        {/* Toolbar */}
        <div className="mb-8 rounded-2xl border border-slate-200 bg-white/70 backdrop-blur p-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm text-slate-600 flex items-center gap-2">
              <Filter className="w-4 h-4" /> Crear demo rápida
            </span>
            {(['quince','boda','cumple'] as InvitationType[]).map((t) =>
              (['basic','standard','premium'] as InvitationTier[]).map((tier) => (
                <button
                  key={`${t}-${tier}`}
                  onClick={() => createDemo(t, tier)}
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50 transition"
                >
                  <Plus className="w-4 h-4" /> {t} · {tier}
                </button>
              ))
            )}
            <div className="ml-auto">
              <button
                onClick={deleteAllDemos}
                className="inline-flex items-center gap-1 rounded-lg bg-rose-600 text-white px-3 py-1.5 text-sm hover:bg-rose-700 transition"
              >
                <Trash2 className="w-4 h-4" /> Eliminar demos
              </button>
            </div>
          </div>
        </div>

        {/* Invitaciones reales */}
        <section className="mb-12">
          <div className="flex items-end justify-between mb-3">
            <h2 className="text-xl font-semibold text-slate-900">Invitaciones</h2>
            <span className="text-xs text-slate-500">{good.length} activas</span>
          </div>
          {good.length === 0 ? (
            <div className="rounded-xl border border-slate-200 bg-white/70 p-6 text-center text-slate-500">
              No hay invitaciones aún.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {good.map((id) => {
                const d = getInvitationData(id)!;
                return <Card key={id} data={d} id={id} />;
              })}
            </div>
          )}
        </section>

        {/* Demos */}
        <section>
          <div className="flex items-end justify-between mb-3">
            <h2 className="text-xl font-semibold text-slate-900">Demos</h2>
            <span className="text-xs text-slate-500">{demos.length} demos</span>
          </div>
          {demos.length === 0 ? (
            <div className="rounded-xl border border-slate-200 bg-white/70 p-6 text-center text-slate-500">
              Crea una demo con los botones de arriba.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {demos.map((id) => {
                const d = getInvitationData(id)!;
                return <Card key={id} data={d} id={id} onDelete={deleteOne} />;
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
