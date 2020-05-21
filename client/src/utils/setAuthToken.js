import axios from 'axios';
//import jwt from 'jsonwebtoken';

const setAuthToken = async token => {
    if(token) {
        axios.defaults.headers.common['authorization'] = `${token}`;
        //const decoded = await jwt.verify(token.split(' ')[1], '877jfjgjdgfd79dfg98');
        //console.log(decoded.exp >  Date.now() / 1000);
    } else {
        delete axios.defaults.headers.common['authorization'];
    }
}

export default setAuthToken;