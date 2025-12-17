// import { useState } from 'react'
import Countdown from "./sub_comp/Countdown"

export default function CountDownTimer() {
//    const [count, setCount] = useState(0);

  return (
   <div className="flex flex-col p-10">
      <div className=" border flex flex-col justify-center gap-10 w-[50vw] h-[50vh] m-auto rounded-2xl shadow-2xl bg-gray-200 p-10 overflow-auto">
        <h1 className="text-3xl font-bold">Countdown Timer</h1>
        <Countdown/>
      </div>

    </div>
  )
}
