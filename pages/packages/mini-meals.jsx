

import Component from '@/components/MealBoxes/Component'
import React, { useEffect, useState } from 'react'
import {wrapper} from "../../redux/store"
import { getPackagesData, resetAction } from '@/redux/reducers/packageReducer'
import { getCookie } from 'cookies-next'
import { END } from 'redux-saga'
import { useDispatch } from 'react-redux'
import ConfirmationPopup from '@/components/Common/ConfirmationPopup'
import { addToCart } from '@/redux/reducers/cartReducer'

function MiniMeals({filters,packages,noOfPeople}) {
  const dispatch = useDispatch();
  const [showModel, setShowModel] = useState(false);
  const handleShowModel = (val) =>{
    setShowModel(val)
  }
  const handleClose = () =>{
    setShowModel(false);
  }
  const handleConfirm = () =>{
    dispatch(addToCart({
      menu_option:"mini-meals",
      no_of_people:process.env.NEXT_PUBLIC_MINI_MEAL_MINIMUM_QTY ?? 10,
      package_name:showModel,
      replace:true
    }));
    
  }
  return (
    <>
      <Component 
        mealBox={"mini-meals"} 
        data={{...packages}}
        filters={{...filters}}
        noOfPeople={noOfPeople}
        handleShowModel={handleShowModel}
      />
      {
        showModel && 
      <ConfirmationPopup
          handleClose={handleClose}
          show={showModel}
          description={"You already have existing items in the cart. Do you wish to remove them and add this to your cart?"}
          handleConfirm={handleConfirm}
        />
      }
    </>
  )
}


async function fetchData(store,location) {
  
    await store.dispatch(getPackagesData({menuOption:"mini-meals", location}))
    await store.dispatch(END);
    await store.sagaTask.toPromise();
  }
  
  export const getServerSideProps =  wrapper.getServerSideProps(
    (store) => async(props) =>{
      const location = await getCookie("location",{req:props?.req,res:props?.res});
      await fetchData(store,location);
      const {filters,packages} = await store.getState().packages;
      let noOfPeople = getCookie("no_of_people",{req:props?.req,res:props?.res}) ?? "10_20";
      if(noOfPeople){
          const qty = Number(noOfPeople);
          if(qty > 20 && qty <= 30){
              noOfPeople = "20_30";
  
          }else if(qty  > 30){
              noOfPeople = "30_plus"
          }
      }
        
      return {
        props:{
            packages:packages ?? {},
            filters:filters ?? {},
            noOfPeople
        }
      }
    }
  )


export default MiniMeals