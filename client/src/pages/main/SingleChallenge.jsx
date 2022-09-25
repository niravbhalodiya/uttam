import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { getSingleChallenge } from '../../store/challenge/slice'

const SingleChallenge = () => {
    const { state } = useLocation()
    const dispatch = useDispatch()

    useEffect(() => {
        return () => {
            dispatch(getSingleChallenge(state.key))
        }
    }, [])

    return (
        <div>SingleChallenge</div>
    )
}

export default SingleChallenge