const newsApiURL = "https://newsapi.org/v2/everything?q=top%20indian%20sports%20news%20&sortBy=publishedAt&apiKey=59c716c17f4e4f4fa4b260a1fe7ce8ba"

// https://newsapi.org/v2/everything?q=bitcoin&sortBy=publishedAt&apiKey=59c716c17f4e4f4fa4b260a1fe7ce8ba
const newsApiResponse1 = {
  "status": "ok",
  "totalResults": 267,
  "articles": [
    {
      "source": {
        "id": "espn-cric-info",
        "name": "ESPN Cric Info"
      },
      "author": null,
      "title": "Did you know we just had a disability cricket World Cup?",
      "description": "Chances are you didn't, and that's just the tip of the iceberg when it comes to the problems faced by disability cricket | ESPNcricinfo.com",
      "url": "https://www.espncricinfo.com/story/_/id/27391032/did-know-just-had-disability-cricket-world-cup",
      "urlToImage": "https://a.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1197512_1296x729.jpg",
      "publishedAt": "2019-08-15T07:38:56Z",
      "content": "Dinesh Kumara's left arm once had a bullet fly through it; with his right arm, he bowls pace. In December 2005, when he was serving in the Sri Lankan navy, who he also played cricket for, someone in the LTTE shot at him from 75 metres. That bullet means he no… [+13636 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Ndtv.com"
      },
      "author": null,
      "title": "2019 Independence Day: Top 5 Patriotic Driving Holiday Destinations",
      "description": "It's been 73 years since India gained her independence from the British Raj and our country has come a long way since then! We list out top driving holiday destinations which will make you feel proud of being an Indian.",
      "url": "https://auto.ndtv.com/news/2019-independence-day-top-5-patriotic-driving-holiday-destinations-1900742",
      "urlToImage": "https://c.ndtvimg.com/o2un5kvo_patriotic-driving-holidays_625x300_15_August_18.jpg",
      "publishedAt": "2019-08-15T05:26:29Z",
      "content": "India's journey towards independence has been a hard fought one! It took our country over 200 years of struggle to break free of the shackles of the British Raj. In the 73 years since India became independent, we have had various instances of the country maki… [+4513 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Indianexpress.com"
      },
      "author": "Devendra Pandey",
      "title": "COA calls for ‘conflict’ congress",
      "description": "Top former players, including Dravid, to discuss rules; their views to be submitted to amicus curiae.",
      "url": "https://indianexpress.com/article/sports/cricket/coa-conflict-of-interest-dravid-ganguly-vvs-laxman-5906114/",
      "urlToImage": "https://images.indianexpress.com/2019/06/dravid-759.jpg?w=759",
      "publishedAt": "2019-08-14T22:23:41Z",
      "content": "Rahul Dravid, the Committee of Administrators and other former players will discuss the Conflict of Interest rules. (File)\r\nThe Committee of Administrators (CoA) has asked former India captain Rahul Dravid, the current National Cricket Academy head of cricket… [+4111 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Iasexamportal.com"
      },
      "author": "user9",
      "title": "Current Affairs for IAS Exams - 14 August 2019",
      "description": "Current Affairs for IAS Exams - 14 August 2019 ::NATIONAL:: CJI says Supreme court is in no hurry to deal with Ayodhya case Chief Justice of India RanjanGogoi, heading the Constitution Bench hearing the Ayodhya appeals, said on Tuesday that the Supreme Court …",
      "url": "https://iasexamportal.com/daily-current-affairs/14-08-2019?utm_source=feedburner&utm_medium=feed&utm_campaign=Feed%3A+upscportal+%28IAS+EXAM+PORTAL+-+India%27s+Largest+UPSC%2C+IAS+Aspirants+Community.%29",
      "urlToImage": null,
      "publishedAt": "2019-08-14T09:49:26Z",
      "content": "<li>Chief Justice of India RanjanGogoi, heading the Constitution\r\nBench hearing the Ayodhya appeals, said on Tuesday that the Supreme Court is\r\nnot in a hurry. Lawyers need not feel constrained and can argue to their\r\nhearts content.\r\n</li><li>The top judge s… [+7767 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Gktoday.in"
      },
      "author": "Nupur Rawat",
      "title": "Top Current Affairs Today’s News Headlines – 14 August 2019",
      "description": "Here are the top current affairs Today’s News Headlines of 14 August 2019 for all competitive examinations of India. National Current Affairs Sikkim: 10 out of 13 MLAs of Sikkim Democratic Front join BJP Organ Donation Day celebrated on August 13 PM inaugurat…",
      "url": "https://currentaffairs.gktoday.in/news-headlines/top-current-affairs-todays-news-headlines-14-august-2019",
      "urlToImage": "https://currentaffairs.gktoday.in/wp-content/uploads/2016/12/newspapers.png",
      "publishedAt": "2019-08-13T19:16:48Z",
      "content": "Top Current Affairs Today’s News Headlines 14 August 2019\r\nHere are the top current affairs Today’s News Headlines of 14 August 2019 for all competitive examinations of India.\r\nNational Current Affairs\r\n<ul><li>Sikkim: 10 out of 13 MLAs of Sikkim Democratic F… [+2509 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "News18.com"
      },
      "author": "Cricketnext Staff",
      "title": "Race for Top Job — A Look at All Six Contenders in Hunt to be India's Head Coach - News18",
      "description": "Race for Top Job — A Look at All Six Contenders in Hunt to be India's Head Coach News18 Hunt for Team India head coach: Detailed look at the contenders Hindustan Times Six candidates shortlisted for position of India head coach - Cricbuzz Cricbuzz 6 candidate…",
      "url": "https://www.news18.com/cricketnext/news/race-for-top-job-a-look-at-all-six-contenders-in-hunt-to-be-indias-head-coach-2269137.html",
      "urlToImage": "https://images.news18.com/ibnlive/uploads/2019/06/MS-RS-VK.jpg",
      "publishedAt": "2019-08-13T09:41:49Z",
      "content": "The BCCI have finalized six names who will be interviewed by the Cricket Advisory Committee (CAC) for the post of the next Indian mens senior team coach. The interviews will take place in Mumbai on Friday (August 16) and will include current head coach Ravi S… [+5452 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "News18.com"
      },
      "author": "AFP",
      "title": "Sri Lanka vs New Zealand: Williamson's Side Eye No. 1 Rank in Lanka Series - News18",
      "description": "Sri Lanka vs New Zealand: Williamson's Side Eye No. 1 Rank in Lanka Series News18 news in pictures august 14 2019 The Hindu Dananjaya leaves New Zealand gasping - Cricbuzz Cricbuzz Sri Lanka vs New Zealand 1st Test Day 1 Live Cricket Score Online: Taylor’s ha…",
      "url": "https://www.news18.com/cricketnext/news/sri-lanka-vs-new-zealand-williamsons-side-eye-no-1-rank-in-lanka-series-2268547.html",
      "urlToImage": "https://images.news18.com/ibnlive/uploads/2019/08/Williamson.jpg",
      "publishedAt": "2019-08-13T03:45:29Z",
      "content": "Galle: New Zealand have a chance of securing the top spot in Test cricket when they take on Sri Lanka in a two-match series from Wednesday (August 14), exactly a month after their cruel World Cup defeat to England.\r\nNew Zealand, with 109 points in Test cricke… [+3415 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Deccanherald.com"
      },
      "author": "Press Trust of India",
      "title": "6 candidates short-listed for India's head coach's job - Deccan Herald",
      "description": "6 candidates short-listed for India's head coach's job Deccan Herald BCCI shortlists six candidates for the position of head coach Zee News BCCI shortlists six candidates for India head coach position India Today Six candidates short-listed for India’s head c…",
      "url": "https://www.deccanherald.com/sports/6-candidates-short-listed-for-indias-head-coachs-job-753926.html",
      "urlToImage": "https://www.deccanherald.com/sites/dh/files/article_images/2019/08/12/Ravi%2C-Moody-1565629996.jpg",
      "publishedAt": "2019-08-12T17:13:16Z",
      "content": "Six candidates, including incumbent Ravi Shastri, were on Monday short-listed for the high-profile post of the Indian cricket team's head coach.\r\nThe six candidates are former New Zealand coach Mike Hesson, ex-Australia all-rounder and Sri Lanka coach Tom Moo… [+2629 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Ndtv.com"
      },
      "author": "NDTVSports.com",
      "title": "Shastri Among Six Candidates Shortlisted For India's Coach Job: Report",
      "description": "The candidates will give a presentation to the Cricket Advisory Committee (CAC) headed by the legendary Kapil Dev, and a final decision will be arrived at by end of this week or early next week.",
      "url": "https://sports.ndtv.com/cricket/ravi-shastri-among-six-candidates-shortlisted-for-indias-coach-job-report-2084202",
      "urlToImage": "https://c.ndtvimg.com/2019-08/5qn9n0t_ravi-shastri-_625x300_12_August_19.jpg",
      "publishedAt": "2019-08-12T16:45:13Z",
      "content": "Ravi Shastri, India's current head coach, and five other candidates have been shortlisted for Team India's head coach job, news agency PTI reported. Other than Shastri, who is currently on a 45-day extension after the World Cup 2019, Lalchand Rajput and Robin… [+2712 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Livemint.com"
      },
      "author": "PTI",
      "title": "Six candidates short-listed for India's head coach's job, Ravi Shastri also in fray - Livemint",
      "description": "Six candidates short-listed for India's head coach's job, Ravi Shastri also in fray Livemint NEW DELHI: Six candidates, including incumbent Ravi Shastri, were on Monday short-listed for the high-profile post of the Indian cricket team's head coach. View full …",
      "url": "https://www.livemint.com/sports/cricket-news/six-candidates-short-listed-for-india-s-head-coach-s-job-shastri-also-in-fray-1565626819032.html",
      "urlToImage": "https://images.livemint.com/img/2019/08/12/600x338/2019-07-30T062108Z_32249350_RC152EC7B9F0_RTRMADP_3_CRICKET-INDIA-COACH_1565627087136_1565627112679.JPG",
      "publishedAt": "2019-08-12T16:26:17Z",
      "content": "NEW DELHI: Six candidates, including incumbent Ravi Shastri, were on Monday short-listed for the high-profile post of the Indian cricket team's head coach.\r\nThe six candidates are former New Zealand coach Mike Hesson, ex-Australia all-rounder and Sri Lanka co… [+2636 chars]"
    },
    {
      "source": {
        "id": "the-times-of-india",
        "name": "The Times of India"
      },
      "author": "ANI",
      "title": "Was tired when I reached score of 65: Virat Kohli tells Yuzvendra Chahal",
      "description": "In a video posted by the Board of Control for Cricket in India (BCCI), Kohli is seen having a candid conversation with Chahal.",
      "url": "https://economictimes.indiatimes.com/news/sports/was-tired-when-i-reached-score-of-65-virat-kohli-tells-yuzvendra-chahal/articleshow/70645872.cms",
      "urlToImage": "https://img.etimg.com/photo/65498029.cms",
      "publishedAt": "2019-08-12T13:11:58Z",
      "content": "NEW DELHI: After playing a match-winning knock of 120 runs against West Indies in the second ODI of the three-match series, Indian skipper Virat Kohli told teammate Yuzvendra Chahal about the toll the innings took on him, saying he felt tired after reaching 6… [+1913 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Business-standard.com"
      },
      "author": "ANI",
      "title": "Was tired after reaching the score of 65: Virat Kohli tells Chahal",
      "description": "As a result of this knock of 120 runs, Kohli became the highest run-getter against West Indies in the ODI format.",
      "url": "https://www.business-standard.com/article/news-ani/was-tired-when-i-reached-score-of-65-kohli-tells-chahal-119081200348_1.html",
      "urlToImage": "https://bsmedia.business-standard.com/_media/bs/img/article/2019-08/11/full/1565542556-9717.jpg",
      "publishedAt": "2019-08-12T07:28:00Z",
      "content": "After playing a match-winning knock of 120 runs against West Indies in the second ODI of the three-match series, Indian skipper Virat Kohli told teammate Yuzvendra Chahal about the toll the innings took on him, saying he felt tired after reaching 65.\r\nIn a vi… [+2189 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Firstpost.com"
      },
      "author": "SitePoint",
      "title": "Hightlights, India vs West Indies, Full Cricket Score..ars with 4 wickets as visitors clinch win to lead 1-0 - Firstpost",
      "description": "Hightlights, India vs West Indies, Full Cricket Score..ars with 4 wickets as visitors clinch win to lead 1-0 Firstpost India vs West Indies, 2nd ODI: Virat Kohli, Bhuvneshwar Kumar star in India's 59-run win Times of India Virat Kohli 19 runs away from breaki…",
      "url": "https://www.firstpost.com/firstcricket/sports-news/hightlights-india-vs-west-indies-full-cricket-score-2nd-odi-match-result-at-trinidad-bhuvneshwar-stars-with-4-wickets-as-visitors-clinch-win-to-lead-1-0-7144471.html",
      "urlToImage": "https://images.firstpost.com/wp-content/uploads/2019/08/Kohli-Holder_opt.jpg",
      "publishedAt": "2019-08-11T22:42:03Z",
      "content": "India vs West Indies, LIVE Cricket Score, 2nd ODI at Trinidad , Latest Updates: Shami bowls out what turns out to be the final over. Cottrell lofts the ball over mid off for a boundary off the second delivery, but is dismissed next ball, thanks to a terrific … [+2536 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Firstpost.com"
      },
      "author": "Harshit Rakheja",
      "title": "UTT 2019: Benedikt Duda, Kirill Gerassimenko credit league for improvements in their game; Matilda Ekholm predicts bright future for Indian table tennis",
      "description": "The foreign players participating in this season of the Ultimate Table Tennis have been all praises for the league, lauding the efforts of the organisers The post UTT 2019: Benedikt Duda, Kirill Gerassimenko credit league for improvements in their game; Matil…",
      "url": "https://www.firstpost.com/sports/utt-2019-benedikt-duda-kirill-gerassimenko-credit-league-for-improvements-in-their-game-matilda-ekholm-predicts-bright-future-for-indian-table-tennis-7142051.html",
      "urlToImage": "https://images.firstpost.com/wp-content/uploads/2019/08/Duda2.jpg",
      "publishedAt": "2019-08-11T10:40:14Z",
      "content": "In India, every sport has encountered a tipping point, the moment where it escapes obscurity and wades into the mainstream news cycle, forcing people to sit up and take notice.\r\nFor cricket, it was the 1983 world cup triumph. For badminton, Prakash Padukone w… [+6147 chars]"
    },
    {
      "source": {
        "id": "bbc-news",
        "name": "BBC News"
      },
      "author": null,
      "title": "Steve Smith: Why Australia's batting hero is more than just a cricket obsessive",
      "description": "Australia's Steve Smith may seem like a cricketing machine, but there is a entirely human interior to arguably the best player since Donald Bradman, says Australian commentator Geoff Lemon.",
      "url": "https://www.bbc.co.uk/sport/cricket/49300553",
      "urlToImage": "https://ichef.bbci.co.uk/onesport/cps/624/cpsprodpb/0F6B/production/_108274930_gettyimages-1166027409.jpg",
      "publishedAt": "2019-08-11T08:14:24Z",
      "content": "Steve Smith scored 144 and 142 as Australia beat England by 251 runs in the first Test at Edgbaston\r\n<table><tr><th>Men's Ashes: Second Specsavers Test</th></tr>\r\n<tr><td>Venue: Lord's Dates: 14-18 August</td></tr><tr><td>Coverage: Ball-by-ball Test Match Spe… [+8189 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Indianexpress.com"
      },
      "author": "Shivani Naik",
      "title": "When Saatwiksairaj Rankireddy met Chirag Shetty…",
      "description": "Geeky Chirag Shetty likes Netflix, newspapers and Rafa Nadal. Easy-going Saatwiksairaj Rankireddy prefers Kapil Sharma, PUBG and Roger Federer. But when it comes to good chicken curry, one will have what the other’s having. How the two talented shuttlers foun…",
      "url": "https://indianexpress.com/article/sports/badminton/saatwiksairaj-rankireddy-chirag-shetty-badminton-thailand-open-mens-doubles-title-5895415/",
      "urlToImage": "https://images.indianexpress.com/2019/08/reddy-shetty-759-1.jpg?w=759",
      "publishedAt": "2019-08-10T23:56:49Z",
      "content": "Both Saatwiksairaj Rankireddy and Chirag Shetty love playing in Europe and want to win a title in Paris.\r\nIts difficult to determine if Saatwiksairaj Rankireddy led and Chirag Shetty followed last Sunday when the pair clinched the countrys biggest mens double… [+15631 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Icc-cricket.com"
      },
      "author": "ICC",
      "title": "WI v Ind, 2nd ODI, preview India aim to flex batting muscle against West Indies 10 - International Cricket Council",
      "description": "WI v Ind, 2nd ODI, preview India aim to flex batting muscle against West Indies 10 International Cricket Council India vs West Indies: Virat Kohli 19 runs away from breaking Javed Miandad's 26-year-old record Times of India Gayle, Iyer in focus as action move…",
      "url": "https://www.icc-cricket.com/news/1305322/india-aim-to-flex-batting-muscle-against-west-indies",
      "urlToImage": "https://resources.pulse.icc-cricket.com/ICC/photo/2019/08/10/c361019c-0805-4259-af2f-b7ae320039da/GettyImages-1160068722.jpg",
      "publishedAt": "2019-08-10T05:46:59Z",
      "content": "Since January 2016, the Indian top three of Virat Kohli, Rohit Sharma and Shikhar Dhawan have scored 1449 one-day international runs against West Indies at an average of 79.63. They will be looking to press this advantage against the hosts in the second ODI a… [+2714 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Cricbuzz.com"
      },
      "author": null,
      "title": "BCCI comes under NADA - All you need to know - Cricbuzz - Cricbuzz",
      "description": "BCCI comes under NADA - All you need to know - Cricbuzz Cricbuzz Cricketers To Undergo Dope Test. \"BCCI Is No Different,\" Says Government NDTV Sports BCCI blinks, comes under NADA ambit Deccan Herald Positive result: BCCI finally agrees to come under NADA amb…",
      "url": "https://www.cricbuzz.com/cricket-news/109297/bcci-comes-under-nada-all-you-need-to-know",
      "urlToImage": "http://www.cricbuzz.com/a/img/v1/600x400/i1/c179017/nada-can-review-prithvi-shaws.jpg",
      "publishedAt": "2019-08-10T02:41:57Z",
      "content": "NADA can review Prithvi Shaw's case if they feel the need to do so © Getty\r\nThe Indian cricket board (BCCI) has relented in its long standoff with the government over control of the dope-testing regime of its cricketers and agreed to come under the ambit of t… [+7745 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Livemint.com"
      },
      "author": "Asmita Bakshi",
      "title": "Voices of the Valley",
      "description": "As the world weighs in on the government’s move on Article 370 and 35A of the Constitution, Lounge listens in to what Kashmiris have to say",
      "url": "https://www.livemint.com/mint-lounge/features/voices-of-the-valley-1565349636237.html",
      "urlToImage": "https://images.livemint.com/img/2019/08/09/600x338/Cover_story_image_1565350563934.jpg",
      "publishedAt": "2019-08-10T02:30:15Z",
      "content": "Moments before midnight, on 4 August, there was a distressing message from a Kashmiri friend in the valley: Zinda rahein toh we will reconnect (I will speak to you if I survive),\" he said. Over 35,000 troops of the Central Reserve Police Force had been deploy… [+20846 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Icc-cricket.com"
      },
      "author": "ICC",
      "title": "England news Moeen Ali's recent performances form divided opinions over his selection 09 Aug 19 - International Cricket Council",
      "description": "England news Moeen Ali's recent performances form divided opinions over his selection 09 Aug 19 International Cricket Council Moeen Ali dropped for Lord's Test - Cricbuzz Cricbuzz Haven't Thought about Smith Leading Again: CA Chairman News18 England announce …",
      "url": "https://www.icc-cricket.com/news/1304214/moeen-ali-s-recent-performances-form-divided-opinions-over-his-selection",
      "urlToImage": "https://resources.pulse.icc-cricket.com/ICC/photo/2019/08/09/de7643aa-d943-4d3d-9130-9845e782d95f/GettyImages-1161335884.jpg",
      "publishedAt": "2019-08-09T11:26:15Z",
      "content": "Former England captain Nasser Hussain has raised questions over all-rounder Moeen Ali's confidence in recent times and suggested Jack Leach as a better option with his left-arm spin for the second Test beginning 14 August at Lord's.Moeen, who currently occupi… [+3380 chars]"
    }
  ]
}

