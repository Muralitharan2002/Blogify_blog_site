require('dotenv').config()
const express = require('express')
const cors = require("cors")
const cookieParser = require("cookie-parser")
const dbConnect = require('./config/db')
const route = require('./routers/user.route')

const app = express()
const port = process.env.PORT || 8080

// const http = require("http")
// const server = http.createServer(app)
// const { Server } = require("socket.io")



app.use(cors({
    origin: ["https://blogify-blog-site.vercel.app", "http://localhost:3000"],
    // origin: "http://localhost:3000",
    credentials: true
}))


app.use(express.json())
app.use(cookieParser())

dbConnect()

app.get("/", (req, res) => {
    res.send("blog server running...")
})

app.use("/user", route)


const server = app.listen(port, (err) => {
    if (err) console.log("Server Error", err)
    console.log("server running ....")
})

const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
        origin: ["https://blogify-blog-site.vercel.app", "http://localhost:3000"],
        // origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true
    }
})

io.on("connection", (socket) => {
    console.log("server socket", socket.id)
})

exports.io = io
