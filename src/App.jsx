import React from "react";
import { motion } from "framer-motion";
import Icon from "./assets/icon-person.png";
import "./App.css";

import { useSelector, useDispatch } from "react-redux";
import { r_set } from "./store";

const Dot = ({ row, col, onDotClick }) => {
  return <div className="dots" onClick={() => onDotClick(row, col)} />;
};

const Box = ({ visible }) => {
  if (true) {
    return null;
  }

  return (
    <div className="box">
      <img className="icon" src={Icon} alt="" />
    </div>
  );
};

const LineH = ({ data }) => {
  return (
    <div className="line-h-wrapper">
      <motion.div
        className="line-h"
        animate={{ width: data.visible ? 60 : 0 }}
        transition={{ delay: 0, duration: 0.4 }}
      />
    </div>
  );
};

const LineV = ({ data }) => {
  return (
    <div className="line-v-wrapper">
      <motion.div
        animate={{ height: data.visible ? 60 : 0 }}
        transition={{ delay: 0, duration: 0.4 }}
        className="line-v z-x"
      />
    </div>
  );
};

const App = () => {
  const { rows, cols, matrix } = useSelector((state) => state.global);
  const dispatch = useDispatch();

  const handleDotClick = (row, col) => {
    console.log(row, col, matrix[row][col]);
    dispatch(r_set({ row, col }));
  };

  return (
    <div className="main">
      <div className="container">
        {matrix.map((d, i) => (
          <div key={i} className="col">
            {d.map((e, j) => (
              <div key={j} className="col">
                <div className="row align-item-center z-x">
                  <Dot row={i} col={j} onDotClick={handleDotClick} />
                  {i < rows - 1 && <LineH data={matrix[i][j]} />}
                </div>
                {j < cols - 1 && (
                  <div className="row rel">
                    <LineV data={matrix[i][j]} />
                    <Box />
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
