import { useDispatch } from "react-redux"
import { sidebarLinks } from "../constantData/navLinks"
import { NavLink } from 'react-router-dom'
import { logout } from "../slices/auth"
import { RiLogoutBoxLine } from "react-icons/ri";


const Sidebar = () => {
  const dispatch = useDispatch()
  return (
    <div className=" flex flex-col justify-between px-3 py-4 h-[88vh] border-3 w-[15%] border-r-2 border-btn-main">
      <div className=" flex flex-col gap-3 my-2">   
         {
               sidebarLinks.map((link, index) => {
                const Icon = link.icon;
                 return (
                   <NavLink  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? " bg-btn-main font-medium rounded-md px-3 py-2 text-white flex gap-3 items-center hover:bg-blue-950" :
                    "font-medium rounded-md px-3 py-2 dark:text-white flex gap-3 items-center hover:bg-blue-950"
                  }
                    key={index} to={link.Path}>
                      <Icon/>
                      <span> {link.title}</span>
                    </NavLink>
                 )
               })
             }
      </div>
      <div className="flex flex-col border-t-2 border-btn-lmain pt-8">
        <button onClick={() => dispatch(logout())} 
         className=" bg-btn-main rounded-md p-2  text-white font-medium self-center hover:bg-blue-950">
          <div className=" flex gap-3 w-full items-center">
          <RiLogoutBoxLine/>
          <span>Log Out</span>
          </div>
          </button>
        <p className=" text-btn-lmain self-center mt-3">v1.0</p>
      </div>
    </div>
    
  )
}

export default Sidebar