import React from 'react'
import {
    Link
} from 'react-router-dom'
import discoverImg from '../img/discover/discover.png'

const Discover = () => {
    return (
        <div className='discover'>
            <img src={discoverImg} alt='start reading'></img>
            <div>
                <h1 className='discover-heading'>Did you know?</h1>
                <p className='discover-description'>Agatha Christie, the English playwright, author, and novelist suffered from 'dysgraphia' (a disease related to the functioning of the brain that damages the ability of a person to write).
                For this reason she would always dictate her work to another person to write it down for her.
                You can write your own posts for free today, right here
                </p>
                <Link to='/register' className='discover-link'>Register Now</Link>
            </div>
            
        </div>
    )
}

export default Discover
