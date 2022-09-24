import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
import AskQuestion from '../pages/AskQuestion'

const AppRoutes = () => {
    return (
        <Suspense fallback={'Loading...'}>
            <ToastContainer />
            <Routes>
                <Route index element={<Home />} />
                <Route element={<DefaultLayout />}>
                    <Route path='/challenges' element={<Challenge />} />
                    <Route path='/challenges/ask' element={<AskQuestion />} />
                </Route>
                <Route element={<ProtectedRoutes />}>
                    <Route element={<DefaultLayout />}>
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