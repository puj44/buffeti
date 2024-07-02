import React, { useState } from 'react'
import AddressCard from './Address/AddressCard'

function SavedAddresses({
    addresses,
    handleSelectAddress,
    selectedAddress
}) {
  const [addressData, setAddressData] = useState([...addresses ?? []])
  return (
    <div
        className='
            p-4
            grid grid-flow-row gap-4 md:gap-6
            w-full
            address-card
        '
    >
        <p className='font-medium product-title'>{"From Saved Address"}</p>
        {
            addressData.length > 0 &&
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
        }
    </div>
  )
}

export default SavedAddresses