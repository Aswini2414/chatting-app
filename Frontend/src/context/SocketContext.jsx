import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuthContext } from './AuthContext'; 
import io from "socket.io-client";
import { URL } from "../helper/helper.js";


const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { authUser } = useAuthContext();

    useEffect(() => {
        if (authUser) {
            const socket = io(`${URL}`, {
                query: {
                    userId:authUser._id,
                },
            });
            setSocket(socket);

            socket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users);
            })
            return () => socket.close();
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser]);

    return <SocketContext.Provider value={{socket,onlineUsers}}>{children}</SocketContext.Provider>
}

