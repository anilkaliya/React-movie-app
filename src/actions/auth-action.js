import axios from 'axios';
import {setToken, setExpiry,expireToken,setUserId} from '../service/token-service'

function beforeRequest() {
    return {
        type: 'BEFORE_AUTH',
        payload: {
            isLoading: true,
            registered:false,
            isError:'',
            isAuthenticated:false
        }
    }
}
function afterSignupRequest() {
    return {
        type: 'AFTER_SIGNUP',
        payload: {
            isLoading: false,
            registered:true,
            isAuthenticated:false,
            isError:''
          }
    }
}
function afterLoginRequest(res){
    return{
        type:'AFTER_LOGIN',
        payload:{
            isLoading:false,
            isAuthenticated:true,
            registered:false,
            isError:''
        }
    }
}
function onError(err) {
    return {
        type: 'ERROR',
        payload: {
            isLoading: false,
            registered:false,
            isAuthenticated:false,
            isError: err

        }
    }
}


export function onSignup(email, password) {
    const data = { email, password };
    console.log(email);
    return dispatch => {
        dispatch(beforeRequest());

        axios.post(`/api/users/signup`,data).
            then(res => {
                console.log(res);
                dispatch(afterSignupRequest())
            }).
            catch(err => {
                console.log(err);
                dispatch(onError(err))
            })
           
    }
}

export function onLogin(email, password) {
    const data = { email, password };
    console.log(email);
    return dispatch => {
        dispatch(beforeRequest());
        axios.post(`/api/users/signin`,data).
            then(res => {
                setToken(res.data.token);
                setExpiry(res.data.expiresAt);
                setUserId(res.data.user_id)
                expireToken()
                dispatch(afterLoginRequest(res))
            }).
            catch(err => {
                console.log(err);
                dispatch(onError(err))
            })
           
    }
}