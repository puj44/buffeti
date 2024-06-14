import ItemDescription from '@/components/Common/Items/ItemDescription';
import ItemsSelectionBody from '@/components/Common/Items/ItemsSelectionBody';
import QuantityInput from '@/components/Common/QuantityInput';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import {wrapper} from "@/redux/store";
import { getMobileOtp } from '@/redux/reducers/authReducer';
const suggestivePackages = {
  "package-1":{
    "name":"Ananda Package",
    "items":{
      "starter":2,
      "main-course":2,
      "breads":1,
      "rice":1,
      "dal":1,
      "sweet":1
    },
    activeImage:{
      url: "/catering_services/snack_box.webp",
      width:349,
      height:166
    },
    "price":700
  }
}



function PackageName({packageName, packageDetails}) {
  const [quantity, setQuantity] = useState(10);
  const [qtyError, setQtyError] = useState(false);
  const [itemsSelected, setItemsSelected] = useState({
  });

  const handleChangeQuantity = (e, isUpdate = false, val) =>{
    e.preventDefault();
    e.stopPropagation();
    if(isUpdate){
      if(val >= 10){
        setQuantity(val);
        setQtyError(false);
      }else{
        setQtyError("Minimum Quantity 10 is required")
      }
    }else{
      if(/^[\+\-]?\d*\.?\d+(?:[Ee][\+\-]?\d+)?$/.test(e.target.value) || e.target.value === ""){
        if(parseInt(e.target.value) >= 1 && parseInt(e.target.value) < 10){
          setQtyError("Minimum Quantity 10 is required")
        }else{

          setQtyError(false);
        }
        setQuantity(e.target.value);
      }
    }
  }

  const handleAddItem = (category, item, subCategory) =>{
    let itemsData = JSON.parse(JSON.stringify(itemsSelected));
    itemsData[category] = {
      ...itemsData[category] ?? {},
      [item?.name]:{
        ...item,
        "sub_category":subCategory
      }
    };
    

    setItemsSelected({...itemsData})
  }

  const handleDeleteItem = (category, item) =>{
    let itemsData = JSON.parse(JSON.stringify((itemsSelected)));
    delete itemsData?.[category]?.[item?.name];
    setItemsSelected({...itemsData});
  }

  useEffect(()=>{

  },[quantity])

  return (
    <div className='page-spacing py-6'>
      <div className='grid grid-flow-row gap-6'>
        <div className='md:flex flex-row gap-2 hidden '>
          <Link href={"/"} className=' text-color-primary-gray small-title'>Home</Link>
          <p className='text-color-primary-gray '>{">"}</p>
          <p className='small-title'>{"Package Detail"}</p>
        </div>
        {/* PACKAGE DETAILS SECTION */}
        <div className='grid grid-flow-row gap-4 md:gap-6 md:flex md:flex-row  items-start'>
            <div className=''>
              <Image
                src={packageDetails?.activeImage?.url}
                alt={packageDetails?.name}
                width={packageDetails?.activeImage?.width}
                height={packageDetails?.activeImage?.height}
                className=' w-full  md:w-[349px] h-[166px]'
                priority
              />
            </div>
            <div className='grid grid-flow-row gap-4'>
              <h1 className='font-medium product-title'>{packageDetails?.name}</h1>
              <ItemDescription isH3={true} items={packageDetails?.items}  />
              <div className='flex flex-col gap-1'>
                <div className='flex flex-row gap-4 items-center'>
                  <p className='page-title'>Number of people</p>
                  <QuantityInput handleChangeQuantity={handleChangeQuantity} qtyError={qtyError} quantity={quantity} />
                </div>
                {qtyError && <span className='text-color-primary grid grid-flow-row w-full'>{qtyError}</span>}
              </div>
            </div>
        </div>
        {/* ITEMS SELECTION SECTION */}
        <ItemsSelectionBody isPackage={true} handleDeleteItem={handleDeleteItem} handleAddItem={handleAddItem} itemsSelected={itemsSelected} />
      </div>
    
    </div>
  )
}
export  const getStaticProps = wrapper.getStaticProps( (store) => async (props) => { 
          if(!suggestivePackages){
              throw new Error(`Failed to fetch posts, received status`)
          }
          const packageName = props.params?.packageName;
          return {
            props: {
              packageDetails:suggestivePackages[packageName] ?? {},
              packageName
            },
            // Next.js will attempt to re-generate the page:
            // - When a request comes in
            // - At most once every 10 seconds
            revalidate: 10, // In seconds
          }

}
)
 
// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export async function getStaticPaths() {
 
  // Get the paths we want to pre-render based on posts
  const paths = Object.keys(suggestivePackages).map((key) => ({
    params: { packageName: key },
  }))
 
  // We'll pre-render only these paths at build time.
  // { fallback: 'blocking' } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback:"blocking" }
}

export default PackageName

