import { useSlotProps } from "@mui/base";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import { useState } from "react";
// import AsyncSelect from 'react-select/async';

export default function Section(props) {
  const selectKH = (val) => {
    console.log("selectKH: ", val);
    props.onProfile(val);
  };

  const selectBG = (val) => {
    console.log("selectKH: ", val);
  };

  return (
    <section id="team" className="pb-5">
      <div
        className="row justify-content-md-center"
        style={{ marginBottom: "20px" }}
      >
        <div className="col col-lg-2">
          <select
            id="KH"
            className="form-select"
            aria-label="Default select example"
            onChange={(e) => selectKH(e.target.value)}
            // onchange="selectKH()"
          >
            <option value="0">1337-KH</option>
            <option value="1">1st promo</option>
            <option value="2">2nd promo</option>
            <option value="3">3rd promo</option>
            <option value="4">4th promo</option>
            <option value="5">Piscine</option>
          </select>
        </div>
        <div className="col col-lg-2">
          <select
            id="BG"
            className="form-select"
            aria-label="Default select example"
            onChange={(choice) => selectBG(choice.value)}
            // onchange="selectBG()"
          >
            <option value="0">1337-BG</option>
            <option value="1">1st promo</option>
            <option value="2">2nd promo</option>
            <option value="3">Piscine</option>
          </select>
        </div>
      </div>
      <div className="row" id="home_product"></div>
    </section>
  );
}
