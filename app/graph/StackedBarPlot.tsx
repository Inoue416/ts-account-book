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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  plugins: {
    title: {
      display: true,
      text: 'Chart.js Bar Chart - Stacked',
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [100, 200, -150],
      backgroundColor: 'rgb(255, 99, 132)',
    },
    {
      label: 'Dataset 2',
      data: [100, 200, -150],
      backgroundColor: 'rgb(75, 192, 192)',
    },
    {
      label: 'Dataset 3',
      data: [100, 200, -150],
      backgroundColor: 'rgb(53, 162, 235)',
    },
  ],
};

export function StackedBarPlot() {
  return <Bar options={options} data={data} />;
}
