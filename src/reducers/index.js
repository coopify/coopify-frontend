import { user, initialUserState, LOGIN_SUCCESS, LOGIN_FAILURE, LOGIN_ATTEMPT, SIGNUP_ATTEMPT, SIGNUP_SUCCESS, SIGNUP_FAILURE, SOCIAL_SIGNUP_ATTEMPT, SOCIAL_SIGNUP_FAILURE, LOGOUT_ATTEMPT, LOGOUT_SUCCESS, PROFILE_ATTEMPT, PROFILE_SUCCESS, PROFILE_FAILURE } from './userReducer';
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
    LOGIN_FAILURE,
    SIGNUP_ATTEMPT,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE,
    SOCIAL_SIGNUP_ATTEMPT,
    SOCIAL_SIGNUP_FAILURE,
    LOGOUT_ATTEMPT,
    LOGOUT_SUCCESS,
    PROFILE_ATTEMPT,
    PROFILE_SUCCESS,
    PROFILE_FAILURE,
}

export {
    AppReducers,
    InitialState,
    Actions,
    user,
    LOGIN_SUCCESS,
    LOGIN_ATTEMPT,
    LOGIN_FAILURE,
    SIGNUP_ATTEMPT,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE,
    SOCIAL_SIGNUP_ATTEMPT,
    SOCIAL_SIGNUP_FAILURE,
    LOGOUT_ATTEMPT,
    LOGOUT_SUCCESS,
    PROFILE_ATTEMPT,
    PROFILE_SUCCESS,
    PROFILE_FAILURE,
}