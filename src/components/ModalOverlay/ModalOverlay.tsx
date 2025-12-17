import { useState } from 'react'
import Modal from './sub_comp/Modal';

function ModalOverlay() {
  const [active , setActive] = useState(false);
  const [accepted ,  setAccepted] = useState(false);

  const closeModal = () => {
    // console.log(e.target.id);
    // if(e.target.id === 'close') setActive(false);
    setActive(false);
  }

  return (
    <div className={`border h-[120vh] w-screen flex flex-col items-center p-20 relative ${active ? '' : ''}`}>
      
      {
        !active && !accepted && <button onClick={() => setActive(true)} className='border'>Show Modal</button>
      }
      
      {
        active && <Modal close={closeModal} acceptOffer={() => {setAccepted(true)}}/>
      }

      {
        accepted && <h1 className='text-2xl'>Offer Accepted</h1>
      }
      
    </div>
  )
}

export default ModalOverlay;
