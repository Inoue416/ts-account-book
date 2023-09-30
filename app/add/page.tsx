// TODO: フォームをより細かいコンポーネントに分けたい
"use client"
import {useState, useEffect} from "react"
import axios from "axios"
import { useRouter } from 'next/navigation';


export default function AddPage() {
    const router = useRouter()
    const [thing, setThing] = useState("")
    const [money, setMoney] = useState("")
    const [kind, setKind] = useState("")
    const [notUseButton, setNotUseButton] = useState(true)

    const onChangeThing = (e) => setThing(e.target.value)
    const onChangeMoney = (e) => setMoney(e.target.value)
    const onChangeKind = (e) => setKind(e.target.value)


    useEffect(
      () => {
        console.log("thing: "+thing)
        console.log("money: "+money)
        console.log("kind: "+kind)
        const checkInputElement = () => {
          if (thing != "" && money != "" && kind != ""){
            return () => setNotUseButton(false)
          } else{
            return () => setNotUseButton(true)
          }
        }
      },
      [thing, money, kind]
    )

    const send_data = (e) => {
      axios.post("http://127.0.0.1:5000/add_info", {
        "thing": thing,
        "money": money,
        "kind": kind
      }).then((response) => {
        console.log(response)
        router.push("/")
      }).catch((err) => {
        console.log(err)
      })
    }
    // TODO: エラーメッセージの表示処理を追加したい
    return (
      <div className="add-main py-3 px-3">
        <div className="form-area">
          <div className="relative z-0 w-full mb-6 group">
              <input type="text" name="floating_thing" id="floating_thing" value={thing} onChange={onChangeThing} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label htmlFor="floating_thing" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">What's thing?</label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
              <input type="number" name="floating_number" id="floating_number" value={money} onChange={onChangeMoney} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label htmlFor="floating_number" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">How match? (Yen)</label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <div className="flex gap-10">
              <div className="inline-flex items-center">
                <label
                  className="relative flex cursor-pointer items-center rounded-full p-3"
                  htmlFor="income"
                  data-ripple-dark="true"
                >
                  <input
                    id="income"
                    name="data-kind"
                    type="radio"
                    value="income"
                    onChange={onChangeKind}
                    className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-pink-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-pink-500 checked:before:bg-pink-500 hover:before:opacity-10"
                    required
                  />
                  <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-pink-500 opacity-0 transition-opacity peer-checked:opacity-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                    >
                      <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                    </svg>
                  </div>
                </label>
                <label
                  className="mt-px cursor-pointer select-none font-light text-gray-700"
                  htmlFor="income"
                >
                  Income
                </label>
              </div>
              <div className="inline-flex items-center">
                <label
                  className="relative flex cursor-pointer items-center rounded-full p-3"
                  htmlFor="payment"
                  data-ripple-dark="true"
                >
                  <input
                    id="payment"
                    name="data-kind"
                    type="radio"
                    value="payment"
                    onChange={onChangeKind}
                    className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-pink-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-pink-500 checked:before:bg-pink-500 hover:before:opacity-10"
                  />
                  <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-pink-500 opacity-0 transition-opacity peer-checked:opacity-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                    >
                      <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                    </svg>
                  </div>
                </label>
                <label
                  className="mt-px cursor-pointer select-none font-light text-gray-700"
                  htmlFor="payment"
                >
                  Payment
                </label>
              </div>
            </div>
          </div>
          <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={send_data}>Submit</button>
        </div>
      </div>
    )
  }
  