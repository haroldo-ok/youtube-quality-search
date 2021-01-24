const ytsr = require('ytsr');
const axios = require("axios");

module.exports.searchOnYoutube = async searchQuery => {
    console.log('Fetching search results...');
    const searchResults = await ytsr(`${searchQuery}, 1 month ago`, {limit: 300});
    const filteredSearchResults = searchResults.items
        .filter(o => o.author &&
            ((o.uploadedAt || '').indexOf('day') !== -1 || (o.uploadedAt || '').indexOf('week') !== -1));

    const authorURLs = [...new Set(filteredSearchResults.map(o => o.author.url))];

    console.log('Fetching author pages...');
    const countsPerAuthorURL = {};
    await Promise.all(authorURLs
        .map(url => new Promise(async (resolve, reject) => {
            console.log('Requesting author URL', url);
            try {
                const authorResponse = await axios.get(`${url}?gl=US&hl=en`);
                console.log(`Author page ${url} returned an response.`);
                const body = authorResponse.data;
                const parts = /subscriberCountText.*?(\d+\.?\d*\w*)/g.exec(body);

                const countText = parts ? parts[1] : '???';
                countsPerAuthorURL[url] = countText;
                resolve(countText);
            } catch (err) {
                console.error(`Author page ${url} returned an error`, err);
                console.log('Received author page', url);
                resolve('**ERROR**');
            }
        })));

    console.log('Assembling final results...');
    const simplifiedSearchResults = filteredSearchResults.map(o => {
        const daysAgoNumericPart = parseInt(o.uploadedAt);
        const daysAgoMultiplier = o.uploadedAt.indexOf('week') !== -1 ? 7 : 1;
        const daysAgo = daysAgoNumericPart * daysAgoMultiplier;

        const subscribersText = countsPerAuthorURL[o.author.url];
        const numericPart = parseFloat(subscribersText);
        const multiplier = subscribersText.indexOf('K') !== -1 ? 1000.0
            : subscribersText.indexOf('M') !== -1 ? 1000000.0
                : subscribersText.indexOf('G') !== -1 ? 1000000000.0
                    : 1.0;
        const subscribersCount = isNaN(numericPart) ? -1 : numericPart * multiplier;

        const quality = subscribersCount <= 0 ?
            0 : 100.0 * o.views / subscribersCount / daysAgo;

        return {
            title: o.title,
            url: o.url,
            thumbnail: o.bestThumbnail,
            author: {
                name: o.author.name || '**Unknown**',
                avatar: o.author.bestAvatar,
                subscribersText,
                subscribersCount
            },
            description: o.description,
            views: o.views,
            duration: o.duration,
            uploadedAt: o.uploadedAt,
            daysAgo,
            quality
        };
    })
    .sort((a, b) => b.quality - a.quality);

    const finalResult = {
        search: searchQuery,
        resultCount: simplifiedSearchResults.length,
        items: simplifiedSearchResults
    };
    return finalResult;
};

