
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
// import logger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducers/index';
import MqttMiddleware from './MqttMiddleware';

export default function configureStore(initialState){
    return createStore(rootReducer,initialState, composeWithDevTools(applyMiddleware(thunk,MqttMiddleware)))
};