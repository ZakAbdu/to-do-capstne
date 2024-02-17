const SINGLE_TODO = 'todo/SINGLE_TODO'

export const singleToDoAction = (todo) => ({
    type: SINGLE_TODO,
    todo
})

export const getSingleToDo = (todo_id) => async (dispatch) => {
    const res = await fetch(`/api/to-do/${todo_id}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (res.ok) {
        const todo = await res.json()
        dispatch(singleToDoAction(todo))
        return res;
    }
}

const initialState = {};

const todoDetailsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SINGLE_TODO:
            newState = {...state}
            newState = action.todo.todo
            return newState
        default:
            return state
    }
}

export default todoDetailsReducer