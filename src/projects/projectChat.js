import React, { useEffect, useState, useContext } from "react";
import pickFixApi from "../api";
import { useParams } from "react-router";
import ChatForm from "./chatForm";
import moment from "moment";
import {
  Card,
  Container,
  Row,
  Col
} from "react-bootstrap/";
import "bootstrap/dist/css/bootstrap.min.css";
import UserContext from "../userContext";
const ProjectChat = () => {
  const { id } = useParams();
  const [chats, setChats] = useState(null);
  const [project, setProject] = useState(null);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    loadChats();
    loadProject();
  }, []);

  async function loadChats() {
    let res = await pickFixApi.getProjectChat(id);
    console.log("res", res);
    setChats(res.reverse());
  }
  async function loadProject() {
    let res = await pickFixApi.getProject(id);
    setProject(res);
    console.log("project:", res);
  }
  function addNewChat(chat) {
    setChats((chats) => [...chats, chat]);
  }

  if (!chats || !project) {
    return <div>loading</div>;
  } else if (chats.length === 0) {
    return (
      <Container fluid>
      <Row>
        <Col md={3}></Col>
        <Col md={6}>
          <Card.Title className="d-flex m-3 justify-content-center">
            Chat
          </Card.Title>
          <Card className="mt-3" style={{ height: "80vh" }}>
            <Card.Body>
        Say hi
        <ChatForm
          projectId={id}
          customerId={project.customer_id}
          contractorId={project.contractor_id}
          addNewChat={addNewChat}
        />
         </Card.Body>
          </Card>
        </Col>
        <Col md={3}></Col>
      </Row>
    </Container>
    );
  }

  return (
    <Container fluid>
      <Row>
        <Col md={3}></Col>
        <Col md={6}>
          <Card.Title className="d-flex m-3 justify-content-center">
            Chat
          </Card.Title>
          <Card className="mt-3" style={{ height: "80vh" }}>
            <Card.Body>
              {chats.map((chat, i) => {
                if (i > chats.length - 18) {
                  if (currentUser.userType == chat.sent_by) {
                    return (
                      <Card
                        className="mb-1 justify-content-end"
                        style={{
                          left: "40%",
                          width: "60%",
                        }}
                      >
                        <div>
                          {moment(chat.created_on).format("llll")}{" "}
                          {chat.sent_by}: {chat.chat}
                        </div>
                        <div></div>
                      </Card>
                    );
                  } else {
                    return (
                      <Card
                        className="mb-1 justify-content-end"
                        style={{
                          width: "60%",
                        }}
                      >
                        <div>
                          {moment(chat.created_on).format("llll")}: {chat.chat}
                        </div>
                        <div></div>
                      </Card>
                    );
                  }
                }
              })}

              <ChatForm
            
                projectId={id}
                customerId={project.customer_id}
                contractorId={project.contractor_id}
                addNewChat={addNewChat}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}></Col>
      </Row>
    </Container>
  );
};

export default ProjectChat;
