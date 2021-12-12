import { Switch, Route } from "react-router-dom";
import LogInForm from "../Forms/LogInForm";
import SignUpForm from "../Forms/SignUpForm";
import Profile from "../profiles/profile";
import ProfileForm from "../profiles/profileForm";
import ProjectList from "../projects/projectList";
import ProjectForm from "../projects/projectForm";
import ContractorList from "../explore/contractorList";
import ContractorDetails from "../explore/contractorDetails";
import ProjectChat from "../projects/projectChat";
import PrivateRoute from "./PrivateRoute"
import RequestList from "../requests/requestList";
import Homepage from "../homepage";

const Routes = ({ signUp, logIn }) => {
  return (
    <Switch>

      <Route exact path="/">
      <Homepage></Homepage>
      </Route>
      <Route exact path="/login">
        <LogInForm logIn={logIn} />
      </Route>
      <Route exact path="/signup">
        <SignUpForm signUp={signUp} />
      </Route>
      <PrivateRoute path="/profile">
        <Profile />
      </PrivateRoute>
      <PrivateRoute path="/profile-form">
        <ProfileForm />
      </PrivateRoute>
      <PrivateRoute exact path="/projects">
        <ProjectList />
      </PrivateRoute>
      <PrivateRoute exact path="/projects/:id">
        <ProjectChat />
      </PrivateRoute>
      <PrivateRoute exact path="/project-form">
        <ProjectForm />
      </PrivateRoute>
      <PrivateRoute exact path="/explore">
        <ContractorList />
      </PrivateRoute>
      <PrivateRoute exact path="/requests">
        <RequestList />
      </PrivateRoute>
      <PrivateRoute exact path="/explore/:id">
        <ContractorDetails />
      </PrivateRoute>
    </Switch>
  );
};
export default Routes;
