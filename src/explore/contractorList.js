import React, { useState, useEffect, useContext } from "react";
import UserContext from "../userContext";
import pickFixApi from "../api";
import ContractorCard from "../explore/contractorCard";

import "../styles.css";
import GoogleMap from "google-map-react";
import { Row, Col, Card, Container } from "react-bootstrap/";
import "bootstrap/dist/css/bootstrap.min.css";
const ContractorList = () => {
  const { currentUser, myLocation } = useContext(UserContext);
  const [contractors, setContractors] = useState(null);
  const [visibleContractor, setVisibleContractor] = useState([]);

  useEffect(() => {
    loadContractors();
  }, [currentUser]);

  async function loadContractors() {
    let getContractors = await pickFixApi.getContractors(myLocation);
    getContractors.map((contractor) => {
      contractor.visible = false;
    });
    console.log("contractors:", getContractors);
    setContractors(getContractors);
  }
  const MyMarker = (props) => (
    <div id={props.id} onClick={handleClick} className="circle"></div>
  );

  async function handleClick(e) {
    const clickedContractor = e.target.id;
    contractors.map((contractor) => {
      if (contractor.id == clickedContractor) {
        setVisibleContractor([contractor]);
      }
    });
  }

  if (!contractors) return <div>loading</div>;
  return (
    <Container>
      <Row>
        <Col lg={2}></Col>
        <Col lg={8}>
          <Card.Title className="d-flex mb-3 justify-content-center">
            Contractors near you
          </Card.Title>
          {visibleContractor.map((contractor) => {
            //  if(contractor.visible===true){
            return (
              <ContractorCard
                name={contractor.name}
                firstname={contractor.firstname}
                lastname={contractor.lastname}
                email={contractor.email}
                id={contractor.id}
              />
            );
            //  }
          })}
          <div style={{ height: "60vh", width: "100%" }}>
            <GoogleMap
              bootstrapURLKeys={{
                key: "AIzaSyARetVWUyGyDHXDkZuWPtmv26Rh5vZpXRQ",
              }}
              defaultCenter={myLocation}
              defaultZoom={12}
            >
              {contractors.map((contractor) => {
                return (
                  <MyMarker
                    id={contractor.id}
                    lat={contractor.lat}
                    lng={contractor.lng}
                  />
                );
              })}
            </GoogleMap>
          </div>
        </Col>
        <Col lg={2}></Col>
      </Row>
    </Container>
  );
};
export default ContractorList;
