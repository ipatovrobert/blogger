import React, { useState, Fragment, useContext, useEffect } from 'react'
import Footer from '../Footer';
import AuthContext from '../../context/auth/authContext';
import { Link, useHistory } from 'react-router-dom';

const Register = (props) => {
    const authContext = useContext(AuthContext);
    const { register, isAuthenticated } = authContext;
    const history = useHistory();

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    });

    const onSubmit = async (e) => {
        e.preventDefault();
        await register(user);
        history.push('/');
    }

    const onChange = (e) => {
        setUser({...user ,[e.target.name]: e.target.value});
    }

    useEffect( () => {
        if(isAuthenticated) {
            history.push('/dashboard');
        }
        //eslint-disable-next-line
    }, [])

    return (
        !isAuthenticated ? (<Fragment>
            <div className='container register-page'>
                <h1 className='register-title'>Register</h1>
                <form onSubmit={onSubmit} className='register-form'>
                    <label htmlFor='name' className='register-form-label'>Name</label>
                    <input name='name' type='text' required onChange={onChange} className='register-form-input'/>
                    <label htmlFor='name' className='register-form-label'>Email</label>
                    <input name='email' type='email' required onChange={onChange} className='register-form-input'/>
                    <label htmlFor='name' className='register-form-label'>Password</label>
                    <input name='password' type='password' required onChange={onChange} className='register-form-input'/>
                    <input name='submit' type='submit' className='register-form-submit'/>
                </form>
            </div>
            <Footer />
        </Fragment>) : ( 
            <div className='container'>
                <Link className='register-title register-page' to='/dashboard'>Go to Dashboard</Link>
            </div>
        )
    )
}

export default Register;
