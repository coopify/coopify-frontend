import _ from 'lodash';

export const LOGIN_ATTEMPT = 'LOGIN_ATTEMPT'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const SIGNUP_ATTEMPT = 'SIGNUP_ATTEMPT'
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE'

export const user = (state = initialUserState, action) => {
  switch (action.type) {

    case LOGIN_SUCCESS:
      return _.assignIn({}, state, {
        loading: false,
        user: action.data.user,
      });
    case LOGIN_ATTEMPT:
      return _.assignIn({}, state, {
        loading: true,
    });
    case LOGIN_FAILURE:
      return _.assignIn({}, state, {
        loading: false,
        error: action.data.message
      });

      case SIGNUP_SUCCESS:
      return _.assignIn({}, state, {
        loading: false,
        user: action.data.user,
      });
    case SIGNUP_ATTEMPT:
      return _.assignIn({}, state, {
        loading: true,
    });
    case SIGNUP_FAILURE:
      return _.assignIn({}, state, {
        loading: false,
        error: action.data.message
      });

    default:
      return state
  }
};

export const initialUserState = {
  user: {}
};
