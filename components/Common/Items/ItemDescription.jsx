import React from 'react'

function ItemDescription({isH3 = false, className, items}) {

    const renderDescription = () =>{
        let string = "";
        Object.keys(items).map((item,idx)=>{
          const itemsString = `${items[item]} ${item.replace("-"," ")}`;
          string =  string.concat((string !== "" ? ", ":"")+itemsString); 
        })

        return string?.trim();
    }

  return (
    <h3 className={`${className ?? "text-color-dark-gray"}`}>{renderDescription()}</h3>
  )
}

export default ItemDescription