/**
 * @file Root file for the backend of the Application
 * @author Team 2
 */

//importing the Components and required Modules
const express = require('express')
const bodyParser = require('body-parser');
const debug = require('debug')('products:server');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
require('./config/db.config');
// const mongoose = require('mongoose');
const productAPI = require('./api/product.api');

const app = express();
const port = process.env.PORT || 3000;

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
app.use('/product', productAPI);

app.use(function(req, res, next) {
    res.status(404).send({ message: "URL not found", success: false });
});


var server = http.createServer(app);

server.listen(port);
server.on('listening', onListening);

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ?
        'pipe ' + addr :
        'port ' + addr.port;
    debug('Listening on ' + bind);
}