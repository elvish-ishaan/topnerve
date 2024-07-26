import { useNavigate } from 'react-router'
import  student  from '../assets/student.png'
import AvatarGrp from './AvatarGrp'
import CarouselComp from './CarouselComp'
import Feat from './Feat'




const MainPage = () => {
  const navigate = useNavigate()
  return (
    <div className=' h-fit'>
        {/* hero section */}
        <section className=' flex p-3 justify-around overflow-hidden h-[85vh]'>
            <div className=' flex flex-col w-[70%] text-center py-16 leading-8'>
                <p className= ' text-btn-lmain'> - 12 Days free trail</p>
                <h1 className=' text-5xl font-semibold dark:text-white'>"Sharpen Your Skills with Every Question: Practice
                     <span className=' text-btn-main px-2 '>Today</span>,
                     Excel <span className=' text-btn-main px-2 '>Tomorrow</span>!"</h1>
                <div className=' flex justify-center mt-5'>
                <p className=' text-btn-lmain w-1/2 leading-5'>Master concepts effortlessly with our interactive practice questions!
                Explore flipped images to deepen your understanding and boost your learning experience.</p>
                </div>
                <div className=' flex gap-5 align-middle justify-center my-12'>
                    <button className=' bg-btn-main p-2 font-medium text-white rounded-md shadow-md'
                     onClick={() => navigate('/signup')}>
                      Try for free
                      </button>
                    <button className=' border-2 border-btn-main rounded-md p-2 dark:text-white'>see how it works?</button>
                </div>

                <div className='flex self-center gap-2'>
                    <AvatarGrp/> 
                    <h3 className=' self-center text-green-600 font-medium'> Are Now Practicing</h3>
                </div>
            </div>

            <div className=' flex justify-end'>
                <img className='transform scale-x-[-1] w-[35em]' src={student} alt="studentImg" />
            </div>

        </section>
        
        {/* feature section */}
        <section className=' w-fit overflow-hidden'>
          <Feat/>
        </section>
        
         {/* testimonial section  */}
         {/* <CarouselComp/> */}
    </div>
  )
}

export default MainPage