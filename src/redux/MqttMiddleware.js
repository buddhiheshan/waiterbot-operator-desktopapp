import { mqttConnectionState } from './actions/mqttActions';
import { editRobotStatus } from './actions/robotActions';
import mqtt from 'mqtt/dist/mqtt';
import { INIT_CONNECTION } from './actionTypes';
import { toastr } from 'react-redux-toastr';
import { editOrderStatus } from './actions/orderActions';

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
            // console.log(topic);
            const tokens = topic.split('/');
            const robotID = tokens[1];
            const robots = store.getState().robots.robots;
            const robot = robots.find(robot => robot._id === robotID);
            // console.log(robot);

            const allOrders = store.getState().orders.orders
            console.log(allOrders);


            if (!robotID) console.log("something went wrong on mqtt message");

            console.log(robotID);

            var msg = message.toString()
            console.log(msg)
            switch (msg) {
                case 'ready': {
                    store.dispatch(editRobotStatus(robotID, "Idle"))
                    toastr.success('Returned to station', `${robot.nickname} returned to station.`);
                    console.log(msg);
                    break;
                }
                case 'obstrucle': {
                    toastr.error('Obstrucle Detected', `${robot.nickname} stopped due to obstrucle.`, { timeOut: 10000 })
                    break;
                }
                case 'stolen': {
                    toastr.error('Food Taken From Tray', `Food item was taken from ${robot.nickname} before reaching the delivery point.`, { timeOut: 10000 })
                    break;
                }
                case 'delivered': {
                    const deliveringOrders = allOrders.delivering;
                    const order = deliveringOrders.orders.find(order => order.robot === robotID);
                    store.dispatch(editOrderStatus(order._id, "Delivered", robotID));
                    toastr.success('Delivered', `${robot.nickname} delivered the food item. Returning to station now.`);
                    break;
                }
                case 'delivering': {
                    const preparingOrders = allOrders.preparing;
                    const order = preparingOrders.orders.find(order => order.robot === robotID);
                    store.dispatch(editOrderStatus(order._id, "Delivering", robotID));
                    store.dispatch(editRobotStatus(robotID, "Busy"));
                    toastr.success('Delivering', `${robot.nickname} is delivering now.`);
                    break;
                }
                case 'empty': {
                    toastr.error('No Food Item On Tray', `Please place the food item on ${robot.nickname} and click deploy again.`);
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