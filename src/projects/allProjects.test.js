import React from "react";
import { render } from "@testing-library/react";
import ProjectList from "./projectList";
import ProjectCard from "./projectCard";
import ProfileForm from "./projectForm";
import ProjectChat from "./projectChat";
import ChatForm from "./chatForm";
import { MemoryRouter } from "react-router";
import { UserProvider } from "../testUtilities";

it("renders ProjectList without crashing", function () {
  render(
      <MemoryRouter>
        <UserProvider>
          <ProjectList />
        </UserProvider>
      </MemoryRouter>,
  );
});
it("renders ProjectCard without crashing", function () {
  render(
      <MemoryRouter>
        <UserProvider>
          <ProjectCard />
        </UserProvider>
      </MemoryRouter>,
  );
});
it("renders ProfileForm without crashing", function () {
  render(
      <MemoryRouter>
        <UserProvider>
          <ProfileForm />
        </UserProvider>
      </MemoryRouter>,
  );
});
it("renders ProjectChat without crashing", function () {
  render(
      <MemoryRouter>
        <UserProvider>
          <ProjectChat />
        </UserProvider>
      </MemoryRouter>,
  );
});
it("renders ChatForm without crashing", function () {
  render(
      <MemoryRouter>
        <UserProvider>
          <ChatForm />
        </UserProvider>
      </MemoryRouter>,
  );
});
