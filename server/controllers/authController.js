const userModel = require("../models/user")
let bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
let crypto = require('crypto');
const {sendMail} = require("../utils");


exports.login = async (req, res) => {
    const { email, password } = req.body;


    userModel.findOne({ email: email })
        .then(async (user) => {
            const isCorrectPass = await bcrypt.compare(password, user.password);
            console.log(token)
            if (isCorrectPass) {
                var token = await jwt.sign({user: user },"djsfnlakefnslefnswlkgnwrsefnwl");
                req.session.isLoggedIn = true;
                req.session.user = user;
                await req.session.save();
                res.send({token: token})
            } else {
                res.send({message: "Error"});
            }
        })
        .catch((err) => {
            res.send({message: "failed"})
            console.log(err)
        });
}

exports.signUp = async (req, res) => {
    const { email, password, userName, name } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    userModel.findOne({ email: email })
        .then(async (user) => {
            if (user) {
                res.send("User already exists with this email");
            } else {
                try {
                    var token = await jwt.sign({user: user },"djsfnlakefnslefnswlkgnwrsefnwl");
                    const newUser = new userModel({
                        email,
                        password: hashedPassword,
                        userName,
                        name,
                        points: 0,
                        role: "user"
                    });
                    newUser.save();
                    res.send({token: token});
                } catch (error) {
                    res.send(`Unable to create user: ${error}`);
                }

            }
        })
        .catch((err) => {
            res.send("Backend error");
        });
}

exports.askResetPassword = async (req, res) => {
    const { email } = req.body;
    userModel.findOne({ email: email })
        .then(async (user) => {
            if (user) {
                // generate random token
                const token = crypto.randomBytes(20).toString('hex');
                
                // Put token in mongo
                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 3600000;
                await user.save();

                // generate reset link
                const link = `http://${process.env.URL}/reset/${token}`;

                // send email
                //sendMail(email, "Reset Password", `Click on the link to reset your password: ${link}`);
                res.send({message: "Email sent"});

            } else {
                res.send({message: "User does not exist"});
            }
        }).catch((err) => {
            res.send({message: "Backend error: " + err});
        });
}

exports.resetPassword = async (req, res) => {
    const { password } = req.body;
    const {token} = req.params;

    userModel.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } })
        .then(async (user) => {
            if (user) {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);
                user.password = hashedPassword;
                user.resetPasswordToken = undefined;
                user.resetPasswordExpires = undefined;
                await user.save();
                // sendMail(user.email, "Password Changed", "Your password has been changed");
                res.send({message: "Password reset successful"});
            } else {
                res.send({message: "Password reset link is invalid or has expired"});
            }
        }).catch((err) => {
            res.send({message: "Backend error: " + err});
        });
}

exports.postLogout = async (req,res) => {
    req.session.destroy((err) => {
        res.send({message: "success"})
      });
}