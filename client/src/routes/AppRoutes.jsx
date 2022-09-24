import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
// layouts
import DefaultLayout from '../layouts/default'
import AuthLayout from '../layouts/auth'
// pages
import SignIn from '../pages/auth/SignIn'
import SignUp from '../pages/auth/SignUp'
import Home from '../pages/Home'
import Dashboard from '../pages/admin/Dashboard'
import ProtectedRoutes from './ProtectedRoutes'
import Challenge from '../pages/Challenges'

const AppRoutes = () => {
    return (
        <Suspense fallback={'Loading...'}>
            <Routes>
                <Route path='/challenges' element={<Challenge />} />
                <Route element={<DefaultLayout />}>
                    <Route index element={<Home />} />
                    <Route element={<ProtectedRoutes />}>
                        <Route path='dashboard/*' element={<Dashboard />} />
                    </Route>
                </Route>
                <Route path="auth" element={<AuthLayout />} >
                    <Route path="signin" element={<SignIn />} />
                    <Route path="signup" element={<SignUp />} />
                </Route>
            </Routes>
        </Suspense>
    )
}

export default AppRoutes