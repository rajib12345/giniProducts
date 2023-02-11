const quizApiUrl = "https://opentdb.com/api.php?amount=10&category=18&type=multiple";

const quizApiResponse = {
  "response_code": 0,
  "results": [
    {
      "category": "Science: Computers",
      "type": "multiple",
      "difficulty": "easy",
      "question": "Which company was established on April 1st, 1976 by Steve Jobs, Steve Wozniak and Ronald Wayne?",
      "correct_answer": "Apple",
      "incorrect_answers": [
        "Microsoft",
        "Atari",
        "Commodore"
      ]
    },
    {
      "category": "Science: Computers",
      "type": "multiple",
      "difficulty": "medium",
      "question": "Which internet company began life as an online bookstore called &#039;Cadabra&#039;?",
      "correct_answer": "Amazon",
      "incorrect_answers": [
        "eBay",
        "Overstock",
        "Shopify"
      ]
    },
    {
      "category": "Science: Computers",
      "type": "multiple",
      "difficulty": "medium",
      "question": "Moore&#039;s law originally stated that the number of transistors on a microprocessor chip would double every...",
      "correct_answer": "Year",
      "incorrect_answers": [
        "Four Years",
        "Two Years",
        "Eight Years"
      ]
    },
    {
      "category": "Science: Computers",
      "type": "multiple",
      "difficulty": "easy",
      "question": "Which computer hardware device provides an interface for all other connected devices to communicate?",
      "correct_answer": "Motherboard",
      "incorrect_answers": [
        "Central Processing Unit",
        "Hard Disk Drive",
        "Random Access Memory"
      ]
    },
    {
      "category": "Science: Computers",
      "type": "multiple",
      "difficulty": "medium",
      "question": "What did the name of the Tor Anonymity Network orignially stand for?",
      "correct_answer": "The Onion Router",
      "incorrect_answers": [
        "The Only Router",
        "The Orange Router",
        "The Ominous Router"
      ]
    },
    {
      "category": "Science: Computers",
      "type": "multiple",
      "difficulty": "medium",
      "question": "On which day did the World Wide Web go online?",
      "correct_answer": "December 20, 1990",
      "incorrect_answers": [
        "December 17, 1996",
        "November 12, 1990",
        "November 24, 1995"
      ]
    },
    {
      "category": "Science: Computers",
      "type": "multiple",
      "difficulty": "medium",
      "question": "What is the name of the default theme that is installed with Windows XP?",
      "correct_answer": "Luna",
      "incorrect_answers": [
        "Neptune",
        "Whistler",
        "Bliss"
      ]
    },
    {
      "category": "Science: Computers",
      "type": "multiple",
      "difficulty": "medium",
      "question": "In computing terms, typically what does CLI stand for?",
      "correct_answer": "Command Line Interface",
      "incorrect_answers": [
        "Common Language Input",
        "Control Line Interface",
        "Common Language Interface"
      ]
    },
    {
      "category": "Science: Computers",
      "type": "multiple",
      "difficulty": "medium",
      "question": "Which of these people was NOT a founder of Apple Inc?",
      "correct_answer": "Jonathan Ive",
      "incorrect_answers": [
        "Steve Jobs",
        "Ronald Wayne",
        "Steve Wozniak"
      ]
    },
    {
      "category": "Science: Computers",
      "type": "multiple",
      "difficulty": "hard",
      "question": "What is the name given to layer 4 of the Open Systems Interconnection (ISO) model?",
      "correct_answer": "Transport",
      "incorrect_answers": [
        "Session",
        "Data link",
        "Network"
      ]
    }
  ]
}

const generalQuizURL = "https://opentdb.com/api.php?amount=10&category=18&type=multiple";

const dummyQuizCategory = [
    {name : "generalKnowledge", value : 9},
    {name : "books", value : 10},
    {name : "music", value : 11},
    {name : "MusicalsTheateres", value : 12},
    {name : "television", value : 14},
    {name : "VideoGames", value : 15},
    {name : "boardGames", value : 16},
    {name : "nature", value : 17},
    {name : "computers", value : 18},
    {name : "mathmatics", value : 19},
    {name : "mythology", value : 20},
    {name : "sports", value : 21},
    {name : "geography", value : 22},
    {name : "history", value : 23}
]

const OPEN_LIBRARY_BOOK_CATEGORY = [
    {name : "Travel", value : "Travel"},
    {name : "Scientists", value : "Scientists"},
    {name : "Fiction", value : "Fiction"},
    {name : "English Horror tales", value : "English_Horror_tales"},
    {name : "Psychology", value : "Psychology"},
    {name : "Monsters", value : "Monsters"},
    {name : "Horror", value : "Horror"},
    {name : "Horror classics", value : "Horror_classics"},
    {name : "Accessible book", value : "Accessible_book"},
    {name : "Women and literature", value : "Women_and_literature"},
    {name : "Authors", value : "Authors"},
    {name : "Frankenstein", value : "Frankenstein"},
    {name : "Classic Literature", value : "Classic_Literature"},
    {name : "Vida espiritual", value : "Vida_espiritual"},
    {name : "Epistolary fiction", value : "Epistolary_fiction"},
    {name : "Scientists in literature", value : "Scientists_in_literature"},
    {name : "English language", value : "English_language"},
    {name : "English fiction", value : "English_fiction"},
    {name : "Monsters in literature", value : "Monsters_in_literature"},
    {name : "open_syllabus_project", value : "open_syllabus_project"},
    {name : "Long Now Manual for Civilization", value : "Long_Now_Manual_for_Civilization"},
    {name : "English Science fiction", value : "English_Science_fiction"},
    {name : "History", value : "History"},
    {name : "Translations into Russian", value : "Translations_into_Russian"},
    {name : "Reincarnation", value : "Reincarnation"},
    {name : "Horror stories", value : "Horror_stories"},
]

const hereMapNearByPlacesCategory = {
  "items": [
    {
      "id": "eat-drink",
      "title": "Eat & Drink",
      "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/03.icon",
      "type": "urn:nlp-types:category",
      "href": "https://places.demo.api.here.com/places/v1/categories/places/eat-drink?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
      "system": "places",
      "within": []
    },
    {
      "id": "restaurant",
      "title": "Restaurant",
      "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/03.icon",
      "type": "urn:nlp-types:category",
      "href": "https://places.demo.api.here.com/places/v1/categories/places/restaurant?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
      "system": "places",
      "within": [
        "eat-drink"
      ]
    },
    {
      "id": "snacks-fast-food",
      "title": "Snacks/Fast food",
      "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/03.icon",
      "type": "urn:nlp-types:category",
      "href": "https://places.demo.api.here.com/places/v1/categories/places/snacks-fast-food?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
      "system": "places",
      "within": [
        "eat-drink"
      ]
    },
    {
      "id": "bar-pub",
      "title": "Bar/Pub",
      "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/22.icon",
      "type": "urn:nlp-types:category",
      "href": "https://places.demo.api.here.com/places/v1/categories/places/bar-pub?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
      "system": "places",
      "within": [
        "eat-drink"
      ]
    },
    {
      "id": "coffee-tea",
      "title": "Coffee/Tea",
      "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/23.icon",
      "type": "urn:nlp-types:category",
      "href": "https://places.demo.api.here.com/places/v1/categories/places/coffee-tea?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
      "system": "places",
      "within": [
        "eat-drink"
      ]
    },
    {
      "id": "coffee",
      "title": "Coffee",
      "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/23.icon",
      "type": "urn:nlp-types:category",
      "href": "https://places.demo.api.here.com/places/v1/categories/places/coffee?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
      "system": "places",
      "within": [
        "coffee-tea"
      ]
    },
    {
      "id": "tea",
      "title": "Tea",
      "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/23.icon",
      "type": "urn:nlp-types:category",
      "href": "https://places.demo.api.here.com/places/v1/categories/places/tea?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
      "system": "places",
      "within": [
        "coffee-tea"
      ]
    },
    {
      "id": "going-out",
      "title": "Going Out",
      "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/05.icon",
      "type": "urn:nlp-types:category",
      "href": "https://places.demo.api.here.com/places/v1/categories/places/going-out?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
      "system": "places",
      "within": []
    },
    {
      "id": "dance-night-club",
      "title": "Dance or Nightclub",
      "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/33.icon",
      "type": "urn:nlp-types:category",
      "href": "https://places.demo.api.here.com/places/v1/categories/places/dance-night-club?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
      "system": "places",
      "within": [
        "going-out"
      ]
    },
    {
      "id": "cinema",
      "title": "Cinema",
      "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/32.icon",
      "type": "urn:nlp-types:category",
      "href": "https://places.demo.api.here.com/places/v1/categories/places/cinema?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
      "system": "places",
      "within": [
        "going-out"
      ]
    },
    {
      "id": "theatre-music-culture",
      "title": "Theater, Music & Culture",
      "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/05.icon",
      "type": "urn:nlp-types:category",
      "href": "https://places.demo.api.here.com/places/v1/categories/places/theatre-music-culture?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
      "system": "places",
      "within": [
        "going-out"
      ]
    },
    {
      "id": "casino",
      "title": "Casino",
      "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/31.icon",
      "type": "urn:nlp-types:category",
      "href": "https://places.demo.api.here.com/places/v1/categories/places/casino?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
      "system": "places",
      "within": [
        "going-out"
      ]
    },
    {
      "id": "sights-museums",
      "title": "Sights & Museums",
      "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/10.icon",
      "type": "urn:nlp-types:category",
      "href": "https://places.demo.api.here.com/places/v1/categories/places/sights-museums?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
      "system": "places",
      "within": []
    },
    {
      "id": "landmark-attraction",
      "title": "Landmark/Attraction",
      "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/38.icon",
      "type": "urn:nlp-types:category",
      "href": "https://places.demo.api.here.com/places/v1/categories/places/landmark-attraction?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
      "system": "places",
      "within": [
        "sights-museums"
      ]
    },
    {
      "id": "museum",
      "title": "Museum",
      "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/10.icon",
      "type": "urn:nlp-types:category",
      "href": "https://places.demo.api.here.com/places/v1/categories/places/museum?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
      "system": "places",
      "within": [
        "sights-museums"
      ]
    },
    {
      "id": "transport",
      "title": "Transport",
      "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/11.icon",
      "type": "urn:nlp-types:category",
      "href": "https://places.demo.api.here.com/places/v1/categories/places/transport?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
      "system": "places",
      "within": []
    },
    {
      "id": "airport",
      "title": "Airport",
      "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/40.icon",
      "type": "urn:nlp-types:category",
      "href": "https://places.demo.api.here.com/places/v1/categories/places/airport?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
      "system": "places",
      "within": [
        "transport"
      ]
    },
    {
      "id": "railway-station",
      "title": "Railway Station",
      "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/43.icon",
      "type": "urn:nlp-types:category",
      "href": "https://places.demo.api.here.com/places/v1/categories/places/railway-station?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
      "system": "places",
      "within": [
        "transport"
      ]
    },
    {
      "id": "public-transport",
      "title": "Public Transit",
      "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/11.icon",
      "type": "urn:nlp-types:category",
      "href": "https://places.demo.api.here.com/places/v1/categories/places/public-transport?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
      "system": "places",
      "within": [
        "transport"
      ]
    },
    {
      "id": "ferry-terminal",
      "title": "Ferry Terminal",
      "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/41.icon",
      "type": "urn:nlp-types:category",
      "href": "https://places.demo.api.here.com/places/v1/categories/places/ferry-terminal?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
      "system": "places",
      "within": [
        "transport"
      ]
    },
    {
      "id": "taxi-stand",
      "title": "Taxi Stand",
      "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/42.icon",
      "type": "urn:nlp-types:category",
      "href": "https://places.demo.api.here.com/places/v1/categories/places/taxi-stand?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
      "system": "places",
      "within": [
        "transport"
      ]
    },
    {
      "id": "accommodation",
      "title": "Accommodation",
      "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/01.icon",
      "type": "urn:nlp-types:category",
      "href": "https://places.demo.api.here.com/places/v1/categories/places/accommodation?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
      "system": "places",
      "within": []
    },
    {
      "id": "hotel",
      "title": "Hotel",
      "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/01.icon",
      "type": "urn:nlp-types:category",
      "href": "https://places.demo.api.here.com/places/v1/categories/places/hotel?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
      "system": "places",
      "within": [
        "accommodation"
      ]
    },
    {
      "id": "motel",
      "title": "Motel",
      "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/01.icon",
      "type": "urn:nlp-types:category",
      "href": "https://places.demo.api.here.com/places/v1/categories/places/motel?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
      "system": "places",
      "within": [
        "accommodation"
      ]
    },
    {
      "id": "hostel",
      "title": "Hostel",
      "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/01.icon",
      "type": "urn:nlp-types:category",
      "href": "https://places.demo.api.here.com/places/v1/categories/places/hostel?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
      "system": "places",
      "within": [
        "accommodation"
      ]
    },
    {
      "id": "camping",
      "title": "Camping",
      "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/14.icon",
      "type": "urn:nlp-types:category",
      "href": "https://places.demo.api.here.com/places/v1/categories/places/camping?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
      "system": "places",
      "within": [
        "accommodation"
      ]
    },
    {
      "id": "shopping",
      "title": "Shopping",
      "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/09.icon",
      "type": "urn:nlp-types:category",
      "href": "https://places.demo.api.here.com/places/v1/categories/places/shopping?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
      "system": "places",
      "within": []
    },
    {
      "id": "kiosk-convenience-store",
      "title": "24-7/Convenience Store",
      "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/09.icon",
      "type": "urn:nlp-types:category",
      "href": "https://places.demo.api.here.com/places/v1/categories/places/kiosk-convenience-store?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
      "system": "places",
      "within": [
        "shopping"
      ]
    },
    {
      "id": "wine-and-liquor",
      "title": "Wine & Spirits",
      "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/09.icon",
      "type": "urn:nlp-types:category",
      "href": "https://places.demo.api.here.com/places/v1/categories/places/wine-and-liquor?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
      "system": "places",
      "within": [
        "kiosk-convenience-store"
      ]
    },
    {
      "id": "mall",
      "title": "Shopping Center",
      "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/09.icon",
      "type": "urn:nlp-types:category",
      "href": "https://places.demo.api.here.com/places/v1/categories/places/mall?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
      "system": "places",
      "within": [
        "shopping"
      ]
    },
    {
      "id": "department-store",
      "title": "Department Store",
      "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/09.icon",
      "type": "urn:nlp-types:category",
      "href": "https://places.demo.api.here.com/places/v1/categories/places/department-store?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
      "system": "places",
      "within": [
        "shopping"
      ]
    },
    {
      "id": "food-drink",
      "title": "Food & Drink",
      "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/09.icon",
      "type": "urn:nlp-types:category",
      "href": "https://places.demo.api.here.com/places/v1/categories/places/food-drink?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
      "system": "places",
      "within": [
        "shopping"
      ]
    },
    {
      "id": "bookshop",
      "title": "Book Shop",
      "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/09.icon",
      "type": "urn:nlp-types:category",
      "href": "https://places.demo.api.here.com/places/v1/categories/places/bookshop?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
      "system": "places",
      "within": [
        "shopping"
      ]
    },
    {
      "id": "pharmacy",
      "title": "Pharmacy",
      "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/37.icon",
      "type": "urn:nlp-types:category",
      "href": "https://places.demo.api.here.com/places/v1/categories/places/pharmacy?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
      "system": "places",
      "within": [
        "shopping"
      ]
    },
    {
      "id": "electronics-shop",
      "title": "Electronics",
      "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/09.icon",
      "type": "urn:nlp-types:category",
      "href": "https://places.demo.api.here.com/places/v1/categories/places/electronics-shop?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
      "system": "places",
      "within": [
        "shopping"
      ]
    },
    {
      "id": "hardware-house-garden-shop",
      "title": "DIY/garden center",
      "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/09.icon",
      "type": "urn:nlp-types:category",
      "href": "https://places.demo.api.here.com/places/v1/categories/places/hardware-house-garden-shop?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
      "system": "places",
      "within": [
        "shopping"
      ]
    },
    {
      "id": "clothing-accessories-shop",
      "title": "Clothing & Accessories",
      "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/09.icon",
      "type": "urn:nlp-types:category",
      "href": "https://places.demo.api.here.com/places/v1/categories/places/clothing-accessories-shop?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
      "system": "places",
      "within": [
        "shopping"
      ]
    },
    {
      "id": "sport-outdoor-shop",
      "title": "Outdoor Sports",
      "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/09.icon",
      "type": "urn:nlp-types:category",
      "href": "https://places.demo.api.here.com/places/v1/categories/places/sport-outdoor-shop?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
      "system": "places",
      "within": [
        "shopping"
      ]
    },
    {
      "id": "shop",
      "title": "Store",
      "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/09.icon",
      "type": "urn:nlp-types:category",
      "href": "https://places.demo.api.here.com/places/v1/categories/places/shop?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
      "system": "places",
      "within": [
        "shopping"
      ]
    },
    {
      "id": "business-services",
      "title": "Business & Services",
      "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/02.icon",
      "type": "urn:nlp-types:category",
      "href": "https://places.demo.api.here.com/places/v1/categories/places/business-services?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
      "system": "places",
      "within": []
    },
    {
      "id": "atm-bank-exchange",
      "title": "ATM/Bank/Exchange",
      "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/15.icon",
      "type": "urn:nlp-types:category",
      "href": "https://places.demo.api.here.com/places/v1/categories/places/atm-bank-exchange?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
      "system": "places",
      "within": [
        "business-services"
      ]
    },
    {
      "id": "police-emergency",
      "title": "Police/Emergency",
      "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/19.icon",
      "type": "urn:nlp-types:category",
      "href": "https://places.demo.api.here.com/places/v1/categories/places/police-emergency?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
      "system": "places",
      "within": [
        "business-services"
      ]
    },
    {
      "id": "ambulance-services",
      "title": "Ambulance Services",
      "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/19.icon",
      "type": "urn:nlp-types:category",
      "href": "https://places.demo.api.here.com/places/v1/categories/places/ambulance-services?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
      "system": "places",
      "within": [
        "police-emergency"
      ]
    },
    {
      "id": "fire-department",
      "title": "Fire Department",
      "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/19.icon",
      "type": "urn:nlp-types:category",
      "href": "https://places.demo.api.here.com/places/v1/categories/places/fire-department?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
      "system": "places",
      "within": [
        "police-emergency"
      ]
    },
    {
      "id": "police-station",
      "title": "Police Station",
      "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/19.icon",
      "type": "urn:nlp-types:category",
      "href": "https://places.demo.api.here.com/places/v1/categories/places/police-station?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
      "system": "places",
      "within": [
        "police-emergency"
      ]
    },
    {
      "id": "post-office",
      "title": "Post Office",
      "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/20.icon",
      "type": "urn:nlp-types:category",
      "href": "https://places.demo.api.here.com/places/v1/categories/places/post-office?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
      "system": "places",
      "within": [
        "business-services"
      ]
    },
    {
      "id": "tourist-information",
      "title": "Tourist Information",
      "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/21.icon",
      "type": "urn:nlp-types:category",
      "href": "https://places.demo.api.here.com/places/v1/categories/places/tourist-information?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
      "system": "places",
      "within": [
        "business-services"
      ]
    },
    {
      "id": "petrol-station",
      "title": "Fuel Station",
      "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/18.icon",
      "type": "urn:nlp-types:category",
      "href": "https://places.demo.api.here.com/places/v1/categories/places/petrol-station?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
      "system": "places",
      "within": [
        "business-services"
      ]
    },
    {
      "id": "ev-charging-station",
      "title": "EV Charging Station",
      "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/81.icon",
      "type": "urn:nlp-types:category",
      "href": "https://places.demo.api.here.com/places/v1/categories/places/ev-charging-station?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
      "system": "places",
      "within": [
        "business-services"
      ]
    },
    {
      "id": "car-rental",
      "title": "Car Rental",
      "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/17.icon",
      "type": "urn:nlp-types:category",
      "href": "https://places.demo.api.here.com/places/v1/categories/places/car-rental?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
      "system": "places",
      "within": [
        "business-services"
      ]
    },
    {
      "id": "car-dealer-repair",
      "title": "Car Dealer/Repair",
      "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/16.icon",
      "type": "urn:nlp-types:category",
      "href": "https://places.demo.api.here.com/places/v1/categories/places/car-dealer-repair?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
      "system": "places",
      "within": [
        "business-services"
      ]
    },
    {
      "id": "travel-agency",
      "title": "Travel Agency",
      "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/02.icon",
      "type": "urn:nlp-types:category",
      "href": "https://places.demo.api.here.com/places/v1/categories/places/travel-agency?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
      "system": "places",
      "within": [
        "business-services"
      ]
    },
    {
      "id": "communication-media",
      "title": "Communications/Media",
      "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/02.icon",
      "type": "urn:nlp-types:category",
      "href": "https://places.demo.api.here.com/places/v1/categories/places/communication-media?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
      "system": "places",
      "within": [
        "business-services"
      ]
    },
    {
      "id": "business-industry",
      "title": "Business/Industry",
      "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/02.icon",
      "type": "urn:nlp-types:category",
      "href": "https://places.demo.api.here.com/places/v1/categories/places/business-industry?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
      "system": "places",
      "within": [
        "business-services"
      ]
    },
    {
      "id": "service",
      "title": "Service",
      "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/02.icon",
      "type": "urn:nlp-types:category",
      "href": "https://places.demo.api.here.com/places/v1/categories/places/service?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
      "system": "places",
      "within": [
        "business-services"
      ]
    },
    {
      "id": "facilities",
      "title": "Facilities",
      "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/04.icon",
      "type": "urn:nlp-types:category",
      "href": "https://places.demo.api.here.com/places/v1/categories/places/facilities?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
      "system": "places",
      "within": []
    },
    {
      "id": "hospital-health-care-facility",
      "title": "Hospital or Healthcare Facility",
      "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/26.icon",
      "type": "urn:nlp-types:category",
      "href": "https://places.demo.api.here.com/places/v1/categories/places/hospital-health-care-facility?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
      "system": "places",
      "within": [
        "facilities"
      ]
    },
    {
      "id": "hospital",
      "title": "Hospital",
      "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/26.icon",
      "type": "urn:nlp-types:category",
      "href": "https://places.demo.api.here.com/places/v1/categories/places/hospital?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
      "system": "places",
      "within": [
        "hospital-health-care-facility"
      ]
    },
    {
      "id": "government-community-facility",
      "title": "Government or Community Facility",
      "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/04.icon",
      "type": "urn:nlp-types:category",
      "href": "https://places.demo.api.here.com/places/v1/categories/places/government-community-facility?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
      "system": "places",
      "within": [
        "facilities"
      ]
    },
    {
      "id": "education-facility",
      "title": "Educational Facility",
      "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/25.icon",
      "type": "urn:nlp-types:category",
      "href": "https://places.demo.api.here.com/places/v1/categories/places/education-facility?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
      "system": "places",
      "within": [
        "facilities"
      ]
    },
    {
      "id": "library",
      "title": "Library",
      "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/27.icon",
      "type": "urn:nlp-types:category",
      "href": "https://places.demo.api.here.com/places/v1/categories/places/library?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
      "system": "places",
      "within": [
        "facilities"
      ]
    },
    {
      "id": "fair-convention-facility",
      "title": "Expo & Convention Facility",
      "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/24.icon",
      "type": "urn:nlp-types:category",
      "href": "https://places.demo.api.here.com/places/v1/categories/places/fair-convention-facility?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
      "system": "places",
      "within": [
        "facilities"
      ]
    },
    {
      "id": "parking-facility",
      "title": "Parking Facility",
      "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/28.icon",
      "type": "urn:nlp-types:category",
      "href": "https://places.demo.api.here.com/places/v1/categories/places/parking-facility?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
      "system": "places",
      "within": [
        "facilities"
      ]
    },
    {
      "id": "toilet-rest-area",
      "title": "Public Bathroom/Rest Area",
      "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/29.icon",
      "type": "urn:nlp-types:category",
      "href": "https://places.demo.api.here.com/places/v1/categories/places/toilet-rest-area?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
      "system": "places",
      "within": [
        "facilities"
      ]
    },
    {
      "id": "sports-facility-venue",
      "title": "Sport Facility/Venue",
      "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/30.icon",
      "type": "urn:nlp-types:category",
      "href": "https://places.demo.api.here.com/places/v1/categories/places/sports-facility-venue?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
      "system": "places",
      "within": [
        "facilities"
      ]
    },
    {
      "id": "facility",
      "title": "Facility",
      "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/04.icon",
      "type": "urn:nlp-types:category",
      "href": "https://places.demo.api.here.com/places/v1/categories/places/facility?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
      "system": "places",
      "within": [
        "facilities"
      ]
    },
    {
      "id": "religious-place",
      "title": "Religious Place",
      "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/39.icon",
      "type": "urn:nlp-types:category",
      "href": "https://places.demo.api.here.com/places/v1/categories/places/religious-place?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
      "system": "places",
      "within": [
        "facilities"
      ]
    },
    {
      "id": "leisure-outdoor",
      "title": "Leisure & Outdoor",
      "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/07.icon",
      "type": "urn:nlp-types:category",
      "href": "https://places.demo.api.here.com/places/v1/categories/places/leisure-outdoor?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
      "system": "places",
      "within": []
    },
    {
      "id": "recreation",
      "title": "Recreation",
      "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/07.icon",
      "type": "urn:nlp-types:category",
      "href": "https://places.demo.api.here.com/places/v1/categories/places/recreation?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
      "system": "places",
      "within": [
        "leisure-outdoor"
      ]
    },
    {
      "id": "amusement-holiday-park",
      "title": "Theme Park",
      "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/34.icon",
      "type": "urn:nlp-types:category",
      "href": "https://places.demo.api.here.com/places/v1/categories/places/amusement-holiday-park?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
      "system": "places",
      "within": [
        "leisure-outdoor"
      ]
    },
    {
      "id": "zoo",
      "title": "Zoo",
      "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/34.icon",
      "type": "urn:nlp-types:category",
      "href": "https://places.demo.api.here.com/places/v1/categories/places/zoo?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
      "system": "places",
      "within": [
        "amusement-holiday-park"
      ]
    },
    {
      "id": "administrative-areas-buildings",
      "title": "Administrative Areas/Buildings",
      "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/06.icon",
      "type": "urn:nlp-types:category",
      "href": "https://places.demo.api.here.com/places/v1/categories/places/administrative-areas-buildings?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
      "system": "places",
      "within": []
    },
    {
      "id": "administrative-region",
      "title": "Administrative Region",
      "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/06.icon",
      "type": "urn:nlp-types:category",
      "href": "https://places.demo.api.here.com/places/v1/categories/places/administrative-region?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
      "system": "places",
      "within": [
        "administrative-areas-buildings"
      ]
    },
    {
      "id": "city-town-village",
      "title": "City, Town or Village",
      "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/35.icon",
      "type": "urn:nlp-types:category",
      "href": "https://places.demo.api.here.com/places/v1/categories/places/city-town-village?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
      "system": "places",
      "within": [
        "administrative-areas-buildings"
      ]
    },
    {
      "id": "outdoor-area-complex",
      "title": "Outdoor Area/Complex",
      "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/06.icon",
      "type": "urn:nlp-types:category",
      "href": "https://places.demo.api.here.com/places/v1/categories/places/outdoor-area-complex?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
      "system": "places",
      "within": [
        "administrative-areas-buildings"
      ]
    },
    {
      "id": "building",
      "title": "Building",
      "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/06.icon",
      "type": "urn:nlp-types:category",
      "href": "https://places.demo.api.here.com/places/v1/categories/places/building?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
      "system": "places",
      "within": [
        "administrative-areas-buildings"
      ]
    },
    {
      "id": "street-square",
      "title": "Street or Square",
      "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/06.icon",
      "type": "urn:nlp-types:category",
      "href": "https://places.demo.api.here.com/places/v1/categories/places/street-square?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
      "system": "places",
      "within": [
        "administrative-areas-buildings"
      ]
    },
    {
      "id": "intersection",
      "title": "Intersection",
      "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/06.icon",
      "type": "urn:nlp-types:category",
      "href": "https://places.demo.api.here.com/places/v1/categories/places/intersection?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
      "system": "places",
      "within": [
        "administrative-areas-buildings"
      ]
    },
    {
      "id": "postal-area",
      "title": "Postal Area",
      "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/06.icon",
      "type": "urn:nlp-types:category",
      "href": "https://places.demo.api.here.com/places/v1/categories/places/postal-area?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
      "system": "places",
      "within": [
        "administrative-areas-buildings"
      ]
    },
    {
      "id": "natural-geographical",
      "title": "Natural or Geographical",
      "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/08.icon",
      "type": "urn:nlp-types:category",
      "href": "https://places.demo.api.here.com/places/v1/categories/places/natural-geographical?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
      "system": "places",
      "within": []
    },
    {
      "id": "body-of-water",
      "title": "Body of Water",
      "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/36.icon",
      "type": "urn:nlp-types:category",
      "href": "https://places.demo.api.here.com/places/v1/categories/places/body-of-water?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
      "system": "places",
      "within": [
        "natural-geographical"
      ]
    },
    {
      "id": "mountain-hill",
      "title": "Mountain or Hill",
      "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/08.icon",
      "type": "urn:nlp-types:category",
      "href": "https://places.demo.api.here.com/places/v1/categories/places/mountain-hill?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
      "system": "places",
      "within": [
        "natural-geographical"
      ]
    },
    {
      "id": "undersea-feature",
      "title": "Underwater Feature",
      "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/08.icon",
      "type": "urn:nlp-types:category",
      "href": "https://places.demo.api.here.com/places/v1/categories/places/undersea-feature?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
      "system": "places",
      "within": [
        "natural-geographical"
      ]
    },
    {
      "id": "forest-heath-vegetation",
      "title": "Forest, Heath or Other Vegetation",
      "icon": "https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/08.icon",
      "type": "urn:nlp-types:category",
      "href": "https://places.demo.api.here.com/places/v1/categories/places/forest-heath-vegetation?app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg",
      "system": "places",
      "within": [
        "natural-geographical"
      ]
    }
  ]
}

