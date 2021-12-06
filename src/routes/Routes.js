import { Switch, Route } from "react-router-dom";
import LogInForm from "../Forms/LogInForm";
import SignUpForm from "../Forms/SignUpForm";
import Profile from "../profiles/profile";
import ProfileForm from "../profiles/profileForm";
import ProjectList from "../projects/projectList";
import ProjectForm from "../projects/projectForm";
import ContractorList from "../explore/contractorList";
import ContractorDetails from "../explore/contractorDetails";

const Routes = ({ signUp, logIn }) => {
  return (
    <Switch>
      <Route exact path="/login">
        <LogInForm logIn={logIn} />
      </Route>
      <Route exact path="/signup">
        <SignUpForm signUp={signUp} />
      </Route>
      <Route path="/profile">
        <Profile />
      </Route>
      <Route path="/profile-form">
        <ProfileForm />
      </Route>
      <Route exact path="/projects">
        <ProjectList />
      </Route>
      <Route exact path="/project-form">
        <ProjectForm />
      </Route>
      <Route exact path="/explore">
        <ContractorList />
      </Route>
      <Route exact path="/explore/:id">
        <ContractorDetails />
      </Route>


    </Switch>
  );
};
export default Routes;
