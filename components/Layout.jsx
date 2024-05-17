import React from 'react'
import PageHead from './Common/PageHead'
import Header from './Common/Header'
import Footer from "@/components/Common/Footer";

function Layout({children}) {
  return (
    <>
        <PageHead />
        { process.env.NEXT_PUBLIC_ENVIRONMENT === "DEV" ?  <Header /> :""}
        <main className="page-content min-h-[80vh]">
            {children}
        </main>
        { process.env.NEXT_PUBLIC_ENVIRONMENT === "DEV" ?  <Footer /> :""}
    </>
  )
}

export default Layout