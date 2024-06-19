import ItemDescription from '@/components/Common/Items/ItemDescription';
import ItemsSelectionBody from '@/components/Common/Items/ItemsSelectionBody';
import QuantityInput from '@/components/Common/QuantityInput';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import {wrapper} from "@/redux/store";
import PeopleQuantityInput from '../Common/PeopleQuantityInput';
import { getCookie, hasCookie } from 'cookies-next';
import { useDispatch, useSelector } from 'react-redux';
import { getItemsData, resetAction } from '@/redux/reducers/itemsReducer';



function CreatePackage({packageName, menuOption ,packageDetails, itemsData, categories, noOfPeople}) {
  const [quantity, setQuantity] = useState(10);
  const [itemsSelected, setItemsSelected] = useState({...itemsData ?? {}});
  const [searchValue, setSearchValue] = useState("");
  const [activeItem, setActiveItem] = useState(Object.keys(categories)[0]);
  const [displayItems, setDisplayItems] = useState({...packageDetails});
  const {items, response} = useSelector((state) => state.items);
  const dispatch = useDispatch();

  const handleChangeActiveItem = (val) =>{
    setActiveItem(val);
    dispatch(getItemsData({menuOption,category:val}));
  }

  useEffect(()=>{
    if(response){
      setDisplayItems({...items});
      dispatch(resetAction());
    }
  },[response, items])

  useEffect(()=>{
    if(hasCookie("no_of_people") && getCookie("no_of_people") !== ""){
      setQuantity(Number(getCookie("no_of_people")))
    }
  },[])

  const handleChangeQuantity = (e, isUpdate = false, val) =>{
    e.preventDefault();
    e.stopPropagation();
    if(isUpdate){
      if(val >= 10){
        setQuantity(val)
      }
    }else{
      if(/^[\+\-]?\d*\.?\d+(?:[Ee][\+\-]?\d+)?$/.test(e.target.value) || e.target.value === ""){
        if(parseInt(e.target.value) >= 1 && parseInt(e.target.value) < 10){
        }else{
            setQuantity(e.target.value)
        }
      }
    }
  }
  
  const handleAddItem = (category, item,extraItem = false, preparation = false ) =>{
    let itemsData = JSON.parse(JSON.stringify(itemsSelected));
    if(preparation){
      itemsData[category] ={
        ...itemsData[category],
        [item?.slug]:{
          ...itemsData[category]?.[item?.slug],
          selected_preparation:preparation
        }
      }
    }
    else if(extraItem){
      itemsData[category] ={
        ...itemsData[category],
        [item?.slug]:{
          ...itemsData[category]?.[item?.slug],
          added_extra_items:{
            ...itemsData[category]?.[item?.slug]?.added_extra_items,
            [extraItem]:0
          }
        }
      }
    }else{

      itemsData[category] = {
        ...itemsData[category] ?? {},
        [item?.slug]:item
      };
    }
    

    setItemsSelected({...itemsData})
  }

  const handleDeleteItem = (category, item, extraItemSlug = false) =>{
    let itemsData = JSON.parse(JSON.stringify((itemsSelected)));
    if(extraItemSlug){
      delete itemsData?.[category]?.[item?.slug]?.added_extra_items?.[extraItemSlug];
    }else{
      delete itemsData?.[category]?.[item?.slug];
    }
    setItemsSelected({...itemsData});
  }

  useEffect(()=>{

  },[quantity])
 

  const handleSearchChange = (e) =>{

  }
  const handleChangeAdditionalQty = (category,itemSlug,isSubtract, extraItemSlug = false) =>{
    let itemsData = JSON.parse(JSON.stringify((itemsSelected)));
    if(extraItemSlug){
      const qty = Number(itemsData?.[category]?.[itemSlug]?.added_extra_items?.[extraItemSlug] ?? 0);
      
      itemsData[category][itemSlug].added_extra_items = {
        ...itemsData[category][itemSlug].added_extra_items,
        [extraItemSlug]:isSubtract ? (Number(qty) > 0) ?
        (Number(qty) - 1) : 0
        :
        (Number(qty) + 1)
      }
    }else{

      itemsData[category][itemSlug] = {
        ...itemsData[category][itemSlug],
        additional_qty:isSubtract ? (Number(itemsData[category][itemSlug].additional_qty ?? 0) > 0) ?
           (Number(itemsData[category][itemSlug].additional_qty) - 1) : 0
           :
           (Number(itemsData[category][itemSlug].additional_qty ?? 0) + 1)
      }
    }
    setItemsSelected({...itemsData});
  }

  useEffect(()=>{

  },[searchValue])

  return (
    <div className='page-spacing py-6'>
      <div className='grid grid-flow-row gap-6'>
        <div className='md:flex flex-row gap-2 hidden '>
          <Link href={"/"} className=' text-color-primary-gray small-title'>Home</Link>
          <p className='text-color-primary-gray '>{">"}</p>
          {
            (packageName && packageName !== "") ?
            <>
              <Link href={`/packages/${menuOption}`} className=' text-color-primary-gray small-title'>Packages</Link>
              <p className='text-color-primary-gray '>{">"}</p>
            </>
            :""
          }
          <p className='small-title'>{"Package Detail"}</p>
        </div>
        {/* PACKAGE DETAILS SECTION */}
        <div className='flex flex-col md:flex-row justify-between w-full md:items-center'>
            <p className='font-medium package-title'>{menuOption === "click2cater" ?"Customise Items" :"Create your Own Snack Box"}</p>
            <PeopleQuantityInput quantity={quantity ?? 10} handleChangeQuantity={handleChangeQuantity} isPackage={true} />
        </div>
        {/* ITEMS SELECTION SECTION */}
        <ItemsSelectionBody 
          isPackage={(packageName && packageName !== "") ?? false} 
          handleDeleteItem={handleDeleteItem} 
          handleAddItem={handleAddItem} 
          itemsSelected={itemsSelected} 
          items={{...displayItems ?? {}}}
          handleSearchChange={handleSearchChange}
          categories={categories}
          activeItem={activeItem}
          handleChangeActiveItem={handleChangeActiveItem}
          handleChangeAdditionalQty={handleChangeAdditionalQty}
          noOfPeople={noOfPeople}
          menuOption={menuOption}
        />
      </div>
    
    </div>
  )
}

export default CreatePackage

