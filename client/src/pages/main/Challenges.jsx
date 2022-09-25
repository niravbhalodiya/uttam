import React, { useState } from 'react'
import { useEffect } from 'react'
import moment from 'moment'
// icons
import { BsChatRightText } from 'react-icons/bs'
import { FaAngleUp } from 'react-icons/fa'
import { RiShareForwardBoxLine } from 'react-icons/Ri'
import { useDispatch, useSelector } from 'react-redux'
import { getAllChallenges } from '../../store/challenge/slice'
import { Link } from 'react-router-dom'

const Challenges = () => {
    const dispatch = useDispatch()
    const { type, error, status, allChallenges } = useSelector(store => store.challenge)

    const [upvoteCountAll, setUpvoteCountAll] = useState({})

    const incrementCount = (id) => {
        let temp = { ...upvoteCountAll }
        temp[id] = (temp[id] || 0) + 1
        setUpvoteCountAll(temp)
    }
    const decrementCount = (id) => {
        let temp = { ...upvoteCountAll }
        temp[id] = (temp[id] || 1) - 1
        setUpvoteCountAll(temp)
    }

    useEffect(() => {
        return () => {
            dispatch(getAllChallenges())
        }
    }, [])


    return (
        <>
            <div className='flex flex-col flex-1 p-4 h-full justify-start '>
                <div className='flex justify-between items-center mb-8'>
                    <h2 className='font-bold text-2xl'>All challenges</h2>
                    <Link to={'/challenges/ask'} className='bg-mainPurple px-3 py-2 text-white rounded-md'>Ask Challenge</Link>
                </div>
                {allChallenges.map((challenge, index) => {
                    return (
                        <Link
                            key={challenge._id}
                            to={`/challenges/${challenge._id}`}
                            state={{ key: challenge._id }}
                            className='border p-4 mb-4 flex divide-x-2 justify-start max-w-3xl w-full group cursor-pointer'>
                            <div className='flex flex-col gap-2 pr-4 w-8 justify-center items-center shrink-0 select-none'>
                                <span className='cursor-pointer' onClick={() => incrementCount(index)}>
                                    <FaAngleUp fontSize='25' />
                                </span>
                                <span className='text-xl font-semibold'>{challenge.upVotes - challenge.downVotes ?? 0}</span>
                                <span className='cursor-pointer' onClick={() => { decrementCount(index) }}>
                                    <FaAngleUp fontSize='25' className='rotate-180' />
                                </span>
                            </div>
                            <div className='pl-4 flex-1'>
                                <span className='text-xs text-gray-400'>Posted by Femil savaliya {moment(challenge.updatedAt).fromNow()} ago</span>
                                <h3 className='font-semibold group-hover:text-mainPurple/80 transition-all'>{challenge.title}</h3>
                                <div className='flex justify-between items-center mt-4 w-full'>
                                    <div className='flex justify-start items-center gap-4'>
                                        <span className='cursor-pointer'>
                                            <BsChatRightText fontSize={20} />
                                        </span>
                                        <span className='cursor-pointer'>
                                            <RiShareForwardBoxLine fontSize={20} />
                                        </span>
                                    </div>
                                    <div className={`${challenge.status === 'pending' ? 'bg-yellow-200' : (challenge.status === 'rejected' ? 'bg-red-300' : "bg-green-300")} px-3 py-1 rounded-full capitalize`}>{challenge.status}</div>
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>

        </>
    )
}

export default Challenges