import _ from 'lodash';

export const SOCIAL_LOGIN_ATTEMPT = 'SOCIAL_LOGIN_ATTEMPT';
export const LOGIN_ATTEMPT = 'LOGIN_ATTEMPT';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const SIGNUP_ATTEMPT = 'SIGNUP_ATTEMPT';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';
export const SOCIAL_SIGNUP_ATTEMPT = 'SOCIAL_SIGNUP_ATTEMPT';
export const SOCIAL_SIGNUP_SUCCESS = 'SOCIAL_SIGNUP_SUCCESS';
export const SOCIAL_SIGNUP_FAILURE = 'SOCIAL_SIGNUP_FAILURE';
export const LOGOUT_ATTEMPT = 'LOGOUT_ATTEMPT';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const PROFILE_ATTEMPT = 'PROFILE_ATTEMPT';
export const PROFILE_SUCCESS = 'PROFILE_SUCCESS';
export const PROFILE_FAILURE = 'PROFILE_FAILURE';
export const LOAD_STATE_ATTEMPT = 'LOAD_STATE_ATTEMPT';
export const LOAD_SUCCESS = 'LOAD_SUCCESS';
export const CHANGE_ATTEMPT = 'CHANGE_ATTEMPT';
export const CHANGE_IMAGE_ATTEMPT = 'CHANGE_IMAGE_ATTEMPT';
export const RESET_ERROR = 'RESET_ERROR';
export const CHECKBALANCE_ATTEMPT = 'CHECKBALANCE_ATTEMPT';
export const CHECKBALANCE_SUCCESS = 'CHECKBALANCE_SUCCESS';
export const CHECKBALANCE_FAILURE = 'CHECKBALANCE_FAILURE';
export const CHECKTRANSACTIONS_ATTEMPT = 'CHECKTRANSACTIONS_ATTEMPT';
export const CHECKTRANSACTIONS_SUCCESS = 'CHECKTRANSACTIONS_SUCCESS';
export const CHECKTRANSACTIONS_FAILURE = 'CHECKTRANSACTIONS_FAILURE';
export const DISPLAY_TOAST_ATTEMPT = 'DISPLAY_TOAST_ATTEMPT';
export const SYNC_FB_ATTEMPT = 'SYNC_FB_ATTEMPT';
export const SYNC_FB_SUCCESS = 'SYNC_FB_SUCCESS';
export const SYNC_FB_FAILURE = 'SYNC_FB_FAILURE';
export const SEND_REWARD = 'SEND_REWARD';
export const SEND_REF_CODE = 'SEND_REF_CODE';
export const GET_USER_ATTEMPT = 'GET_USER_ATTEMPT';
export const GET_USER_FAILURE = 'GET_USER_FAILURE';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';

