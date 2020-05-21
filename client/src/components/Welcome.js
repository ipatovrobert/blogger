import React, {useRef, useEffect} from 'react'
import {
    Link
} from 'react-router-dom';
import gsap, {TimelineLite} from 'gsap';
import books from '../img/welcome/books.png'
import stair from '../img/welcome/stair.png'

const Welcome = () => {
    const tl = new TimelineLite();
    let button = useRef(null);
    let headings = [];
    let bookImg = useRef(null);
    let stairImg = useRef(null);

    useEffect(
        () => {
            tl.staggerFrom(headings, 0.5, {opacity: 0, delay: 1}, 0.3,);
            gsap.from(button, {opacity: 0, x: 250, delay: 1});
            gsap.from(bookImg, {opacity: 0, x: 250, delay: 1});
            gsap.from(stairImg, {opacity: 0, x: -250, delay: 1});
        },
        //eslint-disable-next-line
        []
    )
    return (
        <div className='welcome'>
            <h1 ref={el => headings.push(el)} className='welcome-heading'>Welcome to Blogger!</h1>
            <h1 ref={el => headings.push(el)} className='welcome-heading'>A blog where everyone can post anything.</h1>
            <h1 ref={el => headings.push(el)} className='welcome-heading'>Enjoy your journey between our blog posts <span role='img' aria-label='smiley face'>🙂</span></h1>
            <Link ref={el => button = el} className='welcome-button' to='/register'>Start expressing yourself today</Link>
            <img className='books' ref={el => bookImg = el} src={books} alt='books'></img>
            <img className='stair' ref={el => stairImg = el} src={stair} alt='stairs'></img>
        </div>
    )
}

export default Welcome
