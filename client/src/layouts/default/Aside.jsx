import React from 'react'
import { Link } from 'react-router-dom'
// icons
import { FaTags, FaUsers } from 'react-icons/fa'
import { IoEarthSharp } from 'react-icons/io5'

export const Aside = () => {
    return (
        <aside className='sticky py-4 shrink-0 top-16 min-w-[10%] border-r max-h-[calc(100vh-60px)]'>
            <Link to={'/'}>Home</Link>
            <nav className='my-4'>
                <span className='text-xs capitalize mb-2 block'>Public</span>
                <ul className='pl-2 text-sm'>
                    <li className='aside-link aside-link-sctive'>
                        <span><IoEarthSharp fontSize={16} /></span>
                        <Link to={'/'}>Challenge</Link>
                    </li>
                    <li className='aside-link'>
                        <span><FaTags fontSize={16} /></span>
                        <Link to={'/'}>Tags</Link>
                    </li>
                    <li className='aside-link'>
                        <span><FaUsers fontSize={16} /></span>
                        <Link to={'/'}>Users</Link>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}
