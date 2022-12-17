import axios from 'axios';
import { useEffect } from 'react';
import './App.css';
import { getLocalStorage, setLocalStorage } from './helper/data';
const { useNavigate } = require("react-router-dom")

function App() {
  const {access_token, refresh_token } = getLocalStorage();
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
        setLocalStorage(data.data.access_token, data.data.refresh_token);
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
          return data;
        })
        .catch((e) => {
          console.log("error tokenInfo");
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="App">
      <h1>APP</h1>
    </div>
  );
}

export default App;
