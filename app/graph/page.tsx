"use client"
import { useEffect } from "react"
import {StackedBarPlot} from "./StackedBarPlot"
import axios from "axios"



export default function Home() {
  useEffect(() => {
    axios.get(
      'http://127.0.0.1:5000/get_year_data'
    ).then((response) => {
      console.log(response)
    }).catch((error) => {
      console.log(error)
    })
  }, [])
  return (
    <div className={"graph-main"}>
      <StackedBarPlot />
    </div>
  )
}
