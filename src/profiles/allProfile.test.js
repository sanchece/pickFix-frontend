import React from "react";
import { render } from "@testing-library/react";
import Profile from "./profile";
import ProfileForm from "./profileForm";

import { MemoryRouter } from "react-router";
import { UserProvider } from "../testUtilities";

it("renders Profile without crashing", function () {
  render(
      <MemoryRouter>
        <UserProvider>
          <Profile />
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
