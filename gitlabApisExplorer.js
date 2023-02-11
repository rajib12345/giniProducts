var request = require('request');
var fs = require('fs');
// const fs = require('fs').promises;



let options = {
  'method': 'GET',
  'url': 'https://gitlab.com/api/v4/projects/23781207/repository/files/.gitlab-ci.yml?ref=master'
}

let options1 = {
  'method': 'GET',
  'url': 'https://gitlab.com/api/v4/projects/36144036/repository/files/test.txt?ref=main',
  'headers': {
    'PRIVATE-TOKEN': 'glpat-qj-P1Scx6DYt5JNLxb26'
  }
}

let options2 = {
  'method': 'GET',
  'url': 'https://gitlab.com/api/v4/projects/36144036',
  'headers': {
    'PRIVATE-TOKEN': 'glpat-qj-P1Scx6DYt5JNLxb26'
  }
}

var options5 = {
  'method': 'POST',
  'url': 'https://gitlab.com/api/v4/projects/36144036/repository/files/test.js?ref=main',
  'headers': {
    'Content-type': 'multipart/form-data',
    'PRIVATE-TOKEN': 'glpat-qj-P1Scx6DYt5JNLxb26'
  },
  formData:{
      'value': fs.createReadStream('test.js'),
      'options': {
        'filename': 'test.js',
        'contentType': 'multipart/form-data'
      }
    }
};

// request(options2, function(error, response){
//     if(error){
//         console.log("=================== error : ", error);
//     }else{
//       console.log("---------- response: ", response.body);
//     }
// })

//================================= new file creation using gitlab api =============================

var axios = require('axios');
const { base64encode, base64decode } = require('nodejs-base64');

// let encoded = base64encode('hey there');
let textContent = 'This is a simple xlsx file to check the post api call in gitlab ci-cd. This is a simple xlsx file to check the post api call in gitlab ci-cd. [test2.xlsx file.]';
let base64Content = base64encode(textContent);
// console.log("@@@ base64 data : ", base64Content);
// console.log("@@@ type of content : ", typeof(base64Content));




//----------------- read file from disk -----------------------

function base64_encode(file) {
  console.log("========== base64_encode fun is calling ===========");

    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}
let filePath = 'test_XLSX_100.XLSX';
let base64EncodedContents = base64_encode(filePath);
let base64DecodedContents = base64decode(base64EncodedContents);
// console.log("########## encode base64 contents : ", base64EncodedContents);
// console.log("########## decode base64 contents : ", base64DecodedContents);
let rawData = {
  branch:"testXLSXFileUpload",
  commit_message:"commits the branch.",
  encoding: "base64",
  content:""
}
rawData.content = base64EncodedContents;
var data = JSON.stringify(rawData);

var config = {
  method: 'post',
  url: 'https://gitlab.com/api/v4/projects/36144036/repository/files/tempAirtifacts%2Ftest10.XLSX',
  headers: {
    'PRIVATE-TOKEN': 'glpat-qj-P1Scx6DYt5JNLxb26',
    'Content-Type': 'application/json'
  },
  data : rawData
};

axios(config)
.then(function (response) {
  console.log("============= successfully create file in gitlab using gitlab apis =============");
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
