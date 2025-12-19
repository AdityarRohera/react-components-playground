// import React from 'react'

import { useEffect, useState } from "react"
import { Input } from "../../ui/input"
import { useDebounce } from "../../../hooks/useDebounce";
import { fetchShoppingData } from "../DataTable";


function SearchData({setData , setError} : any) {

    const [input , setInput] = useState('');
    const debouncedValue = useDebounce(input , 200);

    // console.log(input)

    const changeHandler = (e : any) => {
        setInput(e.target.value);
    }

    useEffect(() => {
        if(!debouncedValue){
            fetchShoppingData(1)
             .then((data) => {
                setData(data.data)
             })
             .catch(err => {setError(err)})
            return;
        }

        // call api for filter data
        fetchShoppingData(1, debouncedValue)
        .then((data) => {
            setData(data.data)
        })
        .catch(err => {setError(err)})

    } ,[debouncedValue])

  return (
    <div className="mt-10">
      <Input
      className="w-100 h-12"
      placeholder="Filter Product"
      name="search"
      value={input || ''}
      onChange={changeHandler}
      />
    </div>
  )
}

export default SearchData
