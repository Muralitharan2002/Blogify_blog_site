const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema({
    bloggerId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    Image: {
        type: String,
        required: true,
    }
}, { timestamps: true })

blogSchema.index({ title: "text", content: "text" })

const blogModel = mongoose.model("blogPost", blogSchema)

module.exports = blogModel