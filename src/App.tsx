import React from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import { InvitationTemplate } from './components/InvitationTemplate';
import { InvitationSelector } from './components/InvitationSelector';
import { getInvitationData } from './data/invitations';

// Componente dinámico para cada invitación
const InvitationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) return <div>ID no encontrado</div>;
  const data = getInvitationData(id);
  if (!data) return <div>Invitación no encontrada</div>;
  return <InvitationTemplate data={data} />;
};

function App() {
  return (
    // 👇 Aquí está la clave: define el basename en el Router
    <Router basename="/invitation_project">
      <Routes>
        <Route path="/" element={<InvitationSelector />} />
        <Route path="/invitation/:id" element={<InvitationPage />} />
      </Routes>
    </Router>
  );
}

export default App;
