import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Aside } from './Aside'
import SerchNav from './SerchNav'

const index = () => {
    const { pathname } = useLocation()

    console.log(location);
    return (
        <main className='relative min-h-screen'>
            <SerchNav />
            <section className='flex relative container justify-center'>
                {pathname !== '/challenges/ask' && <Aside />}
                <Outlet />
            </section>
            <footer className='h-16 bg-red-400'>sddsdsds</footer>
        </main>
    )
}

export default index