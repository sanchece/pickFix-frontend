import React, { useState, useEffect, useContext } from "react";
import UserContext from "../userContext";
import pickFixApi from "../api";
import ContractorCard from "../explore/contractorCard";

import "../styles.css";
import GoogleMap from "google-map-react";
import {
 Row,Col
} from "react-bootstrap/";
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
    console.log("target", e.target.id);
    contractors.map((contractor) => {
      console.log("22", contractor.id);
      console.log("33", clickedContractor);
      if (contractor.id == clickedContractor) {
        setVisibleContractor([contractor]);
        console.log("clicked", clickedContractor);
      }
    });
  }

  if (!contractors) return <div>loading</div>;
  return (
    <container>


    <div>
      in contractors
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
      <div style={{ height: "50vh", width: "50%" }}>
        <GoogleMap
          bootstrapURLKeys={{
            key: "AIzaSyARetVWUyGyDHXDkZuWPtmv26Rh5vZpXRQ",
          }}
          defaultCenter={myLocation}
          defaultZoom={11}
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
    </div>
    </container>
  );
};
export default ContractorList;
