import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import './index.css';
import App from './App';
import axios from 'axios';
import ReduxToastr from 'react-redux-toastr'

const store = configureStore();

axios.defaults.baseURL = 'http://waiterbot-api.us-east-1.elasticbeanstalk.com/api/';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
axios.defaults.headers.post['Content-Type'] = 'application/json';

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
    <ReduxToastr
      timeOut={6000}
      newestOnTop={false}
      position="bottom-right"
      getState={(state) => state.toastr} // This is the default
      transitionIn="fadeIn"
      transitionOut="fadeOut"
      progressBar
      closeOnToastrClick/>
  </Provider>
  , document.getElementById('root'));