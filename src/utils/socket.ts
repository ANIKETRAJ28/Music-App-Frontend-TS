import { Socket } from "socket.io-client";

export function createJam(socket: Socket, id: string) {
  socket.emit("start jam", id);
}

export function addSongToQueue(socket: Socket, id: string, url: string) {
  socket.emit("add song", id, url);
}
