import React from 'react';
import { Link } from 'react-router-dom';
import { getAllInvitationIds, getInvitationData } from '../data/invitations';
import { Calendar, User, ExternalLink } from 'lucide-react';

export const InvitationSelector: React.FC = () => {
  const invitationIds = getAllInvitationIds();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 mb-6 font-serif">
            Invitaciones Digitales Elegantes
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Diseños únicos y personalizados para celebraciones especiales
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {invitationIds.map((id) => {
            const data = getInvitationData(id);
            if (!data) return null;

            return (
              <div key={id} className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-pink-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-rose-700 mb-2 font-serif">
                    {data.name}
                  </h3>
                  <div className="flex items-center justify-center space-x-2 text-gray-600 mb-4">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">
                      {new Date(data.eventDate).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="bg-pink-50 rounded-lg p-3">
                    <p className="text-sm text-gray-600">
                      <strong>Hashtag:</strong> {data.hashtag}
                    </p>
                  </div>
                  <div className="bg-rose-50 rounded-lg p-3">
                    <p className="text-sm text-gray-600">
                      <strong>Padres:</strong> {data.parentsNames.join(' y ')}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link
                    to={`/invitation/${id}`}
                    className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 px-6 rounded-xl font-semibold hover:from-pink-600 hover:to-rose-600 transition-colors duration-300 flex items-center justify-center space-x-2"
                  >
                    <span>Ver Invitación</span>
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                  
                  <button
                    onClick={() => {
                      const url = `${window.location.origin}/invitation/${id}`;
                      navigator.clipboard.writeText(url);
                      alert('¡Link copiado al portapapeles!');
                    }}
                    className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-200 transition-colors duration-300"
                  >
                    Copiar Link
                  </button>
                </div>

                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-xs text-blue-600 text-center">
                    <strong>Link único:</strong> /invitation/{id}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-pink-100">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              ¿Quieres tu propia invitación digital?
            </h2>
            <p className="text-gray-600 mb-6">
              Crea invitaciones elegantes y personalizadas para tus eventos especiales
            </p>
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-8 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-colors duration-300">
              Contactar Ahora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};