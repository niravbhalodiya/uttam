let userModel = require('../models/user');

exports.login = async(req, res) => {
    const {email, password} = req.body;
    userModel.findOne({email:email})
        .then((user) => {
            if(user.password === password){
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

    userModel.findOne({email:email})
        .then((user) => {
            if(user){
                res.send("User already exists with this email");
            } else {
                try {
                    const newUser = new userModel({
                        email,
                        password,
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