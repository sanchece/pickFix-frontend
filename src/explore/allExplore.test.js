import React from "react";
import { render } from "@testing-library/react";
import ContractorList from "./contractorList";
import ContractorDetails from "./contractorDetails";
import ContractorCard from "./contractorCard";
import { MemoryRouter } from "react-router";
import { UserProvider } from "../testUtilities";

it("renders ContractorList without crashing", function () {
  render(
      <MemoryRouter>
        <UserProvider>
          <ContractorList />
        </UserProvider>
      </MemoryRouter>,
  );
});

it("renders ContractorDetails without crashing", function () {
  render(
      <MemoryRouter>
        <UserProvider>
          <ContractorDetails />
        </UserProvider>
      </MemoryRouter>,
  );
});

it("renders ContractorCard without crashing", function () {
  render(
      <MemoryRouter>
        <UserProvider>
          <ContractorCard />
        </UserProvider>
      </MemoryRouter>,
  );
});


