import  {  useState } from 'react'
import ProfileHeader from '../components/ProfileHeader'
import apiConnector from '../apiConnector'
import { auth } from '../backendUrls/auth'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { settings } from '../backendUrls/settings'
import { setUser } from '../slices/auth'
import LoadingButton from '../components/LoadingButton'
import { IRootState } from '../Store'



const UpdateProfile = () => {
  const dispatch = useDispatch()
  const {user} = useSelector((state: IRootState) => state.auth)
  //check user from localStorage
  const getLocalUser: any | undefined = localStorage.getItem('user')
  const LocalUser = JSON.parse(getLocalUser)
  const [data, setData] = useState({
    userId: user._id,
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: ''                    
  })
  const [profile, setProfile] = useState<any>(null)
  const [updateProfile, setUpdateProfile] = useState<any>({
    firstName: LocalUser?.additionalDetails?.firstName || '',
    lastName: LocalUser?.additionalDetails?.lastName || '',
    mobile: LocalUser?.additionalDetails?.mobile || null,
    bio: LocalUser?.additionalDetails?.bio || ''
  })
  //handling change
  const handleChange = (e: any) => {
    setData((prev) => ({
      ...prev, 
      [e.target.name]: e.target.value
    }));
  };
  //hanldle profile info change
  const handleProfileChange = (e: any) => {
    setUpdateProfile((prev: any) => ({
      ...prev, 
      [e.target.name]: e.target.value
    }));
  }
  
  //hadling password 
  const [passwordLoading, setPasswordLoading] = useState<boolean>(false)
  const handleChangePasssword  = async() => {
    //validation
    handleValidation(data)
    setPasswordLoading(true)
    const res: any = await apiConnector("POST", auth.changePassword, data, {'Content-Type': 'application/json'} )
    setPasswordLoading(false)
    if(res?.data?.success == true) {
      toast.success('Password Updated')
    }else{
      toast.error('Something went Wrong')
    }
  }

  //adding validation
  const handleValidation = (obj: any) => {
    Object.entries(obj).forEach(([key, value]) => {
      if(!value){
        toast.error(`${key} should not be empty`)
        return null
      }
    });
  }

  //hanldling update profile
  const [profileLoading, setProfileLoading] = useState<boolean>(false)
  const hanldeUpdateProfile = async (e: any) =>{ 
     e.preventDefault()
    //apply validation
    handleValidation(updateProfile)
    const formData = new FormData();
    formData.append('profile', profile);
    formData.append('userId', user._id)
    formData.append('firstName', updateProfile.firstName)
    formData.append('lastName', updateProfile.lastName)
    formData.append('mobile', updateProfile.mobile)
    formData.append('bio', updateProfile.bio)
    
    setProfileLoading(true)
    const res: any = await apiConnector('POST',settings.UpdateProfile ,formData, {'Content-Type': 'multipart/form-data'})
    setProfileLoading(false)
    if(res?.data?.success == true){
      toast.success('Profile Updated')
      localStorage.setItem('user', JSON.stringify(res?.data?.updatedProfile))
      //update the user state
      dispatch(setUser(res?.data?.updatedProfile))
      
    }else{
      toast.error('Something Went Wrong')
    }
  }

  return (
    <section className=' p-10 flex'>
        <div className=' flex flex-col gap-5'>
          <ProfileHeader/>
          <div className=' bg-gray-100 rounded-md p-4'>
            <h1 className=' text-3xl font-semibold text-btn-main'>Account Settings</h1>
            <p className=' text-btn-lmain'>Here you can change your account information</p>
            <form encType="multipart/form-data">
                 <div className=' grid grid-cols-2 p-2 gap-3'>
                 <div className=' flex flex-col gap-1'>
                   <label htmlFor="profile">Profile Picture*</label>
                   <input 
                      className=" file:bg-btn-main file:text-white file:font-medium file:border-none file:px-4 file:py-2 file:rounded-md
                       file:hover:bg-blue-950 "
                      type="file" 
                      name='profile'
                      onChange={(e: any)=> setProfile(e.target.files[0])}
                       />
                 </div>
                 <div className=' flex flex-col gap-1'>
                   <label htmlFor="firstName">First Name*</label>
                   <input className=' rounded-md border-2 border-btn-main h-10 px-2'
                    name='firstName'onChange={handleProfileChange} value={updateProfile.firstName}
                   type="text" placeholder='First Name' />
                 </div>
                <div className=' flex flex-col gap-1' >
                  <label htmlFor="lastName">Last Name*</label>
                  <input className=' rounded-md border-2 border-btn-main h-10 px-2'
                   name='lastName' onChange={handleProfileChange} value={updateProfile.lastName}
                  type="text" placeholder='Last Name' />
                </div>
                <div className=' flex flex-col gap-1'>
                  <label htmlFor="email">Email Address*</label>
                  <input className=' rounded-md border-2 border-btn-main h-10 px-2' type="email" placeholder='example@gmail.com' />
                </div>
                <div className=' flex flex-col gap-1'>
                  <label htmlFor="mobile">Mobile</label>
                  <input className=' rounded-md border-2 border-btn-main h-10 px-2'
                   name='mobile' onChange={handleProfileChange} value={updateProfile.mobile}
                  type="number" placeholder='1234567890' />
                </div>
                <div className=' flex flex-col gap-1'>
                  <label htmlFor="bio">About Me</label>
                  <input className=' rounded-md border-2 border-btn-main h-10 px-2'
                   name='bio' onChange={handleProfileChange} value={updateProfile.bio}
                  type="text" placeholder='Describe Your Hustles' />
                </div>
                 </div>
                 <div className=' flex justify-end'>
              {
                profileLoading ? <LoadingButton/> 
                 :
                 <button className=' rounded-md bg-btn-main h-10 px-4 py-2 text-white font-medium m-5 hover:bg-blue-950'
                  onClick={hanldeUpdateProfile}
                  >Save Changes</button> 
              }
                 </div>
            </form>
          </div>
        </div>

        {/* secound side */}
        <div className=' flex flex-col mx-14 p-4 gap-4'>
            {/* social */}
          <div className=' bg-gray-100 p-4 rounded-md'>
          <h1 className=' text-3xl font-semibold text-btn-main'>Social Profiles</h1>
          <p className=' text-btn-lmain'>Share your social profile, so that other can follow there also</p>
           <div>
              <div className=' flex flex-col gap-1 p-4'>
                <label className=' text-red-500' htmlFor="instagram">Instagram</label>
                <input className=' rounded-md border-2 border-btn-main h-10 px-2' type="text" placeholder='Instagram username' />
              </div>
              <div className=' flex flex-col gap-1 p-4'>
                <label className=' text-blue-500' htmlFor="instagram">Facebook</label>
                <input className=' rounded-md border-2 border-btn-main h-10 px-2' type="text" placeholder='Facebook username' />
              </div>
              <div className=' flex flex-col gap-1 p-4'>
                <label className=' text-yellow-500' htmlFor="instagram">Snapchat</label>
                <input className=' rounded-md border-2 border-btn-main h-10 px-2' type="text" placeholder='Snapchat username' />
              </div>
              <div className=' flex justify-end'>
              <button className=' rounded-md bg-btn-main h-10 px-4 py-2 text-white font-medium m-5 hover:bg-blue-950'>Save Changes</button>
            </div>
           </div>
          </div>
          {/* change password */}
          <div className=' bg-gray-100 p-4 rounded-md'>
          <h1 className=' text-3xl font-semibold text-btn-main'>Change Password</h1>
          <p className=' text-btn-lmain'>Here you can chage your password</p>
           <div>
              <div className=' flex flex-col gap-1 p-4'>
                <label htmlFor="oldPassword">Old Password</label>
                <input className=' rounded-md border-2 border-btn-main h-10 px-2' name='oldPassword'
                 type="text" placeholder='Enter Your Old Password'
                  onChange={handleChange} value={data.oldPassword}
                 />
              </div>
              <div className=' flex flex-col gap-1 p-4'>
                <label htmlFor="newPassword">New Password</label>
                <input className=' rounded-md border-2 border-btn-main h-10 px-2' type="text"
                 onChange={handleChange} value={data.newPassword}
                 name='newPassword' placeholder='Enter New Password' />
              </div>
              <div className=' flex flex-col gap-1 p-4'>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input className=' rounded-md border-2 border-btn-main h-10 px-2' type="text"
                 onChange={handleChange} value={data.confirmNewPassword}
                name='confirmNewPassword' placeholder='Enter Confirm Password' />
              </div>
              <div className=' flex justify-end'>
              {
                passwordLoading ? <LoadingButton/> :
                <button className=' rounded-md bg-btn-main h-10 px-4 py-2 text-white font-medium m-5 hover:bg-blue-950'
               onClick={handleChangePasssword}
              >Save Changes</button>
              }
            </div>
           </div>
          </div>
        </div>


    </section>
  )
}

export default UpdateProfile