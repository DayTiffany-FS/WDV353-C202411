const express = require('express');
const router = express.Router();

`localhost:3000/api`;
router.get('/', (req, res) => {
    res.status(200).json({message: 'From the API'});
});

`localhost:3000/api/:city`;
router.get('/:city', (req, res) => {
    const city = req.params.city;
    console.log('params >>>', city);
    res.status(200).json({message: 'From the API'});
});

router.post('/', (req, res) => {
    console.log('Request body >>>', req.body);
    const {data} = req.body;
    res.status(200).json({message: 'We got the request', data});
});

module.exports = router;