const scoreBatVideoApi = [
    {
        "title": "Netherlands W - Slovenia W",
        "embed": "<iframe src='https:\/\/www.scorebat.com\/embed\/g\/886023\/?s=2' frameborder='0' width='560' height='590' allowfullscreen allow='autoplay; fullscreen' style='width:560px;height:590px;overflow:hidden;display:block;' class='_scorebatEmbeddedPlayer_'><\/iframe><script>(function(d, s, id) { var js, fjs = d.getElementsByTagName(s)[0]; if (d.getElementById(id)) return; js = d.createElement(s); js.id = id; js.src = 'https:\/\/www.scorebat.com\/embed\/embed.js?v=mto'; fjs.parentNode.insertBefore(js, fjs); }(document, 'script', 'scorebat-jssdk'));<\/script>",
        "url": "https:\/\/www.scorebat.com\/netherlands-w-vs-slovenia-w-live-stream\/",
        "thumbnail": "https:\/\/www.scorebat.com\/og\/m\/og886023.jpeg",
        "date": "2019-11-12T19:00:00+0000",
        "side1": {
            "name": "Netherlands W",
            "url": "https:\/\/www.scorebat.com\/live-stream\/netherlands-w\/"
        },
        "side2": {
            "name": "Slovenia W",
            "url": "https:\/\/www.scorebat.com\/live-stream\/slovenia-w\/"
        },
        "competition": {
            "name": "EUROPEAN CHAMPIONSHIP: Qualifying - Women",
            "id": 4668,
            "url": "https:\/\/www.scorebat.com\/european-championship-qualifying--women-live-scores\/"
        },
        "videos": [
            {
                "title": "Highlights",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;'><iframe src='https:\/\/www.scorebat.com\/embed\/v\/5dcbb20614d5c\/?s=2' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'><\/iframe><\/div>"
            }
        ]
    },
    {
        "title": "Port Vale - Newcastle U-21",
        "embed": "<iframe src='https:\/\/www.scorebat.com\/embed\/g\/899687\/?s=2' frameborder='0' width='560' height='590' allowfullscreen allow='autoplay; fullscreen' style='width:560px;height:590px;overflow:hidden;display:block;' class='_scorebatEmbeddedPlayer_'><\/iframe><script>(function(d, s, id) { var js, fjs = d.getElementsByTagName(s)[0]; if (d.getElementById(id)) return; js = d.createElement(s); js.id = id; js.src = 'https:\/\/www.scorebat.com\/embed\/embed.js?v=mto'; fjs.parentNode.insertBefore(js, fjs); }(document, 'script', 'scorebat-jssdk'));<\/script>",
        "url": "https:\/\/www.scorebat.com\/newcastle-u21-vs-port-vale-live-stream\/",
        "thumbnail": "https:\/\/www.scorebat.com\/og\/m\/og899687.jpeg",
        "date": "2019-11-12T19:45:00+0000",
        "side1": {
            "name": "Port Vale",
            "url": "https:\/\/www.scorebat.com\/live-stream\/port-vale\/"
        },
        "side2": {
            "name": "Newcastle U-21",
            "url": "https:\/\/www.scorebat.com\/live-stream\/newcastle-u21\/"
        },
        "competition": {
            "name": "ENGLAND: EFL Trophy",
            "id": 3038,
            "url": "https:\/\/www.scorebat.com\/england-efl-trophy-live-scores\/"
        },
        "videos": [
            {
                "title": "Highlights",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;'><iframe src='https:\/\/www.scorebat.com\/embed\/v\/5dcbac3913f99\/?s=2' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'><\/iframe><\/div>"
            }
        ]
    },
    {
        "title": "Gillingham - Tottenham U-21",
        "embed": "<iframe src='https:\/\/www.scorebat.com\/embed\/g\/899676\/?s=2' frameborder='0' width='560' height='590' allowfullscreen allow='autoplay; fullscreen' style='width:560px;height:590px;overflow:hidden;display:block;' class='_scorebatEmbeddedPlayer_'><\/iframe><script>(function(d, s, id) { var js, fjs = d.getElementsByTagName(s)[0]; if (d.getElementById(id)) return; js = d.createElement(s); js.id = id; js.src = 'https:\/\/www.scorebat.com\/embed\/embed.js?v=mto'; fjs.parentNode.insertBefore(js, fjs); }(document, 'script', 'scorebat-jssdk'));<\/script>",
        "url": "https:\/\/www.scorebat.com\/gillingham-vs-tottenham-u21-live-stream\/",
        "thumbnail": "https:\/\/www.scorebat.com\/og\/m\/og899676.jpeg",
        "date": "2019-11-12T19:00:00+0000",
        "side1": {
            "name": "Gillingham",
            "url": "https:\/\/www.scorebat.com\/live-stream\/gillingham\/"
        },
        "side2": {
            "name": "Tottenham U-21",
            "url": "https:\/\/www.scorebat.com\/live-stream\/tottenham-u21\/"
        },
        "competition": {
            "name": "ENGLAND: EFL Trophy",
            "id": 3038,
            "url": "https:\/\/www.scorebat.com\/england-efl-trophy-live-scores\/"
        },
        "videos": [
            {
                "title": "Highlights",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;'><iframe src='https:\/\/www.scorebat.com\/embed\/v\/5dcbac31a476b\/?s=2' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'><\/iframe><\/div>"
            }
        ]
    },
    {
        "title": "Deportivo Capiata - Sol de America",
        "embed": "<iframe src='https:\/\/www.scorebat.com\/embed\/g\/831200\/?s=2' frameborder='0' width='560' height='590' allowfullscreen allow='autoplay; fullscreen' style='width:560px;height:590px;overflow:hidden;display:block;' class='_scorebatEmbeddedPlayer_'><\/iframe><script>(function(d, s, id) { var js, fjs = d.getElementsByTagName(s)[0]; if (d.getElementById(id)) return; js = d.createElement(s); js.id = id; js.src = 'https:\/\/www.scorebat.com\/embed\/embed.js?v=mto'; fjs.parentNode.insertBefore(js, fjs); }(document, 'script', 'scorebat-jssdk'));<\/script>",
        "url": "https:\/\/www.scorebat.com\/deportivo-capiata-vs-sol-de-america-live-stream\/",
        "thumbnail": "https:\/\/www.scorebat.com\/og\/m\/og831200.jpeg",
        "date": "2019-11-12T23:00:00+0000",
        "side1": {
            "name": "Deportivo Capiata",
            "url": "https:\/\/www.scorebat.com\/live-stream\/deportivo-capiata\/"
        },
        "side2": {
            "name": "Sol de America",
            "url": "https:\/\/www.scorebat.com\/live-stream\/sol-de-america\/"
        },
        "competition": {
            "name": "PARAGUAY: Clausura",
            "id": 1208,
            "url": "https:\/\/www.scorebat.com\/paraguay-clausura-live-scores\/"
        },
        "videos": [
            {
                "title": "Highlights",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;'><iframe src='https:\/\/www.scorebat.com\/embed\/v\/5dcb82ccef957\/?s=2' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'><\/iframe><\/div>"
            }
        ]
    },
    {
        "title": "Brasil de Pelotas - Coritiba",
        "embed": "<iframe src='https:\/\/www.scorebat.com\/embed\/g\/807609\/?s=2' frameborder='0' width='560' height='590' allowfullscreen allow='autoplay; fullscreen' style='width:560px;height:590px;overflow:hidden;display:block;' class='_scorebatEmbeddedPlayer_'><\/iframe><script>(function(d, s, id) { var js, fjs = d.getElementsByTagName(s)[0]; if (d.getElementById(id)) return; js = d.createElement(s); js.id = id; js.src = 'https:\/\/www.scorebat.com\/embed\/embed.js?v=mto'; fjs.parentNode.insertBefore(js, fjs); }(document, 'script', 'scorebat-jssdk'));<\/script>",
        "url": "https:\/\/www.scorebat.com\/brasil-de-pelotas-vs-coritiba-live-stream\/",
        "thumbnail": "https:\/\/www.scorebat.com\/og\/m\/og807609.jpeg",
        "date": "2019-11-12T22:15:00+0000",
        "side1": {
            "name": "Brasil de Pelotas",
            "url": "https:\/\/www.scorebat.com\/live-stream\/brasil-de-pelotas\/"
        },
        "side2": {
            "name": "Coritiba",
            "url": "https:\/\/www.scorebat.com\/live-stream\/coritiba\/"
        },
        "competition": {
            "name": "BRASIL: Serie B",
            "id": 1194,
            "url": "https:\/\/www.scorebat.com\/brasil-serie-b-live-scores\/"
        },
        "videos": [
            {
                "title": "Highlights",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;'><iframe src='https:\/\/www.scorebat.com\/embed\/v\/5dcb82c91ca59\/?s=2' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'><\/iframe><\/div>"
            }
        ]
    },
    {
        "title": "Parana - Sao Bento",
        "embed": "<iframe src='https:\/\/www.scorebat.com\/embed\/g\/807606\/?s=2' frameborder='0' width='560' height='590' allowfullscreen allow='autoplay; fullscreen' style='width:560px;height:590px;overflow:hidden;display:block;' class='_scorebatEmbeddedPlayer_'><\/iframe><script>(function(d, s, id) { var js, fjs = d.getElementsByTagName(s)[0]; if (d.getElementById(id)) return; js = d.createElement(s); js.id = id; js.src = 'https:\/\/www.scorebat.com\/embed\/embed.js?v=mto'; fjs.parentNode.insertBefore(js, fjs); }(document, 'script', 'scorebat-jssdk'));<\/script>",
        "url": "https:\/\/www.scorebat.com\/parana-vs-sao-bento-live-stream\/",
        "thumbnail": "https:\/\/www.scorebat.com\/og\/m\/og807606.jpeg",
        "date": "2019-11-13T00:30:00+0000",
        "side1": {
            "name": "Parana",
            "url": "https:\/\/www.scorebat.com\/live-stream\/parana\/"
        },
        "side2": {
            "name": "Sao Bento",
            "url": "https:\/\/www.scorebat.com\/live-stream\/sao-bento\/"
        },
        "competition": {
            "name": "BRASIL: Serie B",
            "id": 1194,
            "url": "https:\/\/www.scorebat.com\/brasil-serie-b-live-scores\/"
        },
        "videos": [
            {
                "title": "Highlights",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;'><iframe src='https:\/\/www.scorebat.com\/embed\/v\/5dcb82c525b3c\/?s=2' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'><\/iframe><\/div>"
            }
        ]
    },
    {
        "title": "Vitoria - CRB Maceio",
        "embed": "<iframe src='https:\/\/www.scorebat.com\/embed\/g\/807610\/?s=2' frameborder='0' width='560' height='590' allowfullscreen allow='autoplay; fullscreen' style='width:560px;height:590px;overflow:hidden;display:block;' class='_scorebatEmbeddedPlayer_'><\/iframe><script>(function(d, s, id) { var js, fjs = d.getElementsByTagName(s)[0]; if (d.getElementById(id)) return; js = d.createElement(s); js.id = id; js.src = 'https:\/\/www.scorebat.com\/embed\/embed.js?v=mto'; fjs.parentNode.insertBefore(js, fjs); }(document, 'script', 'scorebat-jssdk'));<\/script>",
        "url": "https:\/\/www.scorebat.com\/crb-maceio-vs-vitoria-live-stream\/",
        "thumbnail": "https:\/\/www.scorebat.com\/og\/m\/og807610.jpeg",
        "date": "2019-11-12T22:15:00+0000",
        "side1": {
            "name": "Vitoria",
            "url": "https:\/\/www.scorebat.com\/live-stream\/vitoria\/"
        },
        "side2": {
            "name": "CRB Maceio",
            "url": "https:\/\/www.scorebat.com\/live-stream\/crb-maceio\/"
        },
        "competition": {
            "name": "BRASIL: Serie B",
            "id": 1194,
            "url": "https:\/\/www.scorebat.com\/brasil-serie-b-live-scores\/"
        },
        "videos": [
            {
                "title": "Highlights",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;'><iframe src='https:\/\/www.scorebat.com\/embed\/v\/5dcb7ffbe2956\/?s=2' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'><\/iframe><\/div>"
            }
        ]
    },
    {
        "title": "Oeste - Atletico GO",
        "embed": "<iframe src='https:\/\/www.scorebat.com\/embed\/g\/807604\/?s=2' frameborder='0' width='560' height='590' allowfullscreen allow='autoplay; fullscreen' style='width:560px;height:590px;overflow:hidden;display:block;' class='_scorebatEmbeddedPlayer_'><\/iframe><script>(function(d, s, id) { var js, fjs = d.getElementsByTagName(s)[0]; if (d.getElementById(id)) return; js = d.createElement(s); js.id = id; js.src = 'https:\/\/www.scorebat.com\/embed\/embed.js?v=mto'; fjs.parentNode.insertBefore(js, fjs); }(document, 'script', 'scorebat-jssdk'));<\/script>",
        "url": "https:\/\/www.scorebat.com\/atletico-go-vs-oeste-live-stream\/",
        "thumbnail": "https:\/\/www.scorebat.com\/og\/m\/og807604.jpeg",
        "date": "2019-11-12T22:15:00+0000",
        "side1": {
            "name": "Oeste",
            "url": "https:\/\/www.scorebat.com\/live-stream\/oeste\/"
        },
        "side2": {
            "name": "Atletico GO",
            "url": "https:\/\/www.scorebat.com\/live-stream\/atletico-go\/"
        },
        "competition": {
            "name": "BRASIL: Serie B",
            "id": 1194,
            "url": "https:\/\/www.scorebat.com\/brasil-serie-b-live-scores\/"
        },
        "videos": [
            {
                "title": "Highlights",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;'><iframe src='https:\/\/www.scorebat.com\/embed\/v\/5dcb7ff4e6e9a\/?s=2' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'><\/iframe><\/div>"
            }
        ]
    },
    {
        "title": "Operario PR - Bragantino",
        "embed": "<iframe src='https:\/\/www.scorebat.com\/embed\/g\/807607\/?s=2' frameborder='0' width='560' height='590' allowfullscreen allow='autoplay; fullscreen' style='width:560px;height:590px;overflow:hidden;display:block;' class='_scorebatEmbeddedPlayer_'><\/iframe><script>(function(d, s, id) { var js, fjs = d.getElementsByTagName(s)[0]; if (d.getElementById(id)) return; js = d.createElement(s); js.id = id; js.src = 'https:\/\/www.scorebat.com\/embed\/embed.js?v=mto'; fjs.parentNode.insertBefore(js, fjs); }(document, 'script', 'scorebat-jssdk'));<\/script>",
        "url": "https:\/\/www.scorebat.com\/bragantino-vs-operario-pr-live-stream\/",
        "thumbnail": "https:\/\/www.scorebat.com\/og\/m\/og807607.jpeg",
        "date": "2019-11-13T00:30:00+0000",
        "side1": {
            "name": "Operario PR",
            "url": "https:\/\/www.scorebat.com\/live-stream\/operario-pr\/"
        },
        "side2": {
            "name": "Bragantino",
            "url": "https:\/\/www.scorebat.com\/live-stream\/bragantino\/"
        },
        "competition": {
            "name": "BRASIL: Serie B",
            "id": 1194,
            "url": "https:\/\/www.scorebat.com\/brasil-serie-b-live-scores\/"
        },
        "videos": [
            {
                "title": "Highlights",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;'><iframe src='https:\/\/www.scorebat.com\/embed\/v\/5dcb7ff10f7de\/?s=2' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'><\/iframe><\/div>"
            }
        ]
    },
    {
        "title": "Criciuma - Londrina",
        "embed": "<iframe src='https:\/\/www.scorebat.com\/embed\/g\/807608\/?s=2' frameborder='0' width='560' height='590' allowfullscreen allow='autoplay; fullscreen' style='width:560px;height:590px;overflow:hidden;display:block;' class='_scorebatEmbeddedPlayer_'><\/iframe><script>(function(d, s, id) { var js, fjs = d.getElementsByTagName(s)[0]; if (d.getElementById(id)) return; js = d.createElement(s); js.id = id; js.src = 'https:\/\/www.scorebat.com\/embed\/embed.js?v=mto'; fjs.parentNode.insertBefore(js, fjs); }(document, 'script', 'scorebat-jssdk'));<\/script>",
        "url": "https:\/\/www.scorebat.com\/criciuma-vs-londrina-live-stream\/",
        "thumbnail": "https:\/\/www.scorebat.com\/og\/m\/og807608.jpeg",
        "date": "2019-11-12T23:30:00+0000",
        "side1": {
            "name": "Criciuma",
            "url": "https:\/\/www.scorebat.com\/live-stream\/criciuma\/"
        },
        "side2": {
            "name": "Londrina",
            "url": "https:\/\/www.scorebat.com\/live-stream\/londrina\/"
        },
        "competition": {
            "name": "BRASIL: Serie B",
            "id": 1194,
            "url": "https:\/\/www.scorebat.com\/brasil-serie-b-live-scores\/"
        },
        "videos": [
            {
                "title": "Highlights",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;'><iframe src='https:\/\/www.scorebat.com\/embed\/v\/5dcb7fed1a7e0\/?s=2' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'><\/iframe><\/div>"
            }
        ]
    },
    {
        "title": "Ponte Preta - Figueirense",
        "embed": "<iframe src='https:\/\/www.scorebat.com\/embed\/g\/807602\/?s=2' frameborder='0' width='560' height='590' allowfullscreen allow='autoplay; fullscreen' style='width:560px;height:590px;overflow:hidden;display:block;' class='_scorebatEmbeddedPlayer_'><\/iframe><script>(function(d, s, id) { var js, fjs = d.getElementsByTagName(s)[0]; if (d.getElementById(id)) return; js = d.createElement(s); js.id = id; js.src = 'https:\/\/www.scorebat.com\/embed\/embed.js?v=mto'; fjs.parentNode.insertBefore(js, fjs); }(document, 'script', 'scorebat-jssdk'));<\/script>",
        "url": "https:\/\/www.scorebat.com\/figueirense-vs-ponte-preta-live-stream\/",
        "thumbnail": "https:\/\/www.scorebat.com\/og\/m\/og807602.jpeg",
        "date": "2019-11-12T23:30:00+0000",
        "side1": {
            "name": "Ponte Preta",
            "url": "https:\/\/www.scorebat.com\/live-stream\/ponte-preta\/"
        },
        "side2": {
            "name": "Figueirense",
            "url": "https:\/\/www.scorebat.com\/live-stream\/figueirense\/"
        },
        "competition": {
            "name": "BRASIL: Serie B",
            "id": 1194,
            "url": "https:\/\/www.scorebat.com\/brasil-serie-b-live-scores\/"
        },
        "videos": [
            {
                "title": "Highlights",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;'><iframe src='https:\/\/www.scorebat.com\/embed\/v\/5dcb7fe93d018\/?s=2' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'><\/iframe><\/div>"
            }
        ]
    },
    {
        "title": "Sportivo Luqueno - River Plate As",
        "embed": "<iframe src='https:\/\/www.scorebat.com\/embed\/g\/831197\/?s=2' frameborder='0' width='560' height='590' allowfullscreen allow='autoplay; fullscreen' style='width:560px;height:590px;overflow:hidden;display:block;' class='_scorebatEmbeddedPlayer_'><\/iframe><script>(function(d, s, id) { var js, fjs = d.getElementsByTagName(s)[0]; if (d.getElementById(id)) return; js = d.createElement(s); js.id = id; js.src = 'https:\/\/www.scorebat.com\/embed\/embed.js?v=mto'; fjs.parentNode.insertBefore(js, fjs); }(document, 'script', 'scorebat-jssdk'));<\/script>",
        "url": "https:\/\/www.scorebat.com\/river-plate-as-vs-sportivo-luqueno-live-stream\/",
        "thumbnail": "https:\/\/www.scorebat.com\/og\/m\/og831197.jpeg",
        "date": "2019-11-12T21:00:00+0000",
        "side1": {
            "name": "Sportivo Luqueno",
            "url": "https:\/\/www.scorebat.com\/live-stream\/sportivo-luqueno\/"
        },
        "side2": {
            "name": "River Plate As",
            "url": "https:\/\/www.scorebat.com\/live-stream\/river-plate-as\/"
        },
        "competition": {
            "name": "PARAGUAY: Clausura",
            "id": 1208,
            "url": "https:\/\/www.scorebat.com\/paraguay-clausura-live-scores\/"
        },
        "videos": [
            {
                "title": "Highlights",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;'><iframe src='https:\/\/www.scorebat.com\/embed\/v\/5dcb5fa452140\/?s=2' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'><\/iframe><\/div>"
            }
        ]
    },
    {
        "title": "Persib - Arema",
        "embed": "<iframe src='https:\/\/www.scorebat.com\/embed\/g\/814105\/?s=2' frameborder='0' width='560' height='590' allowfullscreen allow='autoplay; fullscreen' style='width:560px;height:590px;overflow:hidden;display:block;' class='_scorebatEmbeddedPlayer_'><\/iframe><script>(function(d, s, id) { var js, fjs = d.getElementsByTagName(s)[0]; if (d.getElementById(id)) return; js = d.createElement(s); js.id = id; js.src = 'https:\/\/www.scorebat.com\/embed\/embed.js?v=mto'; fjs.parentNode.insertBefore(js, fjs); }(document, 'script', 'scorebat-jssdk'));<\/script>",
        "url": "https:\/\/www.scorebat.com\/arema-vs-persib-live-stream\/",
        "thumbnail": "https:\/\/www.scorebat.com\/og\/m\/og814105.jpeg",
        "date": "2019-11-12T08:30:00+0000",
        "side1": {
            "name": "Persib",
            "url": "https:\/\/www.scorebat.com\/live-stream\/persib\/"
        },
        "side2": {
            "name": "Arema",
            "url": "https:\/\/www.scorebat.com\/live-stream\/arema\/"
        },
        "competition": {
            "name": "INDONESIA: Liga 1",
            "id": 1705,
            "url": "https:\/\/www.scorebat.com\/indonesia-liga-1-live-scores\/"
        },
        "videos": [
            {
                "title": "Highlights",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;'><iframe src='https:\/\/www.scorebat.com\/embed\/v\/5dcaaf8397a9e\/?s=2' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'><\/iframe><\/div>"
            }
        ]
    },
    {
        "title": "Deportivo Santani - Olimpia",
        "embed": "<iframe src='https:\/\/www.scorebat.com\/embed\/g\/831199\/?s=2' frameborder='0' width='560' height='590' allowfullscreen allow='autoplay; fullscreen' style='width:560px;height:590px;overflow:hidden;display:block;' class='_scorebatEmbeddedPlayer_'><\/iframe><script>(function(d, s, id) { var js, fjs = d.getElementsByTagName(s)[0]; if (d.getElementById(id)) return; js = d.createElement(s); js.id = id; js.src = 'https:\/\/www.scorebat.com\/embed\/embed.js?v=mto'; fjs.parentNode.insertBefore(js, fjs); }(document, 'script', 'scorebat-jssdk'));<\/script>",
        "url": "https:\/\/www.scorebat.com\/deportivo-santani-vs-olimpia-live-stream\/",
        "thumbnail": "https:\/\/www.scorebat.com\/og\/m\/og831199.jpeg",
        "date": "2019-11-11T23:00:00+0000",
        "side1": {
            "name": "Deportivo Santani",
            "url": "https:\/\/www.scorebat.com\/live-stream\/deportivo-santani\/"
        },
        "side2": {
            "name": "Olimpia",
            "url": "https:\/\/www.scorebat.com\/live-stream\/olimpia\/"
        },
        "competition": {
            "name": "PARAGUAY: Clausura",
            "id": 1208,
            "url": "https:\/\/www.scorebat.com\/paraguay-clausura-live-scores\/"
        },
        "videos": [
            {
                "title": "Highlights",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;'><iframe src='https:\/\/www.scorebat.com\/embed\/v\/5dca79cb7b07e\/?s=2' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'><\/iframe><\/div>"
            }
        ]
    },
    {
        "title": "Rodez Aveyron - Lens",
        "embed": "<iframe src='https:\/\/www.scorebat.com\/embed\/g\/822456\/?s=2' frameborder='0' width='560' height='590' allowfullscreen allow='autoplay; fullscreen' style='width:560px;height:590px;overflow:hidden;display:block;' class='_scorebatEmbeddedPlayer_'><\/iframe><script>(function(d, s, id) { var js, fjs = d.getElementsByTagName(s)[0]; if (d.getElementById(id)) return; js = d.createElement(s); js.id = id; js.src = 'https:\/\/www.scorebat.com\/embed\/embed.js?v=mto'; fjs.parentNode.insertBefore(js, fjs); }(document, 'script', 'scorebat-jssdk'));<\/script>",
        "url": "https:\/\/www.scorebat.com\/lens-vs-rodez-aveyron-live-stream\/",
        "thumbnail": "https:\/\/www.scorebat.com\/og\/m\/og822456.jpeg",
        "date": "2019-11-11T19:45:00+0000",
        "side1": {
            "name": "Rodez Aveyron",
            "url": "https:\/\/www.scorebat.com\/live-stream\/rodez-aveyron\/"
        },
        "side2": {
            "name": "Lens",
            "url": "https:\/\/www.scorebat.com\/live-stream\/lens\/"
        },
        "competition": {
            "name": "FRANCE: Ligue 2",
            "id": 207,
            "url": "https:\/\/www.scorebat.com\/france-ligue-2-live-scores\/"
        },
        "videos": [
            {
                "title": "Highlights",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;'><iframe src='https:\/\/www.scorebat.com\/embed\/v\/5dca7229bdc08\/?s=2' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'><\/iframe><\/div>"
            }
        ]
    },
    {
        "title": "Cuiaba - America MG",
        "embed": "<iframe src='https:\/\/www.scorebat.com\/embed\/g\/807611\/?s=2' frameborder='0' width='560' height='590' allowfullscreen allow='autoplay; fullscreen' style='width:560px;height:590px;overflow:hidden;display:block;' class='_scorebatEmbeddedPlayer_'><\/iframe><script>(function(d, s, id) { var js, fjs = d.getElementsByTagName(s)[0]; if (d.getElementById(id)) return; js = d.createElement(s); js.id = id; js.src = 'https:\/\/www.scorebat.com\/embed\/embed.js?v=mto'; fjs.parentNode.insertBefore(js, fjs); }(document, 'script', 'scorebat-jssdk'));<\/script>",
        "url": "https:\/\/www.scorebat.com\/america-mg-vs-cuiaba-live-stream\/",
        "thumbnail": "https:\/\/www.scorebat.com\/og\/m\/og807611.jpeg",
        "date": "2019-11-12T01:00:00+0000",
        "side1": {
            "name": "Cuiaba",
            "url": "https:\/\/www.scorebat.com\/live-stream\/cuiaba\/"
        },
        "side2": {
            "name": "America MG",
            "url": "https:\/\/www.scorebat.com\/live-stream\/america-mg\/"
        },
        "competition": {
            "name": "BRASIL: Serie B",
            "id": 1194,
            "url": "https:\/\/www.scorebat.com\/brasil-serie-b-live-scores\/"
        },
        "videos": [
            {
                "title": "Highlights",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;'><iframe src='https:\/\/www.scorebat.com\/embed\/v\/5dca3f265a125\/?s=2' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'><\/iframe><\/div>"
            }
        ]
    },
    {
        "title": "Botafogo - Avai Florianopolis",
        "embed": "<iframe src='https:\/\/www.scorebat.com\/embed\/g\/811748\/?s=2' frameborder='0' width='560' height='590' allowfullscreen allow='autoplay; fullscreen' style='width:560px;height:590px;overflow:hidden;display:block;' class='_scorebatEmbeddedPlayer_'><\/iframe><script>(function(d, s, id) { var js, fjs = d.getElementsByTagName(s)[0]; if (d.getElementById(id)) return; js = d.createElement(s); js.id = id; js.src = 'https:\/\/www.scorebat.com\/embed\/embed.js?v=mto'; fjs.parentNode.insertBefore(js, fjs); }(document, 'script', 'scorebat-jssdk'));<\/script>",
        "url": "https:\/\/www.scorebat.com\/avai-florianopolis-vs-botafogo-live-stream\/",
        "thumbnail": "https:\/\/www.scorebat.com\/og\/m\/og811748.jpeg",
        "date": "2019-11-11T23:00:00+0000",
        "side1": {
            "name": "Botafogo",
            "url": "https:\/\/www.scorebat.com\/live-stream\/botafogo\/"
        },
        "side2": {
            "name": "Avai Florianopolis",
            "url": "https:\/\/www.scorebat.com\/live-stream\/avai-florianopolis\/"
        },
        "competition": {
            "name": "BRASIL: Serie A",
            "id": 64,
            "url": "https:\/\/www.scorebat.com\/brasil-serie-a-live-scores\/"
        },
        "videos": [
            {
                "title": "Highlights",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;'><iframe src='https:\/\/www.scorebat.com\/embed\/v\/5dca0fef2e894\/?s=2' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'><\/iframe><\/div>"
            }
        ]
    },
    {
        "title": "Libertad - Generali Diaz",
        "embed": "<iframe src='https:\/\/www.scorebat.com\/embed\/g\/831196\/?s=2' frameborder='0' width='560' height='590' allowfullscreen allow='autoplay; fullscreen' style='width:560px;height:590px;overflow:hidden;display:block;' class='_scorebatEmbeddedPlayer_'><\/iframe><script>(function(d, s, id) { var js, fjs = d.getElementsByTagName(s)[0]; if (d.getElementById(id)) return; js = d.createElement(s); js.id = id; js.src = 'https:\/\/www.scorebat.com\/embed\/embed.js?v=mto'; fjs.parentNode.insertBefore(js, fjs); }(document, 'script', 'scorebat-jssdk'));<\/script>",
        "url": "https:\/\/www.scorebat.com\/generali-diaz-vs-libertad-live-stream\/",
        "thumbnail": "https:\/\/www.scorebat.com\/og\/m\/og831196.jpeg",
        "date": "2019-11-11T21:00:00+0000",
        "side1": {
            "name": "Libertad",
            "url": "https:\/\/www.scorebat.com\/live-stream\/libertad\/"
        },
        "side2": {
            "name": "Generali Diaz",
            "url": "https:\/\/www.scorebat.com\/live-stream\/generali-diaz\/"
        },
        "competition": {
            "name": "PARAGUAY: Clausura",
            "id": 1208,
            "url": "https:\/\/www.scorebat.com\/paraguay-clausura-live-scores\/"
        },
        "videos": [
            {
                "title": "Highlights",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;'><iframe src='https:\/\/www.scorebat.com\/embed\/v\/5dc9f909b6b5e\/?s=2' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'><\/iframe><\/div>"
            }
        ]
    },
    {
        "title": "Larissa - Lamia",
        "embed": "<iframe src='https:\/\/www.scorebat.com\/embed\/g\/853061\/?s=2' frameborder='0' width='560' height='590' allowfullscreen allow='autoplay; fullscreen' style='width:560px;height:590px;overflow:hidden;display:block;' class='_scorebatEmbeddedPlayer_'><\/iframe><script>(function(d, s, id) { var js, fjs = d.getElementsByTagName(s)[0]; if (d.getElementById(id)) return; js = d.createElement(s); js.id = id; js.src = 'https:\/\/www.scorebat.com\/embed\/embed.js?v=mto'; fjs.parentNode.insertBefore(js, fjs); }(document, 'script', 'scorebat-jssdk'));<\/script>",
        "url": "https:\/\/www.scorebat.com\/lamia-vs-larissa-live-stream\/",
        "thumbnail": "https:\/\/www.scorebat.com\/og\/m\/og853061.jpeg",
        "date": "2019-11-11T17:30:00+0000",
        "side1": {
            "name": "Larissa",
            "url": "https:\/\/www.scorebat.com\/live-stream\/larissa\/"
        },
        "side2": {
            "name": "Lamia",
            "url": "https:\/\/www.scorebat.com\/live-stream\/lamia\/"
        },
        "competition": {
            "name": "GREECE: Super League 1",
            "id": 208,
            "url": "https:\/\/www.scorebat.com\/greece-super-league-1-live-scores\/"
        },
        "videos": [
            {
                "title": "Highlights",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;'><iframe src='https:\/\/www.scorebat.com\/embed\/v\/5dc9ece391cea\/?s=2' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'><\/iframe><\/div>"
            }
        ]
    },
    {
        "title": "Tsarsko selo - Dunav Ruse",
        "embed": "<iframe src='https:\/\/www.scorebat.com\/embed\/g\/819114\/?s=2' frameborder='0' width='560' height='590' allowfullscreen allow='autoplay; fullscreen' style='width:560px;height:590px;overflow:hidden;display:block;' class='_scorebatEmbeddedPlayer_'><\/iframe><script>(function(d, s, id) { var js, fjs = d.getElementsByTagName(s)[0]; if (d.getElementById(id)) return; js = d.createElement(s); js.id = id; js.src = 'https:\/\/www.scorebat.com\/embed\/embed.js?v=mto'; fjs.parentNode.insertBefore(js, fjs); }(document, 'script', 'scorebat-jssdk'));<\/script>",
        "url": "https:\/\/www.scorebat.com\/dunav-ruse-vs-tsarsko-selo-live-stream\/",
        "thumbnail": "https:\/\/www.scorebat.com\/og\/m\/og819114.jpeg",
        "date": "2019-11-11T15:30:00+0000",
        "side1": {
            "name": "Tsarsko selo",
            "url": "https:\/\/www.scorebat.com\/live-stream\/tsarsko-selo\/"
        },
        "side2": {
            "name": "Dunav Ruse",
            "url": "https:\/\/www.scorebat.com\/live-stream\/dunav-ruse\/"
        },
        "competition": {
            "name": "BULGARIA: A PFG",
            "id": 755,
            "url": "https:\/\/www.scorebat.com\/bulgaria-a-pfg-live-scores\/"
        },
        "videos": [
            {
                "title": "Highlights",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;'><iframe src='https:\/\/www.scorebat.com\/embed\/v\/5dc9ecdfb0f63\/?s=2' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'><\/iframe><\/div>"
            }
        ]
    },
    {
        "title": "Liverpool - Manchester City",
        "embed": "<iframe src='https:\/\/www.scorebat.com\/embed\/g\/820963\/?s=2' frameborder='0' width='560' height='590' allowfullscreen allow='autoplay; fullscreen' style='width:560px;height:590px;overflow:hidden;display:block;' class='_scorebatEmbeddedPlayer_'><\/iframe><script>(function(d, s, id) { var js, fjs = d.getElementsByTagName(s)[0]; if (d.getElementById(id)) return; js = d.createElement(s); js.id = id; js.src = 'https:\/\/www.scorebat.com\/embed\/embed.js?v=mto'; fjs.parentNode.insertBefore(js, fjs); }(document, 'script', 'scorebat-jssdk'));<\/script>",
        "url": "https:\/\/www.scorebat.com\/liverpool-vs-manchester-city-live-stream\/",
        "thumbnail": "https:\/\/www.scorebat.com\/og\/m\/og820963.jpeg",
        "date": "2019-11-10T16:30:00+0000",
        "side1": {
            "name": "Liverpool",
            "url": "https:\/\/www.scorebat.com\/live-stream\/liverpool\/"
        },
        "side2": {
            "name": "Manchester City",
            "url": "https:\/\/www.scorebat.com\/live-stream\/manchester-city\/"
        },
        "competition": {
            "name": "ENGLAND: Premier League",
            "id": 15,
            "url": "https:\/\/www.scorebat.com\/england-premier-league-live-scores\/"
        },
        "videos": [
            {
                "title": "Highlights",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;'><iframe src='https:\/\/www.scorebat.com\/embed\/v\/5dc8ba0d217dc\/?s=2' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'><\/iframe><\/div>"
            },
            {
                "title": "Highlights",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;'><iframe src='https:\/\/www.scorebat.com\/embed\/v\/5dc88b5870432\/?s=2' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'><\/iframe><\/div>"
            },
            {
                "title": "4-1 Bernardo Silva 78'",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;'><iframe src='https:\/\/www.scorebat.com\/embed\/v\/5dc8521a0be9a\/?s=2' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'><\/iframe><\/div>"
            },
            {
                "title": "3-1 Bernado Silva 78'",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;'><iframe src='https:\/\/www.scorebat.com\/embed\/v\/5dc8521e87a2e\/?s=2' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'><\/iframe><\/div>"
            },
            {
                "title": "3-0 Mane 51'",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;'><iframe src='https:\/\/www.scorebat.com\/embed\/v\/5dc84bb7aeb7e\/?s=2' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'><\/iframe><\/div>"
            },
            {
                "title": "2-0 Salah 13'",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;'><iframe src='https:\/\/www.scorebat.com\/embed\/v\/5dc83e44b4bc7\/?s=2' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'><\/iframe><\/div>"
            },
            {
                "title": "1-0 Fabinho 6'",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;'><iframe src='https:\/\/www.scorebat.com\/embed\/v\/5dc83cb01192c\/?s=2' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'><\/iframe><\/div>"
            }
        ]
    },
    {
        "title": "Juventus - AC Milan",
        "embed": "<iframe src='https:\/\/www.scorebat.com\/embed\/g\/865572\/?s=2' frameborder='0' width='560' height='590' allowfullscreen allow='autoplay; fullscreen' style='width:560px;height:590px;overflow:hidden;display:block;' class='_scorebatEmbeddedPlayer_'><\/iframe><script>(function(d, s, id) { var js, fjs = d.getElementsByTagName(s)[0]; if (d.getElementById(id)) return; js = d.createElement(s); js.id = id; js.src = 'https:\/\/www.scorebat.com\/embed\/embed.js?v=mto'; fjs.parentNode.insertBefore(js, fjs); }(document, 'script', 'scorebat-jssdk'));<\/script>",
        "url": "https:\/\/www.scorebat.com\/ac-milan-vs-juventus-live-stream\/",
        "thumbnail": "https:\/\/www.scorebat.com\/og\/m\/og865572.jpeg",
        "date": "2019-11-10T19:45:00+0000",
        "side1": {
            "name": "Juventus",
            "url": "https:\/\/www.scorebat.com\/live-stream\/juventus\/"
        },
        "side2": {
            "name": "AC Milan",
            "url": "https:\/\/www.scorebat.com\/live-stream\/ac-milan\/"
        },
        "competition": {
            "name": "ITALY: Serie A",
            "id": 13,
            "url": "https:\/\/www.scorebat.com\/italy-serie-a-live-scores\/"
        },
        "videos": [
            {
                "title": "Highlights",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;'><iframe src='https:\/\/www.scorebat.com\/embed\/v\/5dc8b9dcc5180\/?s=2' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'><\/iframe><\/div>"
            },
            {
                "title": "Highlights",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;'><iframe src='https:\/\/www.scorebat.com\/embed\/v\/5dc88585a48ee\/?s=2' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'><\/iframe><\/div>"
            },
            {
                "title": "1-0 Paulo Dybala 77'",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;'><iframe src='https:\/\/www.scorebat.com\/embed\/v\/5dc87f883af6e\/?s=2' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'><\/iframe><\/div>"
            }
        ]
    },
    {
        "title": "Manchester United - Brighton",
        "embed": "<iframe src='https:\/\/www.scorebat.com\/embed\/g\/820964\/?s=2' frameborder='0' width='560' height='590' allowfullscreen allow='autoplay; fullscreen' style='width:560px;height:590px;overflow:hidden;display:block;' class='_scorebatEmbeddedPlayer_'><\/iframe><script>(function(d, s, id) { var js, fjs = d.getElementsByTagName(s)[0]; if (d.getElementById(id)) return; js = d.createElement(s); js.id = id; js.src = 'https:\/\/www.scorebat.com\/embed\/embed.js?v=mto'; fjs.parentNode.insertBefore(js, fjs); }(document, 'script', 'scorebat-jssdk'));<\/script>",
        "url": "https:\/\/www.scorebat.com\/brighton-vs-manchester-united-live-stream\/",
        "thumbnail": "https:\/\/www.scorebat.com\/og\/m\/og820964.jpeg",
        "date": "2019-11-10T14:00:00+0000",
        "side1": {
            "name": "Manchester United",
            "url": "https:\/\/www.scorebat.com\/live-stream\/manchester-united\/"
        },
        "side2": {
            "name": "Brighton",
            "url": "https:\/\/www.scorebat.com\/live-stream\/brighton\/"
        },
        "competition": {
            "name": "ENGLAND: Premier League",
            "id": 15,
            "url": "https:\/\/www.scorebat.com\/england-premier-league-live-scores\/"
        },
        "videos": [
            {
                "title": "Highlights",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;'><iframe src='https:\/\/www.scorebat.com\/embed\/v\/5dc8b8c5bb390\/?s=2' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'><\/iframe><\/div>"
            },
            {
                "title": "Highlights",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;'><iframe src='https:\/\/www.scorebat.com\/embed\/v\/5dc889b302460\/?s=2' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'><\/iframe><\/div>"
            },
            {
                "title": "3-1 Rashford 66'",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;'><iframe src='https:\/\/www.scorebat.com\/embed\/v\/5dc82c143f141\/?s=2' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'><\/iframe><\/div>"
            },
            {
                "title": "2-1 Lewis Dunk 64'",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;'><iframe src='https:\/\/www.scorebat.com\/embed\/v\/5dc82bac1b753\/?s=2' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'><\/iframe><\/div>"
            },
            {
                "title": "2-0 Scott McTominay 19'",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;'><iframe src='https:\/\/www.scorebat.com\/embed\/v\/5dc81ca3020b0\/?s=2' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'><\/iframe><\/div>"
            },
            {
                "title": "1-0 Andreas Pereira 17'",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;'><iframe src='https:\/\/www.scorebat.com\/embed\/v\/5dc81bfde4c1d\/?s=2' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'><\/iframe><\/div>"
            }
        ]
    },
    {
        "title": "Parma - Roma",
        "embed": "<iframe src='https:\/\/www.scorebat.com\/embed\/g\/865575\/?s=2' frameborder='0' width='560' height='590' allowfullscreen allow='autoplay; fullscreen' style='width:560px;height:590px;overflow:hidden;display:block;' class='_scorebatEmbeddedPlayer_'><\/iframe><script>(function(d, s, id) { var js, fjs = d.getElementsByTagName(s)[0]; if (d.getElementById(id)) return; js = d.createElement(s); js.id = id; js.src = 'https:\/\/www.scorebat.com\/embed\/embed.js?v=mto'; fjs.parentNode.insertBefore(js, fjs); }(document, 'script', 'scorebat-jssdk'));<\/script>",
        "url": "https:\/\/www.scorebat.com\/parma-vs-roma-live-stream\/",
        "thumbnail": "https:\/\/www.scorebat.com\/og\/m\/og865575.jpeg",
        "date": "2019-11-10T17:00:00+0000",
        "side1": {
            "name": "Parma",
            "url": "https:\/\/www.scorebat.com\/live-stream\/parma\/"
        },
        "side2": {
            "name": "Roma",
            "url": "https:\/\/www.scorebat.com\/live-stream\/roma\/"
        },
        "competition": {
            "name": "ITALY: Serie A",
            "id": 13,
            "url": "https:\/\/www.scorebat.com\/italy-serie-a-live-scores\/"
        },
        "videos": [
            {
                "title": "Highlights",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;'><iframe src='https:\/\/www.scorebat.com\/embed\/v\/5dc871d4514b4\/?s=2' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'><\/iframe><\/div>"
            },
            {
                "title": "2-0 Cornelius 93'",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;'><iframe src='https:\/\/www.scorebat.com\/embed\/v\/5dc85d4d7bd63\/?s=2' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'><\/iframe><\/div>"
            },
            {
                "title": "1-0 Mattia Sprocati 68'",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;'><iframe src='https:\/\/www.scorebat.com\/embed\/v\/5dc8578bd2ced\/?s=2' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'><\/iframe><\/div>"
            }
        ]
    },
    {
        "title": "Atletico Madrid - Espanyol",
        "embed": "<iframe src='https:\/\/www.scorebat.com\/embed\/g\/826626\/?s=2' frameborder='0' width='560' height='590' allowfullscreen allow='autoplay; fullscreen' style='width:560px;height:590px;overflow:hidden;display:block;' class='_scorebatEmbeddedPlayer_'><\/iframe><script>(function(d, s, id) { var js, fjs = d.getElementsByTagName(s)[0]; if (d.getElementById(id)) return; js = d.createElement(s); js.id = id; js.src = 'https:\/\/www.scorebat.com\/embed\/embed.js?v=mto'; fjs.parentNode.insertBefore(js, fjs); }(document, 'script', 'scorebat-jssdk'));<\/script>",
        "url": "https:\/\/www.scorebat.com\/atletico-madrid-vs-espanyol-live-stream\/",
        "thumbnail": "https:\/\/www.scorebat.com\/og\/m\/og826626.jpeg",
        "date": "2019-11-10T15:00:00+0000",
        "side1": {
            "name": "Atletico Madrid",
            "url": "https:\/\/www.scorebat.com\/live-stream\/atletico-madrid\/"
        },
        "side2": {
            "name": "Espanyol",
            "url": "https:\/\/www.scorebat.com\/live-stream\/espanyol\/"
        },
        "competition": {
            "name": "SPAIN: La Liga",
            "id": 14,
            "url": "https:\/\/www.scorebat.com\/spain-la-liga-live-scores\/"
        },
        "videos": [
            {
                "title": "Highlights",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;'><iframe src='https:\/\/www.scorebat.com\/embed\/v\/5dc84247a52af\/?s=2' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'><\/iframe><\/div>"
            },
            {
                "title": "2-1 Alvaro Morata 58'",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;'><iframe src='https:\/\/www.scorebat.com\/embed\/v\/5dc8392565a0e\/?s=2' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'><\/iframe><\/div>"
            },
            {
                "title": "1-1 Alvaro Morata 45+1'",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;'><iframe src='https:\/\/www.scorebat.com\/embed\/v\/5dc8320572f46\/?s=2' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'><\/iframe><\/div>"
            },
            {
                "title": "0-1 Sergi Darder 39'",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;'><iframe src='https:\/\/www.scorebat.com\/embed\/v\/5dc83043501e6\/?s=2' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'><\/iframe><\/div>"
            }
        ]
    },
    {
        "title": "Bayern Munich - Borussia Dortmund",
        "embed": "<iframe src='https:\/\/www.scorebat.com\/embed\/g\/823166\/?s=2' frameborder='0' width='560' height='590' allowfullscreen allow='autoplay; fullscreen' style='width:560px;height:590px;overflow:hidden;display:block;' class='_scorebatEmbeddedPlayer_'><\/iframe><script>(function(d, s, id) { var js, fjs = d.getElementsByTagName(s)[0]; if (d.getElementById(id)) return; js = d.createElement(s); js.id = id; js.src = 'https:\/\/www.scorebat.com\/embed\/embed.js?v=mto'; fjs.parentNode.insertBefore(js, fjs); }(document, 'script', 'scorebat-jssdk'));<\/script>",
        "url": "https:\/\/www.scorebat.com\/bayern-munich-vs-borussia-dortmund-live-stream\/",
        "thumbnail": "https:\/\/www.scorebat.com\/og\/m\/og823166.jpeg",
        "date": "2019-11-09T17:30:00+0000",
        "side1": {
            "name": "Bayern Munich",
            "url": "https:\/\/www.scorebat.com\/live-stream\/bayern-munich\/"
        },
        "side2": {
            "name": "Borussia Dortmund",
            "url": "https:\/\/www.scorebat.com\/live-stream\/borussia-dortmund\/"
        },
        "competition": {
            "name": "GERMANY: Bundesliga",
            "id": 11,
            "url": "https:\/\/www.scorebat.com\/germany-bundesliga-live-scores\/"
        },
        "videos": [
            {
                "title": "Highlights",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;'><iframe src='https:\/\/www.scorebat.com\/embed\/v\/5dc712fb00f96\/?s=2' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'><\/iframe><\/div>"
            },
            {
                "title": "4-0 Thiago Alcantara 79'",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;'><iframe src='https:\/\/www.scorebat.com\/embed\/v\/5dc70f5e4cd0b\/?s=2' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'><\/iframe><\/div>"
            },
            {
                "title": "3-0 Robert Lewandowski 76'",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;'><iframe src='https:\/\/www.scorebat.com\/embed\/v\/5dc70e846fa7b\/?s=2' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'><\/iframe><\/div>"
            },
            {
                "title": "2-0 Serge Gnabry 47'",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;'><iframe src='https:\/\/www.scorebat.com\/embed\/v\/5dc7084d615b6\/?s=2' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'><\/iframe><\/div>"
            },
            {
                "title": "1-0 Lewandowski 17'",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;'><iframe src='https:\/\/www.scorebat.com\/embed\/v\/5dc6fc336976f\/?s=2' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'><\/iframe><\/div>"
            }
        ]
    },
    {
        "title": "Barcelona - Celta Vigo",
        "embed": "<iframe src='https:\/\/www.scorebat.com\/embed\/g\/826627\/?s=2' frameborder='0' width='560' height='590' allowfullscreen allow='autoplay; fullscreen' style='width:560px;height:590px;overflow:hidden;display:block;' class='_scorebatEmbeddedPlayer_'><\/iframe><script>(function(d, s, id) { var js, fjs = d.getElementsByTagName(s)[0]; if (d.getElementById(id)) return; js = d.createElement(s); js.id = id; js.src = 'https:\/\/www.scorebat.com\/embed\/embed.js?v=mto'; fjs.parentNode.insertBefore(js, fjs); }(document, 'script', 'scorebat-jssdk'));<\/script>",
        "url": "https:\/\/www.scorebat.com\/barcelona-vs-celta-vigo-live-stream\/",
        "thumbnail": "https:\/\/www.scorebat.com\/og\/m\/og826627.jpeg",
        "date": "2019-11-09T20:00:00+0000",
        "side1": {
            "name": "Barcelona",
            "url": "https:\/\/www.scorebat.com\/live-stream\/barcelona\/"
        },
        "side2": {
            "name": "Celta Vigo",
            "url": "https:\/\/www.scorebat.com\/live-stream\/celta-vigo\/"
        },
        "competition": {
            "name": "SPAIN: La Liga",
            "id": 14,
            "url": "https:\/\/www.scorebat.com\/spain-la-liga-live-scores\/"
        },
        "videos": [
            {
                "title": "Highlights",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;'><iframe src='https:\/\/www.scorebat.com\/embed\/v\/5dc742c158935\/?s=2' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'><\/iframe><\/div>"
            },
            {
                "title": "Highlights",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;'><iframe src='https:\/\/www.scorebat.com\/embed\/v\/5dc73647d1488\/?s=2' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'><\/iframe><\/div>"
            },
            {
                "title": "4-1 Sergio Busquets 85'",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;'><iframe src='https:\/\/www.scorebat.com\/embed\/v\/5dc733abea81c\/?s=2' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'><\/iframe><\/div>"
            },
            {
                "title": "3-1 Lionel Messi 48'",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;'><iframe src='https:\/\/www.scorebat.com\/embed\/v\/5dc72ade74e47\/?s=2' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'><\/iframe><\/div>"
            },
            {
                "title": "2-1 Lionel Messi 45'+1'",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;'><iframe src='https:\/\/www.scorebat.com\/embed\/v\/5dc72626716f1\/?s=2' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'><\/iframe><\/div>"
            },
            {
                "title": "1-1 Lucas Olaza 42'",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;'><iframe src='https:\/\/www.scorebat.com\/embed\/v\/5dc72518a3572\/?s=2' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'><\/iframe><\/div>"
            },
            {
                "title": "1-0 Messi 23'",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;'><iframe src='https:\/\/www.scorebat.com\/embed\/v\/5dc7208d662c8\/?s=2' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'><\/iframe><\/div>"
            }
        ]
    },
    {
        "title": "Leicester City - Arsenal",
        "embed": "<iframe src='https:\/\/www.scorebat.com\/embed\/g\/820962\/?s=2' frameborder='0' width='560' height='590' allowfullscreen allow='autoplay; fullscreen' style='width:560px;height:590px;overflow:hidden;display:block;' class='_scorebatEmbeddedPlayer_'><\/iframe><script>(function(d, s, id) { var js, fjs = d.getElementsByTagName(s)[0]; if (d.getElementById(id)) return; js = d.createElement(s); js.id = id; js.src = 'https:\/\/www.scorebat.com\/embed\/embed.js?v=mto'; fjs.parentNode.insertBefore(js, fjs); }(document, 'script', 'scorebat-jssdk'));<\/script>",
        "url": "https:\/\/www.scorebat.com\/arsenal-vs-leicester-city-live-stream\/",
        "thumbnail": "https:\/\/www.scorebat.com\/og\/m\/og820962.jpeg",
        "date": "2019-11-09T17:30:00+0000",
        "side1": {
            "name": "Leicester City",
            "url": "https:\/\/www.scorebat.com\/live-stream\/leicester-city\/"
        },
        "side2": {
            "name": "Arsenal",
            "url": "https:\/\/www.scorebat.com\/live-stream\/arsenal\/"
        },
        "competition": {
            "name": "ENGLAND: Premier League",
            "id": 15,
            "url": "https:\/\/www.scorebat.com\/england-premier-league-live-scores\/"
        },
        "videos": [
            {
                "title": "Highlights",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;'><iframe src='https:\/\/www.scorebat.com\/embed\/v\/5dc7404c84e8b\/?s=2' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'><\/iframe><\/div>"
            },
            {
                "title": "Highlights",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;'><iframe src='https:\/\/www.scorebat.com\/embed\/v\/5dc7136d29c4c\/?s=2' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'><\/iframe><\/div>"
            },
            {
                "title": "2-0 Maddison 75'",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;'><iframe src='https:\/\/www.scorebat.com\/embed\/v\/5dc70d28ce8f4\/?s=2' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'><\/iframe><\/div>"
            },
            {
                "title": "1-0 Vardy 68'",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;'><iframe src='https:\/\/www.scorebat.com\/embed\/v\/5dc70b5ee2fbc\/?s=2' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'><\/iframe><\/div>"
            }
        ]
    },
    {
        "title": "Napoli - Genoa",
        "embed": "<iframe src='https:\/\/www.scorebat.com\/embed\/g\/865574\/?s=2' frameborder='0' width='560' height='590' allowfullscreen allow='autoplay; fullscreen' style='width:560px;height:590px;overflow:hidden;display:block;' class='_scorebatEmbeddedPlayer_'><\/iframe><script>(function(d, s, id) { var js, fjs = d.getElementsByTagName(s)[0]; if (d.getElementById(id)) return; js = d.createElement(s); js.id = id; js.src = 'https:\/\/www.scorebat.com\/embed\/embed.js?v=mto'; fjs.parentNode.insertBefore(js, fjs); }(document, 'script', 'scorebat-jssdk'));<\/script>",
        "url": "https:\/\/www.scorebat.com\/genoa-vs-napoli-live-stream\/",
        "thumbnail": "https:\/\/www.scorebat.com\/og\/m\/og865574.jpeg",
        "date": "2019-11-09T19:45:00+0000",
        "side1": {
            "name": "Napoli",
            "url": "https:\/\/www.scorebat.com\/live-stream\/napoli\/"
        },
        "side2": {
            "name": "Genoa",
            "url": "https:\/\/www.scorebat.com\/live-stream\/genoa\/"
        },
        "competition": {
            "name": "ITALY: Serie A",
            "id": 13,
            "url": "https:\/\/www.scorebat.com\/italy-serie-a-live-scores\/"
        },
        "videos": [
            {
                "title": "Highlights",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;'><iframe src='https:\/\/www.scorebat.com\/embed\/v\/5dc73d56aa791\/?s=2' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'><\/iframe><\/div>"
            }
        ]
    },
    {
        "title": "Eibar - Real Madrid",
        "embed": "<iframe src='https:\/\/www.scorebat.com\/embed\/g\/826629\/?s=2' frameborder='0' width='560' height='590' allowfullscreen allow='autoplay; fullscreen' style='width:560px;height:590px;overflow:hidden;display:block;' class='_scorebatEmbeddedPlayer_'><\/iframe><script>(function(d, s, id) { var js, fjs = d.getElementsByTagName(s)[0]; if (d.getElementById(id)) return; js = d.createElement(s); js.id = id; js.src = 'https:\/\/www.scorebat.com\/embed\/embed.js?v=mto'; fjs.parentNode.insertBefore(js, fjs); }(document, 'script', 'scorebat-jssdk'));<\/script>",
        "url": "https:\/\/www.scorebat.com\/eibar-vs-real-madrid-live-stream\/",
        "thumbnail": "https:\/\/www.scorebat.com\/og\/m\/og826629.jpeg",
        "date": "2019-11-09T17:30:00+0000",
        "side1": {
            "name": "Eibar",
            "url": "https:\/\/www.scorebat.com\/live-stream\/eibar\/"
        },
        "side2": {
            "name": "Real Madrid",
            "url": "https:\/\/www.scorebat.com\/live-stream\/real-madrid\/"
        },
        "competition": {
            "name": "SPAIN: La Liga",
            "id": 14,
            "url": "https:\/\/www.scorebat.com\/spain-la-liga-live-scores\/"
        },
        "videos": [
            {
                "title": "Highlights",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;'><iframe src='https:\/\/www.scorebat.com\/embed\/v\/5dc736b9d3796\/?s=2' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'><\/iframe><\/div>"
            },
            {
                "title": "Highlights",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;'><iframe src='https:\/\/www.scorebat.com\/embed\/v\/5dc7129dd27b8\/?s=2' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'><\/iframe><\/div>"
            },
            {
                "title": "0-4 Federico Valverde 61'",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;'><iframe src='https:\/\/www.scorebat.com\/embed\/v\/5dc70b2be0d76\/?s=2' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'><\/iframe><\/div>"
            },
            {
                "title": "0-3 Karim Benzema (p) 29'",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;'><iframe src='https:\/\/www.scorebat.com\/embed\/v\/5dc6fed64c8cb\/?s=2' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'><\/iframe><\/div>"
            },
            {
                "title": "0-2 Sergio Ramos (p) 20'",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;'><iframe src='https:\/\/www.scorebat.com\/embed\/v\/5dc6fcd8e7bea\/?s=2' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'><\/iframe><\/div>"
            },
            {
                "title": "0-1 Karim Benzema 17'",
                "embed": "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;'><iframe src='https:\/\/www.scorebat.com\/embed\/v\/5dc6fbef81341\/?s=2' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'><\/iframe><\/div>"
            }
        ]
    }
]

