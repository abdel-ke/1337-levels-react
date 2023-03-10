import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./component/login";
import Profile from "./component/profile";
import Sidebar from "./component/sidebar/sidebar";
import { KhFirst, KhSecond, KhThird } from "./pages/khouribga";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  // </React.StrictMode>
  <BrowserRouter>
    <Routes>
      {/* <Route path="/" element={<Section />}> */}
        <Route index element={<App />} />
        <Route path="login" element={<Login />} />
        <Route path="profile" element={<Profile />} />
        <Route path="Sidebar" element={<Sidebar />} />

        <Route path="/Khouribga/1st" exact component={<KhFirst />} />
        <Route path="KhSecond" exact component={<KhSecond />} />
        <Route path="KhThird" exact component={<KhThird />} />
      {/* </Route> */}
    </Routes>
  </BrowserRouter>
  // <BrowserRouter>
  // {/* </BrowserRouter> */}
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// let control = new AbortController();
// let signal = control();
// signal.abort()
// fetch(url, {signal})
