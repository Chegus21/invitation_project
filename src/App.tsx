import React from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import { InvitationTemplate } from './components/InvitationTemplate';
import { InvitationSelector } from './components/InvitationSelector';
import { getInvitationData } from './data/invitations';

// Componente para manejar rutas dinámicas de invitaciones
const InvitationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  if (!id) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            ID de invitación no encontrado
          </h1>
          <p className="text-gray-600">
            Por favor verifica el link de la invitación
          </p>
        </div>
      </div>
    );
  }

  const data = getInvitationData(id);
  
  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Invitación no encontrada
          </h1>
          <p className="text-gray-600 mb-6">
            La invitación "{id}" no existe o ha sido removida
          </p>
          <a 
            href="/" 
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Volver al inicio
          </a>
        </div>
      </div>
    );
  }

  return <InvitationTemplate data={data} />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InvitationSelector />} />
        <Route path="/invitation/:id" element={<InvitationPage />} />
      </Routes>
    </Router>
  );
}

export default App;