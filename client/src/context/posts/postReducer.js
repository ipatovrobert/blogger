import {
    //POST_POSTS,
    GET_POSTS,
    //GET_PERSONAL_POSTS,
    GET_SINGLE_POST
}from '../types';

export default (state, action) => {
    switch(action.type) {
        case GET_POSTS:
            return {
                ...state, 
                posts: action.payload.data
            }
        case GET_SINGLE_POST:
            return {
                ...state,
                readingPost: action.payload.data
            }
        default: return state;
    }
}