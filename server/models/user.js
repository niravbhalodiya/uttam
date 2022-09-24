const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: "Posts"
    }],
    // profilePic: {
    //     type: String,
    // },
    points: {
        type: Number,
    },
    role:{
        type: String,
        required: true,
    }
},{timestamps:true})


module.exports = mongoose.model("User",userSchema);