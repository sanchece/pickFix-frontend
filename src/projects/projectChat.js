import React, { useEffect, useState } from "react";
import pickFixApi from "../api";
import { useParams } from "react-router";
import ChatForm from "./chatForm";
import moment from "moment";

const ProjectChat = () => {
  const { id } = useParams();
  const [chats, setChats] = useState(null);
  const [project, setProject] = useState(null);

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
      <div>
        no chats
        <ChatForm
          projectId={id}
          customerId={project.customer_id}
          contractorId={project.contractor_id}
          addNewChat={addNewChat}
        />
      </div>
    );
  }

  return (
    <div>
      {chats.map((chat) => {
        return (
          <div>
            <div>
              {moment(chat.created_on).format("llll")} {chat.sent_by}:{" "}
              {chat.chat}
            </div>
            <div></div>
          </div>
        );
      })}

      <ChatForm
        projectId={id}
        customerId={project.customer_id}
        contractorId={project.contractor_id}
        addNewChat={addNewChat}
      />
    </div>
  );
};

export default ProjectChat;
