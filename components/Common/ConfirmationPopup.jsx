import React from 'react'

function ConfirmationPopup({
    title,
    description,
    handleConfirm,
    handleClose,
    confirmLabel,
    show
}) {
if(show)
  return (
    <div className='fixed z-50 left-0 top-0  overflow-hidden w-dvw h-dvh bg-[rgb(0,0,0,0.3)] '>
        <div className="relative w-full h-full flex justify-center align-middle px-3 md:px-0">
            <div className='bg-white flex flex-col gap-4 justify-between overflow-y-scroll sm:overflow-y-visible py-6  relative w-full h-full md:max-w-[500px] max-h-[250px]  my-auto  rounded-lg '>
                <div className='flex flex-col gap-4 w-full px-5'>
                    <p className='font-semibold package-title'>{title ?? "Do you want to continue?"}</p>
                    <p className='text-[#475467]' style={{}}>
                        {description}
                    </p>
                </div>
                <div className='flex flex-row justify-end w-full gap-3 px-5'>
                    <button 
                        className='w-full flex border-[1px]  font-semibold border-[#D0D5DD]  rounded-lg items-center justify-center py-2.5 px-[18px]' 
                        onClick={()=>{handleClose()}}
                        style={{
                        boxshadow: "0px 1px 2px 0px #1018280D"

                        }}
                        >
                        {"Cancel"}
                    </button>
                    <button className='btn primary-btn  font-semibold w-full' onClick={()=>{handleConfirm()}}>
                        {
                            confirmLabel ?? "Continue"
                        }
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ConfirmationPopup