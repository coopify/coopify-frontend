import axios from 'axios';

export function logInAPICall(payload) {
    return axios.post(
        'http://localhost:3001/api/users/login', //GET THE ROUTE FROM A STATIC VAR OR SIMILAR
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
      'http://localhost:3001/api/users/signup', //GET THE ROUTE FROM A STATIC VAR OR SIMILAR
      payload).
      then((response) => {
        console.log(response);
        return {       
          status: response.status,
          data: response.data,
        }
      }).catch((e) => ({
          status: e.response.status,
          data: e.response
      }));
}
