import React, { ReactElement, useContext, useEffect, useState } from 'react';

import { Button, message } from 'antd';

import { GameServiceInstance, SocketServiceInstance } from 'api';
import style from 'components/game/Game.module.sass';
import { Cell, PlayStopper } from 'components/index';
import { GameContext } from 'context';
import { MessageGame, SymbolEnum } from 'enums';
import { PlayMatrixType } from 'types';
import { check } from 'utils';

export const Game = (): ReactElement => {
  const [matrix, setMatrix] = useState<PlayMatrixType>([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);

  const {
    playerSymbol,
    setPlayerSymbol,
    setPlayerTurn,
    isPlayerTurn,
    setGameStarted,
    isGameStarted,
  } = useContext(GameContext);

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
      setPlayerTurn(true);
      onMessageAboutGame(messageAboutGame);
    }
  }, [messageAboutGame]);

  const handleGameUpdate = (): void => {
    if (SocketServiceInstance.socket)
      GameServiceInstance.onGameUpdate(SocketServiceInstance.socket, newMatrix => {
        setMatrix(newMatrix);
        check.check(newMatrix);
        setPlayerTurn(true);
      });
  };

  const handleGameStart = (): void => {
    if (SocketServiceInstance.socket)
      GameServiceInstance.onStartGame(SocketServiceInstance.socket, options => {
        setGameStarted(true);
        setPlayerSymbol(options.symbol);
        if (options.isStart) {
          setPlayerTurn(true);
        } else setPlayerTurn(false);
      });
  };

  const handleGameWin = (): void => {
    if (SocketServiceInstance.socket)
      GameServiceInstance.onGameWin(SocketServiceInstance.socket, messageGame => {
        setMessageAboutGame(messageGame);
      });
  };
  useEffect(() => {
    handleGameUpdate();
    handleGameStart();
    handleGameWin();
    check.resetCounter();
  }, []);

  const updateGameMatrix = (row: number, column: number): void => {
    const newMatrix = [...matrix];

    if (playerSymbol === SymbolEnum.X) {
      newMatrix[row][column] = SymbolEnum.X;
    } else {
      newMatrix[row][column] = SymbolEnum.O;
    }

    setMatrix(newMatrix);

    if (SocketServiceInstance.socket) {
      GameServiceInstance.updateGame(SocketServiceInstance.socket, newMatrix);
      const stateWin = check.check(newMatrix);
      if (stateWin && stateWin === SymbolEnum.Tie) {
        GameServiceInstance.gameWin(SocketServiceInstance.socket, MessageGame.Tie);
        setMessageAboutGame(MessageGame.Tie);
      } else if (stateWin && stateWin === playerSymbol) {
        GameServiceInstance.gameWin(SocketServiceInstance.socket, MessageGame.Lost);
        setMessageAboutGame(MessageGame.Win);
      }

      setPlayerTurn(false);
    }
  };

  return (
    <div className={style.container}>
      {contextHolder}
      {!isGameStarted && (
        <h4 className={style.title}>
          Waiting for Other Player to Join to Start the Game!
        </h4>
      )}
      {(!isGameStarted || !isPlayerTurn) && <PlayStopper />}
      <div className={style.gameContainer}>
        {matrix.map((row, rowIdx) =>
          row.map((column, columnIdx) => (
            <Cell
              value={matrix[rowIdx][columnIdx]}
              callback={updateGameMatrix}
              columnIndex={columnIdx}
              rowIndex={rowIdx}
              key={Math.random()}
            />
          )),
        )}
      </div>
      {messageAboutGame && (
        <Button type="primary" onClick={() => document.location.reload()}>
          New game
        </Button>
      )}
    </div>
  );
};
