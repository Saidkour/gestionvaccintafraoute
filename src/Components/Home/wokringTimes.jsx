export default function WorkingTimes(){

    return <>
      <div className=" container block relative md:p-6 xl:p-20">
        <div className="absolute bg-black w-full h-full left-0 right-0 bottom-0 opacity-[0.47]  bg-cover z-[-1] bg-center top-0"></div>
        <div className='absolute top-0 left-0 w-full h-full bg-[url("/bg-img-workingTime.jpg")] opacity-[0.87]  bg-cover  bg-center z-[-1]'></div>
        <div className="block md:flex">
        <div className="md:min-w-[50%] p-5  min-w-[100%] xl:min-w-[39%]  flex-item order-1 md:order-2">
                <div className="bg-primary rounded-t-xl p-7 mt-10 md:mt-0 text-center ">
                    <h3 className="py-4 text-3xl font-bold  text-white leading-relaxed  ">Emergency Cases</h3>
                    <div className="text-center ">
                        <span className="block md:flex ml-auto md:ml-[92px] mb-5  md:pb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#ffffff" className="bi bi-telephone-fill mt-3 mb-5 md:mb-0  block m-auto md:flex md:m-0  " viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
                            </svg>
                            <span className="ml-5 text-base leading-tight font-bold text-white  uppercase">1238428324</span>
                        </span>
                        <hr  className="max-w-[80%] mx-auto mb-5"/>
                        <p className="text-white">We provide 24/7 professional emergency help lorem ipsum dolor sit amet.</p>
                    </div>
                </div>
                <div className="bg-white p-7 text-center rounded-b-xl "> 
                    <h3 className="py-4 text-3xl font-bold font-open-sans leading-relaxed text-primary" >Opening Hours</h3>
                    <div className="flex justify-between">
                        <div className="p-5" >
                            <span className="font-medium">Weekdays</span>
                        </div>
                        <div className="p-5">
                            <span className="font-medium">8:00 - 20:00</span>
                        </div>
                    </div>
                    <hr />
                    <div className="flex justify-between">
                        <div className="p-5" >
                            <span className="font-medium">Saturday</span>
                        </div>
                        <div className="p-5">
                            <span className="font-medium">9:30 - 17:30</span>
                        </div>
                    </div>
                    <hr />
                    <div className="flex justify-between">
                        <div className="p-5" >
                            <span className="font-medium">Sunday</span>
                        </div>
                        <div className="p-5">
                            <span className="font-medium">9:30 - 15:00</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="min-w-[100%] md:min-w-[50%] md:text-start text-center xl:min-w-[61%]  p-2 xl:p-5 lg:p-9 ">
                <h1 className="md:text-5xl text-[24px]  pt-5 font-bold text-primary leading-tight pb-2">About Our Clinic</h1>
               <span className="relative">
              <span className="absolute rounded-md top-[8px] md:ml-0 ml-[-36px] w-[70px] h-[6px] left-0 right-0 bottom-0 bg-secondary"></span>
               </span>
               
                <p className="pt-7 md:mt-5 md:max-w-[80%] p-8 md:p-2 ">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                  <br />
                  <br />
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque.
                </p>
                <span>
                <a href="#" className="flex py-3 mb-10 px-5 justify-evenly hover:bg-secondary m-auto md:mx-0  bg-primary max-w-[170px] font-bold leading-normal uppercase text-[13px] border-none mt-[40px] rounded-lg">
                    <span className="text-white">
                    READ MORE
                    </span>
                    <span className="ml-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#ffffff" className="bi bi-chevron-right" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
                    </svg>
                    </span>
                </a>
                </span>
            </div>
           
        </div>
    </div>
    </>
}