import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import t1 from '../assets/testimonils/t1.png'
import t2 from '../assets/testimonils/t2.png'
import t3 from '../assets/testimonils/t3.png'



const CarouselComp = () => {
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };
  return (
    <section className=' mt-40 p-5 h-screen overflow-x-hidden'>
        <h1 className=' text-4xl text-center font-medium dark:text-white'>Testimonials <span className=' text-btn-lmain text-sm'>That proves us</span></h1>
        <Carousel className=' mt-5 px-4'
         responsive={responsive}
          autoPlay={true}
          autoPlaySpeed={1000}>

       
           <div className=' flex flex-col justify-center items-center bg-blue-950 p-4 rounded-md m-5 hover:scale-105 hover:bg-blue-900'>
            <img className=' size-48 rounded-full' src={t1} alt="test images" />
            <h3 className=' text-btn-main font-medium text-xl'>Sarah Thompson</h3>
             <p className=' text-btn-lmain'>"Top Nerve has been a game-changer for me! The Diverse Questions Modules keep me engaged with a wide range     of topics, and the Performance Analysis feature offers clear insights into my progress. It's an excellent resource for anyone looking to     expand their knowledge and improve their skills. Highly recommended!"</p>
           </div>
    
           <div className=' flex flex-col justify-center items-center  bg-blue-950 p-4 rounded-md m-5 hover:scale-105 hover:bg-blue-900'>
            <img className=' size-48 rounded-full' src={t2} alt="test images" />
            <h3 className=' text-btn-main font-medium text-xl'>Shahnawaz ahmad</h3>
             <p className=' text-btn-lmain'>"As a lifelong learner, I've found this website to be incredibly valuable. The Diverse Questions Modules     are diverse indeed, covering everything from history to technology in engaging ways. The Performance Analysis feature has helped me track     my learning progress effectively, making it easy to see where I'm excelling and where I can focus more. It's a must-visit for anyone     passionate about continuous learning and self-improvement."</p>
           </div>
    
           <div className=' flex flex-col justify-center items-center  bg-blue-950 p-4 rounded-md m-5 hover:scale-105 hover:bg-blue-900'>
            <img className=' size-48 rounded-full' src={t3} alt="test images" />
            <h3 className=' text-btn-main font-medium text-xl'>Rahul Kumar</h3>
             <p className=' text-btn-lmain'>"I stumbled upon this website while searching for ways to challenge my knowledge base, and I'm so glad I     did. The Diverse Questions Modules are both stimulating and comprehensive, offering insights into various subjects that keep me coming     back for more."</p>
           </div>
    </Carousel>
    <hr className="bg-btn-lmain h-[2px]" />
    </section>
  )
}

export default CarouselComp