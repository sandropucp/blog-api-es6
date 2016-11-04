import mongoose from 'mongoose';

var CommentSchema = new mongoose.Schema({
    body: {
        type: String,
        require: true,
        minlength: 5
    },
    author: {
        type: mongoose.Schema.ObjectId,
        require: true,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Comment', CommentSchema);
