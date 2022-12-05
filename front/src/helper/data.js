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

// export const autorize = async () => {
// try {
//   const axios = require("axios").default;
//   const config = {
//     method: "get",
//     url: "https://api.intra.42.fr/oauth/authorize",
//     headers: {
//       Cookie: "_intra_42_session_production=83efd33c905c519056ff7b44578e1d25",
//     },
//   };
//   return axios(config)
//     .then(function (response) {
//       console.log("autorize: ", JSON.stringify(response.data));
//       return response.data;
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// } catch (e) {
//   console.log("error autorize: ", e);
// }
// };

// export const generateToken = async () => {
//   const axios = require("axios").default;
//   const qs = require("qs");
//   const data = qs.stringify({
//     grant_type: "client_credentials",
//     client_id:
//       "d3ad0daaccaa95ce0a239da9a7064ed6bd9ad5b2ff831a7b8689b94b6b4f8f51",
//     client_secret:
//       "fde8e538ae07570d4d56907cd2beb18e66b4c83bfa915c0fff14a5ce28c7d8d5",
//   });
//   const config = {
//     method: "post",
//     url: "https://api.intra.42.fr/oauth/token",
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//     data: data,
//   };

//   return await axios(config)
//     .then(function (response) {
//       const data = response.data;
//       localStorage.setItem("token", data.access_token);
//     })
//     .catch(function (error) {
//       console.log("axios error generatToken", error);
//     });
// };

// export const checkToken = async () => {
//   try {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       // const ret = await autorize();
//       // console.log("ret autorize: ", ret);
//       // return ;
//       // await generateToken();
//       // return await getData();
//       console.log("token is empty");
//       generateToken();
//       return getData();
//     }
//     const axios = require("axios").default;
//     const config = {
//       method: "get",
//       url: "https://api.intra.42.fr/oauth/token/info",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };
//     // const ret = await axios(config);
//     return await axios(config)
//       .then(function (response) {
//         const data = response.data;
//         if (!data.expires_in_seconds || data.expires_in_seconds < 60) {
//           console.log("time will be expired, generateToken !!");
//           generateToken();
//           return getData();
//         } else return getData();
//       })
//       .catch(function (error) {
//         console.log("axios error checkToken", error);
//         // generateToken();
//         // return getData();
//       });
//   } catch (e) {
//     console.log("error try catch, tokenInfo", e);
//   }
// };

export const getData = async () => {
  const axios = require("axios").default;
  const access_token = localStorage.getItem("access_token");
  var config = {
    method: "get",
    url: `https://api.intra.42.fr/v2/cursus/21/cursus_users?&filter[campus_id]=${16}&range[begin_at]=${users["thirdPromoKH"]}&page=${1}&per_page=100`,
    // url: `/v2/cursus/21/cursus_users?&filter[campus_id]=${16}&range[begin_at]=${users["thirdPromoKH"]}&page=${1}&per_page=100`,
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

        }
      });
      return JSON.stringify(data);
    })
    .catch(function (error) {
      console.log("axios error getData", error);
    });
};
