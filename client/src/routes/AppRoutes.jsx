import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignIn from '../pages/auth/SignIn'
import SignUp from '../pages/auth/SignUp'
import { Home } from '../pages/home'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth/signin" element={<SignIn />} />
            <Route path="/auth/signup" element={<SignUp />} />
        </Routes>
    )
}

export default AppRoutes