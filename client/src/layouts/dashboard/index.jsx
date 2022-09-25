import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import SerchNav from './SerchNav'
import { Aside } from './Aside'

const index = () => {
    const { pathname } = useLocation()

    return (
        <main className='relative min-h-screen'>
            <SerchNav />
            <section className='flex relative container justify-center max-w-3xl mx-auto min-h-[calc(100vh-60px)]'>
                {pathname !== '/challenges/ask' && <Aside />}
                <div className='w-full h-auto'>
                    <Outlet />
                </div>
            </section>
            {/* <footer className='h-16 bg-red-400'>sddsdsds</footer> */}
        </main>
    )
}

export default index