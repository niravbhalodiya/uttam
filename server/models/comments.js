const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const commentSchema = new Schema({
    userId: {
        ref: "User",
        type: Schema.Types.ObjectId,
    },
    images: [{
        type: String,
        required: true
    }],
    description: {
        type: String,
        required: true
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    // comments: {
    //    replies: [
    //        {
    //         name: {
    //             type: String,
    //             required: true
    //         },
    //         email: {
    //             type: String,
    //             required: true
    //         },
    //         subject: {
    //             type: String,
    //             required: true
    //         },
    //         message: {
    //             type: String,
    //             required: true
    //         },
    //     }
    //    ]
    // }
    
},{timestamps:true});


module.exports = mongoose.model('Comment', commentSchema);