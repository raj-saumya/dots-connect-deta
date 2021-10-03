import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import "./App.css";
import Game from "./Game";
import Home from "./screens/Home";

const App = () => {
  return (
    <div className="main">
      <Router>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/home" />} />
          <Route path="/home" render={(props) => <Home {...props} />} />
          <Route path="/game" render={(props) => <Game {...props} />} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
