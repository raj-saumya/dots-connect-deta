import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import Icon from "./assets/icon-person.png";
import "./App.css";

import { useSelector, useDispatch } from "react-redux";
import { r_drawline, r_reset, r_set } from "./store";

const check = (ogRow, ogCol, row, col) => {
  if (ogRow === row && ogCol - 1 === col) {
    return true;
  } else if (ogRow === row && ogCol + 1 === col) {
    return true;
  } else if (ogRow - 1 === row && ogCol === col) {
    return true;
  } else if (ogRow + 1 === row && ogCol === col) {
    return true;
  } else {
    return false;
  }
};

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

const App = () => {
  const { active, rows, cols, matrix, highlightedLines } = useSelector(
    (state) => state.global
  );
  const dispatch = useDispatch();

  const handleDotClick = (row, col) => {
    if (active.row === row && active.col === col) {
      return;
    } else if (check(active.row, active.col, row, col)) {
      dispatch(r_drawline({ row, col }));
    } else {
      dispatch(r_set({ row, col }));
    }
  };

  return (
    <div className="main">
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

export default App;
