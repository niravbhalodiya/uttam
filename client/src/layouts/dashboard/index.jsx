import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import SerchNav from './SerchNav'
import { Aside } from './Aside'

const index = () => {
    const { pathname } = useLocation()

    return (
        <main className='relative min-h-screen'>
            <SerchNav />
            <section className='flex relative container justify-center max-w-3xl mx-auto'>
                {pathname !== '/challenges/ask' && <Aside />}
                <div className='w-full'>
                    <Outlet />
                </div>
            </section>
            <footer className='h-16 bg-red-400'>sddsdsds</footer>
        </main>
    )
}

export default index