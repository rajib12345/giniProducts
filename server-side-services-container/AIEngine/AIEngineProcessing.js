const ROOT_DIR = require("path").resolve();
const AI_DATA = require(ROOT_DIR+'/server-side-services-container/AIData/AITrainingData.js');
// console.log("==== start processing AI engine data ====");
// console.log("aidata :: ", AI_DATA);
let aiEngineProcessing = function(request){
    console.log("==== calling ai engine processing function ====");
    console.log("request data : ", request);

    if(request.category === 'intent_save_expression'){
        AI_DATA.intents[request.intentIndex].examples[request.expIndex] = request.exp;
        console.log("AI_DATA.intents :: ", AI_DATA.intents[request.intentIndex]);
    }else if(request.category === 'entity_save_expression'){

    }else if(request.category === 'intent_delete_expression'){
        AI_DATA.intents[request.intentIndex].examples.splice(request.expIndex, 1);
        console.log("@@@@@ AI_DATA.intents[request.intentIndex].examples :: ", AI_DATA.intents[request.intentIndex].examples);

    }else if(request.category === 'entity_delete_expression'){
        AI_DATA.entities[request.entityIndex].values.splice(request.expIndex, 1);
        console.log("@@@@@ AI_DATA.intents[request.entityIndex].values :: ", AI_DATA.intents[request.entityIndex].values);
    }else if(request.category === 'delete_intent'){
        AI_DATA.intents.splice(request.intentIndex, 1);
        return AI_DATA;
    }else if(request.category === 'delete_entity'){
      AI_DATA.entities.splice(request.entityIndex, 1);
        return AI_DATA;
      console.log("@@@ after delete entity :: ", AI_DATA.entities);
    }
}
// Din41004043
module.exports.aiEngineProcessing = aiEngineProcessing;
