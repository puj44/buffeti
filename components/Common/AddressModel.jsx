import React from 'react'

function AddressModel({
    data,
    handleChangeInput,
    handleDetectLocation,
    handleCloseModel,
    handleSubmit
}) {
  return (
    <div className='fixed z-50 left-0 top-0  overflow-hidden w-dvw h-dvh bg-[rgb(0,0,0,0.3)] '>
        <div className="relative w-full h-full flex justify-center align-middle ">
            <div className='bg-white  relative w-full h-full md:max-w-[642px] md:max-h-[642px] my-auto  rounded-lg '>
            </div>
        </div>
    </div>
  )
}

export default AddressModel