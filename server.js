import { NewsArticlesRoutes } from './src/routes/articles';
import { AuthRoutes } from './src/routes/auth';
import { PassportService } from './src/services/passport.service';
import { UsersService } from './src/services/users.service';
import { mongoServer, mongoDb } from './config/config.json';

const express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require("morgan"),
    path = require('path'),
    fs = require('fs'),
    passport = require('passport'),
    app = express(),
    router = express.Router(),
    port = 3000,
    logfile = fs.createWriteStream(path.join(__dirname, "/apilog.txt")),
    mongoose = require('mongoose');

app.use(passport.initialize());
app.use(passport.session());
const passportservice = new PassportService(passport);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const userService = new UsersService();

const articleRoutes = new NewsArticlesRoutes(userService);
const authRoutes = new AuthRoutes(userService);

app.use(morgan('common', { stream: logfile }));
app.use('/news', articleRoutes.articlesRouter);
app.use('/auth', authRoutes.authRouter);


//error handler
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send('Error occured while fetching data ' + err);
});


app.listen(port, () => {
    console.log('API Server Listening on port ' + port + '!')
});

//Mongo Connection 
mongoose.connect(`mongodb://${mongoServer}/${mongoDb}`, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (ex) => {
    console.log(`Mongo connection error ${ex}`);
})
db.once('open', () => {
    console.log('Connected to MongoDB');
})


