import React, { ReactElement, useEffect, useState } from 'react';

import { message } from 'antd';

import styleMain from '../styles/container.module.sass';

import style from './App.module.sass';

import { SocketServiceInstance } from 'api';
import { Footer, Game, Header, JoinRoom } from 'components';
import { GameContext, GameContextType } from 'context';
import { SymbolEnum } from 'enums';
import { SymbolType } from 'types';

export const App = (): ReactElement => {
  const [isInRoom, setInRoom] = useState(false);
  const [playerSymbol, setPlayerSymbol] = useState<SymbolType>(SymbolEnum.X);
  const [isPlayerTurn, setPlayerTurn] = useState(false);
  const [isGameStarted, setGameStarted] = useState(false);
  const [rooms, setRooms] = useState([]);
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
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const gameContextValue: GameContextType = {
    isInRoom,
    setInRoom,
    playerSymbol,
    setPlayerSymbol,
    isPlayerTurn,
    setPlayerTurn,
    isGameStarted,
    setGameStarted,
    rooms,
    setRooms,
  };
  const connectSocket = async (): Promise<void> => {
    await SocketServiceInstance.connect(
      'https://serverwebsockettiktacktoe.herokuapp.com/' || '',
    ).catch((error: string) => {
      setMessageAboutGame(error);
    });
  };

  useEffect(() => {
    connectSocket();
  }, []);

  return (
    <div className={style.appWrapper}>
      {contextHolder}
      <Header />
      <div className={styleMain.mainContainer}>
        <GameContext.Provider value={gameContextValue}>
          <div className={styleMain.container}>
            {!isInRoom && <JoinRoom />}
            {isInRoom && <Game />}
          </div>
        </GameContext.Provider>
      </div>
      <Footer />
    </div>
  );
};
