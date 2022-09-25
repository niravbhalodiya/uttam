import React from 'react'
import { useNavigate } from 'react-router-dom';

const AdminRoute = () => {
    // constants
    const navigate = useNavigate()

    // hooks
    useEffect(() => {
        let isApiSubscribed = true;
        const isAuthenticated = sessionStorage.getItem(ACCESS_TOKEN)

        if (!isAuthenticated) {
            navigate('/auth')
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

export default AdminRoute