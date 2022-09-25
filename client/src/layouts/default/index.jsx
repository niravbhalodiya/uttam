import React from 'react'
import { Outlet } from 'react-router-dom'
import SerchNav from '../dashboard/SerchNav'

const index = ({isSearchedNav = true}) => {

    return (
        <main className='relative min-h-screen'>
            <SerchNav isSearchedNav={isSearchedNav} />
            <section className='flex relative container justify-center'>
                <Outlet />
            </section>
            <footer className='h-16 bg-red-400'>sddsdsds</footer>
        </main>
    )
}

export default index