import type { ReactNode } from "react"
import { createContext, useContext } from "react"
import type { Socket } from "socket.io-client"

// This file is setting up the types nad contest with the socket.io client

type SocketProviderType = {
    socket: Socket  | undefined;
    children: ReactNode;
}

const context = createContext<Socket | undefined>(undefined);

export function useSocket() {
    return useContext(context);
}

// We will use this provider in app/root.tsx to wrap the <Outlet /> component.
export function SocketProvider({ socket, children }: SocketProviderType) {
    return <context.Provider value={socket}>{children}</context.Provider>;
}
