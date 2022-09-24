const Post = require("../models/posts");
const upload = require("../utils")

let userModel = require('../models/user');
let bcrypt = require('bcrypt');


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



exports.login = async(req, res) => {
    const {email, password} = req.body;

    userModel.findOne({email:email})
    .then( async (user) => {
            const isCorrectPass = await bcrypt.compare(password, user.password);

            if(isCorrectPass){
                res.send(true);
            } else {
                res.send(false);
            }
        })
        .catch(() => {
            res.send(false)
        });
}

exports.signUp = async(req, res) => {
    const {email, password, userName, name} = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    userModel.findOne({email:email})
        .then((user) => {
            if(user){
                res.send("User already exists with this email");
            } else {
                try {
                    const newUser = new userModel({
                        email,
                        password: hashedPassword,
                        userName,
                        name,
                        points: 0,
                        role: "user"
                    });
                    newUser.save();
                    res.send("User created!");
                } catch (error) {
                    res.send(`Unable to create user: ${error}`);
                }
                
            }
        })
        .catch((err) => {
            res.send("Backend error");
        });
}

exports.askResetPassword = async(req, res) => {
    const {email} = req.body;

    userModel.findOne({email:email})
        .then((user) => {
            if(user){
                try {
                    // Send email to user with reset password link
                    
                } catch (error) {
                    res.send(`unable to send email: ${error}`);
                }
            } else {
                res.send("User does not exist");
            }
        })
        .catch((err) => {
            res.send("Backend error");
        });
}