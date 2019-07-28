import _ from 'lodash';

export const GET_GOALS_ATTEMPT = 'GET_GOALS_ATTEMPT';
export const GET_GOALS_SUCCESS = 'GET_GOALS_SUCCESS';
export const GET_GOALS_FAILURE = 'GET_GOALS_FAILURE';
export const GET_GOALSUSER_ATTEMPT = 'GET_GOALSUSER_ATTEMPT';
export const GET_GOALSUSER_SUCCESS = 'GET_GOALSUSER_SUCCESS';
export const GET_GOALSUSER_FAILURE = 'GET_GOALSUSER_FAILURE';
export const RESET_ERROR_GOALS = 'RESET_ERROR_GOALS';

export const goal = (state = initialGoalState, action) => {
  switch (action.type) {

    case GET_GOALS_ATTEMPT:
      return _.assignIn({}, state, {
        error: '',
        loading: true,
      });

    case GET_GOALS_FAILURE:
      return _.assignIn({}, state, {
        error: action.errorMessage,
        loading: false,
      });

    case GET_GOALS_SUCCESS:
      return _.assignIn({}, state, {
        error: '',
        goals: action.responseGoals.goals,
        loading: false,
      });

    case GET_GOALSUSER_ATTEMPT:
      return _.assignIn({}, state, {
        error: '',
        loading: true,
      });

    case GET_GOALSUSER_FAILURE:
      return _.assignIn({}, state, {
        error: action.errorMessage,
        loading: false,
      });

    case GET_GOALSUSER_SUCCESS:
      return _.assignIn({}, state, {
        error: '',
        goalsUser: action.responseGoals.goalsUser,
        loading: false,
      });

    case RESET_ERROR_GOALS:
      return _.assignIn({}, state, {
        error: '',
        status: '',
      });

    default:
      return state;
  }
};

export const initialGoalState = {
  goal: {},
};