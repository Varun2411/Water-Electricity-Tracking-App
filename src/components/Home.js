import React, { useState } from 'react';
import Grouvp1 from 'D:/firebase-react-auth-main/new/newapp/src/images/Grouvp1.png'; // Adjust the path to your image file
import Auth from './auth';
import Navbar from './Navbar';
const Home = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  const handleGetStarted = () => {
    setShowAuth(true);
  };
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div>
    <Navbar/>
    {!showAuth && (
      <>
        {/* <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary">
         <div className="container-fluid d-flex justify-content-center">
           <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCenteredExample"
            aria-controls="navbarCenteredExample"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-center" id="navbarCenteredExample">
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Link</a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><a className="dropdown-item" href="#">Action</a></li>
                  <li><a className="dropdown-item" href="#">Another action</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link" aria-disabled="true">About </a>
              </li>
            </ul>
          </div>
        </div>
      </nav> */}

        <div
          className="p-5 text-center bg-image"
          style={{
            // backgroundImage: `url(${Grouvp1})`,
            height: '50vh',
            // width : '1000px',
            // backgroundsize : cover,
            // marginTop: '58px'
          }}
        >
          <div className="mask">
            <h1 className="my-4 text-3xl md:text-5xl text-black opacity-100 font-bold leading-tight text-center md:text-left">
              Track Your <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500">
                Electricity and Water usage
              </span>
              !
            </h1>
            <br/><br/>
            <h5>
                Login to get started
            </h5>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleGetStarted}>
              Get Started
            </button>
          </div>
        </div>
          <section>
            <div class="relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-24 max-w-7xl">
              <div class="grid w-full grid-cols-1 gap-12 mx-auto lg:grid-cols-2">
                <div class="p-6">
                  <div class="inline-flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto mb-5 text-blue-600 rounded-full bg-blue-50">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 icon icon-tabler icon-tabler-aperture" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <circle cx="12" cy="12" r="9"></circle>
                      <line x1="3.6" y1="15" x2="14.15" y2="15"></line>
                      <line x1="3.6" y1="15" x2="14.15" y2="15" transform="rotate(72 12 12)"></line>
                      <line x1="3.6" y1="15" x2="14.15" y2="15" transform="rotate(144 12 12)"></line>
                      <line x1="3.6" y1="15" x2="14.15" y2="15" transform="rotate(216 12 12)"></line>
                      <line x1="3.6" y1="15" x2="14.15" y2="15" transform="rotate(288 12 12)"></line>
                    </svg>
                  </div>
                  <h1 class="mx-auto mb-8 text-2xl font-semibold leading-none tracking-tighter text-neutral-600 lg:text-3xl">Short length headline.</h1>
                  <p class="mx-auto text-base leading-relaxed text-gray-500">Free and Premium themes, UI Kit's, templates and landing pages built with Tailwind CSS, HTML &amp; Next.js.</p>
                </div>
                <div class="p-6">
                  <div class="inline-flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto mb-5 text-blue-600 rounded-full bg-blue-50">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 icon icon-tabler icon-tabler-aperture" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <circle cx="12" cy="12" r="9"></circle>
                      <line x1="3.6" y1="15" x2="14.15" y2="15"></line>
                      <line x1="3.6" y1="15" x2="14.15" y2="15" transform="rotate(72 12 12)"></line>
                      <line x1="3.6" y1="15" x2="14.15" y2="15" transform="rotate(144 12 12)"></line>
                      <line x1="3.6" y1="15" x2="14.15" y2="15" transform="rotate(216 12 12)"></line>
                      <line x1="3.6" y1="15" x2="14.15" y2="15" transform="rotate(288 12 12)"></line>
                    </svg>
                  </div>
                  <h1 class="mx-auto mb-8 text-2xl font-semibold leading-none tracking-tighter text-neutral-600 lg:text-3xl">Short length headline.</h1>
                  <p class="mx-auto text-base leading-relaxed text-gray-500">Free and Premium themes, UI Kit's, templates and landing pages built with Tailwind CSS, HTML &amp; Next.js.</p>
                </div>
              </div>
            </div>
          </section>
          <br/><br/><br/><br/>
          <div className="relative overflow-hidden bg-gray-900 pt-16 pb-32 space-y-24">
      {/* Section 1 */}
      <div className="relative">
        <div className="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8 ">
          <div className="mx-auto max-w-xl px-6 lg:mx-0 lg:max-w-none lg:py-16 lg:px-0 ">

            <div>
              <div>
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-500">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="h-8 w-8 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"></path>
                  </svg>
                </span>
              </div>

              <div className="mt-6">
                <h2 className="text-3xl font-bold tracking-tight text-white">
                  Natural Language Processing (NLP):
                </h2>
                <p className="mt-4 text-lg text-gray-300">
                  The AI product utilizes advanced NLP algorithms to understand and interpret human language,
                  enabling it to accurately process and analyze text-based inputs.
                </p>
                <div className="mt-6">
                  <a className="inline-flex rounded-lg bg-pink-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-pink-600 hover:bg-pink-700 hover:ring-pink-700" href="/login">
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 sm:mt-16 lg:mt-0">
            <div className="-mr-48 pl-6 md:-mr-16 lg:relative lg:m-0 lg:h-full lg:px-0">
              <img loading="lazy" width="647" height="486" className="w-full rounded-xl shadow-2xl ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none" style={{ color: 'transparent' }} src="https://images.unsplash.com/photo-1569144157591-c60f3f82f137" alt="Inbox user interface" />
            </div>
          </div>
        </div>
      </div>

      {/* Section 2 */}
      <div className="relative">
        <div className="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8 ">
          <div className="mx-auto max-w-xl px-6 lg:mx-0 lg:max-w-none lg:py-16 lg:px-0 lg:col-start-2">
            <div>
              <div>
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-500">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="h-8 w-8 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"></path>
                  </svg>
                </span>
              </div>
              <div className="mt-6">
                <h2 className="text-3xl font-bold tracking-tight text-white">
                  Sentiment Analysis:
                </h2>
                <p className="mt-4 text-lg text-gray-300">
                  The product has built-in sentiment analysis capabilities, allowing it to determine the sentiment (positive, negative, or neutral) expressed in text or customer feedback.
                </p>
                <div className="mt-6">
                  <a className="inline-flex rounded-lg bg-pink-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-pink-600 hover:bg-pink-700 hover:ring-pink-700" href="/login">
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 sm:mt-16 lg:mt-0">
            <div className="-ml-48 pr-6 md:-ml-16 lg:relative lg:m-0 lg:h-full lg:px-0">
              <img alt="Inbox user interface" loading="lazy" width="647" height="486" className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:right-0 lg:h-full lg:w-auto lg:max-w-none" style={{ color: 'transparent' }} src="https://images.unsplash.com/photo-1599134842279-fe807d23316e" />
            </div>
          </div>
        </div>
      </div>

      {/* Section 3 */}
      <div className="relative">
        <div className="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8 ">
          <div className="mx-auto max-w-xl px-6 lg:mx-0 lg:max-w-none lg:py-16 lg:px-0 ">
            <div>
              <div>
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-500">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="h-8 w-8 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"></path>
                  </svg>
                </span>
              </div>
              <div className="mt-6">
                <h2 className="text-3xl font-bold tracking-tight text-white">
                  Natural Language Generation (NLG):
                </h2>
                <p className="mt-4 text-lg text-gray-300">
                  The AI product can generate human-like written content, summaries, or reports based on structured data or analysis results.
                </p>
                <div className="mt-6">
                  <a className="inline-flex rounded-lg bg-pink-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-pink-600 hover:bg-pink-700 hover:ring-pink-700" href="/login">
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 sm:mt-16 lg:mt-0">
            <div className="-mr-48 pl-6 md:-mr-16 lg:relative lg:m-0 lg:h-full lg:px-0">
              <img loading="lazy" width="646" height="485" className="w-full rounded-xl shadow-2xl ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none" style={{ color: 'transparent' }} src="https://images.unsplash.com/photo-1483478550801-ceba5fe50e8e" alt="Inbox user interface" />
            </div>
          </div>
        </div>
      </div>
    </div>
        <section>
            <div class=" flex flex-col items-center px-5 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div class="flex flex-col w-full max-w-3xl mx-auto prose text-left prose-blue">
                    <div class="w-full mx-auto">
                        <h1>A small headline to switch your visitors into users.</h1>
                        <h2>A small headline to switch your visitors into users.</h2>
                        <p>Right. Say that again. No, no, George, look, it's just an act, right? Okay, so 9:00 you're strolling through the parking lot, you see us struggling in the car, you walk up, you open the door and you say, your line, George. Stop it. We're gonna take a little break but we'll be back in a while so, don't nobody go no where.</p>
                    </div>
                </div>
            </div>
        </section>
          <section>
            <div class="relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-24 max-w-7xl">
              <div class="grid w-full grid-cols-1 gap-6 mx-auto lg:grid-cols-3">
                <div class="p-6">
                  <img class="object-cover object-center w-full mb-8 lg:h-48 md:h-36 rounded-xl" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsdlYQhRGOFhlfqzyBD9SIiJd3vOqf89bZSWMUejRqOQ&s" alt="blog" />
                  <h2 class="mb-8 text-xs font-semibold tracking-widest text-blue-600 uppercase">a great header right here</h2>
                  <h1 class="mx-auto mb-8 text-2xl font-semibold leading-none tracking-tighter text-neutral-600 lg:text-3xl">Short length headline to use as a title.</h1>
                  <p class="mx-auto text-base font-medium leading-relaxed text-gray-500">Free and Premium themes, UI Kit's, templates and landing pages built with Tailwind CSS, HTML &amp; Next.js.</p>
                  <div class="mt-4">
                    <a href="#" class="inline-flex items-center mt-4 font-semibold text-blue-600 lg:mb-0 hover:text-neutral-600" title="read more"> Read More » </a>
                  </div>
                </div>
                <div class="p-6">
                  <img class="object-cover object-center w-full mb-8 lg:h-48 md:h-36 rounded-xl" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsdlYQhRGOFhlfqzyBD9SIiJd3vOqf89bZSWMUejRqOQ&s" alt="blog"></img>
                  <h2 class="mb-8 text-xs font-semibold tracking-widest text-blue-600 uppercase">a great header right here</h2>
                  <h1 class="mx-auto mb-8 text-2xl font-semibold leading-none tracking-tighter text-neutral-600 lg:text-3xl">Short length headline to use as a title.</h1>
                  <p class="mx-auto text-base font-medium leading-relaxed text-gray-500">Free and Premium themes, UI Kit's, templates and landing pages built with Tailwind CSS, HTML &amp; Next.js.</p>
                  <div class="mt-4">
                    <a href="#" class="inline-flex items-center mt-4 font-semibold text-blue-600 lg:mb-0 hover:text-neutral-600" title="read more"> Read More » </a>
                  </div>
                </div>
                <div class="p-6">
                  <img class="object-cover object-center w-full mb-8 lg:h-48 md:h-36 rounded-xl" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsdlYQhRGOFhlfqzyBD9SIiJd3vOqf89bZSWMUejRqOQ&s" alt="blog"></img>
                  <h2 class="mb-8 text-xs font-semibold tracking-widest text-blue-600 uppercase">a great header right here</h2>
                  <h1 class="mx-auto mb-8 text-2xl font-semibold leading-none tracking-tighter text-neutral-600 lg:text-3xl">Short length headline to use as a title.</h1>
                  <p class="mx-auto text-base font-medium leading-relaxed text-gray-500">Free and Premium themes, UI Kit's, templates and landing pages built with Tailwind CSS, HTML &amp; Next.js.</p>
                  <div class="mt-4">
                    <a href="#" class="inline-flex items-center mt-4 font-semibold text-blue-600 lg:mb-0 hover:text-neutral-600" title="read more"> Read More » </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div class="mx-auto mt-32 max-w-7xl px-6 sm:mt-56 lg:px-8">
    <div
        class="relative isolate overflow-hidden bg-gray-900 px-6 py-24 shadow-2xl rounded-2xl sm:rounded-3xl sm:px-24 xl:py-32">
       
        <h2 class="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">Keep Updated
        </h2>

        <p class="mx-auto mt-2 max-w-xl text-center text-lg leading-8 text-gray-300">
            Keep pace with SecureCloud 
            advancements! Join our mailing list for selective, noteworthy updates.
        </p>

        <form class="mx-auto mt-10 flex max-w-md gap-x-4">

            <label for="email-address" class="sr-only">Email address</label>
            <input id="email-address" name="email" type="email" autocomplete="email" required="" class="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6" placeholder="Enter your email"/>

            <button type="submit" class="flex-none rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Notify me</button>
        </form>

        <svg viewBox="0 0 1024 1024" class="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2"
            aria-hidden="true">
            <circle cx="512" cy="512" r="512" fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fill-opacity="0.7">
            </circle>
            <defs>
                <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641" cx="0" cy="0" r="1"
                    gradientUnits="userSpaceOnUse" gradientTransform="translate(512 512) rotate(90) scale(512)">
                    <stop stop-color="#7775D6"></stop>
                    <stop offset="1" stop-color="#7ED321" stop-opacity="0"></stop>
                </radialGradient>
            </defs>
        </svg>

    </div>
</div>
                  
        <footer className="bg-body-tertiary text-center">
        <div className="container p-4 pb-0">
           <section className="mb-4">
             <a className="btn text-white btn-floating m-1" style={{backgroundColor: "#3b5998"}} href="#!"><i className="fab fa-facebook-f"></i></a>
             <a className="btn text-white btn-floating m-1" style={{backgroundColor: "#55acee"}} href="#!"><i className="fab fa-twitter"></i></a>
             <a className="btn text-white btn-floating m-1" style={{backgroundColor: "#dd4b39"}} href="#!"><i className="fab fa-google"></i></a>
             <a className="btn text-white btn-floating m-1" style={{backgroundColor: "#ac2bac"}} href="#!"><i className="fab fa-instagram"></i></a>
             <a className="btn text-white btn-floating m-1" style={{backgroundColor: "#0082ca"}} href="#!"><i className="fab fa-linkedin-in"></i></a>
             <a className="btn text-white btn-floating m-1" style={{backgroundColor: "#333333"}} href="#!"><i className="fab fa-github"></i></a>
           </section>
         </div>
         <div className="text-center p-3" style={{backgroundColor: "rgba(0, 0, 0, 0.05)"}}>
           © 2024 Copyright:
           <span className="text-body" > Varun Kadu</span>
         </div>
        </footer>
      </>
    )}

    {showAuth && <Auth />} {/* Render authentication component if showAuth is true */}
  </div>
    // <div>
    //   

    //       <div
    //           className="p-5 text-center bg-image"
    //           style={{
    //               // backgroundImage: `url(${Grouvp1})`,
    //               height: '100vh',
    //               // width : '1000px',
    //               // backgroundsize : cover,
    //               // marginTop: '58px'
    //           }}
    //       >
    //           <div className="mask" >
    //               <h1 class="my-4 text-3xl md:text-5xl text-black opacity-100 font-bold leading-tight text-center md:text-left">
    //                   Track Your <br />
    //                   <span class="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500">
    //                       Electricity and Water usage
    //                   </span>
    //                   !
    //               </h1>
    //           </div>

    //           <button className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
    //         Get Started
    //       </button>
    //       </div>


    //   {/* footer */}
    //   <footer className="bg-body-tertiary text-center">
    //     <div className="container p-4 pb-0">
    //       <section className="mb-4">
    //         <a className="btn text-white btn-floating m-1" style={{backgroundColor: "#3b5998"}} href="#!"><i className="fab fa-facebook-f"></i></a>
    //         <a className="btn text-white btn-floating m-1" style={{backgroundColor: "#55acee"}} href="#!"><i className="fab fa-twitter"></i></a>
    //         <a className="btn text-white btn-floating m-1" style={{backgroundColor: "#dd4b39"}} href="#!"><i className="fab fa-google"></i></a>
    //         <a className="btn text-white btn-floating m-1" style={{backgroundColor: "#ac2bac"}} href="#!"><i className="fab fa-instagram"></i></a>
    //         <a className="btn text-white btn-floating m-1" style={{backgroundColor: "#0082ca"}} href="#!"><i className="fab fa-linkedin-in"></i></a>
    //         <a className="btn text-white btn-floating m-1" style={{backgroundColor: "#333333"}} href="#!"><i className="fab fa-github"></i></a>
    //       </section>
    //     </div>
    //     <div className="text-center p-3" style={{backgroundColor: "rgba(0, 0, 0, 0.05)"}}>
    //       © 2020 Copyright:
    //       <a className="text-body" href="https://mdbootstrap.com/">MDBootstrap.com</a>
    //     </div>
    //   </footer>
    // </div>
  );
};

export default Home;
