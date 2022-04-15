import React, { useState, useContext, useEffect } from 'react';
import RatingSelect from './RatingSelect';
import Button from './shared/Button';
import Card from './shared/Card';

import FeedbackContext from './context/FeedbackContext';

function FeedbackForm() {

    const { addFeedback, feedbackEdit, updateFeedback } = useContext(FeedbackContext);

    const [text, setText] = useState('');
    const [rating, setRating] = useState('');
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (feedbackEdit.edit === true) {
            setBtnDisabled(false);
            setText(feedbackEdit.item.text)
            setRating(feedbackEdit.item.rating)
        }


    }, [feedbackEdit])

    const handleTextChange = (e) => {
        // initial state of the text and button in the form
        if (text === '') {
            setBtnDisabled(true)
            setMessage(null)
        } else if (text !== '' && text.trim().length <= 10) {
            setBtnDisabled(true)
            setMessage('Text mus be at least 10 chars')
        } else {
            setMessage(null)
            setBtnDisabled(false)
        }
        setText(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Check again for the text
        if (text.trim().length > 10) {
            const newFeedback = {
                text,
                rating
            }
            if (feedbackEdit.edit === true) {
                updateFeedback(feedbackEdit.item.id, newFeedback);
            } else {
                addFeedback(newFeedback);
            }
            setText('');
        }
    }

    return (
        <Card>
            <form onSubmit={handleSubmit}>
                <h2>How would you rate your service with us?</h2>
                <RatingSelect select={setRating} selected={rating} />
                <div className="input-group">
                    <input
                        onChange={handleTextChange}
                        type="text"
                        placeholder='Write a review'
                        value={text}
                    />
                    <Button
                        type="submit"
                        version="secondary"
                        isDisabled={btnDisabled}
                    >
                        Send
                    </Button>
                </div>
                {message && <div className='message'>{message}</div>}
            </form>
        </Card>
    )
}

export default FeedbackForm