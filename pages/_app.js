import Header from "@/components/Common/Header";
import PageHead from "@/components/Common/PageHead";
import "@/styles/globals.scss";


export default function App({ Component, pageProps }) {
  return(
   <main>
    <PageHead />
    <Header />
    <Component {...pageProps} />
   </main>
  )
}
