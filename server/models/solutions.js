const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const solutionSchema = new Schema({
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
    status : {
        type: String,
        required: true,
    }
    
},{timestamps:true});


module.exports = mongoose.model('Comment', commentSchema);