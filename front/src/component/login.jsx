import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { saveAs } from 'file-saver'
import { useNavigate } from "react-router-dom";


export default function Login() {
  const [code, setCode] = useState(null);
  const navigate = useNavigate();
  // const access_token = localStorage.getItem('access_token');

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    setCode(queryParams.get("code"));
  }, []);

  // const get_token_from_refresh_token = async () => {
  //   const option = {
  //     method: "POST",
  //     url: `${process.env.REACT_APP_INTRA}/oauth/token`,
  //     data: {
  //       grant_type: "refresh_token",
  //       client_id: `${process.env.REACT_APP_CLIENT_ID}`,
  //       refresh_token: `${localStorage.getItem('refresh_token')}`,
  //     },
  //   };
  //   await axios
  //     .request(option)
  //     .then((data) => {
  //       console.table("refresh token data: ", data.data);
  //       localStorage.setItem("access_token", data.data.access_token);
  //       localStorage.setItem("refresh_token", data.data.refresh_token);
  //       return data.data;
  //     })
  //     .catch((e) => {
  //       console.log("error refreshtoken: ", e)
  //     });
  // }
  // const tokenInfo = async () => {
  //   if (access_token) {
  //     await axios(
  //       `${process.env.REACT_APP_INTRA}/oauth/token/info`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${access_token}`,
  //         },
  //       }
  //     )
  //       .then((data) => {
  //         data = data.data;
  //         console.log("data: ", data);
  //         if (data.expires_in < 60)
  //           console.log("token will be expire soon");
  //         // getToken();
  //         return data;
  //       })
  //       .catch((e) => {
  //         console.log("error tokenInfo");
  //         // getToken();
  //         get_token_from_refresh_token()
  //       });
  //   }
  //   return null;
  // };

  
const getToken = async () => {
  const option = {
    method: "POST",
    url: `${process.env.REACT_APP_INTRA}/oauth/token`,
    data: {
      grant_type: "authorization_code",
      client_id: `${process.env.REACT_APP_CLIENT_ID}`,
      client_secret: `${process.env.REACT_APP_SECRET_ID}`,
      code: code,
      redirect_uri: "http://localhost:3000/login",
    },
  };
  await axios
    .request(option)
    .then((data) => {
      // console.table(data.data);
      localStorage.setItem("access_token", data.data.access_token);
      localStorage.setItem("refresh_token", data.data.refresh_token);
      navigate('/profile');
      return data.data;
    })
    .catch((e) => console.log("error getToken: ", e));
};

  useEffect(() => {
    if (code) {
      console.log("Login useeffect getToken");
      // localStorage.setItem('code', code);
      getToken();
      // navigate('/profile');
    }
    // else if (access_token) {
    //   console.log("useeffect token info");
    //   tokenInfo();
    // }
  }, [code]);

  // const login = () => {
  //   // console.log("test; ", process.env.REACT_APP_TEST);
  //   console.log("login function is empty");
  // };

  // const me = async () => {
  //   const option = {
  //     method: 'get',
  //     url: 'https://api.intra.42.fr/v2/users/abdel-ke',
  //     headers: { 
  //       'Authorization': `Bearer ${localStorage.getItem('access_token')}`, 
  //       // ...data.getHeaders()
  //     },
  //     // data : data
  //   }
  //   await axios.request(option).then((data) => {
  //     console.log("me: ", data.data.image.link);
  //     saveAs(data.data.image.link, `${data.data.image.link}`, './')
  //   }).catch((e) => console.log("error from me: ", e));
  // }
  return (
    <div>
      {/* <button type="submit" onClick={login}> */}
        {/* Login */}
      {/* </button> */}
      {/* <a href="https://api.intra.42.fr/oauth/authorize?client_id=d3ad0daaccaa95ce0a239da9a7064ed6bd9ad5b2ff831a7b8689b94b6b4f8f51&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F&response_type=code"> */}
      <a
        href={`${process.env.REACT_APP_INTRA}/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code`}
      >
        Connect
      </a>
      {/* <button onClick={tokenInfo}>Informations about your token</button>
      <button onClick={me}>Informations about me</button> */}
    </div>
  );
}
