const express = require('express');
const ytsr = require('ytsr');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {        
        const searchResults = await ytsr('rickroll, this week');
        const simplifiedSearchResults = searchResults.items
        .filter(o => (o.uploadedAt || '').indexOf('day') !== -1)
        .map(o => {
            return {
                title: o.title,
                url: o.url,
                thumbnail: o.bestThumbnail,
                author: {
                    name: o.author && o.author.name || '**Unknown**',
                    avatar: o.author && o.author.bestAvatar
                },            
                description: o.description,
                views: o.views,
                duration: o.duration,
                uploadedAt: o.uploadedAt,
                daysAgo: parseInt(o.uploadedAt),
                original: o
            };
        });
        res.json(simplifiedSearchResults);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

module.exports = router;
