// TODO: ダミーデータから状態管理への移行, グラフサイズの調整, 

"use client"
import React from "react"
import {Chart, ArcElement} from 'chart.js'
Chart.register(ArcElement);
import {Pie} from "react-chartjs-2"

const sample_data = {
    labels: ["Income", "Payment"],
    datasets: [
        {
            data: [0, 10000],
            backgroundColor: ["#75feff","#fa6c5c"],
            hoverBackgroundColor:  ["#a8feff","#fcaaa1"],
            borderColor: ["transparent","transparent","transparent"]
        }
    ]
}

export const PiePlot: React.FC = () => {
    return (
        <div className="pie-area my-5 container mx-auto">
            <Pie data={sample_data} />
        </div>
    )
}