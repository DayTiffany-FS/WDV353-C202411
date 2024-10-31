const express = require('express');
const app = express();
const router = require('./routes');

app.use(express.json());

`localhost:3000/`;
app.get('/', (req, res) => {
    console.log('GET');
    res.json({message: 'Hello World!'});
});

`localhost:300/api`;
app.use('/api', router);

module.exports = app;