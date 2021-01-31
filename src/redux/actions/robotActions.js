import { SET_ROBOTS } from '../ActionTypes';
import axios from 'axios'

export const getRobots = (propertyID) => async dispatch => {
    try {
        const response = await axios.get('properties/' + propertyID + '/robots')
        dispatch({
            type: SET_ROBOTS,
            payload: response.data.data
        })
    } catch (e) {
        console.log('somthing bad happned fetching robots')
    }
}
