import { addToCart, deleteCartItem, resetCart, updateCartItem } from '@/redux/reducers/cartReducer';
import { setLoginModel } from '@/redux/reducers/homeReducer';
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ConfirmationPopup from '../Common/ConfirmationPopup';
import { useRouter } from 'next/router';

function PackageCard({data,numberOfPeople, menuOption}) {
  const {isAuthenticated} = useSelector((state) => state.auth);
  const {cartDetails,response,is_invalid,updateResponse} = useSelector((state) => state.cart);
  const [showModel, setShowModel] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter()
  const isAdded = (slug) =>{
    if(cartDetails && cartDetails?.menu_option === menuOption && cartDetails?.items?.[slug])
      return true
    else 
      return false
  }

  const handleClose = () =>{
    setShowModel(false);
  }

  const handleConfirm = () =>{
    dispatch(addToCart({
      menu_option:menuOption,
      no_of_people:numberOfPeople,
      package_name:data?.slug,
      replace:true
    }));
    setShowModel(false);
  }
  const handleChangeQuantity = (action) =>{
    dispatch(updateCartItem({
      "cart_item_id":cartDetails?.items?.[data?.slug]?.cart_item_id,
      "no_of_people":action === "sub" ? Number(cartDetails?.items?.[data?.slug]?.no_of_people - 1) :Number(cartDetails?.items?.[data?.slug]?.no_of_people + 1)
    }));
  }

  useEffect(()=>{
    if(updateResponse){
      dispatch(resetCart())
    }
  },[updateResponse])

  useEffect(()=>{
    if(response){
      if(!is_invalid){
        dispatch(resetCart())
      }else{
        setShowModel(true);
        dispatch(resetCart())
      }
     
    }
  },[response,is_invalid])
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
      <div className='px-4 gap-1 flex flex-col'>

        <h4 className='font-medium package-title'>{menuOption ? data?.item_name:data?.package_name}</h4>
        <h5 className='text-color-primary-gray '>{menuOption === "mini-meals" ?data?.description :data?.items_description ?? data?.categories_description}</h5>
      </div>
      <div className='h-full items-end flex'>
        {
          menuOption === "mini-meals" ?
          <div 
            onClick={(e)=>{
                if(!isAuthenticated){
                  dispatch(setLoginModel({open:true}));
                }else{
                  dispatch(addToCart({
                    menu_option:menuOption,
                    no_of_people:process.env.NEXT_PUBLIC_MINI_MEAL_MINIMUM_QTY ?? 10,
                    package_name:data.slug
                  }))
                }
            }} 
            className='weird-btn primary-btn cursor-pointer items-end h-[66px]'
          >
            {
              isAdded(data.slug) ?
                <>
                    <span className='rounded-[45px] h-[48px] w-[64px] bg-white flex justify-center items-center '
                          onClick={(e)=>{
                            e.preventDefault();
                            e.stopPropagation();
                            if(cartDetails?.items?.[data?.slug]?.no_of_people <= 10) {
                              dispatch(deleteCartItem({
                                "cart_item_id":cartDetails?.items?.[data?.slug]?.cart_item_id,
                              }));
                            }else{
                              handleChangeQuantity("sub");
                            }
                            // handleChangeAdditionalQty(item.category.slug,item?.slug, true,extra)
                          }}
                        >
                      <span className='w-[14px] h-[2px] rounded-full bg-primary'>
                      </span>
                    </span>
                    <p className='text-white font-bold sub-title leading-9'>{cartDetails.items[data.slug]["no_of_people"]}</p>
                    <span className='relative rounded-[45px] h-[48px] w-[64px] bg-white flex justify-center items-center '
                        onClick={(e)=>{
                          e.preventDefault();
                          e.stopPropagation();
                          handleChangeQuantity("add");
                          // handleChangeAdditionalQty(item.category.slug,item?.slug, false,extra)
                        }}
                      >
                        <span className='absolute-center w-[14px] h-[2px] rounded-full bg-primary'>
                        </span>
                        <span className='absolute-center w-[2px] h-[14px] rounded-full bg-primary'>
                        </span>
                    </span>
                </>
              :
              <p className={`font-bold md:font-extrabold sub-title leading-9 mx-auto`}>{`Add for ₹ ${data?.price}`}</p>
            }

          </div>

          :
          <Link 
            href={isAdded(data.slug) ?"/cart":`/catering/${data?.slug}`} 
            className='weird-btn primary-btn items-end h-fit'
          >
              <p className={`font-bold md:font-extrabold sub-title leading-9 `}>{`₹ ${ data?.[("_"+numberOfPeople+"_pax")]}`}</p>
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
          </Link>
        }
      </div>
      <ConfirmationPopup
          handleClose={handleClose}
          show={showModel}
          description={"You already have existing items in the cart. Do you wish to remove them and add this to your cart?"}
          handleConfirm={handleConfirm}
        />
    </div>
  )
}

export default PackageCard