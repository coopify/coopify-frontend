import { Actions } from '../reducers';

export const attemptLoginAction = (payload) => ({
    type: Actions.LOGIN_ATTEMPT,
    payload
});

export const attemptSignUpAction = (payload) => ({
    type: Actions.SIGNUP_ATTEMPT,
    payload
});
