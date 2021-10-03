import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import Icon from "../assets/icon-person.png";

import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Dot = ({ row, col, active, onDotClick }) => {
  return (
    <motion.div
      className="dots"
      onClick={() => onDotClick(row, col)}
      animate={{
        backgroundColor: [
          "#4c4c4c",
          row === active.row && col === active.col ? "#DBA141" : "#4c4c4c",
        ],
      }}
      transition={{ delay: 0, duration: 0.4 }}
    />
  );
};

const Box = ({ row, col, matrix }) => {
  const isBox = () =>
    matrix[row][col].rightSet &&
    matrix[row][col].downSet &&
    matrix[row][col + 1].downSet &&
    matrix[row + 1][col].rightSet;

  return (
    <AnimatePresence>
      {isBox() && (
        <motion.div
          key="modal"
          className="box"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <img className="icon" src={Icon} alt="" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const LineH = ({ row, col, highlightedLines, isLine }) => {
  return (
    <div className="line-h-wrapper">
      <motion.div
        className="line-h"
        animate={{
          width: isLine
            ? 60
            : highlightedLines.includes(JSON.stringify({ row, col, dir: 0 }))
            ? 60
            : 0,
          backgroundColor: ["#eeeeee", isLine ? "#4c4c4c" : "#eeeeee"],
        }}
        transition={{ delay: 0, duration: 0.4 }}
      />
    </div>
  );
};

const LineV = ({ row, col, highlightedLines, isLine }) => {
  return (
    <div className="line-v-wrapper">
      <motion.div
        animate={{
          height: isLine
            ? 60
            : highlightedLines.includes(JSON.stringify({ row, col, dir: 1 }))
            ? 60
            : 0,
          backgroundColor: ["#eeeeee", isLine ? "#4c4c4c" : "#eeeeee"],
        }}
        transition={{ delay: 0, duration: 0.4 }}
        className="line-v z-x"
      />
    </div>
  );
};

const Board = ({ socket }) => {
  const history = useHistory();

  const { currentPlayer, playerList, playerTurn } = useSelector(
    (state) => state.game
  );

  const { active, rows, cols, matrix, highlightedLines } = useSelector(
    (state) => state.global
  );

  if (!currentPlayer) {
    history.push("./");
  }

  const handleDotClick = (row, col) => {
    socket.sendData({
      message: {
        action: "BOARD",
        payload: {
          row,
          col,
        },
      },
    });
  };

  return (
    <div className="main">
      {playerTurn !== currentPlayer && (
        <div
          style={{
            position: "absolute",
            height: "100%",
            background: "transparent",
            width: "100%",
            zIndex: "99",
          }}
        ></div>
      )}
      <div style={{ position: "absolute" }}>
        <div>Player : {currentPlayer}</div>
        <div>
          Player List :{" "}
          {playerList.map((player, i) => (
            <label key={i}>- {player} - </label>
          ))}
        </div>
      </div>

      <div className="container col">
        {matrix.map((d, i) => (
          <div key={i} className="row">
            {d.map((e, j) => (
              <div key={j} className="col">
                <div className="row align-item-center z-x">
                  <Dot
                    row={i}
                    col={j}
                    active={active}
                    onDotClick={handleDotClick}
                  />
                  {j < cols - 1 && (
                    <LineH
                      row={i}
                      col={j}
                      active={active}
                      highlightedLines={highlightedLines}
                      isLine={matrix[i][j].rightSet}
                    />
                  )}
                </div>
                {i < rows - 1 && (
                  <div className="col rel">
                    <LineV
                      row={i}
                      col={j}
                      active={active}
                      highlightedLines={highlightedLines}
                      isLine={matrix[i][j].downSet}
                    />
                    {j < cols - 1 && <Box row={i} col={j} matrix={matrix} />}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
