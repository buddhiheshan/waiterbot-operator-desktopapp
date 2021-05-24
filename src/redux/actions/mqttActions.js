import { INIT_CONNECTION, MQTT_CONNECTED } from '../actionTypes'

export const mqttConnectionInit = () => {
    return {
        type: INIT_CONNECTION
    }
}

export const mqttConnectionState = (client, err = null) => {
    console.log(client)
    return {
        type: MQTT_CONNECTED,
        error: err,
        client: client,
    }
}