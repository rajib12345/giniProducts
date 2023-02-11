//==================== START NEDB ====================

var Datastore = require('nedb'),
db = new Datastore();

db = {};
db.userFiles = new Datastore('./store/files/filesDb/userFiles.db');
db.adminFiles = new Datastore('./store/files/FilesDb/adminFiles.db');

// You need to load each database (here we do it asynchronously)
db.userFiles.loadDatabase();
db.adminFiles.loadDatabase();


var doc = { hello: 'world',
            n: 5,
            today: new Date(),
            nedbIsAwesome: true,
            notthere: null,
            notToBeSaved: undefined,  // Will not be saved
            fruits: [ 'apple', 'orange', 'pear' ],
            infos: { name: 'nedb' }

          };

function fetch(){
  db.userFiles.find({ }, function (err, result) {
  // docs is an array containing documents Mars, Earth, Jupiter
  // If no document is found, docs is equal to []
  // console.log("==== calling : function : fetch : neDb : neDb.js ====");
  // console.log("result : ", result);
  // return result;
  });
}

function insert(data){
  console.log("==== calling : function : insert : neDb : neDb.js ====");
  db.userFiles.insert(data, function (err, newData) {   // Callback is optional
    // newDoc is the newly inserted document, including its _id
    // newDoc has no key called notToBeSaved since its value was undefined
    // console.log("====== new user added successfully ======");
    // console.log("newdoc :: \n", newData);

  });
}


module.exports.insert = insert;
module.exports.fetch = fetch;
module.exports.userFiles = db.userFiles;


//==================== ********** ====================
