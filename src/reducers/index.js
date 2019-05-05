import { user, initialUserState,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_ATTEMPT,
    SIGNUP_ATTEMPT,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE,
    SOCIAL_SIGNUP_ATTEMPT,
    SOCIAL_SIGNUP_FAILURE,
    SOCIAL_SIGNUP_SUCCESS,
    LOGOUT_ATTEMPT,
    LOGOUT_SUCCESS,
    PROFILE_ATTEMPT,
    PROFILE_SUCCESS,
    PROFILE_FAILURE,
    LOAD_STATE_ATTEMPT,
    LOAD_SUCCESS,
    CHANGE_ATTEMPT,
    SOCIAL_LOGIN_ATTEMPT,
    CHANGE_IMAGE_ATTEMPT,
    RESET_ERROR,
    CHECKBALANCE_ATTEMPT,
    CHECKBALANCE_SUCCESS,
    CHECKBALANCE_FAILURE,
    CHECKTRANSACTIONS_ATTEMPT,
    CHECKTRANSACTIONS_SUCCESS,
    CHECKTRANSACTIONS_FAILURE,
    OFFERS_ATTEMPT,
    OFFERS_SUCCESS,
    OFFERS_FAILURE,
    CREATE_OFFER_ATTEMPT,
    CREATE_OFFER_FAILURE,
    CREATE_OFFER_SUCCESS,
    SHOW_OFFER_ATTEMPT,
    SHOW_OFFER_FAILURE,
    SHOW_OFFER_SUCCESS,
    CHANGE_FILTERS_ATTEMPT,
    GET_CATEGORIES_ATTEMPT,
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_FAILURE,
    POST_QUESTION_ATTEMPT,
    POST_QUESTION_SUCCESS,
    POST_QUESTION_FAILURE,
    GET_QUESTION_ANSWER_ATTEMPT,
    GET_QUESTION_ANSWER_SUCCESS,
    GET_QUESTION_ANSWER_FAILURE,
    SEND_QUESTION_REPLY_ATTEMPT,
    SEND_QUESTION_REPLY_SUCCESS,
    SEND_MESSAGE_ATTEMPT,
    SEND_MESSAGE_SUCCESS,
    UPDATE_MESSAGE_ATTEMPT,
    GET_CONVERSATIONS_ATTEMPT,
    GET_CONVERSATIONS_SUCCESS,
    GET_MESSAGES_ATTEMPT,
    GET_MESSAGES_SUCCESS,
    MAKE_PROPOSAL_ATTEMPT,
    MAKE_PROPOSAL_SUCCESS,
    MAKE_PROPOSAL_FAILURE,
    GET_USERS_OFFERS_ATTEMPT,
    GET_USERS_OFFERS_SUCCESS,
    GET_PROPOSALS_ATTEMPT,
    GET_PROPOSALS_SUCCESS,
    GET_PROPOSALS_FAILURE,
    ACCEPT_PROPOSAL_ATTEMPT,
    ACCEPT_PROPOSAL_SUCCESS,
    REJECT_PROPOSAL_ATTEMPT,
    REJECT_PROPOSAL_SUCCESS,
    ATTEMPT_CANCEL_PROPOSAL,
    CANCEL_PROPOSAL_SUCCESS,
    ATTEMPT_DISPLAY_TOAST,

 } from './userReducer';
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
    SOCIAL_LOGIN_ATTEMPT,
    LOGIN_SUCCESS,
    LOGIN_ATTEMPT,
    LOGIN_FAILURE,
    SIGNUP_ATTEMPT,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE,
    SOCIAL_SIGNUP_ATTEMPT,
    SOCIAL_SIGNUP_FAILURE,
    SOCIAL_SIGNUP_SUCCESS,
    LOGOUT_ATTEMPT,
    LOGOUT_SUCCESS,
    PROFILE_ATTEMPT,
    PROFILE_SUCCESS,
    PROFILE_FAILURE,
    LOAD_STATE_ATTEMPT,
    LOAD_SUCCESS,
    CHANGE_ATTEMPT,
    CHANGE_IMAGE_ATTEMPT,
    RESET_ERROR,
    CHECKBALANCE_ATTEMPT,
    CHECKBALANCE_SUCCESS,
    CHECKBALANCE_FAILURE,
    CHECKTRANSACTIONS_ATTEMPT,
    CHECKTRANSACTIONS_SUCCESS,
    CHECKTRANSACTIONS_FAILURE,
    OFFERS_ATTEMPT,
    OFFERS_SUCCESS,
    OFFERS_FAILURE,
    CREATE_OFFER_ATTEMPT,
    CREATE_OFFER_FAILURE,
    CREATE_OFFER_SUCCESS,
    SHOW_OFFER_ATTEMPT,
    SHOW_OFFER_FAILURE,
    SHOW_OFFER_SUCCESS,
    CHANGE_FILTERS_ATTEMPT,
    GET_CATEGORIES_ATTEMPT,
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_FAILURE,
    POST_QUESTION_ATTEMPT,
    POST_QUESTION_SUCCESS,
    POST_QUESTION_FAILURE,
    GET_QUESTION_ANSWER_ATTEMPT,
    GET_QUESTION_ANSWER_SUCCESS,
    GET_QUESTION_ANSWER_FAILURE,
    SEND_QUESTION_REPLY_ATTEMPT,
    SEND_QUESTION_REPLY_SUCCESS,
    SEND_MESSAGE_ATTEMPT,
    SEND_MESSAGE_SUCCESS,
    UPDATE_MESSAGE_ATTEMPT,
    GET_CONVERSATIONS_ATTEMPT,
    GET_CONVERSATIONS_SUCCESS,
    GET_MESSAGES_ATTEMPT,
    GET_MESSAGES_SUCCESS,
    MAKE_PROPOSAL_ATTEMPT,
    MAKE_PROPOSAL_SUCCESS,
    MAKE_PROPOSAL_FAILURE,
    GET_USERS_OFFERS_ATTEMPT,
    GET_USERS_OFFERS_SUCCESS,
    GET_PROPOSALS_ATTEMPT,
    GET_PROPOSALS_SUCCESS,
    GET_PROPOSALS_FAILURE,
    ACCEPT_PROPOSAL_ATTEMPT,
    ACCEPT_PROPOSAL_SUCCESS,
    REJECT_PROPOSAL_ATTEMPT,
    REJECT_PROPOSAL_SUCCESS,
    ATTEMPT_CANCEL_PROPOSAL,
    CANCEL_PROPOSAL_SUCCESS,
    ATTEMPT_DISPLAY_TOAST,
}

