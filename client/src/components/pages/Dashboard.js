import React, { Fragment, useContext, useState } from 'react'
import Footer from '../Footer'
import CKEditor from 'ckeditor4-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import AuthContext from '../../context/auth/authContext'
import PostContext from '../../context/posts/postContext';

const Dashboard = () => {
    const authContext = useContext(AuthContext);
    const { user } = authContext;
    
    const postContext = useContext(PostContext);
    const { postPost } = postContext;

    const [formData, setFormData] = useState({
        title: null,
        tags: [],
        description: null,
        body: null
    })

    const onChange = (e) => {
        setFormData({...formData , [e.target.name]: e.target.value});
    }
    
    const onSubmit = (e) => {
        e.preventDefault();
        postPost(formData);
        alert('Post submitted');
    }
    
    return (
        <Fragment>
                <div className='container dashboard'>
                <h1 className='dashboard-title'>Welcome back, {user.data.name}!</h1>
                <div className='dashboard-info flex-s'>
                    <div>
                        <h2 className='dashboard-info--title'>My account</h2>
                        <h3 className='dashboard-info--titleS'>Name</h3>
                        <p className='dashboard-info--text'>{user.data.name}</p>
                        <h3 className='dashboard-info--titleS'>Email</h3>
                        <p className='dashboard-info--text'>{user.data.email}</p>
                    </div>
                    <div className='minW50'>
                        <form onSubmit={onSubmit}>
                            <h2 className='dashboard-info--title'>Do you feel like writing something? Post a new blog</h2>
                            <h3 className='dashboard-info--titleS'>Title</h3>
                            <input type='text' name='title' onChange={onChange} required></input>
                            <h3 className='dashboard-info--titleS'>Tags separated by comma (ex. food, kitchen, pizza)</h3>
                            <input type='text' name='tags' onChange={onChange} required></input>
                            <h3 className='dashboard-info--titleS'>Short description (will appear on the front page)</h3>
                            <textarea type='text' name='description' onChange={onChange} required></textarea>
                            <CKEditor
                                editor={ ClassicEditor }
                                data="<p>Start typing your first post!</p>"
                                onChange={ ( event ) => {
                                    const data = event.editor.getData();
                                    console.log(data);
                                    setFormData({...formData , body: data});
                                } }
                            />
                            <input name='submit' type='submit'></input>
                        </form>
                    </div>
                </div>
            </div>      
            <Footer />
        </Fragment>
    )
}

export default Dashboard
