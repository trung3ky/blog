import { createContext, useRef } from "react";
import {io} from 'socket.io-client'

export const socketContext = createContext()

export function SocketProvider({children}) {
    const ENDPOINT = 'ws://localhost:8900'

    const socket = useRef(io(ENDPOINT, { transports : ['websocket']}))

    return(
        <socketContext.Provider value={socket} >
            {children}
        </socketContext.Provider>
    )
}