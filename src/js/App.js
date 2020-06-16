import React from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import LandingPage from "./components/LandingPage";
import MainApp from "./components/MainApp";


const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/app" component={MainApp} />
      </Switch>
    </Router>
  );
};

export default App;
