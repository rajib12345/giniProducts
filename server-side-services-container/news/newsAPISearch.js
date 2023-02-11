const promise = require("promise");
const request = require("request");



var create_news_article_template = function(newsResponse){
  var articles = newsResponse.articles;
  var sortedNewsArticles = [];
  // var template = '<div class="container-fluid">';
  var template = '<div>';
  if(articles.length >=10){
    for (var i = 0; i < 10; i++) {
        sortedNewsArticles.push(articles[i]);
    }
  }else{
    sortedNewsArticles = articles;
  }
  for (var j = 0; j < sortedNewsArticles.length; j++) {
      let content = '';
      content += '<div> <strong> Title : </strong>'+sortedNewsArticles[j].title+'</div>';
      content += '<div> <strong> Author : </strong>'+sortedNewsArticles[j].author+'</div>';
      content += '<div> <strong> Description : </strong> '+sortedNewsArticles[j].description+'</div>';
      template += '<div style="margin-top:10px;">';
      if(sortedNewsArticles[j].urlToImage){
        template += '<div><img src="'+sortedNewsArticles[j].urlToImage+'" style="width:100%; height:150px;" alt=""></div>';
      }
      template += '<div style="margin-top:6px;">'+content+'</div> </div><hr>';
  }
  template += '</div>';

  return template;
}




module.exports.create_news_article_template = create_news_article_template;
