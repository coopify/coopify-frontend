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

export function socialLogInAPICall(payload) {
  return axios.post(
      `${global.API_URL}/api/users/${payload.provider}/login`,
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
          body: response.data
        }
      }).catch((e) => { 
        console.log("signUpAPICall Error: " + JSON.stringify(e) + "  " + e);
        return {
          status: e.response.status,
          data: e.response
      }});
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


export function socialSignUpAPICall(payload) { //TODO ver el endpoint en el backend exchange...
  
  const code = payload;
  
  return axios.post(
      `${global.API_URL}/api/users/${payload.provider}/signup`,
    code).
      then((response) => {
        return {       
          status: response.status,
          body: response.data
        }
      }).catch((e) => {
        console.log("SocialSignUpAPICall Error" + JSON.stringify(e));
        return {
          status: e.response.status,
          data: e.response.data
        }
      });
}

export function profileAPICall(payload){
  const token = payload.userToken;
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  const userId = payload.userId;
  
  const attributes =  payload.attributes;

  return axios.put(
    `${global.API_URL}/api/users/${userId}`, {
        attributes
    }).  
    then((response) => {
      return {       
        status: response.status,
        user: response.data.user
      }
    }).catch((e) => { 
      console.log("signUpAPICall Error: " + JSON.stringify(e) + "  " + e);
      return {
        status: e.response.status,
        errorMessage: e.response.data.message
    }});

}

export function checkBalanceAPICall(payload){
  const token = payload.userToken;
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  const userId = payload.userId;

  return axios.get(
    `${global.API_URL}/api/users/${userId}/balance`, {

    }).  
    then((response) => {
      return {       
        status: response.status,
        balance: response.data.balance
      }
    }).catch((e) => { 
      console.log("checkBalance Error: " + JSON.stringify(e) + "  " + e);
      return {
        status: e.response.status,
        errorMessage: e.response.data.message
    }});
}

export function checkTransactionsAPICall(payload){
  const token = payload.userToken;
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  const userId = payload.userId;
  
  const attributes =  payload.attributes;

  return axios.get(
    `${global.API_URL}/api/users/${userId}/transactions`, {
        attributes
    }).  
    then((response) => {
      return {       
        status: response.status,
        transactions: response.data.transactions
      }
    }).catch((e) => { 
      console.log("checkTransactions Error: " + JSON.stringify(e) + "  " + e);
      return {
        status: e.response.status,
        errorMessage: e.response.data.message
    }});
}

export function checkOffersAPICall(){

  return axios.get(
    `${global.API_URL}/api/offers/`).  
    then((response) => {
      return {       
        status: response.status,
        offers: response.data.offers
      }
    }).catch((e) => { 
      console.log("checkOffers Error: " + JSON.stringify(e) + "  " + e);
      return {
        status: e.response.status,
        errorMessage: e.response.data.message
    }});
}

export function createOfferAPICall(payload){
  const token = payload.userToken;
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  const offer =  payload.offer;

  return axios.post(
    `${global.API_URL}/api/offers/`, offer).  
    then((response) => {
      return {       
        status: response.status,
        message: response.status
      }
    }).catch((e) => { 
      console.log("createOfficeAPICall Error: " + JSON.stringify(e) + "  " + e);
      return {
        status: e.response.status,
        errorMessage: e.response.data.message
    }});
}