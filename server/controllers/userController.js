let bcrypt = require('bcrypt');
const {deleteFile} = require("../utils")


const Post = require("../models/posts");
const upload = require("../utils")
let userModel = require('../models/user');


const mongoose = require("mongoose");

//Creates new post
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
        if (req.user) {

            const post = await Post({ title, description, userId: mongoose.Types.ObjectId("5f97c071bad24d1a81b25dd1"), images: images, userId: req.user._id });
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
        
    }
}