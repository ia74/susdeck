import { Socket } from 'socket.io';

export default interface C2SEvent {
    event: string,
    callback: (socket: Socket, args: Array<string>) => string
}