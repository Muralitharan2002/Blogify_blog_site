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
    },
    Likes: [
        {
            type: mongoose.Types.ObjectId,
            ref: "user"
        }
    ],
    Comments: [
        {
            text: String,
            postedBy: {
                bloggerId: mongoose.Types.ObjectId,
                firstname: String,
                lastname: String
            },
            created: {
                type: Date,
                default: Date.now,
            }
        }
    ]
}, { timestamps: true })

blogSchema.index({ title: "text", content: "text" })

const blogModel = mongoose.model("blogPost", blogSchema)

module.exports = blogModel