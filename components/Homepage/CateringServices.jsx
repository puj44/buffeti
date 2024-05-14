
import React from 'react'
import ServiceCard from '../Cards/ServiceCard'

function CateringServices() {
    const services = [
        {
            title:"Snack Box",
            img:"/catering_services/snack_box.webp",
            width:378.12,
            height:240,
            description:"Advantage of food packages with multiple options available in it",
            url:"/coming-soon"
        },
        {
            title:"Suggestive Packages",
            img:"/catering_services/suggestive_package.webp",
            width:382,
            height:394,
            description:"Advantage of food packages with multiple options available in it",
            url:"/coming-soon"
        },
        {
            title:"Mini Thali",
            img:"/catering_services/mini_thali.webp",
            width:378.12,
            height:240,
            description:"Advantage of food packages with multiple options available in it",
            url:"/coming-soon"
        },
    ]
  return (
    <div className='flex flex-col gap-5'>
        <h3 className='page-title font-semibold '>{"Our Catering Services"}</h3>
        <div className='flex flex-wrap gap-6 items-baseline '>
            {
                services.map((sv,idx)=>{
                    return(
                        <ServiceCard sv={sv} idx={idx} key={"catering-services-"+idx}/>
                    )
                })
            }
        </div>
    </div>
  )
}

export default CateringServices