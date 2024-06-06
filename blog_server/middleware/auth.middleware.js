const jwt = require("jsonwebtoken")

const middleware = async (req, res, next) => {
    try {
        const token = req.cookies.token

        if (!token) return res.json({ message: "auth token missing", status: "failed" })

        jwt.verify(token, process.env.JWT_KEY, (err, user) => {
            if (err) {
                return res.json({ message: "token verification failed", status: "error", Error: err.message })
            }

            req.authuser = user;
            next();
        })
    } catch (err) {
        return res.json({ message: "Error in authorization", Error: err.message, status: "error" })
    }
}

module.exports = middleware