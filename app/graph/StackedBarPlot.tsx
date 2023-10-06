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

    const [target_year, setTargetYear] = useState(0)

    function request_year_datas(ty: number) {
      axios.get(
        'http://127.0.0.1:5000/get_year_data?target_year='+ty
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
    }

    useEffect(() => {
      const date_obj = new Date()
      request_year_datas(date_obj.getFullYear())
      setTargetYear(date_obj.getFullYear())
    }, [])

    function changeTargetYear(kind: number) {
      let ty = target_year + kind
      request_year_datas(ty)
      setTargetYear(ty)
    }
    
    return (
    <div className="bar-plot-area my-2">
      <div className="text-2xl font-semibold text-center">
        <p>{target_year} Year</p>
      </div>
        <div className="mb-3">
          <Bar options={options} data={year_data} />
        </div>
        <div className="calculate-area py-5 container mx-auto text-center text-2xl font-medium">
          <div className="">
            <button onClick={() => changeTargetYear(-1)} type="button" className="text-white bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-5 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">prev</button>
            <button onClick={() => changeTargetYear(1)} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">next</button>
          </div>
        </div>
    </div>
  );
}
