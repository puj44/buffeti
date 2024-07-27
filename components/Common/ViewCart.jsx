import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

function ViewCart(props) {
    const [show, setShow] = useState(props.show);
    const onScrollBottom = (e) =>{
        let documentHeight = document.body.scrollHeight;
        let currentScroll = window.scrollY + window.innerHeight;
        let modifier = 300; 
        if(currentScroll + modifier > documentHeight) {
            setShow(false);
        }else{
            setShow(true);
        }
       
    }
    useEffect(()=>{
        window.addEventListener("scroll",onScrollBottom);
        return () => window.removeEventListener("scroll",onScrollBottom)
    },[])
    if(show)
  return (
    <div className='flex bg-white p-3 w-full fixed z-50 bottom-0 left-0 right-0 shadow-[0px_-1px_8px_0px_#0000001A]  '>
    <Link 
        className={`btn primary-btn gap-1 w-full cursor-pointer`}
        style={{padding:"16px",paddingLeft:"28px",paddingRight:"28px"}}
        href="/cart"
    >
        <Image
            src="/icons/cart.webp"
            alt={"cart"}
            width={20}
            height={20}
            priority
        />
        <p className=''>View Cart</p>
    </Link>
</div>
  )
}

export default ViewCart