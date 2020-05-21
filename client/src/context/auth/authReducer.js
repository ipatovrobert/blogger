import {
    //REGISTER_FAIL,
    REGISTER_SUCCESS,
    //LOGIN_FAIL,
    //LOGIN_SUCCESS,
    LOGOUT,
    AUTH_ERROR,
    USER_LOADED,
    RELOAD,
    LOGIN_SUCCESS
} from '../types';

export default (state, action) => {
    switch (action.type) {

        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload
            }

        case AUTH_ERROR:
            localStorage.removeItem('token');
            return {
                ...state,
                isAuthenticated: false
            }
        
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token', `Bearer ${action.payload.token}`);
            return {
                ...state,
                isAuthenticated: true
            }
        case RELOAD:
            return {
                ...state,
                isAuthenticated: true
            }
        
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                user: null,
            };

        default:
            return state;
    }
}