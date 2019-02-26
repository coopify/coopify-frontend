import { Actions } from '../reducers';

export const attemptLoginAction = (payload) => ({
    type: Actions.LOGIN_ATTEMPT,
    payload
});

export const attemptSignUpAction = (payload) => ({
    type: Actions.SIGNUP_ATTEMPT,
    payload
});

export const attemptSocialSignUpAction = (payload) => ({
    type: Actions.SOCIAL_SIGNUP_ATTEMPT,
    payload
});

export const attemptLogoutAction = () => ({
    type: Actions.LOGOUT_ATTEMPT
});

export const attemptProfileAction = (payload) => ({
    type: Actions.PROFILE_ATTEMPT,
    payload
});

export const loadState = () => ({
    type: Actions.LOAD_STATE_ATTEMPT
});

export const onChangeProfileInputAction = (payload) => ({
    type: Actions.CHANGE_ATTEMPT,
    payload
});