const express = require('express');
const ytsr = require('ytsr');

const router = express.Router();

router.get('/', async (req, res) => {
    const searchResults = await ytsr('rickroll');
    res.json(searchResults);
});

module.exports = router;