export const user = (state = initialUserState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return _.assignIn({}, state, {
        loading: false,
        loggedUser: action.data.user,
        error: '',
        userDidLog: true,
      });
    case LOGIN_ATTEMPT:
      return _.assignIn({}, state, {
        loading: true,
        error: '',
        userDidLog: false,
      });
    case SOCIAL_LOGIN_ATTEMPT:
      return _.assignIn({}, state, {
        loading: true,
        error: '',
        userDidLog: false,
      });
    case LOGIN_FAILURE:
      return _.assignIn({}, state, {
        loading: false,
        error: action.errorMessage,
        userDidLog: false,
      });

    case SIGNUP_SUCCESS:
      return _.assignIn({}, state, {
        loading: false,
        loggedUser: action.user,
        error: '',
        userDidSignUp: true,
        referalCode: '',
      });
    case SIGNUP_ATTEMPT:
      return _.assignIn({}, state, {
        loading: true,
        error: '',
        userDidSignUp: false,
      });
    case SOCIAL_SIGNUP_ATTEMPT:
      return _.assignIn({}, state, {
        loading: true,
        error: '',
        userDidSignUp: false,
      });
    case SIGNUP_FAILURE:
      return _.assignIn({}, state, {
        loading: false,
        error: action.errorMessage,
        userDidSignUp: false,
      });
    case SOCIAL_SIGNUP_FAILURE:
      return _.assignIn({}, state, {
        loading: false,
        error: action.errorMessage,
        userDidSignUp: false,
      });
    case SOCIAL_SIGNUP_SUCCESS:
      return _.assignIn({}, state, {
        loading: false,
        loggedUser: action.user,
        error: '',
        socialUserDidSignUp: true,
        userDidLog: true,
        referalCode: '',
      });

    case LOGOUT_ATTEMPT:
      return _.assignIn({}, state, {
        loading: true,
        userDidSignUp: false,
        userDidLog: true,
      });

    case LOGOUT_SUCCESS:
      return {};

    case PROFILE_ATTEMPT:
      return _.assignIn({}, state, {
        loading: true,
        error: '',
      });
    case PROFILE_SUCCESS:
      return _.assignIn({}, state, {
        loading: false,
        error: '',
        loggedUser: action.user.user,
      });
    case PROFILE_FAILURE:
      return _.assignIn({}, state, {
        loading: false,
        error: action.errorMessage,
      });
    case CHECKBALANCE_ATTEMPT:
      return _.assignIn({}, state, {
        loading: true,
        error: '',
      });
    case CHECKBALANCE_SUCCESS:
      return _.assignIn({}, state, {
        loading: false,
        error: '',
        balance: action.balance,
      });
    case CHECKBALANCE_FAILURE:
      return _.assignIn({}, state, {
        loading: false,
        error: action.errorMessage,
      });
    case CHECKTRANSACTIONS_ATTEMPT:
      return _.assignIn({}, state, {
        loading: true,
        error: '',
      });
    case CHECKTRANSACTIONS_SUCCESS:
      return _.assignIn({}, state, {
        loading: false,
        error: '',
        transactions: action.transactions,
      });
    case CHECKTRANSACTIONS_FAILURE:
      return _.assignIn({}, state, {
        loading: false,
        error: action.errorMessage,
      });
    case LOAD_STATE_ATTEMPT:
      return _.assignIn({}, state, {
        loading: true,
        userDidSignUp: false,
        userDidLog: false,
      });

    case LOAD_SUCCESS:
      return _.assignIn({}, state, {
        loading: false,
        userDidSignUp: false,
        loggedUser: action.cookieData.user,
        userDidLog: action.cookieData.isLogged,
      });

    case CHANGE_ATTEMPT:
      return _.assignIn({}, state, {
        loading: false,
        userDidSignUp: false,
        loggedUser: {
          ...state.loggedUser,
          name: action.payload.name,
          lastName: action.payload.lastName,
          address: action.payload.address,
          phone: action.payload.phone,
          birthdate: action.payload.birthdate,
          bio: action.payload.bio,
          interests: action.payload.interests,
        },

        userDidLog: true,
      });

    case CHANGE_IMAGE_ATTEMPT:
      return _.assignIn({}, state, {
        loading: false,
        userDidSignUp: false,
        loggedUser: {
          ...state.loggedUser,
          pictureURL: action.payload.url,
        },

        userDidLog: true,
      });

    case RESET_ERROR:
      return _.assignIn({}, state, {
        error: '',
        status: '',
        reviewCreated: false,
      });

    case DISPLAY_TOAST_ATTEMPT:
      return _.assignIn({}, state, {
        error: '',
        status: action.payload.status,
      });

    case SYNC_FB_ATTEMPT:
      return _.assignIn({}, state, {
        error: '',
        loading: true,
      });

    case SYNC_FB_FAILURE:
      return _.assignIn({}, state, {
        error: action.errorMessage,
        loading: false,
      });

    case SYNC_FB_SUCCESS:
      return _.assignIn({}, state, {
        error: '',
        loading: false,
        loggedUser: action.user,
      });

    case SEND_REF_CODE:
      return _.assignIn({}, state, {
        error: '',
        referalCode: action.payload.code,
      });

    case GET_USER_ATTEMPT:
      return _.assignIn({}, state, {
        loading: true,
      });

    case GET_USER_SUCCESS:
      return _.assignIn({}, state, {
        profileUser: action.user,
        loading: false,
      });

    case GET_USER_FAILURE:
      return _.assignIn({}, state, {
        error: action.errorMessage,
        loading: false,
      });

    default:
      return state;
  }
};

export const initialUserState = {
  user: {},
};