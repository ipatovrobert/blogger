import React, {useReducer} from 'react';
import axios from 'axios';
import PostContext from './postContext';
import PostReducer from './postReducer';
import {
    //POST_POSTS,
    GET_POSTS,
    //GET_PERSONAL_POSTS,
    GET_SINGLE_POST
} from '../types';

const PostState = (props) => {
    const initialState = {
        posts: [],
        personalPosts: null,
        readingPost: {
            title: 'Loading...',
            date: 'Loading...',
            tags: 'Loading...',
            description: 'Loading...',
            body: 'Loading...'
        }
    }

    const [state, dispatch] = useReducer(PostReducer, initialState);

    //GET ALL POSTS
    const getPosts = async () => {
        const res = await axios.get('http://localhost:5001/posts');

        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
    }
    //Post a new post
    const postPost = async (formData) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('http://localhost:5001/posts', formData, config);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }
    //Get single post that
    const getSinglePost = async (id) => {
        try {
            const res = await axios.get(`http://localhost:5001/posts/${id}`);

            dispatch({
                type: GET_SINGLE_POST,
                payload: res.data
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <PostContext.Provider
        value={{
            posts: state.posts,
            personalPosts: state.personalPosts,
            readingPost: state.readingPost,
            getPosts,
            postPost,
            getSinglePost
        }}>
            {props.children}
        </PostContext.Provider>
    )
}

export default PostState;