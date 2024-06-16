import Component from '@/components/MealBoxes/Component'
import React from 'react'
const services = {
    
    "suggestive-package":{
        title:"Packages",
        img:"/catering_services/suggestive_package.webp",
        width:382,
        height:394,
        description:"Advantage of food packages with multiple options available in it",
        url:"/coming-soon"
    },
    "snack-box":{
      title:"Snack Box",
      img:"/catering_services/snack_box.webp",
      width:378.12,
      height:240,
      description:"Advantage of food packages with multiple options available in it",
      url:"/coming-soon",
      categories:[
        {
          title:"Starter",
          img:"/catering_services/category_1.webp",
          width:181,
          height:183
        },
        {
          title:"Starter",
          img:"/catering_services/category_1.webp",
          width:181,
          height:183
        },
        {
          title:"Starter",
          img:"/catering_services/category_1.webp",
          width:181,
          height:183
        },
        {
          title:"Starter",
          img:"/catering_services/category_1.webp",
          width:181,
          height:183
        },
        {
          title:"Starter",
          img:"/catering_services/category_1.webp",
          width:181,
          height:183
        },
        {
          title:"Starter",
          img:"/catering_services/category_1.webp",
          width:181,
          height:183
        }
      ]
  },
    "mini-thali":{
        title:"Mini Thali",
        img:"/catering_services/mini_thali.webp",
        width:378.12,
        height:240,
        description:"Advantage of food packages with multiple options available in it",
        url:"/coming-soon"
    }
}
function index({services}) {
  return (
    <Component mealBox={"suggestive-package"} services={services}/>
  )
}

export default index

export async function getStaticProps() {    
    
    if(!services){
        throw new Error(`Failed to fetch posts, received status`)
    }
    return {
      props: {
        services,
      },
    }
  }