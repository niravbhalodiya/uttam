const Post = require("../models/posts");
const Solution = require("../models/solutions");
const Comment = require("../models/comments");

const upload = require("../utils")

let userModel = require('../models/user');
let bcrypt = require('bcrypt');


const mongoose = require("mongoose");
const user = require("../models/user");

exports.getUser = async(req,res) => {
    const {userId} = req.params;
    try {
        let user = await userModel.findById(userId);
        // making sure that the password is not sent to the client 
        user.password = undefined;
        res.send({status: res.statusCode, body: user})
    } catch (error) {
        res.status(401).send({message: "Error getting user"})
    }
}

exports.createPost = async (req, res) => {
    const { title, description } = req.body;
    console.log(req.body.title);
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

            const post = await Post({ title, description, userId: mongoose.Types.ObjectId("5f97c071bad24d1a81b25dd1"), images: images,userId: req.user._id, upVotes: 0, downVotes: 0, status: "pending" });
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

exports.postSolution = async(req,res) => {
    const {postId, description} = req.body;
    // const {postId} = req.params;
    const userId = req.user._id;

    // create new entry for solution in posts
    const solution = await Solution({
        userId: userId, 
        description,
        postId,
        status: "pending",
        upVotes: 0,
        downVotes: 0,
        upVoters: [],
        downVoters: []
    });

    solution.save()
        .then((result) => {
            // add solution id to post
            Post.findByIdAndUpdate(postId, {$push: {solutions: result._id}})
                .then((result) => {
                    res.send({status: res.statusCode, message: "Solution Posted!"});
                })
                .catch((err) => {
                    res.status(401).send({message: "Error adding solution to post"});
                })
        })
        .catch((err) => {
            res.status(401).send({message: "Error posting solution"});
            console.log(err)
        })
}

exports.postComment = async(req,res) => {
    const {postId, description} = req.body;
    // const {postId} = req.params;
    const userId = req.user._id;

    // create new entry for solution in posts
    const comment = await Comment({
        userId: userId, 
        description,
        postId,
    });

    comment.save()
        .then((result) => {
            // add solution id to post
            Post.findByIdAndUpdate(postId, {$push: {comments: result._id}})
                .then((result) => {
                    res.send({status: res.statusCode, message: "Comment Posted!"});
                })
                .catch((err) => {
                    res.status(401).send({message: "Error adding solution to post"});
                })
        })
        .catch((err) => {
            res.status(401).send({message: "Error posting comment"});
            console.log(err)
        })
}

exports.upVote = async(req,res) => {
    const {postId} = req.body;
    const userId = req.user._id;

    const post = await Post.findById(postId);

    // check if user has already upvoted
    if(post.upVoters.includes(userId)) {
        res.send({status: res.statusCode, message: "User has already upvoted this post"})
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
                    res.status(401).send({message: "Error upvoting post"})
                    // console.log(err)
                })
        
    }
}

exports.downVote = async(req,res) => {
    const {postId} = req.body;
    const userId = req.user._id;

    const post = await Post.findById(postId);

    // check if user has already downvoted
    if(post.downVoters.includes(userId)) {
        res.send({status: res.statusCode, message: "User has already downvoted this post"})
    } else {
        // check if user has already upvoted
        if(post.upVoters.includes(userId)) {
            // remove user from upvoters
            post.upVoters = post.upVoters.filter((user) => user != userId);
            
            // decrese upvotes by 1
            post.upVotes -= 1;
        }
            // increase downvotes
            post.downVotes += 1;

            // add user to downvoters
            post.downVoters.push(userId);

            // save post
            post.save()
                .then((result) => {
                    res.send({status: res.statusCode, body: result, message: "Post downvoted"})
                })
                .catch((err) => {
                    res.status(401).send({message: "Error downvoting post"})
                    // console.log(err)
                })
    }
}

exports.upVoteSolution = async(req,res) => {
    const {solutionId} = req.body;
    const userId = req.user._id;

    let solution = await Solution.findById(solutionId);

    // check if user has already upvoted
    if(solution.upVoters.includes(userId)) {
        res.send({status: res.statusCode, message: "User has already upvoted this solution"})
    } else {
        // check if user has already downvoted
        if(solution.downVoters.includes(userId)) {
            // remove user from downvoters
            solution.downVoters = solution.downVoters.filter((user) => user != userId);
            
            // decrese downvotes by 1
            solution.downVotes -= 1;
        }
            // increase upvotes
            solution.upVotes += 1;

            // add user to upvoters
            solution.upVoters.push(userId);

            // save post
            solution.save()
                .then((result) => {
                    res.send({status: res.statusCode, body: result, message: "Solution upvoted"})
                })
                .catch((err) => {
                    res.status(401).send({message: "Error upvoting solution"})
                    // console.log(err)
                })
        
    }
}

exports.downVoteSolution = async(req,res) => {
    const {solutionId} = req.body;
    const userId = req.user._id;

    let solution = await Solution.findById(solutionId);

    // check if user has already downvoted
    if(solution.downVoters.includes(userId)) {
        res.send({status: res.statusCode, message: "User has already downvoted this solution"})
    } else {
        // check if user has already upvoted
        if(solution.upVoters.includes(userId)) {
            // remove user from upvoters
            solution.upVoters = solution.upVoters.filter((user) => user != userId);
            
            // decrese upvotes by 1
            solution.upVotes -= 1;
        }
            // increase downvotes
            solution.downVotes += 1;

            // add user to downvoters
            solution.downVoters.push(userId);

            // save solution
            solution.save()
                .then((result) => {
                    res.send({status: res.statusCode, body: result, message: "Solution downvoted"})
                })
                .catch((err) => {
                    res.status(401).send({message: "Error downvoting solution"})
                    // console.log(err)
                })
    }
}

exports.updateSolutionStatus = async(req,res) => {
    const {solutionId, status} = req.body;

    Solution.findByIdAndUpdate(solutionId, {status})
        .then((result) => {
            res.send({status: res.statusCode, message: "Solution status updated"})
        })
        .catch((err) => {
            res.status(401).send({message: "Error updating solution status"})
            // console.log(err)
        })
}