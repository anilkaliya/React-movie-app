import authReducer from './auth-reducer'
import {createStore,applyMiddleware }  from 'redux';
import thunkMiddleware from 'redux-thunk'
import {combineReducers} from 'redux'
import {createLogger} from 'redux-logger';
const allReducer=combineReducers({
  userData:authReducer
})
  
  

const loggerMiddleware=createLogger();

export default createStore(allReducer,
  applyMiddleware(thunkMiddleware,loggerMiddleware));