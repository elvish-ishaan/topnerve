import { infoLinks } from '../constantData/navLinks'
import { FaInstagram } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import toast from 'react-hot-toast';


const Footer = () => {
  return (
    <footer className=' bg-blue-950 flex justify-between p-14'>
        <div className=' flex flex-around gap-16'>
           <div className=' flex flex-col'>
              <h1 className=' text-lg font-semibol text-white underline tracking-widest'>INFO</h1>
              {
                infoLinks.map((link, index) => <a key={index} className=' text-slate-400 mt-3' href={link.path}>{link.title}</a>)
              }
           </div>
        </div>

        <div className=' flex flex-col justify-around'>
           <div className=' flex flex-col'>
             <p className=' text-white'>Subscribe to our newsletter</p>
             <div className=' flex align-baseline mt-2'>
               <input placeholder='Enter Your Email' type="email" className=' h-10 py-2 px-3 bg-transparent border-2
                border-btn-main text-white' 
                required={true}
                />
               <button className=' h-10 py-2 px-3 text-white bg-btn-main hover:bg-blue-900'
                onClick={() => toast.success('Subscribed')}
               >Subscribe</button>
             </div>
              <div className=' flex gap-2 text-3xl p-5 text-white'>
                 <FaInstagram />
                 <FaFacebookSquare />
              </div>
             </div>
          
        </div>

    </footer>
  )
}

export default Footer