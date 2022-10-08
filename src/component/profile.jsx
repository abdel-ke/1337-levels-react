import React, { useEffect, useState } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
} from "mdb-react-ui-kit";

import { generateToken, checkToken } from "../helper/data";

export default function Profile() {
  const [data, setData] = useState(null)
  const [first, setFirst] = useState(true)
  // state = {
  //   data: {}
  // };
  let cp = 0;
  useEffect(() => {
    // console.log("setData", JSON.parse(checkToken()));
    // checkToken();
    console.log("3iiiw", cp++, "first: ", first);
    // setData(JSON.parse(checkToken()));
  }, [first])

  useEffect(() => {
    console.log("hana", cp++, " first: ", first);
    setFirst(false);
  }, []);


  // useEffect(() => {
    // setData(JSON.parse(checkToken()));
    // console.log("data: ", data);
  // }, [data])

  if (data)
  return (
    <div className="vh-100" style={{ backgroundColor: "#9de2ff" }}>
      <MDBContainer>
        <MDBRow className="justify-content-center">
          <MDBCol md="9" lg="7" xl="5" className="mt-5">
            <MDBCard style={{ borderRadius: "15px" }}>
              <MDBCardBody className="p-4">
                <div className="d-flex text-black">
                  <div className="flex-shrink-0">
                    <MDBCardImage
                      style={{ width: "180px", borderRadius: "10px" }}
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                      alt="Generic placeholder image"
                      fluid
                    />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <MDBCardTitle>{data.name}</MDBCardTitle>
                    <MDBCardText>Senior Journalist</MDBCardText>

                    <div
                      className="d-flex justify-content-start rounded-3 p-2 mb-2"
                      style={{ backgroundColor: "#efefef" }}
                    >
                      <div>
                        <p className="small text-muted mb-1">Articles</p>
                        <p className="mb-0">41</p>
                      </div>
                      <div className="px-3">
                        <p className="small text-muted mb-1">Followers</p>
                        <p className="mb-0">976</p>
                      </div>
                      <div>
                        <p className="small text-muted mb-1">Rating</p>
                        <p className="mb-0">8.5</p>
                      </div>
                    </div>
                    <div className="d-flex pt-1">
                      <MDBBtn
                        onClick={generateToken}
                        outline
                        className="me-1 flex-grow-1"
                      >
                        Chat
                      </MDBBtn>
                      <MDBBtn onClick={checkToken} className="flex-grow-1">
                        Follow
                      </MDBBtn>
                    </div>
                  </div>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
  return <h1>WAITING</h1>;
}
