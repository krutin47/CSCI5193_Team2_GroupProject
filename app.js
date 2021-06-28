/**
 * @file Root file for the backend of the Application
 * @author Team 2
*/

//importing the Components and required Modules
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const sendMail = require('./utils/util.email.js');

// const mongoose = require('mongoose');

var app = express();
const port = process.env.PORT || 5000;

require('dotenv').config();

app.use(cors());
app.use(express.json());

// establishing mongo atlas connections
// mongoose.connect('',
//                   { useNewUrlParser: true, useCreateIndex: true}
//                 );
// const connection = mongoose.connection;

// connection.once('open', () => {
//   console.log("MongoDB database connection established successfully");
// })

// Routes to all the APIs
//const userRouter = require('./api/profileManagement');
//app.use('/user', userRouter);

// sendMail.forgotPassword(process.env.EMAIL,'123');


app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));
