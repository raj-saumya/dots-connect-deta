import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { r_setCurrentPlayer } from "../store/game";

const Join = ({ socket }) => {
  const { currentPlayer } = useSelector((state) => state.game);
  const dispatch = useDispatch();

  const history = useHistory();

  const handleOnChange = (e) => dispatch(r_setCurrentPlayer(e.target.value));
  const handleOnClick = () => {
    socket.sendData({
      message: {
        action: "ADD_TO_PLAYER_LIST",
        payload: currentPlayer,
      },
    });
    history.push("/game");
  };

  return (
    <div>
      <input
        value={currentPlayer}
        placeholder="Enter player name"
        onChange={handleOnChange}
      />
      <button onClick={handleOnClick}>Play</button>
    </div>
  );
};

export default Join;
