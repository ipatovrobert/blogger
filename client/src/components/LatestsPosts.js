import React, {useContext, useEffect} from 'react'
import author from '../img/newBlogs/author.png'
import {
    Link
} from 'react-router-dom'

import PostContext from '../context/posts/postContext';

const LatestsPosts = () => {
    const postContext = useContext(PostContext);
    const { getPosts, posts } = postContext;
    
    const getDate = (date) => {
        const result = new Date(date);
        return result.toDateString();
    }

    //const html = (body) => {
        //return <div dangerouslySetInnerHTML={{__html: body}} />
    //}

    useEffect(() => {
        getPosts();
        
        //eslint-disable-next-line
    }, [])
    
    return (
        <div className='newPosts'>
            <h1 className='newPosts-heading'>Latest thoughts from our family <span role='img' aria-label='kinky face'>😜</span></h1>
            
            <div className='grid'>
            {posts.map(post =>  (
                    <div key={post._id} className='newPosts-post'>
                        <div className='flex mb'>
                            <h2 className='newPosts-post--title'> {post.title}</h2>
                            <p className='newPosts-post--author'>{post.user.name}</p>
                            <img src={author} alt='author of the post'></img>
                        </div>
                        <div className='mb'>
                            <p className='newPosts-post--description'>{post.description}</p>
                        </div>
                        <div className='flex spaceBetween'>
                            <Link className='newPosts-post--link' to={`/post/${post._id}`}>Read more →</Link>
                            <p className='newPosts-post--date'>{getDate(post.date)}</p>
                        </div>
                    </div>
                )
                )}
            </div>

        </div>
    )
}

export default LatestsPosts
