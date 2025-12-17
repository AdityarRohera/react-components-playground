
export default function Modal({close , acceptOffer} : any) {

    const acceptHandler = () => {
        acceptOffer();
        close();
    }


  return (
    <div onClick={() => close()} id="close" className="w-full h-full bg-black/50 fixed top-0 inset-0 flex justify-center items-center">
        <div onClick={e => e.stopPropagation()} id="modal" className="bg-white border border-gray-200 w-120 h-80 rounded-2xl shadow-2xl flex flex-col gap-8 items-start p-5">
      <button onClick={() => close()} id="close" className="border rounded-2xl p-1 bg-red-400 text-2xl text-white hover:bg-red-500">close</button>
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim pariatur doloribus quod minima ducimus, aspernatur tenetur error quos voluptate nulla dolores neque dicta cupiditate vero! Ab aut culpa sint omnis!
      </div>

      <button id="close" onClick={acceptHandler} className="border rounded-2xl p-1 bg-red-400 text-2xl text-white hover:bg-red-500 ml-35">Accept Offer</button>
    </div>
    </div>
  )
}