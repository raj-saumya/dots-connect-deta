import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { requestRoomId } from "../services/home";

const Main = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  background: #1e1e1e;
`;

const Card = styled.div`
  padding: 32px;
  background: #27292b;
  border-radius: 4px;
  min-width: 240px;
  box-shadow: 0 0 12px -8px #000;
`;

const Button = styled.button`
  padding: 8px 16px;
  cursor: pointer;
  background: #0a84fe;
  border-radius: 4px;
  border: none;
  width: 160px;

  &:hover {
    background: #046fdb;
  }

  &:disabled {
    background: #0051a2;
    &,
    * {
      cursor: not-allowed;
    }
  }
`;

const HLine = styled.div`
  background: #8a8a8a;
  height: 2px;
  border-radius: 4px;
`;

const SepWrapper = styled.div`
  padding: 0px 16px;
  margin-bottom: 4px;
`;

const Input = styled.input`
  background: #616161;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  width: 272px;
  outline: none;
  font-size: 14px;
  color: #fff;

  &::placeholder {
    color: #c1c1c1;
  }
`;

const Home = ({ location, history }) => {
  const roomId = new URLSearchParams(location.search).get("id") || "";

  const [isCreateRoomBtnVisibile, setCreateRoomBtnVisibility] = useState(true);
  const [inputRoomId, setInputRoomId] = useState(roomId);

  const handleCreateRoomClick = () => {
    requestRoomId().then(({ data }) => {
      const { roomId } = data.data;
      setInputRoomId(roomId);
      setCreateRoomBtnVisibility(false);
    });
  };

  const handleInputChange = (e) => setInputRoomId(e.target.value);

  const handleOnJoin = () =>
    history.push({
      pathname: "/game",
      search: `?${new URLSearchParams({ roomId: inputRoomId }).toString()}`,
    });

  return (
    <Main>
      <Card>
        <motion.div
          animate={{
            height: isCreateRoomBtnVisibile ? "auto" : 0,
          }}
          transition={{ delay: 0, duration: 0.4 }}
          style={{ overflow: "hidden" }}
        >
          <div className="flex-row justify-center">
            <Button onClick={handleCreateRoomClick}>
              <label className="text-white text-m pointer">Create Room</label>
            </Button>
          </div>
          <div className="h-2x"></div>
          <div className="flex-row justify-center">
            <div className="self-center flex-1">
              <HLine />
            </div>
            <SepWrapper>
              <label className="text-m text-grey1">or</label>
            </SepWrapper>
            <div className="self-center flex-1">
              <HLine />
            </div>
          </div>
          <div className="h-8x"></div>
        </motion.div>
        <div className="flex-row align-center m-b-4x">
          <Input
            placeholder="Enter room id"
            value={inputRoomId}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex-col align-center">
          <Button onClick={handleOnJoin} disabled={inputRoomId ? false : true}>
            <label className="text-white text-m pointer">Join</label>
          </Button>
        </div>
      </Card>
    </Main>
  );
};

export default Home;
