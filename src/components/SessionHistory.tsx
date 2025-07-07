import React, { useState, useEffect } from 'react';
import { sessionService } from '../services/sessionService';
import { useAuth } from '../context/AuthContext';
import type { Session, SessionHistory as SessionHistoryType } from '../types';
import TimerIcon from '../icons/TimerIcon';

interface SessionHistoryProps {
  className?: string;
}

export const SessionHistory: React.FC<SessionHistoryProps> = ({ className = '' }) => {
  const { user, isAuthenticated } = useAuth();
  const [history, setHistory] = useState<SessionHistoryType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);

  const loadHistory = async (page: number = 1) => {
    if (!isAuthenticated || !user) {
      setHistory(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await sessionService.getSessionHistory(page, limit);
      setHistory(data);
    } catch (err) {
      setError('Error al cargar el historial de sesiones');
      console.error('Error loading session history:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory(currentPage);
  }, [currentPage, user, isAuthenticated]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getSessionTypeLabel = (sessionType: string) => {
    switch (sessionType) {
      case 'focus':
        return 'Focus';
      case 'short_break':
        return 'Short Break';
      case 'long_break':
        return 'Long Break';
      default:
        return sessionType;
    }
  };

  const getSessionTypeColor = (sessionType: string) => {
    switch (sessionType) {
      case 'focus':
        return 'bg-blue-100 text-blue-800';
      case 'short_break':
        return 'bg-green-100 text-green-800';
      case 'long_break':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (session: Session) => {
    if (session.isCompleted) {
      return 'bg-green-100 text-green-800';
    } else if (session.isCancelled) {
      return 'bg-red-100 text-red-800';
    } else {
      return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getStatusText = (session: Session) => {
    if (session.isCompleted) {
      return 'Completada';
    } else if (session.isCancelled) {
      return 'Cancelada';
    } else {
      return 'En progreso';
    }
  };

  if (loading && !history) {
    return (
      <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Cargando historial...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
        <div className="text-center py-8">
          <div className="text-red-600 mb-2">⚠️</div>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => loadHistory(currentPage)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800 flex items-center">
          <TimerIcon className="w-5 h-5 mr-2" />
          Historial de Sesiones
        </h2>
        {history && (
          <span className="text-sm text-gray-600">
            {history.total} sesiones totales
          </span>
        )}
      </div>

      {history && history.sessions.length > 0 ? (
        <>
          <div className="space-y-4">
            {history.sessions.map((session) => (
              <div
                key={session.id}
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSessionTypeColor(session.sessionType)}`}>
                      {getSessionTypeLabel(session.sessionType)}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(session)}`}>
                      {getStatusText(session)}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {formatDate(session.startTime)}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Duración:</span> {formatDuration(session.duration)}
                  </div>
                  {session.isCompleted && (
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Completado:</span> {formatDuration(session.completedTime)}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Paginación */}
          {history.total > limit && (
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-600">
                Página {currentPage} de {Math.ceil(history.total / limit)}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Anterior
                </button>
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage >= Math.ceil(history.total / limit)}
                  className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Siguiente
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-8">
          <div className="text-gray-400 mb-2">📊</div>
          <p className="text-gray-600">No hay sesiones registradas</p>
          <p className="text-sm text-gray-500 mt-1">
            Inicia tu primera sesión para ver el historial aquí
          </p>
        </div>
      )}
    </div>
  );
}; 