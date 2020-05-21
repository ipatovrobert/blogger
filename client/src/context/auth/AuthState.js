import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
import jwt from 'jsonwebtoken';
import {
    REGISTER_SUCCESS,
    //REGISTER_FAIL,
    //LOGIN_FAIL,
    LOGOUT,
    USER_LOADED,
    AUTH_ERROR,
    RELOAD,
    LOGIN_SUCCESS
} from '../types';


const AuthState = (props) => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: false,
        user: {
            data: {
                name: '',
                email: ''
            }
        }
    }

    const [state, dispatch] = useReducer(authReducer, initialState);
    
    const checkJwt = async () => {
        if (localStorage.getItem('token')) {
            let token = localStorage.getItem('token');
            const decoded = await jwt.decode(token.split(' ')[1], '877jfjgjdgfd79dfg98');
            if(decoded) {
                if(decoded.exp > Date.now() / 1000) {
                    dispatch({
                        type: RELOAD
                    })
                    loadUser();
                } else {
                    dispatch({ type: AUTH_ERROR });
                }
            } else {
                dispatch({ type: AUTH_ERROR });
            }
        } else {
            dispatch({ type: AUTH_ERROR });
        }
    }

    // Loading info about the user that is logged in so we can access data such as personal post and user profile
    const loadUser = async () => {
        setAuthToken(localStorage.token);
        try {
            const res = await axios.get('http://localhost:5001/auth/me');
            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
        } catch (error) {
            dispatch({ type: AUTH_ERROR });
        }
    }

    // Register
    const register = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.post('http://localhost:5001/auth/register', formData, config);

            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })

            loadUser();
        } catch (error) {
            console.log(error);
        }
    }

    const login = async formData => {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.post('http://localhost:5001/auth/login', formData, config);

            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
            loadUser();
        } catch (error) {
            console.log(error);
        }
    }

    const logout = () => dispatch({ type: LOGOUT });

    return (
        <AuthContext.Provider
        value={{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            user: state.user,
            error: state.error,
            loadUser,
            register,
            logout,
            checkJwt,
            login
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;