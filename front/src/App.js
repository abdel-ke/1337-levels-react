import axios from "axios";
import { useEffect } from "react";
import "./App.css";
// import Login from './component/login';
// import Profile from './component/profile';
// import Section from './component/section';
import { useNavigate } from "react-router-dom";
// import  { encrypt , decrypt } from 'react-crypt-gsm';
import CryptoJS from "crypto-js";

function App() {
  // const AT = 'access_token';
  // const RT = 'refresh_token';

  // const AT_decrypt = AT;
  // const RT_decrypt = RT;

  // const access_token = CryptoJS.AES.decrypt(localStorage.getItem("access_token"), "AT");
  const genCrypt = (str, key) => {
    const ret = CryptoJS.AES.encrypt(str, key);
    return ret.toString();
  }

  const genDecrypt = (crypted, key) => {
    const ret = CryptoJS.AES.decrypt(crypted, key);
    return ret.toString(CryptoJS.enc.Utf8);
  }
  const getAT = localStorage.getItem("access_token");
  const getRT = localStorage.getItem("refresh_token");
  const access_token = genDecrypt(getAT, "AT");
  const refresh_token = genDecrypt(getRT, "RT");
  // const refresh_token = CryptoJS.AES.decrypt(localStorage.getItem("refresh_token"), "RT");
  const navigate = useNavigate();
  
  const get_token_from_refresh_token = async () => {
    const option = {
      method: "POST",
      url: `${process.env.REACT_APP_INTRA}/oauth/token`,
      data: {
        grant_type: "refresh_token",
        client_id: `${process.env.REACT_APP_CLIENT_ID}`,
        refresh_token: refresh_token,
      },
    };
    await axios
      .request(option)
      .then((data) => {
        console.table("refresh token data: ", data.data);
        localStorage.setItem("access_token", genCrypt(data.data.access_token, "AT"));
        localStorage.setItem("refresh_token", genCrypt(data.data.refresh_token, "RT"));
        navigate("profile");
        // return data.data;
      })
      .catch((e) => {
        console.log("error refreshtoken: ", e);
        navigate("login");
      });
  };

  const tokenInfo = async () => {
    if (access_token) {
      await axios(`${process.env.REACT_APP_INTRA}/oauth/token/info`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          // "Access-Control-Allow-Origin": "*",
          // "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
        },
      })
        .then((data) => {
          data = data.data;
          console.log("data: ", data);
          if (data.expires_in < 60) console.log("token will be expire soon");
          navigate("profile");
          // getToken();
          return data;
        })
        .catch((e) => {
          console.log("error tokenInfo");
          // getToken();
          get_token_from_refresh_token();
        });
    }
    return null;
  };

  useEffect(() => {
    // const AT = "access_token";
    // const test = genCrypt("access_token", "test key");
    // console.log("encrypt: ", test);
    // const dec = genDecrypt(test.toString(), "test key")
    // console.log("decrypt: ", dec);
    // const test = CryptoJS.AES.encrypt("access_token", "test key");
    // console.log("encrypt: ", test.toString());
    // const dec = CryptoJS.AES.decrypt(test.toString(), "test key")
    // console.log("decrypt: ", dec.toString(CryptoJS.enc.Utf8));
    if (access_token) {
      tokenInfo();
    } else {
      navigate("login");
    }
  }, []);

  return (
    <h1>APP</h1>
    // <Section/>
    // <Routes>
    // <Route path="/" element={<Section />}>
    // {/* <Route index element={<App />} /> */}
    // {/* <Route path="/login" element={<Login />} /> */}
    // {/* <Route path="/profile" element={<Profile />} /> */}
    // {/* </Route> */}
    // </Routes>
    // <h1>APP</h1>
    // </BrowserRouter>
  );
}

export default App;
