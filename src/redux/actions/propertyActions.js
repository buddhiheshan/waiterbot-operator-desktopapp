import { SET_PROPERTY } from '../actionTypes';
import axios from 'axios';

export const getPropertyInfo = () => async dispatch => {
    
    try {
        const response = await axios.get('properties');
        dispatch({
            type: SET_PROPERTY,
            payload: response.data.data
        })

    } catch (e) {
        console.log('somthing bad happned fetching property info')
    }
}
