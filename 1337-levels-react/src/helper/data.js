const times = {
  firstPromoKH: [],
  secondPromoKH: [],
  thirdPromoKH: [],
  forthPromoKH: [],
  firstPromoBG: [],
  secondPromoBG: [],
  thirdPromoBG: [],
  firstPromoMED: [],
}

export const generateToken = () => {
  const axios = require("axios").default;
  const qs = require("qs");
  const data = qs.stringify({
    grant_type: "client_credentials",
    client_id:
      "d3ad0daaccaa95ce0a239da9a7064ed6bd9ad5b2ff831a7b8689b94b6b4f8f51",
    client_secret:
      "0449740c09416d8bbdf4877f44365a0ef650b8553e4d5c1024b7dafa0cd91b09",
  });
  const config = {
    method: "post",
    url: "https://api.intra.42.fr/oauth/token",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      const data = response.data;
      localStorage.setItem("token", data.access_token);
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const checkToken = () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("token is empty")
      generateToken();
      return getData();
    }
    const axios = require("axios").default;
    const config = {
      method: "get",
      url: "https://api.intra.42.fr/oauth/token/info",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios(config)
      .then(function (response) {
        const data = response.data;
        if (!data.expires_in_seconds || data.expires_in_seconds < 60) {
          console.log("time will be expired, generateToken !!");
          generateToken();
          return getData();
        } else return getData();
      })
      .catch(function (error) {
        console.log(error);
      });
  } catch (e) {
    console.log("error try catch, tokenInfo", e);
  }
};

const getData = () => {
  const axios = require("axios").default;
  const token = localStorage.getItem("token");
  var config = {
    method: "get",
    url: "https://api.intra.42.fr/v2/users/abdel-ke",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      return JSON.stringify(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};

// const printEnv = (process) => {
//   // console.log()
// }