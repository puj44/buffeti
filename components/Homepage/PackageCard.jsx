import { setLoginModel } from '@/redux/reducers/homeReducer';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

function PackageCard({data,numberOfPeople, menuOption}) {
  const {isAuthenticated} = useSelector((state) => state.home);
  const dispatch = useDispatch();
  return (
    <div className='package-card relative max-w-[372px] flex flex-col gap-4 h-full'>
       <div className='px-4  mx-auto'>
        <Image
          src={"/catering_services/mini_thali.webp"}
          width={340}
          height={166}
          style={{
            width:"100%",
            height:"100%"
          }}
          alt={data?.slug}
          priority
        />
      </div>
      <div className='px-4'>

        <h4 className='font-medium package-title'>{data?.package_name}</h4>
        <h5 className='text-color-primary-gray '>{menuOption === "mini-meals" ?data?.description :data?.items_description ?? data?.categories_description}</h5>
      </div>
      <div className='h-full items-end flex'>
        <Link 
          href={menuOption === "mini-meals"?"/cart":`/catering/${data?.slug}`} 
          onClick={(e)=>{if(menuOption === "mini-meals"){
              e.preventDefault();
              e.stopPropagation();
              if(!isAuthenticated){
                dispatch(setLoginModel({open:true}));
              }
            }
          }} 
          className='weird-btn primary-btn items-end h-fit'
        >
            <p className={`font-bold md:font-extrabold sub-title leading-9 ${menuOption === "mini-meals"?" mx-auto":""}`}>{`${menuOption === "mini-meals" ? "Add for":""} ₹ ${ menuOption === "mini-meals" ?data?.price :data?.[("_"+numberOfPeople+"_pax")]}`}</p>
            {
              menuOption !== "mini-meals" &&
              <span className='w-[64px] h-[48px] flex justify-center items-center bg-white py-4 px-6 rounded-[45px]'>
                <div className='arrow-rotate'>
                  <Image
                    src={"/arrows/red_r_arrow.webp"}
                    width={8}
                    height={14}
                    alt={"arrow"}
                    priority
                  />
                </div>
              </span>
            }
        </Link>
      </div>
    </div>
  )
}

export default PackageCard