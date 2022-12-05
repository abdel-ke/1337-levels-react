import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import Login from './component/login';
import Profile from './component/profile';
import Section from './component/section';
const { useNavigate } = require("react-router-dom")

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
        return data.data;
      })
      .catch((e) => {
        console.log("error refreshtoken: ", e)
      });
  }

  const tokenInfo = async () => {
    if (access_token) {
      await axios(
        `${process.env.REACT_APP_INTRA}/oauth/token/info`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
        .then((data) => {
          data = data.data;
          console.log("data: ", data);
          if (data.expires_in < 60)
            console.log("token will be expire soon");
          // getToken();
          return data;
        })
        .catch((e) => {
          console.log("error tokenInfo");
          // getToken();
          get_token_from_refresh_token()
        });
    }
    return null;
  };

  useEffect(() => {
    if (access_token) {
      tokenInfo();
      navigate('profile');
    }
    else {
      navigate('login');
    }
  }, [])

  return (
    <div className="App">
      {/* <Section/> */}
      {/* <Login/> */}
      {/* <Profile/> */}
      <h1>APP</h1>
    </div>
  );
}

export default App;
