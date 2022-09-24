import React, { useState } from 'react'

// icons
import { BsChatRightText } from 'react-icons/bs'
import { FaAngleUp } from 'react-icons/fa'
import { RiShareForwardBoxLine } from 'react-icons/Ri'

const Challenges = () => {

    const [upvoteCountAll, setUpvoteCountAll] = useState({})

    const incrementCount = (id) => {
        let temp = { ...upvoteCountAll }
        temp[id] = (temp[id] || 1) + 1
        setUpvoteCountAll(temp)
    }
    const decrementCount = (id) => {
        let temp = { ...upvoteCountAll }
        temp[id] = (temp[id] || 1) - 1
        temp[id] > 0 && setUpvoteCountAll(temp)
    }

    return (
        <>
            <div className='flex justify-center'>
                <div className='py-4'>
                    {Array(30).fill(0).map((_, index) => {
                        return (
                            <div key={index} className='border p-4 m-2 flex divide-x-2 gap-4 justify-start max-w-3xl'>
                                <div className='flex flex-col gap-2 w-8 justify-center items-center select-none'>
                                    <span className='cursor-pointer' onClick={() => incrementCount(index)}>
                                        <FaAngleUp fontSize='25' />
                                    </span>
                                    <span className='text-xl font-semibold'>{upvoteCountAll[index] ?? 0}</span>
                                    <span className='cursor-pointer' onClick={() => { decrementCount(index) }}>
                                        <FaAngleUp fontSize='25' className='rotate-180' />
                                    </span>
                                </div>
                                <div className='pl-4'>
                                    <span className='text-xs text-gray-400'>Posted by Femil savaliya 15 hour ago</span>
                                    <h3 className='font-semibold'>Just stumbled upon the MDN Django Tutorial, haven't seen it mentioned here before. Is it good? How does it compare to the official Tutorial, and the Vincent books? I see that it has exercises for most sections, which might help to solidify the learning.</h3>
                                    <div className='flex justify-start items-center gap-4 mt-4'>
                                        <span className='cursor-pointer'>
                                            <BsChatRightText fontSize={20} />
                                        </span>
                                        <span className='cursor-pointer'>
                                            <RiShareForwardBoxLine fontSize={20} />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

        </>
    )
}

export default Challenges