import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './reducers/index';
import {Provider} from 'react-redux';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import { getToken } from './service/token-service';




axios.interceptors.request.use(request=>{
  request.headers["Authorization"] ="Bearer " +getToken();
  return request
},error=>{
  Promise.reject(error)
})

ReactDOM.render(
<Provider store={store}>
    <App store={store}/>
    </Provider>,
 
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
