import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import PackageSlider from './PackageSlider';
import PackageCard from './PackageCard';
import CustomiseOrderCard from './CustomiseOrderCard';

function SuggestivePackage({data}) {
    const packages = {
        "package-1":{
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
        "package-2":{
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
        },"package-3":{
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
    const [activeCard, setActiveCard] = useState("package-1");

    const handleChangeCard = (val) =>{
        setActiveCard(val);
    }
  return (
    <div className='grid grid-flow-row gap-4 md:gap-6  '>
        <h3 className='page-title md:font-semibold 2xl:mx-auto'>{data.title}</h3>
        <div className='grid grid-flow-row md:flex md:flex-row gap-5 2xl:mx-auto'>
            {/* ALL PACKAGES CARD */}
            <div className='md:py-[24px] md:px-[16px]'>
                <div className='grid grid-flow-row lg:grid-flow-col gap-3 horizontal-scroll-div'>
                    <PackageSlider packages={packages} active={activeCard} handleChangeCard={handleChangeCard}/>
                    <div className='hidden lg:block'>
                        <PackageCard  data={packages[activeCard]} />
                    </div>
                </div>
            </div>
            {/* CREATE PACKAGE CARD */}
            <div className='hidden lg:block'>
                <CustomiseOrderCard />
            </div>
        </div>
    </div>
  )
}

export default SuggestivePackage