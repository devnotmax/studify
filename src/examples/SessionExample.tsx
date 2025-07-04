import React from 'react';
import { SessionTimer } from '../components/SessionTimer';
import { SessionHistory } from '../components/SessionHistory';
import { StreakStats } from '../components/StreakStats';

/**
 * Ejemplo de uso del sistema de sesiones
 * 
 * Este componente muestra cómo integrar todos los componentes
 * del sistema de sesiones en una página.
 */
export const SessionExample: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Sistema de Sesiones de Estudio
          </h1>
          <p className="text-gray-600">
            Gestiona tus sesiones de estudio con el método Pomodoro
          </p>
        </div>

        {/* Timer Principal */}
        <div className="mb-8">
          <SessionTimer />
        </div>

        {/* Estadísticas y Historial */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <StreakStats />
          <SessionHistory />
        </div>

        {/* Información adicional */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            ¿Cómo funciona?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="font-semibold text-gray-800 mb-2">1. Selecciona</h3>
              <p className="text-sm text-gray-600">
                Elige el tipo de sesión: Focus, Short Break o Long Break
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">⏱️</div>
              <h3 className="font-semibold text-gray-800 mb-2">2. Estudia</h3>
              <p className="text-sm text-gray-600">
                Enfócate en tu tarea durante el tiempo establecido
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🏆</div>
              <h3 className="font-semibold text-gray-800 mb-2">3. Completa</h3>
              <p className="text-sm text-gray-600">
                Finaliza la sesión y ve tu progreso
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionExample; 