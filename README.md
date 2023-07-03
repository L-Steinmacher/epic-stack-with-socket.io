# Epic Stack with Socket.IO
This is a simple example of Socket.IO setup to use web sockets. Once logged into the app the users page has a button that pings the socket which you can see in the network tab of the browser.

The socket uses two packages, `socket.io` as well as `socket.io-client` and uses React hooks `useState` and `useContext`.

Additionally there are a few basic tests written for the socket that are written with Vitest which may be run with:

```bash
npx vitest app/utils/socket.test.ts run
```

There are a few points of interest for the app.

1) State and useEffects are in place in `app/root.tsx ` to handle the socket connection as well as we wrapped the `<Outlet>` in our context provider, `SocketProvider`.
2) `app/routes/users+/$username.tsx` we just have a button to trigger a call to test the socket.
3) In `app/utils/contex.tsx` we sets up the types and context for the Socket.IO client and provides the `socket` value to the context.
4) `app/utils/socket.test.ts` houses basic texts written with Vitest to show the socket actually works.
5)  `server/index.ts` we initialize the Socket,IO for the server and listen for client connections, then log the connection information. In charge of sending and receiving events between the server and the client.

For more info on [Socket.IO](https://socket.io/docs/v4/) here's a link to the official docs.

