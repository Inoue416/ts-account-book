// TODO: ダミーデータ部分を状態管理に移行する

import React, { useEffect, useState } from 'react';
import axios from 'axios';
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

const labels = [
    "January",   
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
]

export function StackedBarPlot() {
    const [year_data, setYearData] = useState({
        labels: labels,
        datasets: []
    })

    let data = {
      labels,
      datasets: [
        {
          label: 'Income',
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          backgroundColor: 'rgb(75, 192, 192)',
        },
        {
          label: 'Payment',
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          backgroundColor: 'rgb(255, 99, 132)',
        }
      ],
    }

    useEffect(() => {
        axios.get(
            'http://127.0.0.1:5000/get_year_data'
        ).then((response) => {
            let res_data = response.data
            console.log(res_data.response_message)
            const year_datas = res_data.data
            Object.keys(year_datas).map((key, index) => {
              year_datas[key].forEach((value, arr_index, arr) => {
                let month: Number = Number(value[5].split("-", 2)[1]) - 1
                console.log(value[3])
                if (value[3] === "income") {
                  console.log('I')
                  data.datasets[0].data[month] += Number(value[1])
                } else {
                  console.log("P")
                  data.datasets[1].data[month] += Number(value[1])
                }
              })
            })
            setYearData(data)
        }).catch((error) => {
            console.log(error)
        })
        }, [])
    return (
    <div className="bar-plot-area">
        <Bar options={options} data={year_data} />
    </div>
  );
}
