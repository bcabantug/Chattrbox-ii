/* global require module __dirname */
/*eslint no-undef: "error"*/
var path = require("path");
/*eslint-disable no-console*/
var extractFilePath = function(url) {
  var filePath;
  var fileName = "index.html";

  if (url.length > 1) {
    fileName = url.substring(1);
  }
  console.log("The fileName is: " + fileName);

  filePath = path.resolve(__dirname, "app", fileName);
  return filePath;
};

module.exports = extractFilePath;
