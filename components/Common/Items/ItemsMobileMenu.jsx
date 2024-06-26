import React from 'react'
import { Dropdown, Flowbite } from 'flowbite-react';
import Image from 'next/image';
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
function ItemsMobileMenu({
    show,
    activeItem,
    itemsSelected,
    items,
    handleChangeActiveItem
}) {

if(show)
    return (
        <div className='fixed right-[20px] bottom-[20px] flex justify-end w-full '>
            <Flowbite theme={customTheme}>
                <Dropdown 
                    label="" 
                    placement='top'
                    renderTrigger={()=>
                        <div className='flex flex-col gap-0.5 justify-center items-center bg-primary rounded-full w-[64px] h-[64px]'>
                            <Image 
                                src={"/icons/menu.webp"}
                                width={15.8}
                                height={24}
                                priority
                                alt="menu"
                            />
                            <p className='placeholder text-white'>{"Menu"}</p>
                        </div>
                    }
                >
                    {
                            (items && Object.keys(items)?.length > 0) && Object.keys(items).map((i,idx)=>{
                                const item = items[i];
                                return(
                                    <>
                                        <Dropdown.Item 
                                            key={"category-"+i}
                                            as='p' 
                                            className={`font-medium ${activeItem === i ? "active-sidebar my-auto" :""}`} 
                                            onClick={()=>{
                                                handleChangeActiveItem(i)
                                            }}
                                        >
                                            {items[i]?.name ?? items[i]}
                                        </Dropdown.Item>
                                        {
                                            idx !== (Object.keys(items)?.length - 1) && <Dropdown.Divider  key={`category-div-`+idx}  />
                                        }
                                    </>
                                )
                            })
                    }
                       
                </Dropdown>
            </Flowbite>
        </div>
    )
}

export default ItemsMobileMenu