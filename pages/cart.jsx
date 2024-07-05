import SavedAddresses from '@/components/Cart/SavedAddresses';
import { getAddresses, resetAddress } from '@/redux/reducers/addressReducer';
import React, { useEffect, useState } from 'react'
import { END } from 'redux-saga';
import {wrapper} from "../redux/store"
import { getCookie } from 'cookies-next';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { getCart, getExtraServices } from '@/redux/reducers/cartReducer';
import CartItems from '@/components/Cart/CartItems';
import { searchDebounce } from '@/commonjs/debounce';
import ExtraServices from '@/components/Cart/ExtraServices';
import CouponCard from '@/components/Cart/CouponCard';
import CookingInstruction from '@/components/Cart/CookingInstruction';
import CartSummary from '@/components/Cart/CartSummary';
function Cart() {
  const [savedAddresses,setSavedAddresses] = useState([])
  const {addresses,response, errorMessage} = useSelector((state)=>state.address);
  const [cartData, setCartData] = useState({
  });
  const [cartItemsData, setCartItemsData] = useState({});
  const {cart, extraServices} = useSelector((state) => state.cart);
  const {isAuthenticated} = useSelector((state) => state.auth);
  const router = useRouter()
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getCart());
    dispatch(getAddresses());
    dispatch(getExtraServices());
  },[dispatch]);


  

  useEffect(()=>{
    setSavedAddresses([...addresses ?? []]);
    if(response && !errorMessage){

      if(addresses?.length){
        setCartData({
          ...cartData,
          delivery_address_id:addresses?.[addresses?.length -1]?._id
        })
      }
      dispatch(resetAddress());
    }
    
  },[addresses,response,errorMessage]);

  useEffect(()=>{
    if(cart){
      let cartDetails = JSON.parse(JSON.stringify(cart));
      setCartItemsData({...cart?.cart_data});
      delete cartDetails?.cart_data;
      if(!cartDetails.delivery_address_id){
        cartDetails.delivery_address_id = addresses?.[0]?._id
      }
      setCartData({...cartDetails});
    }
  },[cart])

  const handleSelectAddress = (id) =>{
    setCartData({...cartData, delivery_address_id:id});
    //CALL CART API
  }

  const handleChangeQuantity = searchDebounce((e, isUpdate = false, val) =>{
    e.preventDefault();
    e.stopPropagation();
    if(isUpdate){
      if(val >= 10){
        setCartItemsData({...cartItemsData, no_of_people:val});
      }
    }else{
      if(/^[\+\-]?\d*\.?\d+(?:[Ee][\+\-]?\d+)?$/.test(e.target.value) || e.target.value === ""){
        if(parseInt(e.target.value) < 10){
        }else{
            setCartItemsData({...cartItemsData, no_of_people:e.target.value});
            //TODO: UPDATE CALL CART ITEMS API
        }
      }
    }
  })

  //ITEMS FUNCTIONS
  const handleAddItem = ( item,extraItem = false, preparation = false ) =>{
    let itemsData = JSON.parse(JSON.stringify(cartItemsData));
    if(preparation){
      itemsData.items[item.slug]["selected_preparation"] = preparation;
    }
    else if(extraItem){
      itemsData.items[item.slug] = {
        ...itemsData.items[item.slug],
        added_extra_items:{
          ...itemsData.items[item.slug]?.added_extra_items,
          [extraItem]:1
        }
      }
    }
    setCartItemsData({...itemsData});
    //TODO: CALL CART ITEMS API
    
  }
  

  const handleDeleteItem = (item, extraItemSlug = false) =>{
    let itemsData = JSON.parse(JSON.stringify((cartItemsData)));
    if(extraItemSlug){
      delete itemsData?.items?.[item?.slug]?.added_extra_items?.[extraItemSlug];
    }else{
      delete itemsData?.items?.[item?.slug];
    }
    setCartItemsData({...itemsData});
     //TODO: CALL CART ITEMS API
  }

  const handleChangeAdditionalQty = (item,isSubtract, extraItemSlug = false) =>{
    let itemsData = JSON.parse(JSON.stringify((cartItemsData)));
    if(extraItemSlug){
      const qty = Number(itemsData?.items?.[item.slug]?.added_extra_items?.[extraItemSlug] ?? 0);
      
      itemsData.items[item.slug].added_extra_items = {
        ...itemsData.items[item.slug]?.added_extra_items,
        [extraItemSlug]:isSubtract ? (Number(qty) > 0) ?
        (Number(qty) - 1) : 0
        :
        (Number(qty) + 1)
      }
    }else{
      itemsData.items[item.slug] = {
        ...itemsData.items[item.slug],
        additional_qty:isSubtract ? (Number(itemsData.items[item.slug].additional_qty ?? 0) > 0) ?
           (Number(itemsData.items[item.slug].additional_qty) - 1) : 0
           :
           (Number(itemsData.items[item.slug].additional_qty ?? 0) + 1)
      }
    }
    setCartItemsData({...itemsData});
        //TODO: CALL CART ITEMS API
  }

  const handleChangeExtraService = (field) =>{
    let cartDetails = JSON.parse(JSON.stringify((cartData)));
    let extraServicesData = cartDetails.extra_services ?? [];
    if(extraServicesData?.includes(field)){
      const idx = extraServicesData.indexOf(field);
      extraServicesData.splice(idx,1);
    }else{
      extraServicesData.push(field);
    }
    cartDetails.extra_services = extraServicesData
    //TODO: CALL CART API
    setCartData({...cartDetails});
  }

  const handleApplyCoupon = (val) =>{
    //TODO: APPLY COUPON API
  }
  const handleChangeInstruction = searchDebounce((val) =>{
    let cartDetails = JSON.parse(JSON.stringify((cartData)));
    cartDetails.cooking_instruction = val;
    setCartData({...cartDetails});
    //TODO: CALL CART API
  })

  const handleChangeDate = (e) =>{
    console.log("HERE",e);
    let cartDetails = JSON.parse(JSON.stringify((cartData)));
    cartDetails.delivery_date = e;
    setCartData({...cartDetails});
    //TODO: CALL CART API
  }
  const handleChangeTime = () =>{

  }

  return (
    <div className="page-spacing py-4">
        <div className='flex flex-col md:flex-row gap-4 w-full'>
          <div className='grid grid-flow-row gap-4 w-full md:max-w-[650px] lg:max-w-[1180px] 2xl:max-w-[1180px]'>
            <SavedAddresses 
                addresses={[...savedAddresses]} 
                handleSelectAddress={handleSelectAddress}
                selectedAddress={cartData?.delivery_address_id}
            />
            <CartItems
              cartData={cartData}
              cartItemsData={cartItemsData}
              handleChangeQuantity={handleChangeQuantity}
              handleAddItem={handleAddItem}
              handleDeleteItem={handleDeleteItem}
              handleChangeAdditionalQty={handleChangeAdditionalQty}
            />
          </div>
          <div className='grid grid-flow-row self-start gap-4 md:max-w-[380px] w-full'>
            {
              extraServices && extraServices?.length ?
                <ExtraServices
                  data={extraServices}
                  handleChangeExtraService={handleChangeExtraService}
                  selectedData={cartData?.extra_services ?? []}
                />

              :""
            }
            <CouponCard
              handleApplyCoupon={handleApplyCoupon}
            />
            <CookingInstruction
              value={cartData?.cooking_instruction ?? ""}
              handleChangeInstruction={handleChangeInstruction}
            />
            <CartSummary
                data={cartData?.billing_details ?? {}}
                handleChangeDate={handleChangeDate}
                handleChangeTime={handleChangeTime}
                deliveryDate={cartData?.delivery_date}
                deliveryTime={cartData?.delivery_time}
            />
          </div>
        </div>
    </div>
  )
}
export default Cart