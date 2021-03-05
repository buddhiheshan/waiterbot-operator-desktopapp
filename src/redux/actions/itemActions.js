import { SET_ITEMS,SET_SELECTED_ITEM, TOGGLE_ITEM_STATUS } from '../actionTypes';
import axios from 'axios'

export const getItems = (propertyID) => async dispatch => {
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
        dispatch({
            type: SET_SELECTED_ITEM,
            payload: response.data.data
        })
    } catch (e) {
        console.log('somthing bad happned fetching item' + itemID)
    }
}

export const toggleItemStatus = (itemID, availalability) => async dispatch => {

    try {
        const response = await axios.patch('items/' + itemID + '/setAvailability', { "available" : availalability})
        
        const payload = response.data.data.available ? "available" : "sold-out"
        dispatch({
            type: TOGGLE_ITEM_STATUS,
            payload: payload
        })
    } catch (e) {
        console.log('somthing bad happned toggling item status of' + itemID)
    }
}
