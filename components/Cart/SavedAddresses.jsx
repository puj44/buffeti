import React, { useState } from 'react'
import AddressCard from './Address/AddressCard'
import Image from 'next/image'
import AddressModel from '../Common/AddressModel';

function SavedAddresses({
    addresses,
    handleSelectAddress,
    selectedAddress
}) {
  const [addressData, setAddressData] = useState([...addresses ?? []]);
  const [show, setShow] = useState(false);
  const handleCloseModel = ()=>{
    setShow(false);
  }
  const handleChangeInput = (e, field)=>{
    
  }

  const handleSubmit =()=>{

  }

  const handleDetectLocation = ()=>{

  }
  return (
    <div
        className='
            p-4
            grid grid-flow-row gap-4 md:gap-6
            w-full
            address-card
        '
    >
        {
            addressData.length > 0 &&
            <>
            <p className='font-medium product-title'>{"From Saved Address"}</p>
                <div className='grid grid-flow-row gap-4'>
                    {
                        addressData.map((addr,idx)=>{
                            return(
                                <AddressCard 
                                    key={"address-"+idx}
                                    data={addr}
                                    handleSelectAddress={handleSelectAddress ?? (()=>{})}
                                    selectedAddress={selectedAddress}
                                />
                            )
                        })
                    }
                </div>
            </>
        }
        <div className="flex flex-row gap-3 items-center w-fit cursor-pointer" onClick={()=>{}}>
            <Image 
                src={"/icons/plus.webp"}
                width={14}
                height={14}
                alt="Plus"
                priority
            />
            <p className='font-medium'>Add New Address</p>
        </div>
        {
            show && 
            <AddressModel
                handleCloseModel={handleCloseModel}
                handleChangeInput={handleChangeInput}
                handleSubmit={handleSubmit}
                handleDetectLocation={handleDetectLocation}
            />
        }
    </div>
  )
}

export default SavedAddresses