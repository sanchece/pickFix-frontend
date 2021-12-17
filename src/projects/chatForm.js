import { useState, useContext, useEffect } from "react";
import UserContext from "../userContext";
import moment from "moment";
import pickFixApi from "../api";
import {
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap/";
import "bootstrap/dist/css/bootstrap.min.css";
const ChatForm = ({ projectId, customerId, contractorId, addNewChat }) => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [newChat, setNewChat] = useState({
    chat: "",
    created_on: "",
    project_id: projectId,
    customer_id: customerId,
    contractor_id: contractorId,
    sent_by: currentUser.userType,
  });

  useEffect(() => {});
  async function handleChange(e) {
    const { name, value } = e.target;
    setNewChat((data) => ({ ...data, [name]: value }));
    console.log(newChat);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    newChat.created_on = moment().format("YYYY-MM-DD HH:mm:ss");
    let res = await pickFixApi.addProjectChat(newChat, projectId);
    addNewChat(newChat);
  }
  return (
    <form onSubmit={handleSubmit}>
   
      <InputGroup className="mb-3">
    <FormControl
    name="chat"
    value={newChat.chat}
   onChange={handleChange}
      placeholder="Recipient's username"
      aria-label="Recipient's username"
      aria-describedby="basic-addon2"
    />
    <Button onClick={handleSubmit} variant="outline-secondary" id="button-addon2">
      Send
    </Button>
  </InputGroup>
    </form>
  );
};

export default ChatForm;
