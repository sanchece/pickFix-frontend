import React, { useState,useEffect,useContext } from "react";
import UserContext from "../userContext";
import pickFixApi from "../api";
import { Link } from "react-router-dom";

import ProjectCard from "../projects/projectCard"

const ProjectList=()=>{
    const { currentUser } = useContext(UserContext);
    const id= currentUser.id;
    const userType=currentUser.userType;

    const [projects,setProjects]=useState(null)

    useEffect(()=>{
         loadProjects();
    },[])

    async function loadProjects(){
        let getProjects=await pickFixApi.getProjects(id,userType)
         if(getProjects.length>0){
            setProjects(getProjects);
        } 
    }
  if(!projects) {
      return <div>no projects</div>
  }

    return(
        <div>
            in projects 
            {projects.map(project=>{
                return(
                <ProjectCard 
                    project_id={project.id}
                    title={project.title}            
                    description={project.description}            
                    status={project.status}            
                    budget={project.budget}            
                    customer_id={project.customer_id}            
                    contractor_id={project.contractor_id}            
                />)
            })}
            <Link to="project-form">Add Project</Link>
        </div>
    )
}
export default ProjectList;