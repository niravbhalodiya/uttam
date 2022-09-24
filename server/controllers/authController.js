let transporter 

exports.login = async (req, res) => {
    const { email, password } = req.body;

    userModel.findOne({ email: email })
        .then(async (user) => {
            const isCorrectPass = await bcrypt.compare(password, user.password);

            if (isCorrectPass) {
                req.session.isLoggedIn = true;
                req.session.user = user;
                await req.session.save();
                res.send(true);
            } else {
                res.send(false);
            }
        })
        .catch(() => {
            res.send(false)
        });
}

exports.signUp = async (req, res) => {
    const { email, password, userName, name } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    userModel.findOne({ email: email })
        .then((user) => {
            if (user) {
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

