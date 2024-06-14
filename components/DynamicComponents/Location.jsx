import { getCookie, setCookie } from 'cookies-next';
import { Dropdown, Flowbite } from 'flowbite-react'
import Image from 'next/image'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
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
    const [location, setLocation] = useState(getCookie("location") ?? false);
  return (
    location &&
        <Flowbite theme={{ theme: customTheme }}>
            <Dropdown label="" className='cursor-pointer' dismissOnClick={true} renderTrigger={() =>
                <div className='flex flex-row my-auto gap-1 cursor-pointer'>
                    <p>{location?.charAt(0)?.toUpperCase() + location?.slice(1)}</p>
                    <div className='w-[12px] h-[7px] my-auto' id={`nav-dropdown-arrow`}>
                        <Image
                            src={"/arrows/dropdown.webp"}
                            width={55}
                            height={31}
                            alt="arrow"
                            style={{width:"100%",height:"100%"}}
                            priority
                        />
                    </div>
                </div>
            }>
                
                {
                    locations?.map((data,index)=>{
                        return(
                            <>
                                <Dropdown.Item as="p"  key={`item-`+data} onClick={()=>{
                                    setCookie("location",data)
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