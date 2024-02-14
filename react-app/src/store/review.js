const GET_REVIEWS = 'reviews/GET_REVIEWS'
const ADD_REVIEWS = 'reviews/ADD_REVIEWS'
const EDIT_REVIEWS = 'reviews/EDIT_REVIEWS'
const DELETE_REVIEWS = 'reviews/DELETE_REVIEWS'

// ----------------------------------------------------- ACTIONS

export const getReviews = (todo_id, reviews) => {
    return {
        type: GET_REVIEWS,
        todo_id,
        reviews
    }
}

export const addReview = (todo_id, newReview) => {
    return {
        type: ADD_REVIEWS,
        todo_id,
        newReview
    }
}

export const editReview = (todo_id, newReview) => {
    return {
        type: EDIT_REVIEWS,
        todo_id,
        newReview
    }
}

export const deleteReview = (reviewId) => {
    return {
        type: DELETE_REVIEWS,
        reviewId
    }
}

// ----------------------------------------------------------- THUNKS

export const getToDoReviews = (todo_id) => async (dispatch) => {
    const res = await fetch(`/api/to-do/${todo_id}/reviews`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (res.ok) {
        const reviews = await res.json();
        dispatch(getReviews(todo_id, reviews));
        return reviews
    }
}

export const addReviews = (todo_id, rating, comment, review_image) => async (dispatch) => {
    const reviewData = {
        rating, comment, review_image
    }

    const res = await fetch(`/api/to-do/${todo_id}/reviews`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            rating, comment, review_image
        })
    });

    if (res.ok) {
        const review = await res.json();
        dispatch(addReview(todo_id, review));
        return review
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data.errors
        } else {
            return ['An error occured. Please try again.']
        }
    }
}

export const editReviews = (todo_id, reviewId, review) => async (dispatch) => {
    const {
        rating,
        comment,
        review_image
    } = review

    const res = await fetch(`/api/to-do/${todo_id}/reviews/${reviewId}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            rating,
            comment,
            review_image
        })
    });

    if (res.ok) {
        const review = await res.json();
        dispatch(editReview(todo_id, review))
        return review
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data.errors
        } else {
            return ['An error occured. Please try again.']
        }
    }
}


export const deleteReviews = (todo_id, reviewId) => async (dispatch) => {
    const res = await fetch(`/api/to-do/${todo_id}/reviews/${reviewId}`, {
        method: 'DELETE'
    });
    if (res.ok) {
        const deletedReview = await res.json();
        dispatch(deleteReview(reviewId));
        return deletedReview
    }
}

// ----------------------------------------------------------------------- REDUCER

const initialState = {
    todoReviews: {}
}

export default function reviewsReducer(state = initialState, action) {
    let newState
    switch (action.type) {
        case GET_REVIEWS: {
            newState = { ...state }
            newState.todoReviews[action.todo_id] = action.reviews;
            return newState;
        }
        case ADD_REVIEWS: {
            const newState = { ...state }
            newState.todoReviews = { ...state.todoReviews, [action.todo_id]: action.newReview }
            return newState;
        }
        case EDIT_REVIEWS: {
            newState = { ...state }
            newState.todoReviews[action.todo_id] = action.newReview;
            return newState;
        }
        case DELETE_REVIEWS: {
            newState = { ...state }
            delete newState.todoReviews[action.reviewId]
            return newState
        }
        default:
            return state
    }
}