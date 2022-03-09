import React, {useState, useEffect} from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Router, useRouter } from 'next/router'

import '../styles/globals.css'

// core styles shared by all of react-notion-x (required)
import 'react-notion-x/src/styles.css'

// used for code syntax highlighting (optional)
import 'prismjs/themes/prism-tomorrow.css'

// used for collection views (optional)
import 'rc-dropdown/assets/index.css'

// used for rendering equations (optional)
import 'katex/dist/katex.min.css'

import 'bootstrap/dist/css/bootstrap.css'

import App from 'next/app'
import type { AppProps } from 'next/app'
// import { NotionRenderer } from 'react-notion-x'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap")
  }, []);

  const router = useRouter() as Router;
  
  let HashCheck = ({router}: {router:Router}) => {
    if(router.query.hashtags){
      return (
        <button className="bg-dark link-secondary btn btn btn-outline-light" data-bs-toggle="collapse" data-bs-target="#selections" aria-expanded="true" aria-controls="selections">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-white bi bi-check-all" viewBox="0 0 16 16">
            <path d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992a.252.252 0 0 1 .02-.022zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486-.943 1.179z"/>
          </svg>
        </button>
      )
    }else{
      return(
        <button className="link-secondary btn btn btn-outline-secondary" data-bs-toggle="collapse" data-bs-target="#selections" aria-expanded="true" aria-controls="selections">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-all" viewBox="0 0 16 16">
            <path d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992a.252.252 0 0 1 .02-.022zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486-.943 1.179z"/>
          </svg>
        </button>
      )
    }
  }


  let NavContent = ({router}: {router:Router}) => {
    if(router.pathname == "/"){
      return (
        <div className="row g-0 flex-nowrap justify-content-between align-items-center w-100">
          <div className="col-3">
            <button className="link-secondary btn btn btn-outline-secondary">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-sort-down" viewBox="0 0 16 16">
                <path d="M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 11.293V2.5zm3.5 1a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"/>
              </svg>
            </button>
          </div>
          <div className="col-6 text-center">
            <div className='row align-items-center'>
              <Link href="/"><p className="h2 mb-0 notion-link">masaishi blog</p></Link>
            </div>   
          </div>
          <div className="col-3 d-flex justify-content-end align-items-right">
            <HashCheck router={router} />
          </div>
        </div>
      )
    } else {
      return (
        <div className="row g-0 flex-nowrap justify-content-between align-items-center w-100">
          <div className="col-3">
            <button className="link-secondary btn btn btn-outline-secondary" onClick={() => router.back()}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-return-left" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z"/>
              </svg>
            </button>
          </div>
          <div className="col-6 text-center">
            <div className='row align-items-center'>
              <Link href="/"><p className="h2 mb-0 notion-link">masaishi blog</p></Link>
            </div>   
          </div>
          <div className="col-3 d-flex justify-content-end align-items-right">
            {/* <button className="link-secondary btn btn btn-outline-secondary" href="/test">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-up" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"/>
              </svg>
            </button> */}
          </div>
        </div>
      )
    }
    
  }
  
  return (
    <>
      <Head>
        <title>masaishi blog</title>
        {/* Global site tag (gtag.js) - Google Analytics */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}></script>
        <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
      </Head>
      
      <div className="py-3 container main">
        <div className="card-body">
          <div className="notion light-mode notion-page notion-block">
            <NavContent router={router} />

            {/* <div className="mt-1 accordion" id="selectHashtags">
              <div className="accordion-item">
                <div id="selections" className="accordion-collapse collapse" aria-labelledby="selections" data-bs-parent="#selections">
                  <div className="accordion-body">
                    <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
        

      <Component {...pageProps} />
    </>
  )
}

export default MyApp
