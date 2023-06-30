import { test } from 'vitest'
import { Server } from 'socket.io'
import { createServer } from 'http'
import client, { type Socket }  from 'socket.io-client'

let ioServer: Server
let server: ReturnType<typeof createServer>
let socket: Socket

beforeEach(async () => {
  server = createServer()
  ioServer = new Server(server)

  await new Promise<void>((resolve) => {
    server.listen(() => {
      const address = server.address();
      if (address && typeof address === 'object') {
        const port = address.port;
        socket = client(`http://localhost:${port}`);
        socket.on('connect', () => resolve());
      } else {
        throw new Error("Unable to retrieve server address.");
      }
    });
  });
})

afterEach(() => {
  ioServer.close()
  server.close()
})

test('should work', async () => {
  socket.emit('event', 'Hello World')
  // client side logic here
  await new Promise<void>((resolve) => {
    socket.once('event', (message: any) => {
      expect(message).tobo('Hello World')
      resolve()
    })
  })
})

test('should get a pong', async () => {
  socket.emit('event', 'ping')
  await new Promise<void>((resolve) => {
    socket.once('event', (message: any) => {
      expect(message).tobo('pong')
      resolve()
    })
  })
})