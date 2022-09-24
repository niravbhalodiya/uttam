const Post = require("../models/posts");
const upload = require("../utils")

let userModel = require('../models/user');
let bcrypt = require('bcrypt');


const mongoose = require("mongoose");


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

            const post = await Post({ title, description, userId: mongoose.Types.ObjectId("5f97c071bad24d1a81b25dd1"), images: images,userId: req.user._id});
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