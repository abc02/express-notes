const path = require('path');

const fs = require('fs');

let getEntry = function (pathName) {
    let entry = {};
    fs.readdirSync(pathName,'utf-8').forEach(function (name) {
          const filename = path.basename(name,'.js')
          const files = [path.join(pathName,filename)]
          //if(debug){
          //   files.push(hotMiddlewareScript)
          // }
          // console.log(pathName.split('\\src'))
          entry[pathName.split('\\src')[1]+filename] = files
        })
        return entry;

  }

  var entry = getEntry(path.join(__dirname,'./javascripts/'))


  console.log(entry)