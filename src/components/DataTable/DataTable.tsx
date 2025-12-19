// import React from 'react'
import axios from "axios"
import { useEffect, useRef, useState } from "react";
import SingleData from "./sub_comp/SingleData";
import SearchData from "./sub_comp/SearchData";
// import PaginatedItems from "./sub_comp/PaginatedItems";
import PaginationComp from "./sub_comp/Pagination";


export const fetchShoppingData = async(page : any, search? : any) => {
        try{
            const res = await axios.get(`http://localhost:4000/api/v1/shopping${search ? `/${search}` : `?limit=${5}&page=${page}`}`);
            console.log(res);
            if(res.data){
                return res.data;
            }

        } catch(err){
            console.log("Error comes in fetching data" , err)
        }
    }

function DataTable() {

    const [data , setData] = useState([]);
    const [error , setError] = useState(null);
    const [page , setPage] = useState(1);

    const totalPages = useRef(1);
    console.log(totalPages);


    const pageChangeHandler = (page : any) => {
        setPage(page)
    }


    useEffect(() => {

        fetchShoppingData(page)
        .then((data) => {
            totalPages.current = data.totalPages
            setData(data.data)
        })
        .catch((err) => setError(err))

    } ,[page])

  return (
    <div className="flex flex-col justify-center items-center gap-10 pt-5">

        <SearchData setData={setData} setError={setError}/>


      <div className=" w-[70%] flex flex-col gap-1 border">
            <SingleData header={true}/>
            {
                error === 'Data not found' && 
                <div>Not Found</div>
            }

            {
                    !error && Array.isArray(data) && data.length > 0 &&
                    data.map(d => {
                        const {id , product_name , product_quantity , buying_price , selling_price , product_desc} = d;
                        return <SingleData key={id} product_name={product_name} product_quantity={product_quantity} buying_price={buying_price} selling_price={selling_price} product_desc={product_desc}/>
                    })
                    
            }
            {
                !error && Array.isArray(data) && data.length <=0 &&
                <div></div>
            }
      </div>

      {/* <div className="flex gap">
        
      </div> */}

      {/* <Pagination page={page} totalPages={totalPages.current} onPageChange={pageChangeHandler}/> */}

      <PaginationComp page={page} totalPages={totalPages.current} onPageChange={pageChangeHandler} />,

    </div>
  )
}

export default DataTable
