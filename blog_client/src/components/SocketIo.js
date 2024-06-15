import io from "socket.io-client"

export const socket = io("https://blogify-blog-server.onrender.com", {
    reconnection: true,
    withCredentials: true
})



