import _ from 'lodash';

export const SOCIAL_LOGIN_ATTEMPT = 'SOCIAL_LOGIN_ATTEMPT'
export const LOGIN_ATTEMPT = 'LOGIN_ATTEMPT'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const SIGNUP_ATTEMPT = 'SIGNUP_ATTEMPT'
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE'
export const SOCIAL_SIGNUP_ATTEMPT = 'SOCIAL_SIGNUP_ATTEMPT'
export const SOCIAL_SIGNUP_SUCCESS = 'SOCIAL_SIGNUP_SUCCESS'
export const SOCIAL_SIGNUP_FAILURE = 'SOCIAL_SIGNUP_FAILURE'
export const LOGOUT_ATTEMPT = 'LOGOUT_ATTEMPT'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const PROFILE_ATTEMPT = 'PROFILE_ATTEMPT'
export const PROFILE_SUCCESS = 'PROFILE_SUCCESS'
export const PROFILE_FAILURE = 'PROFILE_FAILURE'
export const LOAD_STATE_ATTEMPT = 'LOAD_STATE_ATTEMPT'
export const LOAD_SUCCESS = 'LOAD_SUCCESS'
export const CHANGE_ATTEMPT = "CHANGE_ATTEMPT"
export const CHANGE_IMAGE_ATTEMPT = "CHANGE_IMAGE_ATTEMPT"

export const user = (state = initialUserState, action) => {
  switch (action.type) {
    
    case LOGIN_SUCCESS:
      return _.assignIn({}, state, {
        loading: false,
        user: action.data.user,
        error: '',
        userDidLog: true
    });
    case LOGIN_ATTEMPT:
      return _.assignIn({}, state, {
        loading: true,
        error: '',
        userDidLog: false
    });
    case SOCIAL_LOGIN_ATTEMPT:
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
        user: action.data.user,
        error: '',
        userDidSignUp: true
      });
    case SIGNUP_ATTEMPT:
      return _.assignIn({}, state, {
        loading: true,
        error: '',
        userDidSignUp: false
    });
    case SOCIAL_SIGNUP_ATTEMPT:
    return _.assignIn({}, state, {
      loading: true,
      error: '',
      userDidSignUp: false
  });
    case SIGNUP_FAILURE:
      return _.assignIn({}, state, {
        loading: false,
        error: action.data.data.message,
        userDidSignUp: false
      });
      case SOCIAL_SIGNUP_FAILURE:
      return _.assignIn({}, state, {
        loading: false,
        error: action.data.message,
        userDidSignUp: false
      });
      case SOCIAL_SIGNUP_SUCCESS:
      return _.assignIn({}, state, {
        loading: false,
        user: action.user.data,
        error: '',
        socialUserDidSignUp: true,
        userDidLog: true
      });

      case LOGOUT_ATTEMPT:
      return _.assignIn({}, state, {
        loading: true,
        userDidSignUp: false,
        userDidLog: true
      });

      case LOGOUT_SUCCESS:
      return _.assignIn({}, state, {
        loading: false,
        userDidSignUp: false,
        userDidLog: false
      });
      case PROFILE_ATTEMPT:
      return _.assignIn({}, state, {
        loading: true,
        error: '',
      });
      case PROFILE_SUCCESS:
      return _.assignIn({}, state, {
        loading: false,
        error: '',
        user: action.user.user
      });
      case PROFILE_FAILURE:
      return _.assignIn({}, state, {
        loading: false,
        error: action.data.message,
      });

      case LOAD_STATE_ATTEMPT:
      return _.assignIn({}, state, {
        loading: true,
        userDidSignUp: false,
        userDidLog: false
      });

      case LOAD_SUCCESS:
      return _.assignIn({}, state, {
        loading: false,
        userDidSignUp: false,
        user: action.cookieData.user,
        userDidLog: action.cookieData.isLogged
      });

      case CHANGE_ATTEMPT:
      return _.assignIn({}, state, {
        loading: false,
        userDidSignUp: false,
        user: {...state.user, 
          name: action.payload.name,
          lastName: action.payload.lastName,
          address : action.payload.address,
          phone : action.payload.phone,
          birthdate : action.payload.birthdate,
          bio : action.payload.bio,
          interests : action.payload.interests
        },

        userDidLog: true
      });

      case CHANGE_IMAGE_ATTEMPT:
      return _.assignIn({}, state, {
        loading: false,
        userDidSignUp: false,
        user: {...state.user, 
          pictureURL: action.payload.url,
        },
        
        userDidLog: true
      });

    default:
      return state
  }
};

export const initialUserState = {
  user: {}
};
