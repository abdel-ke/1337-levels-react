import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";

export default function Login() {
  const [code, setCode] = useState();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    setCode(queryParams.get("code"));
  }, []);

  useEffect(() => {
    const getToken = async () => {
      const option = {
        method: "POST",
        url: "https://api.intra.42.fr/oauth/token",
        data: {
          grant_type: "authorization_code",
          client_id:
            "d3ad0daaccaa95ce0a239da9a7064ed6bd9ad5b2ff831a7b8689b94b6b4f8f51",
          client_secret:
            "fde8e538ae07570d4d56907cd2beb18e66b4c83bfa915c0fff14a5ce28c7d8d5",
          code: code,
          redirect_uri: "http://localhost:3000/",
        },
      };
      await axios
        .request(option)
        .then((data) => {
          console.table(data.data);
          return data.data;
        })
        .catch((e) => console.log(e));
    };
    if (code) getToken();
  }, [code]);

  console.log("test; ", process.env);
  const login = () => {
    //   // console.log("test; ", process.env.REACT_APP_TEST);
  };

  return (
    <div>
      <button type="submit" onClick={login}>
        Login
      </button>
      <a href="https://api.intra.42.fr/oauth/authorize?client_id=d3ad0daaccaa95ce0a239da9a7064ed6bd9ad5b2ff831a7b8689b94b6b4f8f51&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F&response_type=code">
        connect
      </a>
      <button onClick={login}>ENV</button>
    </div>
  );
}