const OPENWHYD_MUSIC_GENERE_CATEGORY = [
    {name : "all", imgUrl : "static/images/musicGenre.jpg", value: 1},
    {name : "electro", imgUrl : "static/images/musicGenre.jpg", value: 2},
    {name : "hip hop", imgUrl : "static/images/musicGenre.jpg", value: 3},
    {name : "indie", imgUrl : "static/images/musicGenre.jpg", value: 4},
    {name : "folk", imgUrl : "static/images/musicGenre.jpg", value: 5},
    {name : "rock", imgUrl : "static/images/musicGenre.jpg", value: 6},
    {name : "punk", imgUrl : "static/images/musicGenre.jpg", value: 7},
    {name : "metal", imgUrl : "static/images/musicGenre.jpg", value: 8},
    {name : "blues", imgUrl : "static/images/musicGenre.jpg", value: 9},
    {name : "R&B", imgUrl : "static/images/musicGenre.jpg", value: 10},
    {name : "soul", imgUrl : "static/images/musicGenre.jpg", value: 11},
    {name : "jazz", imgUrl : "static/images/musicGenre.jpg", value: 12},
    {name : "classical", imgUrl : "static/images/musicGenre.jpg", value: 13},
    {name : "pop", imgUrl : "static/images/musicGenre.jpg", value: 14},
    {name : "world", imgUrl : "static/images/musicGenre.jpg", value: 15},
    {name : "latin", imgUrl : "static/images/musicGenre.jpg", value: 16},
    {name : "all", imgUrl : "static/images/musicGenre.jpg", value: 17},
    {name : "all", imgUrl : "static/images/musicGenre.jpg", value: 18}

];

