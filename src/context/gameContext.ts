import React from 'react';

import { SymbolEnum } from 'enums';
import { SymbolType } from 'types';

export type GameContextType = {
  isInRoom: boolean;
  setInRoom: (inRoom: boolean) => void;
  playerSymbol: SymbolType;
  setPlayerSymbol: (symbol: SymbolType) => void;
  isPlayerTurn: boolean;
  setPlayerTurn: (turn: boolean) => void;
  isGameStarted: boolean;
  setGameStarted: (started: boolean) => void;
  rooms: string[];
  setRooms: (rooms: []) => void;
};

const defaultState: GameContextType = {
  isInRoom: false,
  setInRoom: () => {},
  playerSymbol: SymbolEnum.X,
  setPlayerSymbol: () => {},
  isPlayerTurn: false,
  setPlayerTurn: () => {},
  isGameStarted: false,
  setGameStarted: () => {},
  rooms: [],
  setRooms: () => {},
};

export const GameContext = React.createContext(defaultState);
