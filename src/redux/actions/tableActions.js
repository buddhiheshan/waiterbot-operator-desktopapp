import { SET_TABLES } from '../actionTypes';
import axios from 'axios'

export const getTables = (propertyID) => async dispatch => {
    try {
        const response = await axios.get('properties/' + propertyID + '/tables')
        dispatch({
            type: SET_TABLES,
            payload: response.data.data
        })
    } catch (e) {
        console.log('somthing bad happned fetching tables')
    }
}

