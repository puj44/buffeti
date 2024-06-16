import React, { useEffect, useState } from 'react'
import ItemsSideBar from './ItemsSidebar';
import ItemsSelection from './ItemsSelection';

const items = {
  "Starter":{
    "Oriental Starter":[
      {
        "name": "Dish name 1",
        "additional_serving_charge":300,
        "img":"/packages/dummy_pack.webp",
        "width":102,
        "height":106,
      },
      {
        "name": "Dish name 2",
        "additional_serving_charge":300,
        "img":"/packages/dummy_pack.webp",
        "width":102,
        "height":106,
      },
      
    ],
    "Indian Starter":[
      {
        "name": "Dish name 3",
        "additional_serving_charge":300,
        "img":"/packages/dummy_pack.webp",
        "width":102,
        "height":106,
      },
      {
        "name": "Dish name 4",
        "additional_serving_charge":300,
        "img":"/packages/dummy_pack.webp",
        "width":102,
        "height":106,
      },
    ]
        
  },
  "Main Course":{
    "Oriental Starter":[
      {
        "name": "Dish name 5",
        "additional_serving_charge":300,
        "img":"/packages/dummy_pack.webp",
        "width":102,
        "height":106,
      },
      {
        "name": "Dish name 6",
        "additional_serving_charge":300,
        "img":"/packages/dummy_pack.webp",
        "width":102,
        "height":106,
      },
      
    ],
    "Indian Starter":[
      {
        "name": "Dish name 7",
        "additional_serving_charge":300,
        "img":"/packages/dummy_pack.webp",
        "width":102,
        "height":106,
      },
      {
        "name": "Dish name 8",
        "additional_serving_charge":300,
        "img":"/packages/dummy_pack.webp",
        "width":102,
        "height":106,
      },
    ]
  },
  "Breads":{},
  "Rice":{},
  "Dal":{},
  "Sweet":{}
}

function ItemsSelectionBody({
  isPackage,
  isSnackBox,
  isCreateOwnPackage,
  handleDeleteItem, 
  handleAddItem,
  itemsSelected
}) {

  const [activeItem, setActiveItem] = useState(Object.keys(items)[0]);
  const [displayItems, setDisplayItems] = useState(items[activeItem]);
  const handleChangeActiveItem = (val) =>{
    setActiveItem(val);
  }

  useEffect(()=>{
    setDisplayItems({...items[activeItem]});
  },[activeItem])

  return (
    <div className='flex flex-row gap-6 w-full items-start'>
      {/* LEFT SIDE SECTION ITEMS CATEGORY SELECTION */}
      <ItemsSideBar activeItem={activeItem} itemsSelected={itemsSelected} items={Object.keys(items)} handleChangeActiveItem={handleChangeActiveItem} />
      <div className='h-full w-[2px] border-[2px] border-[#E3E5E5] '></div>
      {/* RIGHT SIDE SECTION ITEMS SELECTION */}
      <ItemsSelection items={displayItems} category={activeItem} handleDeleteItem={handleDeleteItem} handleAddItem={handleAddItem} itemsSelected={itemsSelected} />
    </div>
  )
}

export default ItemsSelectionBody