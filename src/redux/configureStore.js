
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
// import logger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducers/index';


export default function configureStore(initialState){
    console.log("Configuring Redux Store");
    return createStore(rootReducer,initialState, composeWithDevTools(applyMiddleware(thunk)))
};