import axios from 'axios';

export function logInAPICall(payload) {
    return axios.post(
        `${global.API_URL}/api/users/login`,
        payload).
        then((response) => {
          return {
            status: response.status,
            data: response.data,
          }
        }).catch((e) => ({
            status: e.response.status,
            data: e.response
        }));
}

export function signUpAPICall(payload) {
  return axios.post(
      `${global.API_URL}/api/users/signup`,
      payload).
      then((response) => {
        return {       
          status: response.status,
          data: response.data.data,
        }
      }).catch((e) => ({
          status: e.response.status,
          data: e.response
      }));
}

export function getUrlSocialAPICall(payload) {
  return axios.get(
      `${global.API_URL}/api/users/${payload}URL`).
      then((response) => {
        return {       
          status: response.status,
          data: response.data.url
        }
      }).catch((e) => ({
        status: response.status,
        data: response.data.data.message
      }));
}