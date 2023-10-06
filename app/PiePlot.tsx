// TODO: ダミーデータから状態管理への移行, グラフサイズの調整, 

"use client"
import React, { useEffect, useState } from "react"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);
import {Pie} from "react-chartjs-2"
import axios from "axios";
import { request } from "http";


const sample_data = {
    labels: ["Income", "Payment"],
    datasets: [
        {
            data: [100000, 1500],
            backgroundColor: ["#75feff","#fa6c5c"],
            hoverBackgroundColor:  ["#a8feff","#fcaaa1"],
            borderColor: ["transparent","transparent","transparent"]
        }
    ]
}

export const PiePlot: React.FC = () => {
    console.log('Pie Component...')
    
    const [pie_data, setPieData] = useState({
        labels: [],
        datasets: []
    })

    const date_obj = new Date()
    console.log(date_obj.getMonth()+1)
    const [month_income_total, setMonthIncomeTotal] = useState(0)
    const [month_payment_total, setMonthPaymentTotal] = useState(0)
    const [month_total, setMonthTotal] = useState(0)
    const [target_year, setTargetYear] = useState(0)
    const [target_month, setTargetMonth] = useState(0)
    const [no_data_message, setNotDataMessage] = useState("")

    function request_datas(ty: number, tm: number) {
        
        axios.get(
            // 'http://127.0.0.1:5000/get_month_data?target_year='+String(target_year)+"&target_month="+String(target_month)
            'http://127.0.0.1:5000/get_month_data?target_year='+ty+"&target_month="+tm
        ).then((response) => {
        let month_payment_data: number = 0
        let month_income_data: number = 0
        let month_i_total: number = 0
        const month_data = response.data.month_data
        
        if (response.data.month_data.length === 0){
            setNotDataMessage("No Data ...")
        } else {
            setNotDataMessage("")
            month_data.forEach((value, index, arr) => {
                if (value[1] > 0) {
                    month_income_data += value[1]
                    month_i_total += value[1]
                } else {
                    month_payment_data += value[1]
                    month_income_data += value[1]
                }
            })
            console.log(target_month)
        }
        month_payment_data *= -1

        // if (month_data === []) {
        //     setNotDataMessage("No Data ...")
        // }
        console.log("API function...")
        const pie_d = {
            labels: ["Income", "Payment"],
            datasets: [
                {
                    data: [month_income_data, month_payment_data],
                    backgroundColor: ["#75feff","#fa6c5c"],
                    hoverBackgroundColor:  ["#a8feff","#fcaaa1"],
                    borderColor: ["transparent","transparent","transparent"],
                    borderWidth: 1
                }
            ]
        }
        setPieData(pie_d)
        setMonthIncomeTotal(month_i_total)
        setMonthPaymentTotal(month_payment_data)
        setMonthTotal(month_i_total-month_payment_data)
        setTargetMonth(tm)
        setTargetYear(ty)
        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        console.log("Year: ", target_year, " Month: ", target_month)
        request_datas(date_obj.getFullYear(), date_obj.getMonth()+1)
    }, [])

    function changeTarget(kind: number) {
        let ty: number = target_year
        let tm: number = target_month
        if (kind === 1) {
            if (target_month+kind === 13) {
                tm = 1
                ty = target_year + kind
            } else {
                tm = target_month + kind
            }
        } else { 
            // useEffect(() => {
            if (target_month + kind === 0) { 
                ty = target_year + kind
                tm = 12
            } else {
                tm = target_month + kind
            }
        }
        console.log("Year: ", target_year, " Month: ", target_month)
        request_datas(ty, tm)
    }

    console.log(target_month)
    console.log(target_year)

    return (
        <div className="all-pie-area">
            <div className="target-month-area container mx-auto text-center text-xl font-semibold mt-3 underline">{target_year} Year - {target_month} Month</div>
            <div className="pie-area my-5 container mx-auto">
                <Pie data={pie_data} />
                <p className="text-xl font-semibold">{no_data_message}</p>
            </div>
            <div className="calculate-area py-5 container mx-auto text-center text-2xl font-medium">
                <p>(Income) - (Peyment) = N (Yen)</p>
                <p>{month_income_total} - {month_payment_total} = {month_total}</p>
                <div className="mt-5">
                    <button onClick={() => changeTarget(-1)} type="button" className="text-white bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-5 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">prev</button>
                    <button onClick={() => changeTarget(1)} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">next</button>
                </div>
            </div>
        </div>
    )
}