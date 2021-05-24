import { INIT_CONNECTION, MQTT_CONNECTED } from '../actionTypes';

const initialState = {
    client: null,
    err: null,
}

const mqttReducer = (state = initialState, action) => {
    switch (action.type) {
        case INIT_CONNECTION:
            return {
                ...state,
                client: null,
            };
        case MQTT_CONNECTED:
            return {
                ...state,
                err: action.error,
                client: action.client,
            };
        default:
            return state;
    }
}



export default mqttReducer;