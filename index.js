const axios = require('axios');
const $ = require('cheerio');
const express= require('express');
const rp = require('request-promise');
const potusParse = require('./potusParse')

const app = express();
const url = 'https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States';

rp(url)
  .then(function(html){
    const wikiurls = [];
    for(var i = 0; i < 45; i++){
      wikiurls.push($('big > a',html)[i].attribs.href);
    }
    return Promise.all(
      wikiurls.map((url)=>{
        return potusParse('https://en.wikipedia.org' + url)
      })
    )
  })
  .then((presidents)=>{
    console.log(presidents);
  })
  .catch(function(err){
    console.log(err)
  });

  app.get('./about',(req,res)=>{
    res.render('potusParse.js');
  })
app.listen(3000, () => {
    console.log('Server is up and running on port numner 3000');
});
