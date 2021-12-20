import React from "react";
import { render } from "@testing-library/react";
import RequestList from "./requestList";
import RequestCard from "./requestCard";

import { MemoryRouter } from "react-router";
import { UserProvider } from "../testUtilities";

it("renders RequestList without crashing", function () {
  render(
      <MemoryRouter>
        <UserProvider>
          <RequestList />
        </UserProvider>
      </MemoryRouter>,
  );
});
it("renders RequestCard without crashing", function () {
  render(
      <MemoryRouter>
        <UserProvider>
          <RequestCard />
        </UserProvider>
      </MemoryRouter>,
  );
});
