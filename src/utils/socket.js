import store from "../store";
import { r_drawline, r_reset, r_set } from "../store/board";
import { r_setPlayerList, r_setPlayerTurn } from "../store/game";

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
      switch (data.message.action) {
        case "ADD_TO_PLAYER_LIST":
          store.dispatch(r_setPlayerList(data.message.payload));
          break;
        case "BOARD":
          const { row, col } = data.message.payload;
          if (active.row === row && active.col === col) {
            store.dispatch(r_reset());
          } else if (check(active.row, active.col, row, col)) {
            store.dispatch(r_drawline({ row, col }));
            store.dispatch(r_setPlayerTurn());
          } else {
            store.dispatch(r_set({ row, col }));
          }
          break;
        default:
          break;
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
