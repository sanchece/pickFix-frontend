import React from "react";
import { render } from "@testing-library/react";
import LogInForm from "./LoginForm";
import { MemoryRouter } from "react-router";

it("matches snapshot", function () {
  const { asFragment } = render(
      <MemoryRouter>
        <LogInForm />
      </MemoryRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});
