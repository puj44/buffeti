import SavedAddresses from '@/components/Cart/SavedAddresses';
import { getAddresses, resetAddress } from '@/redux/reducers/addressReducer';
import React, { useEffect, useState } from 'react'
import { END } from 'redux-saga';
import {wrapper} from "../redux/store"
import { getCookie } from 'cookies-next';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
function Cart() {
  const [savedAddresses,setSavedAddresses] = useState([])
  const {addresses,response, errorMessage} = useSelector((state)=>state.address);
  const [cartData, setCartData] = useState({
  });
  const {isAuthenticated} = useSelector((state) => state.auth);
  const router = useRouter()
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getAddresses())
  },[dispatch]);
  useEffect(()=>{
    setSavedAddresses([...addresses ?? []]);
    if(!cartData?.delivery_address_id){
      setCartData({...cartData, delivery_address_id:addresses?.[0]?._id})
    }
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



  const handleSelectAddress = (id) =>{
    setCartData({...cartData, delivery_address_id:id});
  }

  return (
    <div className="page-spacing py-4">
        <div className='flex flex-col md:flex-row gap-6 w-full'>
            <SavedAddresses 
                addresses={[...savedAddresses]} 
                handleSelectAddress={handleSelectAddress}
                selectedAddress={cartData?.delivery_address_id}
            />
        </div>
    </div>
  )
}
export default Cart