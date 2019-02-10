import { Actions } from '../reducers';

export const attemptLoginAction = (payload) => ({
    type: Actions.LOGIN_ATTEMPT,
    payload
});