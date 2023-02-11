var stringSimilarity = require('string-similarity');
// var stringSimilarity = require('string-similarity');
var dummyData = require('./AIPreviewData.js');



const dummyData1 = {
  "name": "pwcTestChatBot",
  "intents": [
    {
      "intent": "aboutAdcdev",
      "examples": [
            "is this project live ?",
            "who are the developer in adcdev team",
            "how many developer are in this team ?",
            "what is the duration of this current project ?",
            "edit this example"
      ],
      "description": "small queries regarding adcdev project",
      "trackEditArr": []
    },
    {
      "intent": "weather",
      "examples": [
            "how is the weather of kolkata",
            "weather update",
            "weather today",
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
          "value" : 'email',
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

var aiResponse = {
  "intents": [],
  "entities": null,
  "input": {
    "text": null
  },
}

var aiResponse = {
  "intents": [],
  "entities": [],
  "input": {
    "text": null
  },
}

//===== process intents =====
var AIEngineProcessing = function(query){
  var entities = [];
  var intents = [];
  // var dummyQuery = 'weather in kolkata';
  // var  query = 'weather in capital of india';
  var maxScore = 0;
  var index = 0;

  //===== PROCESS  INTENTS  =====
  for (var i = 0; i < dummyData.intents.length; i++) {
    // var  query = 'weather in kolkata';
    var examples = dummyData.intents[i].examples;
    var result = stringSimilarity.findBestMatch( query,examples);
    var max = parseInt((result.bestMatch.rating)*100);
    if(max > maxScore){
        maxScore = max;
        index = i;
    }
  }

  //===== PROCESS  ENTITIES =====
  for (var j = 0; j < dummyData.entities.length; j++) {

      for (var k = 0; k < dummyData.entities[j].values.length; k++) {
        var entityObj = {};
        if(query.indexOf(dummyData.entities[j].values[k].value) !== -1){
              entityObj.entity = dummyData.entities[j].entity;
              entityObj.value = dummyData.entities[j].values[k].value;
              entityObj.type = 'normal';
              entities.push(entityObj);
        }else if(dummyData.entities[j].values[k].synonyms.length > 0){
            for (var i = 0; i < dummyData.entities[j].values[k].synonyms.length; i++) {
                if(query.indexOf(dummyData.entities[j].values[k].synonyms[i]) !== -1){
                      entityObj.entity = dummyData.entities[j].entity;
                      entityObj.value = dummyData.entities[j].values[k].value;
                      entityObj.type = 'synonyms';
                      entities.push(entityObj);
                }
            }
        }
      }

  }

  // console.log("maxScore : ", maxScore);
  var AIIntentsResponse = {};
  AIIntentsResponse.intent = dummyData.intents[index].intent;
  AIIntentsResponse.confidence = maxScore;
  intents.push(AIIntentsResponse);

  aiResponse.intents = intents;
  aiResponse.entities = entities;
  // aiResponse.confidence = maxScore;
  aiResponse.input.text = query;
  // console.log("my ai response : \n", aiResponse);
  return  aiResponse;
}

var updateAIIntent = function(data){
    data.intent.trackEditArr = [];
    dummyData.intents[data.intentIndex].examples[data.intentExpIndex] = data.newExp;
    console.log("updated dummy data :: ", dummyData.intents[data.intentIndex]);
}

var updateAIEntity = function(data){
      dummyData.entities[data.entityIndex].values[data.entityValueIndex].synonyms[data.expIndex] = data.newExp;
      console.log("updated entity data :: ", dummyData.entities[data.entityIndex]);
}

var addNewAIIntentExp = function(data){
      dummyData.intents[data.intentIndex].examples.push(data.newExp);
}

var deleteIntentExp = function(data){
      dummyData.intents[data.intentIndex].examples.splice(data.intentExpIndex, 1);
}

var addNewAIIntent = function(data){
    dummyData.intents.push(data.newIntent);
}

var addNewAISynonym = function(data){
    dummyData.entities[data.entityIndex].values[data.entityValueIndex].synonyms.push(data.newSynonym);
}

var deleteAIEntitySynonym = function(data){
  dummyData.entities[data.entityIndex].values[data.entityValueIndex].synonyms.splice(data.synonymIndex, 1);
}



module.exports.processQuery = AIEngineProcessing;
module.exports.updateAIIntent = updateAIIntent;
module.exports.updateAIEntity = updateAIEntity;
module.exports.addNewAIIntentExp = addNewAIIntentExp;
module.exports.deleteIntentExp = deleteIntentExp;
module.exports.addNewAIIntent = addNewAIIntent;
module.exports.addNewAISynonym = addNewAISynonym;
module.exports.deleteAIEntitySynonym = deleteAIEntitySynonym;






//==================================== END  AI ENGINE PROCESSING   ========================================
