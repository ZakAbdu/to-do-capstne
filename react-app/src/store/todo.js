const GET_ALL_TODOS = 'todo/GET_ALL_TODOS'
const CREATE_TODO = 'todo/CREATE_TODO'
const DELETE_TODO = 'todo/DELETE_TODO'
const CLEAR_TODOS = 'todo/CLEAR_TODOS'

// -----------------------------------------

export const allToDoAction = (todos) => {
    return {
        type: GET_ALL_TODOS,
        todos
    }
}

export const createToDoAction = (newToDo) => {
    return {
        type: CREATE_TODO,
        newToDo
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


export const getAllToDos = (category, city) => async (dispatch) => {

    let url = '/api/to-do/';
    const params = new URLSearchParams();

    if (category) params.append('category', category);
    if (city) params.append('city', city);

    if (params.toString()) {
        url += '?' + params.toString();
    }

    const res = await fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (res.ok) {
        console.log("5: I'm in the right thunk, response ok: ", )
        const todos = await res.json();
        dispatch(allToDoAction(todos));
        return todos;
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
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            const errorData = await res.json()
            return errorData.errors;
        } else {
            return ["An error occurred. Please try again."];
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

const initialState = {};

export const todoReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case CLEAR_TODOS:
            return {
                ...initialState
            };
        case GET_ALL_TODOS:
            newState = { ...state };
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
