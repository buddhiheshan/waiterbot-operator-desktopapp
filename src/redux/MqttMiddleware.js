import { mqttConnectionState } from './actions/mqttActions';
import mqtt from 'mqtt/dist/mqtt';
import { INIT_CONNECTION } from './actionTypes';

const MqttMiddleware = store => next => action => {
    if (action.type === INIT_CONNECTION) {

        const client = mqtt.connect('mqtt://localhost:8883');

        client.on('connect', function () {
            console.log('mqtt connected');
            store.dispatch(mqttConnectionState(client));
            client.subscribe('operator/#')
        });

        client.on('error', function (err) {
            console.log(err);
        })

        client.on('message', function (topic, message, packet) {
            var msg = message.toString()
            switch (msg) {
                case 'ready': {
                    console.log(msg);
                    break;
                }
                case 'obstrucle': {
                    console.log(msg);
                    break;
                }
                case 'stolen': {
                    console.log(msg);
                    break;
                }
                case 'delivered': {
                    console.log(msg);
                    break;
                }
                default: {
                    console.log('Unknown mqtt msg : ' + msg);
                    break;
                }
            }
            console.log(packet)
        })
    }

    next(action);
};

export default MqttMiddleware;