import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN } from '../utils/constants';

const ProtectedRoutes = () => {
    // constants
    const navigate = useNavigate()

    // hooks
    useEffect(() => {
        let isApiSubscribed = true;
        const isAuthenticated = sessionStorage.getItem(ACCESS_TOKEN)

        if (!isAuthenticated) {
            navigate('/auth/signin')
        }

        // dispatch(registrationStatus(sessionStorage.getItem(MOBILE_NO))).then(res => {
        //     if (isApiSubscribed) {
        //         if (!res.payload.registeredUser) {
        //             navigate('/create-profile')
        //         }
        //     }
        // })

            return () => isApiSubscribed = false
    }, [])

    return <Outlet />
}

export default ProtectedRoutes