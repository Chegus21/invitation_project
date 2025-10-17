import { Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { getAllInvitationIds } from "../data/invitations";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const location = useLocation();

  const isInvitationRoute = location.pathname.startsWith("/invitation/");
  const currentInvitationId = location.pathname.split("/invitation/")[1];

  // Detectar modo admin
  const queryParams = new URLSearchParams(location.search);
  const adminKey = queryParams.get("admin");
  const ADMIN_KEY = "zeus-access";

  useEffect(() => {
    if (adminKey === ADMIN_KEY) {
      localStorage.setItem("isAdmin", "true");
    }
  }, [adminKey]);

  const isAdmin = localStorage.getItem("isAdmin") === "true";

  // Guardar la última invitación visitada
  useEffect(() => {
    if (isInvitationRoute && currentInvitationId) {
      localStorage.setItem("lastInvitationId", currentInvitationId);
    }
  }, [isInvitationRoute, currentInvitationId]);

  // ⚡ Si es admin, permitir TODO (main + invitaciones)
  if (isAdmin) {
    return <>{children}</>;
  }

  // 🔒 Usuario normal
  if (!isInvitationRoute && !(location.pathname === "/" && isAdmin)) {
    const lastInvitationId = localStorage.getItem("lastInvitationId");

    if (lastInvitationId) {
      return <Navigate to={`/invitation/${lastInvitationId}`} replace />;
    }

    // Si no hay última invitación, mostrar acceso restringido
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Acceso restringido
          </h2>
          <p className="text-gray-600">
            Esta página no está disponible públicamente.
          </p>
        </div>
      </div>
    );
  }

  // Acceso normal a la invitación
  return <>{children}</>;
}

export default ProtectedRoute;
