var fs = require('fs');
var path = require('path');

function readFiles(dirname, onFileContent, onError) {
  fs.readdir(dirname, function(err, filenames) {
    if (err) {
      onError(err);
      return;
    }
    filenames.forEach(function(filename) {
      fs.readFile(dirname + filename, 'utf-8', function(err, content) {
        if (err) {
          onError(err);
          return;
        }
        onFileContent(filename, content);
      });
    });
  });
}

var data = {};

filePath = path.join(__dirname, 'source/assets/images/radicals/');

readFiles(filePath, function(filename, content) {
  data[filename] = content;
  console.log(content)
  var replacementName = filename.split(".");
  console.log(replacementName)
  var result = content.replace(/Layer_2/g, replacementName[0]);
  console.log(result)
  fs.writeFile("newradicals/"+ filename, result, function (err) {
    if (err) throw err;
    console.log('It\'s saved!');
  });
}, function(err) {
  throw err;
});

console.log(data)
