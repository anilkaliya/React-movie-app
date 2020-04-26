const initialState = {
    isLoading: false,
    isError: '',
    registered:false,
    isAuthenticated:false
}

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case 'BEFORE_AUTH':
        return { ...state, 
                isLoading: action.payload.isLoading,
                 isAuthenticated:action.payload.isAuthenticated,
                 registered:action.payload.registered,
                 isError:action.payload.isError
                }
        case 'AFTER_SIGNUP':
            return Object.assign({}, state, 
                { isLoading: action.payload.isLoading,
                registered:action.payload.registered,
                isAuthenticated:action.payload.isAuthenticated,
                isError:action.payload.isError
            })
        case 'AFTER_LOGIN':
            return Object.assign({}, state, 
                {   registered:action.payload.registered,
                   isLoading: action.payload.isLoading,
                    isAuthenticated:action.payload.isAuthenticated,
                    isError:action.payload.isError
                })
        case 'ERROR':
            return Object.assign({}, state, 
                {
                    isLoading: action.payload.isLoading ,
                    isError: action.payload.isError,
                    isAuthenticated:action.payload.isAuthenticated,
                    registered:action.payload.registered
                })
        default:
            return state;
    }
}