// TODO: ダミーデータから状態管理への移行, グラフサイズの調整, 

"use client"
import React from "react"
import {Chart, ArcElement} from 'chart.js'
Chart.register(ArcElement);
import {Pie} from "react-chartjs-2"

const sample_data = {
    labels: ["Windos", "Mac", "Linux"],
    datasets: [
        {
            data: [50, 30, 20],
            backgroundColor: ["#4169e1","#ff1493","#FFCE56"],
            hoverBackgroundColor:  ["#36A2EB","#FF6384","#FFCE56"],
            borderColor: ["transparent","transparent","transparent"]
        }
    ]
}

export const PiePlot: React.FC = () => {
    return (
        <div>
            <Pie data={sample_data} />
        </div>
    )
}