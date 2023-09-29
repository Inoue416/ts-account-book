"use client"
import {PiePlot} from "./PiePlot"
import { useState, useEffect } from 'react'


const mainClass = {}

export default function Home() {

  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://127.0.0.1:5000/send_sample_message')
      .then((res) => res.text())
      .then((data) => setMessage(data));
  }, []);

  return (
    <div className="home-main">
      <PiePlot />

      <div className="mt-5 text-9xl">
        <p>{message}</p>
      </div>  
    </div>
  )
}
