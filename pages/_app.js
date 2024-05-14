import Footer from "@/components/Common/Footer";
import Header from "@/components/Common/Header";
import PageHead from "@/components/Common/PageHead";
import "@/styles/globals.scss";


export default function App({ Component, pageProps }) {
  return(
   <main>
    <PageHead />
    <Header />
    <div className="page-content min-h-[50vh]">
      <Component {...pageProps} />
    </div>
    <Footer />
   </main>
  )
}
