import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { type ChartData } from '../../services/statsService';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

interface DoughnutChartProps {
  data: ChartData;
  height?: number;
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({ data, height = 200 }) => {
  const chartColors = [
    '#BAA398', // brown
    '#8AA18E', // mossGreen
    '#D3B87F', // mustard
    '#AEB7D6', // periwinkle
    '#D6E5C6', // greenPastel
    '#F6DFD5', // peach
    '#8B5A5A', // burgundy
    '#C9D5DC', // iceBlue
  ];

  const chartData = {
    labels: data.labels,
    datasets: data.datasets.map((dataset) => ({
      ...dataset,
      backgroundColor: chartColors.slice(0, data.labels.length),
      borderColor: '#ffffff',
      borderWidth: 2,
      cutout: '60%',
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: '#565656',
          font: {
            size: 12,
          },
          usePointStyle: true,
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#565656',
        bodyColor: '#565656',
        borderColor: '#bcb7cc',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
      },
    },
  };

  return (
    <div style={{ height }}>
      <Doughnut data={chartData} options={options} />
    </div>
  );
};

export default DoughnutChart; 