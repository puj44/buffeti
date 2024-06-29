import { setCurrentLocation } from '@/redux/reducers/homeReducer';
import { getCookie, setCookie } from 'cookies-next';
import { Dropdown, Flowbite } from 'flowbite-react'
import Image from 'next/image'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
const customTheme = {
    dropdown:{
        floating:{
            divider:"my-1 h-px bg-[#E3E5E5]",
            item:{
                container: "",
                base: "flex  cursor-pointer px-0 py-1.5 pe-4 items-center justify-start small-title focus:outline-none",
                icon: "mr-2 h-4 w-4"
            },
            
    
            style:{
                dark:"dropdown-box",
                light:"dropdown-box",
                auto:"dropdown-box",
            }
        }
    }
  };
function Location() {
    const {locations} = useSelector((state) => state.home);
    const [location, setLocation] = useState(getCookie("location") ?? null);
    const router = useRouter();
    const {currentLocation} = useSelector((state) => state.home)
    useEffect(()=>{
        if(currentLocation && (currentLocation !== location)){

            setLocation(currentLocation)
        }
    },[currentLocation])
  return (
    location &&
        <Flowbite theme={{ theme: customTheme }}>
            <Dropdown label="" className='cursor-pointer' dismissOnClick={true} renderTrigger={() =>
                <div className='flex flex-row my-auto gap-2 cursor-pointer'>
                    <div className='w-[20px] h-[20px] my-auto'>
                        <Image
                            src={"/icons/location.webp"}
                            width={20}
                            height={20}
                            alt="pin"
                            priority
                        />
                    </div>
                    <p className='text-white'>{location?.charAt(0)?.toUpperCase() + location?.slice(1)}</p>
                </div>
            }>
                
                {
                    locations?.map((data,index)=>{
                        return(
                            <>
                                <Dropdown.Item as="p"  key={`item-`+data} onClick={()=>{
                                    setCookie("location",data,{maxAge:9.461e+7})
                                    setLocation(data)
                                    router.replace(router.asPath);
                                }}>  
                                    {data?.charAt(0)?.toUpperCase() + data?.slice(1)}
                                </Dropdown.Item>
                                {
                                    index !== (locations?.length - 1) && <Dropdown.Divider  key={`item-`+index}  />
                                }
                            </>
                        )
                    })
                }
                
            </Dropdown>
        </Flowbite>
  )
}

export default Location