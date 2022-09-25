import React from 'react'
import { Outlet } from 'react-router-dom'

const index = () => {
    return (
        <div className='min-h-screen'>
            {/* <Navbar is /> */}
            <Outlet />
        </div>
    )
}

export default index