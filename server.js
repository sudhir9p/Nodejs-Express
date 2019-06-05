import { NewsArticlesRoutes } from './src/routes/routes';

const express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require("morgan"),
    path = require('path'),
    fs = require('fs'),
    app = express(),
    router = express.Router(),
    port = 3000,
    logfile = fs.createWriteStream(path.join(__dirname, "/apilog.txt")),
    mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const routes = new NewsArticlesRoutes(router);
routes.getRoutes();
app.use(morgan('common', { stream: logfile }));
app.use('/', router);


//error handler
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send('Error occured while fetching data ' + err);
});


//Mongo Connection 
mongoose.connect('mongodb://localhost:27017/articledb', { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
    console.log('Connected to MongoDB')

    app.listen(port, function () {
        console.log('API Server Listening on port ' + port + '!')
    });
})