const GLOBAL_COUNTRY_LIST = [
   {name: 'United Arab Emirates', countryCode: 'ae', imgUrl: 'https://www.countryflags.io/ae/flat/64.png'},
   {name: 'Argentina', countryCode: 'ar', imgUrl: 'https://www.countryflags.io/ar/flat/64.png'},
   {name: 'Austria', countryCode: 'at', imgUrl: 'https://www.countryflags.io/at/flat/64.png'},
   {name: 'Australia', countryCode: 'au', imgUrl: 'https://www.countryflags.io/au/flat/64.png'},
   {name: 'Belgium', countryCode: 'be', imgUrl: 'https://www.countryflags.io/be/flat/64.png'},
   {name: 'Bulgaria', countryCode: 'bg', imgUrl: 'https://www.countryflags.io/bg/flat/64.png'},
   {name: 'Brazil', countryCode: 'br', imgUrl: 'https://www.countryflags.io/br/flat/64.png'},
   {name: 'Canada', countryCode: 'ca', imgUrl: 'https://www.countryflags.io/ca/flat/64.png'},
   {name: ' Switzerland', countryCode: 'ch', imgUrl: 'https://www.countryflags.io/ch/flat/64.png'},
   {name: 'China', countryCode: 'cn', imgUrl: 'https://www.countryflags.io/cn/flat/64.png'},
   {name: 'Colombia', countryCode: 'co', imgUrl: 'https://www.countryflags.io/co/flat/64.png'},
   {name: 'Cuba', countryCode: 'cu', imgUrl: 'https://www.countryflags.io/cu/flat/64.png'},
   {name: 'Czech Republic', countryCode: 'cz', imgUrl: 'https://www.countryflags.io/cz/flat/64.png'},
   {name: 'Germany', countryCode: 'de', imgUrl: 'https://www.countryflags.io/de/flat/64.png'},
   {name: 'Egypt', countryCode: 'eg', imgUrl: 'https://www.countryflags.io/eg/flat/64.png'},
   {name: 'France', countryCode: 'fr', imgUrl: 'https://www.countryflags.io/fr/flat/64.png'},
   {name: 'United Kingdom', countryCode: 'gb', imgUrl: 'https://www.countryflags.io/gb/flat/64.png'},
   {name: 'Greece', countryCode: 'gr', imgUrl: 'https://www.countryflags.io/gr/flat/64.png'},
   {name: 'Hong Kong', countryCode: 'hk', imgUrl: 'https://www.countryflags.io/hk/flat/64.png'},
   {name: 'Hungary', countryCode: 'hu', imgUrl: 'https://www.countryflags.io/hu/flat/64.png'},
   {name: 'Indonesia', countryCode: 'id', imgUrl: 'https://www.countryflags.io/id/flat/64.png'},
   {name: 'Ireland', countryCode: 'ie', imgUrl: 'https://www.countryflags.io/ie/flat/64.png'},
   {name: 'Israel', countryCode: 'il', imgUrl: 'https://www.countryflags.io/il/flat/64.png'},
   {name: 'India', countryCode: 'in', imgUrl: 'https://www.countryflags.io/in/flat/64.png'},
   {name: 'Italy', countryCode: 'it', imgUrl: 'https://www.countryflags.io/it/flat/64.png'},
   {name: 'Japan', countryCode: 'jp', imgUrl: 'https://www.countryflags.io/jp/flat/64.png'},
   {name: 'Korea, Republic of', countryCode: 'kr', imgUrl: 'https://www.countryflags.io/kr/flat/64.png'},
   {name: 'Lithuania', countryCode: 'lt', imgUrl: 'https://www.countryflags.io/lt/flat/64.png'},
   {name: 'Latvia', countryCode: 'lv', imgUrl: 'https://www.countryflags.io/lv/flat/64.png'},
   {name: 'Morocco', countryCode: 'ma', imgUrl: 'https://www.countryflags.io/ma/flat/64.png'},
   {name: 'Mexico', countryCode: 'mx', imgUrl: 'https://www.countryflags.io/mx/flat/64.png'},
   {name: 'Malaysia', countryCode: 'my', imgUrl: 'https://www.countryflags.io/my/flat/64.png'},
   {name: 'Nigeria', countryCode: 'ng', imgUrl: 'https://www.countryflags.io/ng/flat/64.png'},
   {name: 'Netherlands', countryCode: 'nl', imgUrl: 'https://www.countryflags.io/nl/flat/64.png'},
   {name: 'Norway', countryCode: 'no', imgUrl: 'https://www.countryflags.io/no/flat/64.png'},
   {name: 'New Zealand', countryCode: 'nz', imgUrl: 'https://www.countryflags.io/nz/flat/64.png'},
   {name: 'Philippines', countryCode: 'ph', imgUrl: 'https://www.countryflags.io/ph/flat/64.png'},
   {name: 'Poland', countryCode: 'pl', imgUrl: 'https://www.countryflags.io/pl/flat/64.png'},
   {name: 'Portugal', countryCode: 'pt', imgUrl: 'https://www.countryflags.io/pt/flat/64.png'},
   {name: 'Romania', countryCode: 'ro', imgUrl: 'https://www.countryflags.io/ro/flat/64.png'},
   {name: 'Serbia', countryCode: 'rs', imgUrl: 'https://www.countryflags.io/rs/flat/64.png'},
   {name: 'Russian Federation', countryCode: 'ru', imgUrl: 'https://www.countryflags.io/ru/flat/64.png'},
   {name: 'Saudi Arabia', countryCode: 'sa', imgUrl: 'https://www.countryflags.io/sa/flat/64.png'},
   {name: 'Sweden', countryCode: 'se', imgUrl: 'https://www.countryflags.io/se/flat/64.png'},
   {name: 'Singapore', countryCode: 'sg', imgUrl: 'https://www.countryflags.io/sg/flat/64.png'},
   {name: 'Slovenia', countryCode: 'si', imgUrl: 'https://www.countryflags.io/si/flat/64.png'},
   {name: 'Slovakia', countryCode: 'sk', imgUrl: 'https://www.countryflags.io/sk/flat/64.png'},
   {name: 'Thailand', countryCode: 'th', imgUrl: 'https://www.countryflags.io/th/flat/64.png'},
   {name: 'Turkey', countryCode: 'tr', imgUrl: 'https://www.countryflags.io/tr/flat/64.png'},
   {name: 'Taiwan, Republic Of China', countryCode: 'tw', imgUrl: 'https://www.countryflags.io/tw/flat/64.png'},
   {name: 'Ukraine', countryCode: 'ua', imgUrl: 'https://www.countryflags.io/ua/flat/64.png'},
   {name: 'United States', countryCode: 'us', imgUrl: 'https://www.countryflags.io/us/flat/64.png'},
   {name: 'Venezuela, Bolivarian Republic of', countryCode: 've', imgUrl: 'https://www.countryflags.io/ve/flat/64.png'},
   {name: 'South Africa', countryCode: 'za', imgUrl: 'https://www.countryflags.io/za/flat/64.png'}
 ];

