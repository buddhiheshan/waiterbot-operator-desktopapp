import { SET_USER, RESET_USER } from '../ActionTypes';
import axios from 'axios';

export const login = (mobile, password) => async dispatch => {

    const data = {
        "mobile": mobile,
        "password": password
    }

    try {
        const response = await axios.post('auth/operator_login', data);
        localStorage.setItem('firstname', response.data.data.first_name);
        localStorage.setItem('lastname', response.data.data.last_name);
        localStorage.setItem('token', response.data.token);
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;
        dispatch({
            type: SET_USER,
            payload: response.data.token
        })

    } catch (e) {
        alert('Login failed');
        console.log('somthing bad happned with login')
    }
}

export const logout = () => async dispatch => {

    localStorage.removeItem('token');
    dispatch({ type: RESET_USER });
}