import React, { ReactElement, useContext, useEffect, useState } from 'react';

import { message } from 'antd';

import { SocketServiceInstance, GameServiceInstance } from 'api';
import { InputWithButton } from 'components/inputWithButton/InputWithButton';
import { GameContext } from 'context';

export const JoinRoom = (): ReactElement => {
  const [roomName, setRoomName] = useState({ value: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [messageAboutGame, setMessageAboutGame] = useState('');
  const [messageApi, contextHolder] = message.useMessage();

  const onMessageAboutGame = (value: string): void => {
    messageApi.open({
      type: 'success',
      content: value,
    });
  };

  useEffect(() => {
    if (messageAboutGame) {
      onMessageAboutGame(messageAboutGame);
    }
  }, [messageAboutGame]);
  const { setInRoom } = useContext(GameContext);

  const joinRoom = async (): Promise<void> => {
    const { socket } = SocketServiceInstance;

    if (!roomName.value || roomName.value.trim() === '' || !socket) return;

    setIsLoading(true);

    const joined = await GameServiceInstance.joinGameRoom(socket, roomName.value).catch(
      error => {
        setMessageAboutGame(error);
      },
    );
    if (joined) {
      setInRoom(true);
    }
    setIsLoading(false);
  };

  return (
    <>
      {contextHolder}
      <InputWithButton
        isLoading={isLoading}
        labelInput="Room ID"
        labelButton="Join game"
        onClick={joinRoom}
        onChange={setRoomName}
      />
    </>
  );
};
