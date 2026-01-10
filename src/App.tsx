// App.tsx
import React from 'react';
import { BrowserRouter, HashRouter, Routes, Route, useParams } from 'react-router-dom';
import { InvitationTemplate } from './components/InvitationTemplate';
import { InvitationSelector } from './components/InvitationSelector';
import { getInvitationData } from './data/invitations';

const InvitationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  console.log('[InvitationPage] mount, id=', id);
  if (!id) return <div>ID no encontrado</div>;
  const data = getInvitationData(id);
  if (!data) return <div>Invitación no encontrada</div>;
  return <InvitationTemplate data={data} />;
};

// ==== Setup inteligente de router/base ====
const rawBase = import.meta.env.BASE_URL ?? '/';
/** Normalize: remove trailing slash except keep root '/' */
const normalizedBase = rawBase === '/' ? '/' : rawBase.replace(/\/$/, '');

/**
 * Heurística:
 * - Si BASE_URL empieza con '/' y no es '/', usamos BrowserRouter con basename.
 * - Si no (por ejemplo entornos donde no controlas base o GitHub Pages con 404), HashRouter es más robusto.
 */
const useHashRouter = (() => {
  // For quick test: force hash in dev by setting VITE_FORCE_HASH=true in .env if you want.
  if (import.meta.env.DEV) return false; // probar primero con BrowserRouter en dev
  // en producción, si base es '/', preferimos HashRouter para compatibilidad en GH Pages sin redir
  if (normalizedBase === '/') return true;
  return false;
})();

function App() {
  const Router = useHashRouter ? HashRouter : BrowserRouter;
  const routerProps = useHashRouter ? {} : { basename: normalizedBase };

  console.log('[App] BASE_URL=', rawBase, 'normalizedBase=', normalizedBase, 'useHashRouter=', useHashRouter, 'location=', window.location.pathname);

  return (
    // @ts-ignore
    <Router {...routerProps}>
      <Routes>
        <Route path="/" element={<InvitationSelector />} />
        <Route path="/invitation/:id" element={<InvitationPage />} />
      </Routes>
    </Router>
  );
}

export default App;
