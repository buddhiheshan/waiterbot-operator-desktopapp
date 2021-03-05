import axios from 'axios'
import { CHANGE_ORDER_STATE, PUSH_ORDER } from '../actionTypes';
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

export const pushOrder = (order) => async dispatch => {
    try{
        dispatch( {
            type: PUSH_ORDER,
            payload: order
        })
    } catch(e) {
        console.log('somthing bad happned when pushing order')
    }
}