import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import Board from "./screens/Board";
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
      <Board socket={state} />
    </div>
  );
};

export default App;
