import _ from 'lodash';

export const LOGIN_ATTEMPT = 'LOGIN_ATTEMPT'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

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
        error: action.data.statusText
      });
    default:
      return state
  }
};

export const initialUserState = {
  user: {}
};
