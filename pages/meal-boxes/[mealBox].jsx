import Component from '@/components/MealBoxes/Component'
import { useRouter } from 'next/router'
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
function MealBox({mealBox,services}) {
    const router = useRouter();
  return (
    <Component mealBox={mealBox} services={services} />
  )
}

export default MealBox

export async function getStaticProps(props) {    
    
    if(!services){
        throw new Error(`Failed to fetch posts, received status`)
    }
    return {
      props: {
        services,
        mealBox:props.params?.mealBox
      },
      // Next.js will attempt to re-generate the page:
      // - When a request comes in
      // - At most once every 10 seconds
      revalidate: 10, // In seconds
    }
  }
   
  // This function gets called at build time on server-side.
  // It may be called again, on a serverless function, if
  // the path has not been generated.
  export async function getStaticPaths() {
   
    // Get the paths we want to pre-render based on posts
    const paths = Object.keys(services).map((key) => ({
      params: { mealBox: key },
    }))
   
    // We'll pre-render only these paths at build time.
    // { fallback: 'blocking' } will server-render pages
    // on-demand if the path doesn't exist.
    return { paths, fallback: 'blocking' }
  }