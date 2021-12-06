import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

const ContractorCard = (props) => {
 
  return (
    <div key={props.id}>
      <h3>firstname: {props.firstname}</h3>
      <div>lastname:{props.lastname}</div>
      <div>email:{props.email}</div>
      <Link to={`/explore/${props.id}`} > Contractor</Link>
    </div>
  );
};

export default ContractorCard;
