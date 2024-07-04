import SavedAddresses from '@/components/Cart/SavedAddresses';
import { getAddresses, resetAddress } from '@/redux/reducers/addressReducer';
import React, { useEffect, useState } from 'react'
import { END } from 'redux-saga';
import {wrapper} from "../redux/store"
import { getCookie } from 'cookies-next';
import { useDispatch, useSelector } from 'react-redux';
function Cart({
    addressesData
}) {
  const [cartData, setCartData] = useState({
    delivery_address_id:addressesData?.[0]?._id
  });
  const [savedAddresses,setSavedAddresses] = useState([...addressesData ?? []])
  const {addresses,response, errorMessage} = useSelector((state)=>state.address);
  const dispatch = useDispatch();
  useEffect(()=>{
    if(response && !errorMessage){
      setSavedAddresses([...addresses ?? []]);
      if(addresses?.length){
        setCartData({
          ...cartData,
          delivery_address_id:addresses?.[addresses?.length -1]?._id
        })
      }
    }
    dispatch(resetAddress());
  },[addresses,response, errorMessage]);



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
async function fetchData(store,location,token) {
  
    await store.dispatch(getAddresses({token, location}))
    await store.dispatch(END);
    await store.sagaTask.toPromise();
  }
  
  export const getServerSideProps =  wrapper.getServerSideProps(
    (store) => async(props) =>{
      const location = getCookie("location",{req:props?.req,res:props?.res});
      const token = getCookie("accessToken",{req:props?.req,res:props?.res});
      await fetchData(store,location,token);
      const {addresses} = await store.getState().address;
      return {
        props:{
          addressesData:addresses ?? []
        }
      }
    }
  )
export default Cart