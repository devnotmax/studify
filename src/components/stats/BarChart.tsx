import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { type ChartData } from '../../services/statsService';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  data: ChartData;
  height?: number;
}

const BarChart: React.FC<BarChartProps> = ({ data, height = 200 }) => {
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
    datasets: data.datasets.map((dataset, index) => ({
      ...dataset,
      backgroundColor: chartColors[index % chartColors.length],
      borderColor: chartColors[index % chartColors.length],
      borderWidth: 1,
      borderRadius: 6,
      borderSkipped: false,
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#565656',
        bodyColor: '#565656',
        borderColor: '#bcb7cc',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#979797',
          font: {
            size: 12,
          },
        },
      },
      y: {
        grid: {
          color: '#f0f0f0',
          drawBorder: false,
        },
        ticks: {
          color: '#979797',
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return (
    <div style={{ height }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart; 