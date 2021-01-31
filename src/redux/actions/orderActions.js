import axios from 'axios'
import { CHANGE_ORDER_STATE } from '../ActionTypes';
export const getOrders = (propertyID, status, actionType) => async dispatch => {

    try {
        const response = await axios.get('properties/' + propertyID + '/orders?status='+status)
        dispatch({
            type: actionType,
            payload: response.data.data
        })
    } catch (e) {
        console.log('somthing bad happned fetching items')
    }
}

export const editOrderStatus = (orderId, nextStatus) => async dispatch => {
    try {
        const response = await axios.patch('orders/' + orderId + '?status='+ nextStatus)

        const changedState = {
            item: response.data.data,
            nextState: nextStatus 
        }

        dispatch({
            type: CHANGE_ORDER_STATE,
            payload: changedState
        })
    } catch (e) {
        console.log('somthing bad happned fetching items')
    }
}