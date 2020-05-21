import React, { useRef, useEffect, useContext, Fragment, useState }  from 'react'
import { 
    //BrowserRouter as Router,
    //Switch,
    //Route,
    Link 
} from 'react-router-dom';
import gsap, { TimelineLite } from 'gsap';

import AuthContext from '../context/auth/authContext';

const Navbar = () => {
    const authContext = useContext(AuthContext);
    const { logout, isAuthenticated, checkJwt, login } = authContext;

    const tl = new TimelineLite();
    let items = [];
    let logo = useRef(null);

    useEffect(
        () => {
            checkJwt();
            tl.staggerFrom(items, 0.5, { opacity: 0, x: -200}, 0.1);
            gsap.from(logo, {opacity: 0, x: 200});
        },
        //eslint-disable-next-line
        [],
    )

    const [test, setTest] = useState({
        display: 'none'
    })
    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    let loghen = useRef(null);

    const onClick = () => {
        if(loghen.style.display === 'none') {
            setTest({
                display: 'block',
                position: 'absolute',
                top: '50px'
            });
        } else if(loghen.style.display === 'block') {
            setTest({
                display: 'none'
            })
        }
    }
    const onChangeLogin = (e) => {
        setUser({...user, [e.target.name]: e.target.value});
    }
    const onSubmit = (e) => {
        e.preventDefault();
        login(user);
    }
    

    return (
        <nav className='navbar'>
            <Link ref={el => logo = el} className='navbar-title' to='/'>Blogger</Link>

            <ul className='navbar-items'>
                <li>
                    <Link ref={el => items.push(el)} className='navbar-items--link' to='/post'>Latest blogs</Link>
                </li>
                <li>
                    <Link ref={el => items.push(el)} className='navbar-items--link' to='/about'>About</Link>
                </li>
                {!isAuthenticated ? (
                    <Fragment>
                        <li>
                            <Link ref={el => items.push(el)} className='navbar-items--link' onClick={onClick} to='/#'>Login</Link>
                            <ul style={test} ref={el => loghen = el}>
                                <li>
                                    <form onSubmit={onSubmit}>
                                        <p className='register-form-label'>Email</p>
                                        <input type='email' name='email' onChange={onChangeLogin}></input>
                                        <p className='register-form-label'>Password</p>
                                        <input type='password' name='password' onChange={onChangeLogin}></input>
                                        <input type='submit' name='submit' className='register-form-submit'></input>
                                    </form>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link ref={el => items.push(el)} className='navbar-items--link register' to='/register'>Register</Link>
                        </li>
                    </Fragment>
                ) : (
                    <Fragment>
                        <li>
                            <Link ref={el => items.push(el)} className='navbar-items--link' to='/dashboard'>Dashboard</Link>
                        </li>
                        <li>
                            <Link ref={el => items.push(el)} className='navbar-items--link register' to='/' onClick={logout}>Logout</Link>
                        </li>
                    </Fragment>
                )}
            </ul>            
        </nav>
    )
}

export default Navbar
