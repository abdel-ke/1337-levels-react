import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import Login from './component/login';
import Profile from './component/profile';
import Section from './component/section';
import { useNavigate, BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  const access_token = localStorage.getItem('access_token');
  const [userExist, setUserExist] = useState(false);
  const navigate = useNavigate();

  const get_token_from_refresh_token = async () => {
    const option = {
      method: "POST",
      url: `${process.env.REACT_APP_INTRA}/oauth/token`,
      data: {
        grant_type: "refresh_token",
        client_id: `${process.env.REACT_APP_CLIENT_ID}`,
        refresh_token: `${localStorage.getItem('refresh_token')}`,
      },
    };
    await axios
      .request(option)
      .then((data) => {
        console.table("refresh token data: ", data.data);
        localStorage.setItem("access_token", data.data.access_token);
        localStorage.setItem("refresh_token", data.data.refresh_token);
        navigate('profile');
        return data.data;
      })
      .catch((e) => {
        console.log("error refreshtoken: ", e)
        navigate('login');
      });
  }

  const tokenInfo = async () => {
    if (access_token) {
      await axios(
        `${process.env.REACT_APP_INTRA}/oauth/token/info`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            // "Access-Control-Allow-Origin": "*",
            // "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
          },
        }
      )
        .then((data) => {
          data = data.data;
          console.log("data: ", data);
          if (data.expires_in < 60)
            console.log("token will be expire soon");
          navigate('profile');
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
    console.log("salam asdi9a2");
    if (access_token) {
      tokenInfo();
      // navigate('profile');
    }
    else {
      navigate('login');
    }
  }, [])

  return (
    <Section/>
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
