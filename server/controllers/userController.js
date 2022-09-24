const Post = require("../models/posts");
const upload = require("../utils")


const mongoose = require("mongoose");


exports.createPost = async (req,res) => {
    const {title,description,userId} = req.body;


    let images = [];
    try {
    if(req.files) {
        console.log(req.files.length)
        for(i = 0; i <= req.files.length-1; i++) {
            paths = req.files[i].path;
            images.push(paths)

        }
    }

    const post = await Post({title,description,userId: mongoose.Types.ObjectId("5f97c071bad24d1a81b25dd1"),images: images});


    post.save().then((result) => {
        console.log(result);
        res.send({status: res.statusCode, body: result})
    }).catch((err) => {
        console.log(err)
    })
    } catch(err) {
        console.log(err);
    }
}