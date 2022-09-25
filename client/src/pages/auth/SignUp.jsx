import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ErrorMsg } from '../../components/common/MicroComponents'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAuth, SignUpApi } from '../../store/auth/slice'
import { toast } from 'react-toastify'
import { ACCESS_TOKEN, USER_ID } from '../../utils/constants'

const SignUp = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { status, error, type, user } = useSelector(store => store.auth)

    // use stats
    const [isMiniLoading, setIsMiniLoading] = useState(false)

    useEffect(() => {
        console.log(status, type);
        if (status === 'loading') {
            console.log('loading');
            setIsMiniLoading(true)
        } else if (status === 'succeed') {
            console.log('succeed');
            if (type === 'SIGN_UP_API') {
                sessionStorage.setItem(ACCESS_TOKEN, user.token)
                sessionStorage.setItem(USER_ID, user.userId)
                toast.success("Sign In successfully")
                dispatch(setAuth())
                navigate('/challenges')
            }
        }
        else {
            toast.error(error)
        }
        return () => { }
    }, [type, status])

    const handleSignUp = (values) => {
        dispatch(SignUpApi(values))
        // SignUpApi(values)
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: "",
            userName: "",
            email: "",
            password: '',
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required('Name is Required').min(3),
            userName: Yup.string().min(4).required('User name is Required'),
            email: Yup.string().email().required(),
            password: Yup.string().nullable().required('Password is Required').matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 'Minimum eight characters, at least one letter, one number and one special character'),
        }),
        onSubmit: (values) => {
            handleSignUp(values)
        }
    })

    const { values, errors, touched, setFieldValue, handleBlur, handleSubmit, handleChange } = formik

    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="container mx-auto px-4 h-full">
                <div className="flex content-center items-center justify-center h-full ">
                    <div className="w-full lg:w-5/12 px-4">
                        <div
                            className="relative bg-gray-200 flex border flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg">
                            <div className="rounded-t mb-0 px-6 py-6">
                                <div className="text-center mb-3">
                                    <h4 className="text-xl font-bold">
                                        Sign Up
                                    </h4>
                                    <hr className="mt-6 border-b-1 border-mainBlack" />
                                </div>
                            </div>
                            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                <form onSubmit={handleSubmit}>
                                    <div className='flex gap-4'>
                                        <div className="relative w-full mb-3">
                                            <label className="block uppercase  text-xs font-bold mb-2"
                                                for="grid-password">Name</label>
                                            <input
                                                name='name'
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.name}
                                                type="text"
                                                className={`input ${errors.name && touched.name && 'border-red-600'}`}
                                                placeholder="Ex. John Wick"
                                            />
                                            {errors.name && touched.name && <ErrorMsg msg={errors.name} />}
                                        </div>
                                        <div className="relative w-full mb-3">
                                            <label className="block uppercase  text-xs font-bold mb-2"
                                                for="grid-password">User Name</label>
                                            <input
                                                name='userName'
                                                autoComplete='off'
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.userName}
                                                type="text"
                                                className={`input ${errors.userName && touched.userName && 'border-red-600'}`}
                                                placeholder="Ex. xyz_12"
                                            />
                                            {errors.userName && touched.userName && <ErrorMsg msg={errors.userName} />}

                                        </div>
                                    </div>
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase  text-xs font-bold mb-2"
                                            for="grid-password">Email</label>
                                        <input
                                            name='email'
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.email}
                                            type="text"
                                            className={`input ${errors.email && touched.email && 'border-red-600'}`}
                                            placeholder="Ex. abc@gmail.com"
                                        />
                                        {errors.email && touched.email && <ErrorMsg msg={errors.email} />}
                                    </div>
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase  text-xs font-bold mb-2"
                                            for="grid-password">Password</label>
                                        <input
                                            name='password'
                                            autoComplete='off'
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.password}
                                            type="text"
                                            className={`input ${errors.password && touched.password && 'border-red-600'}`}
                                            placeholder="Password"
                                        />
                                        {errors.password && touched.password && <ErrorMsg msg={errors.password} />}
                                    </div>
                                    <div>
                                        <label className="inline-flex items-center cursor-pointer"><input
                                            id="customCheckLogin" type="checkbox"
                                            className="form-checkbox border-0 rounded  ml-1 w-5 h-5 ease-linear transition-all duration-150" /><span
                                                className="ml-2 text-sm font-semibold ">Remember
                                                me</span></label>
                                    </div>
                                    <div className="text-center mt-6">
                                        <button
                                            className="bg-mainPurple text-white text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                            type="submit"
                                        >
                                            Sign In
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="text-center">
                            <Link to={'/auth/signin'}><small>Already have
                                account</small></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp