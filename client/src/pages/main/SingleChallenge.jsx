import moment from 'moment'
import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getSingleChallenge, getSolutions, postComment, postSolution, setChallange } from '../../store/challenge/slice'

import { FaAngleUp } from 'react-icons/fa'
const SingleChallenge = () => {
    const { state } = useLocation()
    const dispatch = useDispatch()
    const { solutions, challenge, status, error, type } = useSelector(store => store.challenge)

    // use stats
    const [editor, setEditor] = useState()
    const [addComment, setAddComment] = useState(false)
    const [userComment, setUserComment] = useState(null)

    useEffect(() => {
        return () => {
            dispatch(getSingleChallenge(state.key))
            dispatch(getSolutions(state.key))
        }
    }, [])

    useEffect(() => {
        if (status === 'loading') {
            // setIsMiniLoading(true)
        } else if (status === 'succeed') {
            if (type === 'POST_SOLUTION') {
                toast.success("Solution submitted.")
                dispatch(setChallange())
                dispatch(getSolutions(state.key))
                setEditor()
            } else if (type === 'POST_COMMENT') {
                toast.success("Comment added.")
                dispatch(setChallange())
                setUserComment(null)
            }
        } else if (status === 'failed') {
            toast.error(error)
        }
        return () => { }
    }, [type, status])


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

    return (
        <div className='p-4 flex flex-col h-full'>
            <div className='mb-6'>
                <h3 className='text-2xl font-semibold'>{challenge?.title}</h3>
                <div className='flex gap-6 mt-2'>
                    <p className='text-xs text-gray-500 font-medium'>Asked <span className='text-mainBlack'>{moment(challenge.createdAt).fromNow()}</span></p>
                    <p className='text-xs text-gray-500 font-medium'>Modify <span className='text-mainBlack'>{moment(challenge.updatedAt).fromNow()}</span></p>
                </div>
            </div>
            <div className=''>
                <p>{challenge?.description}</p>
                <ul className='flex gap-2 text-sm my-2'>
                    {challenge?.tags?.map((tag, index) => {
                        return <li key={index} className='bg-mainPurple/50 px-3 py-1 rounded-md'>{tag}</li>
                    })}
                </ul>
                <div>
                    {addComment ?
                        <>
                            <hr />
                            <div className='flex flex-col'>
                                <textarea
                                    name="comment"
                                    rows="5"
                                    className='border my-4 w-full p-4'
                                    placeholder='Add comment ...'
                                    value={userComment}
                                    onChange={(e) => setUserComment(e.target.value)}
                                    onBlur={(e) => { !e.target.value && setAddComment(false) }}
                                ></textarea>
                                <button
                                    className='bg-green-500/80 px-4 py-2 text-xl font-semibold rounded-md ml-auto inline-block'
                                    onClick={() => dispatch(postComment({
                                        postId: state.key,
                                        description: userComment
                                    }))}
                                >Submit</button>
                            </div>
                        </>
                        : <button
                            className='text-sm capitalize hover:text-mainPurple cursor-pointer'
                            onClick={() => setAddComment(!addComment)}
                        >
                            add comment
                        </button>}
                </div>
                {solutions?.length &&
                    <div>
                        <hr />
                        {solutions.map((solution, index) => {
                            return (
                                <div
                                    key={solution._id}
                                    className='border p-4 m-2 flex divide-x-2 justify-start max-w-3xl w-full group cursor-pointer'>
                                    <div className='flex flex-col gap-2 pr-4 w-8 justify-center items-center shrink-0 select-none'>
                                        <span className='cursor-pointer' onClick={() => incrementCount(index)}>
                                            <FaAngleUp fontSize='25' />
                                        </span>
                                        <span className='text-xl font-semibold'>{solution.upVotes - solution.downVotes ?? 0}</span>
                                        <span className='cursor-pointer' onClick={() => { decrementCount(index) }}>
                                            <FaAngleUp fontSize='25' className='rotate-180' />
                                        </span>
                                    </div>
                                    <div className='pl-4 flex-1 flex flex-col justify-start items-start'>
                                        <span className='text-xs text-gray-400'>Posted by Femil savaliya {moment(solution.updatedAt).fromNow()} ago</span>
                                        <p class="content" className='font-semibold transition-all' dangerouslySetInnerHTML={{ __html: solution.description }}></p>
                                        <div className='mt-auto'>
                                            <div className={`${solution.status === 'pending' ? 'bg-yellow-200' : (solution.status === 'rejected' ? 'bg-red-300' : "bg-green-300")} px-3 py-1 rounded-full capitalize mt-2 inline-block`}>{challenge.status}</div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                }
            </div>
            <div className='mt-auto'>
                <h4 className='text-xl font-medium mb-2'>Your Solution</h4>
                <ReactQuill
                    theme="snow"
                    value={editor}
                    onChange={setEditor}
                    modules={modules}
                    formats={formats}
                />
                <div className='my-2 flex justify-end'>
                    <button
                        className='bg-green-500/80 px-4 py-2 text-xl font-semibold rounded-md ml-auto inline-block'
                        onClick={() => dispatch(postSolution({
                            postId: state.key,
                            description: editor
                        }))}
                    >Submit</button>
                </div>
            </div>
        </div>
    )
}

export default SingleChallenge