// import {useState } from 'react'
// import axios from 'axios';
import QuesAns from './sub components/QuesAns';
import {data} from './data'

function FrequentlyAskedQuestions() {

    // const [data , setData] = useState([]);
    // console.log(data);

    // const fetchData = async() => {
    //       try{
  
    //           const res = await axios.get('http://localhost:4000/get-data');
    //           if(res.data){
    //               setData(res.data)
    //           }
  
    //       } catch(err){
    //           console.log("Error comes in fetching -> " , err)
    //       }
    //   }
  
    //   useEffect(() => {
    //       fetchData();
    //   } , []);

   return (
    <div className="flex flex-col gap-10 p-10">
      <h1 className="text-2xl font-bold m-auto">Frequent ask questions</h1>
      <div className=" border flex flex-col gap-5 w-[50vw] h-[50vh] m-auto rounded-2xl shadow-2xl bg-gray-200 p-10 overflow-auto">

        {
          data.map((d : any) => {
            const {question , answer} = d;
            return <QuesAns question={question} answer={answer}/>
          })
        }

      </div>

    </div>
  )
}

export default FrequentlyAskedQuestions;