import {
  user, initialUserState,
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
  GET_USERS_OFFERS_ATTEMPT,
  GET_USERS_OFFERS_SUCCESS,
  DISPLAY_TOAST_ATTEMPT,
  GET_GOALS_ATTEMPT,
  GET_GOALS_SUCCESS,
  GET_GOALS_FAILURE,
  GET_GOALSUSER_ATTEMPT,
  GET_GOALSUSER_SUCCESS,
  GET_GOALSUSER_FAILURE,
  SYNC_FB_ATTEMPT,
  SYNC_FB_SUCCESS,
  SYNC_FB_FAILURE,
  SEND_REWARD,
  SEND_REF_CODE,
  GET_REVIEWS_ATTEMPT,
  GET_REVIEWS_SUCCESS,
  GET_REVIEWS_FAILURE,
  SEND_REVIEW_ATTEMPT,
  SEND_REVIEW_SUCCESS,
  SEND_REVIEW_FAILURE,
  CAN_REVIEW_ATTEMPT,
  CAN_REVIEW_SUCCESS,
  CAN_REVIEW_FAILURE,
  GET_USER_REVIEWS_ATTEMPT,
  GET_USER_REVIEWS_FAILURE,
  GET_USER_REVIEWS_SUCCESS,
  GET_USER_ATTEMPT,
  GET_USER_FAILURE,
  GET_USER_SUCCESS,
} from './userReducer';

import {
  proposal, initialProposalState,
  MAKE_PROPOSAL_ATTEMPT,
  MAKE_PROPOSAL_SUCCESS,
  MAKE_PROPOSAL_FAILURE,
  GET_PROPOSALS_ATTEMPT,
  GET_PROPOSALS_SUCCESS,
  GET_PROPOSALS_FAILURE,
  ACCEPT_PROPOSAL_ATTEMPT,
  ACCEPT_PROPOSAL_SUCCESS,
  REJECT_PROPOSAL_ATTEMPT,
  REJECT_PROPOSAL_SUCCESS,
  CANCEL_PROPOSAL_ATTEMPT,
  CANCEL_PROPOSAL_SUCCESS,
  GET_CONVERSATION_PROPOSAL_ATTEMPT,
  GET_CONVERSATION_PROPOSAL_SUCCESS,
} from './proposalReducer';
// import { serviceReducers, initialServiceState } from './serviceReducer';

const AppReducers = {
  user,
  proposal,
  // ...serviceReducers
};

const InitialState = {
  ...initialUserState,
  ...initialProposalState,
  // ...initialServiceState
};

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
  CANCEL_PROPOSAL_ATTEMPT,
  CANCEL_PROPOSAL_SUCCESS,
  DISPLAY_TOAST_ATTEMPT,
  GET_CONVERSATION_PROPOSAL_ATTEMPT,
  GET_CONVERSATION_PROPOSAL_SUCCESS,
  GET_GOALS_ATTEMPT,
  GET_GOALS_SUCCESS,
  GET_GOALS_FAILURE,
  GET_GOALSUSER_ATTEMPT,
  GET_GOALSUSER_SUCCESS,
  GET_GOALSUSER_FAILURE,
  SYNC_FB_ATTEMPT,
  SYNC_FB_SUCCESS,
  SYNC_FB_FAILURE,
  SEND_REWARD,
  SEND_REF_CODE,
  GET_REVIEWS_ATTEMPT,
  GET_REVIEWS_SUCCESS,
  GET_REVIEWS_FAILURE,
  SEND_REVIEW_ATTEMPT,
  SEND_REVIEW_SUCCESS,
  SEND_REVIEW_FAILURE,
  CAN_REVIEW_ATTEMPT,
  CAN_REVIEW_SUCCESS,
  CAN_REVIEW_FAILURE,
  GET_USER_REVIEWS_ATTEMPT,
  GET_USER_REVIEWS_FAILURE,
  GET_USER_REVIEWS_SUCCESS,
  GET_USER_ATTEMPT,
  GET_USER_FAILURE,
  GET_USER_SUCCESS,
};

export {
  AppReducers,
  InitialState,
  Actions,
  user,
  proposal,
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
  CANCEL_PROPOSAL_ATTEMPT,
  CANCEL_PROPOSAL_SUCCESS,
  DISPLAY_TOAST_ATTEMPT,
  GET_CONVERSATION_PROPOSAL_ATTEMPT,
  GET_CONVERSATION_PROPOSAL_SUCCESS,
  GET_GOALS_ATTEMPT,
  GET_GOALS_SUCCESS,
  GET_GOALS_FAILURE,
  GET_GOALSUSER_ATTEMPT,
  GET_GOALSUSER_SUCCESS,
  GET_GOALSUSER_FAILURE,
  SYNC_FB_ATTEMPT,
  SYNC_FB_SUCCESS,
  SYNC_FB_FAILURE,
  SEND_REWARD,
  SEND_REF_CODE,
  GET_REVIEWS_ATTEMPT,
  GET_REVIEWS_SUCCESS,
  GET_REVIEWS_FAILURE,
  SEND_REVIEW_ATTEMPT,
  SEND_REVIEW_SUCCESS,
  SEND_REVIEW_FAILURE,
  CAN_REVIEW_ATTEMPT,
  CAN_REVIEW_SUCCESS,
  CAN_REVIEW_FAILURE,
  GET_USER_REVIEWS_ATTEMPT,
  GET_USER_REVIEWS_FAILURE,
  GET_USER_REVIEWS_SUCCESS,
  GET_USER_ATTEMPT,
  GET_USER_FAILURE,
  GET_USER_SUCCESS,
};
