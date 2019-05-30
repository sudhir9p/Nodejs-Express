import { NewsArticlesRoutes } from './src/routes/routes';

const express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require("morgan"),
    path = require('path'),
    fs = require('fs'),
    app = express(),
    port = 3000,
    logfile = fs.createWriteStream(path.join(__dirname, "/apilog.txt"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.listen(port, () => {
    console.log(`App listening to ${port}....`)
    console.log('Press Ctrl+C to quit.')
});

const routes = new NewsArticlesRoutes(app);
routes.getRoutes();

app.use(morgan('common', {stream: logfile}));

//error handler
app.use((err, req, res, next) => {
    console.log(err);
    res.send('Error occured while fetching data');
    res.status(500);
});


