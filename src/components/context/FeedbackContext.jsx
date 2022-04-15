import { createContext, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {

    const [feedback, setFeedback] = useState([
        {
            id: 1,
            text: 'This item is from Context',
            rating: 10
        }
    ]);


    // state for the post edit
    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    });

    const deleteFeedback = (id) => {
        if (window.confirm('Are you sure you want to delete?'))
            setFeedback(feedback.filter((item) => item.id !== id))
    }

    const addFeedback = (newFeedback) => {
        newFeedback.id = uuidv4(); // add id to the object
        setFeedback([newFeedback, ...feedback])
    }

    // set item to be updated
    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit: true
        })
    }

    // Update Feedback item

    const updateFeedback = (id, updItem) => {
        setFeedback(feedback.map((item) => item.id === id ? { ...item, ...updItem } : item))
    }

    return (
        <FeedbackContext.Provider value={{
            deleteFeedback,
            addFeedback,
            editFeedback,
            updateFeedback,
            feedbackEdit,
            feedback,
        }}>
            {children}
        </FeedbackContext.Provider>
    )
}

export default FeedbackContext
