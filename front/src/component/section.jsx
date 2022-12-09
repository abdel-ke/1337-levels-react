// import { useSlotProps } from "@mui/base";
// import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
// import { useEffect } from "react";
// import { useState } from "react";
import { compus } from "./compus";
// import { useEffect } from "react";
// import { useState } from "react";
// import AsyncSelect from 'react-select/async';

export default function Section(props) {
  const select = (val) => {
    console.log("select: ", val);
    props.onProfile(val);
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
            onChange={(e) => select(e.target.value)}
            // onchange="selectKH()"
          >
            {compus.KH.map((option, index) => (
              <option key={index} value={option.value}>
                {option.text}
              </option>
            ))}
            {/* <option value="KH-0">1337-KH</option>
            <option value="KH-1">1st promo</option>
            <option value="KH-2">2nd promo</option>
            <option value="KH-3">3rd promo</option>
            <option value="KH-4">4th promo</option>
            <option value="KH-5">5nd promo</option> */}
          </select>
        </div>
        <div className="col col-lg-2">
          <select
            id="BG"
            className="form-select"
            aria-label="Default select example"
            onChange={(choice) => select(choice.target.value)}
            // onchange="selectBG()"
          >
            {compus.BG.map((option, index) => (
              <option key={index} value={option.value}>
                {option.text}
              </option>
            ))}
            {/* <option value="BG-0">1337-BG</option>
            <option value="BG-1">1st promo</option>
            <option value="BG-2">2nd promo</option>
            <option value="BG-3">3nd promo</option> */}
          </select>
        </div>
        <div className="col col-lg-2">
          <select
            id="MED"
            className="form-select"
            aria-label="Default select example"
            onChange={(choice) => select(choice.target.value)}
            // onchange="selectBG()"
          >
            {compus.MED.map((option, index) => (
              <option key={index} value={option.value}>
                {option.text}
              </option>
            ))}
            {/* <option value="MED-0">1337-MED</option>
            <option value="MED-1">1st promo</option> */}
          </select>
        </div>
      </div>
      <div className="row" id="home_product"></div>
    </section>
  );
}
