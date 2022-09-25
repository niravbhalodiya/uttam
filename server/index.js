//Package Imports

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require('express-session');
const MongoDBStore = require("connect-mongodb-session")(session);
require("dotenv").config();

const app = express();

//Local Imports
const userRoutes = require("./router/userRoutes")
const adminRoutes = require("./router/adminRoutes")
const authRoutes = require("./router/authRoutes")
const searchRoutes = require("./router/searchRoutes");
const dashboardRoutes = require("./router/dashboardRoutes");
const User = require("./models/user");

const upload = require("./utils")

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
// app.use('Content-Type', 'text/html');


//Implementation of session
// app.use(
//     session({
//         secret: "Its complicated",
//         resave: false,
//         saveUninitialized: false,
//         store: store,
//     })
// );

// app.use((req, res, next) => {
//     res.locals.isAuthenticated = req.session.isLoggedIn;
//     res.locals.csrfToken = req.csrfToken();
//     next();
// });

// app.use((req, res, next) => {
//     //   console.log();
//     if (!req.session.user) {
//         return next();
//     }
//     User.findById(req.session.user._id)
//         .then((user) => {
//             req.user = user;
//             next();
//         })
//         .catch((err) => console.log(err));
// });



app.use(upload.array("files",5))
//Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/dashboard", dashboardRoutes);

mongoose.connect(process.env.MONGO_URL).then((res) => {
    app.listen(process.env.PORT);
    console.log(`DAatabse connected and listening on port ${process.env.PORT}`);

}).catch((err) => {
    console.log(err);
})