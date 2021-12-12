import { Link } from "react-router-dom";
import React, { useContext } from "react";

import pickFixApi from "../api";
import UserContext from "../userContext";

const RequestCard=(props)=>{
    const { currentUser } = useContext(UserContext);

    async function handleAccept(){
        const data={
            id:props.project_id,
            title:props.title,
            description:props.description,
            status:"ACCEPTED",
            budget:props.budget,
            customer_id:props.customer_id,
            contractor_id:props.contractor_id,
            start_time: props.start_time,
            end_time: props.end_time
        }
        const res= await pickFixApi.updateProject(props.project_id, data)
        console.log("accpeted", res)

    }
    async function handleDecline(){
        const data={
            id:props.project_id,
            title:props.title,
            description:props.description,
            status:"DECLINED",
            budget:props.budget,
            customer_id:props.customer_id,
            contractor_id:props.contractor_id,
            start_time: props.start_time,
            end_time: props.end_time
        }
        const res= await pickFixApi.updateProject(props.project_id, data)
        console.log("declined", res)

    }
    if(currentUser.userType=="contractors"){
        return(
            <div>
            <h3>{props.title}</h3>
            <div>Description:{props.description}</div>
            <div>Status:{props.status}</div>
            <div>Budget:{props.budget}</div>
            <div>Customer:{props.customer_id}</div>
            <div>Contractor:{props.contractor_id}</div>
            <div>Start Time:{props.start_time}</div>
            <div>End Time:{props.end_time}</div>
            <Link to={`/projects/${props.project_id}`} > Chat</Link>
            <button onClick={handleAccept}>Accept</button>
            <button onClick={handleDecline}>Decline</button>
          </div>  
        )
    }
    return(
        <div>
        <h3>{props.title}</h3>
        <div>Description:{props.description}</div>
        <div>Status:{props.status}</div>
        <div>Budget:{props.budget}</div>
        <div>Customer:{props.customer_id}</div>
        <div>Contractor:{props.contractor_id}</div>
        <div>Start Time:{props.start_time}</div>
        <div>End Time:{props.end_time}</div>
        <Link to={`/projects/${props.project_id}`} > Chat</Link>

      </div>  
    )




}

export default RequestCard;