// eslint-disable-next-line import/no-extraneous-dependencies
import { DefaultEventsMap } from '@socket.io/component-emitter';
import { io, Socket } from 'socket.io-client';

class SocketService {
  public socket: Socket | null = null;

  public connect(url: string): Promise<Socket<DefaultEventsMap, DefaultEventsMap>> {
    return new Promise((resolve, reject) => {
      this.socket = io(url);

      if (!this.socket) {
        reject();
      }
      this.socket.on('connect', () => {
        resolve(this.socket as Socket);
      });

      this.socket.on('connection_error', (error: any) => {
        reject(error);
      });
    });
  }
}

export const SocketServiceInstance = new SocketService();
