import React, { useState,useEffect,useContext } from "react";
import UserContext from "../userContext";
import pickFixApi from "../api";
import { Link } from "react-router-dom";
import RequestCard from "../requests/requestCard"
import moment from "moment";

const RequestList=()=>{
    const { currentUser } = useContext(UserContext);
    const id= currentUser.id;
    const userType=currentUser.userType;
    const [projects,setProjects]=useState(null)

    useEffect(()=>{
         loadProjects();
        
    },[])

    async function loadProjects(){
        let getProjects=await pickFixApi.getProjects(id,userType)
        console.log("requestList:", getProjects)
         if(getProjects.length>0){
             getProjects.map((project,i)=>{
                 if(project.status!=="REQUESTED"){
                     delete getProjects[i];
                 }
             })
            setProjects(getProjects);
        } 
    }
  if(!projects) {
      return <div>no projects</div>
  }

    return(
        <div>
            in requests 
            {projects.map(project=>{
                return(
                <RequestCard 
                    project_id={project.id}
                    title={project.title}            
                    description={project.description}            
                    status={project.status}            
                    budget={project.budget}            
                    customer_id={project.customer_id}            
                    contractor_id={project.contractor_id}            
                    start_time={moment(project.start_time).format("llll")}            
                    end_time={moment(project.end_time).format("llll")}            
                />)
            })}
       
        </div>
    )
}
export default RequestList;