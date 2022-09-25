import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import * as Yup from 'yup'
import { ErrorMsg } from '../../components/common/MicroComponents'
import { postChallenge, setChallange } from '../../store/challenge/slice'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const AskQuestion = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { status, error, type } = useSelector(store => store.challenge)

    const [editor, setEditor] = useState()
    const [tagOptions, setTagOptions] = useState([
        {
            label: "Html",
            value: 'html'
        },
        {
            label: "JavaScript",
            value: 'javascript'
        },
        {
            label: "Css",
            value: 'css'
        },
        {
            label: "Java",
            value: 'java'
        },
        {
            label: "Python",
            value: 'python'
        },
    ])

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: '',
            tags: [],
        },
        validationSchema: Yup.object().shape({
            title: Yup.string().min(15).required('Title is Required.'),
            tags: Yup.array().min(1).max(5).required('Tags is required.')
        }),
        onSubmit: (values) => {
            dispatch(postChallenge({
                title: values.title,
                tags: values.tags.map(tag => tag.value),
                description: editor
            }))
            console.log(values);
        }
    })

    const { values, errors, touched, setFieldValue, handleBlur, handleSubmit, handleChange } = formik

    const modules = {
        toolbar: [
            [{ 'header': 1 }, { 'header': 2 }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image',],
            ['clean']
        ],
    }

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote', 'code',
        'list', 'bullet', 'indent',
        'link', 'image',
    ]

    //
    useEffect(() => {
        console.log(status, type);
        if (status === 'loading') {
            console.log('loading');
            // setIsMiniLoading(true)
        } else if (status === 'succeed') {
            console.log('succeed');
            if (type === 'POST_CHALLENGE') {
                toast.success("Challenge asked successfully.")
                dispatch(setChallange())
                navigate('/challenges')
            }
        }
        else {
            toast.error(error)
        }
        return () => { }
    }, [type, status])


    return (
        <div>
            <div className='flex justify-between items-center my-8'>
                <h2 className='font-bold text-2xl'>Ask a public challenge</h2>
                {/* <Link to={'/challenges/ask'} className='bg-mainPurple px-3 py-2 text-white rounded-md'>Ask Challenge</Link> */}
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="relative w-full mb-3">
                        <label className="block uppercase  text-xs font-bold mb-2"
                            htmlFor="title">Title</label>
                        <input
                            name='title'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.title}
                            type="text"
                            className={`input ${errors.title && touched.title && 'border-red-600'}`}
                            placeholder="Ex. abc@gmail.com"
                        />
                        {errors.title && touched.title && <ErrorMsg msg={errors.title} />}
                    </div>
                    <div className="relative w-full mb-3">
                        <label className="block uppercase  text-xs font-bold mb-2"
                            htmlFor="description">Description</label>
                        <ReactQuill
                            // name='description'
                            theme="snow"
                            value={editor}
                            onBlur={handleBlur}
                            onChange={setEditor}
                            modules={modules}
                            formats={formats}
                        />
                        {/* {errors.description && touched.description && <ErrorMsg msg={errors.description} />} */}
                    </div>
                    <div className="relative w-full mb-3">
                        <label className="block uppercase  text-xs font-bold mb-2"
                            htmlFor="description">Tags</label>
                        <Select
                            name='tags'
                            isMulti
                            onChange={e =>
                                setFieldValue('tags', e)
                            }
                            options={tagOptions}
                            value={values.tags}
                            onBlur={handleBlur('inventoryItems')}
                        />
                        {errors.tags && touched.tags && <ErrorMsg msg={errors.tags} />}
                    </div>
                    <div className="text-center mt-6">
                        <button
                            className="bg-mainPurple text-white text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                            type="submit"
                        >
                            Ask Challenge
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AskQuestion