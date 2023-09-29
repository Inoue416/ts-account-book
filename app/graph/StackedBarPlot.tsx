// TODO: ダミーデータ部分を状態管理に移行する

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
      text: '2023 year',
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
      label: 'income',
      data: [100, 200, 300],
      backgroundColor: 'rgb(255, 99, 132)',
    },
    {
      label: 'Item 1',
      data: [-1000, -80, -50],
      backgroundColor: 'rgb(75, 192, 192)',
    },
    {
      label: 'Item 2',
      data: [-200, -20, -1050],
      backgroundColor: 'rgb(53, 162, 235)',
    },
  ],
};

export function StackedBarPlot() {
  return <Bar options={options} data={data} />;
}
