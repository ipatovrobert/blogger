import React, {Fragment, useContext, useEffect} from 'react'
import Footer from '../Footer'
import {useParams} from 'react-router-dom'

import PostContext from '../../context/posts/postContext';

const Post = () => {
    const postContext = useContext(PostContext);
    const { getSinglePost, readingPost } = postContext;

    const id = useParams();

    const getDate = (date) => {
        const result = new Date(date);
        return result.toDateString();
    }
    const html = (body) => {
        return <span dangerouslySetInnerHTML={{__html: body}} />
    }

    useEffect(() => {
        getSinglePost(id.id);
        //eslint-disable-next-line
    }, [])
    return (
        <Fragment>
        <div className='posts container'>
            <h1 className='posts-title'>{readingPost.title}</h1>
            <p className='posts-body'>{html(readingPost.body)}</p>
            <p className='posts-tags'>Tags: {readingPost.tags}</p>
            <p className='posts-date'>{getDate(readingPost.date)}</p>
        </div>
        <Footer />
        </Fragment>
    )
}

export default Post
