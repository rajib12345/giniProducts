const { createWorker } = require('tesseract.js');

const worker = createWorker();
var myImage = "./1108.png";

(async () => {
  await worker.load();
  await worker.loadLanguage('eng');
  await worker.initialize('eng');
  // const { data: { text } } = await worker.recognize('https://tesseract.projectnaptha.com/img/eng_bw.png');
  const { data: { text } } = await worker.recognize(myImage);

  console.log(text);
  await worker.terminate();
})();






// var myImage = "static/images/guardianNews.png";
// var myImage = "static/1108.png";
//
// var okrabyte = require("okrabyte");
// okrabyte.decodeFile(myImage, function(error, data){
//   console.log(data); // Hello World!
// });
