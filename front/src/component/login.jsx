import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";

export default function Login() {
  const [code, setCode] = useState();
  const [refreshToekn, setRefreshToekn] = useState();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    setCode(queryParams.get("code"));
  }, []);

  useEffect(() => {
    const getToken = async () => {
      const option = {
        method: "POST",
        url: `${process.env.REACT_APP_INTRA}/oauth/token`,
        data: {
          grant_type: "authorization_code",
          client_id: `${process.env.REACT_APP_CLIENT_ID}`,
          client_secret: `${process.env.REACT_APP_SECRET_ID}`,
          code: code,
          redirect_uri: "http://localhost:3000/",
        },
      };
      await axios
        .request(option)
        .then((data) => {
          console.table(data.data);
          localStorage.setItem("access_token", data.data.access_token);
          setRefreshToekn(data.data.refresh_token);
          return data.data;
        })
        .catch((e) => console.log(e));
    };
    if (code) getToken();
  }, [code]);

  const login = () => {
    //   // console.log("test; ", process.env.REACT_APP_TEST);
    console.log("login function is empty");
  };

  const tokenInfo = async () => {
    const info = await axios(
      `${process.env.REACT_APP_INTRA}/oauth/token/info`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    )
      .then((data) => {
        console.log("data: ", data.data);
        // setRefreshToekn(data.data.refresh_token);
        return data.data;
      })
      .catch((e) => {
        console.log(e);
      });
    console.table(info);
  };

  return (
    <div>
      <button type="submit" onClick={login}>
        Login
      </button>
      {/* <a href="https://api.intra.42.fr/oauth/authorize?client_id=d3ad0daaccaa95ce0a239da9a7064ed6bd9ad5b2ff831a7b8689b94b6b4f8f51&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F&response_type=code"> */}
      <a
        href={`${process.env.REACT_APP_INTRA}/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code`}
      >
        Connect
      </a>
      <button onClick={tokenInfo}>Informations about your token</button>
    </div>
  );
}