export {
    AppReducers,
    InitialState,
    Actions,
    user,
    SOCIAL_LOGIN_ATTEMPT,
    LOGIN_SUCCESS,
    LOGIN_ATTEMPT,
    LOGIN_FAILURE,
    SIGNUP_ATTEMPT,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE,
    SOCIAL_SIGNUP_ATTEMPT,
    SOCIAL_SIGNUP_FAILURE,
    SOCIAL_SIGNUP_SUCCESS,
    LOGOUT_ATTEMPT,
    LOGOUT_SUCCESS,
    PROFILE_ATTEMPT,
    PROFILE_SUCCESS,
    PROFILE_FAILURE,
    LOAD_STATE_ATTEMPT,
    LOAD_SUCCESS,
    CHANGE_ATTEMPT,
    CHANGE_IMAGE_ATTEMPT,
    RESET_ERROR,
    CHECKBALANCE_ATTEMPT,
    CHECKBALANCE_SUCCESS,
    CHECKBALANCE_FAILURE,
    CHECKTRANSACTIONS_ATTEMPT,
    CHECKTRANSACTIONS_SUCCESS,
    CHECKTRANSACTIONS_FAILURE,
    OFFERS_ATTEMPT,
    OFFERS_SUCCESS,
    OFFERS_FAILURE,
    CREATE_OFFER_ATTEMPT,
    CREATE_OFFER_FAILURE,
    CREATE_OFFER_SUCCESS,
    SHOW_OFFER_ATTEMPT,
    SHOW_OFFER_FAILURE,
    SHOW_OFFER_SUCCESS,
    CHANGE_FILTERS_ATTEMPT,
    GET_CATEGORIES_ATTEMPT,
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_FAILURE,
    POST_QUESTION_ATTEMPT,
    POST_QUESTION_SUCCESS,
    POST_QUESTION_FAILURE,
    GET_QUESTION_ANSWER_ATTEMPT,
    GET_QUESTION_ANSWER_SUCCESS,
    GET_QUESTION_ANSWER_FAILURE,
    SEND_QUESTION_REPLY_ATTEMPT,
    SEND_QUESTION_REPLY_SUCCESS,
    SEND_MESSAGE_ATTEMPT,
    SEND_MESSAGE_SUCCESS,
    UPDATE_MESSAGE_ATTEMPT,
    GET_CONVERSATIONS_ATTEMPT,
    GET_CONVERSATIONS_SUCCESS,
    GET_MESSAGES_ATTEMPT,
    GET_MESSAGES_SUCCESS,
    MAKE_PROPOSAL_ATTEMPT,
    MAKE_PROPOSAL_SUCCESS,
    MAKE_PROPOSAL_FAILURE,
    GET_USERS_OFFERS_ATTEMPT,
    GET_USERS_OFFERS_SUCCESS,
    GET_PROPOSALS_ATTEMPT,
    GET_PROPOSALS_SUCCESS,
    GET_PROPOSALS_FAILURE,
    ACCEPT_PROPOSAL_ATTEMPT,
    ACCEPT_PROPOSAL_SUCCESS,
    REJECT_PROPOSAL_ATTEMPT,
    REJECT_PROPOSAL_SUCCESS, 
    ATTEMPT_CANCEL_PROPOSAL,
    CANCEL_PROPOSAL_SUCCESS,
    ATTEMPT_DISPLAY_TOAST,
}