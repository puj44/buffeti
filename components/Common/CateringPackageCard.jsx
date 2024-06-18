import Image from 'next/image'
import Link from 'next/link'
import React, { useMemo } from 'react'

function CateringPackageCard(props) {
    
  const {pack,packageName,numberOfPeople,mobile,miniMeal} = useMemo(()=>{
    return props;
  },[props])
  return (
    <div 
        className={`p-0 md:p-4 ${ !miniMeal ?"md:border-[#E3E5E5] md:border-[1px]":"" }
            flex flex-row w-full  md:flex-col  ${!miniMeal ? "md:max-w-[356px]" :"md:max-w-[381px]"} gap-2 md:gap-4 md:h-full
            rounded-md 
        `} 
        key={"s-package-"+packageName}>
            <div className='w-max flex h-[100px] md:w-full md:h-[148.64px]'>
                <Image
                    src={"/catering_services/mini_thali.webp"}
                    width={mobile ? 100 : 349}
                    height={mobile?100:148.64}
                    alt={pack.package_name}
                    style={{
                        width:"100%",
                        height:"100%"
                    }}
                    className=' rounded-md '
                />
            </div>
        <div className={`flex flex-col gap-1  md:gap-4 md:max-w-[${!miniMeal?"356px":"381px"}] justify-between md:h-full w-full`}>
            <div className='flex flex-col md:gap-4'> 

                <p className='package-title font-medium md:font-normal'>{miniMeal ? pack.item_name :pack.package_name}</p>
                <p className='text-color-dark-gray block '>{miniMeal ? pack.description :pack.categories_description}</p>
            </div>
            <div className='flex  flex-row justify-between w-full'>
                <p className='package-title my-auto font-medium '>{miniMeal ?"₹ "+pack.price :"₹ "+pack[`_${numberOfPeople}_pax`]}</p>
                {
                    !miniMeal ?
                    <Link className=' btn transparent-orange-btn text-color-secondary w-[80px] sm:w-[124px] shadow-[0px_4px_15px_0px_#00000008] ' href={`/customise-package/${packageName}`}>
                        {mobile ? "Add" :"Select"}
                    </Link>:
                    <div className=' btn transparent-orange-btn cursor-pointer text-color-secondary w-[80px] sm:w-[124px] shadow-[0px_4px_15px_0px_#00000008] ' onClick={()=>{}}>
                        {mobile ? "Add" :"Select"}
                    </div>
                }
            </div>

        </div>
    </div>
  )
}

export default CateringPackageCard