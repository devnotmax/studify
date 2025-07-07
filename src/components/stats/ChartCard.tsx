import React from 'react';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  loading?: boolean;
  error?: string;
}

const ChartCard: React.FC<ChartCardProps> = ({
  title,
  subtitle,
  children,
  className = '',
  loading = false,
  error
}) => {
  return (
    <div className={`bg-white rounded-xl p-6 shadow-sm border border-lightBorder ${className}`}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-text mb-1">{title}</h3>
        {subtitle && (
          <p className="text-sm text-secondaryText">{subtitle}</p>
        )}
      </div>

      {loading && (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brown"></div>
        </div>
      )}

      {error && (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-red-500 text-sm mb-2">Error al cargar datos</p>
            <p className="text-secondaryText text-xs">{error}</p>
          </div>
        </div>
      )}

      {!loading && !error && children}
    </div>
  );
};

export default ChartCard; 