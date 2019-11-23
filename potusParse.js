const rp = require('request-promise');
const url = 'https://en.wikipedia.org/wiki/George_Washington';
const $ = require('cheerio');
const potusParse = (url) =>{
    return rp(url)
    .then((html)=>{//skipped html
        return{
            name:$('.firstHeading',html).text(),
            birthday:$('.bday',html).text()
        }
    })
    .catch((err)=>{
        console.log(err);
    })
}
module.exports=potusParse;