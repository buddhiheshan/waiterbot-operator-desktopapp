import { SET_PROPERTY } from '../ActionTypes';
import axios from 'axios';

export const getPropertyInfo = () => async dispatch => {
    console.log("dispationg get property")
    
    try {
        const response = await axios.get('properties');
        console.log(response);
        dispatch({
            type: SET_PROPERTY,
            payload: response.data.data
        })

    } catch (e) {
        console.log('somthing bad happned fetching property info')
    }
}
