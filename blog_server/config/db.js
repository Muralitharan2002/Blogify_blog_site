require("dotenv").config()
const mongoose = require('mongoose')

const dbConnect = () => {
    try {
        const url = process.env.DB_URL

        mongoose.connect(url);

        const con = mongoose.connection

        con.once("open", () => {
            console.log("database connected!")
        })
        con.on("error", () => {
            console.log("database connecting error!")
        })

    } catch (err) {
        console.log("database connention error", err.message)
    }
}

module.exports = dbConnect