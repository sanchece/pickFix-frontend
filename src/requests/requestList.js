import React, { useState,useEffect,useContext } from "react";
import UserContext from "../userContext";
import pickFixApi from "../api";
import { Link } from "react-router-dom";
import RequestCard from "../requests/requestCard"
import moment from "moment";
import { Card, Container, Row, Col, Button, Stack,  InputGroup, Form, FormControl } from "react-bootstrap/";
import "bootstrap/dist/css/bootstrap.min.css";

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
             getProjects= getProjects.reverse();
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
        <Container fluid>
               <Card.Title className="d-flex mb-3 justify-content-center">
                Requests
              </Card.Title> 
            <Row>
                <Col lg={4}></Col>
                <Col lg={4}>
                {projects.map(project=>{
                return(
                <RequestCard 
                    project_id={project.id}
                    title={project.title}            
                    description={project.description}            
                    status={project.status}            
                    budget={project.budget}            
                    customer={project.firstname}          
                    start_time={moment(project.start_time).format("llll")}            
                    end_time={moment(project.end_time).format("llll")}            
                />)
            })}
                </Col>
                <Col lg={4}></Col>
            </Row>
             
        </Container>
    )
}
export default RequestList;