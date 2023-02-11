var AIPreviewData = {
  "name": "pwcTestChatBot",
  "intents": [
    {
      "intent": "aboutAdcdev",
      "examples": [
            "is this project live ?",
            "who are the developer in adcdev team",
            "how many developer are in this team ?",
            "what is the duration of this current project ?",
            "this is test example"
      ],
      "description": "small queries regarding adcdev project"
    },
    {
      "intent": "weather",
      "examples": [
            "how is the weather of kolkata",
            "weather update",
            "todays weather",
            "upcomming weather forecast",
            "future weather forecast",
            "weather forecast in comming week",
            "weather forecast in comming days",
            "current weather",
            "current weather condition"
      ],
      "description": "a small description about weather entity"
    },
    {
      "intent": "project-quaries",
      "examples": [
            "what is your project name ?"
      ],
      "description": "different kind of queries related to the project"
    },
    {
      "intent": "configureActivity",
      "examples": [
            "want to configure common travel area",
            "configure an activity",
      ],
      "description": "doing some operation on configuring activity."
    },
    {
      "intent": "about-company",
      "examples": [
            "where the company is located ?",
            "is this a CMM level 5 company ?",
            "how many building are there in kolkata ?",
            "salary structure ?",
            "employee strength ?",
            "do you know anything about salary info",
      ],
      "description": "a small description about the company"
    },
    {
      "intent": "change-request",
      "examples": [
            "i want to change my email id",
            "want to change my email id",
      ],
      "description": "a small description about change request expressions"
    },
    {
      "intent": "greetings",
      "examples": [
            "help",
            "hi there",
            "hello",
            "hi",
            "help me"
      ],
      "description": "Its an simple greeting intent to add welcome expressions on it."
    },
    {
      "intent": "share-if-you-care",
      "examples": [
          "tell me about share if you care",
          "share if you care",
          "share if u care",
          "who are the memebers of share if you care"
      ],
      "description": "Its an simple greeting intent to add welcome expressions on it."
    },
    {
      "intent": "near-by-places",
      "examples": [
          "show me near by places",
          "show me some near by bank",
          "my near by places",
          "near by places"
      ],
      "description": ""
    },
    {
      "intent": "near-by-popular-places",
      "examples": [
          "Find near by popular places",
          "show me the poplar places",
          "popular places",
          "near by popular places"
      ],
      "description": ""
    },
    {
      "intent": "current-location",
      "examples": [
          "current location",
          "show my current location"
      ],
      "description": ""
    },
    {
      "intent": "random-joke",
      "examples": [
          "tell me a joke",
          "I am boar, tell me a joke",
          "tell a joke"
      ],
      "description": ""
    },
    {
      "intent": "cricket-upcomming-match",
      "examples": [
          "show me future cricket matches",
          "what are the up comming cricket matches",
          "upcomming cricket matches",
          "cricket forecast"

      ],
      "description": ""
    },
    {
      "intent": "cricket-matches-history",
      "examples": [
          "show me cricket matches result",
          "show me up to date cricket matches",
          "show me cricket history",

      ],
      "description": ""
    },
    {
      "intent": "search-news-article",
      "examples": [
          "show me the articles about ai and machine learning",
          "show me all the article of cricket",
          "show me all the article of",
          "article of",
          "show me the article of",
          "show me the top business headlines in the world",
          "show me the top sports headlines",
          "top headlines in india",
          "top 10 business news in india",
          "top 10 sports news in india",
          "top headlines in uk",
          "top headlines from TechCrunch",
          "All articles published by the Wall Street Journal",
          "top football news",
          "top football news in india",
          "top article about react js by facebook",
          "top news of graphql by facebook",
          "top article on graphql"
      ],
      "description": ""
    },
    {
      "intent": "define-word",
      "examples": [
          "define word",
          "what do you mean by",
          "show me the details of ",
          "what is the meaning of",
          "meaning of"

      ],
      "description": ""
    },
    {
      "intent": "near-by-places",
      "examples": [
          "find near by places",
          "find places around me",
          "what are the places around me",
          "find near by restaurant for me",
      ],
      "description": "A small implementation of here map to find near by places."
    },
    {
      "intent": "zomato-collection",
      "examples": [
          "find zomato collection",
          "show me zomato daily collection",

      ],
      "description": "A small implementation of zomato to find near by zomato collection."
    },
    {
      "intent": "zomato-near-by-restaurant",
      "examples": [
          "find zomato near by restaurant",
          "show me zomato restaurant",
          "zomato restaurants",
          "find zomato restaurant for me",

      ],
      "description": "A small implementation of zomato to find near by zomato restaurant."
    },
    {
      "intent": "movie-reviews",
      "examples": [
          "show me movie reviews",
          "sow me the details of movie ",
          "online moview reviews",
      ],
      "description": "A small implementation of omdb to find omdb movie details."
    },
    {
      "intent": "network-info",
      "examples": [
          "show me the network information",
          "network information",
          "network info",
          "current net info",
          "local net info",
          "current network info"

      ],
      "description": ""
    },
    {
      "intent": "send-email",
      "examples": [
          "send email",
          "want to send a email",
          "top headlines in india",
      ],
      "description": ""
    }
  ],
  "entities": [
    {
      "entity": "configure",
      "values": [
        {
          "value": "common travel area",
          "synonyms": ["activity"]
        }
      ]
    },
    {
      "entity": "changeTopicInfo",
      "values": [
        {
          "value" : "email",
          "synonyms" : ["mail id", "email id"]
        }
      ]
    },
    {
      "entity": "devTeam",
      "values": [
        {
          "value": "duration",
          "synonyms": [
            "current duration",
            "short duration",
            "long term duration"
          ]
        },
        {
          "value": "developer",
          "synonyms": [
            "deevelopers",
            "team",
            "team mates",
            "team member"
          ]
        }
      ],
    },
    {
      "entity": "projects",
      "values": [
        {
          "value": "adc",
          "synonyms": []
        },
        {
          "value": "sdp",
          "synonyms": []
        },
        {
          "value": "dms",
          "synonyms": []
        }
      ],
    },
    {
      "entity": "near-by-places-types",
      "values": [
        {
          "value": "bank",
          "synonyms": []
        },
        {
          "value": "airport",
          "synonyms": []
        },
        {
          "value": "atm",
          "synonyms": []
        },
        {
          "value": "bar",
          "synonyms": []
        },
        {
          "value": "cafe",
          "synonyms": []
        },
        {
          "value": "doctor",
          "synonyms": []
        },
        {
          "value": "hospital",
          "synonyms": []
        },
        {
          "value": "hindu_temple",
          "synonyms": []
        },
        {
          "value": "library",
          "synonyms": []
        },
        {
          "value": "liquor_store",
          "synonyms": []
        },
        {
          "value": "movie_theater",
          "synonyms": []
        },
        // {
        //   "value": "night_club",
        //   "synonyms": ['pub', 'night club']
        // },
        {
          "value": "pharmacy",
          "synonyms": ['medicine shop', 'medicine']
        },
        {
          "value": "police",
          "synonyms": ['police station',]
        },
        {
          "value": "restaurant",
          "synonyms": []
        },
        {
          "value": "school",
          "synonyms": []
        },
        {
          "value": "shopping_mall",
          "synonyms": ['shopping mall']
        },
      ],
    },
    {
      "entity": "cityInfo",
      "values": [
        {
          "value": "delhi",
          "synonyms": [
            "rajdhani",
            "capital of india"
          ]
        },
        {
          "value": "kolkata",
          "synonyms": [
            "calcutta",
            "kolkikata"
          ]
        },
        {
          "value": "bangalore",
          "synonyms": [
            "bangaluru",
            "IT hub"
          ]
        },
        {
          "value": "mumbai",
          "synonyms": [
            "bombay"
          ]
        }
      ],
    },
    {
      "entity": "newsPartner",
      "values": [
        {
          "value": "Wall Street Journal",
          "synonyms": ["wls"]
        },
        {
          "value": "TechCrunch",
          "synonyms": ["Tech Crunch"]
        },
        {
          "value": "Times of India",
          "synonyms": []
        },
      ],
    },
    {
      "entity": "weatherInfo",
      "values": [
        {
          "value": "current weather",
          "synonyms": [
            "todays weather",
            "now weather",
            "weather now",
            "weather today"
          ]
        }
      ],
    },
    {
      "entity": "basicInfo",
      "values": [
        {
          "value": "salary structure",
          "synonyms": [
            "salary",
            "salary info",
            "salary information"
          ]
        },
        {
          "value": "location",
          "synonyms": [
            "current location",
            "address",
            "way to office"
          ]
        }
      ],
    }
  ],
  "language": "en",
  "metadata": {
    "api_version": {
      "major_version": "v1",
      "minor_version": "2017-05-26"
    }
  },
  "description": "Its an testing chat bot.",
  "dialog_nodes": [],
  "workspace_id": "85e335b0-8ae3-4731-9a3b-3792ede76b8c",
  "counterexamples": [],
  "learning_opt_out": false
}


module.exports = AIPreviewData;
