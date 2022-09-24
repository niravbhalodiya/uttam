const Post = require("../models/posts");
const upload = require("../utils")

let userModel = require('../models/user');
let bcrypt = require('bcrypt');


const mongoose = require("mongoose");
const user = require("../models/user");


exports.createPost = async (req, res) => {
    const { title, description } = req.body;

    let images = [];
    try {
        if (req.files) {
            // console.log(req.files.length)
            for (i = 0; i <= req.files.length - 1; i++) {
                paths = req.files[i].path;
                images.push(paths)

            }
        }
        if(req.user) {

            const post = await Post({ title, description, userId: mongoose.Types.ObjectId("5f97c071bad24d1a81b25dd1"), images: images,userId: req.user._id, upVotes: 0, downVotes: 0 });
            post.save().then((result) => {
                res.send({ status: res.statusCode, body: result })
            }).catch((err) => {
                console.log(err)
            })
        }


        
    } catch (err) {
        console.log(err);
    }
}



exports.editPost = async(req,res) => {
    const {title,description} = req.body;
    


    


}

exports.upVote = async(req,res) => {
    const {postId} = req.body;
    const {userId} = req.session.user._id;

    const post = await Post.findById(postId);

    // check if user has already upvoted
    if(post.upVoters.includes(userId)) {
        res.send({status: res.statusCode, body: "User has already upvoted this post"})
    } else {
        // check if user has already downvoted
        if(post.downVoters.includes(userId)) {
            // remove user from downvoters
            post.downVoters = post.downVoters.filter((user) => user != userId);
            
            // decrese downvotes by 1
            post.downVotes -= 1;
        }
            // increase upvotes
            post.upVotes += 1;

            // add user to upvoters
            post.upVoters.push(userId);

            // save post
            post.save()
                .then((result) => {
                    res.send({status: res.statusCode, body: result, message: "Post upvoted"})
                })
                .catch((err) => {
                    console.log(err)
                })
        
    }
}