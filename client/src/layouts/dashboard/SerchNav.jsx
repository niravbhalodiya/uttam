import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { ACCESS_TOKEN } from '../../utils/constants';
import { toast } from 'react-toastify'
const SerchNav = ({ isSearchedNav }) => {
    const navigate = useNavigate()
    const [ariaFocusMessage, setAriaFocusMessage] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserDropdown, setIsUserDropdown] = useState(false)
    const [serchOption, setSerchOption] = useState([
        {
            label: "bbb",
            value: "bbb",
        },
        {
            label: "aaa",
            value: "aaa",
        },
        {
            label: "ccc",
            value: "ccc",
        },
    ])

    const onMenuOpen = () => setIsMenuOpen(true);
    const onMenuClose = () => setIsMenuOpen(false);

    const handleSignOut = () => {
        const confirm = window.confirm('Are you sure?')
        if (confirm) {
            sessionStorage.clear()
            toast.success('Sign out successfully')
            navigate('/')
        }
    }

    // useEffect

    return (
        <header className="sticky left-0 top-0 w-full z-20 h-20">
            <nav className="bg-mainBlack border-gray-200 py-4 text-white">
                <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
                    <Link to="/" className="flex items-center min-w-xs">
                        <span className="self-center text-xl  font-semibold whitespace-nowrap ">Solvo</span>
                    </Link>
                    <div className="flex items-center lg:order-2 max-w-xs">
                        {sessionStorage.getItem(ACCESS_TOKEN) ? (
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <button
                                    type="button"
                                    className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                    onClick={() => setIsUserDropdown(false)}
                                >
                                    <span className="sr-only">View notifications</span>
                                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                                    </svg>
                                </button>
                                <div className="relative ml-3">
                                    <div onClick={() => setIsUserDropdown(!isUserDropdown)}>
                                        <button type="button" className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                                            <span className="sr-only">Open user menu</span>
                                            <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                                        </button>
                                    </div>
                                    {isUserDropdown &&
                                        <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                                            <Link to={'/user/profile'} className="block px-4 py-2 text-sm text-gray-700">My Profile</Link>
                                            <button
                                                className="block px-4 py-2 text-sm text-gray-700"
                                                onClick={() => handleSignOut()}
                                            >Sign out</button>
                                        </div>
                                    }
                                </div>
                            </div>
                        ) : (
                            <div>
                                <Link to={'/auth/signin'} className=" hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 focus:outline-none">
                                    Sign In
                                </Link>
                                <Link to={'/auth/signup'} className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 focus:outline-none">
                                    Sign Up
                                </Link>
                            </div>
                        )}
                        <button data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 " aria-controls="mobile-menu-2" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                            <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </button>
                    </div>
                    <div className={`items-center ${!isSearchedNav && 'min-w-[350px]'} justify-between hidden w-full lg:flex lg:w-auto lg:order-1`} id="mobile-menu-2">
                        {!isSearchedNav ?
                            <Select
                                className='w-full'
                                placeholder='Search challanges...'
                                aria-labelledby="aria-label"
                                inputId="aria-example-input"
                                name="aria-live-color"
                                onMenuOpen={onMenuOpen}
                                onMenuClose={onMenuClose}
                                options={serchOption}
                            />
                            :
                            <div className="items-center justify-between hidden w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                                <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                                    <li>
                                        <Link to={'/'} className="block py-2 pl-3 pr-4 text-white bg-purple-700 rounded lg:bg-transparent lg:text-purple-700 lg:p-0">
                                            Home
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={'/dashboard'} className="block py-2 pl-3 pr-4 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 ">
                                            Dashboard
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        }
                    </div>
                </div>
            </nav>
        </header >
    )
}

export default SerchNav