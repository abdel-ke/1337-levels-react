import React, { useEffect, useState } from "react";

import { checkToken, getData } from "../helper/data";
import Moment from "moment";

import "bootstrap/dist/css/bootstrap.min.css";

export default function Profile() {
  const [users, setUsers] = useState();
  const [search, setSearch] = useState("");
  const [data, setData] = useState();
  useEffect(() => {
    // console.log("checkInfo");
    const waitingData = async () => {
      let data = await getData();
      if (data) {
        data = JSON.parse(data);
        console.log("Profile data:  ", data);
        data = data.sort((lvl, lvl2) => lvl2.level - lvl.level);
        setUsers(data);
        setData(data);
      }
      // const data = await fetch("./users.json");
      // let resp = await data.json();
      // if (data) {
      //   resp = resp.sort((lvl, lvl2) => lvl2.level - lvl.level);
      //   setUsers(resp);
      //   setData(resp);
      // }
      // if (data) setUsers(JSON.parse(data));
    };
    waitingData();
  }, []);

  useEffect(() => {
    let filterData = data;
    setUsers(
      filterData?.filter((item) => item.login.includes(search))
    );
  }, [data, search]);

  const printName = (elm) => {
    if (elm.grade === "Learner") return `${elm.login}`;
    else return `${elm.login}`;
  };

  const printLvl = (elm) => {
    if (elm.grade === "Learner") return `${elm.level.toFixed(2)}`;
    // else return `${elm.user.login}`;
  };

  function color(elm, data) {
    if (elm.grade === "Learner") {
      if (data >= 42) return `card-title`;
      else if (data >= 15) return `card-title-yellow`;
      else if (data <= 0) return `card-title-BH`;
      else return `card-title-red`;
    } else return `card-title`;
  }

  function countDays(elem, data) {
    if (elem.grade === "Learner") {
      if (data >= 2) return `${data} days`;
      else if (data === 1 || data === 0) return `${data} day`;
      else return `BH`;
    } else return elem.level.toFixed(2);
  }

  function profile(elm) {
    return elm.location == null ? "Unavailable" : elm.location;
  }

  return (
    <div className="row" id="home_product">
      <input
        type="text"
        placeholder="Search"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      {users?.map((elm, index) => {
        const currentDate = Moment();
        const blackHoleDate = Moment(elm.blackholed_at);
        const diffr = blackHoleDate.diff(currentDate, "days");
        return (
          <div
            className="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2"
            key={index}
          >
            <div className="image-flip">
              <div className="mainflip flip-0">
                <div className="frontside">
                  <div className="card">
                    <div className="card-body text-center">
                      <div
                        style={{
                          width: "120px",
                          height: "120px",
                          marginLeft: "auto",
                          marginRight: "auto",
                        }}
                      >
                        <img
                          className=" img-fluid"
                          src={elm.image}
                          alt="card face"
                          style={{ width: "100%", objectFit: "cover" }}
                        />
                      </div>
                      <h5 className="card-text">{printName(elm)}</h5>
                      <h5 className="card-text">{printLvl(elm)}</h5>
                      <h4 className={color(elm, diffr)}>
                        {countDays(elm, diffr)}
                      </h4>
                      <a
                        rel="noreferrer"
                        href={`https://profile.intra.42.fr/users/${elm.login}`}
                        target="_blank"
                        className="btn btn-primary btn-sm"
                      >
                        {profile(elm)}
                      </a>
                      <h5 style={{ marginTop: "10px", marginBottom: "0px" }}>
                        {index + 1}
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
    // <h1>PROFILE</h1>
  );
}
