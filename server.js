const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
app.set('socket.io', io);
mongoose.connect("mongodb://localhost:27017/jobeet");
mongoose.Promise = global.Promise;
app.use('/uploads', express.static('uploads'));
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    next();
});

const jobRoutes = require('./api/routes/jobs');
const categoryRoutes = require('./api/routes/categories');
const userRoutes = require('./api/routes/user');

app.use('/jobs', jobRoutes);
app.use('/categories', categoryRoutes);
app.use("/user", userRoutes);

app.use((req, res, next)=>{
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    });
});

server.listen(3000);