const newsApiResponse = {
  "status": "ok",
  "totalResults": 6685,
  "articles": [
    {
      "source": {
        "id": "crypto-coins-news",
        "name": "Crypto Coins News"
      },
      "author": "Tedra DeSue",
      "title": "Why the Inverted Yield Curve Failed to Boost Bitcoin's Price",
      "description": "By CCN Markets: The inverted yield curve on Wednesday should have been a catalyst in moving the bitcoin price higher. That's because it signaled a recession, which tanked the stock market. It was just about a week ago that the bitcoin price rose in the wake o…",
      "url": "https://www.ccn.com/why-the-inverted-yield-curve-failed-to-boost-bitcoins-price/",
      "urlToImage": "https://www.ccn.com/wp-content/uploads/2019/08/btc-melting-ss.jpg",
      "publishedAt": "2019-08-15T19:30:37Z",
      "content": "By CCN Markets: The inverted yield curve on Wednesday should have been a catalyst in moving the bitcoin price higher.\r\nThat's because it signaled a recession, which tanked the stock market. It was just about a week ago that the bitcoin price rose in the wake … [+3857 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Coindesk.com"
      },
      "author": "Richard Meyer",
      "title": "South Korean Third-Largest Crypto Exchange Publishes Official Listing Criteria",
      "description": "Coinmine has issued official listing criteria, paving the way for more tokens in the ecosystem.",
      "url": "https://www.coindesk.com/south-korean-third-largest-crypto-exchange-publishes-official-listing-criteria",
      "urlToImage": "https://static.coindesk.com/wp-content/uploads/2018/09/tokens.jpg",
      "publishedAt": "2019-08-15T19:30:04Z",
      "content": "Coinone, a South Korean crypto exchange, has issued listing criteria, laying out in some detail what is required to be traded on the platform.\r\nThe disclosure on August 8th came just a few days after the exchange announced the signing a deal with CertiK to un… [+2181 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Yahoo.com"
      },
      "author": "Steven Zheng",
      "title": "Coinmine raises $2.5M in seed funding for its plug-and-play mining device",
      "description": "Coinmine, a consumer-facing cryptocurrency mining startup, has raised a fresh new round of funding, according to a statement released on Thursday.The post Coinmine raises $2.5M in seed funding for its plug-and-play mining device appeared first on The Block.",
      "url": "https://finance.yahoo.com/news/coinmine-raises-2-5m-seed-191531530.html",
      "urlToImage": null,
      "publishedAt": "2019-08-15T19:15:31Z",
      "content": "Coinmine, a consumer-facing cryptocurrency mining startup, has raised a fresh new round of funding, according to a statement released on Thursday. The startup has a $2.5M seed round led by M13, with participation from Gumi Crypto, Republic Labs, Canaan Labs, … [+342 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Prnewswire.com"
      },
      "author": null,
      "title": "The Eureka Network to Launch Upgraded High-Liquidity Exchange and 300ERK Sign-Up Bonus",
      "description": "LONDON, Aug. 15, 2019 /PRNewswire/ -- Notoriously, cryptocurrency trading platforms have been plagued by the issue of liquidity. For the uninitiated, liquidity typically refers to the ability to readily convert a cryptocurrency without waiting too long for th…",
      "url": "https://www.prnewswire.com/news-releases/the-eureka-network-to-launch-upgraded-high-liquidity-exchange-and-300erk-sign-up-bonus-300902573.html",
      "urlToImage": "https://mma.prnewswire.com/media/961293/EurekaX.jpg?p=facebook",
      "publishedAt": "2019-08-15T19:15:00Z",
      "content": "LONDON, Aug. 15, 2019 /PRNewswire/ -- Notoriously, cryptocurrency trading platforms have been plagued by the issue of liquidity. For the uninitiated, liquidity typically refers to the ability to readily convert a cryptocurrency without waiting too long for th… [+3687 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Theblockcrypto.com"
      },
      "author": null,
      "title": "Coinmine raises $2.5M in seed funding for its plug-and-play mining device - The Block Crypto",
      "description": "Coinmine, a consumer-facing cryptocurrency mining startup, has raised a fresh new round of funding, according to a statement released on Thursday. The startup has a $2.5M seed round led by M13, with participation from Gumi Crypto, Republic Labs, Canaan Labs, …",
      "url": "https://www.theblockcrypto.com/tiny/coinmine-raises-2-5m-in-seed-funding-for-its-plug-and-play-mining-device/",
      "urlToImage": "https://www.tbstat.com/wp/uploads/2018/11/White-Coinmine-1-1.jpg",
      "publishedAt": "2019-08-15T19:08:00Z",
      "content": "Coinmine, a consumer-facing cryptocurrency mining startup, has raised a fresh new round of funding, according to a statement released on Thursday. The startup has a $2.5M seed round led by M13, with participation from Gumi Crypto, Republic Labs, Canaan Labs, … [+342 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Yahoo.com"
      },
      "author": "Daniel Kuhn",
      "title": "Judge Blasts Craig Wright’s Evidence, ‘Inconsistent’ Testimony in Kleiman Trial",
      "description": "The judge overseeing the ongoing lawsuit against Craig Wright, who claims to have invented bitcoin, shot down a motion challenging the court's jurisdiction over the suit.",
      "url": "https://finance.yahoo.com/news/judge-blasts-craig-wright-evidence-190044492.html",
      "urlToImage": "https://s.yimg.com/ny/api/res/1.2/QhvmpDkJLokp3uBgqxUIjw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyODA7aD03MTY-/https://s.yimg.com/uu/api/res/1.2/RDWw4iat9W2YCYW_zPcosQ--~B/aD0zNTg7dz02NDA7c209MTthcHBpZD15dGFjaHlvbg--/https://media.zenfs.com/en-US/coindesk_75/afacb26c2308b138e5d16eff395bb5f2",
      "publishedAt": "2019-08-15T19:00:44Z",
      "content": "US Judge Beth Bloom has denied a request by Craig Wright to scuttle a lawsuit filed against him because of his past testimony and his credibility before the court, according to a court filing from August 15.\r\nOn April 15, Wright filed a motion challenging the… [+3226 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Coindesk.com"
      },
      "author": "Daniel Kuhn",
      "title": "Judge Blasts Craig Wright’s Evidence, ‘Inconsistent’ Testimony in Kleiman Trial",
      "description": "The judge overseeing the ongoing lawsuit against Craig Wright, who claims to have invented bitcoin, shot down a motion challenging the court's jurisdiction over the suit.",
      "url": "https://www.coindesk.com/judge-blasts-craig-wrights-inconsistent-testimony-extremely-speculative-evidence-in-kleiman-trial",
      "urlToImage": "https://static.coindesk.com/wp-content/uploads/2019/08/45661947755_9348ca3895_z.jpg",
      "publishedAt": "2019-08-15T19:00:44Z",
      "content": "US Judge Beth Bloom has denied a request by Craig Wright to scuttle a lawsuit filed against him because of his past testimony and his credibility before the court, according to a court filing from August 15.\r\nOn April 15, Wright filed a motion challenging the… [+3048 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Seekingalpha.com"
      },
      "author": "SA Editor Pranav Ghumatkar",
      "title": "On the hour",
      "description": "Dow +0.17%.10-yr +0.34%.Euro -0.31% vs. dollar.Crude -1.48% to $54.38Gold +0.32% to $1,532.75.Bitcoin -1.53% to $10,054.0.",
      "url": "https://seekingalpha.com/news/3492359-hour",
      "urlToImage": "https://static3.seekingalpha.com/assets/og_image_192-59bfd51c9fe6af025b2f9f96c807e46f8e2f06c5ae787b15bf1423e6c676d4db.png",
      "publishedAt": "2019-08-15T19:00:43Z",
      "content": "Dow +0.17%.\r\n10-yr +0.34%.\r\nEuro -0.31% vs. dollar.\r\nCrude -1.48% to $54.38\r\nGold +0.32% to $1,532.75.\r\nBitcoin -1.53% to $10,054.0."
    },
    {
      "source": {
        "id": null,
        "name": "Newsbtc.com"
      },
      "author": "Tony Spilotro",
      "title": "Bitcoin and Altcoin Crashes Correlating Could Be Catalyst for Alt Bottom",
      "description": "Across the crypto market, there’s extreme pain, fear, uncertainty, and doubt. Bitcoin is pulling back from recent highs, and altcoins like Ethereum, Ripple, and others have only bled out and fallen deeper to new lows. And while most crypto investors believe t…",
      "url": "https://www.newsbtc.com/2019/08/15/bitcoin-altcoin-ripple-ethereum-crypto/",
      "urlToImage": "https://www.newsbtc.com/wp-content/uploads/2019/08/altcoin-bitcoin-crypto-ethereum-ripple-shutterstock_1237760869-1200x780.jpg",
      "publishedAt": "2019-08-15T19:00:40Z",
      "content": "Across the crypto market, theres extreme pain, fear, uncertainty, and doubt. Bitcoin is pulling back from recent highs, and altcoins like Ethereum, Ripple, and others have only bled out and fallen deeper to new lows.\r\nAnd while most crypto investors believe t… [+3086 chars]"
    },
    {
      "source": {
        "id": "daily-mail",
        "name": "Daily Mail"
      },
      "author": "https://www.facebook.com/DailyMail",
      "title": "Homeless veteran gets NEW CAR from millionaire who's donating directly to people on Twitter",
      "description": "'I'm trying to inspire the average American,' Bill Pulte told DailyMailTV. He hopes giving away $1 million at the speed of Twitter will change the way people help both neighbors and strangers.",
      "url": "https://www.dailymail.co.uk/news/article-7360343/Homeless-veteran-gets-NEW-CAR-millionaire-whos-donating-directly-people-Twitter.html",
      "urlToImage": "https://i.dailymail.co.uk/1s/2019/08/15/19/17328150-0-image-a-72_1565895502213.jpg",
      "publishedAt": "2019-08-15T18:52:46Z",
      "content": "A homeless U.S. Army veteran witnessed a miracle on Monday: a millionaire traveling 1,000 miles to hand him the keys to a new car. \r\nFor Michigan businessman Bill Pulte, it was just another day at the office. \r\n'I'm trying to inspire the average American,' he… [+12060 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Techspot.com"
      },
      "author": "Adrian Potoroaca",
      "title": "CipherTrace says $3.1 billion may have been stolen at cryptocurrency exchanges in 2019",
      "description": "Judging by the latest Cryptocurrency Anti-Money Laundering report by security research firm CipherTrace, crypto criminals are likely to loot an estimated total of $4.3 billion in crypto funds through fraud and theft throughout 2019, which is almost four times…",
      "url": "https://www.techspot.com/news/81463-cyphertrace-31-billion-may-have-stolen-cryptocurrency-exchanges.html",
      "urlToImage": "https://static.techspot.com/images2/news/ts3_thumbs/2019/08/2019-08-15-ts3_thumbs-9f0.jpg",
      "publishedAt": "2019-08-15T18:44:00Z",
      "content": "Why it matters: Cryptocurrency is among the hottest subjects in tech, mainly due to its increase in popularity as a financial tool over the last few years. Some people view cryptocurrencies as the key to freedom while others see them as the perfect opportunit… [+3521 chars]"
    },
    {
      "source": {
        "id": "buzzfeed",
        "name": "Buzzfeed"
      },
      "author": "Daniella Emanuel",
      "title": "Here's Everything Coming To Hulu In September",
      "description": "Summer's almost over, but the fun doesn't have to be! View Entire Post ›",
      "url": "https://www.buzzfeed.com/daniellaemanuel/tv-movies-new-hulu-september-2019",
      "urlToImage": "https://img.buzzfeed.com/buzzfeed-static/static/2019-08/15/0/enhanced/e552c77cc86d/original-4638-1565827665-2.png?crop=0:0;0,0",
      "publishedAt": "2019-08-15T18:36:06Z",
      "content": "Available September 1\r\nChuggington: Complete Seasons 1-5 (Lionsgate)\r\n27 Dresses (2008)\r\n50 First Dates (2004)\r\nA Dog and Pony Show (2018)\r\nA Guy Thing (2003)\r\nA.R.C.H.I.E 2: Mission Impawsible (2003)\r\nAfter the Screaming Stops (2018)\r\nAgainst the Wild 2 (201… [+6155 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Cointelegraph.com"
      },
      "author": "Cointelegraph By Ana Alexandre",
      "title": "Celsius Network Incorporates Bitcoin.com Platform to Streamline Services",
      "description": "A new partnership between crypto lending platform Celsius Network and Bitcoin.com aims to streamline digital currency-related services for crypto owners",
      "url": "https://cointelegraph.com/news/celsius-network-incorporates-bitcoincom-platform-to-streamline-services",
      "urlToImage": "https://images.cointelegraph.com/images/740_aHR0cHM6Ly9zMy5jb2ludGVsZWdyYXBoLmNvbS9zdG9yYWdlL3VwbG9hZHMvdmlldy85ZDlhYWY3OWZiYmUxYWQ1NDVjOGMyMjNiNjg2YTU5MC5qcGc=.jpg",
      "publishedAt": "2019-08-15T18:31:00Z",
      "content": "A new partnership between crypto lending and borrowing platform Celsius Network and fintech-focused media outlet Bitcoin.com aims to streamline digital currency-related services for crypto owners using the Celsius App.\r\nPer a press release published on Aug. 1… [+1638 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Sys-con.com"
      },
      "author": null,
      "title": "Celsius Network geht Partnerschaft mit Bitcoin.com ein",
      "description": "Celsius Network, die branchenführende Kryptowährungsplattform, hat heute ihre neue Partnerschaft mit Bitcoin.com, der führenden Quelle für den Handel, News und Updates von Bitcoins, bekannt gegeben. Nutzer der Dienste von Celsius können jetzt BCH, BTC, ETH un…",
      "url": "http://businesswire.sys-con.com/node/4403510",
      "urlToImage": null,
      "publishedAt": "2019-08-15T18:15:03Z",
      "content": "Celsius Network, die branchenführende Kryptowährungsplattform, hat heute ihre neue Partnerschaft mit Bitcoin.com, der führenden Quelle für den Handel, News und Updates von Bitcoins, bekannt gegeben. Nutzer der Dienste von Celsius können jetzt BCH, BTC, ETH un… [+3784 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Sys-con.com"
      },
      "author": null,
      "title": "Celsius Network geht Partnerschaft mit Bitcoin.com ein",
      "description": "Celsius Network, die branchenführende Kryptowährungsplattform, hat heute ihre neue Partnerschaft mit Bitcoin.com, der führenden Quelle für den Handel, News und Updates von Bitcoins, bekannt gegeben. Nutzer der Dienste von Celsius können jetzt BCH, BTC, ETH un…",
      "url": "http://news.sys-con.com/node/4403510",
      "urlToImage": "",
      "publishedAt": "2019-08-15T18:15:03Z",
      "content": "Celsius Network, die branchenführende Kryptowährungsplattform, hat heute ihre neue Partnerschaft mit Bitcoin.com, der führenden Quelle für den Handel, News und Updates von Bitcoins, bekannt gegeben. Nutzer der Dienste von Celsius können jetzt BCH, BTC, ETH un… [+3783 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Newsbtc.com"
      },
      "author": "Tony Spilotro",
      "title": "Crypto Analyst: Recent Bitcoin Price Struggle Similar to 2017 Run",
      "description": "Bitcoin price action over the last few weeks as turned from bullish, to bearish, and crypto investors are torn as to what happens next. Most expect Bitcoin to go on a bull run from here, while others think a correction until the end of the year is in the card…",
      "url": "https://www.newsbtc.com/2019/08/15/crypto-analyst-bitcoin-price/",
      "urlToImage": "https://www.newsbtc.com/wp-content/uploads/2019/08/bitcoin-price-crypto-shutterstock_1273691566-1200x780.jpg",
      "publishedAt": "2019-08-15T18:00:55Z",
      "content": "Bitcoin price action over the last few weeks as turned from bullish, to bearish, and crypto investors are torn as to what happens next. Most expect Bitcoin to go on a bull run from here, while others think a correction until the end of the year is in the card… [+2777 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Dailyfx.com"
      },
      "author": "Peter Hanks, Junior Analyst, Peter Hanks",
      "title": "Bitcoin Price Forecast: Trendline Under Fire as BTC Breaks $10,000",
      "description": "Bitcoin prices are down -13% this week as traders look to pressure the coin toward an important trendline. At present, technical support looks to be the sole factor keeping BTC afloat.",
      "url": "https://www.dailyfx.com/forex/market_alert/2019/08/15/Bitcoin-Price-Forecast-Trendline-Under-Fire-as-BTC-Breaks-10000.html",
      "urlToImage": "https://a.c-dn.net/b/3X00wL/headline_iStock-813229470.jpg",
      "publishedAt": "2019-08-15T18:00:00Z",
      "content": "Bitcoin Price Forecast:\r\n<ul><li>Bitcoin dropped beneath $10,000 and went on to test the 38.2% Fib level around $9,545 as bullish bets unwind </li><li>As I noted on Tuesday, BTCUSD may fall under further pressure as the US-China trade war cools and emerging m… [+2727 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Forbes.com"
      },
      "author": "Jeb Su, Contributor, Jeb Su, Contributor https://www.forbes.com/sites/jeanbaptiste/",
      "title": "Hackers Stole Over $4 Billion From Crypto Crimes In 2019 So Far, Up From $1.7 Billion In All Of 2018",
      "description": "Atherton Research's Principal Analyst and Futurist Jeb Su shares his take on CipherTrace's latest Cryptocurrency Anti-Money Laundering (AML) report which analyzes cryptocurrency-related crime and provides a comprehensive overview of major cryptocurrency theft…",
      "url": "https://www.forbes.com/sites/jeanbaptiste/2019/08/15/hackers-stole-over-4-billion-from-crypto-crimes-in-2019-so-far-up-from-1-7-billion-in-all-of-2018/",
      "urlToImage": "https://thumbor.forbes.com/thumbor/600x315/https%3A%2F%2Fspecials-images.forbesimg.com%2Fdam%2Fimageserve%2F43095951%2F960x0.jpg%3Ffit%3Dscale",
      "publishedAt": "2019-08-15T17:49:00Z",
      "content": "<ul><li>Share to facebook</li><li>Share to twitter</li><li>Share to linkedin</li></ul>\r\nIn the first half of 2019, hackers stole over $4 billion of crypto assets from investors. (Photo by Chris Ratcliffe/Bloomberg)\r\n© 2018 Bloomberg Finance LP\r\n2019 is shapin… [+9987 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Reality.news"
      },
      "author": "Jim Manning",
      "title": "Crypto Startup WAX Offers Blockchain-Based Collectables That Can Displayed in AR via Terra Virtua App",
      "description": "Increasingly, cutting-edge platforms like blockchain technology and augmented reality are overlapping, forging new digital frontiers that promise to change the way we interact with the virtual and the real world. The latest effort in this area features blockc…",
      "url": "https://next.reality.news/news/crypto-startup-wax-offers-blockchain-based-collectables-can-displayed-ar-via-terra-virtua-app-0203388/",
      "urlToImage": "https://img.reality.news/img/03/21/63701450305678/0/crypto-startup-wax-offers-blockchain-based-collectables-can-displayed-ar-via-terra-virtua-app.1280x600.jpg",
      "publishedAt": "2019-08-15T17:35:00Z",
      "content": "Increasingly, cutting-edge platforms like blockchain technology and augmented reality are overlapping, forging new digital frontiers that promise to change the way we interact with the virtual and the real world.\r\nThe latest effort in this area features block… [+2411 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Threatpost.com"
      },
      "author": "Tara Seals",
      "title": "Choice Hotels Breach Showcases Need for Shared Responsibility Model",
      "description": "700,000 customer records were exposed after being housed on a vendor's server that lacked appropriate security.",
      "url": "https://threatpost.com/choice-hotels-breach-shared-responsibility-model/147383/",
      "urlToImage": "https://media.threatpost.com/wp-content/uploads/sites/103/2019/08/15123426/choice-hotels-e1565886877575.jpg",
      "publishedAt": "2019-08-15T17:04:15Z",
      "content": "700,000 customer records were exposed after being housed on a vendor’s server that lacked appropriate security.Hospitality giant Choice Hotels fell victim to hackers this week, thanks to a MongoDB database that was left open to the internet containing 700,000… [+3884 chars]"
    }
  ]
}

