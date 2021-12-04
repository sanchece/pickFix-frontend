import React, { useState,useEffect,useContext } from "react";
import UserContext from "../userContext";
import pickFixApi from "../api";
import { Link } from "react-router-dom";

import ContractorCard from "../explore/contractorCard"

const ContractorList=()=>{
    const { currentUser } = useContext(UserContext);

    const [contractors,setContractors]=useState(null)

    useEffect(()=>{
        loadContractors();
        console.log("in ContractorList")
    },[currentUser])

    async function loadContractors(){
        let getContractors=await pickFixApi.getContractors();
        setContractors(getContractors);
    }
    if(!contractors) return <div>loading</div>
    return(
        <div>
            in contractors 
            {contractors.map(contractor=>{
                return(
                <ContractorCard 
                    firstname={contractor.firstname}            
                    lastname={contractor.lastname}            
                    email={contractor.email}            
                />)
            })}
        </div>
    )
}
export default ContractorList;