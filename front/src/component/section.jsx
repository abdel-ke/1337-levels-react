import "bootstrap/dist/css/bootstrap.min.css";
import { compus } from "../helper/compus";
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
          >
            {compus.KH.map((option, index) => (
              <option key={index} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
        </div>
        <div className="col col-lg-2">
          <select
            id="BG"
            className="form-select"
            aria-label="Default select example"
            onChange={(choice) => select(choice.target.value)}
          >
            {compus.BG.map((option, index) => (
              <option key={index} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
        </div>
        <div className="col col-lg-2">
          <select
            id="MED"
            className="form-select"
            aria-label="Default select example"
            onChange={(choice) => select(choice.target.value)}
          >
            {compus.MED.map((option, index) => (
              <option key={index} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="row" id="home_product"></div>
    </section>
  );
}
