import { NewsArticlesRoutes } from './src/routes/routes';

const express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require("morgan"),
    path = require('path'),
    fs = require('fs'),
    app = express(),
    router = express.Router(),
    port = 3000,
    logfile = fs.createWriteStream(path.join(__dirname, "/apilog.txt"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.listen(port, () => {
    console.log(`App listening to ${port}....`)
    console.log('Press Ctrl+C to quit.')
});

const routes = new NewsArticlesRoutes(router);
routes.getRoutes();
app.use(morgan('common', { stream: logfile }));
app.use('/', router);


//error handler
app.use((err, req, res, next) => {
    res.status(500).send('Error occured while fetching data');
});


