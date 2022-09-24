import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/common/Navbar'

const index = () => {
    return (
        <div className='min-h-screen'>
            <Navbar />
            <Outlet />
        </div>
    )
}

export default index