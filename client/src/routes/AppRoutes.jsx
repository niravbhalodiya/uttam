import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// layouts
import DefaultLayout from '../layouts/default'
import DashboardLayout from '../layouts/dashboard'
import AuthLayout from '../layouts/auth'
// pages
import SignIn from '../pages/auth/SignIn'
import SignUp from '../pages/auth/SignUp'
import Home from '../pages/Home'
import Dashboard from '../pages/admin/Dashboard'
import ProtectedRoutes from './ProtectedRoutes'
import Challenge from '../pages/main/Challenges'
import AskQuestion from '../pages/main/AskQuestion'
import Profile from '../pages/user/Profile';
import Tag from '../pages/main/Tags';
import Users from '../pages/main/Users';
import SingleChallenge from '../pages/main/SingleChallenge';

const AppRoutes = () => {
    return (
        <Suspense fallback={'Loading...'}>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Routes>
                <Route element={<DashboardLayout />}>
                    <Route path='/tags' element={<Tag />} />
                    <Route path='/users' element={<Users />} />
                    <Route path='/challenges' element={<Challenge />} />
                    <Route path='/challenges/:id' element={<SingleChallenge />} />
                    <Route path='/challenges/ask' element={<AskQuestion />} />
                </Route>
                <Route element={<ProtectedRoutes />}>
                    <Route element={<DefaultLayout />}>
                        <Route path='dashboard/*' element={<Dashboard />} />
                        <Route path='user/profile' element={<Profile />} />
                    </Route>
                    <Route element={<DefaultLayout isSearchedNav={'false'} />}>
                        <Route index element={<Home />} />
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