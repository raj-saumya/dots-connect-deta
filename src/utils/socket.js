import store from "../store";
import { r_drawline, r_set } from "../store/board";

const socketPath = "ws://localhost:8000/ws/chat/myroom/";
let active = {
  row: null,
  col: null,
};

const unsubscribe = store.subscribe(() => {
  active = store.getState().global.active;
});

export default class Socket {
  establishConnection() {
    return new Promise((resolve, reject) => {
      this._socket = new WebSocket(socketPath);
      this._socket.onopen = () => resolve("success");
      this._socket.onerror = (err) => reject(err);
    });
  }

  closeConnection() {
    unsubscribe();
    return () => this._socket.close();
  }

  sendData(data) {
    this._socket.send(JSON.stringify(data));
  }

  recieveData() {
    this._socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const { row, col } = data.message;
      if (active.row === row && active.col === col) {
        console.log("same");
      } else if (check(active.row, active.col, row, col)) {
        store.dispatch(r_drawline({ row, col }));
      } else {
        store.dispatch(r_set({ row, col }));
      }
    };
  }
}

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