const hereMapApiResponse1 = {
  "results": [
    {
      "title": "Nonachandanpur Manmatha Nath HS",
      "highlightedTitle": "Nonachandanpur <b>Manmatha</b> <b>Nath</b> HS",
      "vicinity": "Barasat Barrackpore Road<br/>Barrackpur 700122 WB",
      "highlightedVicinity": "Barasat Barrackpore Road<br/>Barrackpur 700122 WB",
      "position": [
        22.7672,
        88.37557
      ],
      "category": "education-facility",
      "href": "https://places.cit.api.here.com/places/v1/places/356jx7ps-6f2cf687fc300f9df20dda6b8632bfd6;context=Zmxvdy1pZD1hY2I3MTM4Mi02MDU1LTU4MTktODA3Yy1mNTcxNjQ3NzkzNjFfMTU0MTQxODMzNTI3MV84NDU4Xzg5NTEmcmFuaz0w?app_id=V4wSKcxp8q2UsEzgXebH&app_code=IP9EQlom47cE7GbbxCKFkw",
      "type": "urn:nlp-types:place",
      "resultType": "place",
      "id": "356jx7ps-6f2cf687fc300f9df20dda6b8632bfd6",
      "distance": 23606
    },
    {
      "title": "Nona Chandanpukur Manmatha Nath High School",
      "highlightedTitle": "Nona Chandanpukur <b>Manmatha</b> <b>Nath</b> High <b>School</b>",
      "vicinity": "Panchanan Tala Road<br/>Barrackpur 700122 WB",
      "highlightedVicinity": "Panchanan Tala Road<br/>Barrackpur 700122 WB",
      "position": [
        22.77177,
        88.37692
      ],
      "category": "education-facility",
      "href": "https://places.cit.api.here.com/places/v1/places/356d408k-aca1860fe39602f4ba56523442f7fc2f;context=Zmxvdy1pZD1hY2I3MTM4Mi02MDU1LTU4MTktODA3Yy1mNTcxNjQ3NzkzNjFfMTU0MTQxODMzNTI3MV84NDU4Xzg5NTEmcmFuaz0x?app_id=V4wSKcxp8q2UsEzgXebH&app_code=IP9EQlom47cE7GbbxCKFkw",
      "type": "urn:nlp-types:place",
      "resultType": "place",
      "id": "356d408k-aca1860fe39602f4ba56523442f7fc2f",
      "distance": 24107
    },
    {
      "title": "Calcutta Boys' School",
      "highlightedTitle": "Calcutta <b>Boys'</b> <b>School</b>",
      "vicinity": "Surendra Nath Banerjee Road<br/>Kolkata 700014 WB",
      "highlightedVicinity": "Surendra <b>Nath</b> Banerjee Road<br/>Kolkata 700014 WB",
      "position": [
        22.56073,
        88.36582
      ],
      "category": "education-facility",
      "href": "https://places.cit.api.here.com/places/v1/places/356tunb6-7fc7b80b096f4e289587fcb754ef46b6;context=Zmxvdy1pZD1hY2I3MTM4Mi02MDU1LTU4MTktODA3Yy1mNTcxNjQ3NzkzNjFfMTU0MTQxODMzNTI3MV84NDU4Xzg5NTEmcmFuaz0y?app_id=V4wSKcxp8q2UsEzgXebH&app_code=IP9EQlom47cE7GbbxCKFkw",
      "type": "urn:nlp-types:place",
      "resultType": "place",
      "id": "356tunb6-7fc7b80b096f4e289587fcb754ef46b6",
      "distance": 2113
    },
    {
      "title": "Rabindra Nath Vidya Bhavan",
      "highlightedTitle": "Rabindra <b>Nath</b> Vidya Bhavan",
      "vicinity": "Kolkata 700015 WB",
      "highlightedVicinity": "Kolkata 700015 WB",
      "position": [
        22.55661,
        88.38373
      ],
      "category": "education-facility",
      "href": "https://places.cit.api.here.com/places/v1/places/356tunb7-52bf94acf3b34ed5af7ff695ad67c746;context=Zmxvdy1pZD1hY2I3MTM4Mi02MDU1LTU4MTktODA3Yy1mNTcxNjQ3NzkzNjFfMTU0MTQxODMzNTI3MV84NDU4Xzg5NTEmcmFuaz0z?app_id=V4wSKcxp8q2UsEzgXebH&app_code=IP9EQlom47cE7GbbxCKFkw",
      "type": "urn:nlp-types:place",
      "resultType": "place",
      "id": "356tunb7-52bf94acf3b34ed5af7ff695ad67c746",
      "distance": 302
    },
    {
      "title": "Manmatha Nath Bhawan",
      "highlightedTitle": "<b>Manmatha</b> <b>Nath</b> Bhawan",
      "vicinity": "Howrah 711104 WB",
      "highlightedVicinity": "Howrah 711104 WB",
      "position": [
        22.57803,
        88.30038
      ],
      "category": "building",
      "href": "https://places.cit.api.here.com/places/v1/places/356jx7ps-39d30e6da65c0473d205111677270756;context=Zmxvdy1pZD1hY2I3MTM4Mi02MDU1LTU4MTktODA3Yy1mNTcxNjQ3NzkzNjFfMTU0MTQxODMzNTI3MV84NDU4Xzg5NTEmcmFuaz00?app_id=V4wSKcxp8q2UsEzgXebH&app_code=IP9EQlom47cE7GbbxCKFkw",
      "type": "urn:nlp-types:place",
      "resultType": "place",
      "id": "356jx7ps-39d30e6da65c0473d205111677270756",
      "distance": 9106
    },
    {
      "title": "Tangra Muslim Boys School",
      "highlightedTitle": "Tangra Muslim <b>Boys</b> <b>School</b>",
      "vicinity": "Debendra Chandra Dey Road<br/>WB",
      "highlightedVicinity": "Debendra Chandra Dey Road<br/>WB",
      "position": [
        22.55919,
        88.38356
      ],
      "category": "education-facility",
      "href": "https://places.cit.api.here.com/places/v1/places/356tunb7-1325205fb9df40019c08a75fa0e597fd;context=Zmxvdy1pZD1hY2I3MTM4Mi02MDU1LTU4MTktODA3Yy1mNTcxNjQ3NzkzNjFfMTU0MTQxODMzNTI3MV84NDU4Xzg5NTEmcmFuaz01?app_id=V4wSKcxp8q2UsEzgXebH&app_code=IP9EQlom47cE7GbbxCKFkw",
      "type": "urn:nlp-types:place",
      "resultType": "place",
      "id": "356tunb7-1325205fb9df40019c08a75fa0e597fd",
      "distance": 574
    },
    {
      "title": "La Martiniere for Boys",
      "highlightedTitle": "La Martiniere for <b>Boys</b>",
      "vicinity": "Loudon Street<br/>Kolkata 700016 WB",
      "highlightedVicinity": "Loudon Street<br/>Kolkata 700016 WB",
      "position": [
        22.54864,
        88.35827
      ],
      "category": "education-facility",
      "href": "https://places.cit.api.here.com/places/v1/places/356tunb4-e91a75609a0b484aa3d5d03bf4eb81b5;context=Zmxvdy1pZD1hY2I3MTM4Mi02MDU1LTU4MTktODA3Yy1mNTcxNjQ3NzkzNjFfMTU0MTQxODMzNTI3MV84NDU4Xzg5NTEmcmFuaz02?app_id=V4wSKcxp8q2UsEzgXebH&app_code=IP9EQlom47cE7GbbxCKFkw",
      "type": "urn:nlp-types:place",
      "resultType": "place",
      "id": "356tunb4-e91a75609a0b484aa3d5d03bf4eb81b5",
      "distance": 2831
    },
    {
      "title": "Jodhpur Park Boys School",
      "highlightedTitle": "Jodhpur Park <b>Boys</b> <b>School</b>",
      "vicinity": "Kolkata 700068 WB",
      "highlightedVicinity": "Kolkata 700068 WB",
      "position": [
        22.50491,
        88.36409
      ],
      "category": "education-facility",
      "href": "https://places.cit.api.here.com/places/v1/places/356tunb4-bb6f31414ae0462099ab7738afe1b575;context=Zmxvdy1pZD1hY2I3MTM4Mi02MDU1LTU4MTktODA3Yy1mNTcxNjQ3NzkzNjFfMTU0MTQxODMzNTI3MV84NDU4Xzg5NTEmcmFuaz03?app_id=V4wSKcxp8q2UsEzgXebH&app_code=IP9EQlom47cE7GbbxCKFkw",
      "type": "urn:nlp-types:place",
      "resultType": "place",
      "id": "356tunb4-bb6f31414ae0462099ab7738afe1b575",
      "distance": 5873
    },
    {
      "title": "Baliaghata Shanti Sangha Vidyaytan Boys Primary",
      "highlightedTitle": "Baliaghata Shanti Sangha Vidyaytan <b>Boys</b> Primary",
      "vicinity": "Barwaritala Road<br/>Kolkata 700010 WB",
      "highlightedVicinity": "Barwaritala Road<br/>Kolkata 700010 WB",
      "position": [
        22.5619,
        88.39096
      ],
      "category": "education-facility",
      "href": "https://places.cit.api.here.com/places/v1/places/356tunb7-668f694736384a099f11f522fcc5ee49;context=Zmxvdy1pZD1hY2I3MTM4Mi02MDU1LTU4MTktODA3Yy1mNTcxNjQ3NzkzNjFfMTU0MTQxODMzNTI3MV84NDU4Xzg5NTEmcmFuaz04?app_id=V4wSKcxp8q2UsEzgXebH&app_code=IP9EQlom47cE7GbbxCKFkw",
      "type": "urn:nlp-types:place",
      "resultType": "place",
      "id": "356tunb7-668f694736384a099f11f522fcc5ee49",
      "distance": 1041
    },
    {
      "title": "National High School",
      "highlightedTitle": "National High <b>School</b>",
      "vicinity": "Hazra Road<br/>Kolkata 700029 WB",
      "highlightedVicinity": "Hazra Road<br/>Kolkata 700029 WB",
      "position": [
        22.52468,
        88.35631
      ],
      "category": "education-facility",
      "href": "https://places.cit.api.here.com/places/v1/places/356tunb4-edec625e1fe14c2182837d217a099577;context=Zmxvdy1pZD1hY2I3MTM4Mi02MDU1LTU4MTktODA3Yy1mNTcxNjQ3NzkzNjFfMTU0MTQxODMzNTI3MV84NDU4Xzg5NTEmcmFuaz05?app_id=V4wSKcxp8q2UsEzgXebH&app_code=IP9EQlom47cE7GbbxCKFkw",
      "type": "urn:nlp-types:place",
      "resultType": "place",
      "id": "356tunb4-edec625e1fe14c2182837d217a099577",
      "distance": 4414
    },
    {
      "title": "Ushumpur Adarsh Ucha Boys School",
      "highlightedTitle": "Ushumpur Adarsh Ucha <b>Boys</b> <b>School</b>",
      "vicinity": "North Basudevpur Road<br/>Kolkata 700083 WB",
      "highlightedVicinity": "North Basudevpur Road<br/>Kolkata 700083 WB",
      "position": [
        22.68093,
        88.39213
      ],
      "category": "education-facility",
      "href": "https://places.cit.api.here.com/places/v1/places/356tunc5-99d64ec986d3475799b2136f5102b205;context=Zmxvdy1pZD1hY2I3MTM4Mi02MDU1LTU4MTktODA3Yy1mNTcxNjQ3NzkzNjFfMTU0MTQxODMzNTI3MV84NDU4Xzg5NTEmcmFuaz0xMA?app_id=V4wSKcxp8q2UsEzgXebH&app_code=IP9EQlom47cE7GbbxCKFkw",
      "type": "urn:nlp-types:place",
      "resultType": "place",
      "id": "356tunc5-99d64ec986d3475799b2136f5102b205",
      "distance": 14051
    },
    {
      "title": "Dankuni Little Boys School",
      "highlightedTitle": "Dankuni Little <b>Boys</b> <b>School</b>",
      "vicinity": "T N Mukherjee Road<br/>Chanditala-II 712310 WB",
      "highlightedVicinity": "T N Mukherjee Road<br/>Chanditala-II 712310 WB",
      "position": [
        22.67741,
        88.30258
      ],
      "category": "education-facility",
      "href": "https://places.cit.api.here.com/places/v1/places/356tunc1-af4fb72aefad4e2a9a801590b2f763f4;context=Zmxvdy1pZD1hY2I3MTM4Mi02MDU1LTU4MTktODA3Yy1mNTcxNjQ3NzkzNjFfMTU0MTQxODMzNTI3MV84NDU4Xzg5NTEmcmFuaz0xMQ?app_id=V4wSKcxp8q2UsEzgXebH&app_code=IP9EQlom47cE7GbbxCKFkw",
      "type": "urn:nlp-types:place",
      "resultType": "place",
      "id": "356tunc1-af4fb72aefad4e2a9a801590b2f763f4",
      "distance": 16067
    },
    {
      "title": "Tiljala Primary Boys School",
      "highlightedTitle": "Tiljala Primary <b>Boys</b> <b>School</b>",
      "vicinity": "Picnic Garden Road<br/>Kolkata 700039 WB",
      "highlightedVicinity": "Picnic Garden Road<br/>Kolkata 700039 WB",
      "position": [
        22.52922,
        88.37448
      ],
      "category": "education-facility",
      "href": "https://places.cit.api.here.com/places/v1/places/356jx7ps-30adee6b23810bf593a3ce3cb88f5f88;context=Zmxvdy1pZD1hY2I3MTM4Mi02MDU1LTU4MTktODA3Yy1mNTcxNjQ3NzkzNjFfMTU0MTQxODMzNTI3MV84NDU4Xzg5NTEmcmFuaz0xMg?app_id=V4wSKcxp8q2UsEzgXebH&app_code=IP9EQlom47cE7GbbxCKFkw",
      "type": "urn:nlp-types:place",
      "resultType": "place",
      "id": "356jx7ps-30adee6b23810bf593a3ce3cb88f5f88",
      "distance": 2977
    },
    {
      "title": "Brahmo Boys School H. S",
      "highlightedTitle": "Brahmo <b>Boys</b> <b>School</b> H. S",
      "vicinity": "Jhama Pukur Lane<br/>Kolkata 700009 WB",
      "highlightedVicinity": "Jhama Pukur Lane<br/>Kolkata 700009 WB",
      "position": [
        22.5799,
        88.36801
      ],
      "category": "education-facility",
      "href": "https://places.cit.api.here.com/places/v1/places/356tunb6-5fe1a976b33a41f4ab7432f618cf7d0d;context=Zmxvdy1pZD1hY2I3MTM4Mi02MDU1LTU4MTktODA3Yy1mNTcxNjQ3NzkzNjFfMTU0MTQxODMzNTI3MV84NDU4Xzg5NTEmcmFuaz0xMw?app_id=V4wSKcxp8q2UsEzgXebH&app_code=IP9EQlom47cE7GbbxCKFkw",
      "type": "urn:nlp-types:place",
      "resultType": "place",
      "id": "356tunb6-5fe1a976b33a41f4ab7432f618cf7d0d",
      "distance": 3345
    },
    {
      "title": "Harvard House High School for Boys",
      "highlightedTitle": "Harvard House High <b>School</b> for <b>Boys</b>",
      "vicinity": "Kolkata 700046 WB",
      "highlightedVicinity": "Kolkata 700046 WB",
      "position": [
        22.55324,
        88.39272
      ],
      "category": "education-facility",
      "href": "https://places.cit.api.here.com/places/v1/places/356tunb7-11e56c6e14b74fa29d7bce39c4cdeb96;context=Zmxvdy1pZD1hY2I3MTM4Mi02MDU1LTU4MTktODA3Yy1mNTcxNjQ3NzkzNjFfMTU0MTQxODMzNTI3MV84NDU4Xzg5NTEmcmFuaz0xNA?app_id=V4wSKcxp8q2UsEzgXebH&app_code=IP9EQlom47cE7GbbxCKFkw",
      "type": "urn:nlp-types:place",
      "resultType": "place",
      "id": "356tunb7-11e56c6e14b74fa29d7bce39c4cdeb96",
      "distance": 788
    },
    {
      "title": "Tiljala Boy's & Girl's Pri School",
      "highlightedTitle": "Tiljala <b>Boy's</b> & Girl's Pri <b>School</b>",
      "vicinity": "Kolkata 700046 WB",
      "highlightedVicinity": "Kolkata 700046 WB",
      "position": [
        22.54014,
        88.37675
      ],
      "category": "education-facility",
      "href": "https://places.cit.api.here.com/places/v1/places/356jx7ps-f63ba1b7af39063ee6834824decea7ae;context=Zmxvdy1pZD1hY2I3MTM4Mi02MDU1LTU4MTktODA3Yy1mNTcxNjQ3NzkzNjFfMTU0MTQxODMzNTI3MV84NDU4Xzg5NTEmcmFuaz0xNQ?app_id=V4wSKcxp8q2UsEzgXebH&app_code=IP9EQlom47cE7GbbxCKFkw",
      "type": "urn:nlp-types:place",
      "resultType": "place",
      "id": "356jx7ps-f63ba1b7af39063ee6834824decea7ae",
      "distance": 1781
    },
    {
      "title": "New Barakpur Colony Boys High School",
      "highlightedTitle": "New Barakpur Colony <b>Boys</b> High <b>School</b>",
      "vicinity": "H N Mukherjee Road<br/>Kolkata 700130 WB",
      "highlightedVicinity": "H N Mukherjee Road<br/>Kolkata 700130 WB",
      "position": [
        22.68945,
        88.44695
      ],
      "category": "education-facility",
      "href": "https://places.cit.api.here.com/places/v1/places/356tunch-135a90a80e264149ac203758ab9b190f;context=Zmxvdy1pZD1hY2I3MTM4Mi02MDU1LTU4MTktODA3Yy1mNTcxNjQ3NzkzNjFfMTU0MTQxODMzNTI3MV84NDU4Xzg5NTEmcmFuaz0xNg?app_id=V4wSKcxp8q2UsEzgXebH&app_code=IP9EQlom47cE7GbbxCKFkw",
      "type": "urn:nlp-types:place",
      "resultType": "place",
      "id": "356tunch-135a90a80e264149ac203758ab9b190f",
      "distance": 16269
    },
    {
      "title": "Chetla Boy's High School",
      "highlightedTitle": "Chetla <b>Boy's</b> High <b>School</b>",
      "vicinity": "Kooalkoata 700027 WB",
      "highlightedVicinity": "Kooalkoata 700027 WB",
      "position": [
        22.516953,
        88.339841
      ],
      "category": "education-facility",
      "href": "https://places.cit.api.here.com/places/v1/places/356tunb4-ee771ec147694002b190753526a80ab6;context=Zmxvdy1pZD1hY2I3MTM4Mi02MDU1LTU4MTktODA3Yy1mNTcxNjQ3NzkzNjFfMTU0MTQxODMzNTI3MV84NDU4Xzg5NTEmcmFuaz0xNw?app_id=V4wSKcxp8q2UsEzgXebH&app_code=IP9EQlom47cE7GbbxCKFkw",
      "type": "urn:nlp-types:place",
      "resultType": "place",
      "id": "356tunb4-ee771ec147694002b190753526a80ab6",
      "distance": 6223
    },
    {
      "title": "Kamrabad Boys High School",
      "highlightedTitle": "Kamrabad <b>Boys</b> High <b>School</b>",
      "vicinity": "R N Avenue<br/>Kolkata 700117 WB",
      "highlightedVicinity": "R N Avenue<br/>Kolkata 700117 WB",
      "position": [
        22.701054,
        88.382224
      ],
      "category": "library",
      "href": "https://places.cit.api.here.com/places/v1/places/356tunb1-bbf042c409474d43a6474fd13d7bd604;context=Zmxvdy1pZD1hY2I3MTM4Mi02MDU1LTU4MTktODA3Yy1mNTcxNjQ3NzkzNjFfMTU0MTQxODMzNTI3MV84NDU4Xzg5NTEmcmFuaz0xOA?app_id=V4wSKcxp8q2UsEzgXebH&app_code=IP9EQlom47cE7GbbxCKFkw",
      "type": "urn:nlp-types:place",
      "resultType": "place",
      "id": "356tunb1-bbf042c409474d43a6474fd13d7bd604",
      "distance": 16264
    },
    {
      "title": "Raja Bazar Boys and Girls School",
      "highlightedTitle": "Raja Bazar <b>Boys</b> and Girls <b>School</b>",
      "vicinity": "Kolkata 700009 WB",
      "highlightedVicinity": "Kolkata 700009 WB",
      "position": [
        22.57685,
        88.37519
      ],
      "category": "education-facility",
      "href": "https://places.cit.api.here.com/places/v1/places/356tunb7-ae3185afefb24b6cbe32e07f5152b082;context=Zmxvdy1pZD1hY2I3MTM4Mi02MDU1LTU4MTktODA3Yy1mNTcxNjQ3NzkzNjFfMTU0MTQxODMzNTI3MV84NDU4Xzg5NTEmcmFuaz0xOQ?app_id=V4wSKcxp8q2UsEzgXebH&app_code=IP9EQlom47cE7GbbxCKFkw",
      "type": "urn:nlp-types:place",
      "resultType": "place",
      "id": "356tunb7-ae3185afefb24b6cbe32e07f5152b082",
      "distance": 2707
    }
  ]
}

