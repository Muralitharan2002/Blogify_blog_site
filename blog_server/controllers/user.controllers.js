require('dotenv').config()
const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const blogModel = require('../models/blog.model')
const uploadImage = require('../utils/uploadImage')
const main = require('../index')


const signup = async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body
        // console.log({ firstname, lastname, email, password })

        const exist = await userModel.findOne({ email })

        const hashPassword = await bcrypt.hash(password, 10)

        if (!exist) {
            await userModel.create({ firstname, lastname, email, password: hashPassword })
            return res.json({ message: "user created", status: "success" })
        }

        return res.json({ message: "user already exist", status: "failed" })

    } catch (err) {
        return res.status(500).json({ message: "user signup error", Error: err.message, status: "error" })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = await req.body

        const exist = await userModel.findOne({ email })

        if (!exist) return res.json({ message: "You not have an account ! go to signup page", status: "failed" });

        const hashPassword = await bcrypt.compare(password, exist.password)

        if (!hashPassword) return res.json({ message: "Invaild Crendials", status: "failed" })

        const token = jwt.sign(
            { _id: exist._id, firstname: exist.firstname, lastname: exist.lastname },
            process.env.JWT_KEY
        )

        const authId = exist?._id
        const firstname = exist?.firstname
        const lastname = exist?.lastname

        res.cookie("token", token, {
            secure: true,
            sameSite: "none",
            httpOnly: true
        })

        return res.json({ message: "sign in successfully", status: "success", authId, firstname, lastname })

    } catch (err) {
        console.log("while user login err", err.message)
        return res.status(500).json({ message: "while user login err", status: "error", Error: err.message })
    }
}

// const getauth = async (req, res) => {
//     try {
//         const { _id } = req.authuser

//         const user = await userModel.findOne({ _id }, { firstname: 1, lastname: 1 })

//         if (!user) return res.json({ message: "login user not found", status: "failed" })

//         return res.json({ message: "authuser gotted", user, status: "success" })
//     } catch (err) {
//         return res.json({ message: "while getauth err", status: "error", Error: err.message })
//     }
// }

const signout = async (req, res) => {
    try {
        const { _id } = req.authuser
        // console.log(_id)

        if (_id) {
            res.clearCookie("token")
            return res.json({ message: "logout successfully", status: "success" })
        }

        return res.json({ message: "logout function failed", status: "error" })

    } catch (err) {
        return res.status(500).json({ message: "Error while signout", status: "error", Error: err.message })
    }
}

const create = async (req, res) => {
    try {
        const { _id, firstname, lastname } = req.authuser
        const { title, category, content } = req.body;
        const file = req.file?.path
        // console.log({ title, category, content, file })

        const userBlog = new blogModel({
            bloggerId: _id,
            firstname,
            lastname,
            title,
            category,
            content,
            Image: file ? await uploadImage(file) : "https://res.cloudinary.com/dr1behckb/image/upload/v1717166457/noImage_tmnr3v.jpg"
        })

        // console.log(userBlog)

        await userBlog.save()

        return res.json({ message: "Blog Created", status: "success" })

    } catch (err) {
        return res.status(500).json({ message: "while create blog err", status: "error", Error: err.message })
    }
}

const publicBlogs = async (req, res) => {
    try {
        const query = req.query.post;
        let blogs;

        if (query) {
            blogs = await blogModel.find({ $text: { $search: query } })

            return res.send(blogs)
        } else {
            blogs = await blogModel.find()
            // if (!blogs) return res.json({ message: "Blogs not post yet", status: "failed" })
            return res.json({ message: "getAll public blogs", status: "success", blogs })
        }
    } catch (err) {
        return res.status(500).json({ message: "while getting publicblog err", status: "error", Error: err.message })
    }
}

const AuthBlogs = async (req, res) => {
    try {
        const { _id } = req.authuser;

        if (!_id) return res.json({ message: "while getting Authblogs error", status: "error" })

        const blogs = await blogModel.find({ bloggerId: _id })
        // if (!blogs) return res.json({ message: "Blogs not post yet", status: "failed" })
        return res.json({ status: "success", blogs })

    } catch (err) {
        return res.status(500).json({ message: "while getting publicblog err", status: "error", Error: err.message })
    }
}

