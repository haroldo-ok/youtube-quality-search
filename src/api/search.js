const express = require('express');
const ytsr = require('ytsr');
const https = require("https");

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        console.log('Params: ', req.query);
        const searchQuery = req.query.q || 'rickroll';

        console.log('Fetching search results...');
        const searchResults = await ytsr(`${searchQuery}, 1 month ago`);
        const filteredSearchResults = searchResults.items        
            .filter(o => o.author && (o.uploadedAt || '').indexOf('day') !== -1);

        const authorURLs = [...new Set(filteredSearchResults.map(o => o.author.url))];

        console.log('Fetching author pages...');
        const authorPageContents = await Promise.all(authorURLs
            .map(url => new Promise((resolve, reject) => {
                console.log('Requesting author URL', url);
                https.request(url, {timeout: 3000}, res2 => {
                    console.log('Received author page', url);
                    resolve(res2);
                })
            })));

        console.log('Assembling final results...');
        const simplifiedSearchResults = filteredSearchResults.map(o => {
            const daysAgo = parseInt(o.uploadedAt);
            const quality = 1.0 * o.views / daysAgo;

            return {
                title: o.title,
                url: o.url,
                thumbnail: o.bestThumbnail,
                author: {
                    name: o.author.name || '**Unknown**',
                    avatar: o.author.bestAvatar
                },            
                description: o.description,
                views: o.views,
                duration: o.duration,
                uploadedAt: o.uploadedAt,
                daysAgo,
                quality,
                original: o
            };
        })
        .sort((a, b) => b.quality - a.quality);

        res.json({
            search: searchQuery,
            authorURLs,
            authorPageContents,
            items: simplifiedSearchResults
        });
    } catch (e) {
        console.error(e);
        next(e);
    }
});

module.exports = router;
