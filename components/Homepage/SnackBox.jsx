import Image from 'next/image'
import React from 'react'

function SnackBox({data}) {
  return (
    <div className='flex flex-col gap-2 md:gap-4 2xl:items-center'>
            <h3 className=' page-title font-semibold md:font-bold'>Create snack box</h3>
            <p className=' text-color-dark-gray'>Create Snack box of your choice in your style</p>
        <div className='grid grid-flow-col md:flex md:flex-wrap gap-3 md:gap-4 mt-2  max-w-full overflow-x-scroll lg:overflow-x-visible '>
            {
                data?.categories.map((d,idx)=>{
                    return(
                        <div className='flex flex-col gap-3 items-center min-w-[73px] md:min-w-[180px]' key={"snack-box-"+idx}>
                            <Image
                                src={d.img}
                                width={d.width}
                                height={d.height}
                                alt={d.title}
                            />
                            <p className='description r'>{d.title}</p>
                        </div>
                    )
                })
            }
        </div>

    </div>
  )
}

export default SnackBox