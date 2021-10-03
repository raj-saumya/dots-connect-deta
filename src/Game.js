import React, { useEffect, useRef, useState } from "react";
import Socket from "./utils/socket";

const Game = ({ location }) => {
  const roomId = new URLSearchParams(location.search).get("roomId");

  const socket = useRef(null);
  const [state, setstate] = useState(null);

  useEffect(() => {
    socket.current = new Socket();

    socket.current
      .establishConnection(roomId)
      .then(() => {
        socket.current.recieveData();
        console.log("socket connected");
        setstate(socket.current);
      })
      .catch((err) => console.log(err));

    return () => socket.current.closeConnection();
  }, []);

  return <div>Game</div>;
};

export default Game;
