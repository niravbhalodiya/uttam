//Package Imports

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

//Local Imports
const userRoutes = require("./router/userRoutes")


app.use(bodyParser.urlencoded({extended: true}));



app.use(userRoutes);



mongoose.connect(process.env.MONGO_URL).then((res) => {
    app.listen(process.env.PORT);
    console.log(`DAatabse connected and listening on port ${process.env.PORT}`);

}).catch((err) => {
    console.log(err);
})