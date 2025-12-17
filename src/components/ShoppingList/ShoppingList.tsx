// import React from 'react'
import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import axios from 'axios';
import { useDebounce } from "../../hooks/useDebounce";
import { useEffect } from "react";

const fetchData = async(search : string) => {
        try{

            if(!search) return [];

            const res = await axios.get(`https://api.frontendeval.com/fake/food/${search}`);
            // console.log(res);

            if(res.data){
                return res.data
            }

        } catch(err){
            console.log("Error comes in fetching search data -> " , err);
        }
    }

function ShoppingList() {

    const [input , setInput] = useState('');
    const [searchData , setSearchData] = useState<any>([]);
    const [todo , setTodo] = useState<any>([]);
    console.log(todo);

    const debouncedValue = useDebounce(input , 100);

    const changeHandler = async(e : any) => {
        setInput(e.target.value);
    }

    const AddTodoHandler = (e : any) => {
        e.preventDefault();
        setInput('')
        setSearchData([]);

        setTodo((prev : any) => [...prev , e.target.innerText])
    }

    useEffect(() => {
    if(!debouncedValue) return;

    fetchData(debouncedValue)
    .then((data : any) => setSearchData(data))
    .catch((err : any) => setSearchData(err))

  } , [debouncedValue]);
    
  return (
    <div className="bg-gray-100 h-screen w-screen p-5 flex flex-col items-center gap-10 pt-20">

      <h1 className="text-4xl font-bold">My Shopping List</h1>

      <div className="border w-[50%] bg-gray-100 p-10 shadow-2xl min-h-[80%] relative flex flex-col items-center gap-10">

        <div className="flex gap-5 w-full">
            <Input
             placeholder="E.G MILK"
             className="bg-white h-12.5"
             value={input || ''}
             name="input"
             onChange={changeHandler}
             />
            <Button>Search</Button>
        </div>

        <div className="border w-full p-10 rounded-2xl shadow-2xl flex flex-col gap-2">
            {
                todo.length <= 0 &&
                <p className="ml-55 text-2xl">No Shopping list</p>
            }

            {
                todo.length > 0 &&
                todo.map((t : any) => {
                    return <h1 className="text-xl bg-gray-50 rounded-2xl p-1 pl-4 shadow-2xl">{t}</h1>
                })

            }
        </div>

        {
            searchData.length > 0 &&
            <div className=" absolute left-11 top-23 bg-white w-[37vw] min-h-12.5 rounded-sm flex flex-col justify-center gap-1 p-2">
                {
                    searchData.map((search : any) => {
                        return <h1 onClick={AddTodoHandler} className="text-xl bg-gray-50 rounded-2xl p-1 pl-4 cursor-pointer shadow-2xl hover:scale-101">{search}</h1>
                    })
                }
            </div>
        }

      </div>

    </div>
  )
}

export default ShoppingList
