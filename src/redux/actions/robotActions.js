import { SET_ROBOTS, CHANGE_ROBOT_STATE } from '../actionTypes';
import axios from 'axios'

export const getRobots = (propertyID) => async dispatch => {
    try {
        const response = await axios.get('properties/' + propertyID + '/robots')
        dispatch({
            type: SET_ROBOTS,
            payload: response.data.data
        })
    } catch (e) {
        console.log('something bad happned fetching robots')
    }
}

export const editRobotStatus = (robotID, newStatus) => {
    try {
        // !
        // const response = await axios.patch('orders/' + orderId + '?status='+ nextStatus)

        const changedStatus = {
            robotID: robotID,
            newStatus: newStatus
        }

        return {
            type: CHANGE_ROBOT_STATE,
            payload: changedStatus
        }
    } catch (e) {
        console.log('somthing bad changing state')
    }
}
// export const mqttConnectionState = (client, err = null) => {
//     console.log(client)
//     return {
//         type: MQTT_CONNECTED,
//         error: err,
//         client: client,
//     }
// }
