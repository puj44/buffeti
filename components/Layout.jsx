import React, { useEffect, useState } from 'react'
import PageHead from './Common/PageHead'
import Header from './Common/Header'
import Footer from "@/components/Common/Footer";
import LoginModel from './Common/LoginModel';

function Layout({children}) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [visited, setVisited] = useState(false);
  const handleModelClick = (val) =>{
    setModalOpen(val);
  }

  useEffect(()=>{
    const visited = localStorage?.getItem("visited");
    if(!visited){
        setModalOpen(true);
        setVisited(true);
    }
  },[])
  return (
    <>
        <PageHead />
        { process.env.NEXT_PUBLIC_ENVIRONMENT === "DEV" ?  <Header handleModelClick={handleModelClick} /> :""}
        <main className="page-content min-h-[80vh]">
            {children}
        </main>
        { process.env.NEXT_PUBLIC_ENVIRONMENT === "DEV" ?  <Footer /> :""}
        {isModalOpen && <LoginModel isFirstTime={visited ?? false} isModalOpen={isModalOpen} handleModelClick={handleModelClick}/>}
    </>
  )
}

export default Layout