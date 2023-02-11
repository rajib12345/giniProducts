//==================== START NEDB ====================

var Datastore = require('nedb'),
db = new Datastore();

db = {};
db.users = new Datastore('./store/test/testDb/test.db');
db.robots = new Datastore('./store/test/testDb/robots.db');

// You need to load each database (here we do it asynchronously)
db.users.loadDatabase();
db.robots.loadDatabase();


var doc = { hello: 'world',
            n: 5,
            today: new Date(),
            nedbIsAwesome: true,
            notthere: null,
            notToBeSaved: undefined,  // Will not be saved
            fruits: [ 'apple', 'orange', 'pear' ],
            infos: { name: 'nedb' }

          };



function insert(){
  console.log("==== calling : function : insert : test.js ====");
  db.users.insert(doc, function (err, newDoc) {   // Callback is optional
    // newDoc is the newly inserted document, including its _id
    // newDoc has no key called notToBeSaved since its value was undefined
    console.log("====== new user added successfully ======");
    console.log("newdoc :: \n", newDoc);

  });
}


module.exports.insert = insert;

//==================== ********** ====================
