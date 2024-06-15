import io from "socket.io-client"

export const socket = io("https://blogify-blog-server.vercel.app", {
    reconnection: true,
    withCredentials: true
})



