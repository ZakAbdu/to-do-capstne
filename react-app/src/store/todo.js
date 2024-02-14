const GET_ALL_TODOS = 'todo/GET_ALL_TODOS'
const GET_USER_TODOS = 'todo/GET_USER_TODOS';
const SINGLE_TODO = 'todo/SINGLE_TODO'
const CREATE_TODO = 'todo/CREATE_TODO'
const EDIT_TODOS = 'todo/EDIT_TODO'
const DELETE_TODO = 'todo/DELETE_TODO'
const CLEAR_TODOS = 'todo/CLEAR_TODOS'

// -----------------------------------------

export const allToDoAction = (todos) => {
    return {
        type: GET_ALL_TODOS,
        todos
    }
}

export const userToDoAction = (todos) => {
    return {
        type: GET_USER_TODOS,
        todos
    }
}

export const singleToDoAction = (todo_id, todo) => {
    return {
        type: SINGLE_TODO,
        todo_id,
        todo
    }
}

export const createToDoAction = (newToDo) => {
    return {
        type: CREATE_TODO,
        newToDo
    }
}

export const editToDoAction = (todo) => {
    return {
        type: SINGLE_TODO,
        todo
    }
}

export const deleteToDoAction = (todo_id) => {
    return {
        type: DELETE_TODO,
        todo_id
    }
}

export const clear = () => ({
    type: CLEAR_TODOS
});


//----------------

export const clearToDos = () => (dispatch) => {
    dispatch(clear());
};


export const getAllToDos = (type, city) => async (dispatch) => {

    const params = new URLSearchParams();

    if (type) params.append('type', type);
    if (city) params.append('city', city);

    if (params.toString()) {
        url += '?' + params.toString();
    }

    const res = await fetch('/api/to-do/', {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (res.ok) {
        const todos = await res.json();
        dispatch(allToDoAction(todos));
        return todos;
    }
}

export const getUserToDos = () => async (dispatch) => {
    const res = await fetch('/api/users/to-do', {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (res.ok) {
        const todos = await res.json()
        dispatch(userToDoAction(todos))
        return todos
    }
}

export const getSingleToDo = (todo_id) => async (dispatch) => {
    const res = await fetch(`/api/to-do/${todo_id}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (res.ok) {
        const todo = await res.json()
        dispatch(singleToDoAction(todo_id, todo))
        return todo;
    }
}

export const addToDo = (todo) => async (dispatch) => {
    const {
        user_id,
        name,
        cover_image,
        email,
        phone_number,
        address,
        city,
        state,
        category
    } = todo;

    const res = await fetch('/api/to-do/', {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            user_id,
            name,
            cover_image,
            email,
            phone_number,
            address,
            city,
            state,
            category
        })
    });

    if (res.ok) {
        const newToDo = await res.json();
        dispatch(createToDoAction(newToDo))
        return newToDo;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            const errorData = await response.json()
            return errorData.errors;
        } else {
            return ["An error occurred. Please try again."];
        }
    }
}

export const editToDo = (todo_id, todo) => async (dispatch) => {
    const {
        name,
        cover_image,
        email,
        phone_number,
        address,
        city,
        state,
        category
    } = todo

    const res = await fetch(`/api/to-do/${todo_id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name,
            cover_image,
            email,
            phone_number,
            address,
            city,
            state,
            category
        })
    });

    if (res.ok) {
        const todo = await res.json()
        dispatch(editToDoAction(todo))
        return todo
    } else if (res.status < 500) {
        const data = await res.json()
        if (data.errors) {
            return data.errors
        } else {
            return ['An error occured. Please try again.']
        }
    }
}

export const deleteToDo = (todo_id) => async (dispatch) => {
    const res = await fetch(`/api/to-do/${todo_id}`, {
        method: "DELETE"
    });
    if (res.ok) {
        const deletedToDo = await res.json()
        dispatch(deleteToDoAction(todo_id));
        return deletedToDo
    }
}

// ---------------------------------------

const initialState = {}

export const todoReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case CLEAR_TODOS:
            return {
                ...initialState
            };
        case GET_ALL_TODOS:
            newState = { ...state }
            action.todos.todos.forEach(todo => {
                newState[todo.id] = todo;
            });
            return newState;
        case CREATE_TODO:
            newState = {
                ...state,
                [action.newToDo.id]: action.newToDo
            };
            return newState;
        case DELETE_TODO:
            newState = {...state}
            delete newState[action.todo_id];
            return newState;
        default:
            return state;
    }
}
