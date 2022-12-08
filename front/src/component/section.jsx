import "bootstrap/dist/css/bootstrap.min.css";

export default function Section() {
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
