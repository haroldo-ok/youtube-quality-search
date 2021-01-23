const express = require('express');
const ytsr = require('ytsr');
const axios = require('axios');
const search = require('../common/search');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        console.log('Params: ', req.query);
        const searchQuery = req.query.q || 'rickroll';
        const results = await search.searchOnYoutube(searchQuery);
        res.json(results);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

module.exports = router;
