import Image from 'next/image'
import React from 'react'

function Tickmark({
    isSelected
}) {
  return (
    <span 
        className={`border-[1px] rounded border-[#B42318] relative ${isSelected?"bg-primary":""}
        w-[22px] h-[22px]
    `}>
        {
            isSelected &&
            <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] '>
                <Image
                    src={"/icons/tickmark.webp"}
                    width={11.73}
                    height={8.94}
                    alt='tick'
                    priority
                />
            </div>
        }
    </span>
  )
}

export default Tickmark