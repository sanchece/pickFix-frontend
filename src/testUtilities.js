import React from "react";
import UserContext from "./userContext";

const demoUser = {
  id: 1,
  firstname: "testfirst",
  lastname: "testlast",
  email: "test@test.net",
  userType: "customers",
};
const sampleToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJtYXJ0aW5AZW1haWwuY29tIiwidXNlclR5cGUiOiJjdXN0b21lcnMiLCJpYXQiOjE2Mzk5MzM2MzJ9.7d7HlJa6C5j_32g-geu4njipsbXps6VSaxxKVktrr2s";
const sampleLocation = {
  lat: 42.392,
  lng: -83.037,
};
const UserProvider = ({
  children,
  currentUser = demoUser,
  token = sampleToken,
  location = sampleLocation,
}) => (
  <UserContext.Provider value={{ currentUser, token, location }}>
    {children}
  </UserContext.Provider>
);

export { UserProvider };
