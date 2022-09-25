import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import { ErrorMsg } from '../../components/common/MicroComponents'
import { resetLink, resetPassword, setAuth } from '../../store/auth/slice'

const ForgotPassword = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const { status, error, type, user } = useSelector(store => store.auth)
    const token = pathname?.split('/')[3]

    // use stats
    const [isMiniLoading, setIsMiniLoading] = useState(false)

    useEffect(() => {
        console.log(status, type);
        if (status === 'loading') {
            console.log('loading');
            // setIsMiniLoading(true)
        } else if (status === 'succeed') {
            console.log('succeed');
            if (type === 'RESET_LINK') {
                toast.success("Email sent.")
                dispatch(setAuth())
            }else if (type === 'RESET_PASSWORD') {
                toast.success("Password reset successfully.")
                navigate('/auth/signin')
                dispatch(setAuth())
            }
        } else if (status === 'failed') {
            toast.error(error)
        }
        return () => { }
    }, [type, status])


    const handleSignIn = (values) => {
        dispatch(resetLink(values))
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            email: "",
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().email().required(),
        }),
        onSubmit: (values) => {
            handleSignIn(values);
        }
    })
    const formik2 = useFormik({
        enableReinitialize: true,
        initialValues: {
            password: "",
            confirmPassword: ''
        },
        validationSchema: Yup.object().shape({
            password: Yup.string().nullable().required('Password is Required').matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 'Minimum eight characters, at least one letter, one number and one special character'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match'),
        }),
        onSubmit: (values) => {
            console.log(values);
            dispatch(resetPassword({
                token,
                password:values.password
            }))
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
                                        Enter Your Email
                                    </h4>
                                    <hr className="mt-6 border-b-1 border-mainBlack" />
                                </div>
                            </div>
                            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                {token ?
                                    <form onSubmit={formik2.handleSubmit} className=''>
                                        <div className="relative w-full mb-6">
                                            <label className="block uppercase text-xs font-bold mb-2"
                                                htmlFor="password">PassWord</label>
                                            <input
                                                id='password'
                                                name='password'
                                                onChange={formik2.handleChange}
                                                onBlur={formik2.handleBlur}
                                                value={formik2.values.password}
                                                type="text"
                                                className={`input ${formik2.errors.password && formik2.touched.password && 'border-red-600'}`}
                                                placeholder="Ex. Abc!@123"
                                            />
                                            {formik2.errors.password && formik2.touched.password && <ErrorMsg msg={formik2.errors.password} />}
                                        </div>
                                        <div className="relative w-full mb-3">
                                            <label className="block uppercase text-xs font-bold mb-2"
                                                htmlFor="confirmPassword">confirm Password</label>
                                            <input
                                                id='confirmPassword'
                                                name='confirmPassword'
                                                onChange={formik2.handleChange}
                                                onBlur={formik2.handleBlur}
                                                value={formik2.values.confirmPassword}
                                                type="text"
                                                className={`input ${formik2.errors.confirmPassword && formik2.touched.confirmPassword && 'border-red-600'}`}
                                                placeholder="Confirm password"
                                            />
                                            {formik2.errors.confirmPassword && formik2.touched.confirmPassword && <ErrorMsg msg={formik2.errors.confirmPassword} />}
                                        </div>
                                        <div className="text-center mt-12">
                                            <button
                                                className="bg-mainPurple text-white text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                                type="submit"
                                            >
                                                Reset Password
                                            </button>
                                        </div>
                                    </form> :
                                    <form onSubmit={handleSubmit}>
                                        <div className="relative w-full mb-3">
                                            {/* <label className="block uppercase  text-xs font-bold mb-2"
                                        htmlhtmlFor="grid-password">Email</label> */}
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
                                        <div className="text-center mt-6">
                                            <button
                                                className="bg-mainPurple text-white text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                                type="submit"
                                            >
                                                Send Reset Link
                                            </button>
                                        </div>
                                    </form>
                                }
                            </div>
                        </div>
                        <div className="flex flex-wrap mt-6">
                            <div className="w-1/2">
                                <Link to={'/auth/signin'} className=""><small>Sign In</small></Link>
                            </div>
                            <Link to={'/auth/signup'} className="w-1/2 text-right">
                                <small>Create new account</small>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword