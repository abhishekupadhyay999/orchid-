import Head from "next/head";
import "nouislider/distribute/nouislider.css";
import { useEffect, useState } from "react";
// redux
import { Provider } from "react-redux";

// Css style
// import '@ckeditor5/ckeditor5.css';
import "../public/styles/chart.css";
import "../public/styles/colors.css";
import "../public/styles/custom.css";
import "../public/styles/print.css";
import "../public/styles/style.css";
import "../public/styles/wizard.css";
import Layout from "../src/layouts/Layout";
// action
import { bodyArt, resizeWindow } from "../src/redux/action/utils";
import store from "../src/redux/store";

function MyApp({ Component, pageProps }) {

 const [doc, setDoc] = useState();
  const [pages, setPages] = useState();
  useEffect(() => {	   
    bodyArt();
    setDoc(document);
    setPages(window.location.pathname);
    resizeWindow();
    setPages(window.location.pathname);
    window.addEventListener("resize", resizeWindow);
	
    return () => window.removeEventListener("resize", resizeWindow);
	 
  }, [pages]);

  return (
    <Provider store={store}>
      {/* <SimpleReactLightbox>*/}
        <Head>
          <title>OrchidReward - Admin Designed by Canwhart</title>
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/images/favicon.png"
          />
        </Head>
        {pages && window.location.pathname.includes("pages") ? (
          <Component {...pageProps} />
        ) : (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      {/*</SimpleReactLightbox>*/}
    </Provider>
  );
}

export default MyApp;
