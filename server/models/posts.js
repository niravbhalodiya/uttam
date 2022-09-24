const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const postSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    images: [{
        type: String,
        required: true,
    },],
    description: {
        type: String,
        required: true,
    },
    // postedBy: {
    //     type: String,
    //     required: true,
    // },
    postedById: [{
        type: Schema.Types.ObjectId,
        ref: "Posts"
    }],
    comments: [{
        type: String,
        ref: "Comments"
    }],
    solutions : [{
        // type: String,
        ref: "Solutions"
    }],
    upVotes:{
        type: Number,
    },
    downVotes:{
        type: Number,
    },
},{timestamps: true})


module.exports = mongoose.model("Post",postSchema);