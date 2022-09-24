//Package Imports

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require('express-session');
const MongoDBStore = require("connect-mongodb-session")(session);
require("dotenv").config();

const app = express();

//Local Imports
const userRoutes = require("./router/userRoutes")
const adminRoutes = require("./router/adminRoutes")
const authRoutes = require("./router/authRoutes")
const User = require("./models/user");

const store = new MongoDBStore({
    uri: process.env.MONGO_URL,
    collection: "sessions",
});


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));



//Implementation of session
app.use(
    session({
        secret: "Its complicated",
        resave: false,
        saveUninitialized: false,
        store: store,
    })
);

// app.use((req, res, next) => {
//     res.locals.isAuthenticated = req.session.isLoggedIn;
//     res.locals.csrfToken = req.csrfToken();
//     next();
// });

app.use((req, res, next) => {
    //   console.log();
    if (!req.session.user) {
        return next();
    }
    User.findById(req.session.user._id)
        .then((user) => {
            req.user = user;
            next();
        })
        .catch((err) => console.log(err));
});




//Routes
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);




mongoose.connect(process.env.MONGO_URL).then((res) => {
    app.listen(process.env.PORT);
    console.log(`DAatabse connected and listening on port ${process.env.PORT}`);

}).catch((err) => {
    console.log(err);
})