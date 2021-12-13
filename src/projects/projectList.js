import React, { useState,useEffect,useContext } from "react";
import UserContext from "../userContext";
import pickFixApi from "../api";
import { Link } from "react-router-dom";
import moment from "moment";
import ProjectCard from "../projects/projectCard"
import { Card, Container, Row, Col, Button, Stack,  InputGroup, Form, FormControl } from "react-bootstrap/";
import "bootstrap/dist/css/bootstrap.min.css";

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
        console.log(getProjects)
         if(getProjects.length>0){
             getProjects.map((project,i)=>{
                 if(project.status=="REQUESTED" || project.status=="DECLINED"){
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
        <Container fluid>
               <Card.Title className="d-flex mb-3 justify-content-center">
                Projects
              </Card.Title> 
            <Row>
                <Col md={4}></Col>
                <Col md={4}>
                {projects.map(project=>{
                return(
                <ProjectCard 
                    project_id={project.id}
                    title={project.title}            
                    description={project.description}            
                    status={project.status}            
                    budget={project.budget}            
                    name={project.name}  
                    customer={project.firstname}          
                    start_time={moment(project.start_time).format("llll")}            
                    end_time={moment(project.end_time).format("llll")}            
                />)
            })}
                </Col>
                <Col md={4}></Col>
            </Row>
             
        </Container>
    )
}
export default ProjectList;