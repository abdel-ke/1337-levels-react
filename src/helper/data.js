import CryptoJS from "crypto-js";

const users = {
  firstPromoKH: ["2018-10-02T22:00:00.000Z,2018-10-04T01:32:41.658Z"],
  secondPromoKH: ["2019-03-24T23:00:00.000Z,2019-03-28T00:00:00.000Z"],
  thirdPromoKH: ["2019-10-16T00:00:00.000Z,2019-10-17T00:00:00.000Z"],
  firthPromoKH: ["2021-11-01T00:00:00.000Z,2021-12-01T00:00:00.000Z"],
  fifthPromoKH: [""],
  firstPromoBG: ["2019-10-09T07:37:00.000Z,2019-10-12T00:00:00.000Z"],
  secondPromoBG: ["2021-11-01T08:00:00.000Z,2021-11-10T00:00:00.000Z"],
  thirdPromoBG: [""],
};

export const genCrypt = (crypt, key) => {
  return CryptoJS.AES.encrypt(crypt, key).toString();
}

export const genDecrypt = (crypted, key) => {
  if (!crypted)
    return null;
  const ret = CryptoJS.AES.decrypt(crypted, key);
  return ret.toString(CryptoJS.enc.Utf8);
}

export const setLocalStorage = (access_token, refresh_token) => {
  const ATC = genCrypt(access_token, "AT");
  const RTC = genCrypt(refresh_token, "RT");
  localStorage.setItem("access_token", ATC);
  localStorage.setItem("refresh_token", RTC);
}

export const getLocalStorage = () => {
  return {
    access_token: genDecrypt(localStorage.getItem('access_token'), "AT"),
    refresh_token: genDecrypt(localStorage.getItem('refresh_token'), "RT")
  }
}

export const getData = async () => {
  const axios = require("axios").default;
  const access_token = genDecrypt(localStorage.getItem("access_token"), "AT");
  if (!access_token)
    return null;
  var config = {
    method: "get",
    url: `https://api.intra.42.fr/v2/cursus/21/cursus_users?&filter[campus_id]=${16}&range[begin_at]=${users["thirdPromoKH"]}&page=${1}&per_page=100`,
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };

  return await axios(config)
    .then(function (response) {
      const data = response.data.map((user) => {
        return {
          grade: user.grade,
          level: user.level,
          blackholed_at: user.blackholed_at,
          login: user.user.login,
          usual_full_name: user.user.usual_full_name,
          image: user.user.image.link,
          location: user.user.location,
        };
      });
      return JSON.stringify(data);
    })
    .catch(function (error) {
      console.log("axios error getData", error);
      console.log("axios error getData token: ", access_token);
      return null;
    });
};
