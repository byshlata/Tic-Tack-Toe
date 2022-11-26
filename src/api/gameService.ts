/* eslint-disable */
import { Socket } from 'socket.io-client';

import { PlayMatrixType, StartGameType } from 'types';

class GameService {
  public async joinGameRoom(socket: Socket, roomId: string): Promise<{bool: true, rooms: any[] }> {
    return new Promise((rs, rj) => {
      socket.emit('join_game', { roomId });
      socket.on('room_joined', ({rooms}) => rs({bool: true, rooms }));
      socket.on('room_join_error', ({ error }) => rj(error));
    });
  }

  public async updateGame(socket: Socket, gameMatrix: PlayMatrixType) {
    socket.emit('update_game', { matrix: gameMatrix });
  }

  public async onGameUpdate(socket: Socket, listener: (matrix: PlayMatrixType) => void) {
    socket.on('on_game_update', ({ matrix }) => listener(matrix));
  }

  public async onStartGame(socket: Socket, listener: (options: StartGameType) => void) {
    socket.on('start_game', listener);
  }

  public async gameWin(socket: Socket, message: string) {
    socket.emit('game_win', { message });
  }

    public async onGameWin(socket: Socket, listener: (message: string) => void) {
        socket.on('on_game_win', ({ message }) => listener(message));
    }
}

export const GameServiceInstance = new GameService();
