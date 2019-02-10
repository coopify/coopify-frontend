import { user, initialUserState, LOGIN_SUCCESS, LOGIN_FAILURE, LOGIN_ATTEMPT } from './userReducer';
//import { serviceReducers, initialServiceState } from './serviceReducer';

const AppReducers = {
    ...user,
    //...serviceReducers
}

const InitialState = {
    ...initialUserState,
    //...initialServiceState
}

const Actions = {
    LOGIN_SUCCESS,
    LOGIN_ATTEMPT,
    LOGIN_FAILURE
}

export {
    AppReducers,
    InitialState,
    Actions,
    LOGIN_SUCCESS,
    LOGIN_ATTEMPT,
    LOGIN_FAILURE,
    user,
}