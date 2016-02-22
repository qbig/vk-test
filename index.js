/*
  Script to look for duplicated content from viki.com home page

  A: A description of the approach taken to tackle the problem
  > it basically naively pulls out all 'a' tags and look for duplicated url with same text

  B: Why the implemented solution is the best possible solution
  > this is an really naive and simple approach, as the actual problem maybe still often editorial work from human.
  > Thus this script would at most use as an reminder or alert for further inspection

  C: Instructions to execute the script
  npm index.js
*/

var jsdom = require("jsdom");
jsdom.env("https://www.viki.com",  ["http://code.jquery.com/jquery.js"], findDupCallback);
var tv = '/tv/';
var celeb = '/celebrities/';
var vid = '/videos/';

function findDupCallback(err, window) {
  var $ = window.$;
  var $allATag = $("a")
  var dupDic = {};

  $.each($allATag, function(index, item){

    var key = item.getAttribute('href') + item.textContent
    if (isContent(key) && key in dupDic) {
      console.log(key, " Dup!")
      return false;
    } else {
      dupDic[key] = true;
    }
  });
}

function isContent(str) {
  return (typeof str == 'string') && (str.indexOf(tv) != -1 || str.indexOf(celeb) != -1 || str.indexOf(vid) != -1);
}
