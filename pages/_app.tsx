import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useEffect } from 'react'

// core styles shared by all of react-notion-x (required)
import 'react-notion-x/src/styles.css'

// used for code syntax highlighting (optional)
import 'prismjs/themes/prism-tomorrow.css'

// used for collection views (optional)
import 'rc-dropdown/assets/index.css'

// used for rendering equations (optional)
import 'katex/dist/katex.min.css'

import 'bootstrap/dist/css/bootstrap.css'

import '../styles/globals.css'


export default function App({ Component, pageProps }: AppProps) {  
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap")
  }, []);

  return (
    <>
      <Head>
        <title>masaishi blog</title>
        
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`} />
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

      <Component {...pageProps} />
    </>
    
  )
}

