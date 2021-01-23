const fs = require("fs");
const express = require('express');
const Handlebars = require("handlebars");
const search = require('../common/search');

const router = express.Router();
const template = Handlebars.compile(fs.readFileSync(`${__dirname}/template.html`, 'utf8').toString());

router.get('/', async (req, res, next) => {
    try {
        const searchQuery = (req.query.q || '').trim();
        const results = searchQuery ? 
            await search.searchOnYoutube(searchQuery) : 
            ({search: '', items: []});
            
        res.send(template({}));
    } catch (e) {
        console.error(e);
        next(e);
    }
});

module.exports = router;