const hereMapApiResponse = {
  "results": {
    "next": "https://places.demo.api.here.com/places/v1/discover/explore;context=Y2F0PXJlc3RhdXJhbnQmZmxvdy1pZD0xOTgzYTAwMC05ZDMwLTUxMzUtOTg5MS0wODY3OWIzMjQ5MjNfMTU2NjA3MTY3NTA3OV8wXzY2NDkmb2Zmc2V0PTIwJnNpemU9MjA?in=22.769%2C88.371%3Br%3D1000.0&app_id=V4wSKcxp8q2UsEzgXebH&app_code=IP9EQlom47cE7GbbxCKFkw",
    "items": [
      {
        "position": [
          22.766757,
          88.369461
        ],
        "distance": 295,
        "title": "VFC Family Restaurant",
        "averageRating": 0,
        "category": {
          "id": "restaurant",
          "title": "Restaurant",
          "href": "https://places.demo.api.here.com/places/v1/categories/places/restaurant?app_id=V4wSKcxp8q2UsEzgXebH&app_code=IP9EQlom47cE7GbbxCKFkw",
          "type": "urn:nlp-types:category",
          "system": "places"
        },
        "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/03.icon",
        "vicinity": "Barasat Barrackpore Road<br/>Barrackpur 700122 WB",
        "having": [

        ],
        "type": "urn:nlp-types:place",
        "href": "https://places.demo.api.here.com/places/v1/places/356d408k-1e7fe02e145d0117b91b528d355dc6dd;context=Zmxvdy1pZD0xOTgzYTAwMC05ZDMwLTUxMzUtOTg5MS0wODY3OWIzMjQ5MjNfMTU2NjA3MTY3NTA3OV8wXzY2NDkmcmFuaz0w?app_id=V4wSKcxp8q2UsEzgXebH&app_code=IP9EQlom47cE7GbbxCKFkw",
        "tags": [
          {
            "id": "asian",
            "title": "Asian",
            "group": "cuisine"
          },
          {
            "id": "indian",
            "title": "Indian",
            "group": "cuisine"
          }
        ],
        "id": "356d408k-1e7fe02e145d0117b91b528d355dc6dd"
      },
      {
        "position": [
          22.77471,
          88.37133
        ],
        "distance": 636,
        "title": "Deep Restaurant",
        "averageRating": 0,
        "category": {
          "id": "restaurant",
          "title": "Restaurant",
          "href": "https://places.demo.api.here.com/places/v1/categories/places/restaurant?app_id=V4wSKcxp8q2UsEzgXebH&app_code=IP9EQlom47cE7GbbxCKFkw",
          "type": "urn:nlp-types:category",
          "system": "places"
        },
        "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/03.icon",
        "vicinity": "J. R. R. Road<br/>Barrackpur 700122 WB",
        "having": [

        ],
        "type": "urn:nlp-types:place",
        "href": "https://places.demo.api.here.com/places/v1/places/356jx7ps-9511a733ee6a00198512620d3ed63821;context=Zmxvdy1pZD0xOTgzYTAwMC05ZDMwLTUxMzUtOTg5MS0wODY3OWIzMjQ5MjNfMTU2NjA3MTY3NTA3OV8wXzY2NDkmcmFuaz0x?app_id=V4wSKcxp8q2UsEzgXebH&app_code=IP9EQlom47cE7GbbxCKFkw",
        "tags": [
          {
            "id": "asian",
            "title": "Asian",
            "group": "cuisine"
          },
          {
            "id": "indian",
            "title": "Indian",
            "group": "cuisine"
          }
        ],
        "id": "356jx7ps-9511a733ee6a00198512620d3ed63821"
      },
      {
        "position": [
          22.77478,
          88.37034
        ],
        "distance": 646,
        "title": "Bubai Fast Food Centre",
        "averageRating": 0,
        "category": {
          "id": "restaurant",
          "title": "Restaurant",
          "href": "https://places.demo.api.here.com/places/v1/categories/places/restaurant?app_id=V4wSKcxp8q2UsEzgXebH&app_code=IP9EQlom47cE7GbbxCKFkw",
          "type": "urn:nlp-types:category",
          "system": "places"
        },
        "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/03.icon",
        "vicinity": "J. R. R. Road<br/>Barrackpur 700122 WB",
        "having": [

        ],
        "type": "urn:nlp-types:place",
        "href": "https://places.demo.api.here.com/places/v1/places/356jx7ps-c270ac3b48610afe9b530f91c09bd07f;context=Zmxvdy1pZD0xOTgzYTAwMC05ZDMwLTUxMzUtOTg5MS0wODY3OWIzMjQ5MjNfMTU2NjA3MTY3NTA3OV8wXzY2NDkmcmFuaz0y?app_id=V4wSKcxp8q2UsEzgXebH&app_code=IP9EQlom47cE7GbbxCKFkw",
        "id": "356jx7ps-c270ac3b48610afe9b530f91c09bd07f"
      },
      {
        "position": [
          22.76232,
          88.37004
        ],
        "distance": 749,
        "title": "KFC",
        "averageRating": 0,
        "category": {
          "id": "restaurant",
          "title": "Restaurant",
          "href": "https://places.demo.api.here.com/places/v1/categories/places/restaurant?app_id=V4wSKcxp8q2UsEzgXebH&app_code=IP9EQlom47cE7GbbxCKFkw",
          "type": "urn:nlp-types:category",
          "system": "places"
        },
        "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/03.icon",
        "vicinity": "G P Road<br/>Barrackpur WB",
        "having": [

        ],
        "type": "urn:nlp-types:place",
        "href": "https://places.demo.api.here.com/places/v1/places/356tunc6-221d9ed578d84806b6329ea699015cfa;context=Zmxvdy1pZD0xOTgzYTAwMC05ZDMwLTUxMzUtOTg5MS0wODY3OWIzMjQ5MjNfMTU2NjA3MTY3NTA3OV8wXzY2NDkmcmFuaz0z?app_id=V4wSKcxp8q2UsEzgXebH&app_code=IP9EQlom47cE7GbbxCKFkw",
        "id": "356tunc6-221d9ed578d84806b6329ea699015cfa",
        "chainIds": [
          "1559"
        ]
      },
      {
        "position": [
          22.76194,
          88.37012
        ],
        "distance": 790,
        "title": "Brain Bells, Barrackpore",
        "averageRating": 0,
        "category": {
          "id": "restaurant",
          "title": "Restaurant",
          "href": "https://places.demo.api.here.com/places/v1/categories/places/restaurant?app_id=V4wSKcxp8q2UsEzgXebH&app_code=IP9EQlom47cE7GbbxCKFkw",
          "type": "urn:nlp-types:category",
          "system": "places"
        },
        "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/03.icon",
        "vicinity": "Ghosh Para Road<br/>Barrackpur 700120 WB",
        "having": [

        ],
        "type": "urn:nlp-types:place",
        "href": "https://places.demo.api.here.com/places/v1/places/356tunc6-1f6167d88fca415482f56412c93885d3;context=Zmxvdy1pZD0xOTgzYTAwMC05ZDMwLTUxMzUtOTg5MS0wODY3OWIzMjQ5MjNfMTU2NjA3MTY3NTA3OV8wXzY2NDkmcmFuaz00?app_id=V4wSKcxp8q2UsEzgXebH&app_code=IP9EQlom47cE7GbbxCKFkw",
        "tags": [
          {
            "id": "asian",
            "title": "Asian",
            "group": "cuisine"
          },
          {
            "id": "indian",
            "title": "Indian",
            "group": "cuisine"
          }
        ],
        "id": "356tunc6-1f6167d88fca415482f56412c93885d3"
      },
      {
        "position": [
          22.76101,
          88.3703
        ],
        "distance": 891,
        "title": "DADA BOUDI Biriyani",
        "averageRating": 0,
        "category": {
          "id": "restaurant",
          "title": "Restaurant",
          "href": "https://places.demo.api.here.com/places/v1/categories/places/restaurant?app_id=V4wSKcxp8q2UsEzgXebH&app_code=IP9EQlom47cE7GbbxCKFkw",
          "type": "urn:nlp-types:category",
          "system": "places"
        },
        "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/03.icon",
        "vicinity": "Ghosh Para Road<br/>Barrackpur 700120 WB",
        "having": [

        ],
        "type": "urn:nlp-types:place",
        "href": "https://places.demo.api.here.com/places/v1/places/356tunc6-dd2bb98930f74ea89f835805936177ff;context=Zmxvdy1pZD0xOTgzYTAwMC05ZDMwLTUxMzUtOTg5MS0wODY3OWIzMjQ5MjNfMTU2NjA3MTY3NTA3OV8wXzY2NDkmcmFuaz01?app_id=V4wSKcxp8q2UsEzgXebH&app_code=IP9EQlom47cE7GbbxCKFkw",
        "tags": [
          {
            "id": "asian",
            "title": "Asian",
            "group": "cuisine"
          },
          {
            "id": "indian",
            "title": "Indian",
            "group": "cuisine"
          }
        ],
        "id": "356tunc6-dd2bb98930f74ea89f835805936177ff"
      },
      {
        "position": [
          22.76101,
          88.37026
        ],
        "distance": 892,
        "title": "Dada Bhai Hotel",
        "averageRating": 0,
        "category": {
          "id": "restaurant",
          "title": "Restaurant",
          "href": "https://places.demo.api.here.com/places/v1/categories/places/restaurant?app_id=V4wSKcxp8q2UsEzgXebH&app_code=IP9EQlom47cE7GbbxCKFkw",
          "type": "urn:nlp-types:category",
          "system": "places"
        },
        "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/03.icon",
        "vicinity": "Barrackpur 700120 WB",
        "having": [

        ],
        "type": "urn:nlp-types:place",
        "href": "https://places.demo.api.here.com/places/v1/places/356tunc6-912ba5ee81a3469899a2140ec6309f94;context=Zmxvdy1pZD0xOTgzYTAwMC05ZDMwLTUxMzUtOTg5MS0wODY3OWIzMjQ5MjNfMTU2NjA3MTY3NTA3OV8wXzY2NDkmcmFuaz02?app_id=V4wSKcxp8q2UsEzgXebH&app_code=IP9EQlom47cE7GbbxCKFkw",
        "tags": [
          {
            "id": "asian",
            "title": "Asian",
            "group": "cuisine"
          },
          {
            "id": "indian",
            "title": "Indian",
            "group": "cuisine"
          }
        ],
        "id": "356tunc6-912ba5ee81a3469899a2140ec6309f94"
      },
      {
        "position": [
          22.760984,
          88.370215
        ],
        "distance": 895,
        "title": "KFC Barrackpore",
        "averageRating": 0,
        "category": {
          "id": "restaurant",
          "title": "Restaurant",
          "href": "https://places.demo.api.here.com/places/v1/categories/places/restaurant?app_id=V4wSKcxp8q2UsEzgXebH&app_code=IP9EQlom47cE7GbbxCKFkw",
          "type": "urn:nlp-types:category",
          "system": "places"
        },
        "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/03.icon",
        "vicinity": "Barrackpur 700120 WB",
        "having": [

        ],
        "type": "urn:nlp-types:place",
        "href": "https://places.demo.api.here.com/places/v1/places/356tunc6-5193c33ad5b047d4bcffe94ca3f3b908;context=Zmxvdy1pZD0xOTgzYTAwMC05ZDMwLTUxMzUtOTg5MS0wODY3OWIzMjQ5MjNfMTU2NjA3MTY3NTA3OV8wXzY2NDkmcmFuaz03?app_id=V4wSKcxp8q2UsEzgXebH&app_code=IP9EQlom47cE7GbbxCKFkw",
        "tags": [
          {
            "id": "burger",
            "title": "Burgers",
            "group": "cuisine"
          }
        ],
        "id": "356tunc6-5193c33ad5b047d4bcffe94ca3f3b908",
        "chainIds": [
          "1559"
        ]
      },
      {
        "position": [
          22.761046,
          88.369023
        ],
        "distance": 907,
        "title": "Punjab Restaurant and Madras Tiffin",
        "averageRating": 0,
        "category": {
          "id": "restaurant",
          "title": "Restaurant",
          "href": "https://places.demo.api.here.com/places/v1/categories/places/restaurant?app_id=V4wSKcxp8q2UsEzgXebH&app_code=IP9EQlom47cE7GbbxCKFkw",
          "type": "urn:nlp-types:category",
          "system": "places"
        },
        "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/03.icon",
        "vicinity": "Barrackpur 700120 WB",
        "having": [

        ],
        "type": "urn:nlp-types:place",
        "href": "https://places.demo.api.here.com/places/v1/places/356d408k-f0becdd7c89f0bf7cb61215258d49f97;context=Zmxvdy1pZD0xOTgzYTAwMC05ZDMwLTUxMzUtOTg5MS0wODY3OWIzMjQ5MjNfMTU2NjA3MTY3NTA3OV8wXzY2NDkmcmFuaz04?app_id=V4wSKcxp8q2UsEzgXebH&app_code=IP9EQlom47cE7GbbxCKFkw",
        "tags": [
          {
            "id": "asian",
            "title": "Asian",
            "group": "cuisine"
          },
          {
            "id": "indian",
            "title": "Indian",
            "group": "cuisine"
          }
        ],
        "id": "356d408k-f0becdd7c89f0bf7cb61215258d49f97"
      },
      {
        "position": [
          22.760921,
          88.368518
        ],
        "distance": 934,
        "title": "Kasturi Barrackpore",
        "averageRating": 0,
        "category": {
          "id": "restaurant",
          "title": "Restaurant",
          "href": "https://places.demo.api.here.com/places/v1/categories/places/restaurant?app_id=V4wSKcxp8q2UsEzgXebH&app_code=IP9EQlom47cE7GbbxCKFkw",
          "type": "urn:nlp-types:category",
          "system": "places"
        },
        "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/03.icon",
        "vicinity": "S N Banerjee Road<br/>Barrackpur 700120 WB",
        "having": [

        ],
        "type": "urn:nlp-types:place",
        "href": "https://places.demo.api.here.com/places/v1/places/356tunc6-40b93891a33746e5a25d358beb899567;context=Zmxvdy1pZD0xOTgzYTAwMC05ZDMwLTUxMzUtOTg5MS0wODY3OWIzMjQ5MjNfMTU2NjA3MTY3NTA3OV8wXzY2NDkmcmFuaz05?app_id=V4wSKcxp8q2UsEzgXebH&app_code=IP9EQlom47cE7GbbxCKFkw",
        "tags": [
          {
            "id": "asian",
            "title": "Asian",
            "group": "cuisine"
          },
          {
            "id": "indian",
            "title": "Indian",
            "group": "cuisine"
          },
          {
            "id": "indian-bengali",
            "title": "Indian - Bengali",
            "group": "cuisine"
          }
        ],
        "id": "356tunc6-40b93891a33746e5a25d358beb899567"
      },
      {
        "position": [
          22.760589,
          88.369523
        ],
        "distance": 947,
        "title": "Hayat Barrackpore",
        "averageRating": 0,
        "category": {
          "id": "restaurant",
          "title": "Restaurant",
          "href": "https://places.demo.api.here.com/places/v1/categories/places/restaurant?app_id=V4wSKcxp8q2UsEzgXebH&app_code=IP9EQlom47cE7GbbxCKFkw",
          "type": "urn:nlp-types:category",
          "system": "places"
        },
        "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/03.icon",
        "vicinity": "S N Banerjee Road<br/>Barrackpur 700120 WB",
        "having": [

        ],
        "type": "urn:nlp-types:place",
        "href": "https://places.demo.api.here.com/places/v1/places/356tuncd-3040e610734f43388b9551c147fd41a0;context=Zmxvdy1pZD0xOTgzYTAwMC05ZDMwLTUxMzUtOTg5MS0wODY3OWIzMjQ5MjNfMTU2NjA3MTY3NTA3OV8wXzY2NDkmcmFuaz0xMA?app_id=V4wSKcxp8q2UsEzgXebH&app_code=IP9EQlom47cE7GbbxCKFkw",
        "tags": [
          {
            "id": "asian",
            "title": "Asian",
            "group": "cuisine"
          },
          {
            "id": "indian",
            "title": "Indian",
            "group": "cuisine"
          }
        ],
        "id": "356tuncd-3040e610734f43388b9551c147fd41a0"
      },
      {
        "position": [
          22.76086,
          88.36813
        ],
        "distance": 952,
        "title": "Coffee With Love",
        "averageRating": 0,
        "category": {
          "id": "restaurant",
          "title": "Restaurant",
          "href": "https://places.demo.api.here.com/places/v1/categories/places/restaurant?app_id=V4wSKcxp8q2UsEzgXebH&app_code=IP9EQlom47cE7GbbxCKFkw",
          "type": "urn:nlp-types:category",
          "system": "places"
        },
        "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/03.icon",
        "vicinity": "B T Road<br/>Barrackpur WB",
        "having": [

        ],
        "type": "urn:nlp-types:place",
        "href": "https://places.demo.api.here.com/places/v1/places/356tunc6-e659c20a17d64a87802d0b6cca0b7da9;context=Zmxvdy1pZD0xOTgzYTAwMC05ZDMwLTUxMzUtOTg5MS0wODY3OWIzMjQ5MjNfMTU2NjA3MTY3NTA3OV8wXzY2NDkmcmFuaz0xMQ?app_id=V4wSKcxp8q2UsEzgXebH&app_code=IP9EQlom47cE7GbbxCKFkw",
        "id": "356tunc6-e659c20a17d64a87802d0b6cca0b7da9"
      },
      {
        "position": [
          22.76042,
          88.370086
        ],
        "distance": 959,
        "title": "Dada Boudi Hotel, Barrackpore",
        "averageRating": 0,
        "category": {
          "id": "restaurant",
          "title": "Restaurant",
          "href": "https://places.demo.api.here.com/places/v1/categories/places/restaurant?app_id=V4wSKcxp8q2UsEzgXebH&app_code=IP9EQlom47cE7GbbxCKFkw",
          "type": "urn:nlp-types:category",
          "system": "places"
        },
        "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/03.icon",
        "vicinity": "S N Banerjee Road<br/>Barrackpur 700120 WB",
        "having": [

        ],
        "type": "urn:nlp-types:place",
        "href": "https://places.demo.api.here.com/places/v1/places/356tunb6-61607b74693f4a3bb1ecccec2525efff;context=Zmxvdy1pZD0xOTgzYTAwMC05ZDMwLTUxMzUtOTg5MS0wODY3OWIzMjQ5MjNfMTU2NjA3MTY3NTA3OV8wXzY2NDkmcmFuaz0xMg?app_id=V4wSKcxp8q2UsEzgXebH&app_code=IP9EQlom47cE7GbbxCKFkw",
        "tags": [
          {
            "id": "asian",
            "title": "Asian",
            "group": "cuisine"
          },
          {
            "id": "indian",
            "title": "Indian",
            "group": "cuisine"
          }
        ],
        "id": "356tunb6-61607b74693f4a3bb1ecccec2525efff"
      },
      {
        "position": [
          22.7604,
          88.370307
        ],
        "distance": 959,
        "title": "Meat and Eat",
        "averageRating": 0,
        "category": {
          "id": "restaurant",
          "title": "Restaurant",
          "href": "https://places.demo.api.here.com/places/v1/categories/places/restaurant?app_id=V4wSKcxp8q2UsEzgXebH&app_code=IP9EQlom47cE7GbbxCKFkw",
          "type": "urn:nlp-types:category",
          "system": "places"
        },
        "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/03.icon",
        "vicinity": "Barrackpur 700120 WB",
        "having": [

        ],
        "type": "urn:nlp-types:place",
        "href": "https://places.demo.api.here.com/places/v1/places/356tunc6-1c06c212715c4cf8bb6ae77f0cf32ed0;context=Zmxvdy1pZD0xOTgzYTAwMC05ZDMwLTUxMzUtOTg5MS0wODY3OWIzMjQ5MjNfMTU2NjA3MTY3NTA3OV8wXzY2NDkmcmFuaz0xMw?app_id=V4wSKcxp8q2UsEzgXebH&app_code=IP9EQlom47cE7GbbxCKFkw",
        "tags": [
          {
            "id": "chicken",
            "title": "Chicken",
            "group": "cuisine"
          }
        ],
        "id": "356tunc6-1c06c212715c4cf8bb6ae77f0cf32ed0"
      },
      {
        "position": [
          22.76075,
          88.36805
        ],
        "distance": 966,
        "title": "Penguin Food Bazar",
        "averageRating": 0,
        "category": {
          "id": "restaurant",
          "title": "Restaurant",
          "href": "https://places.demo.api.here.com/places/v1/categories/places/restaurant?app_id=V4wSKcxp8q2UsEzgXebH&app_code=IP9EQlom47cE7GbbxCKFkw",
          "type": "urn:nlp-types:category",
          "system": "places"
        },
        "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/03.icon",
        "vicinity": "B T Road<br/>Barrackpur 700120 WB",
        "having": [

        ],
        "type": "urn:nlp-types:place",
        "href": "https://places.demo.api.here.com/places/v1/places/356jx7ps-3bbd4b20df9e006fe626d0293cc2ed2b;context=Zmxvdy1pZD0xOTgzYTAwMC05ZDMwLTUxMzUtOTg5MS0wODY3OWIzMjQ5MjNfMTU2NjA3MTY3NTA3OV8wXzY2NDkmcmFuaz0xNA?app_id=V4wSKcxp8q2UsEzgXebH&app_code=IP9EQlom47cE7GbbxCKFkw",
        "tags": [
          {
            "id": "asian",
            "title": "Asian",
            "group": "cuisine"
          },
          {
            "id": "chicken",
            "title": "Chicken",
            "group": "cuisine"
          },
          {
            "id": "chinese",
            "title": "Chinese",
            "group": "cuisine"
          },
          {
            "id": "indian",
            "title": "Indian",
            "group": "cuisine"
          }
        ],
        "id": "356jx7ps-3bbd4b20df9e006fe626d0293cc2ed2b",
        "openingHours": {
          "text": "Mon-Sat: 08:00 - 23:00<br/>Sun: 07:30 - 23:00",
          "label": "Opening hours",
          "isOpen": false,
          "structured": [
            {
              "start": "T080000",
              "duration": "PT15H00M",
              "recurrence": "FREQ:DAILY;BYDAY:MO,TU,WE,TH,FR,SA"
            },
            {
              "start": "T073000",
              "duration": "PT15H30M",
              "recurrence": "FREQ:DAILY;BYDAY:SU"
            }
          ]
        }
      },
      {
        "position": [
          22.760346,
          88.369904
        ],
        "distance": 969,
        "title": "Ramkrishna Mistanna Bhandar",
        "averageRating": 0,
        "category": {
          "id": "food-drink",
          "title": "Food & Drink",
          "href": "https://places.demo.api.here.com/places/v1/categories/places/food-drink?app_id=V4wSKcxp8q2UsEzgXebH&app_code=IP9EQlom47cE7GbbxCKFkw",
          "type": "urn:nlp-types:category",
          "system": "places"
        },
        "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/09.icon",
        "vicinity": "S M P Sarani<br/>Barrackpur 700120 WB",
        "having": [

        ],
        "type": "urn:nlp-types:place",
        "href": "https://places.demo.api.here.com/places/v1/places/356d408k-2329a57cae2208c821f79116ee7891c8;context=Zmxvdy1pZD0xOTgzYTAwMC05ZDMwLTUxMzUtOTg5MS0wODY3OWIzMjQ5MjNfMTU2NjA3MTY3NTA3OV8wXzY2NDkmcmFuaz0xNQ?app_id=V4wSKcxp8q2UsEzgXebH&app_code=IP9EQlom47cE7GbbxCKFkw",
        "tags": [
          {
            "id": "american",
            "title": "American",
            "group": "cuisine"
          }
        ],
        "id": "356d408k-2329a57cae2208c821f79116ee7891c8"
      },
      {
        "position": [
          22.76193,
          88.36547
        ],
        "distance": 969,
        "title": "Imperial",
        "averageRating": 0,
        "category": {
          "id": "restaurant",
          "title": "Restaurant",
          "href": "https://places.demo.api.here.com/places/v1/categories/places/restaurant?app_id=V4wSKcxp8q2UsEzgXebH&app_code=IP9EQlom47cE7GbbxCKFkw",
          "type": "urn:nlp-types:category",
          "system": "places"
        },
        "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/03.icon",
        "vicinity": "Barrack Road<br/>Barrackpur 700120 WB",
        "having": [

        ],
        "type": "urn:nlp-types:place",
        "href": "https://places.demo.api.here.com/places/v1/places/356jx7ps-4d1d7c6730d907cb17229291d719fc13;context=Zmxvdy1pZD0xOTgzYTAwMC05ZDMwLTUxMzUtOTg5MS0wODY3OWIzMjQ5MjNfMTU2NjA3MTY3NTA3OV8wXzY2NDkmcmFuaz0xNg?app_id=V4wSKcxp8q2UsEzgXebH&app_code=IP9EQlom47cE7GbbxCKFkw",
        "tags": [
          {
            "id": "asian",
            "title": "Asian",
            "group": "cuisine"
          },
          {
            "id": "indian",
            "title": "Indian",
            "group": "cuisine"
          }
        ],
        "id": "356jx7ps-4d1d7c6730d907cb17229291d719fc13"
      },
      {
        "position": [
          22.76125,
          88.3664
        ],
        "distance": 982,
        "title": "MS Samarat",
        "averageRating": 0,
        "category": {
          "id": "restaurant",
          "title": "Restaurant",
          "href": "https://places.demo.api.here.com/places/v1/categories/places/restaurant?app_id=V4wSKcxp8q2UsEzgXebH&app_code=IP9EQlom47cE7GbbxCKFkw",
          "type": "urn:nlp-types:category",
          "system": "places"
        },
        "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/03.icon",
        "vicinity": "Barrackpore Trunk Road<br/>Barrackpur 700120 WB",
        "having": [

        ],
        "type": "urn:nlp-types:place",
        "href": "https://places.demo.api.here.com/places/v1/places/356tunc6-5eff5aef7f7e4ea283c2f8ea62373f1c;context=Zmxvdy1pZD0xOTgzYTAwMC05ZDMwLTUxMzUtOTg5MS0wODY3OWIzMjQ5MjNfMTU2NjA3MTY3NTA3OV8wXzY2NDkmcmFuaz0xNw?app_id=V4wSKcxp8q2UsEzgXebH&app_code=IP9EQlom47cE7GbbxCKFkw",
        "tags": [
          {
            "id": "international",
            "title": "International",
            "group": "cuisine"
          }
        ],
        "id": "356tunc6-5eff5aef7f7e4ea283c2f8ea62373f1c"
      },
      {
        "position": [
          22.76014,
          88.37048
        ],
        "distance": 987,
        "title": "Karri Klub Restaurant",
        "averageRating": 0,
        "category": {
          "id": "restaurant",
          "title": "Restaurant",
          "href": "https://places.demo.api.here.com/places/v1/categories/places/restaurant?app_id=V4wSKcxp8q2UsEzgXebH&app_code=IP9EQlom47cE7GbbxCKFkw",
          "type": "urn:nlp-types:category",
          "system": "places"
        },
        "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/03.icon",
        "vicinity": "S. M. Ali Road<br/>Barrackpur 700120 WB",
        "having": [

        ],
        "type": "urn:nlp-types:place",
        "href": "https://places.demo.api.here.com/places/v1/places/356jx7ps-88d0b5b13de7041f8449f4379cd7a686;context=Zmxvdy1pZD0xOTgzYTAwMC05ZDMwLTUxMzUtOTg5MS0wODY3OWIzMjQ5MjNfMTU2NjA3MTY3NTA3OV8wXzY2NDkmcmFuaz0xOA?app_id=V4wSKcxp8q2UsEzgXebH&app_code=IP9EQlom47cE7GbbxCKFkw",
        "tags": [
          {
            "id": "asian",
            "title": "Asian",
            "group": "cuisine"
          },
          {
            "id": "chinese",
            "title": "Chinese",
            "group": "cuisine"
          },
          {
            "id": "indian",
            "title": "Indian",
            "group": "cuisine"
          }
        ],
        "id": "356jx7ps-88d0b5b13de7041f8449f4379cd7a686",
        "alternativeNames": [
          {
            "name": "Kurri Klub",
            "language": "en"
          }
        ]
      },
      {
        "position": [
          22.76008,
          88.37059
        ],
        "distance": 993,
        "title": "Maa Lalu Roll Centre",
        "averageRating": 0,
        "category": {
          "id": "restaurant",
          "title": "Restaurant",
          "href": "https://places.demo.api.here.com/places/v1/categories/places/restaurant?app_id=V4wSKcxp8q2UsEzgXebH&app_code=IP9EQlom47cE7GbbxCKFkw",
          "type": "urn:nlp-types:category",
          "system": "places"
        },
        "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/03.icon",
        "vicinity": "S M Ali Road<br/>Barrackpur WB",
        "having": [

        ],
        "type": "urn:nlp-types:place",
        "href": "https://places.demo.api.here.com/places/v1/places/356jx7ps-71529403792905f5b1eaf34cace2c406;context=Zmxvdy1pZD0xOTgzYTAwMC05ZDMwLTUxMzUtOTg5MS0wODY3OWIzMjQ5MjNfMTU2NjA3MTY3NTA3OV8wXzY2NDkmcmFuaz0xOQ?app_id=V4wSKcxp8q2UsEzgXebH&app_code=IP9EQlom47cE7GbbxCKFkw",
        "tags": [
          {
            "id": "asian",
            "title": "Asian",
            "group": "cuisine"
          },
          {
            "id": "indian",
            "title": "Indian",
            "group": "cuisine"
          }
        ],
        "id": "356jx7ps-71529403792905f5b1eaf34cace2c406"
      }
    ]
  },
  "search": {
    "context": {
      "location": {
        "position": [
          22.769,
          88.371
        ],
        "address": {
          "text": "Barrackpur 700122 WB<br/>India",
          "postalCode": "700122",
          "district": "Barrackpur",
          "city": "Barrackpur",
          "county": "North Twenty Four Parganas",
          "stateCode": "WB",
          "country": "India",
          "countryCode": "IND"
        }
      },
      "type": "urn:nlp-types:place",
      "href": "https://places.demo.api.here.com/places/v1/places/loc-dmVyc2lvbj0xO3RpdGxlPUJhcnJhY2twdXI7bGF0PTIyLjc2OTtsb249ODguMzcxO2NpdHk9QmFycmFja3B1cjtwb3N0YWxDb2RlPTcwMDEyMjtjb3VudHJ5PUlORDtkaXN0cmljdD1CYXJyYWNrcHVyO3N0YXRlQ29kZT1XQjtjb3VudHk9Tm9ydGgrVHdlbnR5K0ZvdXIrUGFyZ2FuYXM7Y2F0ZWdvcnlJZD1jaXR5LXRvd24tdmlsbGFnZTtzb3VyY2VTeXN0ZW09aW50ZXJuYWw;context=c2VhcmNoQ29udGV4dD0x?app_id=V4wSKcxp8q2UsEzgXebH&app_code=IP9EQlom47cE7GbbxCKFkw"
    }
  }
}



module.exports.newsApiResponse = newsApiResponse;
module.exports.hereMapApiResponse = hereMapApiResponse;
