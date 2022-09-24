const userModel = require("../models/user")
let bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');


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
// 