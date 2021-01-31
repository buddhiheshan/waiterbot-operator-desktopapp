import { SET_ITEMS,SET_SELECTED_ITEM } from '../ActionTypes';
import axios from 'axios'

export const getItems = (propertyID) => async dispatch => {
    console.log(propertyID);
    try {
        const response = await axios.get('properties/' + propertyID + '/items')
        dispatch({
            type: SET_ITEMS,
            payload: response.data.data
        })
    } catch (e) {
        console.log('somthing bad happned fetching items')
    }
}

export const getItemDetail = (itemID) => async dispatch => {

    try {
        dispatch({
            type: SET_SELECTED_ITEM,
            payload: null})
        const response = await axios.get('items/' + itemID)
        console.log(response);
        dispatch({
            type: SET_SELECTED_ITEM,
            payload: response.data.data
        })
    } catch (e) {
        console.log('somthing bad happned fetching item' + itemID)
    }
}