const NEWS_SOURCE_LANGUAGE_LIST = [
  {name: 'ar', imgUrl: 'https://www.countryflags.io/ae/flat/64.png', language: 'Arabic'},
  {name: 'de', imgUrl: 'https://www.countryflags.io/ar/flat/64.png', language: 'German'},
  {name: 'se', imgUrl: 'https://www.countryflags.io/at/flat/64.png', language: 'Northern Sami'},
  {name: 'fr', imgUrl: 'https://www.countryflags.io/ae/flat/64.png', language: 'French'},
  {name: 'pt', imgUrl: 'https://www.countryflags.io/ar/flat/64.png', language: 'Portuguese'},
  // {name: 'at', imgUrl: 'https://www.countryflags.io/at/flat/64.png', language: 'Arabic'},
  {name: 'en', imgUrl: 'https://www.countryflags.io/ae/flat/64.png', language: 'English'},
  {name: 'es', imgUrl: 'https://www.countryflags.io/ar/flat/64.png', language: 'Spanish'},
  {name: 'ru', imgUrl: 'https://www.countryflags.io/at/flat/64.png', language: 'Russian'},
  {name: 'he', imgUrl: 'https://www.countryflags.io/ae/flat/64.png', language: 'Hebrew'},
  {name: 'nl', imgUrl: 'https://www.countryflags.io/ar/flat/64.png', language: 'Dutch'},
  {name: 'no', imgUrl: 'https://www.countryflags.io/at/flat/64.png', language: 'Norwegian'},
  // {name: 'ud', imgUrl: 'https://www.countryflags.io/ar/flat/64.png', language: 'Arabic'},
  {name: 'zh', imgUrl: 'https://www.countryflags.io/at/flat/64.png', language: 'Chinese'},
]

const CURRENTS_API_NEWS_CATEGORIES_LIST = [
  {category : "regional"},
  {category : "technology"},
  {category : "lifestyle"},
  {category : "business"},
  {category : "general"},
  {category : "programming"},
  {category : "science"},
  {category : "entertainment"},
  {category : "world"},
  {category : "sports"},
  {category : "finance"},
  {category : "academia"},
  {category : "politics"},
  {category : "health"},
  {category : "opinion"},
  {category : "food"},
  {category : "game"},
  {category : "fashion"},
  {category : "academic"},
  {category : "crap"},
  {category : "travel"},
  {category : "culture"},
  {category : "economy"},
  {category : "environment"},
  {category : "art"},
  {category : "music"},
  {category : "notsure"},
  {category : "CS"},
  {category : "education"},
  {category : "redundant"},
  {category : "television"},
  {category : "commodity"},
  {category : "movie"},
  {category : "entrepreneur"},
  {category : "review"},
  {category : "auto"},
  {category : "energy"},
  {category : "celebrity"},
  {category : "medical"},
  {category : "gadgets"},
  {category : "design"},
  {category : "EE"},
  {category : "security"},
  {category : "estate"},
  {category : "funny"},
]

const CURRENTS_API_NEWS_CATEGORIES = {
  "categories": [
    "regional",
    "technology",
    "lifestyle",
    "business",
    "general",
    "programming",
    "science",
    "entertainment",
    "world",
    "sports",
    "finance",
    "academia",
    "politics",
    "health",
    "opinion",
    "food",
    "game",
    "fashion",
    "academic",
    "crap",
    "travel",
    "culture",
    "economy",
    "environment",
    "art",
    "music",
    "notsure",
    "CS",
    "education",
    "redundant",
    "television",
    "commodity",
    "movie",
    "entrepreneur",
    "review",
    "auto",
    "energy",
    "celebrity",
    "medical",
    "gadgets",
    "design",
    "EE",
    "security",
    "mobile",
    "estate",
    "funny"
  ],
  "description": "order by source count in descending order",
  "status": "ok"
};

