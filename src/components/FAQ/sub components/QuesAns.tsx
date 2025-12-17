import { useState } from "react";
import { TiArrowRightThick ,TiArrowDownThick } from "react-icons/ti";

function QuesAns({question , answer} : any) {
    const [showAnswer , setShowAnswer] = useState(false);

  return (
    <div onClick={() => {setShowAnswer((prev : any) => !prev)}} className="border border-gray-50 bg-gray-100 p-4 rounded-xl flex flex-col justify-center shadow-2xl hover:scale-102 transition-all duration-500 cursor-pointer">

        <div className="flex items-center gap-1">

            {
                !showAnswer && <TiArrowRightThick size={30}/>
            }
            {
                showAnswer && <TiArrowDownThick size={30}/>
            }

                {/* Question */}
            <h1 className="text-xl font-bold">{question}</h1>
        </div>

            {/* Answer */}
         {
            showAnswer && 
            <div className="ml-12 text-xl">{answer}</div>
         }
    </div>
  )
}

export default QuesAns
