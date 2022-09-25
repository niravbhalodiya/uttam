import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { getSingleChallenge, postSolution } from '../../store/challenge/slice'
import moment from 'moment'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { StacksEditor } from "@stackoverflow/stacks-editor";
// Don’t forget to include the styles as well
import "@stackoverflow/stacks-editor/dist/styles.css";
import "@stackoverflow/stacks";
import "@stackoverflow/stacks/dist/css/stacks.css";

const SingleChallenge = () => {
    const { state } = useLocation()
    const dispatch = useDispatch()
    const { challenge } = useSelector(store => store.challenge)

    // use stats
    const [editor, setEditor] = useState()
    useEffect(() => {

        return () => {

            dispatch(getSingleChallenge(state.key))
        }
    }, [])

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
                {console.log(editor)}
            </div>
        </div>
    )
}

export default SingleChallenge