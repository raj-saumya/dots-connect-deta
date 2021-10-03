import axios from "axios";

export const requestRoomId = () => {
  return axios.put("http://localhost:8000/dots_connect_deta/board/room", {
    name: "string",
  });
};
