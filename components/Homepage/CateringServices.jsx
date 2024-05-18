
import React from 'react'
import ServiceCard from '../Cards/ServiceCard'

function CateringServices({services}) {
    
  return (
    <div className='flex flex-col gap-[16px] 2xl:justify-center 2xl:mx-auto'>
        <h3 className='page-title md:font-semibold 2xl:mx-auto'>{"Our Catering Services"}</h3>
        <div className='grid grid-cols-2 xs:grid-flow-col md:grid-cols-3 gap-6  md:gap-4  2xl:mx-auto md:items-baseline '>
            {
                Object.keys(services).map((sv,idx)=>{
                    return(
                        <ServiceCard slug={sv} sv={services[sv]} idx={idx} key={"catering-services-"+idx}/>
                    )
                })
            }
        </div>
    </div>
  )
}

export default CateringServices