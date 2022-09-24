let bcrypt = require('bcrypt');
const {deleteFile} = require("../utils")


const Post = require("../models/posts");
const upload = require("../utils")
let userModel = require('../models/user');


const mongoose = require("mongoose");
const user = require("../models/user");
const { response } = require('express');

//Creates new post
exports.createPost = async (req, res) => {
    const { title, description } = req.body;
    const image = req.files;
    console.log(req.files)
    let images = [];
    try {
        if (image) {
            for (i = 0; i <= req.files.length -1; i++) {
                fileName = req.files[i].filename;
                imgPath = "uploads/" + fileName;
                images.push(imgPath)

            }
        }
        if (req.user) {

            const post = await Post({ title, description, images: images,userId: req.user._id, upVotes: 0, downVotes: 0 });
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


//fetch single post
exports.getEditPost = async (req, res) => {
    // const { title, description } = req.body;

    const postId = req.params.postId;

    const posts = await Post.findById(postId);
    res.send({ status: res.statusCode, data: posts });
}


//Edit post
exports.postEditPost = async (req, res) => {
    // const { title, description } = req.body;
    const postId = req.params.postId;
    const updatedTitle = req.body.title;
    const updatedDescription = req.body.description;
    
    
    try {
        let posts = await Post.findByIdAndUpdate(postId);

        posts.title = updatedTitle;
        posts.description = updatedDescription;
        res.send({message: "success"})

    } catch(err) {
        console.log(err);
        res.send({message: "some error occured"})
    }

}
//Delete single post
exports.postDeletePost = async (req,res) => {
    const postId = req.body.postId;
    try {
        const post = await Post.findById(postId);
        // console.log(post.images.length);
        for(i=0; i <= post.images.length -1;i++ ) {

            deleteFile(post.images[i])
        }
        
            // deleteFile("uploads/1664009659993.png")
        
        post.deleteOne({_id: postId});
        res.send({message: "success"})
    } catch (error) {
        console.log(error)
    }
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


exports.getAllPosts = async (req,res) => {
    const posts = await Post.find();

    res.send({status: res.send.statusCode, message: posts});
}

