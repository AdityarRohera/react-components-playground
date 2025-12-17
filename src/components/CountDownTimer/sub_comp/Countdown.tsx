// import {useRef, useState } from "react"

// export default function Countdown() {
//     const [clockData , setClockData] = useState<any>({hours : '' , mins : '' , sec : ''});
//     const [startClock , setStartClock] = useState(false);
//     const [pause , setPause] = useState(false);
//     const timerRef = useRef<any>(null);

//     console.log("Ui Rendered");

//     const changeHandler = (e:any) => {
//         const {value , name} = e.target;
//         setClockData((prev : any) => {
//             return {...prev , [name] : value}
//         })
//     }

//     function formatTime(totalSeconds : any) {
//         let hours = Math.floor(totalSeconds / 3600);
//         let minutes = Math.floor((totalSeconds % 3600) / 60);
//         let seconds = totalSeconds % 60;

//         let formattedHours = hours.toString();
//         let formattedMinutes = minutes.toString();
//         let formattedSeconds = seconds.toString();

//         return {hours : formattedHours , mins :formattedMinutes , sec:formattedSeconds};
//     }

//     const runClock = (totalSeconds : any) => {
//         console.log("Clock Running")
//          timerRef.current = setInterval(() => {
//             if (totalSeconds <= 0) {
//                 clearInterval(timerRef.current);
//                 return;
//             }
//             setClockData(formatTime(totalSeconds));
//         }, 1000);
//     }

//     const submitHandler = (e : any) => {
//         e.preventDefault();
//         console.log("Inside submit" , e.target.name)
//         let totalSeconds = Number(clockData.hours)*3600 + Number(clockData.mins)*60 + Number(clockData.sec);
//         runClock(totalSeconds);
//         setStartClock(true);
//         if(e.target.name === 'pause'){
//             setPause(false);
//         }
//     }

//     const pauseHandler = (e:any) => {
//         e.preventDefault();
//         console.log(timerRef);
//         clearInterval(timerRef.current);
//         setPause(true)
//     }

//     const resetHandler = (e : any) => {
//          e.preventDefault();
//          setClockData({hours: '' , mins:'' , sec:''})
//          clearInterval(timerRef.current);
//          setStartClock(false);
//     }

//   return (
//     <div className="flex justify-center items-center">
      
//       {
//         !startClock &&
//         <form className="flex gap-4" action="">
//             <input className="border w-15 text-center text-2xl font-medium" type="text" placeholder="HH" name="hours" value={clockData.hours} onChange={changeHandler} /> :
//             <input className="border w-15 text-center text-2xl font-medium" type="text" placeholder="MM" name="mins" value={clockData.mins} onChange={changeHandler} /> :
//             <input className="border w-15 text-center text-2xl font-medium" type="text" placeholder="SS" name="sec" value={clockData.sec} onChange={changeHandler} />

//             <button onClick={submitHandler} className="border p-3 rounded-xl text-2xl text-white bg-red-500 hover:bg-red-600 h-10 flex justify-center items-center" type="submit">Start</button>
//         </form>
//       }

//       {
//         startClock &&
//         <div className="flex gap-10 ">
//             <div className="flex gap-2 items-center justify-center">
//                 <h1 className="w-15 text-center text-3xl font-medium">{clockData.hours}</h1> :
//                 <h1 className="w-15 text-center text-3xl font-medium">{clockData.mins}</h1> :
//                 <h1 className="w-15 text-center text-3xl font-medium">{clockData.sec}</h1>
//             </div>
        
//             {!pause && <div className="flex gap-5">
//                 <button onClick={pauseHandler} className="border p-3 rounded-xl text-2xl text-white bg-black/60 hover:bg-black/70 h-10 flex justify-center items-center">Pause</button>
//                 <button onClick={resetHandler} className="border p-3 rounded-xl text-2xl text-white bg-black/60 hover:bg-black/70 h-10 flex justify-center items-center">Reset</button>
//             </div>}

//             {pause && <button onClick={(e) => submitHandler(e)} name="pause" className="border p-3 rounded-xl text-2xl text-white bg-black/60 hover:bg-black/70 h-10 flex justify-center items-center">start</button>}

//         </div>
//       }

//     </div>
//   )
// }





// "use client";
import { useEffect, useState, useRef } from "react";

export default function Countdown() {
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<any>(null);

  // convert HH:MM:SS to total seconds
  const calculateTotalSeconds = () => {
    return (
      (parseInt(hours || '0') * 3600) +
      (parseInt(minutes || '0') * 60) +
      parseInt(seconds || '0')
    );
  };

  const startTimer = () => {
    const total = calculateTotalSeconds();
    if (total <= 0) return;

    setTimeLeft(total);
    setIsRunning(true);
    setIsPaused(false);
  };

  const pauseTimer = () => {
    setIsPaused(true);
    clearInterval(intervalRef.current);
  };

  const resumeTimer = () => {
    setIsPaused(false);
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setIsPaused(false);
    setTimeLeft(0);
    setHours("");
    setMinutes("");
    setSeconds("");
  };

  // handle countdown
  useEffect(() => {
    if (!isRunning || isPaused) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          clearInterval(intervalRef.current);
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isRunning, isPaused]);

  // convert timeLeft back to HH:MM:SS for display
  const formatDisplay = () => {
    const h = String(Math.floor(timeLeft / 3600)).padStart(2, "0");
    const m = String(Math.floor((timeLeft % 3600) / 60)).padStart(2, "0");
    const s = String(timeLeft % 60).padStart(2, "0");
    return `${h} : ${m} : ${s}`;
  };

  return (
    <div className="p-4 flex flex-col gap-4 w-full max-w-sm mx-auto text-center">
      {/* If timer is NOT running -> show input fields */}
      {!isRunning && (
        <div className="flex gap-2 justify-center text-xl font-medium">
          <input
            type="number"
            placeholder="HH"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            className="w-16 p-2 border rounded"
          />
          <span>:</span>
          <input
            type="number"
            placeholder="MM"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            className="w-16 p-2 border rounded"
          />
          <span>:</span>
          <input
            type="number"
            placeholder="SS"
            value={seconds}
            onChange={(e) => setSeconds(e.target.value)}
            className="w-16 p-2 border rounded"
          />
        </div>
      )}

      {/* If timer IS running -> show countdown UI */}
      {isRunning && (
        <div className="text-3xl font-bold">{formatDisplay()}</div>
      )}

      {/* Buttons */}
      <div className="flex justify-center gap-3">
        {!isRunning && (
          <button
            onClick={startTimer}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Start
          </button>
        )}

        {isRunning && !isPaused && (
          <button
            onClick={pauseTimer}
            className="px-4 py-2 bg-yellow-500 text-white rounded"
          >
            Pause
          </button>
        )}

        {isRunning && isPaused && (
          <button
            onClick={resumeTimer}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Start
          </button>
        )}

        {isRunning && (
          <button
            onClick={resetTimer}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
}