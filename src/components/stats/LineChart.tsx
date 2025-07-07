import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { type ChartData } from '../../services/statsService';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface LineChartProps {
  data: ChartData;
  height?: number;
}

const LineChart: React.FC<LineChartProps> = ({ data, height = 200 }) => {
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
      borderColor: chartColors[index % chartColors.length],
      backgroundColor: `${chartColors[index % chartColors.length]}20`,
      borderWidth: 3,
      pointBackgroundColor: chartColors[index % chartColors.length],
      pointBorderColor: '#ffffff',
      pointBorderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6,
      tension: 0.4,
      fill: true,
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
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineChart; 