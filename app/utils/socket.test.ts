import { Server, type Socket as ServerSocket } from "socket.io";
import { createServer } from "http";
import Client, { type Socket as ClientSocket } from "socket.io-client";
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { resolve } from "path";

describe.concurrent("testing socket.io server and client", () => {
  let io: Server
  let serverSocket: ServerSocket
  let clientSocket: ClientSocket

  beforeAll(async () => {
    const httpServer = createServer();
    io = new Server(httpServer);
    await new Promise<void>((resolve) => {
      httpServer.listen(() => {
        const port = (httpServer.address() as any).port;
        clientSocket = Client(`http://localhost:${port}`);
        io.on("connection", (socket: ServerSocket) => {
          serverSocket = socket;
        });
        clientSocket.on("connect", () => resolve());
      });
    });
  });

  afterAll(() => {
    io.close();
    clientSocket.close();
  });

  test("should work", async () => {
    clientSocket.on("hello", (arg) => {
      expect(arg).toBe("world");
      resolve();
    });
    serverSocket.emit("hello", "world");
  });

  test("should work (with ack)", async () => {
    serverSocket.on("hi", (cb) => {
      cb("hola");
    });
    clientSocket.emit("hi", (arg: string) => {
      expect(arg).toBe("hola");
      resolve();
    });
  });
});