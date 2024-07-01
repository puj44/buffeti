export const units = {
    "ml":"ltr",
    "mls":"ltr",
    "gm":"kg",
    "gms":"kg",
  }
export const convert = (qty,unit) =>{
        let newTotalQty = qty;
        let newUnit = unit;
        if(newTotalQty >= 500 && units[newUnit]){
          newTotalQty = newTotalQty / 1000;
          const fixed = Math.pow(10, 2);
          newTotalQty = Math.floor(newTotalQty * fixed) / fixed;
          newUnit = units[newUnit];
        }
        return {newTotalQty, newUnit}
      }
    
export const convertToUnits = (item,itemsSelected,noOfPeople) =>{
        const additionalQty = Number(itemsSelected?.[item?.category?.slug]?.[item.slug]?.additional_qty ?? 0);
        const additionalUnits = additionalQty > 0 ? additionalQty * Number(item.additional_serving) :0;
        const totalQty = additionalUnits+(Number(item.serving_per_pax) * Number(noOfPeople));
        const unit = item.unit;
        
        const {newTotalQty, newUnit} = convert(totalQty,unit);
        return `${newTotalQty} ${newUnit}`;
      }
export const convertToUnitsExtraItem = (extraItem,item,itemsSelected) =>{
        const qty = Number(itemsSelected?.[item?.category?.slug]?.[item.slug]?.added_extra_items?.[extraItem.slug] ?? 0);
        const totalQty = qty * Number(extraItem.serving_per_pax);
        
        const unit = extraItem.unit;
        const {newTotalQty, newUnit} = convert(totalQty,unit);
        return `${newTotalQty} ${newUnit}`;
      }