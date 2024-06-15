const express = require('express')
const controller = require("../controllers/user.controllers")
const route = express.Router()
const authentication = require("../middleware/auth.middleware")
const upload = require("../utils/multer")


route.post("/signup", controller.signup)

route.post("/login", controller.login)

route.post("/signout", authentication, controller.signout)

// route.get("/auth", authentication, controller.getauth)

route.post("/create", authentication, upload.single("file"), controller.create)

route.get("/blogs", controller.publicBlogs)

route.get("/authblogs", authentication, controller.AuthBlogs)

route.get("/post/:id", authentication, controller.post)

route.delete("/drop", authentication, controller.drop)

route.put("/update", authentication, upload.single("file"), controller.update)

route.put("/Reaction", authentication, controller.Reaction)

route.put("/RemoveReaction", authentication, controller.RemoveReaction)

route.post("/PostComment", authentication, controller.AddComment)

module.exports = route