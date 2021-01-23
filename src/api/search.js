const express = require('express');
const ytsr = require('ytsr');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        console.log('Params: ', req.query);

        const searchResults = await ytsr(`${req.query.q || 'rickroll'}, this week`);
        const simplifiedSearchResults = searchResults.items        
        .filter(o => (o.uploadedAt || '').indexOf('day') !== -1)
        .map(o => {
            const daysAgo = parseInt(o.uploadedAt);
            const quality = 1.0 * o.views / daysAgo;

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
                daysAgo: daysAgo,
                quality: quality,
                original: o
            };
        })
        .sort((a, b) => b.quality - a.quality);
        res.json(simplifiedSearchResults);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

module.exports = router;