const CANNABIS_CONDITIONS_LIST = {
  "data": [
    {
      "name": "Acne",
      "slug": "acne",
      "description": "",
      "createdAt": "2016-04-04 15:48:14",
      "updatedAt": "2016-04-04 15:48:14"
    },
    {
      "name": "Addiction to Crack or Cocaine",
      "slug": "addiction-to-crack-or-cocaine",
      "description": "",
      "createdAt": "2016-05-01 07:33:48",
      "updatedAt": "2016-05-11 07:50:28"
    },
    {
      "name": "Addiction to Heroin",
      "slug": "addiction-to-heroin",
      "description": "",
      "createdAt": "2016-05-11 08:01:00",
      "updatedAt": "2016-05-11 08:01:00"
    },
    {
      "name": "Addiction to Methamphetamine",
      "slug": "addiction-to-methamphetamine",
      "description": "",
      "createdAt": "2016-05-11 07:54:00",
      "updatedAt": "2016-05-11 07:54:00"
    },
    {
      "name": "Addiction to Nicotine",
      "slug": "addiction-to-nicotine",
      "description": "",
      "createdAt": "2016-05-07 07:34:26",
      "updatedAt": "2016-05-07 07:34:26"
    },
    {
      "name": "Addiction to Opiod Based Pain Killers",
      "slug": "addiction-to-opiod-based-pain-killers",
      "description": "",
      "createdAt": "2016-04-23 06:20:50",
      "updatedAt": "2016-05-11 07:59:04"
    },
    {
      "name": "Age-Related Macular Degeneration",
      "slug": "age-related-macular-degeneration",
      "description": "This painless eye disease is characterized by loss of accurate sight in the center of the field of vision. Most common in seniors, age-related macular degeneration is due to damage of the retina (the tissue lining the inner surface of the eye). It exists in wet or dry forms. \r\n\r\nOrthodox medicine has no cure and does not know the exact mechanism causing the disease\u2019s development. Possible causes include aging, family history, plaque build-up, high glycemic index food consumption, high blood pressure, smoking, and damage from oxidative stress.",
      "createdAt": "2016-04-04 15:48:14",
      "updatedAt": "2016-06-23 18:19:29"
    },
    {
      "name": "Aging",
      "slug": "aging",
      "description": "Various theories have been proposed to explain the loss of cellular integrity that we recognize as aging (wrinkles, age spots, or decline in physical and mental function). Such theories largely focus on the cumulative effects of exposure to radiation, toxins, or pathogens contributing to mutation in cellular DNA over time.",
      "createdAt": "2016-04-04 15:48:13",
      "updatedAt": "2016-06-14 16:41:24"
    },
    {
      "name": "Alcohol Dependence \/ Abuse",
      "slug": "alcohol-dependence-abuse",
      "description": "Alcohol abuse affects the entire body. Doctors name cardiovascular disease as the primary cause of death associated with alcohol abuse. Other health problems connected to alcohol abuse include poor absorption of food, cancer, cirrhosis of the liver, pancreatitis, gastritis, alcohol poisoning or overdose, aspiration of vomit, burns, drowning, damage to the nervous system, depression, dementia, and symptoms such as seizures, psychosis, and withdrawal delirium tremens (DTs).",
      "createdAt": "2016-04-04 15:48:14",
      "updatedAt": "2016-06-27 20:55:44"
    },
    {
      "name": "Alzheimer's Disease",
      "slug": "alzheimers-disease",
      "description": "Alzheimer\u2019s disease (AD), a chronic degenerative illness that affects the mind and brain, is partially characterized by selective neuronal loss (AD kills brain cells) and cognitive deficits.\r\n\r\nGenerally speaking, scientists believe that AD originates in part from genetic, environmental, and lifestyle causes. Established risk factors include lack of exercise, obesity, hypertension, diabetes, depression, and smoking. More specifically, one hypothesis proposes beta-amyloid plaque as a factor, partially due to doctors observing higher concentrations in the brain cells of Alzheimer patients. \r\n\r\nAnother discovery in AD involves a protein called tau, which in AD tangles and twists, preventing the delivery of nutrients to brain cells. Scientists believe that these plaques and tangles induce neuro-chemical and inflammatory changes responsible for the development of the disease.",
      "createdAt": "2016-04-04 15:48:14",
      "updatedAt": "2016-06-27 20:55:02"
    },
    {
      "name": "Amyotrophic Lateral Sclerosis (ALS or Lou Gehrig's Disease)",
      "slug": "amyotrophic-lateral-sclerosis-als-or-lou-gehrigs-disease",
      "description": "Lou Gehrig\u2019s disease or ALS is considered a chronic degenerative neurological illness associated with the selective loss of only those nerve cells needed for muscular motion located in the brain and spinal cord.\u00a0\r\n\r\nAmyotrophic,\u00a0derived from ancient Greek, translates into no-muscle-nourishment, respectively. \u201cLateral\u201d refers to muscles on either side of the affected nerve, and \u201csclerosis\u201d means hardening. Without nourishment, a muscle wastes away and with it so does the ability to initiate movements.",
      "createdAt": "2016-04-04 15:48:14",
      "updatedAt": "2016-06-27 20:52:40"
    },
    {
      "name": "Anorexia and Cachexia",
      "slug": "anorexia-and-cachexia",
      "description": "Anorexia nervosa is a lack of interest or a refusal to eat suffcient food and nutrients to maintain a healthy body weight due to psychological reasons. Anorexia is distinct from bulimia nervosa, which is defined as binge eating followed by purging or laxative abuse. \r\n<br>Cachexia, also called wasting syndrome, refers to a loss of body mass that cannot be replaced through nutrition.",
      "createdAt": "2016-04-04 15:48:13",
      "updatedAt": "2016-06-14 16:53:30"
    },
    {
      "name": "Anorexia-Cachexia (Cancer -based)",
      "slug": "anorexia-cachexia-cancer-based",
      "description": "",
      "createdAt": "2016-04-04 15:48:14",
      "updatedAt": "2016-06-28 06:00:24"
    },
    {
      "name": "Anxiety",
      "slug": "anxiety",
      "description": "Generally speaking, anxiety is a normal reaction to the subjective experience of stress, such as in \u201cperformance anxiety.\u201d It can occur when anticipation of future events is associated in one\u2019s mind with thoughts and feelings not rooted in the present moment. While anxieties can be considered a normal part of life, chronic or constant anxiety can be debilitating to one\u2019s quality of life.\r\n\r\nWestern medicine considers anxiety disorders mood disorders and defines five basic types: generalized anxiety disorder (GAD), obsessive-compulsive disorder (OCD), panic disorder, post-traumatic stress disorder (PTSD), and social anxiety disorder (social phobias).",
      "createdAt": "2016-04-04 15:48:14",
      "updatedAt": "2016-06-27 17:50:33"
    },
    {
      "name": "Arthritis",
      "slug": "arthritis",
      "description": "Arthritis is inflammation of a joint connecting two bones such as the fingers, wrists, hips, back, and knee joints. People suffering from arthritis often complain of pain in the affected joint, which is commonly accompanied by redness, a sensation of heat, and minor swelling. \r\n\r\nArthritis typically\u00a0develops gradually over many years. Initially, it presents as an occasional mild ache in the joints which progresses into chronic pains, stiffness, and swelling. The arthritis sufferer begins to avoid certain painful movements so as to guard against the pain, resulting in further stiffness, limited range of motion, and decreased mobility. \r\n\r\nArthritis has become the leading cause of disability in the U.S., with more than 46 million people suffering various forms of physical difficulties.",
      "createdAt": "2016-04-04 15:48:14",
      "updatedAt": "2016-06-23 18:25:48"
    },
    {
      "name": "Asthma",
      "slug": "asthma",
      "description": "Asthma is typically a chronic medical problem, ranging from mild breathing problems similar to those associated with a head cold, to severe and life-threatening emergencies that require rapid 911 interventions and transport to the nearest open emergency room.\r\n\r\nAsthma does not discriminate. People from all walks of life suffer from asthma; however, children and senior citizens are the most vulnerable. Some children outgrow their asthma while others do not. \r\n\r\nThe causes for asthma are poorly understood, and no pharmacological cure exists. Orthodox medicine focuses on diminishing occurrences and trying to control acute symptoms.",
      "createdAt": "2016-04-04 15:48:14",
      "updatedAt": "2016-06-27 16:39:22"
    },
    {
      "name": "Atherosclerosis",
      "slug": "atherosclerosis",
      "description": "In the past, atherosclerosis was largely defined in terms of the accumulation of plaque or bad cholesterol (LDL) within the arterial walls, leading to obstructions. However, it is now understood to be more than a simple build-up of plaque. \r\n\r\nThis obstruction is actually a physical response to injuries in the walls\u2019 lining. Causes of arterial wall injuries include high blood pressure, infectious microbes, or excessive presence of a certain amino acid called homocysteine. Studies have demonstrated that inflammatory molecules stimulate events leading to the development of atherosclerotic lesions.\r\n\r\nSome researchers consider atherosclerosis a natural type of band-aid approach to cover an injury or inflammation. When the band-aid becomes too thick or breaks loose, symptoms of a chronic or acute nature occur. In mild cases, this can lead to diminished oxygen supply to the tissue on the other side of the occlusion; in acute cases, it can cause severe strokes or heart attacks.",
      "createdAt": "2016-04-04 15:48:14",
      "updatedAt": "2016-06-23 18:26:31"
    },
    {
      "name": "Attention Deficit Disorder (ADD) and Attention Deficit Hyperactivity Disorder (ADHD)",
      "slug": "attention-deficit-disorder-add-and-attention-deficit-hyperactivity-disorder-adhd",
      "description": "Attention deficit hyperactivity disorder (ADHD) is an ambiguous and controversial diagnosis. The disorder is defined in general by symptoms such as inattention, poor concentration, distractibility, hyperactivity, and poor impulse control (i.e., procrastination, lack of see-through, forgetfulness), and poor peer-to-peer relationships. \r\n\r\nWhat contributes to the ambiguous nature of the disorder are symptoms such as \u201cdislikes homework\u201d or \u201cdoes not like to listen when spoken to directly,\u201d which on their own may appear normal but in combination may diminish productivity, social interaction, and age-appropriate development in children, as well as contribute to significant impairment of occupational abilities. \r\n\r\nFurther complicating the possibility of a specific diagnosis are other simultaneous disorders such as oppositional defiant disorder or learning disorders that overlap in display of symptoms with ADHD.",
      "createdAt": "2016-04-04 15:48:14",
      "updatedAt": "2016-06-27 17:49:36"
    },
    {
      "name": "Autism",
      "slug": "autism",
      "description": "Autism is considered a spectrum disorder in which signs and symptoms range from mild to severe. Symptoms of autism include impaired social interaction and language skills, difficulty relating to others including peers, reduced or altered emotional or behavioral responses, difficulty making eye contact, no interest in sharing experiences, and repetitive focus and actions (ritualistic behavior such as lining up items is commonly noted).",
      "createdAt": "2016-06-27 20:52:19",
      "updatedAt": "2016-06-27 20:52:19"
    },
    {
      "name": "Bladder Cancer",
      "slug": "bladder-cancer",
      "description": "",
      "createdAt": "2016-05-29 05:09:48",
      "updatedAt": "2016-05-29 05:09:48"
    },
    {
      "name": "Bone Cancer",
      "slug": "bone-cancer",
      "description": "Cancer cells can proliferate within the tissues of bones, eventually forming tumors. Orthodox medicine differentiates between bone cancers that originate in the bone, calling these primary. Secondary cancers are those that develop in the bone tissue after spreading from another place (metastasizing).",
      "createdAt": "2016-04-04 15:48:13",
      "updatedAt": "2016-06-14 17:02:24"
    },
    {
      "name": "Brain Cancer",
      "slug": "brain-cancer",
      "description": "The location and size of cancerous brain tumors largely determine survivability and the various signs and symptoms likely to develop. As tumors grow, impairment increases. As a result, the whole body as well as the mind may be impacted. \r\n<br>Generally speaking, the lower in the brain structure the tumor is, the poorer the survival outcome. This is because the brain\u2019s lower portions control most vital functions such as breathing and heart rate.",
      "createdAt": "2016-04-04 15:48:13",
      "updatedAt": "2016-06-14 17:03:08"
    },
    {
      "name": "Breast Cancer",
      "slug": "breast-cancer",
      "description": "By 2004, reported global estimates of breast cancer deaths exceeded 500,000 victims. The vast majority were women. This type of cancer most commonly originates in the milk ducts from a corrupted breast cell(s), that if left unchecked, can invade surrounding breast tissue with devastating results.",
      "createdAt": "2016-04-04 15:48:14",
      "updatedAt": "2016-06-14 17:04:22"
    },
    {
      "name": "Cancer Caused by Cannabis",
      "slug": "cancer-caused-by-cannabis",
      "description": "",
      "createdAt": "2016-04-04 15:48:14",
      "updatedAt": "2016-04-04 15:48:14"
    },
    {
      "name": "Cancer-Induced Night Sweats",
      "slug": "cancer-induced-night-sweats",
      "description": "Night sweats are relatively common in end-stage cancer patients, and are partly responsible for disrupted sleep patterns. The sleep-loss factor further reduces, both directly and indirectly, the patient\u2019s overall quality of life.",
      "createdAt": "2016-04-04 15:48:14",
      "updatedAt": "2016-06-14 17:06:56"
    },
    {
      "name": "Cardiac Fibrosis",
      "slug": "cardiac-fibrosis",
      "description": "Myocardial fibrosis is a condition in which heart valve tissues become too thick, due to an excessive build up of cardiac fibroblast cells, to open and close efficiently. If the condition progresses it will cause inefficient blood flow and eventually lead to heart failure. Statistical observation indicate that excessive serotonin presence may be implicated.",
      "createdAt": "2016-09-16 20:36:55",
      "updatedAt": "2016-09-16 20:37:17"
    },
    {
      "name": "Cervical Cancer",
      "slug": "cervical-cancer",
      "description": "Cervix is Latin for \u201cneck.\u201d Cancer of the cervix uteri is the development of cancerous cells at the narrow neck of the uterus. The uterus begins at the interior end of the vagina, and together with the fallopian tubes and ovaries comprises the female reproductive system.",
      "createdAt": "2016-04-04 15:48:14",
      "updatedAt": "2016-06-14 17:07:38"
    },
    {
      "name": "Chagas Disease (Trypanosoma cruzi)",
      "slug": "chagas-disease-trypanosoma-cruzi",
      "description": "",
      "createdAt": "2016-05-08 22:48:03",
      "updatedAt": "2016-05-10 16:40:01"
    },
    {
      "name": "Chemotherapy-Induced Nausea and Vomiting",
      "slug": "chemotherapy-induced-nausea-and-vomiting",
      "description": "",
      "createdAt": "2016-04-04 15:48:14",
      "updatedAt": "2016-04-04 15:48:14"
    },
    {
      "name": "Cholangiocarcinoma",
      "slug": "cholangiocarcinoma",
      "description": "",
      "createdAt": "2016-05-29 05:37:20",
      "updatedAt": "2016-05-29 05:37:58"
    },
    {
      "name": "Chronic Obstructive Pulmonary Disease (COPD)",
      "slug": "chronic-obstructive-pulmonary-disease-copd",
      "description": "This type of lung disease is characterized by a narrowing of the airways, which decreases the possible passage of gas exchange in and out of the lungs. In the paradigm of orthodox medicine, the major culprit of chronic obstructive pulmonary disease (COPD) is cigarette smoking. \r\n\r\nThe constant presence of toxic gases produces an initial low-grade inflammation of the lung tissue. As the inflammation slowly progresses, the lungs develop chronic bronchitis, and symptoms such as chronic coughing occur.",
      "createdAt": "2016-04-04 15:48:14",
      "updatedAt": "2016-06-27 16:41:11"
    },
    {
      "name": "Cisplatin-Induced Hearing Loss",
      "slug": "cisplatin-induced-hearing-loss",
      "description": "Cisplatin is a platinum-based chemotherapy drug used to treat certain cancers. The use of the drug carries the high risk of severe adverse effects to the kidneys, bone marrow, gastrointestinal system, liver, peripheral nervous system and to the ear for example.",
      "createdAt": "2016-09-16 20:44:59",
      "updatedAt": "2016-09-16 20:44:59"
    },
    {
      "name": "CNS-injury induced immunodeficiency syndrome (CIDS)",
      "slug": "cns-injury-induced-immunodeficiency-syndrome-cids",
      "description": "",
      "createdAt": "2016-05-19 05:40:40",
      "updatedAt": "2016-05-19 05:40:40"
    },
    {
      "name": "Colon Cancer",
      "slug": "colon-cancer",
      "description": "Colon cancer develops in the epithelial cells (lining), which may be found as high up as the junction between the large and small intestine, or anywhere following its pathway to the anus.",
      "createdAt": "2016-04-04 15:48:14",
      "updatedAt": "2016-06-14 17:08:33"
    },
    {
      "name": "Cough",
      "slug": "cough",
      "description": "While human physiology allows us to cough consciously, most coughs are sudden and involuntary reflexes designed to clear the upper airways of mucus, phlegm, microbes, irritants, or foreign bodies. \r\n<br>Differentiations of coughs include onset, duration, dry, productive, chronic, or tic coughs (psychogenic).",
      "createdAt": "2016-04-04 15:48:13",
      "updatedAt": "2016-06-14 16:56:45"
    },
    {
      "name": "Crohn's disease",
      "slug": "crohns-disease",
      "description": "",
      "createdAt": "2016-04-21 21:55:56",
      "updatedAt": "2016-04-25 23:15:26"
    },
    {
      "name": "Cystitis (Interstitial)",
      "slug": "interstitial-cystitis",
      "description": "Interstitial cystitis (IC; painful bladder syndrome) predominantly affects women. The disease presents itself with chronic burning bladder pains due to inflammation and thinning of the urinary bladder lining.",
      "createdAt": "2016-04-04 15:48:14",
      "updatedAt": "2016-06-27 16:15:34"
    },
    {
      "name": "Depression",
      "slug": "depression",
      "description": "While brief episodes of \u201cfeeling depressed\u201d are part of the human experience, prolonged, severe, or clinical depression can make it very difficult or even impossible to get out of bed in the morning and function normally.",
      "createdAt": "2016-04-04 15:48:14",
      "updatedAt": "2016-06-27 17:52:41"
    },
    {
      "name": "Dermatitis (Allergic, contact)",
      "slug": "dermatitis-allergic-contact",
      "description": "",
      "createdAt": "2016-05-11 07:06:34",
      "updatedAt": "2016-05-11 07:06:34"
    },
    {
      "name": "Dermatitis (Eczema)",
      "slug": "dermatitis-eczema",
      "description": "",
      "createdAt": "2016-04-04 15:48:14",
      "updatedAt": "2016-04-04 15:48:14"
    },
    {
      "name": "Diabetes Mellitus",
      "slug": "diabetes-mellitus",
      "description": "Diabetes is a disease related to the pancreas, a relatively small gland located behind the stomach and in front of the spine that opens into the duodenum (neck of the small intestine). Of all the glands in the endocrine system, the pancreas, along with the adrenals, sits directly in the body\u2019s center. The pancreas produces hormones such as insulin and glucagon as well as digestive enzymes that break down food into basic sugar molecules usable as food\/energy by each cell of the human body.\r\n\r\nTraditionally, orthodox medicine categorizes diabetes into three kinds: Type I, Type II, and gestational diabetes. Type I diabetes was once called juvenile diabetes because it occurred mostly in children or adolescents. In Type I, the pancreas stops producing the hormone insulin. Without insulin the body cannot use the food life depends on, cellular sugar. Treatment in the orthodox paradigm consists of daily insulin injections, normally administered by the patients themselves.\r\n\r\nType II diabetes, or adult-onset diabetes, is the most common form of the disease. In Type II the pancreas does not produce enough insulin, or the body\u2019s cells are insensitive to the presence of insulin and ignore it. This prevents the body from converting sugar into energy. Early Type II usually does not require the use of insulin; modern medical practitioners generally prescribe oral pharmaceuticals instead.",
      "createdAt": "2016-04-04 15:48:14",
      "updatedAt": "2016-06-23 18:18:45"
    },
    {
      "name": "Dravet syndrome",
      "slug": "dravet-syndrome",
      "description": "",
      "createdAt": "2016-04-28 03:41:12",
      "updatedAt": "2016-04-28 03:41:12"
    },
    {
      "name": "Dupuytren's Contracture",
      "slug": "dupuytrens-contracture",
      "description": "",
      "createdAt": "2016-04-15 19:47:04",
      "updatedAt": "2016-05-09 19:08:10"
    },
    {
      "name": "Emotional and Behavioral Disorders (EBD)",
      "slug": "emotional-and-behavioral-disorders-ebd",
      "description": "",
      "createdAt": "2016-05-04 05:19:52",
      "updatedAt": "2016-05-10 21:58:29"
    },
    {
      "name": "Encephalitis",
      "slug": "encephalitis",
      "description": "Encephalitis is an acute inflammation of the brain, most commonly caused by a virus (e.g., live virus vaccination, herpes, West Nile, or equine encephalitis), although it may also be produced by bacteria (e.g., syphilis, bacterial meningitis, Lyme disease), parasites (e.g., malaria), or an over-reactive immune response to an inflammation or secondary infection (e.g., measles, mumps, or rubella).",
      "createdAt": "2016-04-04 15:48:13",
      "updatedAt": "2016-06-14 16:57:37"
    },
    {
      "name": "Encephalomyelitis",
      "slug": "encephalomyelitis",
      "description": "",
      "createdAt": "2016-05-25 20:23:14",
      "updatedAt": "2016-05-25 20:23:14"
    },
    {
      "name": "Endometriosis",
      "slug": "endometriosis",
      "description": "",
      "createdAt": "2016-04-04 15:48:14",
      "updatedAt": "2016-04-04 15:48:14"
    },
    {
      "name": "Epilepsy",
      "slug": "epilepsy",
      "description": "",
      "createdAt": "2016-04-04 15:48:14",
      "updatedAt": "2016-04-04 15:48:14"
    },
    {
      "name": "Familial Mediterranean Fever",
      "slug": "familial-mediterranean-fever",
      "description": "",
      "createdAt": "2016-04-30 06:52:45",
      "updatedAt": "2016-04-30 06:52:45"
    },
    {
      "name": "Fever",
      "slug": "fever",
      "description": "A normal body temperature is generally considered to be about 37\u00b0C or 98.5\u00b0F; a mild fever between 99\u00b0F and 101\u00b0F; and a high fever above 103\u00b0F. Body temperatures above 42\u00b0C\/108\u00b0F are potentially fatal.",
      "createdAt": "2016-04-04 15:48:14",
      "updatedAt": "2016-06-23 18:24:16"
    },
    {
      "name": "Fibromyalgia",
      "slug": "fibromyalgia",
      "description": "Fibromyalgia, an illness characterized by chronic pain combined with some form of psychiatric diagnosis, still lacks an observable underlying pathology. The disease picture of fibromyalgia usually includes widespread chronic pains in muscles and connective tissue, joint stiffness, general weakness, exhaustion, depression, anxiety, and insomnia. \u201cNearly 2 percent of the general population in the United States suffers from fibromyalgia, the majority of them being middle-aged females.\u201d",
      "createdAt": "2016-04-04 15:48:14",
      "updatedAt": "2016-06-23 18:24:58"
    },
    {
      "name": "Fractured Bones",
      "slug": "fractured-bones",
      "description": "",
      "createdAt": "2016-04-04 15:48:14",
      "updatedAt": "2016-04-04 15:48:14"
    },
    {
      "name": "Fungal Infection (Candida albicans)",
      "slug": "fungal-infection-candida-albicans",
      "description": "The fungi Candida albicans can cause infections involving a variety of tissues in the human body such as the skin, nails, and mucus membranes (mouth, eyes, rectum, vagina) for example. And, while in relatively healthy individuals these condition may be chronic and bothersome, in immune suppressed patients (e.g. AIDS, Cancer), the fungi can be life-threatening.",
      "createdAt": "2016-07-17 02:34:21",
      "updatedAt": "2016-07-17 02:34:21"
    },
    {
      "name": "Fungal Infection (Foot Nail Fungus)",
      "slug": "fungal-infection-nail-fungus",
      "description": "",
      "createdAt": "2016-05-08 22:59:30",
      "updatedAt": "2016-07-17 02:25:31"
    },
    {
      "name": "Gastro-Esophageal Reflux Disease (GERD)",
      "slug": "gastro-esophageal-reflux-disease-gerd",
      "description": "Commonly known as heartburn and acid reflux disease, this illness is due to damage of the esophageal mucous membrane and the esophageal sphincter. Damage occurs when stomach acid reaches the lower part of the esophagus. \r\n\r\nUnder normal conditions, the esophageal sphincter opens to allow food and drink to enter the stomach but closes right after to prevent stomach acid from affecting the tissue above. In GERD, however, the closing action is temporarily incomplete, allowing acid to reach unprotected tissue and cause damage.",
      "createdAt": "2016-04-04 15:48:14",
      "updatedAt": "2016-06-27 16:17:26"
    },
    {
      "name": "Glaucoma",
      "slug": "glaucoma",
      "description": "Glaucoma can be classified as a group of eye diseases in which vision can be partially or completely lost, sometimes without warning. Early glaucoma patients may not even be aware of the disease\u2019s progress. \r\n\r\nUltimately, glaucoma damages the optic nerve leading from the eye to the brain, resulting in partial or complete blindness. While other factors may play a role in the disease\u2019s development, chronic or acute increased intra-ocular pressure is commonly present, although some glaucoma patients maintain normal intra-ocular pressure. \r\n\r\nNormally aqueous humor (fluid inside the eye) flows through channels to maintain eye health and function. In glaucoma patients this fluid becomes blocked.",
      "createdAt": "2016-04-04 15:48:14",
      "updatedAt": "2016-06-23 18:20:15"
    },
    {
      "name": "Hair Growth - Unwanted (Hirsutism)",
      "slug": "hair-growth-unwanted-hirsutism",
      "description": "",
      "createdAt": "2016-04-04 15:48:14",
      "updatedAt": "2016-04-04 15:48:14"
    },
    {
      "name": "Hair Loss (Baldness)",
      "slug": "hair-loss-baldness",
      "description": "",
      "createdAt": "2016-04-04 15:48:14",
      "updatedAt": "2016-04-04 15:48:14"
    },
    {
      "name": "Head and neck squamous cell carcinoma (HNSCC)",
      "slug": "head-and-neck-squamous-cell-carcinoma-hnscc",
      "description": "",
      "createdAt": "2016-05-29 05:16:46",
      "updatedAt": "2016-05-29 05:16:46"
    },
    {
      "name": "Heart Disease",
      "slug": "heart-disease",
      "description": "The heart is a unique muscle that gets its own nourishment from three main vessels called the coronary arteries. In Western medicine\u2019s model, when one or more of these coronary arteries is slowly or suddenly blocked (as in the case of a blood clot) or gradually narrows (as in the case of atherosclerosis, a build-up of plaque), the heart muscle begins to ache.\r\n\r\nIf not corrected, this \u201cache\u201d can progress to tissue death called a myocardial infarction or heart attack. The size of the infarct determines survivability. In 2007, the Centers for Disease Control publicized a report identifying heart disease as the leading cause of death in the U.S., with more than 600,000 victims that year.",
      "createdAt": "2016-04-04 15:48:14",
      "updatedAt": "2016-06-23 18:14:36"
    },
    {
      "name": "Helminthiasis",
      "slug": "helminthiasis",
      "description": "",
      "createdAt": "2016-04-04 15:48:14",
      "updatedAt": "2016-04-04 15:48:14"
    },
    {
      "name": "Hepatic Ischemia\/Reperfusion Injury",
      "slug": "hepatic-ischemia-reperfusion-injury",
      "description": "",
      "createdAt": "2016-06-08 06:32:47",
      "updatedAt": "2016-06-08 06:32:47"
    },
    {
      "name": "Hepatitis",
      "slug": "hepatitis",
      "description": "Hepatitis is inflammation of the liver and can be characterized as acute or chronic. Acute hepatitis usually lasts no more than a couple of months. Chronic hepatitis can be a lifelong debilitating disease. \r\n<br>Most commonly, the liver becomes inflamed as a result of the hepatic viruses A, B, C, D, or E, which are a major health problem worldwide. Viral hepatitis is contagious, while non-viral forms of hepatitis are not. \r\n<br>In some cases, toxins, alcohol, and many pharmacological medications such as acetaminophen and ibuprofen can also produce hepatitis.",
      "createdAt": "2016-04-04 15:48:13",
      "updatedAt": "2016-06-14 16:59:14"
    },
    {
      "name": "Herpes",
      "slug": "herpes",
      "description": "Herpes simplex is a common virus that belongs to the same family as the chicken pox virus. There are currently eight known herpes viruses. According to orthodox medicine, all herpes viruses can exist in the body without any outward sign or symptom until a period of depressed immunity suddenly results in an outbreak. \r\n<br>Oral herpes (cold sores or fever blisters) called HSV-I usually appears above the waist, in contrast to genital herpes (HSV-II).",
      "createdAt": "2016-04-04 15:48:13",
      "updatedAt": "2016-06-14 16:59:58"
    },
    {
      "name": "Hiccups (intractable)",
      "slug": "hiccups-intractable",
      "description": "",
      "createdAt": "2016-04-30 07:10:12",
      "updatedAt": "2016-04-30 07:10:12"
    },
    {
      "name": "HIV\/AIDS",
      "slug": "hivaids",
      "description": "Mainstream orthodox medicine considers acquired immune deficiency syndrome (AIDS) to be a disease of the immune system that is caused by a human immunodeficiency virus (HIV) transmitted through sexual or blood contact.",
      "createdAt": "2016-04-04 15:48:13",
      "updatedAt": "2016-06-14 17:00:50"
    },
    {
      "name": "Huntington's Disease",
      "slug": "huntingtons-disease",
      "description": "",
      "createdAt": "2016-04-04 15:48:14",
      "updatedAt": "2016-04-04 15:48:14"
    },
    {
      "name": "Hypertension",
      "slug": "hypertension",
      "description": "According to modern medicine, \u201cnormal\u201d blood pressure is 120\/80. However, optimal pressure is not clearly defined. Some people are happy and healthy with either lower or slightly higher numbers. \r\n\r\nHowever, the Seventh Report of the Joint National Committee on Prevention, Detection, Evaluation, and Treatment of High Blood Pressure suggests that: \u201cThe risk of coronary vascular disease, beginning at 115\/75 mm Hg, doubles with each increment of 20\/10 mm Hg.\u201d",
      "createdAt": "2016-04-04 15:48:14",
      "updatedAt": "2016-06-23 18:16:12"
    },
    {
      "name": "Improved Night Vision",
      "slug": "improved-night-vision",
      "description": "A team of international researchers from the United States, Spain, and Morocco \u201c. . . have documented (2004) an improvement in night vision among Jamaican shermen after ingestion of a crude tincture of herbal cannabis, while two members of this group noted that Moroccan fishermen and mountain dwellers observe an analogous improvement after smoking kif, sifted Cannabis sativa mixed with tobacco (Nicotiana rustica).\u201d",
      "createdAt": "2016-04-04 15:48:14",
      "updatedAt": "2016-06-23 18:21:31"
    },
    {
      "name": "Infertility (male)",
      "slug": "infertility-male",
      "description": "",
      "createdAt": "2016-04-20 01:29:29",
      "updatedAt": "2016-04-20 01:29:29"
    },
    {
      "name": "Inflammation-Induced Cognitive Damage",
      "slug": "inflammation-induced-cognitive-damage",
      "description": "Inflammation-induced cognitive damage, impairment, or decline occurs because of various insults such as chemotherapies, brain injuries, accumulation of mal-shaped proteins such as in Alzheimer's or microbial infections for instance.",
      "createdAt": "2016-07-12 01:23:33",
      "updatedAt": "2016-07-12 01:23:33"
    },
    {
      "name": "Inflammatory Bowel Disease (IBD)",
      "slug": "inflammatory-bowel-disease-ibd",
      "description": "IBS is classified according to the primary symptoms displayed by each patient. Thus diarrhea, constipation, and alternating diarrhea with constipation and infection become the basis for diagnosing the disease as IBD-D, IBD-C, IBD-A, or post-infectious IBD-PI, respectively. \r\n\r\nUlcerative colitis is a form of IBD that can affect other body parts as well. Crohn\u2019s disease, another form of IBD, is an autoimmune disorder affecting the gastro-intestinal tract.",
      "createdAt": "2016-04-04 15:48:14",
      "updatedAt": "2016-06-27 18:44:07"
    },
    {
      "name": "Insomnia",
      "slug": "insomnia",
      "description": "Insomnia is the difficulty or inability to fall or stay asleep. Insomnia can present itself as both a primary condition, and as a symptom associated with different health conditions such as depression, cancer, and other diseases marked by physical pain.",
      "createdAt": "2016-04-04 15:48:14",
      "updatedAt": "2016-06-27 16:33:14"
    },
    {
      "name": "Intervertebral Disc Degeneration (chronic lower back pain)",
      "slug": "intervertebral-disc-degeneration-chronic-lower-back-pain",
      "description": "",
      "createdAt": "2016-04-21 21:24:23",
      "updatedAt": "2016-04-21 21:24:23"
    },
    {
      "name": "Intimate partner violence (IPV)",
      "slug": "intimate-partner-violence-ipv",
      "description": "",
      "createdAt": "2016-06-04 05:24:11",
      "updatedAt": "2016-06-04 05:24:11"
    },
    {
      "name": "Itching (Pruritis)",
      "slug": "itching-pruritis",
      "description": "",
      "createdAt": "2016-04-04 15:48:14",
      "updatedAt": "2016-04-04 15:48:14"
    },
    {
      "name": "Kaposi's Sarcoma",
      "slug": "kaposis-sarcoma",
      "description": "Kaposi\u2019s sarcoma (KS) is an abnormal connective tissue mass, commonly appearing as multiple lesions on the skin. \r\n\r\nMoritz Kaposi first described the disease in the late nineteenth century. At that time it was thought to be a cancer, a hereditary condition, or a viral infection. The confusion continued at the beginning of the \u201cAIDS epidemic\u201d in the early 1980s, when doctors considered it the signature disease in people diagnosed with AIDS (especially in the gay community). \r\n\r\nHowever, by 1994 it was established that KS is a cancer caused by a virus from the herpes family (the eighth human herpes virus), also called HHV-8 or Kaposi\u2019s sarcoma-associated herpes virus (KSHV).",
      "createdAt": "2016-04-04 15:48:14",
      "updatedAt": "2016-06-27 20:58:53"
    },
    {
      "name": "Kidney Cancer",
      "slug": "kidney-cancer",
      "description": "",
      "createdAt": "2016-06-28 05:21:21",
      "updatedAt": "2016-06-28 05:21:21"
    },
    {
      "name": "Kidney Disease (Diabetic Nephropathy)",
      "slug": "kidney-disease-diabetic-nephropathy",
      "description": "",
      "createdAt": "2016-05-08 04:28:07",
      "updatedAt": "2016-05-09 16:05:28"
    },
    {
      "name": "Kidney Disease (in General)",
      "slug": "kidney-disease",
      "description": "",
      "createdAt": "2016-05-08 04:20:26",
      "updatedAt": "2016-07-26 01:45:50"
    },
    {
      "name": "Kidney Disease (Obesity-Related Kidney Dysfunction)",
      "slug": "kidney-disease-obesity-related-kidney-dysfunction",
      "description": "",
      "createdAt": "2016-05-08 04:31:01",
      "updatedAt": "2016-05-09 16:09:33"
    },
    {
      "name": "Kidney Disease (Sepsis-Associated Acute Kidney Injury)",
      "slug": "kidney-disease-sepsis-associated-acute-kidney-injury",
      "description": "Sepsis-associated acute kidney injury occurs during states of severe and systemic inflammation (affecting the whole body). It is considered a severe and often life-threatening condition.",
      "createdAt": "2016-07-26 01:42:08",
      "updatedAt": "2016-07-26 01:42:08"
    },
    {
      "name": "Kidney Failure (Hemodialysis)",
      "slug": "kidney-failure-hemodialysis",
      "description": "Kidney failure, (aka end-stage renal disease) occurs when the kidneys cease to function. Prime culprits of kidney failure are due to acute problems such as a heart attack, or an underlying chronic condition such as diabetes and hypertension. Symptoms appear in relation to the concentration of waste and fluid build-ups. Death occurs usually within 2 to 3 days. Survival can be sustained with ongoing dialysis treatment or a kidney transplant.",
      "createdAt": "2016-07-01 06:44:34",
      "updatedAt": "2016-07-01 06:44:34"
    },
    {
      "name": "Leishmaniasis",
      "slug": "leishmaniasis",
      "description": "",
      "createdAt": "2016-05-25 20:07:17",
      "updatedAt": "2016-05-25 20:07:17"
    },
    {
      "name": "Leukemia",
      "slug": "leukemia",
      "description": "Leukemia is a type of blood cancer that usually begins in the bone marrow. Under normal circumstances, production of red and white blood cells and platelets occurs. Cancerous mutations of blood cells at their point of genesis can lead to serious impairment of the functions associated with each type of blood cell.",
      "createdAt": "2016-04-04 15:48:14",
      "updatedAt": "2016-06-14 17:11:31"
    },
    {
      "name": "Libido",
      "slug": "libido",
      "description": "Sigmund Freud and Carl Jung introduced the term \u201clibido\u201d into common usage via psychological theory. Today, it is used to describe sexual virility and desire, biological drive, or psychic-emotional force.",
      "createdAt": "2016-04-04 15:48:14",
      "updatedAt": "2016-06-27 16:36:48"
    },
    {
      "name": "Liver Cancer",
      "slug": "liver-cancer",
      "description": "Hepatocellular carcinoma (HCC) is the third leading cause of cancer-related death worldwide. While numerous types of liver cancers exist, HCC is by far the most common form.",
      "createdAt": "2016-04-04 15:48:14",
      "updatedAt": "2016-06-14 17:13:18"
    },
    {
      "name": "Liver Fibrosis",
      "slug": "liver-fibrosis",
      "description": "",
      "createdAt": "2016-06-08 05:54:32",
      "updatedAt": "2016-06-08 05:54:32"
    },
    {
      "name": "Lower Urinary Tract Symptoms (LUTS)",
      "slug": "lower-urinary-tract-symptoms-luts",
      "description": "Lower Urinary Tract Symptoms (LUTS) are common in both genders but more often affect older males. Symptoms may include incomplete voiding of urine, urinary incontinence, polyuria (increased frequency of urination), or pain on urination for example.",
      "createdAt": "2016-07-13 20:39:45",
      "updatedAt": "2016-07-13 20:39:45"
    },
    {
      "name": "Lung Cancer",
      "slug": "lung-cancer",
      "description": "Historically, lung cancer was a rare diagnosis until many new factors were introduced into society. \r\n<br>These factors include the advent of the industrial revolution, the introduction of cigarettes (tobacco smoke and second-hand smoke are recognized as the major cause for developing lung cancer), increasing levels of air pollution (e.g., exhaust, asbestos, coal dust, soot), and the cumulative damage of ionizing radiation (x-rays). \r\n<br>Lung cancer is now the number-one occurring cancer and the leading fatal cancer in the world.",
      "createdAt": "2016-04-04 15:48:14",
      "updatedAt": "2016-06-14 17:15:51"
    },
    {
      "name": "Lupus",
      "slug": "lupus",
      "description": "",
      "createdAt": "2016-04-30 07:02:35",
      "updatedAt": "2016-04-30 07:02:35"
    },
    {
      "name": "Lymphoma",
      "slug": "lymphoma",
      "description": "Lymphomas are cancers that typically form tumors inside lymph nodes. Both white blood cells (natural killer cells, T-cells, B-cells) and lymph nodes (which filter waste and toxins) are important parts of the body\u2019s immune system.",
      "createdAt": "2016-04-04 15:48:14",
      "updatedAt": "2016-06-14 17:12:54"
    },
    {
      "name": "Malaria",
      "slug": "malaria",
      "description": "",
      "createdAt": "2016-04-04 15:48:14",
      "updatedAt": "2016-05-30 23:32:35"
    },
    {
      "name": "Manic-Depressive Disorder \/ Bipolar Affective Disorder (BAD)",
      "slug": "manic-depressive-disorder-bipolar-affective-disorder-bad",
      "description": "Psychiatry considers manic-depressive disorder to be a chronic mental illness characterized by dramatic and sudden mood swings ranging from manic to depressed and back.",
      "createdAt": "2016-04-04 15:48:14",
      "updatedAt": "2016-06-27 17:53:25"
    },
    {
      "name": "Melanoma (Malignant Skin Cancer)",
      "slug": "melanoma-malignant-skin-cancer",
      "description": "Melanin, produced by specialized skin cells (melanocytes), is the brownish pigment responsible for skin tone variants, as well as for the coloring that occurs in tanning, freckles, and moles. Exposure to UV light increases melanin production as a protective mechanism from excessive harmful rays. \r\n<br>Melanin converts the majority of UV light to harmless heat, preventing cellular mutation, thus protecting the skin from damage. The darker your skin, the greater your body\u2019s protective ability. The majority of melanocytes lie in the base of the epidermis (outer skin layer).\r\n<br>While the majority of skin cancers are non-melanomas, melanomas make up the majority of deaths. Melanoma affects more Caucasians than other ethnicities. While direct sun exposure is healthy, natural and excessive sun exposure can contribute to mutation of DNA in melanocytes. The highest incidence of melanoma occurs in whites living in Australia.",
      "createdAt": "2016-04-04 15:48:14",
      "updatedAt": "2016-06-14 17:17:34"
    },
    {
      "name": "Migraine",
      "slug": "migraine",
      "description": "",
      "createdAt": "2016-04-04 15:48:14",
      "updatedAt": "2016-04-04 15:48:14"
    },
    {
      "name": "Morning Sickness",
      "slug": "morning-sickness",
      "description": "",
      "createdAt": "2016-04-04 15:48:14",
      "updatedAt": "2016-04-04 15:48:14"
    },
    {
      "name": "Motion Sickness",
      "slug": "motion-sickness",
      "description": "",
      "createdAt": "2016-04-04 15:48:14",
      "updatedAt": "2016-04-04 15:48:14"
    },
    {
      "name": "MRSA (Methicillin-Resistant Staphylococcus aureus)",
      "slug": "mrsa-methicillin-resistant-staphylococcus-aureus",
      "description": "Certain strains of staphylococcus, an otherwise common bacterium, have developed a resistance to the usual antibiotic pharmaceuticals, which is the reason they are also referred to as \u201csuperbugs\u201d or Multi-drug-Resistant Staphylococcus aureus (MRSA).\r\n<br>People with weakened immune systems, chronic open wounds, surgical implants, and exposure to the bacteria are its most likely victims.",
      "createdAt": "2016-04-04 15:48:13",
      "updatedAt": "2016-06-14 16:54:52"
    },
    {
      "name": "Multiple Sclerosis (MS)",
      "slug": "multiple-sclerosis-ms",
      "description": "",
      "createdAt": "2016-04-04 15:48:14",
      "updatedAt": "2016-04-04 15:48:14"
    },
    {
      "name": "Myasthenia Gravis",
      "slug": "myasthenia-gravis",
      "description": "Myasthenia Gravis is an autoimmune condition causing fatigue of muscle function especially those responsible for movement of facial expressions and swallowing for example. It is hypothesized that the bodies own defenses initiated by the thymus gland target acetylcholine receptor sites resulting in reduced neurotransmission by acetylcholine.",
      "createdAt": "2016-09-05 23:05:43",
      "updatedAt": "2016-09-05 23:05:43"
    },
    {
      "name": "Nausea and Vomiting",
      "slug": "nausea-and-vomiting",
      "description": "",
      "createdAt": "2016-05-30 23:44:18",
      "updatedAt": "2016-05-30 23:44:18"
    },
    {
      "name": "Neonatal Encephalopathy",
      "slug": "neonatal-encephalopathy",
      "description": "Neonatal Encephalopathy is most commonly associated with hypoxia (poor oxygenation) resulting from trauma during the birth process. Symptoms are defined in part by a low APGAR scale where A stands for Appearance (ranging from blue to pale), P for Pulse rate, G of Grimace (response to stimulus), A for Activity, and R forRespiration. Depending on severity abnormal neurological functions may include seizure activity.",
      "createdAt": "2016-08-25 21:43:03",
      "updatedAt": "2016-08-25 21:43:03"
    },
    {
      "name": "Neonatal Hypoxia",
      "slug": "neonatal-hypoxia",
      "description": "Neonatal hypoxia (ischemia) simply means a newly born child is not getting enough oxygen supply to their tissue to function properly. The most common causes are airway obstructions, sepsis (systemic inflammations), and heart or lung disease. Depending on severity hypoxia can lead to shock, organ failure, seizures, cognitive disabilities, cerebral palsy, and death.",
      "createdAt": "2016-06-25 00:55:57",
      "updatedAt": "2016-06-25 00:55:57"
    },
    {
      "name": "Neuroblastoma",
      "slug": "neuroblastoma",
      "description": "",
      "createdAt": "2016-04-23 05:16:17",
      "updatedAt": "2016-04-23 05:16:17"
    },
    {
      "name": "Neurodegeneration (in general)",
      "slug": "Neurodegeneration-in-general",
      "description": "",
      "createdAt": "2016-04-04 15:48:14",
      "updatedAt": "2016-05-10 21:57:24"
    },
    {
      "name": "Neuromyotonia (Isaacs Syndrome)",
      "slug": "neuromyotonia-isaacs-syndrome",
      "description": "",
      "createdAt": "2016-05-01 06:52:24",
      "updatedAt": "2016-05-01 06:52:24"
    },
    {
      "name": "Obesity",
      "slug": "obesity",
      "description": "",
      "createdAt": "2016-04-23 06:02:43",
      "updatedAt": "2016-04-23 06:02:43"
    },
    {
      "name": "Obsessive-Compulsive Disorder (OCD)",
      "slug": "obsessive-compulsive-disorder-OCD",
      "description": "",
      "createdAt": "2016-06-24 22:41:02",
      "updatedAt": "2016-06-24 22:42:10"
    },
    {
      "name": "Oral Cancer",
      "slug": "oral-cancer",
      "description": "",
      "createdAt": "2016-05-29 05:41:07",
      "updatedAt": "2016-05-29 05:41:07"
    },
    {
      "name": "Organ Transplant, Graft Rejection",
      "slug": "organ-transplant-graft-rejection",
      "description": "",
      "createdAt": "2016-04-04 15:48:14",
      "updatedAt": "2016-04-04 15:48:14"
    },
    {
      "name": "Osteoporosis",
      "slug": "osteoporosis",
      "description": "",
      "createdAt": "2016-04-04 15:48:14",
      "updatedAt": "2016-04-04 15:48:14"
    },
    {
      "name": "Oxidative Stress",
      "slug": "oxidative-stress",
      "description": "Oxidative Stress occurs when there is an dramatic increase of reactive oxygen species (ROS) and the body is unable to break them down efficiently into harmless molecules. At healthy concentrations ROS play a significant role in numerous physiological events such as mounting a proper immune response to invading microbes. However, excessive ROS are speculated to be involved in numerous chronic disease pathologies such as aging, cancer, diabetes, or Alzheimer\u2019s Disease for example.",
      "createdAt": "2016-07-21 05:17:06",
      "updatedAt": "2016-07-21 05:17:06"
    },
    {
      "name": "Pain (Acute)",
      "slug": "pain-acute",
      "description": "",
      "createdAt": "2016-04-04 15:48:14",
      "updatedAt": "2016-05-10 23:54:33"
    },
    {
      "name": "Pain (Chronic Non-Malignant)",
      "slug": "pain-chronic-non-malignant",
      "description": "",
      "createdAt": "2016-04-04 15:48:14",
      "updatedAt": "2016-05-09 19:02:44"
    },
    {
      "name": "Pain (Due to Advanced Cancer)",
      "slug": "pain-due-to-advanced-cancer",
      "description": "",
      "createdAt": "2016-04-04 15:48:14",
      "updatedAt": "2016-05-09 19:03:10"
    },
    {
      "name": "Pain (Menstrual)",
      "slug": "pain-menstrual",
      "description": "",
      "createdAt": "2016-04-04 15:48:14",
      "updatedAt": "2016-05-09 19:01:25"
    },
    {
      "name": "Pain (Neuropathies, AIDS-Related)",
      "slug": "Pain-neuropathies-aids-related",
      "description": "",
      "createdAt": "2016-04-04 15:48:14",
      "updatedAt": "2016-05-10 23:53:37"
    },
    {
      "name": "Pain (Neuropathies, Diabetes)",
      "slug": "pain-neuropathies-diabetes",
      "description": "",
      "createdAt": "2016-05-03 01:09:38",
      "updatedAt": "2016-05-10 23:51:53"
    },
    {
      "name": "Pain (Neuropathies, in general)",
      "slug": "pain-neuropathies-in-general",
      "description": "",
      "createdAt": "2016-04-04 15:48:14",
      "updatedAt": "2016-05-10 23:53:07"
    },
    {
      "name": "Pancreatic Cancer",
      "slug": "pancreatic-cancer",
      "description": "One of the most malignant forms of cancer, pancreatic cancer usually has poor outcomes. The pancreas produces enzymes that promote digestion and hormones that regulate metabolism. Pancreatic cancers typically spread very rapidly, and are rarely detected in its early stages.",
      "createdAt": "2016-04-04 15:48:14",
      "updatedAt": "2016-06-14 17:22:03"
    },
    {
      "name": "Pancreatitis",
      "slug": "pancreatitis",
      "description": "The pancreas is both an endocrine gland secreting hormones such as insulin, glucagons, and somatostatin, and a digestive organ producing digestive juices containing enzymes vital to the breakdown of food particles and their molecular absorption in the small intestine. \r\n\r\nPancreatitis, an inflammation of the pancreas, occurs when the digestive enzymes are activated while still in the pancreas, causing the breakdown of cells while still inside the organ. The resulting irritation and inflammation cause the symptoms associated with the disease.",
      "createdAt": "2016-04-04 15:48:14",
      "updatedAt": "2016-06-27 16:27:07"
    },
    {
      "name": "Parkinson's Disease",
      "slug": "parkinsons-disease",
      "description": "",
      "createdAt": "2016-04-04 15:48:14",
      "updatedAt": "2016-04-04 15:48:14"
    },
    {
      "name": "Periodontitis",
      "slug": "periodontitis",
      "description": "Periodontitis is an inflammation of the tissues that support the teeth. Thought to be caused by oral microbes and an overzealous immune response, it leads to the reduction of tissue support and alveolar bone loss. The process of resorption initiates this deficiency where bone cells leak substances and become weak.",
      "createdAt": "2016-04-04 15:48:14",
      "updatedAt": "2016-06-27 16:28:08"
    },
    {
      "name": "pneumococcal meningitis",
      "slug": "pneumococcal-meningitis",
      "description": "Bacterial meningitis or pneumococcal-meningitis is an infection and resulting inflammation (swelling, irritation) of the meninges (the lining of the brain and spinal cord).",
      "createdAt": "2016-07-17 02:05:15",
      "updatedAt": "2016-07-17 02:05:15"
    },
    {
      "name": "Post-Surgery Wounds",
      "slug": "post-surgery-wounds",
      "description": "",
      "createdAt": "2016-04-04 15:48:14",
      "updatedAt": "2016-04-04 15:48:14"
    },
    {
      "name": "Post-Traumatic Stress Disorder",
      "slug": "post-traumatic-stress-disorder",
      "description": "Post-traumatic stress disorder (PTSD) is a debilitating condition affecting the body, mind, and spirit. The condition results from direct or witnessed exposure to an extreme traumatic event such as war, police action, famine, earthquake, tsunami, assault, abuse, rape, kidnapping, torture, plane crash, explosions, life-threatening illness, or any situation involving the threat of death, extreme fear, dread, and helplessness. \r\n\r\nPTSD most often results from sudden trauma that happens without warning, was repeated over long periods of time, included intentional violence to body and psyche and\/or involved grotesque injury and death, rape, or the loss of a close friend or relative.",
      "createdAt": "2016-04-04 15:48:14",
      "updatedAt": "2016-06-27 17:54:07"
    },
    {
      "name": "Pregnancy",
      "slug": "pregnancy",
      "description": "",
      "createdAt": "2016-09-17 01:17:56",
      "updatedAt": "2016-09-17 01:17:56"
    },
    {
      "name": "Prion Diseases (Transmissible Spongiform Encephalopathies)",
      "slug": "prion-diseases-transmissible-spongiform-encephalopathies",
      "description": "",
      "createdAt": "2016-04-04 15:48:14",
      "updatedAt": "2016-04-04 15:48:14"
    },
    {
      "name": "Prostate Cancer",
      "slug": "prostate-cancer",
      "description": "Prostate cancer is one of the most common cancers in elderly males, yet is generally very slow-growing. While many patients never have any particular symptoms, an enlargement of the prostate commonly underlies cancer pathologies.",
      "createdAt": "2016-04-04 15:48:14",
      "updatedAt": "2016-06-14 17:22:29"
    },
    {
      "name": "Psoriasis",
      "slug": "psoriasis",
      "description": "",
      "createdAt": "2016-04-04 15:48:14",
      "updatedAt": "2016-04-04 15:48:14"
    },
    {
      "name": "Psychosis",
      "slug": "psychosis",
      "description": "",
      "createdAt": "2016-04-04 15:48:14",
      "updatedAt": "2016-04-04 15:48:14"
    },
    {
      "name": "Retinal Disease",
      "slug": "retinal-disease",
      "description": "",
      "createdAt": "2016-04-04 15:48:14",
      "updatedAt": "2016-04-04 15:48:14"
    },
    {
      "name": "Rhabdomyosarcoma",
      "slug": "rhabdomyosarcoma",
      "description": "",
      "createdAt": "2016-04-04 15:48:14",
      "updatedAt": "2016-04-04 15:48:14"
    },
    {
      "name": "Rheumatoid Arthritis",
      "slug": "rheumatoid-arthritis",
      "description": "Rheumatoid arthritis is the most crippling form of arthritis, deforming joints and bending bodies. It is considered an autoimmune disorder, which apparently occurs when something goes wrong with the body\u2019s immune system and it attacks healthy parts of the body such as joints.",
      "createdAt": "2016-04-04 15:48:14",
      "updatedAt": "2016-06-27 16:16:04"
    },
    {
      "name": "Schizophrenia",
      "slug": "schizophrenia",
      "description": "Schizophrenia remains one of the most common and serious yet least understood mental illnesses in the world today. Swiss psychiatrist Eugene Bleuler first used the word \u201cschizophrenia\u201d in 1911, which he derived from the Greek words schizo (to split) and phren (brain or mind). \r\n\r\nHowever, unlike common usage suggests, it does not necessarily refer to a split personality(-ies) but rather a split or disconnect between thinking and feeling. Symptoms often include hallucinations involving the senses, making it difficult for patients to communicate or connect to others and the world.",
      "createdAt": "2016-04-04 15:48:14",
      "updatedAt": "2016-06-27 17:54:46"
    },
    {
      "name": "Scleroderma",
      "slug": "scleroderma",
      "description": "",
      "createdAt": "2016-04-04 15:48:14",
      "updatedAt": "2016-04-04 15:48:14"
    },
    {
      "name": "Seborrhea",
      "slug": "seborrhea",
      "description": "",
      "createdAt": "2016-04-04 15:48:14",
      "updatedAt": "2016-04-04 15:48:14"
    },
    {
      "name": "Sepsis",
      "slug": "sepsis",
      "description": "Sepsis occurs when an infection spreads throughout the body with such an intensity that the bodies immune system becomes ineffective. Current orthodox treatments are often ineffective in preventing serious damage and death. Sepsis and septic shock are the leading causes of death in intensive care units globally.",
      "createdAt": "2016-06-24 22:50:20",
      "updatedAt": "2016-06-24 22:57:19"
    },
    {
      "name": "Sickle Cell Disease",
      "slug": "sickle-cell-disease",
      "description": "",
      "createdAt": "2016-04-04 15:48:14",
      "updatedAt": "2016-04-04 15:48:14"
    },
    {
      "name": "Skin Cancer (Non-Melanoma)",
      "slug": "skin-cancer-non-melanoma",
      "description": "There are two types of non-melanoma skin cancer. Squamous cell carcinoma originates in the outermost layer of the epidermis (which is composed of squamous cells). Basal cell carcinoma originates in the lowest layer (composed of basal cells).\r\n<br>Non-melanoma skin cancers are one of the most common cancers diagnosed to date. With a relatively easy diagnosis and treatment, most non-melanoma skin cancer treatments result in a positive outcome.",
      "createdAt": "2016-04-04 15:48:14",
      "updatedAt": "2016-06-14 17:23:15"
    },
    {
      "name": "Skin Diseases (in general)",
      "slug": "skin-diseases-in-general",
      "description": "",
      "createdAt": "2016-04-04 15:48:14",
      "updatedAt": "2016-04-04 15:48:14"
    },
    {
      "name": "Sleep Apnea",
      "slug": "sleep-apnea",
      "description": "",
      "createdAt": "2016-04-23 05:40:42",
      "updatedAt": "2016-04-23 05:40:42"
    },
    {
      "name": "Spasticity (Pediatric)",
      "slug": "spasticity-pediatric",
      "description": "Spasticity is a conditions where certain muscles are constantly or repeatedly contracting. Most pediatric patients suffering from chronic muscle spasms have  complex underlying neurological conditions from a variety of origins.",
      "createdAt": "2016-09-01 06:31:24",
      "updatedAt": "2016-09-01 06:31:24"
    },
    {
      "name": "Spinal Cord Injuries",
      "slug": "spinal-cord-injuries",
      "description": "",
      "createdAt": "2016-04-04 15:48:14",
      "updatedAt": "2016-04-04 15:48:14"
    },
    {
      "name": "Stress",
      "slug": "stress",
      "description": "",
      "createdAt": "2016-05-03 01:43:33",
      "updatedAt": "2016-05-03 01:43:33"
    },
    {
      "name": "Stroke",
      "slug": "stroke",
      "description": "A stroke (cerebrovascular accident or CVA) is a loss of brain function. There are two types of strokes: ischemic and hemorrhagic. \r\n\r\nIn an ischemic stroke, an obstruction (thrombosis, embolism) prevents blood from reaching the brain cells on the other side of the obstruction; thus, it blocks oxygen and may cause tissue damage or death. \r\n\r\nA hemorrhagic stroke, which results from a ruptured blood vessel causing blood leakage, produces the same consequences.",
      "createdAt": "2016-04-04 15:48:14",
      "updatedAt": "2016-06-23 18:16:56"
    },
    {
      "name": "Systemic Sclerosis",
      "slug": "systemic-sclerosis",
      "description": "",
      "createdAt": "2016-04-04 15:48:14",
      "updatedAt": "2016-04-04 15:48:14"
    },
    {
      "name": "Thyroid Cancer",
      "slug": "thyroid-cancer",
      "description": "In previous decades, a major cause of thyroid cancer stemmed from orthodox medical procedures involving ionizing radiation. From 1940 to 1960, orthodox medicine used radiation on the necks and heads of many young children to treat relatively mild diseases. Ten to thirty years later, many of those children developed thyroid cancer, which affects women at twice the rate as males. \r\n<br>Thyroid\u2019s affinity for the element iodine also makes it vulnerable to the ill-effects of numerous iodine isotopes, such as iodine 131, released by nuclear accidents and explosions.",
      "createdAt": "2016-04-04 15:48:14",
      "updatedAt": "2016-06-14 17:24:03"
    },
    {
      "name": "Tourette Syndrome",
      "slug": "tourette-syndrome",
      "description": "",
      "createdAt": "2016-04-04 15:48:14",
      "updatedAt": "2016-04-04 15:48:14"
    },
    {
      "name": "Toxic shock syndrome",
      "slug": "toxic-shock-syndrome",
      "description": "",
      "createdAt": "2016-05-25 20:28:48",
      "updatedAt": "2016-05-25 20:28:48"
    },
    {
      "name": "Traumatic Brain Injury",
      "slug": "traumatic-brain-injury",
      "description": "",
      "createdAt": "2016-05-01 07:09:21",
      "updatedAt": "2016-05-01 07:09:21"
    },
    {
      "name": "Trichotillomania (compulsive hair pulling)",
      "slug": "trichotillomania-compulsive-hair-pulling",
      "description": "",
      "createdAt": "2016-05-01 06:45:56",
      "updatedAt": "2016-05-01 06:45:56"
    },
    {
      "name": "Tuberculosis",
      "slug": "tuberculosis",
      "description": "Tuberculosis (TB) is an infectious illness caused by a bacteria that primarily infects the lungs. The disease exists in two forms. Latent tuberculosis is non-infectious while the active form of TB is contagious.",
      "createdAt": "2016-07-12 22:37:22",
      "updatedAt": "2016-07-12 22:37:22"
    },
    {
      "name": "Urinary incontinence",
      "slug": "urinary-incontinence",
      "description": "",
      "createdAt": "2016-04-21 22:13:23",
      "updatedAt": "2016-04-21 22:13:23"
    },
    {
      "name": "Uveitis",
      "slug": "uveitis",
      "description": "This disease is an inflammation of the uvea (the middle layer of the eye). Uveitis is primarily defined by which side of the uvea is affected. Anterior uveitis (aka iritis) refers to the inflammation being on the outermost side, while posterior uveitis (aka choroiditis) describes the affected inside layer. \r\n\r\nWhen both sides of the uvea are inflamed it is called pan-uveitis. No matter which form the illness takes, inflammatory cells can enter the gelatinous-like center of the eye and spread. In most case scenarios the infection occurs suddenly and spreads quickly. Uveitis can affect one or both eyes and depending on cause can be infectious or non-infectious.",
      "createdAt": "2016-04-04 15:48:14",
      "updatedAt": "2016-06-23 18:23:44"
    },
    {
      "name": "Vascular Dementia",
      "slug": "vascular-dementia",
      "description": "",
      "createdAt": "2016-05-02 04:58:08",
      "updatedAt": "2016-05-02 04:58:08"
    },
    {
      "name": "Wilson's Disease",
      "slug": "wilsons-disease",
      "description": "A relatively rare genetic disorder preventing the body from eliminating unused copper. If left unchecked the metal begins to accumulate over many years and can cause life-threatening damage to key organs such as the brain or liver.",
      "createdAt": "2016-04-30 06:46:45",
      "updatedAt": "2016-06-24 23:41:20"
    }
  ]
}

module.exports.hereMapNearByPlacesCategory = hereMapNearByPlacesCategory;

module.exports.quizApiResponse = quizApiResponse;

module.exports.dummyQuizCategory = dummyQuizCategory;

module.exports.scoreBatVideoApi = scoreBatVideoApi;

module.exports.OPEN_LIBRARY_BOOK_CATEGORY = OPEN_LIBRARY_BOOK_CATEGORY;

module.exports.OPENWHYD_MUSIC_GENERE_CATEGORY = OPENWHYD_MUSIC_GENERE_CATEGORY;

module.exports.GLOBAL_COUNTRY_LIST = GLOBAL_COUNTRY_LIST;

module.exports.NEWS_SOURCE_LANGUAGE_LIST = NEWS_SOURCE_LANGUAGE_LIST;

module.exports.CURRENTS_API_NEWS_CATEGORIES_LIST = CURRENTS_API_NEWS_CATEGORIES_LIST;

module.exports.CANNABIS_CONDITIONS_LIST = CANNABIS_CONDITIONS_LIST;
