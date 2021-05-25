import axios from 'axios'
import { CHANGE_ORDER_STATE, PUSH_ORDER, SET_ROBOTID } from '../actionTypes';

export const getOrders = (propertyID, status, actionType) => async dispatch => {

    try {
        const response = await axios.get('properties/' + propertyID + '/orders?status=' + status)
        dispatch({
            type: actionType,
            payload: response.data.data
        })
    } catch (e) {
        console.log('somthing bad happned fetching items')
    }
}

export const editOrderStatus = (orderId, nextStatus, robotID) => async dispatch => {
    try {
        let response;
        if (nextStatus === "Delivering") {
            response = await axios.patch('orders/' + orderId + '?status=' + nextStatus + '&robotId=' + robotID);
        }
        else {
            response = await axios.patch('orders/' + orderId + '?status=' + nextStatus)
        }
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
    try {
        dispatch({
            type: PUSH_ORDER,
            payload: order
        })
    } catch (e) {
        console.log('somthing bad happned when pushing order')
    }
}

export const setRobotToOrder = (orderID, robotID) => async dispatch => {
    // console.log(orderID, robotID);
    try {
        dispatch({
            type: SET_ROBOTID,
            payload: {
                orderID: orderID,
                robotID: robotID
            }
        })
    } catch (e) {
        console.log('somthing bad happned when pushing order')
    }
}