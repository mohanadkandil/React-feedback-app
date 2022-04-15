import React, { useState, useContext, useEffect } from 'react';
import FeedbackContext from './context/FeedbackContext';

function RatingSelect({ select, selected }) {

    const { feedbackEdit } = useContext(FeedbackContext);

    useEffect(() => {
        select(feedbackEdit.item.rating)
    }, [feedbackEdit])

    const handleChange = (e) => {
        select(+e.currentTarget.value) // set rating from the FeedbackForm componenet
    }


    return (
        <ul className='rating'>
            {Array.from({ length: 10 }, (_, i) => (
                <li key={`rating-${i + 1}`}>
                    <input
                        type='radio'
                        id={`num${i + 1}`}
                        name='rating'
                        value={i + 1}
                        onChange={handleChange}
                        checked={selected === i + 1}
                    />
                    <label htmlFor={`num${i + 1}`} > {i + 1}</label>
                </li>
            ))}
        </ul >
    )
}

export default RatingSelect