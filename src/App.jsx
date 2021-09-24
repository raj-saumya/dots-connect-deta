import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Board from "./screens/Board";
import Home from "./screens/Home";
import Socket from "./utils/socket";

const App = () => {
  const socket = useRef(null);
  const [state, setstate] = useState(null);

  useEffect(() => {
    socket.current = new Socket();

    socket.current
      .establishConnection()
      .then(() => {
        socket.current.recieveData();
        console.log("socket connected");
        setstate(socket.current);
      })
      .catch((err) => console.log(err));

    return () => socket.current.closeConnection();
  }, []);

  return (
    <div className="main">
      <Router>
        <Switch>
          <Route path="/game" render={() => <Board socket={state} />}></Route>
          <Route path="/" render={() => <Home socket={state} />}></Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
