const fs = require("fs");
const express = require('express');
const Handlebars = require("handlebars");
const search = require('../common/search');
const { logger } = require("handlebars");

const router = express.Router();
const template = Handlebars.compile(fs.readFileSync(`${__dirname}/template.html`, 'utf8').toString());
const example = {
    "search": "sega genesis homebrew",
    "resultCount": 12,
    "items": [
      {
        "title": "Sega Xtreme Saturn Homebrew Competition | PandaMonium reviews every entry in the 2020 lineup",
        "url": "https://www.youtube.com/watch?v=m7e_NHTcgGQ",
        "thumbnail": {
          "url": "https://i.ytimg.com/vi/m7e_NHTcgGQ/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLDx509q2R1Dlv2QLNU0VRf4aT4czg",
          "width": 720,
          "height": 404
        },
        "author": {
          "name": "PandaMonium Reviews Every U.S. Saturn Game",
          "avatar": {
            "url": "https://yt3.ggpht.com/ytc/AAUvwnhasjot6qBnQPWTiDCH2xfJL3HDd4wn-_a04booWw=s68-c-k-c0x00ffffff-no-rj",
            "width": 68,
            "height": 68
          },
          "subscribersText": "1.07K",
          "subscribersCount": 1070
        },
        "description": "Good evening! Here is a quick and dirty look at all 21 ...",
        "views": 954,
        "duration": "22:31",
        "uploadedAt": "1 week ago",
        "daysAgo": 7,
        "quality": 12.7369826435247
      },
      {
        "title": "Sega Genesis has a New Game – The Cursed Knight",
        "url": "https://www.youtube.com/watch?v=4YsKhI_ip6k",
        "thumbnail": {
          "url": "https://i.ytimg.com/vi/4YsKhI_ip6k/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLAvF2NKoMGUYvh4Qmk1PhmvQwlMTA",
          "width": 720,
          "height": 404
        },
        "author": {
          "name": "Retro Gamer Boy",
          "avatar": {
            "url": "https://yt3.ggpht.com/ytc/AAUvwniPpRWMWCNTgf9Gw-L_b59apX7PQrh4YGYJGG6bEIY=s68-c-k-c0x00ffffff-no-rj",
            "width": 68,
            "height": 68
          },
          "subscribersText": "6.86K",
          "subscribersCount": 6860
        },
        "description": "The Sega Genesis and Mega Drive continue to get new ...",
        "views": 3759,
        "duration": "12:20",
        "uploadedAt": "5 days ago",
        "daysAgo": 5,
        "quality": 10.959183673469386
      },
      {
        "title": "SGDK Rocks   Sega Genesis Homebrew WIP",
        "url": "https://www.youtube.com/watch?v=fzXxJOgCbLc",
        "thumbnail": {
          "url": "https://i.ytimg.com/vi/fzXxJOgCbLc/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLApOiMW82sKx4u2RWpWfkc3DNiy6g",
          "width": 720,
          "height": 404
        },
        "author": {
          "name": "Greg Gallardo",
          "avatar": {
            "url": "https://yt3.ggpht.com/ytc/AAUvwnjBQgT4XC89bSSwt4pP2wuxRsKf6oZ4u5569Th5Bbg=s68-c-k-c0x00ffffff-no-rj",
            "width": 68,
            "height": 68
          },
          "subscribersText": "15",
          "subscribersCount": 15
        },
        "description": "Sound and hit-point testing. I'll probably try out a boss or two next. Made with SGDK 1.60.",
        "views": 21,
        "duration": "0:30",
        "uploadedAt": "2 weeks ago",
        "daysAgo": 14,
        "quality": 10
      },
      {
        "title": "MegaDoom port for SEGA Genesis. Genesis does!",
        "url": "https://www.youtube.com/watch?v=_309iKhSJHk",
        "thumbnail": {
          "url": "https://i.ytimg.com/vi/_309iKhSJHk/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLAJwq2GfUc5G2M3u2cqpb8o0jCCSg",
          "width": 720,
          "height": 404
        },
        "author": {
          "name": "biokrik",
          "avatar": {
            "url": "https://yt3.ggpht.com/ytc/AAUvwngAGbewl-Ghaxivtl2J3eA14f8d5qJF8C9l5C6l=s68-c-k-c0x00ffffff-no-rj",
            "width": 68,
            "height": 68
          },
          "subscribersText": "2.98K",
          "subscribersCount": 2980
        },
        "description": "Game uses FPGA inside of cartridge as expansion chip for processing.",
        "views": 1160,
        "duration": "1:15",
        "uploadedAt": "1 week ago",
        "daysAgo": 7,
        "quality": 5.560882070949185
      },
      {
        "title": "NEW and UPCOMING Sega Genesis / MegaDrive games worth your time - Irena Genesis Metal Fury (2021)",
        "url": "https://www.youtube.com/watch?v=64ilm8xTLwY",
        "thumbnail": {
          "url": "https://i.ytimg.com/vi/64ilm8xTLwY/hqdefault.jpg?sqp=-oaymwEjCOADEI4CSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLBt6dmLqay-5i8_p2-qnsMpTfwf-g",
          "width": 480,
          "height": 270
        },
        "author": {
          "name": "Me",
          "avatar": {
            "url": "https://yt3.ggpht.com/ytc/AAUvwnjAxhtYsN2IORntO44ZQf_S7Yxj2VTv-ZG_tw=s68-c-k-c0x00ffffff-no-rj",
            "width": 68,
            "height": 68
          },
          "subscribersText": "76",
          "subscribersCount": 76
        },
        "description": "This is an update to the previous Irena Genesis Metal Fury video a few months ago. If you're like me and you still love your SEGA ...",
        "views": 25,
        "duration": "13:19",
        "uploadedAt": "1 week ago",
        "daysAgo": 7,
        "quality": 4.6992481203007515
      },
      {
        "title": "Paprium Capture test - Modified Genesis model 1 va2",
        "url": "https://www.youtube.com/watch?v=6gMVHsFBRjs",
        "thumbnail": {
          "url": "https://i.ytimg.com/vi/6gMVHsFBRjs/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLBM0_DzbSOOP2PpQnXmNwrTFNnvdQ",
          "width": 720,
          "height": 404
        },
        "author": {
          "name": "Ivory Tower Collections",
          "avatar": {
            "url": "https://yt3.ggpht.com/ytc/AAUvwnjlhpN9z5-QcxwYLVuhirJPFB6IPYCoPhoixQjg=s68-c-k-c0x00ffffff-no-rj",
            "width": 68,
            "height": 68
          },
          "subscribersText": "762",
          "subscribersCount": 762
        },
        "description": "Here is over 20 mins of the first few levels of Paprium running on my Genesis model 1 va2. This particular Genesis has the ...",
        "views": 458,
        "duration": "23:44",
        "uploadedAt": "4 weeks ago",
        "daysAgo": 28,
        "quality": 2.1466066741657293
      },
      {
        "title": "PAPRIUM SEGA GENESIS UNBOXING - IT'S REAL!",
        "url": "https://www.youtube.com/watch?v=MmodRHZUja0",
        "thumbnail": {
          "url": "https://i.ytimg.com/vi/MmodRHZUja0/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLAuiNZVQc8Yh5uSofnziMg2OmlYDA",
          "width": 720,
          "height": 404
        },
        "author": {
          "name": "Dongled",
          "avatar": {
            "url": "https://yt3.ggpht.com/ytc/AAUvwngZO6CK8kAe2jbYCvdVCSU1QjOUezZaj-nrs5nTqg=s68-c-k-c0x00ffffff-no-rj",
            "width": 68,
            "height": 68
          },
          "subscribersText": "105K",
          "subscribersCount": 105000
        },
        "description": "Mike unboxes the long-awaited Paprium on the Sega ...",
        "views": 916,
        "duration": "9:45",
        "uploadedAt": "4 weeks ago",
        "daysAgo": 28,
        "quality": 0.031156462585034014
      },
      {
        "title": "Sonic Lost Worlds Sega Genesis / Megadrive Homebrew Game Review !",
        "url": "https://www.youtube.com/watch?v=gvE6sYigaOI",
        "thumbnail": {
          "url": "https://i.ytimg.com/vi/gvE6sYigaOI/hqdefault.jpg?sqp=-oaymwEjCOADEI4CSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLAJ540I_4vF4ZT6OowzMlG8TjZZoQ",
          "width": 480,
          "height": 270
        },
        "author": {
          "name": "The Wicked Gamer",
          "avatar": {
            "url": "https://yt3.ggpht.com/ytc/AAUvwngVa363wJLncCP7EqM_Bcs_E1z5fevTK419SrGX=s68-c-k-c0x00ffffff-no-rj",
            "width": 68,
            "height": 68
          },
          "subscribersText": "73.1K",
          "subscribersCount": 73100
        },
        "description": "Retro Games that have been Hacked, Modified or ...",
        "views": 297,
        "duration": "10:35",
        "uploadedAt": "4 weeks ago",
        "daysAgo": 28,
        "quality": 0.01451045534492867
      },
      {
        "title": "Sonic Lost Worlds Sega Genesis / Megadrive Homebrew Game Review !",
        "url": "https://www.youtube.com/watch?v=gvE6sYigaOI",
        "thumbnail": {
          "url": "https://i.ytimg.com/vi/gvE6sYigaOI/hqdefault.jpg?sqp=-oaymwEjCOADEI4CSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLAJ540I_4vF4ZT6OowzMlG8TjZZoQ",
          "width": 480,
          "height": 270
        },
        "author": {
          "name": "The Wicked Gamer",
          "avatar": {
            "url": "https://yt3.ggpht.com/ytc/AAUvwngVa363wJLncCP7EqM_Bcs_E1z5fevTK419SrGX=s68-c-k-c0x00ffffff-no-rj",
            "width": 68,
            "height": 68
          },
          "subscribersText": "73.1K",
          "subscribersCount": 73100
        },
        "description": "Retro Games that have been Hacked, Modified or complete new homebew games. Now a days playable on your original retro ...",
        "views": 297,
        "duration": "10:35",
        "uploadedAt": "4 weeks ago",
        "daysAgo": 28,
        "quality": 0.01451045534492867
      },
      {
        "title": "New Games for your Sega Genesis/ Mega Drive Part 17",
        "url": "https://www.youtube.com/watch?v=HuF-DoXfkNk",
        "thumbnail": {
          "url": "https://i.ytimg.com/vi/HuF-DoXfkNk/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLA4pfptNnexjS0AaabSVkPF7pbPgw",
          "width": 720,
          "height": 404
        },
        "author": {
          "name": "The New Retro Show",
          "avatar": {
            "url": "https://yt3.ggpht.com/ytc/AAUvwnj3Y3b0HA3e8BM3JyEA3kjCJm3fibjVYLza_wpc=s68-c-k-c0x00ffffff-no-rj",
            "width": 68,
            "height": 68
          },
          "subscribersText": "1.45M",
          "subscribersCount": 1450000
        },
        "description": "Sega released it as the Mega Drive in Japan in 1988, and ...",
        "views": 510,
        "duration": "13:54",
        "uploadedAt": "1 week ago",
        "daysAgo": 7,
        "quality": 0.005024630541871922
      },
      {
        "title": "New Games for your Sega Genesis Part 16",
        "url": "https://www.youtube.com/watch?v=eS0eDB-bjZc",
        "thumbnail": {
          "url": "https://i.ytimg.com/vi/eS0eDB-bjZc/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLA8nxqTKrwINmnl_ypbjIwre8sXXA",
          "width": 720,
          "height": 404
        },
        "author": {
          "name": "The New Retro Show",
          "avatar": {
            "url": "https://yt3.ggpht.com/ytc/AAUvwnj3Y3b0HA3e8BM3JyEA3kjCJm3fibjVYLza_wpc=s68-c-k-c0x00ffffff-no-rj",
            "width": 68,
            "height": 68
          },
          "subscribersText": "1.45M",
          "subscribersCount": 1450000
        },
        "description": "Did you have a Sega Under your Tree? Sega released it as the Mega Drive in Japan in 1988, and later as the Genesis in North ...",
        "views": 969,
        "duration": "20:05",
        "uploadedAt": "4 weeks ago",
        "daysAgo": 28,
        "quality": 0.0023866995073891623
      },
      {
        "title": "New Games for your Sega Genesis Part 16",
        "url": "https://www.youtube.com/watch?v=eS0eDB-bjZc",
        "thumbnail": {
          "url": "https://i.ytimg.com/vi/eS0eDB-bjZc/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLA8nxqTKrwINmnl_ypbjIwre8sXXA",
          "width": 720,
          "height": 404
        },
        "author": {
          "name": "The New Retro Show",
          "avatar": {
            "url": "https://yt3.ggpht.com/ytc/AAUvwnj3Y3b0HA3e8BM3JyEA3kjCJm3fibjVYLza_wpc=s68-c-k-c0x00ffffff-no-rj",
            "width": 68,
            "height": 68
          },
          "subscribersText": "1.45M",
          "subscribersCount": 1450000
        },
        "description": "Did you have a Sega Under your Tree? Sega released it as the Mega Drive in Japan in 1988, and later as the Genesis in North ...",
        "views": 969,
        "duration": "20:05",
        "uploadedAt": "4 weeks ago",
        "daysAgo": 28,
        "quality": 0.0023866995073891623
      }
    ]
  };

router.get('/', async (req, res, next) => {
    try {
        const searchQuery = (req.query.q || '').trim();
        console.log('Frontend search query', searchQuery);
        const results = searchQuery ? 
            //await search.searchOnYoutube(searchQuery) : 
            example :
            ({search: '', items: []});

        res.send(template(results));
    } catch (e) {
        console.error(e);
        next(e);
    }
});

module.exports = router;
