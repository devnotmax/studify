import React, { useState } from 'react';
import { testConnection } from '../services/api';

const ApiTest: React.FC = () => {
  const [result, setResult] = useState<{ success: boolean; data?: any; error?: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleTestConnection = async () => {
    setLoading(true);
    setResult(null);
    
    try {
      const response = await testConnection();
      setResult(response);
    } catch (error) {
      setResult({ success: false, error: 'Error inesperado' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Prueba de Conexión API</h3>
      
      <button
        onClick={handleTestConnection}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? 'Probando...' : 'Probar Conexión'}
      </button>

      {result && (
        <div className={`mt-4 p-3 rounded ${result.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          <h4 className="font-semibold">
            {result.success ? '✅ Conexión Exitosa' : '❌ Error de Conexión'}
          </h4>
          {result.success && result.data && (
            <pre className="mt-2 text-sm">{JSON.stringify(result.data, null, 2)}</pre>
          )}
          {!result.success && result.error && (
            <p className="mt-2">{result.error}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ApiTest; 