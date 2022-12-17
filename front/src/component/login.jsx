import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setLocalStorage } from "../helper/data";

export default function Login() {
  const [code, setCode] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    setCode(queryParams.get("code"));
  }, []);

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
        setLocalStorage(data.data.access_token, data.data.refresh_token);
        navigate("/profile");
        return data.data;
      })
      .catch((e) => console.log("error getToken: ", e));
  };

  useEffect(() => {
    if (code) {
      console.log("Login useeffect getToken");
      getToken();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  return (
    <div>
      <a
        href={`${process.env.REACT_APP_INTRA}/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code`}
      >
        Login
      </a>
    </div>
  );
}
