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
  
  const header = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
  const attributes =  payload.attributes;

  return axios.put(
    `${global.API_URL}/api/users/${userId}`, {
        headers: header,
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
  
  const header = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };

  return axios.get(
    `${global.API_URL}/api/users/${userId}/balance`, {
        headers: header,

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

      // return {       
      //   status: 200,
      //   balance: "22"
      // }
}

export function checkTransactionsAPICall(payload){
  const token = payload.userToken;
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  const userId = payload.userId;
  
  const header = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
  const attributes =  payload.attributes;

  return axios.get(
    `${global.API_URL}/api/users/${userId}/transactions`, {
        headers: header,
        attributes
    }).  
    then((response) => {
      return {       
        status: response.status,
        transactions: response.transactions
      }
    }).catch((e) => { 
      console.log("checkTransactions Error: " + JSON.stringify(e) + "  " + e);
      return {
        status: e.response.status,
        errorMessage: e.response.data.message
    }});

      // const myObjTransactions =
      //   [{date: "10/3/2019", 
      //   description: "guitar lessons", 
      //   coopies: "5", 
      //   from: "Pepe", 
      //   inOut: "in", 
      //   to: "Nacho"
      //   },
      //   {date: "12/3/2019", 
      //   description: "English lessons", 
      //   coopies: "6", 
      //   from: "Nacho", 
      //   inOut: "out", 
      //   to: "Pepe"}]
      

      // return {       
      //   status: 200,
      //   transactions : myObjTransactions
      // }
}

export function checkOffersAPICall(payload){

  const attributes =  payload.attributes;

  return axios.get(
    `${global.API_URL}/api/offers`, {
        attributes
    }).  
    then((response) => {
      return {       
        status: response.status,
        offers: response.offers
      }
    }).catch((e) => { 
      console.log("checkOffers Error: " + JSON.stringify(e) + "  " + e);
      return {
        status: e.response.status,
        errorMessage: e.response.data.message
    }});

      // const myObjOffers =
      //   [{images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlFfJSqzhbjibr8dBOr2l5l7aj1oVyAJQeDkl8_pITjGc6hEVT-Q"],
      //   title: "Guitar lessons", 
      //   description: "guitar lessons",
      //   stars: "4",
      //   by: "Pepe",
      //   userId: "",
      //   coopies: "5",
      //   },
      //   {images: ["https://pbs.twimg.com/profile_images/3073688423/a4fb9c57d6176a2dee8aac21878d5100.png"],
      //   title: "English lessons", 
      //   description: "English lessons for beginner and advanced, good time layout and good location rgewrgewrgewrgoiuwheoighwoeigjfoqwimefvpqwpeognmbpowindebvokiqwmevoqpebsnvouwnerpobmprsbpwinrovinwqeiojfqwoekjgokw[rohmpwrnbpowivoqnmdvonaodiunvopadsmpbomswrinbosidbnvopianmdpbvwer",
      //   stars: "2",
      //   by: "Juan",
      //   userId: "",
      //   coopies: "4",
      //   }]
      

      // return {       
      //   status: 200,
      //   offers : myObjOffers
      // }
}