import _ from 'lodash';

export const LOGIN_ATTEMPT = 'LOGIN_ATTEMPT'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const SIGNUP_ATTEMPT = 'SIGNUP_ATTEMPT'
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE'
export const SOCIAL_SIGNUP_ATTEMPT = 'SOCIAL_SIGNUP_ATTEMPT'
export const SOCIAL_SIGNUP_FAILURE = 'SOCIAL_SIGNUP_FAILURE'

export const user = (state = initialUserState, action) => {
  switch (action.type) {
    
    case LOGIN_SUCCESS:
      return _.assignIn({}, state, {
        loading: false,
        user: action.user,
        error: '',
        userDidLog: true
      });
    case LOGIN_ATTEMPT:
      return _.assignIn({}, state, {
        loading: true,
        error: '',
        userDidLog: false
    });
    case LOGIN_FAILURE:
      return _.assignIn({}, state, {
        loading: false,
        error: action.data.data.message,
        userDidLog: false
      });

      case SIGNUP_SUCCESS:
      return _.assignIn({}, state, {
        loading: false,
        user: action.user,
        error: '',
        userDidLog: true
      });
    case SIGNUP_ATTEMPT:
      return _.assignIn({}, state, {
        loading: true,
        error: '',
        userDidLog: false
    });
    case SOCIAL_SIGNUP_ATTEMPT:
    return _.assignIn({}, state, {
      loading: true,
      error: '',
      userDidLog: false
  });
    case SIGNUP_FAILURE:
      return _.assignIn({}, state, {
        loading: false,
        error: action.data.data.message,
        userDidLog: false
      });
      case SOCIAL_SIGNUP_FAILURE:
      return _.assignIn({}, state, {
        loading: false,
        error: action.data.message,
        userDidLog: false
      });

    default:
      return state
  }
};

export const initialUserState = {
  user: {}
};
