require('dotenv').config()
const express = require('express')
const cors = require("cors")
const cookieParser = require("cookie-parser")
const dbConnect = require('./config/db')
const route = require('./routers/user.route')

const port = process.env.PORT || 8080

const app = express()

app.use(cors({
    origin: ["http://localhost:3000", "https://blogify-blog-site.vercel.app/"],
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

dbConnect()

app.get("/", (req, res) => {
    res.send("blog server running...")
})

app.use("/user", route)

app.listen(port, (err) => {
    if (err) console.log("Server Error", err)
    console.log("server running ....")
})


