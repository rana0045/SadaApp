import mongoose from "mongoose";


const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    author: {
        typeof: String,
    }
}, {
    timestamps: true,
})

const Article = mongoose.models.Article || mongoose.model('Article', articleSchema)
export default Article