
// import { AiOutlineDelete } from "react-icons/ai";
// import { useRouter } from 'next/navigation';

export default function SingleData({product_name , product_quantity , buying_price , selling_price , product_desc , header} : any) {

  return (
    <div className='border flex flex-col justify-center items-center gap-0 '>
      {

        header ? 

        <div className='border border-gray-200 shadow-lg bg-gray-300 grid grid-cols-5 items-center w-full h-15 p-2 px-3'>

            <h1>Name</h1>
            <h1>Quantity</h1>
            <h1>Buying Price</h1>
            <h1>Selling Price</h1>
            <h1>Description</h1>
            
        </div>

        : 

        <div className={`border border-gray-200 shadow-lg bg-gray-100 grid grid-cols-5 items-center w-full min-h-15 p-2 px-3 hover:bg-gray-200`}>

        <p>{product_name}</p>
        <p>{product_quantity}</p>
        <p>{buying_price}</p>
        <p>{selling_price}</p>
        <p>{product_desc}</p>
        </div>

      }
    </div>
  )
}
