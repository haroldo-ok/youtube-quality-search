const express = require('express');
const ytsr = require('ytsr');
const axios = require('axios');
const search = require('../common/search');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        res.send("<H1>Hello, world!");
    } catch (e) {
        console.error(e);
        next(e);
    }
});

module.exports = router;
