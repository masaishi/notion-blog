import Link from 'next/link'
import Script from 'next/script'
import { Router, useRouter } from 'next/router'

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


let NavBar = ({router}: {router:Router}) => {
	console.log(router);
	
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
						<Link href="/" legacyBehavior><p className="h2 mb-0 notion-link">masaishi blog</p></Link>
					</div>   
				</div>
				<div className="col-3 d-flex justify-content-end align-items-right">
					<HashCheck router={router} />
				</div>
			</div>
        );
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
						<Link href="/" legacyBehavior><p className="h2 mb-0 notion-link">masaishi blog</p></Link>
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
        );
	}
}

export const NavContent = () => {
	const router = useRouter() as Router;
	
	return (
		// If router is underfinding, return null, else show <NavBar router={router} />
		<>
			<div className="py-3 container main">
        <div className="card-body">
          <div className="notion light-mode notion-page notion-block">
						{router ? <NavBar router={router} /> : null}
          </div>
        </div>
      </div>

			{ router.pathname === "/" ? (
				<div className="py-3 container main">
					<div className="card-body">
						<div className="notion light-mode notion-page notion-block">
							<p>
								プログラミングが趣味の大学生です。<br />
								このブログでは、MLのこととか、アメリカ留学生活のことなどを書いています。<br />
							</p>
							<a href="https://www.buymeacoffee.com/masaishi" target="_blank" rel="noreferrer"><img id="coffeeImage" src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style={{height: '30px', width: '100px'}}></img></a>
							<Script type="text/javascript" src="https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js" data-name="bmc-button" data-slug="masaishi" data-color="#FFDD00" data-emoji=""  data-font="Cookie" data-text="Buy me a coffee" data-outline-color="#000000" data-font-color="#000000" data-coffee-color="#ffffff" ></Script>
						</div>
					</div>
				</div>
			): null}
			
		</>
	)

}

