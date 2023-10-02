// TODO: ダミーデータから状態管理への移行, グラフサイズの調整, 

"use client"
import React, { useEffect, useState } from "react"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);
import {Pie} from "react-chartjs-2"
import axios from "axios";


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
    // useEffect(() => {
        
    // }, [month])
    const [pie_data, setPieData] = useState({
        labels: [],
        datasets: []
    })
    const [month_income_total, setMonthIncomeTotal] = useState(0)
    const [month_payment_total, setMonthPaymentTotal] = useState(0)
    const [month_total, setMonthTotal] = useState(0)
    const [target_month_data, setTargetMonthData] = useState("")
    useEffect(() => {
        axios.get(
            'http://127.0.0.1:5000/get_month_data'
        ).then((response) => {
            let month_payment_data: number = 0
            let month_income_data: number = 0
            let month_i_total: number = 0
            let target_month: string = ""
            const month_data = response.data.month_data
            month_data.forEach((value, index, arr) => {
                if (target_month === ""){
                    
                    let year_month: Array = value[4].split('-', 2)
                    console.log(year_month)
                    target_month = year_month[1] + ' Month'
                }
                if (value[1] > 0) {
                    month_income_data += value[1]
                    month_i_total += value[1]
                } else {
                    month_payment_data += value[1]
                    month_income_data += value[1]
                }
                month_payment_data *= -1
            })
            console.log(target_month)
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
            setTargetMonthData(target_month)
        }).catch((error) => {
            console.log(error)
        })
    }, [])

    return (
        <div className="all-pie-area">
            <div className="target-month-area container mx-auto text-center text-xl font-semibold mt-3 underline">{target_month_data}</div>
            <div className="pie-area my-5 container mx-auto">
                <Pie data={pie_data} />
            </div>
            <div className="calculate-area py-5 container mx-auto text-center text-2xl font-medium">
                <p>(Income) - (Peyment) = N (Yen)</p>
                <p>{month_income_total} - {month_payment_total} = {month_total}</p>
            </div>
        </div>
    )
}