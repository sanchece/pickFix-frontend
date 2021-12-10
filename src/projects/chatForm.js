import { useState, useContext, useEffect } from "react";
import UserContext from "../userContext";
import moment from "moment";
import pickFixApi from "../api";

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

  async function handleChange(e){
    const { name, value } = e.target;    
    setNewChat((data) => ({ ...data, [name]: value }));
    console.log(newChat)
  }

  async function handleSubmit(e){
      e.preventDefault();
      newChat.created_on=moment().format('YYYY-MM-DD HH:mm:ss');
      let res= await pickFixApi.addProjectChat(newChat,projectId);
      addNewChat(newChat)
      }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input id="chat" name="chat" onChange={handleChange} />
      </div>

      <button onSubmit={handleSubmit}> Send</button>
    </form>
  );
};

export default ChatForm;