const post = async (req, res) => {
    try {
        const { _id } = req.authuser
        const { id } = req.params

        if (!_id) return res.json({ message: "auth user not found", status: "failed" })

        const data = await blogModel.findOne({ _id: id })

        if (data) return res.json({ status: "success", data })

        return res.json({ message: "post not found", status: "error", Error: err.message })

    } catch (err) {
        return res.status(500).json({ message: "while getting Post err", status: "error", Error: err.message })
    }
}

const drop = async (req, res) => {
    try {
        const { _id } = req.authuser
        const { blogId } = req.query

        if (!_id && !blogId) return res.json({ message: "auth user not found", status: "failed" })


        const authuserBlogs = await blogModel.findOneAndDelete({ bloggerId: _id, _id: blogId })

        if (!authuserBlogs) return res.json({ message: "authuser blog not found", status: "failed" })

        return res.json({ message: "Deleted", status: "success" })

    } catch (err) {
        return res.status(500).json({ message: "while deleting blog Error", status: "error", Error: err.message })
    }
}

const update = async (req, res) => {
    try {
        const { _id, firstname, lastname } = req.authuser
        const { blogId } = req.query

        const { title, category, content } = req.body
        const Image = req.file?.path

        // console.log({ title, category, content, Image, blogId, _id, firstname, lastname })

        if (!_id && !blogId) return res.json({ message: "auth user not found", status: "failed" })

        const ExistingBlog = await blogModel.findOne({ _id: blogId, bloggerId: _id })


        if (title === ExistingBlog.title && content === ExistingBlog.content && category === ExistingBlog.category && !Image) {
            return res.json({ message: "you nothing update!", status: "failed" });
        }

        ExistingBlog.title = title
        ExistingBlog.category = category
        ExistingBlog.content = content
        ExistingBlog.Image = Image ? await uploadImage(Image) : ExistingBlog.Image

        await ExistingBlog.save()

        return res.json({ message: "Blog updated", status: "success" });

    } catch (err) {
        return res.status(500).json({ message: "while updating Post err", status: "error", Error: err.message })
    }
}


const Reaction = async (req, res) => {
    try {
        const { _id } = req.authuser

        if (!_id) return res.json({ message: "authuser not found", status: "failed" })

        const { blogId } = req.query

        const blog = await blogModel.findByIdAndUpdate({ _id: blogId }, { $addToSet: { Likes: _id } }, { new: true })

        main.io.emit("Like_Post", blog.Likes)

        return res.json({ status: "success", Likes: blog.Likes })



    } catch (err) {
        return res.status(500).json({ message: "Error in Reaction process", status: "error", error: err.message })
    }
}

const RemoveReaction = async (req, res) => {
    try {
        const { _id } = req.authuser

        if (!_id) return res.json({ message: "authuser not found", status: "failed" })

        const { blogId } = req.query

        const blog = await blogModel.findByIdAndUpdate({ _id: blogId }, { $pull: { Likes: _id } }, { new: true })

        main.io.emit("unLike_Post", blog.Likes)

        return res.json({ status: "success", Likes: blog.Likes })

    } catch (err) {
        return res.status(500).json({ message: "Error in Reaction process", status: "error", error: err })
    }
}

const AddComment = async (req, res) => {
    try {
        const { _id, firstname, lastname } = req.authuser

        if (!_id) return res.json({ message: "authuser not found", status: "failed" })

        const { blogId } = req.query
        const { text } = req.body

        const blog = await blogModel.findOne({ _id: blogId })

        blog.Comments.unshift({
            text,
            postedBy: {
                bloggerId: _id,
                firstname,
                lastname
            }
        })

        await blog.save()

        main.io.emit("postComments", blog.Comments)

        return res.json({ message: "commet added", status: "success", comments: blog.Comments })

    } catch (err) {
        return res.status(500).json({ message: "server Error in Addcomment process", status: "error", Error: err.message })
    }
}

module.exports = { signup, login, signout, create, publicBlogs, post, AuthBlogs, drop, update, Reaction, RemoveReaction, AddComment }