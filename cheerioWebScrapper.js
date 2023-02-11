const axios = require('axios');
const cheerio = require('cheerio');
const url = "https://onlineradiofm.in/language/hindi";

fetchData(url).then( (res) => {
    const html = res.data;
    const data = cheerio.load(html);
    // console.log("###########33 data : ", data);
    console.log("###########33 res.data  : ", res.data);
    // var $ = cheerio.load(html);
    // var texts = $('body').not('header').find('p.chakra-text');
    // var headings = $('body').not('header').find('h2.chakra-heading').textContent;
    // console.log("texts : ", texts);
    // texts.each(function() {
    //     console.log("====== text : ", this.value);
    // });
    // headings.each(function() {
    //     console.log("====== heading : ", this);
    // });
})

async function fetchData(url){
    console.log("Crawling data...")
    // make http call to url
    let response = await axios(url).catch((err) => console.log(err));

    if(response.status !== 200){
        console.log("Error occurred while fetching data");
        return;
    }
    return response;
}
