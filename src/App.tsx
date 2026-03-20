import React from "react";
import { HashRouter, Routes, Route, useParams } from "react-router-dom";
import { InvitationTemplate } from "./components/InvitationTemplate";
import { InvitationSelector } from "./components/InvitationSelector";
import { getInvitationData } from "./data/invitations";

const InvitationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) return <div>ID no encontrado</div>;

  const data = getInvitationData(id);
  if (!data) return <div>Invitación no encontrada</div>;

  return <InvitationTemplate data={data} />;
};

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<InvitationSelector />} />
        <Route path="/invitation/:id" element={<InvitationPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
