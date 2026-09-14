import { Avatar, Button } from '@heroui/react'
import { Aave, Slack, Thorchain } from 'iconsax-reactjs'
import React, { useContext, useState } from 'react'
import { Link, NavLink, useNavigate, useNavigation } from 'react-router-dom'
import { UserTokenProvider } from '../AuthUserContext'
// import Profile from '../pages/Profile'
export default function Navbar() {

    const [isDashOpen, setIsDashOpen] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    // const [userdata, setuserdata] = useState(null)
    const { userdata, setUserData } = useContext(UserTokenProvider)


    const navgait = useNavigate()
    function handelSingOut() {
        localStorage.removeItem('user_token')
        setUserData(null)
        navgait('/login')
        setIsDashOpen(false)
    }

    return (
        <>

            <nav className=" bg-blue-900 shadow-xl  fixed w-full z-20 top-0 inset-s-0 border-b ">
                <div className="max-w-7xl flex flex-wrap items-center justify-between mx-auto p-2 md:p-3">
                    <Link to="" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <Aave className='ms-9 w-12 h-12  sm:w-15 sm:h-15 md:w-18 md:h-18 lg:w-14 lg-h-14' color="#e70b0b" />
                    </Link>


                    <div className="flex items-center md:order-2 me-md-8 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        {userdata ? <>
                            <button
                                onClick={_ => setIsDashOpen(!isDashOpen)}
                                type="button" className="flex  text-sm bg-neutral-primary me rounded-full md:me-6  focus:ring-neutral-tertiary"
                                id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                                <Avatar >
                                    <Avatar.Image alt="John Doe" src={userdata?.data?.user?.photo} />
                                    <Avatar.Fallback>JD</Avatar.Fallback>
                                </Avatar>
                            </button> </> :
                            <>
                                <Link className=' text-sm sm-text-[17px] md:text-[19px]  me-3 rounded-2xl bg-blue-400 px-2 py-0.75 text-white border-2' to='login'>Login</Link>
                                <Link className=' text-sm sm-text-[17px] md:text-[19px]  me-3 rounded-2xl bg-blue-400 px-2 py-0.75 text-white border-2' to='regester'>Regester</Link>
                            </>
                        }
                        {/* Dropdown menu */}
                        <div className={`z-50  ${isDashOpen ? 'block' : 'hidden'} absolute text-white bg-gray-900 right-0 top-full bg-neutral-primary-medium border border-default-medium rounded-base shadow-lg w-44" id="user-dropdown`}>
                            <div className="px-4 py-3 text-sm border-b border-default">
                                <span className="block text-heading font-medium capitalize">{userdata?.data?.user?. name}</span>
                                <span className="block text-body truncate">{userdata?.data?.user?.email}</span>
                            </div>


                            <ul className="p-2 text-sm text-body font-medium" aria-labelledby="user-menu-button">
                              <NavLink to='/'>
                                    <li className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:bg-gray-400 cursor-pointer rounded " >Home
                                    </li> 
                              </NavLink>
                                <NavLink to='/profile'> 
                                <li className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:bg-gray-400 cursor-pointer rounded  " > Profile 
                                </li>
                                </NavLink>
                               
                                <li onClick={_ => handelSingOut()} className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:bg-gray-400 cursor-pointer rounded " > singin-out
                                </li>
                            </ul>
                        </div>



                        <button onClick={_ => setIsOpen(!isOpen)} data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-body rounded-base md:hidden hover:bg-neutral-secondary-soft hover:text-heading focus:outline-none " aria-controls="navbar-user" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            {/* <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeWidth={2} d="M5 7h14M5 12h14M5 17h14" /></svg> */}
                        </button>
                    </div>
                    <div className={`text-center items-center ${isOpen ? 'block' : 'hidden'} justify-between  w-full md:flex md:w-auto md:order-1`} id="navbar-user">
                        {userdata && <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-default rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary">

                            <li>
                                <NavLink to="/posts" className={({ isActive }) => { return `block py-2 px-3 text-center bg-brand rounded md:bg-transparent md:text-fg-brand md:p-0 ${isActive ? 'text-red-500 text-3xl' : 'text-white'}` }} aria-current="page">Posts</NavLink>
                            </li>


                        </ul>}
                    </div>
                </div>
            </nav>






            {/* 
            <Link to='/'>Posts</Link>
            <Link to='/regester'>regester</Link>
            <Link to='/login'>login</Link> */}

        </>)
}
