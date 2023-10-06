"use client"
import { useEffect } from "react"
import {StackedBarPlot} from "./StackedBarPlot"
import axios from "axios"



export default function Home() {
  return (
    <div className={"graph-main"}>
      <StackedBarPlot />
    </div>
  )
}
