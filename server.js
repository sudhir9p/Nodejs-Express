import { SourcesRoutes } from './src/sources/routes.js';

const express = require('express')

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('HELLO WORLD');
})

app.listen(port, () => {
    console.log(`App listening to ${port}....`)
    console.log('Press Ctrl+C to quit.')
});

const routes = new SourcesRoutes(app);
routes.getRoutes();


