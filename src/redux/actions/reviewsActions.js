import { SET_REVIEWS, RESET_REVIEWS } from '../actionTypes';
import axios from 'axios'

export const getReviews = (itemID) => async dispatch => {
    try{
        dispatch( {
            type: RESET_REVIEWS,
        })
        const response = await axios.get('items/'+itemID+"/reviews")
        dispatch( {
            type: SET_REVIEWS,
            payload: response.data.data
        })
    } catch(e) {
        console.log('somthing bad happned when fetching reviews')
    }
}