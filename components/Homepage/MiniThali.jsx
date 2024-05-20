import React from 'react'
import CateringPackageCard from '../Common/CateringPackageCard';

function MiniThali({data}) {
    const packages = {
        "thali-1":{
            name:"Package Name",
            items:3,
            price:300,
            img:"/packages/dummy_pack.webp",
            width:102,
            height:106,
            activeImage:{
                url: "/catering_services/snack_box.webp",
                width:349,
                height:109
            },
            description:"2 starters, 2 main courses, 1 choice of bread, 1 rice, 1 dal, and 1 sweet."
        },
        "thali-2":{
            name:"Package Name",
            items:3,
            price:400,
            img:"/packages/dummy_pack.webp",
            width:102,
            height:106,
            activeImage:{
                url: "/catering_services/snack_box.webp",
                width:349,
                height:109
            },
            description:"2 starters, 2 main courses, 1 choice of bread, 1 rice, 1 dal, and 1 sweet."
        },
        "thali-3":{
            name:"Package Name",
            items:3,
            price:300,
            img:"/packages/dummy_pack.webp",
            width:102,
            height:106,
            activeImage:{
                url: "/catering_services/snack_box.webp",
                width:349,
                height:109
            },
            description:"2 starters, 2 main courses, 1 choice of bread, 1 rice, 1 dal, and 1 sweet."
        },
        "thali-4":{
            name:"Package Name",
            items:3,
            price:300,
            img:"/packages/dummy_pack.webp",
            width:102,
            height:106,
            activeImage:{
                url: "/catering_services/snack_box.webp",
                width:349,
                height:109
            },
            description:"2 starters, 2 main courses, 1 choice of bread, 1 rice, 1 dal, and 1 sweet."
        },
        "thali-5":{
            name:"Package Name",
            items:3,
            price:300,
            img:"/packages/dummy_pack.webp",
            width:102,
            height:106,
            activeImage:{
                url: "/catering_services/snack_box.webp",
                width:349,
                height:109
            },
            description:"2 starters, 2 main courses, 1 choice of bread, 1 rice, 1 dal, and 1 sweet."
        },
        "thali-6":{
            name:"Package Name",
            items:3,
            price:300,
            img:"/packages/dummy_pack.webp",
            width:102,
            height:106,
            activeImage:{
                url: "/catering_services/snack_box.webp",
                width:349,
                height:109
            },
            description:"2 starters, 2 main courses, 1 choice of bread, 1 rice, 1 dal, and 1 sweet."
        }
    };
  return (
    <div className='flex flex-col gap-2 md:gap-4 2xl:items-center'>
           <h3 className='page-title md:font-semibold 2xl:mx-auto'>{data.title}</h3>
           <div className='overflow-x-scroll md:overflow-hidden grid grid-flow-col md:flex md:flex-row md:flex-wrap xl:justify-start 2xl:justify-center  gap-5  '> 
                {
                      Object.keys(packages).map((p)=>{
                        const pack = packages[p];
                        return(

                                <CateringPackageCard key={p} pack={pack} />
                        )
                      })
                }
           </div>
    </div>
  )
}

export default MiniThali