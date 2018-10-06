import { LOGIN, WEBSITES, LOGOUT } from '../actions';

let initialState = {
	isLoggedIn: false,
	websites: []
}

const user = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN:
            return state = {...state, isLoggedIn: true };
        case WEBSITES:
        	return state = {...state, websites: action.payload.data };
        case LOGOUT:
            return state = {...state, isLoggedIn: action.payload };
        default:
            return state;
    }
}

export default user