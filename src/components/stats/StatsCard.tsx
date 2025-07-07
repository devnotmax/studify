import React from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  className?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  className = '',
  trend
}) => {
  return (
    <div className={`bg-white rounded-xl p-6 shadow-sm border border-lightBorder ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-secondaryText">{title}</h3>
        {icon && (
          <div className="text-brown">
            {icon}
          </div>
        )}
      </div>
      
      <div className="mb-2">
        <div className="text-2xl font-bold text-text">{value}</div>
        {subtitle && (
          <p className="text-sm text-secondaryText mt-1">{subtitle}</p>
        )}
      </div>

      {trend && (
        <div className="flex items-center">
          <span className={`text-sm font-medium ${
            trend.isPositive ? 'text-green-600' : 'text-red-600'
          }`}>
            {trend.isPositive ? '+' : ''}{trend.value}%
          </span>
          <span className="text-xs text-secondaryText ml-1">vs mes anterior</span>
        </div>
      )}
    </div>
  );
};

export default StatsCard; 