import { getFavorites } from "./favorite";

// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";

const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

const removeUser = () => ({
	type: REMOVE_USER,
});

const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
    const res = await fetch('/api/auth/', {
        headers: {'Content-Type': 'application/json'}
    });
    if (res.ok) {
        const data = await res.json();
        if (data.errors) {
            return;
        }
        dispatch(setUser(data))
        dispatch(getFavorites(data.id))
    }
}

export const login = (email, password) => async (dispatch) => {
    const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email, 
            password
        })
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(setUser(data))
        return null;
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data.errors
        }
    }
}

export const logout = () => async (dispatch) => {
    const res = await fetch('/api/auth/logout', {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (res.ok) {
        dispatch(removeUser())
    }
}

export const signUp = (first_name, last_name, email, password) => async (dispatch) => {
    const res = await fetch('/api/auth/signup', {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            first_name,
            last_name,
            email,
            password
        })
    });

    if (res.ok) {
        const data = await res.json()
        dispatch(setUser(data))
        return null
    } else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	}
}  


export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            return {user: action.payload};
        case REMOVE_USER:
            return {user: null}
        default:
            return state;
    }
}