import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import navbar from '@/json/navbar.json';
import { useRouter } from 'next/router';
import { store } from '@/redux/store';
import { useSelector } from 'react-redux';
import { Dropdown } from 'flowbite-react';
import { Flowbite } from "flowbite-react";
import dynamic from 'next/dynamic';
const Location = dynamic(() => import('../DynamicComponents/Location'), {
    ssr:false
  })
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

function Header({handleModelClick}) {
    const router = useRouter();
    const auth = useSelector((state)=>state.auth);
    const [mobileMenu, setMobileMenu] = useState(false);
   
    const isPathActive = (url) =>{
        if(url === ""){
            if(router.asPath === "/"){
                return true;
            }
        }else{
            if(router.asPath.includes(url))  return true;
        }
        return false;
    }

    useEffect(()=>{
        if(mobileMenu){
            document.body.style.overflow = 'hidden';
        }else{
            document.body.style.overflow = "scroll"
        }
    },[mobileMenu])


  return (
    <div className='page-spacing'>
        <div id="navbar" className='navbar flex justify-between '>
            <div className='block md:hidden my-auto'>
                <div className={`hamburger cursor-pointer`} onClick={()=>{setMobileMenu(!mobileMenu)}}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
            <div className='flex flex-row gap-2'>
                <div className='w-[66.9px] h-[44px] md:w-[76.01px] md:h-[50px]'>
                    <Link href="/">
                        <Image
                            loader={({ src }) => src}
                            src={`${process.env.NEXT_PUBLIC_IMAGES_URL}/logo/primary_logo.webp`}
                            alt="Buffeti"
                            width={2049}
                            height={1354}
                            className="cursor-pointer"
                            style={{width:"100%",height:"100%"}}
                            priority
                            unoptimized
                        />
                    </Link>
                </div>
                <div className='hidden md:block my-auto'>
                    <Location />
                </div>
            </div>
            <div className='flex flex-row gap-4 md:gap-5 xl:gap-7'>
                <div className={`${mobileMenu ? "flex fixed left-0 top-[66px] w-screen h-screen z-50 px-[26px] py-5 bg-white":"hidden"} md:block`}>

                    <div className={`flex flex-col w-fit md:flex-row h-fit gap-4 md:gap-5 xl:gap-7 md:my-auto`}>
                        {
                            navbar.map((n,idx)=>{
                                return(
                                    n.isDropdown ?
                                    <div className='hidden md:block my-auto' key={"navbar-"+idx}>

                                        <Flowbite theme={{ theme: customTheme }}>
                                            <Dropdown label="" className={`hidden md:block cursor-pointer`}   renderTrigger={() =>  
                                                <div className='flex flex-row my-auto gap-1 cursor-pointer'>
                                                    <h4 className='' id={`nav-dropdown-label`}>{n.title}</h4>
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
                                                    n.dropdownData.map((data,index)=>{
                                                        return(
                                                            <>
                                                                <Dropdown.Item as="div" className={`${isPathActive(data.slug) ? "active-path border-b-[0px] border-none":""}`} key={`item-`+data.slug} >  
                                                                        <Link href={data.url}>
                                                                            {data.title}
                                                                        </Link>
                                                                </Dropdown.Item>
                                                                {
                                                                    index+1 !== n.dropdownData.length && <Dropdown.Divider className={`${isPathActive(data.slug) ? "bg-primary":""}`} key={`item-`+index}  />
                                                                }
                                                            </>
                                                        )
                                                    })
                                                }
                                                
                                            </Dropdown>
                                        </Flowbite>
                                    </div>
                                    :
                                    
                                    <Link key={"navbar-"+idx} href={"/"+(n.url)} onClick={()=>{setMobileMenu(!mobileMenu)}} className={`${n.isMobile ? "flex md:hidden" :""}  relative ${n.isDesktop ? "hidden md:flex":""} md:flex flex-row gap-2 xl:gap-3 align-middle my-auto ${n.className ?? ""}`}>
                                        {
                                        n.img && 
                                        <Image
                                                src={n.img}
                                                alt={n.title}
                                                width={n.width}
                                                height={n.height}
                                                // style={{
                                                //     height:"100%",
                                                //     width:"100%"
                                                // }}
                                                className='my-auto'
                                                sizes="100vw"
                                                loading='lazy'
                                            />
                                        }
                                        <h4 className={`${ isPathActive(n.url) ?"active-nav-mobile md:active-path  ":""} my-auto`}>
                                            {n.title}
                                        </h4>
                                    </Link>
                                )
                            })
                        }
                    
                    </div>
                </div>
                <div className='hidden md:block my-auto'>

                    <div onClick={()=>{!(auth?.isAuthenticated) && handleModelClick(true)}} className={`${auth?.isAuthenticated ? "hidden":""} cursor-pointer flex flex-row gap-2 xl:gap-3 align-middle my-auto`}>

                            <Image
                                src={"/icons/profile.webp"}
                                alt={"signin"}
                                width={16}
                                height={16}
                                className='my-auto'
                            />
                            <h4 className='my-auto'>
                                {"Sign In"}
                            </h4>
                        </div>
                    
                    <div onClick={()=>{ }} className={`flex ${auth?.isAuthenticated ? "":"md:hidden"} justify-center cursor-pointer orange-circle text-white w-[38px] h-[38px] items-center align-middle my-auto`}>

                        {auth?.user?.name?.toString()?.charAt(0) ?? "N"}
                    </div>
                </div>
                <Link className='block md:hidden my-auto' 
                    onClick={(e)=>{ 
                        if(!(auth?.isAuthenticated)){
                            e.preventDefault();
                            e.stopPropagation();
                            handleModelClick(true)
                        }
                    }}
                    href="/cart">
                    <Image
                        src={"/icons/cart.webp"}
                        alt={"cart"}
                        width={17}
                        height={21}
                        className='my-auto'
                    />
                </Link>
            </div>
        </div>
    </div>
  )
}
export default Header